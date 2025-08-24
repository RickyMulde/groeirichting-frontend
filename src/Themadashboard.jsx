import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BarChart3, Calendar, ChevronDown, ChevronUp, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from './supabaseClient'

function Themadashboard() {
  const navigate = useNavigate()
  
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [employerId, setEmployerId] = useState(null)
  const [activeMonths, setActiveMonths] = useState([3, 6, 9])
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [expandedTheme, setExpandedTheme] = useState(null)
  const [summaryData, setSummaryData] = useState({})
  const [summaryLoading, setSummaryLoading] = useState(null)

  // Haal thema's op
  const fetchThemes = async (employerId, month = null) => {
    if (!employerId) return
    
    try {
      let url = `${process.env.REACT_APP_API_URL || 'https://groeirichting-backend.onrender.com'}/api/organisation-themes/${employerId}`
      
      // Voeg maand parameter toe aan URL als er een is geselecteerd
      if (month) {
        url += `?maand=${month}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Fout bij ophalen thema's`)
      }

      const data = await response.json()
      let filteredThemes = data.thema_s || []
      
      // Filter op basis van geselecteerde maand (nu gedaan door backend)
      if (month) {
        // Backend heeft al gefilterd, maar we kunnen nog extra validatie doen
        filteredThemes = filteredThemes.filter(theme => theme.voltooide_medewerkers > 0)
      } else {
        filteredThemes = filteredThemes.filter(theme => theme.voltooide_medewerkers > 0)
      }
      
      setThemes(filteredThemes)
    } catch (err) {
      setError(err.message)
    }
  }

  // Haal werkgever instellingen op
  const fetchEmployerSettings = async (employerId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://groeirichting-backend.onrender.com'}/api/werkgever-gesprek-instellingen/${employerId}`)
      if (response.ok) {
        const config = await response.json()
        setActiveMonths(config.actieve_maanden || [3, 6, 9])
      }
    } catch (err) {
      console.error('Fout bij ophalen werkgever instellingen:', err)
    }
  }

  // Haal samenvatting op voor een thema
  const fetchSummary = async (themeId) => {
    if (summaryData[themeId]) return // Al opgehaald

    try {
      setSummaryLoading(themeId)
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data: employer, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('contact_email', user.email)
        .single()

      if (employerError || !employer) {
        throw new Error('Werkgever niet gevonden')
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://groeirichting-backend.onrender.com'}/api/organisation-summary/${employer.id}/${themeId}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Geen samenvatting gevonden voor thema:', themeId)
          return
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: Fout bij ophalen samenvatting`)
      }

      const data = await response.json()
      setSummaryData(prev => ({
        ...prev,
        [themeId]: data
      }))
    } catch (err) {
      console.error('Fout bij ophalen samenvatting:', err)
      if (!err.message.includes('404') && !err.message.includes('Samenvatting niet gevonden')) {
        setError(err.message)
      }
    } finally {
      setSummaryLoading(null)
    }
  }

  // Toggle thema uitklappen
  const toggleTheme = (themeId) => {
    if (expandedTheme === themeId) {
      setExpandedTheme(null)
    } else {
      setExpandedTheme(themeId)
      // Lazy loading: alleen samenvatting ophalen als nog niet geladen
      if (!summaryData[themeId]) {
        fetchSummary(themeId)
      }
    }
  }

  // Load data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true)
        
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Gebruiker niet ingelogd')
        
        const { data: employer, error: employerError } = await supabase
          .from('employers')
          .select('id')
          .eq('contact_email', user.email)
          .single()

        if (employerError || !employer) {
          throw new Error('Werkgever niet gevonden')
        }

        setEmployerId(employer.id)
        await fetchEmployerSettings(employer.id)
        await fetchThemes(employer.id)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    initializeData()
  }, [])

  // Update thema's wanneer maand wordt gewijzigd
  useEffect(() => {
    if (employerId && selectedMonth) {
      fetchThemes(employerId, selectedMonth)
    }
  }, [employerId, selectedMonth])

  const getMonthName = (month) => {
    const monthNames = [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ]
    return monthNames[month - 1] || month
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Thema's laden...</p>
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
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-red-800 font-medium">Er is een fout opgetreden</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)} 
                className="btn btn-primary text-sm"
              >
                Sluiten
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/werkgever-portaal')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar portaal
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Thema Dashboard</h1>
                <p className="text-gray-600 text-sm sm:text-base">Overzicht van alle thema's en resultaten</p>
              </div>
            </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/werkgever-portaal')}
              className="btn btn-secondary flex items-center gap-2 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar portaal
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Thema Dashboard</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Overzicht van alle thema's en resultaten
              </p>
            </div>
          </div>

          {/* Maandselecter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Selecteer maand</h3>
                <p className="text-gray-600 text-sm">Kies een maand om de resultaten te bekijken</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {activeMonths.map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(selectedMonth === month ? null : month)}
                  className={`p-3 border rounded-lg transition-colors ${
                    selectedMonth === month
                      ? 'bg-[var(--kleur-primary)] text-white border-[var(--kleur-primary)]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">{getMonthName(month)}</span>
                </button>
              ))}
            </div>
            

          </div>
        </div>

        {/* Thema's */}
        <div className="space-y-6">
          {themes.map((theme) => (
            <div key={theme.theme_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              {/* Thema header - klikbaar */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleTheme(theme.theme_id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{theme.titel}</h3>
                    <p className="text-gray-600 text-sm mb-3">{theme.beschrijving_werkgever || theme.beschrijving_werknemer}</p>
                    
                                         <div className="flex items-center gap-4 text-sm text-gray-600">
                       <span>Voltooid: {theme.voltooide_medewerkers} van {theme.totaal_medewerkers}</span>
                     </div>
                  </div>
                  
                  {theme.gemiddelde_score && (
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          theme.gemiddelde_score >= 8 ? 'bg-green-500' : 
                          theme.gemiddelde_score >= 5 ? 'bg-orange-500' : 'bg-red-500'
                        }`}>
                          {theme.gemiddelde_score}
                        </div>
                        
                        {/* Alert indicator bij grote score verschillen */}
                        {theme.heeft_grote_score_verschillen && (
                          <div className="absolute -top-1 -right-1">
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Hover tooltip met individuele scores */}
                        {theme.individuele_scores && theme.individuele_scores.length > 0 && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                            <div className="text-center">
                              <div className="font-semibold mb-1">Individuele scores:</div>
                              <div className="text-xs">
                                {theme.individuele_scores.join(', ')}
                              </div>
                              {theme.heeft_grote_score_verschillen && (
                                <div className="text-yellow-300 text-xs mt-1">
                                  ⚠️ Grote verschillen
                                </div>
                              )}
                            </div>
                            {/* Pijltje naar beneden */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Expand/collapse indicator */}
                <div className="text-center">
                  <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors inline-block">
                    {expandedTheme === theme.theme_id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Uitgeklapte content */}
              {expandedTheme === theme.theme_id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {summaryLoading === theme.theme_id ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">Samenvatting laden...</p>
                    </div>
                  ) : summaryData[theme.theme_id] ? (
                    <div className="p-6 space-y-6">
                      {/* Samenvatting */}
                      {summaryData[theme.theme_id].samenvatting && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <BarChart3 className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Samenvatting</h4>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{summaryData[theme.theme_id].samenvatting}</p>
                        </div>
                      )}

                      {/* Verbeteradviezen */}
                      {summaryData[theme.theme_id].verbeteradvies && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-100 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-orange-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Verbeteradviezen</h4>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{summaryData[theme.theme_id].verbeteradvies}</p>
                        </div>
                      )}

                      {/* GPT Adviezen */}
                      {summaryData[theme.theme_id].gpt_adviezen && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">AI Adviezen</h4>
                          </div>
                          <div className="space-y-4">
                            {Object.entries(summaryData[theme.theme_id].gpt_adviezen).map(([key, advice], index) => (
                              <div key={key} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-blue-900 mb-2">
                                      {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </h5>
                                    <p className="text-blue-800 leading-relaxed">{advice}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Signaalwoorden */}
                      {summaryData[theme.theme_id].signaalwoorden && summaryData[theme.theme_id].signaalwoorden.length > 0 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <AlertCircle className="w-5 h-5 text-purple-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Signaalwoorden</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {summaryData[theme.theme_id].signaalwoorden.map((word, index) => (
                              <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium border border-purple-200">
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="bg-gray-100 rounded-xl p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Laatst bijgewerkt</p>
                            <p className="font-medium text-gray-900">
                              {summaryData[theme.theme_id].laatst_bijgewerkt ? 
                                new Date(summaryData[theme.theme_id].laatst_bijgewerkt).toLocaleDateString('nl-NL') : 
                                'Onbekend'
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Aantal gesprekken</p>
                            <p className="font-medium text-gray-900">{summaryData[theme.theme_id].aantal_gesprekken || 0}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Gemiddelde score</p>
                            <p className="text-gray-900">{summaryData[theme.theme_id].gemiddelde_score || '-'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-medium text-gray-900 capitalize">
                              {summaryData[theme.theme_id].samenvatting_status?.replace('_', ' ') || 'Onbekend'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium mb-2">
                        {theme.voltooide_medewerkers < 4 ? 
                          'Samenvatting nog niet beschikbaar' : 
                          'Geen samenvatting gevonden'
                        }
                      </p>
                      <p className="text-gray-500 text-sm">
                        {theme.voltooide_medewerkers < 4 ? 
                          `Minimaal 4 medewerkers moeten het thema voltooien (${theme.voltooide_medewerkers}/4 voltooid)` : 
                          'Er is nog geen samenvatting gegenereerd voor dit thema'
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {themes.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">Nog geen resultaten beschikbaar</p>
            <p className="text-gray-500 text-sm">
              {selectedMonth 
                ? `Er zijn geen thema's met voltooide medewerkers in ${getMonthName(selectedMonth)}`
                : 'Selecteer een maand om de resultaten te bekijken'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Themadashboard
