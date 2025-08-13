import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowLeft, BarChart3, Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from './supabaseClient'
import { usePerformanceMonitor, useApiPerformance } from './hooks/usePerformanceMonitor'

function OrganisationDashboard() {
  const navigate = useNavigate()
  
  // Performance monitoring
  usePerformanceMonitor('OrganisationDashboard')
  const { startApiCall, endApiCall } = useApiPerformance()
  
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedTheme, setExpandedTheme] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(null)
  const [summaryData, setSummaryData] = useState({})
  const [showTooltip, setShowTooltip] = useState(null)
  const [tooltipTimeout, setTooltipTimeout] = useState(null)

  // Load data on mount
  useEffect(() => {
    setError(null) // Reset error state
    fetchOrganisationThemes()
  }, []) // Lege dependency array om circulaire dependency te voorkomen

  // Tooltip management met debouncing
  const handleTooltipShow = useCallback((themeId) => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout)
    }
    
    const timeout = setTimeout(() => {
      setShowTooltip(themeId)
    }, 300) // 300ms delay voor betere UX
    
    setTooltipTimeout(timeout)
  }, [tooltipTimeout])

  const handleTooltipHide = useCallback(() => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout)
      setTooltipTimeout(null)
    }
    setShowTooltip(null)
  }, [tooltipTimeout])

  // Verberg tooltip wanneer er wordt geklikt
  useEffect(() => {
    const handleClickOutside = () => {
      handleTooltipHide()
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout)
      }
    }
  }, [handleTooltipHide, tooltipTimeout])

  const fetchOrganisationThemes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null) // Reset error state
      startApiCall('fetchOrganisationThemes')
      
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data: employer, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('contact_email', user.email)
        .single()

      if (employerError || !employer) {
        throw new Error('Werkgever niet gevonden')
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://groeirichting-backend.onrender.com'}/api/organisation-themes/${employer.id}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: Fout bij ophalen thema's`)
      }

      const data = await response.json()
      setThemes(data.thema_s || [])
    } catch (err) {
      console.error('Fout bij ophalen thema\'s:', err)
      setError(err.message || 'Onbekende fout bij ophalen thema\'s')
    } finally {
      setLoading(false)
      endApiCall('fetchOrganisationThemes')
    }
  }, [navigate, startApiCall, endApiCall])

  const fetchSummary = useCallback(async (themeId) => {
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
          // Geen samenvatting gevonden, dit is normaal
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
      // Alleen echte fouten tonen, niet 404's
      if (!err.message.includes('404') && !err.message.includes('Samenvatting niet gevonden')) {
        setError(err.message || 'Onbekende fout bij ophalen samenvatting')
      }
    } finally {
      setSummaryLoading(null)
    }
  }, [summaryData])

  const generateSummary = useCallback(async (themeId) => {
    try {
      setSummaryLoading(themeId)
      setError(null) // Reset error state
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data: employer, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('contact_email', user.email)
        .single()

      if (employerError || !employer) {
        throw new Error('Werkgever niet gevonden')
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://groeirichting-backend.onrender.com'}/api/generate-organisation-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organisatie_id: employer.id,
          theme_id: themeId
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: Fout bij genereren samenvatting`)
      }

      const data = await response.json()

      // Refresh thema's om nieuwe status te tonen
      await fetchOrganisationThemes()
      
      // Haal nieuwe samenvatting op
      await fetchSummary(themeId)
    } catch (err) {
      console.error('Fout bij genereren samenvatting:', err)
      setError(err.message || 'Onbekende fout bij genereren samenvatting')
    } finally {
      setSummaryLoading(null)
    }
  }, [fetchOrganisationThemes, fetchSummary])

  const toggleTheme = useCallback((themeId) => {
    if (expandedTheme === themeId) {
      setExpandedTheme(null)
    } else {
      setExpandedTheme(themeId)
      // Lazy loading: alleen samenvatting ophalen als nog niet geladen
      if (!summaryData[themeId]) {
        fetchSummary(themeId)
      }
    }
  }, [expandedTheme, summaryData, fetchSummary])

  // Memoized utility functies voor betere performance
  const getScoreColor = useCallback((score) => {
    if (!score) return 'text-gray-400'
    if (score >= 8) return 'text-green-600'
    if (score >= 5) return 'text-orange-600'
    return 'text-red-600'
  }, [])

  const getScoreBackground = useCallback((score) => {
    if (!score) return 'bg-gray-200'
    if (score >= 8) return 'bg-green-500'
    if (score >= 5) return 'bg-orange-500'
    return 'bg-red-500'
  }, [])

  const getScoreGradient = useCallback((score) => {
    if (!score) return 'from-gray-200 to-gray-300'
    if (score >= 8) return 'from-green-400 to-green-600'
    if (score >= 5) return 'from-orange-400 to-orange-600'
    return 'from-red-400 to-red-600'
  }, [])

  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case 'volledig':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'beschikbaar':
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case 'niet_beschikbaar':
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }, [])

  const getStatusText = useCallback((status) => {
    switch (status) {
      case 'volledig':
        return 'Volledig voltooid'
      case 'beschikbaar':
        return 'Samenvatting beschikbaar'
      case 'handmatig':
        return 'Handmatig gegenereerd'
      case 'niet_beschikbaar':
        return 'Nog niet beschikbaar'
      default:
        return 'Onbekend'
    }
  }, [])

  const getProgressPercentage = useCallback((completed, total) => {
    if (total === 0) return 0
    return Math.round((completed / total) * 100)
  }, [])

  // Memoized statistieken voor betere performance
  const dashboardStats = useMemo(() => {
    if (themes.length === 0) return null

    const volledigVoltooid = themes.filter(t => t.samenvatting_status === 'volledig').length
    // Alleen scores meenemen van thema's met minimaal 4 voltooide medewerkers
    const scores = themes
      .filter(t => t.voltooide_medewerkers >= 4 && t.gemiddelde_score !== null)
      .map(t => t.gemiddelde_score)
    const gemiddeldeScore = scores.length > 0 ? 
      (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '-'

    return {
      totaalThemas: themes.length,
      volledigVoltooid,
      gemiddeldeScore
    }
  }, [themes])

  // Memoized thema's voor betere performance (alleen renderen wat nodig is)
  const visibleThemes = useMemo(() => {
    // Voor nu tonen we alle thema's, maar dit kan later worden geoptimaliseerd
    // voor virtual scrolling bij grote datasets
    return themes
  }, [themes])

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
          {/* Error banner */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
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

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button 
                  onClick={() => navigate('/werkgever-portaal')}
                  className="btn btn-secondary flex items-center gap-2 w-fit"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Terug naar portaal
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Organisatie Dashboard</h1>
                  <p className="text-gray-600 text-sm sm:text-base">Overzicht van alle thema's en resultaten</p>
                </div>
              </div>
              <BarChart3 className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
            </div>
          </div>

          {/* Placeholder voor thema's */}
          <div className="text-center py-12">
            <p className="text-gray-500">Probeer de pagina te verversen om de thema's te laden</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Error banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
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
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
            <BarChart3 className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>

          {/* Statistieken */}
          {dashboardStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Totaal thema's</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.totaalThemas}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Volledig voltooid</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.volledigVoltooid}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gemiddelde score</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.gemiddeldeScore}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Thema's */}
        <div className="space-y-6">
          {visibleThemes.map((theme) => (
            <div key={theme.theme_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              {/* Thema header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleTheme(theme.theme_id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{theme.titel}</h3>
                        <p className="text-gray-600 text-sm">{theme.beschrijving_werkgever || theme.beschrijving_werknemer}</p>
                      </div>
                      
                      {/* Score meter */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          {theme.gemiddelde_score ? (
                            <>
                              <div 
                                className={`w-16 h-16 rounded-full bg-gradient-to-br ${getScoreGradient(theme.gemiddelde_score)} flex items-center justify-center text-white font-bold text-lg shadow-lg ${theme.voltooide_medewerkers >= 4 && theme.individuele_scores && theme.individuele_scores.length > 0 ? 'cursor-pointer hover:scale-105' : 'cursor-default'} transition-transform`}
                                onMouseEnter={() => theme.voltooide_medewerkers >= 4 && theme.individuele_scores && theme.individuele_scores.length > 0 ? handleTooltipShow(theme.theme_id) : null}
                                onMouseLeave={handleTooltipHide}
                                title={theme.voltooide_medewerkers >= 4 && theme.individuele_scores && theme.individuele_scores.length > 0 ? "Hover voor individuele scores" : "Gemiddelde score"}
                              >
                                {theme.gemiddelde_score}
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                                <div className={`w-3 h-3 rounded-full ${getScoreBackground(theme.gemiddelde_score)}`}></div>
                              </div>
                              
                              {/* Tooltip voor individuele scores */}
                              {theme.voltooide_medewerkers >= 4 && theme.individuele_scores && theme.individuele_scores.length > 0 && showTooltip === theme.theme_id && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
                                  <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg max-w-xs">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Users className="w-3 h-3" />
                                      <span className="font-medium">Individuele scores (geanonimiseerd)</span>
                                    </div>
                                    <div className="space-y-1">
                                      {theme.individuele_scores.slice(0, 5).map((score, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                          <span className="text-gray-300">Score {index + 1}:</span>
                                          <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                                        </div>
                                      ))}
                                      {theme.individuele_scores.length > 5 && (
                                        <div className="text-gray-400 text-xs mt-1">
                                          +{theme.individuele_scores.length - 5} meer scores
                                        </div>
                                      )}
                                    </div>
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div 
                              className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-bold text-lg shadow-lg cursor-help transition-transform"
                              title="De gemiddelde score is vanaf 4 medewerkers zichtbaar"
                            >
                              -
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Voortgang en status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span 
                            className="text-sm text-gray-600 cursor-help"
                            title="Resultaten zijn vanaf 4 medewerkers zichtbaar"
                          >
                            {theme.voltooide_medewerkers} van {theme.totaal_medewerkers} voltooid
                          </span>
                        </div>
                        
                        {/* Voortgangsbalk */}
                        <div className="flex-1 max-w-xs">
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(theme.gemiddelde_score || 5)} transition-all duration-300`}
                              style={{ width: `${getProgressPercentage(theme.voltooide_medewerkers, theme.totaal_medewerkers)}%` }}
                            ></div>
                          </div>
                        </div>
                        

                      </div>
                      

                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 ml-4">
                    {/* Actie knoppen */}
                    {theme.voltooide_medewerkers >= 4 && !theme.heeft_samenvatting && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          generateSummary(theme.theme_id)
                        }}
                        disabled={summaryLoading === theme.theme_id}
                        className="btn btn-accent text-sm whitespace-nowrap"
                      >
                        {summaryLoading === theme.theme_id ? 'Genereren...' : 'Genereer samenvatting'}
                      </button>
                    )}
                    

                  </div>
                </div>
                
                {/* Expand/collapse section onderaan */}
                <div className="mt-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(theme.samenvatting_status)}
                      <span className="text-sm text-gray-600">
                        {getStatusText(theme.samenvatting_status)}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      {expandedTheme === theme.theme_id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
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
                      <p className="text-gray-500 text-sm mt-2">Dit kan even duren</p>
                    </div>
                  ) : summaryData[theme.theme_id] ? (
                    <div className="p-6 space-y-8">
                      {/* Samenvatting */}
                      {summaryData[theme.theme_id].samenvatting && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <BarChart3 className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Samenvatting</h4>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-base">{summaryData[theme.theme_id].samenvatting}</p>
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
                          <p className="text-gray-700 leading-relaxed text-base">{summaryData[theme.theme_id].verbeteradvies}</p>
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
                            <p className="font-medium text-gray-900">{summaryData[theme.theme_id].gemiddelde_score || '-'}</p>
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
                      <p className="text-gray-500 text-sm mb-4">
                        {theme.voltooide_medewerkers < 4 ? 
                          `Minimaal 4 medewerkers moeten het thema voltooien (${theme.voltooide_medewerkers}/4 voltooid)` : 
                          'Er is nog geen samenvatting gegenereerd voor dit thema'
                        }
                      </p>
                      {theme.voltooide_medewerkers >= 4 && (
                        <button
                          onClick={() => generateSummary(theme.theme_id)}
                          disabled={summaryLoading === theme.theme_id}
                          className="btn btn-accent"
                        >
                          {summaryLoading === theme.theme_id ? 'Genereren...' : 'Genereer samenvatting'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleThemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nog geen thema's beschikbaar</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrganisationDashboard 