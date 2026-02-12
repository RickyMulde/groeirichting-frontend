import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, TrendingUp, Calendar, AlertCircle, Users } from 'lucide-react'
import { supabase } from './supabaseClient'
import Top3Actions from './components/Top3Actions'

function GesprekResultaten() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [resultaten, setResultaten] = useState([])
  const [selectedPeriode, setSelectedPeriode] = useState(null)
  const [beschikbarePeriodes, setBeschikbarePeriodes] = useState([])
  const [user, setUser] = useState(null)
  const [uitgeklapteThemas, setUitgeklapteThemas] = useState(new Set())

  // Functie om maandnaam te krijgen
  const getMaandNaam = (maand) => {
    const monthNames = [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ]
    return monthNames[maand - 1]
  }

  // Haal beschikbare periodes op: alle maanden waarin deze medewerker gesprekresultaten heeft
  const genereerBeschikbarePeriodes = async (userId) => {
    const { data: rows, error } = await supabase
      .from('gesprekresultaten')
      .select('periode')
      .eq('werknemer_id', userId)

    if (error) {
      console.error('Fout bij ophalen periodes uit gesprekresultaten:', error)
      return []
    }

    const uniekePeriodes = new Map()
    if (rows && rows.length > 0) {
      rows.forEach((row) => {
        const p = row.periode
        if (p && !uniekePeriodes.has(p)) {
          const [jaar, maand] = p.split('-').map(Number)
          uniekePeriodes.set(p, {
            periode: p,
            jaar,
            maand,
            label: `${getMaandNaam(maand)} ${jaar}`
          })
        }
      })
    }

    return Array.from(uniekePeriodes.values()).sort((a, b) => b.periode.localeCompare(a.periode))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Haal huidige gebruiker op
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          throw new Error('Gebruiker niet ingelogd')
        }
        setUser(user)

        // Beschikbare periodes = alle maanden waarin deze medewerker gesprekresultaten heeft
        const periodes = await genereerBeschikbarePeriodes(user.id)
        setBeschikbarePeriodes(periodes)

        if (periodes.length > 0) {
          setSelectedPeriode(periodes[0])
        }

      } catch (err) {
        console.error('Fout bij ophalen configuratie:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchResultaten = async () => {
      if (!selectedPeriode) return

      try {
        setLoading(true)
        setError(null)

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Haal resultaten op via nieuwe bulk API (alleen eigen resultaten)
        const { data: { session } } = await supabase.auth.getSession()
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/get-gespreksresultaten-bulk?werknemer_id=${user.id}&periode=${selectedPeriode.periode}`
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.details || errorData.error || 'Fout bij ophalen resultaten')
        }

        const data = await response.json()
        setResultaten(data.resultaten || [])

      } catch (err) {
        console.error('Fout bij ophalen resultaten:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResultaten()
  }, [selectedPeriode])

  const getScoreColor = (score) => {
    if (!score) return 'text-gray-400'
    if (score >= 8) return 'text-green-600'
    if (score >= 5) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score) => {
    if (!score) return 'bg-gray-200'
    if (score >= 8) return 'bg-green-500'
    if (score >= 5) return 'bg-orange-500'
    return 'bg-red-500'
  }

  // State voor regenereren van adviezen
  const [regenererenLoading, setRegenererenLoading] = useState({})
  const [regenererenError, setRegenererenError] = useState({})

  // Functie om vervolgacties op te halen
  const getVervolgacties = (resultaat) => {
    if (resultaat.vervolgacties && resultaat.vervolgacties.length > 0) {
      return resultaat.vervolgacties;
    }
    return [];
  }

  // Functie om adviezen opnieuw te genereren
  const regenereerAdviezen = async (resultaat) => {
    const resultaatId = resultaat.id;
    setRegenererenLoading(prev => ({ ...prev, [resultaatId]: true }));
    setRegenererenError(prev => ({ ...prev, [resultaatId]: null }));

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/genereer-vervolgacties`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          body: JSON.stringify({
            theme_id: resultaat.theme_id,
            werknemer_id: user.id,
            gesprek_id: resultaat.gesprek_id
          })
        }
      );

      if (!response.ok) {
        throw new Error('Kon adviezen niet genereren');
      }

      const data = await response.json();
      
      // Update resultaten met nieuwe adviezen
      setResultaten(prev => prev.map(r => 
        r.id === resultaatId 
          ? { ...r, vervolgacties: data.adviezen || [] }
          : r
      ));
    } catch (error) {
      console.error('Fout bij regenereren adviezen:', error);
      setRegenererenError(prev => ({ ...prev, [resultaatId]: 'Er ging iets mis bij het genereren van adviezen. Probeer het later opnieuw.' }));
    } finally {
      setRegenererenLoading(prev => ({ ...prev, [resultaatId]: false }));
    }
  }

  // Functie om thema uit te klappen/in te klappen
  const toggleThemaUitklappen = (themaId) => {
    setUitgeklapteThemas(prev => {
      const nieuwe = new Set(prev);
      if (nieuwe.has(themaId)) {
        nieuwe.delete(themaId);
      } else {
        nieuwe.add(themaId);
      }
      return nieuwe;
    });
  };

  if (loading && !selectedPeriode) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Configuratie laden...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 font-medium">Er is een fout opgetreden</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Check of er resultaten zijn
  const heeftResultaten = resultaten.some(r => r.heeft_resultaat)
  const themasMetResultaat = resultaten.filter(r => r.heeft_resultaat)

  return (
    <div className="page-container">
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
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Gesprekresultaten</h1>
                <p className="text-gray-600 text-sm sm:text-base">Bekijk hier de samenvattingen en vervolgacties van je afgeronde gesprekken</p>
              </div>
            </div>
            <Users className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>


        {/* Maandselectie */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              Selecteer periode:
            </label>
            <select
              value={selectedPeriode?.periode || ''}
              onChange={(e) => {
                const periode = beschikbarePeriodes.find(p => p.periode === e.target.value)
                setSelectedPeriode(periode)
              }}
              className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
            >
              {beschikbarePeriodes.map((periode) => (
                <option key={periode.periode} value={periode.periode}>
                  {periode.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top 3 Vervolgacties */}
        {selectedPeriode && (
          <Top3Actions 
            werknemerId={user?.id} 
            periode={selectedPeriode.periode}
            onRefresh={() => fetchData()}
          />
        )}

        {/* Loading state voor resultaten */}
        {loading && selectedPeriode && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Resultaten laden...</p>
            </div>
          </div>
        )}

        {/* Geen resultaten melding */}
        {!loading && selectedPeriode && !heeftResultaten && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Er zijn voor {selectedPeriode.label} nog geen gespreksresultaten beschikbaar
            </h3>
            <p className="text-blue-700 mb-6">
              Voer eerst de gesprekken in de thema's uit om je resultaten te bekijken.
            </p>
            <button
              onClick={() => navigate('/thema-overzicht')}
              className="btn btn-primary"
            >
              Ga naar thema overzicht
            </button>
          </div>
        )}

        {/* Thema resultaten */}
        {!loading && selectedPeriode && heeftResultaten && (
          <div className="space-y-6">
            {themasMetResultaat.map((resultaat) => (
              <div key={resultaat.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                {/* Thema header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{resultaat.themes.titel}</h3>
                      <p className="text-gray-600 text-sm">{resultaat.themes.beschrijving_werknemer}</p>
                    </div>
                    
                    {/* Score rechtsbovenin */}
                    <div className="flex-shrink-0 ml-4">
                      <div className="relative">
                        <div 
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${getScoreBackground(resultaat.score)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {resultaat.score}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Samenvatting */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Samenvatting
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{resultaat.samenvatting}</p>
                  </div>

                  {/* Vervolgacties */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      Vervolgacties per thema
                    </h4>
                                         <button
                       onClick={() => toggleThemaUitklappen(resultaat.id)}
                       className="p-2 text-gray-600 hover:text-gray-800 transition-colors bg-transparent"
                       aria-label={uitgeklapteThemas.has(resultaat.id) ? 'Inklappen' : 'Uitklappen'}
                     >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={uitgeklapteThemas.has(resultaat.id) ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    </div>
                    
                    {uitgeklapteThemas.has(resultaat.id) ? (
                      <>
                        {getVervolgacties(resultaat).length > 0 ? (
                          <>
                            <div className="space-y-3 mt-3">
                              {getVervolgacties(resultaat).map((advies, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                                  <h5 className="font-semibold text-gray-900 mb-1">{index + 1}. {typeof advies === 'string' ? advies : advies.titel}</h5>
                                  {typeof advies === 'object' && advies.reden && (
                                    <p className="text-gray-600 text-sm mb-1">{advies.reden}</p>
                                  )}
                                  {typeof advies === 'object' && advies.resultaat && (
                                    <p className="text-[var(--kleur-primary)] text-sm font-medium">{advies.resultaat}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                <strong>Let op:</strong> Voer impactvolle verbeteradviezen alleen in overleg met je werkgever of leidinggevende uit.
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="mt-3 space-y-3">
                            {regenererenError[resultaat.id] && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-700">{regenererenError[resultaat.id]}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <p className="text-gray-600 text-sm">Geen adviezen beschikbaar voor dit thema.</p>
                              <button
                                onClick={() => regenereerAdviezen(resultaat)}
                                disabled={regenererenLoading[resultaat.id]}
                                className="btn btn-secondary text-sm py-1 px-3 flex items-center gap-2"
                              >
                                {regenererenLoading[resultaat.id] ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    Genereren...
                                  </>
                                ) : (
                                  'Adviezen genereren'
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-gray-600 text-sm mt-3">
                        <p>Klik op "Uitklappen" om de vervolgacties te bekijken</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GesprekResultaten 