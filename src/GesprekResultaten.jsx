import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import { supabase } from './supabaseClient'

function GesprekResultaten() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [resultaten, setResultaten] = useState([])
  const [selectedPeriode, setSelectedPeriode] = useState(null)
  const [beschikbarePeriodes, setBeschikbarePeriodes] = useState([])
  const [actieveMaanden, setActieveMaanden] = useState([])
  const [werkgeverConfig, setWerkgeverConfig] = useState(null)

  // Functie om maandnaam te krijgen
  const getMaandNaam = (maand) => {
    const monthNames = [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ]
    return monthNames[maand - 1]
  }

  // Functie om periode string te maken (YYYY-MM)
  const maakPeriodeString = (jaar, maand) => {
    return `${jaar}-${String(maand).padStart(2, '0')}`
  }

  // Functie om laatste actieve maand te bepalen
  const bepaalLaatsteActieveMaand = (actieveMaanden) => {
    const now = new Date()
    const huidigeJaar = now.getFullYear()
    const huidigeMaand = now.getMonth() + 1 // JavaScript maanden zijn 0-based

    // Sorteer actieve maanden
    const gesorteerdeMaanden = [...actieveMaanden].sort((a, b) => a - b)
    
    // Zoek de laatste actieve maand (inclusief huidige maand)
    let laatsteActieveMaand = null
    let laatsteActieveJaar = huidigeJaar

    // Check huidige jaar
    for (let i = gesorteerdeMaanden.length - 1; i >= 0; i--) {
      if (gesorteerdeMaanden[i] <= huidigeMaand) {
        laatsteActieveMaand = gesorteerdeMaanden[i]
        laatsteActieveJaar = huidigeJaar
        break
      }
    }

    // Als geen actieve maand gevonden in huidige jaar, gebruik laatste van vorige jaar
    if (!laatsteActieveMaand) {
      laatsteActieveMaand = gesorteerdeMaanden[gesorteerdeMaanden.length - 1]
      laatsteActieveJaar = huidigeJaar - 1
    }

    return { maand: laatsteActieveMaand, jaar: laatsteActieveJaar }
  }

  // Functie om beschikbare periodes te genereren
  const genereerBeschikbarePeriodes = (actieveMaanden, accountAanmaakDatum) => {
    const periodes = []
    const now = new Date()
    const huidigeJaar = now.getFullYear()
    const huidigeMaand = now.getMonth() + 1

    // Start vanaf account aanmaak datum of 2 jaar geleden (wat later is)
    const startJaar = Math.max(accountAanmaakDatum.getFullYear(), huidigeJaar - 2)
    
    for (let jaar = startJaar; jaar <= huidigeJaar; jaar++) {
      for (const maand of actieveMaanden) {
        // Voor huidige jaar, alleen maanden tot en met huidige maand
        if (jaar === huidigeJaar && maand > huidigeMaand) {
          continue
        }
        
        const periode = maakPeriodeString(jaar, maand)
        periodes.push({
          periode,
          jaar,
          maand,
          label: `${getMaandNaam(maand)} ${jaar}`
        })
      }
    }

    // Sorteer van nieuw naar oud
    return periodes.sort((a, b) => b.periode.localeCompare(a.periode))
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

        // Haal werkgever configuratie op
        const { data: werknemer, error: werknemerError } = await supabase
          .from('users')
          .select('employer_id, created_at')
          .eq('id', user.id)
          .single()

        if (werknemerError) throw werknemerError

        const werkgeverResponse = await fetch(`https://groeirichting-backend.onrender.com/api/werkgever-gesprek-instellingen/${werknemer.employer_id}`)
        let config = { actieve_maanden: [3, 6, 9] } // Default fallback
        if (werkgeverResponse.ok) {
          config = await werkgeverResponse.json()
        }
        setWerkgeverConfig(config)
        setActieveMaanden(config.actieve_maanden)

        // Genereer beschikbare periodes
        const accountAanmaakDatum = new Date(werknemer.created_at)
        const periodes = genereerBeschikbarePeriodes(config.actieve_maanden, accountAanmaakDatum)
        setBeschikbarePeriodes(periodes)

        // Bepaal laatste actieve maand
        const laatsteActieve = bepaalLaatsteActieveMaand(config.actieve_maanden)
        const laatstePeriode = maakPeriodeString(laatsteActieve.jaar, laatsteActieve.maand)
        
        // Zoek deze periode in beschikbare periodes
        const gevondenPeriode = periodes.find(p => p.periode === laatstePeriode)
        if (gevondenPeriode) {
          setSelectedPeriode(gevondenPeriode)
        } else if (periodes.length > 0) {
          // Fallback naar eerste beschikbare periode
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

        // Haal resultaten op via nieuwe bulk API
        const response = await fetch(
          `https://groeirichting-backend.onrender.com/api/get-gespreksresultaten-bulk?werknemer_id=${user.id}&periode=${selectedPeriode.periode}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
            }
          }
        )

        if (!response.ok) {
          throw new Error('Fout bij ophalen resultaten')
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

  // Functie om vervolgacties op te halen
  const getVervolgacties = (resultaat) => {
    // Als er echte vervolgacties zijn, gebruik die
    if (resultaat.vervolgacties && resultaat.vervolgacties.length > 0) {
      return resultaat.vervolgacties;
    }

    // Fallback naar dummy acties
    const acties = {
      'Werkdruk en werk-privébalans': [
        'Plan een vervolggesprek met je leidinggevende om je werkdruk verder te bespreken.',
        'Bekijk het interne aanbod van workshops over energiemanagement en werk-privébalans.',
        'Neem contact op met de HR-afdeling voor persoonlijk advies of ondersteuning.'
      ],
      'Teamwerk en samenwerking': [
        'Organiseer regelmatige teamvergaderingen om de samenwerking te versterken.',
        'Overweeg team building activiteiten om de banden verder aan te halen.',
        'Evalueer periodiek de effectiviteit van de huidige samenwerkingsvormen.'
      ],
      'Ontwikkeling en groei': [
        'Stel samen met je leidinggevende een persoonlijk ontwikkelplan op.',
        'Bekijk het aanbod van interne en externe trainingen.',
        'Plan regelmatige evaluatiegesprekken over je ontwikkeling.'
      ],
      'Organisatiecultuur en waarden': [
        'Blijf actief betrokken bij initiatieven die de organisatiecultuur versterken.',
        'Deel je ervaringen en suggesties voor verbetering met HR.',
        'Neem deel aan activiteiten die de organisatiecultuur bevorderen.'
      ]
    }
    
    return acties[resultaat.themes.titel] || [
      'Plan een vervolggesprek met je leidinggevende.',
      'Bekijk het interne aanbod van workshops en trainingen.',
      'Neem contact op met de HR-afdeling voor persoonlijk advies.'
    ]
  }

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
            <FileText className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
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
                      <p className="text-gray-600 text-sm">{resultaat.themes.beschrijving}</p>
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
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      Vervolgacties
                    </h4>
                                         <ol className="list-decimal list-inside text-gray-700 space-y-2">
                       {getVervolgacties(resultaat).map((actie, index) => (
                         <li key={index} className="leading-relaxed">{actie}</li>
                       ))}
                     </ol>
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