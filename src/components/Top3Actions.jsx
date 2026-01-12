import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

const Top3Actions = ({ werknemerId, periode, onRefresh }) => {
  const [topActies, setTopActies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedMicroAdviezen, setExpandedMicroAdviezen] = useState({}) // {actieNummer: true/false}
  const [isGenerating, setIsGenerating] = useState(false)
  const pollingIntervalRef = useRef(null)

  useEffect(() => {
    if (werknemerId && periode) {
      fetchTopActies()
    }
    
    // Cleanup polling interval bij unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
  }, [werknemerId, periode])

  const checkAlleThemasAfgerond = async () => {
    try {
      // Haal toegestane thema's op via API (gebruikt nieuwe filtering logica)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        console.error('Geen sessie gevonden')
        return false
      }

      const themaDataResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-thema-data-werknemer/${werknemerId}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      )

      if (!themaDataResponse.ok) {
        console.error('Kon thema data niet ophalen:', themaDataResponse.status)
        return false
      }

      const themaData = await themaDataResponse.json()
      const toegestaneThemas = themaData.thema_data || []

      if (toegestaneThemas.length === 0) {
        console.log('Geen toegestane thema\'s gevonden')
        return false
      }

      // Haal alle afgeronde gesprekken op voor deze werknemer in deze periode
      const periodeStart = `${periode}-01`
      const [jaar, maand] = periode.split('-').map(Number)
      const volgendeMaand = maand === 12 ? 1 : maand + 1
      const volgendJaar = maand === 12 ? jaar + 1 : jaar
      const periodeEind = `${volgendJaar}-${String(volgendeMaand).padStart(2, '0')}-01`

      const { data: gesprekken, error: gesprekError } = await supabase
        .from('gesprek')
        .select('theme_id')
        .eq('werknemer_id', werknemerId)
        .eq('status', 'Afgerond')
        .gte('gestart_op', periodeStart)
        .lt('gestart_op', periodeEind)

      if (gesprekError) {
        console.error('Kon gesprekken niet ophalen:', gesprekError)
        return false
      }

      // Check of alle toegestane thema's zijn afgerond
      const uniekeThemasInGesprekken = [...new Set(gesprekken?.map(g => g.theme_id) || [])]
      const toegestaneThemeIds = toegestaneThemas.map(t => t.id)
      const alleThemasAfgerond = uniekeThemasInGesprekken.length === toegestaneThemeIds.length &&
        uniekeThemasInGesprekken.every(id => toegestaneThemeIds.includes(id))

      console.log(`Check thema's: ${uniekeThemasInGesprekken.length}/${toegestaneThemeIds.length} afgerond`)
      return alleThemasAfgerond
    } catch (err) {
      console.error('Fout bij checken of alle thema\'s zijn afgerond:', err)
      return false
    }
  }

  const triggerGeneratie = async () => {
    try {
      setIsGenerating(true)
      console.log('🔄 Start generatie top 3 acties...')

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Geen sessie gevonden')
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/generate-top-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          werknemer_id: werknemerId,
          periode: periode
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.details || errorData.error || 'Generatie gefaald')
      }

      // Start polling om te checken wanneer generatie klaar is
      startPolling()
    } catch (err) {
      console.error('Fout bij triggeren generatie:', err)
      setError(`Kon generatie niet starten: ${err.message}`)
      setIsGenerating(false)
    }
  }

  const startPolling = () => {
    // Poll elke 3 seconden tot data beschikbaar is
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const { data, error } = await supabase
          .from('top_vervolgacties')
          .select('*')
          .eq('werknemer_id', werknemerId)
          .eq('periode', periode)
          .single()

        if (!error && data) {
          // Data gevonden, stop polling
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
          }
          setTopActies(data)
          setIsGenerating(false)
          setLoading(false)
        } else if (error && error.code !== 'PGRST116') {
          // Echte error, stop polling
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
          }
          throw error
        }
        // Anders: nog geen data, blijf pollen
      } catch (err) {
        console.error('Fout bij polling:', err)
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current)
          pollingIntervalRef.current = null
        }
        setIsGenerating(false)
        setError('Fout bij ophalen gegenereerde acties')
      }
    }, 3000) // Poll elke 3 seconden
  }

  const fetchTopActies = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('top_vervolgacties')
        .select('*')
        .eq('werknemer_id', werknemerId)
        .eq('periode', periode)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // Geen top acties gevonden - check of alle thema's zijn afgerond
          console.log('Geen top 3 acties gevonden - check of alle thema\'s zijn afgerond...')
          const alleThemasAfgerond = await checkAlleThemasAfgerond()
          
          if (alleThemasAfgerond) {
            // Alle thema's zijn afgerond, trigger generatie
            console.log('✅ Alle thema\'s zijn afgerond - trigger generatie')
            await triggerGeneratie()
            return // Polling wordt gestart in triggerGeneratie
          } else {
            // Nog niet alle thema's afgerond
            setTopActies(null)
            setLoading(false)
          }
        } else {
          throw error
        }
      } else {
        setTopActies(data)
        setLoading(false)
      }
    } catch (err) {
      console.error('Fout bij ophalen top 3 acties:', err)
      setError('Kon top 3 acties niet ophalen')
      setLoading(false)
    }
  }


  const getPrioriteitKleur = (prioriteit) => {
    switch (prioriteit) {
      case 'hoog':
        return 'bg-red-100 border-red-300 text-red-800'
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'laag':
        return 'bg-green-100 border-green-300 text-green-800'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getPrioriteitIcon = (prioriteit) => {
    switch (prioriteit) {
      case 'hoog':
        return '🔥'
      case 'medium':
        return '⚡'
      case 'laag':
        return '🌱'
      default:
        return '📋'
    }
  }

  if (loading || isGenerating) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-md p-6 mb-6">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-blue-900">Top 3 prioriteiten worden gegenereerd...</h2>
            <p className="text-blue-700 text-sm">
              We analyseren alle je gesprekken om de belangrijkste acties te bepalen
            </p>
            <p className="text-blue-600 text-xs font-medium">
              Let op: het genereren van deze top 3 prioriteiten duurt ongeveer 1 minuut.
            </p>
            {isGenerating && (
              <p className="text-blue-500 text-xs italic mt-2">
                ⏳ Generatie gestart, wachten op resultaat...
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div className="text-center space-y-4">
          <div className="text-red-600 text-4xl">⚠️</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-800">Fout bij laden top 3 acties</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchTopActies}
            className="btn btn-secondary text-sm"
          >
            🔄 Opnieuw proberen
          </button>
        </div>
      </div>
    )
  }

  if (!topActies) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg shadow-md p-6 mb-6">
        <div className="text-center space-y-4">
          <div className="text-amber-600 text-4xl">⏳</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-800">Top 3 prioriteiten worden automatisch gegenereerd</h3>
            <p className="text-amber-700 text-sm">
              Zodra je alle thema's van deze periode hebt doorlopen, worden je top 3 prioriteiten automatisch gegenereerd.
            </p>
            <p className="text-amber-600 text-xs">
              Dit gebeurt direct na het afronden van je laatste thema.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-md p-6 mb-6">
             {/* Hoofdtitel */}
       <div className="flex items-center justify-between mb-4">
         <div>
           <h2 className="text-xl font-bold text-blue-900 mb-1">
             🎯 Top 3 prioriteiten voor jouw Groei
           </h2>
           <p className="text-blue-700 text-sm">
             Deze acties hebben de hoogste impact op basis van alle gevoerde gesprekken
           </p>
         </div>
         <div className="text-xs text-blue-600">
           Gegenereerd op: {new Date(topActies.gegenereerd_op).toLocaleDateString('nl-NL')}
         </div>
       </div>

      {/* Top 3 Acties */}
      <div className="space-y-4">
        {[
          { nummer: 1, actie: topActies.actie_1, prioriteit: topActies.prioriteit_1, toelichting: topActies.toelichting_per_actie[0] },
          { nummer: 2, actie: topActies.actie_2, prioriteit: topActies.prioriteit_2, toelichting: topActies.toelichting_per_actie[1] },
          { nummer: 3, actie: topActies.actie_3, prioriteit: topActies.prioriteit_3, toelichting: topActies.toelichting_per_actie[2] }
        ].map(({ nummer, actie, prioriteit, toelichting }) => {
          // Parse actie JSON als het een string is
          let actieData = actie
          if (typeof actie === 'string') {
            try {
              actieData = JSON.parse(actie)
            } catch (e) {
              // Als parsing faalt, gebruik originele string
              actieData = { titel: actie }
            }
          }
          
          // Haal micro-adviezen op als ze bestaan
          const microAdviezen = actieData.micro_adviezen || []
          const actieTitel = actieData.titel || actie
          
          return (
            <div key={nummer} className="bg-white rounded-lg border border-blue-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  {/* Nummer en prioriteit */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {nummer}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPrioriteitKleur(prioriteit)}`}>
                      {getPrioriteitIcon(prioriteit)} {prioriteit}
                    </span>
                  </div>
                  
                  {/* Actie tekst */}
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm leading-relaxed font-medium">
                      {actieTitel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toelichting - altijd zichtbaar */}
              {toelichting && (
                <div className="mt-3 pt-3 border-t border-blue-100">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {toelichting}
                  </p>
                </div>
              )}
              
              {/* Micro-adviezen - alleen na openklappen */}
              {microAdviezen.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setExpandedMicroAdviezen(prev => ({
                      ...prev,
                      [nummer]: !prev[nummer]
                    }))}
                    className="flex items-center gap-2 text-white hover:text-gray-200 text-sm font-medium transition-colors"
                  >
                    <svg 
                      className={`w-4 h-4 transition-transform ${expandedMicroAdviezen[nummer] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>3 tips om dit te doen</span>
                  </button>
                  
                  {expandedMicroAdviezen[nummer] && (
                    <div className="mt-2 pl-6 space-y-2">
                      {microAdviezen.map((micro, microIndex) => (
                        <div key={microIndex} className="text-sm">
                          <p className="font-medium text-gray-900">{micro.titel}</p>
                          {micro.toelichting && (
                            <p className="text-xs text-gray-600 italic mt-0.5">{micro.toelichting}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Algemene toelichting - niet meer getoond aan medewerker, maar wel opgeslagen in database */}

      
    </div>
  )
}

export default Top3Actions