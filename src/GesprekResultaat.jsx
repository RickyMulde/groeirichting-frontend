import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, FileText, CheckCircle, PlayCircle, Target } from 'lucide-react'
import { supabase } from './supabaseClient'

function GesprekResultaat() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gesprekData, setGesprekData] = useState(null)
  const [vervolgactiesUitgeklapt, setVervolgactiesUitgeklapt] = useState(false)
  const [themaVoortgang, setThemaVoortgang] = useState([])
  const [voortgangLoading, setVoortgangLoading] = useState(true)

  // Functie om thema voortgang op te halen
  const haalThemaVoortgangOp = async (userId) => {
    try {
      // Haal alle thema's op
      const { data: themas, error: themaError } = await supabase
        .from('themes')
        .select('id, titel, beschrijving')
        .order('id')

      if (themaError) throw themaError

      // Haal gesprekken op voor deze gebruiker
      const { data: gesprekken, error: gesprekError } = await supabase
        .from('gesprek')
        .select('theme_id, status, gestart_op')
        .eq('werknemer_id', userId)
        .order('gestart_op', { ascending: false })

      if (gesprekError) throw gesprekError

      // Combineer data voor voortgang
      const voortgang = themas.map(thema => {
        const gesprek = gesprekken?.find(g => g.theme_id === thema.id)
        const isAfgerond = gesprek?.status === 'Afgerond'
        const isBezig = gesprek?.status === 'Nog niet afgerond'
        
        return {
          ...thema,
          status: isAfgerond ? 'afgerond' : isBezig ? 'bezig' : 'nieuw',
          gesprek_id: gesprek?.id,
          laatste_gesprek: gesprek?.gestart_op
        }
      })

      setThemaVoortgang(voortgang)
    } catch (error) {
      console.error('Fout bij ophalen thema voortgang:', error)
    } finally {
      setVoortgangLoading(false)
    }
  }

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

        // Haal thema voortgang op
        await haalThemaVoortgangOp(user.id)

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
          .select('id, werknemer_id, status')
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

        // Haal samenvatting op via backend API met gesprek_id
        const response = await fetch(
          `https://groeirichting-backend.onrender.com/api/get-samenvatting?theme_id=${themeId}&werknemer_id=${user.id}&gesprek_id=${gesprekId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
            }
          }
        )

        if (!response.ok) {
          if (response.status === 404) {
            // Probeer eerst een samenvatting te genereren
            try {
              console.log('Geen samenvatting gevonden, probeer er een te genereren...');
              console.log('Parameters:', { theme_id: themeId, werknemer_id: user.id, gesprek_id: gesprekId });
              
              const generateResponse = await fetch(
                'https://groeirichting-backend.onrender.com/api/genereer-samenvatting',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
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
                
                // Wacht even zodat de backend tijd heeft om de samenvatting te genereren
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Probeer nu opnieuw de samenvatting op te halen
                const retryResponse = await fetch(
                  `https://groeirichting-backend.onrender.com/api/get-samenvatting?theme_id=${themeId}&werknemer_id=${user.id}&gesprek_id=${gesprekId}`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
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

          // Probeer vervolgacties op te halen als fallback
          try {
            const vervolgactiesResponse = await fetch(
              `https://groeirichting-backend.onrender.com/api/generate-top-actions?theme_id=${themeId}&werknemer_id=${user.id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
                }
              }
            );

            if (vervolgactiesResponse.ok) {
              const updatedData = await vervolgactiesResponse.json();
              setGesprekData({
                themeTitle: themeData.titel,
                samenvatting: updatedData.samenvatting,
                score: updatedData.score,
                magWerkgeverInzien: updatedData.mag_werkgever_inzien,
                vervolgacties: updatedData.vervolgacties || [],
                vervolgacties_toelichting: updatedData.vervolgacties_toelichting || '',
                themeId,
                gesprekId
              });
              return;
            }
          } catch (error) {
            console.error('Fout bij genereren vervolgacties:', error);
          }
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

  // Functie om naar het volgende thema te gaan
  const startVolgendThema = async (themaId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Maak een nieuw gesprek aan
      const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: user.id,
          theme_id: themaId,
          status: 'Nog niet afgerond'
        })
      });
      
      const result = await response.json();
      if (response.ok && result.gesprek_id) {
        navigate(`/gesprek?theme_id=${themaId}&gesprek_id=${result.gesprek_id}`);
      }
    } catch (error) {
      console.error('Fout bij starten volgend thema:', error);
    }
  }

  // Functie om status kleur te bepalen
  const getStatusKleur = (status) => {
    switch (status) {
      case 'afgerond': return 'bg-green-100 text-green-800 border-green-200'
      case 'bezig': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'nieuw': return 'bg-gray-100 text-gray-600 border-gray-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  // Functie om status icoon te bepalen
  const getStatusIcoon = (status) => {
    switch (status) {
      case 'afgerond': return <CheckCircle className="w-4 h-4" />
      case 'bezig': return <PlayCircle className="w-4 h-4" />
      case 'nieuw': return <Target className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  // Functie om status tekst te bepalen
  const getStatusTekst = (status) => {
    switch (status) {
      case 'afgerond': return 'Afgerond'
      case 'bezig': return 'Bezig'
      case 'nieuw': return 'Nog niet gestart'
      default: return 'Onbekend'
    }
  }

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
            onClick={() => navigate('/employee-portal')} 
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
            onClick={() => navigate('/employee-portal')} 
            className="btn btn-primary"
          >
            Terug naar portaal
          </button>
        </div>
      </div>
    )
  }

  // Bereken voortgang statistieken
  const afgerondeThemas = themaVoortgang.filter(t => t.status === 'afgerond').length
  const totaleThemas = themaVoortgang.length
  const voortgangPercentage = totaleThemas > 0 ? Math.round((afgerondeThemas / totaleThemas) * 100) : 0
  const openstaandeThemas = themaVoortgang.filter(t => t.status !== 'afgerond')

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

          {/* Voortgangssectie */}
          <section className="bg-white shadow-md rounded-xl p-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">Jouw voortgang</h2>
              <p className="text-sm text-[var(--kleur-muted)]">
                Bekijk je voortgang en start direct met het volgende thema
              </p>
            </div>

            {/* Voortgangsbalk */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Algemene voortgang</span>
                <span className="text-sm font-medium text-[var(--kleur-primary)]">{afgerondeThemas}/{totaleThemas} thema's afgerond</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[var(--kleur-primary)] to-[var(--kleur-accent)] h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${voortgangPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">{voortgangPercentage}% voltooid</p>
            </div>

            {/* Thema overzicht */}
            {!voortgangLoading && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Thema overzicht</h3>
                <div className="grid gap-3">
                  {themaVoortgang.map((thema) => (
                    <div 
                      key={thema.id} 
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        thema.id === gesprekData.themeId 
                          ? 'ring-2 ring-[var(--kleur-primary)] ring-opacity-50 bg-[var(--kleur-primary)] bg-opacity-5' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-full ${getStatusKleur(thema.status)}`}>
                          {getStatusIcoon(thema.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{thema.titel}</h4>
                          <p className="text-sm text-gray-500 truncate">{thema.beschrijving}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusKleur(thema.status)}`}>
                          {getStatusTekst(thema.status)}
                        </span>
                        
                        {thema.status === 'nieuw' && (
                          <button
                            onClick={() => startVolgendThema(thema.id)}
                            className="btn btn-primary text-sm px-4 py-2"
                          >
                            Start thema
                          </button>
                        )}
                        
                        {thema.status === 'bezig' && thema.gesprek_id && (
                          <button
                            onClick={() => navigate(`/gesprek?theme_id=${thema.id}&gesprek_id=${thema.gesprek_id}`)}
                            className="btn btn-secondary text-sm px-4 py-2"
                          >
                            Ga verder
                          </button>
                        )}
                        
                        {thema.status === 'afgerond' && (
                          <button
                            onClick={() => navigate(`/gesprek-resultaat?theme_id=${thema.id}&gesprek_id=${thema.gesprek_id}`)}
                            className="btn btn-outline text-sm px-4 py-2"
                          >
                            Bekijk resultaat
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call-to-action voor openstaande thema's */}
            {openstaandeThemas.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 mb-1">Je hebt nog {openstaandeThemas} thema{openstaandeThemas > 1 ? 's' : ''} open staan</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Klik op een thema hierboven om direct door te gaan, of bekijk eerst je samenvatting hieronder.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {openstaandeThemas.slice(0, 3).map((thema) => (
                        <button
                          key={thema.id}
                          onClick={() => startVolgendThema(thema.id)}
                          className="btn btn-primary text-xs px-3 py-1.5"
                        >
                          Start {thema.titel}
                        </button>
                      ))}
                      {openstaandeThemas.length > 3 && (
                        <span className="text-xs text-blue-600 self-center">
                          +{openstaandeThemas - 3} meer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

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
    </div>
  )
}

export default GesprekResultaat
