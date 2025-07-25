import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Plus, RotateCcw, Calendar, Play, Eye, ArrowLeft, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import CompletionMessage from './CompletionMessage'

function ThemaOverzicht() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [themas, setThemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedThema, setExpandedThema] = useState(null)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const [completedThemeId, setCompletedThemeId] = useState(null)
  const [highlightOpenThemes, setHighlightOpenThemes] = useState(false)

  useEffect(() => {
    const fetchThemas = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('Gebruiker niet ingelogd');
        return;
      }

      try {
        // Haal thema data op via nieuwe API met werkgever configuratie
        const response = await fetch(`https://groeirichting-backend.onrender.com/api/get-thema-data-werknemer/${user.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setThemas(data.thema_data || []);
        } else {
          console.error('Fout bij ophalen thema data:', response.status);
          // Fallback naar oude methode
          await fetchThemasFallback(user.id);
        }
      } catch (error) {
        console.error('Fout bij ophalen thema data:', error);
        // Fallback naar oude methode
        await fetchThemasFallback(user.id);
      }
      
      setLoading(false);
    };

    const fetchThemasFallback = async (userId) => {
      // Oude methode als fallback
      const { data: themaData, error: themaError } = await supabase
        .from('themes')
        .select('id, titel, beschrijving')
        .eq('klaar_voor_gebruik', true)
        .eq('standaard_zichtbaar', true)
        .order('volgorde_index');

      if (themaError) {
        console.error("Fout bij laden thema's:", themaError);
        return;
      }

      const { data: gesprekData, error: gesprekError } = await supabase
        .from('gesprek')
        .select('id, theme_id, status, gestart_op, beeindigd_op')
        .eq('werknemer_id', userId)
        .order('gestart_op', { ascending: false });

      if (gesprekError) {
        console.error("Fout bij laden gesprekken:", gesprekError);
        return;
      }

      // Groepeer gesprekken per thema
      const gesprekkenPerThema = {};
      gesprekData?.forEach(gesprek => {
        if (!gesprekkenPerThema[gesprek.theme_id]) {
          gesprekkenPerThema[gesprek.theme_id] = [];
        }
        gesprekkenPerThema[gesprek.theme_id].push(gesprek);
      });

      // Combineer de data
      const lijst = themaData.map((t) => ({
        ...t,
        gesprekken: gesprekkenPerThema[t.id] || [],
        configuratie: {
          actieve_maanden: [3, 6, 9],
          verplicht: true,
          actief: true,
          anonimiseer_na_dagen: 60
        },
        is_gesprek_verwacht_deze_maand: false,
        volgende_gesprek_datum: new Date(new Date().getFullYear() + 1, 2, 1), // 1 maart volgend jaar
        heeft_openstaand_gesprek: false
      }));
      
      setThemas(lijst);
    };

    fetchThemas();
  }, []);

  // Check voor completed_theme_id parameter en start melding/highlight
  useEffect(() => {
    const completedThemeId = searchParams.get('completed_theme_id');
    
    if (completedThemeId && themas.length > 0) {
      setCompletedThemeId(completedThemeId);
      setShowCompletionMessage(true);
      
      // Start 3 seconden timer voor highlight effect (alleen als er openstaande thema's zijn)
      if (!allThemesCompleted()) {
        const timer = setTimeout(() => {
          setHighlightOpenThemes(true);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, themas]);

  // Helper functie voor openstaande thema's
  const getOpenThemes = () => {
    return themas.filter(thema => 
      thema.heeft_openstaand_gesprek || thema.kan_nieuw_gesprek_starten
    );
  };

  // Helper functie om te checken of alle thema's afgerond zijn
  const allThemesCompleted = () => {
    return themas.length > 0 && themas.every(thema => 
      !thema.heeft_openstaand_gesprek && !thema.kan_nieuw_gesprek_starten
    );
  };

  const statusKleur = {
    nieuw: 'bg-gray-100 text-gray-600',
    'Nog niet afgerond': 'bg-orange-100 text-orange-800',
    'Afgerond': 'bg-green-100 text-green-800'
  }

  const statusTekst = {
    nieuw: 'Nog niet gestart',
    'Nog niet afgerond': 'Bezig',
    'Afgerond': 'Afgerond'
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  const formatVolgendeGesprekDatum = (datum) => {
    if (!datum) return '';
    const date = new Date(datum);
    return date.toLocaleDateString('nl-NL', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  const toggleThema = (themaId) => {
    setExpandedThema(expandedThema === themaId ? null : themaId);
  }

  const startVervolggesprek = async (themeId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Maak een nieuw gesprek aan
      const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: user.id,
          theme_id: themeId,
          status: 'Nog niet afgerond'
        })
      });
      
      const result = await response.json();
      if (response.ok && result.gesprek_id) {
        navigate(`/gesprek?theme_id=${themeId}&gesprek_id=${result.gesprek_id}`);
      }
    } catch (error) {
      console.error('Fout bij starten vervolggesprek:', error);
    }
  }

  const herstartGesprek = async (gesprekId, themeId) => {
    if (!confirm('Weet je zeker dat je dit gesprek wilt herstarten? Alle antwoorden worden verwijderd.')) {
      return;
    }

    try {
      // Verwijder alle antwoorden voor dit gesprek
      const { error: deleteError } = await supabase
        .from('antwoordpervraag')
        .delete()
        .eq('gesprek_id', gesprekId);

      if (deleteError) {
        console.error('Fout bij verwijderen antwoorden:', deleteError);
        return;
      }

      // Reset gesprek status
      const { error: updateError } = await supabase
        .from('gesprek')
        .update({ 
          status: 'Nog niet afgerond',
          beeindigd_op: null
        })
        .eq('id', gesprekId);

      if (updateError) {
        console.error('Fout bij resetten gesprek:', updateError);
        return;
      }

      // Navigeer naar het gesprek
      navigate(`/gesprek?theme_id=${themeId}&gesprek_id=${gesprekId}`);
    } catch (error) {
      console.error('Fout bij herstarten gesprek:', error);
    }
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Completion Message */}
      {showCompletionMessage && (
        <CompletionMessage
          completedTheme={themas.find(t => t.id === completedThemeId)}
          onClose={() => setShowCompletionMessage(false)}
          onAutoClose={() => setShowCompletionMessage(false)}
          allCompleted={allThemesCompleted()}
        />
      )}

      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/werknemer-portaal')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar portaal
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Jouw thema's en gesprekken</h1>
                <p className="text-gray-600 text-sm sm:text-base">Bekijk en beheer je thema's en gesprekken.</p>
              </div>
            </div>
            <Eye className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>

        {/* Thema's met harmonica structuur */}
        <div className="max-w-4xl mx-auto space-y-6">
          {themas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Er zijn nog geen thema's beschikbaar.</p>
            </div>
          ) : (
            themas.map((thema) => {
              const isOpenTheme = thema.heeft_openstaand_gesprek || thema.kan_nieuw_gesprek_starten;
              const highlightClass = highlightOpenThemes && isOpenTheme ? 'theme-pulse theme-glow' : '';
              
              return (
                <div key={thema.id} className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow ${highlightClass}`}>
                {/* Thema header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{thema.titel}</h3>
                      <p className="text-gray-600 text-sm mb-4">{thema.beschrijving || 'Geen beschrijving beschikbaar.'}</p>
                      

                    </div>
                    
                    {/* Actie knoppen */}
                    <div className="flex gap-2 ml-4">
                      {thema.heeft_openstaand_gesprek && (
                        <button
                          onClick={() => {
                            const openstaandGesprek = thema.gesprekken.find(g => g.status === 'Nog niet afgerond');
                            if (openstaandGesprek) {
                              navigate(`/gesprek?theme_id=${thema.id}&gesprek_id=${openstaandGesprek.id}`);
                            }
                          }}
                          className="btn btn-primary text-sm flex items-center gap-2 text-white"
                        >
                          <Play size={16} />
                          Hervat Gesprek
                        </button>
                      )}
                      {!thema.heeft_openstaand_gesprek && (
                        thema.kan_nieuw_gesprek_starten ? (
                          <button
                            onClick={() => startVervolggesprek(thema.id)}
                            className="btn btn-secondary text-sm flex items-center gap-2 text-white"
                          >
                            <Plus size={16} />
                            {thema.gesprekken.length === 0 ? 'Start Eerste Gesprek' : 'Start Nieuw Gesprek'}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="btn btn-disabled text-sm flex items-center gap-2 text-gray-400 cursor-not-allowed"
                            title="Gesprek kan alleen gestart worden in actieve maanden"
                          >
                            <Clock size={16} />
                            Beschikbaar vanaf {formatVolgendeGesprekDatum(thema.volgende_gesprek_datum)}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  
                  {/* Harmonica toggle */}
                  <div className="text-center mt-4">
                    <button
                      onClick={() => toggleThema(thema.id)}
                      className="btn btn-accent text-sm flex items-center justify-center gap-2 mx-auto"
                    >
                      Bekijk overzicht vorige gesprekken en resultaten
                      {expandedThema === thema.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Uitgeklapte content */}
                {expandedThema === thema.id && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-6">
                      {thema.gesprekken.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Nog geen eerdere resultaten zichtbaar</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {thema.gesprekken.map((gesprek, index) => (
                            <div key={gesprek.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white rounded-lg border border-gray-100 gap-3">
                              <div className="flex items-center gap-3">
                                <Calendar size={16} className="text-gray-400" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">
                                      Gesprek {thema.gesprekken.length - index}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${statusKleur[gesprek.status]}`}>
                                      {statusTekst[gesprek.status]}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Gestart: {formatDate(gesprek.gestart_op)}
                                    {gesprek.beeindigd_op && ` • Afgerond: ${formatDate(gesprek.beeindigd_op)}`}
                                  </div>
                                </div>
                              </div>
                                                             <div className="flex gap-2 flex-wrap">
                                 {gesprek.status === 'Afgerond' && (
                                   <button
                                     onClick={() => navigate(`/gesprek-resultaat?theme_id=${thema.id}&gesprek_id=${gesprek.id}`)}
                                     className="btn btn-primary flex items-center gap-1 text-sm text-white"
                                   >
                                     <Eye size={16} /> Bekijk resultaat
                                   </button>
                                 )}
                                 <button
                                   onClick={() => herstartGesprek(gesprek.id, thema.id)}
                                   className="btn btn-accent flex items-center gap-1 text-sm text-white"
                                 >
                                   <RotateCcw size={16} /> Herstart
                                 </button>
                               </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
          )}
        </div>
      </div>
    </div>
  )
}

export default ThemaOverzicht