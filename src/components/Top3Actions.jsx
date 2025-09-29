import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const Top3Actions = ({ werknemerId, periode, onRefresh }) => {
  const [topActies, setTopActies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedActie, setExpandedActie] = useState(null)

  useEffect(() => {
    if (werknemerId && periode) {
      fetchTopActies()
    }
  }, [werknemerId, periode])

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
          // Geen top acties gevonden - dit is normaal als niet alle thema's zijn afgerond
          console.log('Geen top 3 acties gevonden - wacht tot alle thema\'s zijn afgerond')
          setTopActies(null)
        } else {
          throw error
        }
      } else {
        setTopActies(data)
      }
    } catch (err) {
      console.error('Fout bij ophalen top 3 acties:', err)
      setError('Kon top 3 acties niet ophalen')
    } finally {
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

  if (loading) {
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
        ].map(({ nummer, actie, prioriteit, toelichting }) => (
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
                  <p className="text-gray-900 text-sm leading-relaxed">
                    {actie}
                  </p>
                </div>
              </div>

                             {/* Uitklap knop */}
               <button
                 onClick={() => setExpandedActie(expandedActie === nummer ? null : nummer)}
                 className="ml-3 p-2 text-gray-600 hover:text-gray-800 transition-colors bg-transparent"
                 aria-label={expandedActie === nummer ? 'Inklappen' : 'Uitklappen'}
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedActie === nummer ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                 </svg>
               </button>
            </div>

            {/* Uitklapbare toelichting */}
            {expandedActie === nummer && (
              <div className="mt-3 pt-3 border-t border-blue-100">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {toelichting}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Algemene toelichting */}
      {topActies.algemene_toelichting && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-blue-800 text-sm italic">
            💡 {topActies.algemene_toelichting}
          </p>
        </div>
      )}

      
    </div>
  )
}

export default Top3Actions