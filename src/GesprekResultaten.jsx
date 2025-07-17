import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, TrendingUp } from 'lucide-react'
import { supabase } from './supabaseClient'

function GesprekResultaten() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [resultaten, setResultaten] = useState([])
  const [selectedRonde, setSelectedRonde] = useState(1)
  const [totalRondes] = useState(10) // Simuleer 10 gespreksrondes

  useEffect(() => {
    const fetchResultaten = async () => {
      try {
        setLoading(true)
        setError(null)

        // Voor nu gebruiken we dummy data
        // Later kunnen we dit vervangen door echte database calls
        // Genereer dummy data voor alle rondes
        const currentData = dummyDataPerRonde[selectedRonde] || dummyDataPerRonde[1]
        setResultaten(currentData)
      } catch (err) {
        console.error('Fout bij ophalen resultaten:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResultaten()
  }, [selectedRonde])

  // Dummy data voor 3 gespreksrondes met 4 thema's per ronde
  const dummyDataPerRonde = {
    1: [
      {
        id: '1-1',
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
        id: '1-2',
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
        id: '1-3',
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
        id: '1-4',
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
    ],
    2: [
      {
        id: '2-1',
        themes: {
          titel: 'Werkdruk en werk-privébalans',
          beschrijving: 'Hoe ervaar je je werkdruk en werk-privébalans?'
        },
        samenvatting: 'Na het eerste gesprek zijn er enkele verbeteringen doorgevoerd. De medewerker ervaart nu een betere balans tussen werk en privé, mede door de flexibele werktijden die zijn ingevoerd. Er is meer ruimte voor ontspanning en de werkdruk voelt meer beheersbaar aan. De medewerker waardeert de proactieve aanpak van het management.',
        vervolgacties: [
          'Blijf de nieuwe werk-privébalans monitoren en evalueer regelmatig.',
          'Overweeg verdere flexibilisering van werktijden indien gewenst.',
          'Plan een vervolggesprek over 3 maanden om de voortgang te bespreken.'
        ],
        score: 9
      },
      {
        id: '2-2',
        themes: {
          titel: 'Teamwerk en samenwerking',
          beschrijving: 'Hoe verloopt de samenwerking binnen je team?'
        },
        samenvatting: 'De teamvergaderingen zijn succesvol geïmplementeerd en de samenwerking is verder verbeterd. Er is meer openheid in communicatie en teamleden durven elkaar beter aan te spreken. De medewerker voelt zich nog meer onderdeel van het team en ervaart een sterke teamgeest.',
        vervolgacties: [
          'Blijf de wekelijkse teamvergaderingen volhouden.',
          'Organiseer een kwartaal team building activiteit.',
          'Evalueer de effectiviteit van de nieuwe communicatiestructuren.'
        ],
        score: 9
      },
      {
        id: '2-3',
        themes: {
          titel: 'Ontwikkeling en groei',
          beschrijving: 'Welke mogelijkheden zie je voor je persoonlijke ontwikkeling?'
        },
        samenvatting: 'Het persoonlijk ontwikkelplan is opgesteld en de eerste trainingen zijn gevolgd. De medewerker heeft nieuwe vaardigheden ontwikkeld en voelt zich meer zelfverzekerd in zijn rol. Er zijn concrete doelen gesteld voor de komende periode en de medewerker is gemotiveerd om verder te groeien.',
        vervolgacties: [
          'Blijf het ontwikkelplan volgen en evalueer de voortgang.',
          'Plan de volgende training of cursus in.',
          'Bespreek met je leidinggevende welke nieuwe uitdagingen je kunt aangaan.'
        ],
        score: 8
      },
      {
        id: '2-4',
        themes: {
          titel: 'Organisatiecultuur en waarden',
          beschrijving: 'Hoe ervaar je de cultuur en waarden van de organisatie?'
        },
        samenvatting: 'De organisatiecultuur is verder versterkt door nieuwe initiatieven. Er is meer aandacht voor diversiteit en inclusie, en de medewerker ervaart dat de waarden nog sterker worden uitgedragen. De open cultuur heeft zich verder ontwikkeld en er is meer ruimte voor feedback en verbeteringen.',
        vervolgacties: [
          'Blijf actief deelnemen aan cultuurinitiatieven.',
          'Deel je positieve ervaringen met nieuwe collega\'s.',
          'Stel voor om een cultuurcommissie op te richten.'
        ],
        score: 9
      }
    ],
    3: [
      {
        id: '3-1',
        themes: {
          titel: 'Werkdruk en werk-privébalans',
          beschrijving: 'Hoe ervaar je je werkdruk en werk-privébalans?'
        },
        samenvatting: 'De werk-privébalans is nu optimaal. De medewerker ervaart geen stress meer en heeft voldoende tijd voor zowel werk als privé. De flexibele werktijden werken uitstekend en de medewerker voelt zich energiek en gemotiveerd. Er is een gezonde balans gevonden die duurzaam is.',
        vervolgacties: [
          'Blijf de huidige balans behouden en monitoren.',
          'Deel je ervaringen met collega\'s die nog zoeken naar balans.',
          'Plan een jaarlijkse evaluatie van je werk-privébalans.'
        ],
        score: 10
      },
      {
        id: '3-2',
        themes: {
          titel: 'Teamwerk en samenwerking',
          beschrijving: 'Hoe verloopt de samenwerking binnen je team?'
        },
        samenvatting: 'Het team functioneert uitstekend en er is sprake van een zeer sterke samenwerking. Alle teamleden werken effectief samen en er is een hoog niveau van vertrouwen. De communicatie is open en constructief, en het team presteert boven verwachting.',
        vervolgacties: [
          'Blijf de sterke teamdynamiek behouden.',
          'Organiseer een teamretraite om de successen te vieren.',
          'Deel best practices met andere teams in de organisatie.'
        ],
        score: 10
      },
      {
        id: '3-3',
        themes: {
          titel: 'Ontwikkeling en groei',
          beschrijving: 'Welke mogelijkheden zie je voor je persoonlijke ontwikkeling?'
        },
        samenvatting: 'De medewerker heeft significante groei doorgemaakt en heeft alle gestelde doelen behaald. Er zijn nieuwe vaardigheden ontwikkeld en de medewerker is klaar voor nieuwe uitdagingen. De organisatie erkent de groei en er zijn mogelijkheden voor verdere ontwikkeling.',
        vervolgacties: [
          'Bespreek promotiemogelijkheden met je leidinggevende.',
          'Stel nieuwe, uitdagende doelen voor de komende periode.',
          'Overweeg een mentorrol voor nieuwe collega\'s.'
        ],
        score: 9
      },
      {
        id: '3-4',
        themes: {
          titel: 'Organisatiecultuur en waarden',
          beschrijving: 'Hoe ervaar je de cultuur en waarden van de organisatie?'
        },
        samenvatting: 'De organisatiecultuur is uitstekend en de waarden worden volledig uitgedragen. Er is sprake van een zeer inclusieve en ondersteunende cultuur waar iedereen zich thuis voelt. De medewerker is trots op de organisatie en draagt actief bij aan de cultuur.',
        vervolgacties: [
          'Blijf een ambassadeur van de organisatiecultuur.',
          'Neem deel aan initiatieven om de cultuur verder te versterken.',
          'Deel je positieve ervaringen in externe netwerken.'
        ],
        score: 10
      }
    ]
  }

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

        {/* Tabs voor gespreksrondes */}
        <div className="mb-6">
          <div className="relative">
            {/* Scroll container */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
              {Array.from({ length: totalRondes }, (_, i) => i + 1).map((ronde) => (
                <button
                  key={ronde}
                  onClick={() => setSelectedRonde(ronde)}
                  className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors min-w-[100px] text-white ${
                    selectedRonde === ronde
                      ? 'bg-orange-500 shadow-sm'
                      : 'bg-[var(--kleur-primary)] hover:bg-[var(--kleur-primary)]/90'
                  }`}
                >
                  Gesprek {ronde}
                </button>
              ))}
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Thema resultaten */}
        <div className="space-y-6">
          {resultaten.map((resultaat) => (
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