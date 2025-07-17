import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, TrendingUp } from 'lucide-react'
import { supabase } from './supabaseClient'

function GesprekResultaten() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [resultaten, setResultaten] = useState([])

  useEffect(() => {
    const fetchResultaten = async () => {
      try {
        setLoading(true)
        setError(null)

        // Haal huidige gebruiker op
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          throw new Error('Gebruiker niet ingelogd')
        }

        // Haal alle gesprekresultaten op voor deze werknemer
        const { data: resultatenData, error: resultatenError } = await supabase
          .from('gesprekresultaten')
          .select(`
            id,
            theme_id,
            samenvatting,
            score,
            gespreksronde,
            gegenereerd_op,
            themes!inner(titel, beschrijving)
          `)
          .eq('werknemer_id', user.id)
          .order('gegenereerd_op', { ascending: false })

        if (resultatenError) throw resultatenError

        setResultaten(resultatenData || [])
      } catch (err) {
        console.error('Fout bij ophalen resultaten:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResultaten()
  }, [])

  // Dummy data voor 4 thema's zoals gevraagd
  const dummyResultaten = [
    {
      id: '1',
      themes: {
        titel: 'Werkdruk en werk-privébalans',
        beschrijving: 'Hoe ervaar je je werkdruk en werk-privébalans?'
      },
      samenvatting: 'De medewerker ervaart geen werkdruk aangezien hij/zij dagelijkse taken afkrijgt zonder invloed op het privéleven. Buiten werktijd is de medewerker niet bezig met werkgerelateerde zaken. De medewerker waardeert de gezamenlijke planning en teamwerk en ziet geen directe verbeterpunten voor de huidige samenwerking of planning. Indien de medewerker directeur zou zijn, zou hij/zij voorstellen om proactief meer commerciële kansen te benutten.',
      vervolgacties: [
        'Plan een vervolggesprek met je leidinggevende om je werkdruk verder te bespreken.',
        'Bekijk het interne aanbod van workshops over energiemanagement en werk-privébalans.',
        'Neem contact op met de HR-afdeling voor persoonlijk advies of ondersteuning.'
      ],
      score: 8
    },
    {
      id: '2',
      themes: {
        titel: 'Teamwerk en samenwerking',
        beschrijving: 'Hoe verloopt de samenwerking binnen je team?'
      },
      samenvatting: 'De medewerker ervaart een positieve werksfeer en goede samenwerking met collega\'s. Er is sprake van open communicatie en wederzijds respect. De medewerker voelt zich gewaardeerd en ondersteund door het team. Samenwerking verloopt soepel en er zijn duidelijke afspraken over verantwoordelijkheden.',
      vervolgacties: [
        'Organiseer regelmatige teamvergaderingen om de samenwerking te versterken.',
        'Overweeg team building activiteiten om de banden verder aan te halen.',
        'Evalueer periodiek de effectiviteit van de huidige samenwerkingsvormen.'
      ],
      score: 9
    },
    {
      id: '3',
      themes: {
        titel: 'Ontwikkeling en groei',
        beschrijving: 'Welke mogelijkheden zie je voor je persoonlijke ontwikkeling?'
      },
      samenvatting: 'De medewerker toont interesse in verdere ontwikkeling en groei binnen de organisatie. Er zijn duidelijke doelen gesteld en de medewerker is gemotiveerd om nieuwe vaardigheden te leren. De organisatie biedt goede mogelijkheden voor training en ontwikkeling.',
      vervolgacties: [
        'Stel samen met je leidinggevende een persoonlijk ontwikkelplan op.',
        'Bekijk het aanbod van interne en externe trainingen.',
        'Plan regelmatige evaluatiegesprekken over je ontwikkeling.'
      ],
      score: 7
    },
    {
      id: '4',
      themes: {
        titel: 'Organisatiecultuur en waarden',
        beschrijving: 'Hoe ervaar je de cultuur en waarden van de organisatie?'
      },
      samenvatting: 'De medewerker voelt zich goed thuis in de organisatiecultuur en herkent zich in de kernwaarden. Er is sprake van een open en inclusieve cultuur waar diversiteit wordt gewaardeerd. De medewerker ervaart dat de organisatie haar waarden ook daadwerkelijk uitdraagt in de dagelijkse praktijk.',
      vervolgacties: [
        'Blijf actief betrokken bij initiatieven die de organisatiecultuur versterken.',
        'Deel je ervaringen en suggesties voor verbetering met HR.',
        'Neem deel aan activiteiten die de organisatiecultuur bevorderen.'
      ],
      score: 8
    }
  ]

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

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Resultaten laden...</p>
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

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/employee-portal')}
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

        {/* Thema resultaten */}
        <div className="space-y-6">
          {dummyResultaten.map((resultaat) => (
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
                    {resultaat.vervolgacties.map((actie, index) => (
                      <li key={index} className="leading-relaxed">{actie}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GesprekResultaten 