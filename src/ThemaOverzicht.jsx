import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Plus, RotateCcw, Calendar } from 'lucide-react'

function ThemaOverzicht() {
  const navigate = useNavigate()
  const [themas, setThemas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThemas = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('Gebruiker niet ingelogd');
        return;
      }

      // Haal eerst de thema's op
      const { data: themaData, error: themaError } = await supabase
        .from('themes')
        .select('id, titel')
        .eq('klaar_voor_gebruik', true)
        .eq('standaard_zichtbaar', true)
        .order('volgorde_index');

      if (themaError) {
        console.error("Fout bij laden thema's:", themaError);
        return;
      }

      // Haal alle gesprekken op voor deze gebruiker
      const { data: gesprekData, error: gesprekError } = await supabase
        .from('gesprek')
        .select('id, theme_id, status, gestart_op, beeindigd_op')
        .eq('werknemer_id', user.id)
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
        gesprekken: gesprekkenPerThema[t.id] || []
      }));
      
      setThemas(lijst);
      setLoading(false);
    };

    fetchThemas();
  }, []);

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
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Jouw thema's en gesprekken</h2>
      {themas.length === 0 ? (
        <p className="text-gray-500">Er zijn nog geen thema's beschikbaar.</p>
      ) : (
        themas.map((thema) => (
          <div key={thema.id} className="border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">{thema.titel}</h3>
              <button 
                onClick={() => startVervolggesprek(thema.id)}
                className="btn btn-primary text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                Nieuw gesprek
              </button>
            </div>
            
            {thema.gesprekken.length === 0 ? (
              <p className="text-gray-500 text-sm">Nog geen gesprekken gestart</p>
            ) : (
              <div className="space-y-2">
                {thema.gesprekken.map((gesprek, index) => (
                  <div key={gesprek.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                    
                    <div className="flex gap-2">
                      {gesprek.status === 'Afgerond' ? (
                        <>
                          <button 
                            onClick={() => navigate(`/gesprek-resultaat?theme_id=${thema.id}&gesprek_id=${gesprek.id}`)}
                            className="text-sm text-[var(--kleur-primary)] hover:underline"
                          >
                            Bekijk resultaat
                          </button>
                          <button 
                            onClick={() => herstartGesprek(gesprek.id, thema.id)}
                            className="text-sm text-[var(--kleur-secondary)] hover:underline flex items-center gap-1"
                          >
                            <RotateCcw size={14} />
                            Herstart
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => navigate(`/gesprek?theme_id=${thema.id}&gesprek_id=${gesprek.id}`)}
                          className="text-sm text-[var(--kleur-primary)] hover:underline"
                        >
                          Ga verder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default ThemaOverzicht