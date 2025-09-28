import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { supabase } from './supabaseClient'
import ThemaVoortgangBanner from './components/ThemaVoortgangBanner'
import ThemaEvaluatieModal from './components/ThemaEvaluatieModal'

function GesprekResultaat() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gesprekData, setGesprekData] = useState(null)
  const [vervolgactiesUitgeklapt, setVervolgactiesUitgeklapt] = useState(false)
  const [gesprekDatum, setGesprekDatum] = useState(null)
  const [userId, setUserId] = useState(null)
  
  // Evaluatie modal state
  const [showEvaluatieModal, setShowEvaluatieModal] = useState(false)
  const [evaluatieLoading, setEvaluatieLoading] = useState(false)
  const [evaluatieError, setEvaluatieError] = useState(null)
  const [heeftEvaluatie, setHeeftEvaluatie] = useState(false)

  useEffect(() => {
    const fetchGesprekData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Haal huidige gebruiker op
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          throw new Error('Gebruiker niet ingelogd')
        }

        setUserId(user.id)

        // Haal parameters op
        const themeId = params.get('theme_id')
        const gesprekId = params.get('gesprek_id')

        if (!themeId) {
          throw new Error('Geen thema ID opgegeven')
        }

        if (!gesprekId) {
          throw new Error('Geen gesprek ID opgegeven')
        }

        // Haal thema informatie op
        const { data: themeData, error: themeError } = await supabase
          .from('themes')
          .select('titel')
          .eq('id', themeId)
          .single()

        if (themeError) {
          throw new Error('Thema niet gevonden')
        }

        // Verifieer dat het gesprek bij deze gebruiker hoort
        const { data: gesprekData, error: gesprekError } = await supabase
          .from('gesprek')
          .select('id, werknemer_id, status, gestart_op')
          .eq('id', gesprekId)
          .single()

        if (gesprekError || !gesprekData) {
          throw new Error('Gesprek niet gevonden')
        }

        if (gesprekData.werknemer_id !== user.id) {
          throw new Error('Geen toegang tot dit gesprek')
        }

        if (gesprekData.status !== 'Afgerond') {
          throw new Error('Gesprek is nog niet afgerond')
        }

        // Sla gesprek datum op voor het voortgang component
        setGesprekDatum(gesprekData.gestart_op)

        // Controleer of er al een evaluatie is voor dit gesprek
        try {
          const { data: { session } } = await supabase.auth.getSession()
          const evaluatieResponse = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/check-thema-evaluatie?gesprek_id=${gesprekId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.access_token}`
              }
            }
          );

          if (evaluatieResponse.ok) {
            const evaluatieData = await evaluatieResponse.json();
            setHeeftEvaluatie(evaluatieData.heeft_evaluatie);
            
            // Als er geen evaluatie is, toon de modal
            if (!evaluatieData.heeft_evaluatie) {
              setShowEvaluatieModal(true);
            }
          } else {
            console.error('Fout bij controleren evaluatie:', evaluatieResponse.status);
            // Bij fout, toon modal als fallback
            setShowEvaluatieModal(true);
          }
        } catch (evaluatieError) {
          console.error('Fout bij controleren evaluatie:', evaluatieError);
          // Bij fout, toon modal als fallback
          setShowEvaluatieModal(true);
        }

        // Haal samenvatting op via backend API met gesprek_id
        const { data: { session } } = await supabase.auth.getSession()
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/get-samenvatting?theme_id=${themeId}&werknemer_id=${user.id}&gesprek_id=${gesprekId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.access_token}`
            }
          }
        )

        if (!response.ok) {
          if (response.status === 404) {
            // Probeer eerst een samenvatting te genereren
            try {
              console.log('Geen samenvatting gevonden, probeer er een te genereren...');
              console.log('Parameters:', { theme_id: themeId, werknemer_id: user.id, gesprek_id: gesprekId });
              
              const { data: { session } } = await supabase.auth.getSession()
              const generateResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/genereer-samenvatting`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                  },
                  body: JSON.stringify({
                    theme_id: themeId,
                    werknemer_id: user.id,
                    gesprek_id: gesprekId
                  })
                }
              );

              if (generateResponse.ok) {
                const generateResult = await generateResponse.json();
                console.log('Samenvatting gegenereerd:', generateResult);
                
                // Genereer ook vervolgacties
                try {
                  console.log('🔄 Genereer vervolgacties...');
                  const { data: { session } } = await supabase.auth.getSession()
                  const vervolgactiesResponse = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/genereer-vervolgacties`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.access_token}`
                      },
                      body: JSON.stringify({
                        theme_id: themeId,
                        werknemer_id: user.id,
                        gesprek_id: gesprekId
                      })
                    }
                  );

                  if (vervolgactiesResponse.ok) {
                    const vervolgactiesResult = await vervolgactiesResponse.json();
                    console.log('✅ Vervolgacties gegenereerd:', vervolgactiesResult);
                  } else {
                    console.warn('⚠️ Vervolgacties genereren mislukt:', vervolgactiesResponse.status);
                  }
                } catch (vervolgactiesError) {
                  console.warn('⚠️ Fout bij genereren vervolgacties:', vervolgactiesError);
                }
                
                // Wacht even zodat de backend tijd heeft om alles te verwerken
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Probeer nu opnieuw de samenvatting op te halen
                const { data: { session } } = await supabase.auth.getSession()
                const retryResponse = await fetch(
                  `${import.meta.env.VITE_API_BASE_URL}/api/get-samenvatting?theme_id=${themeId}&werknemer_id=${user.id}&gesprek_id=${gesprekId}`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${session?.access_token}`
                    }
                  }
                );

                if (retryResponse.ok) {
                  const resultData = await retryResponse.json();
                  console.log('Samenvatting opgehaald na genereren:', resultData);
                  setGesprekData({
                    themeTitle: themeData.titel,
                    samenvatting: resultData.samenvatting,
                    score: resultData.score,
                    magWerkgeverInzien: resultData.mag_werkgever_inzien,
                    vervolgacties: resultData.vervolgacties || [],
                    vervolgacties_toelichting: resultData.vervolgacties_toelichting || '',
                    themeId,
                    gesprekId
                  });
                  return;
                } else {
                  const retryErrorText = await retryResponse.text();
                  console.error('Fout bij ophalen samenvatting na genereren:', retryResponse.status, retryErrorText);
                }
              } else {
                const generateErrorText = await generateResponse.text();
                console.error('Fout bij genereren samenvatting:', generateResponse.status, generateErrorText);
              }
            } catch (error) {
              console.error('Fout bij genereren samenvatting:', error);
            }
          }

          // Toon fallback data als er geen samenvatting kan worden gegenereerd
          console.log('Geen samenvatting gevonden en genereren mislukt, toon fallback data');
          setGesprekData({
            themeTitle: themeData.titel,
            samenvatting: 'Er kon geen samenvatting worden gegenereerd voor dit gesprek. Neem contact op met je leidinggevende.',
            score: null,
            magWerkgeverInzien: true,
            vervolgacties: [],
            vervolgacties_toelichting: '',
            themeId,
            gesprekId
          });
        }

        const resultData = await response.json();
        setGesprekData({
          themeTitle: themeData.titel,
          samenvatting: resultData.samenvatting,
          score: resultData.score,
          magWerkgeverInzien: resultData.mag_werkgever_inzien,
          vervolgacties: resultData.vervolgacties || [],
          vervolgacties_toelichting: resultData.vervolgacties_toelichting || '',
          themeId,
          gesprekId
        })

      } catch (err) {
        console.error('Fout bij ophalen gesprek data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGesprekData()
  }, [params])

  // Functie om evaluatie score op te slaan
  const handleScoreSubmit = async (score) => {
    try {
      setEvaluatieLoading(true);
      setEvaluatieError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Gebruiker niet ingelogd');
      }

      const themeId = params.get('theme_id');
      const gesprekId = params.get('gesprek_id');

      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/save-thema-evaluatie`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          body: JSON.stringify({
            werknemer_id: user.id,
            theme_id: themeId,
            gesprek_id: gesprekId,
            score: score
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fout bij opslaan evaluatie');
      }

      // Succesvol opgeslagen
      setHeeftEvaluatie(true);
      setShowEvaluatieModal(false);
      setEvaluatieLoading(false);

    } catch (error) {
      console.error('Fout bij opslaan evaluatie:', error);
      setEvaluatieError(error.message);
      setEvaluatieLoading(false);
    }
  };

  // Functie om modal te sluiten
  const handleCloseModal = () => {
    setShowEvaluatieModal(false);
    setEvaluatieError(null);
  };

  // Debug logging om te zien wat er gebeurt
  console.log('GesprekResultaat state:', { gesprekDatum, userId, loading, error, gesprekData, showEvaluatieModal, heeftEvaluatie })

  if (loading) {
    return (
      <div className="centered-page space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--kleur-primary)]"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">Samenvatting wordt gegenereerd...</h2>
            <p className="text-[var(--kleur-muted)]">Even geduld, we maken een samenvatting van je gesprek</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="centered-page space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-xl text-red-800 mb-2">Fout bij laden</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/werknemer-portaal')} 
            className="btn btn-primary"
          >
            Terug naar portaal
          </button>
        </div>
      </div>
    )
  }

  if (!gesprekData) {
    return (
      <div className="centered-page space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <h2 className="text-xl text-yellow-800 mb-2">Geen samenvatting beschikbaar</h2>
          <p className="text-yellow-600 mb-4">Er is nog geen samenvatting beschikbaar voor dit gesprek.</p>
          <button 
            onClick={() => navigate('/werknemer-portaal')} 
            className="btn btn-primary"
          >
            Terug naar portaal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Samenvatting van je gesprek</h1>
                <p className="text-gray-600 text-sm sm:text-base">Bekijk hier de resultaten van je gesprek</p>
              </div>
            </div>
            <FileText className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:w-8 self-start sm:self-center" />
          </div>
        </div>

        <div className="space-y-6">

          {/* Voortgangssectie - Toon altijd als we de data hebben */}
          {gesprekDatum && userId ? (
            <ThemaVoortgangBanner 
              gesprekDatum={gesprekDatum} 
              userId={userId} 
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-500">Voortgang wordt geladen...</p>
              <p className="text-xs text-gray-400 mt-1">
                Gesprek datum: {gesprekDatum ? 'Ja' : 'Nee'} | User ID: {userId ? 'Ja' : 'Nee'}
              </p>
            </div>
          )}

          {/* Samenvatting sectie */}
          <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Thema: {gesprekData.themeTitle}</h2>
              <p className="text-sm text-[var(--kleur-muted)]">
                Dit is de samenvatting van jouw eerdere gesprek, gegenereerd op basis van je antwoorden.
              </p>
            </div>

            <div className="bg-[var(--kleur-background)] border border-gray-200 rounded-lg p-4 text-gray-700 whitespace-pre-line leading-relaxed">
              {gesprekData.samenvatting}
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold">Jouw score op dit thema:</p>
              <span className="text-2xl font-bold text-[var(--kleur-primary)]">{gesprekData.score}/10</span>
            </div>
          </section>

          {/* Vervolgacties sectie */}
          <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Vervolgacties per thema op basis van jouw antwoorden:</h2>
              <button
                onClick={() => setVervolgactiesUitgeklapt(!vervolgactiesUitgeklapt)}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors bg-transparent"
                aria-label={vervolgactiesUitgeklapt ? 'Inklappen' : 'Uitklappen'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={vervolgactiesUitgeklapt ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>
        
            {vervolgactiesUitgeklapt ? (
              gesprekData.vervolgacties && gesprekData.vervolgacties.length > 0 ? (
                <>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1">
                    {gesprekData.vervolgacties.map((actie, index) => (
                      <li key={index} className="leading-relaxed">{actie}</li>
                    ))}
                  </ol>
                  {gesprekData.vervolgacties_toelichting && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{gesprekData.vervolgacties_toelichting}</p>
                    </div>
                  )}
                </>
              ) : (
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Plan een vervolggesprek met je leidinggevende om je werkdruk verder te bespreken.</li>
                  <li>Bekijk het interne aanbod van workshops over energiemanagement en werk-privébalans.</li>
                  <li>Neem contact op met de HR-afdeling voor persoonlijk advies of ondersteuning.</li>
                </ol>
              )
            ) : (
              <div className="text-gray-600 text-sm">
                <p>Klik op "Uitklappen" om de vervolgacties te bekijken</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Thema Evaluatie Modal */}
      <ThemaEvaluatieModal
        isOpen={showEvaluatieModal}
        onClose={handleCloseModal}
        themeTitle={gesprekData?.themeTitle}
        onScoreSubmit={handleScoreSubmit}
        loading={evaluatieLoading}
        error={evaluatieError}
      />
    </div>
  )
}

export default GesprekResultaat
