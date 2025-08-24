import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BarChart3, Calendar } from 'lucide-react'
import { supabase } from './supabaseClient'

function Themadashboard() {
  const navigate = useNavigate()
  
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [employerId, setEmployerId] = useState(null)
  const [activeMonths, setActiveMonths] = useState([3, 6, 9])
  const [selectedMonth, setSelectedMonth] = useState(null)

  // Haal thema's op
  const fetchThemes = async (employerId, month = null) => {
    if (!employerId) return
    
    try {
      const url = `${process.env.REACT_APP_API_URL || 'https://groeirichting-backend.onrender.com'}/api/organisation-themes/${employerId}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Fout bij ophalen thema's`)
      }

      const data = await response.json()
      let filteredThemes = data.thema_s || []
      
      // Filter op basis van geselecteerde maand
      if (month) {
        const monthStart = new Date(new Date().getFullYear(), month - 1, 1)
        const monthEnd = new Date(new Date().getFullYear(), month, 0, 23, 59, 59)
        
        filteredThemes = filteredThemes.filter(theme => {
          if (theme.voltooide_medewerkers === 0) return false
          if (theme.laatst_bijgewerkt) {
            const updateDate = new Date(theme.laatst_bijgewerkt)
            return updateDate >= monthStart && updateDate <= monthEnd
          }
          return false
        })
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
            
            {selectedMonth && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  📅 Resultaten worden gefilterd op {getMonthName(selectedMonth)}
                  <button
                    onClick={() => setSelectedMonth(null)}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Filter verwijderen
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Thema's */}
        <div className="space-y-6">
          {themes.map((theme) => (
            <div key={theme.theme_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{theme.titel}</h3>
                    <p className="text-gray-600 text-sm mb-3">{theme.beschrijving_werkgever || theme.beschrijving_werknemer}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Voltooid: {theme.voltooide_medewerkers} van {theme.totaal_medewerkers}</span>
                      {theme.gemiddelde_score && (
                        <span>Score: {theme.gemiddelde_score}</span>
                      )}
                    </div>
                  </div>
                  
                  {theme.gemiddelde_score && (
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        theme.gemiddelde_score >= 8 ? 'bg-green-500' : 
                        theme.gemiddelde_score >= 5 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {theme.gemiddelde_score}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
