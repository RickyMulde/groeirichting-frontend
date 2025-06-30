import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from './supabaseClient'

function GesprekResultaat() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gesprekData, setGesprekData] = useState(null)

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
            } catch (generateError) {
              console.error('Fout bij genereren samenvatting:', generateError);
            }
            
            // Als genereren niet lukte, toon foutmelding
            throw new Error('Geen samenvatting gevonden voor dit gesprek')
          }
          throw new Error('Fout bij ophalen samenvatting')
        }

        const resultData = await response.json()

        setGesprekData({
          themeTitle: themeData.titel,
          samenvatting: resultData.samenvatting,
          score: resultData.score,
          magWerkgeverInzien: resultData.mag_werkgever_inzien,
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

  return (
    <div className="centered-page space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[var(--kleur-primary)]">Samenvatting van je gesprek</h1>
        <p className="text-[var(--kleur-muted)]">Bekijk hier de resultaten van je gesprek</p>
      </div>

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

      <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">De samenvatting en score zijn anoniem gedeeld met je werkgever</h2>
          <p className="text-sm text-[var(--kleur-muted)]">
            Privacy by design. Jouw werkgever kan een samenvatting nooit herleiden naar jou persoonlijk. 
            Bekijk hoe en wat er met jouw gegevens gebeurd
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn btn-primary w-full sm:w-auto">Wat gebeurt er met jouw gegevens?</button>
        </div>
      </section>
    </div>
  )
}

export default GesprekResultaat
