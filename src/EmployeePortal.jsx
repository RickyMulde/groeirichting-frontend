import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link, useLocation } from 'react-router-dom'
//import Navigatiebalk from './Navigatiebalk'
import { Smile, History, Settings, Shield, X, Users } from 'lucide-react'

function EmployeePortal() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [showHoeWerktHet, setShowHoeWerktHet] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        // Haal user data op uit database (inclusief role en employer_id)
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          console.log('EmployeePortal: No session found')
          return
        }

        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('id, email, role, employer_id, is_teamleider, teamleider_van_team_id')
          .eq('id', session.user.id)
          .single()

        if (userDataError || !userData) {
          console.error('EmployeePortal: User data not found:', userDataError)
          console.error('User ID:', session.user.id)
          console.error('Error details:', userDataError)
          console.error('Data received:', userData)
          console.error('Session user:', session.user)
          
          // Als er geen users record is, stuur door naar login
          navigate('/login')
          return
        }

        console.log('EmployeePortal: User found:', userData.email)
        setUser(userData)
      } catch (error) {
        console.error('EmployeePortal: Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    // Check voor success message in location state
    if (location.state?.message) {
      setMessage(location.state.message)
      setShowMessage(true)
      
      // Verwijder de message uit de history
      navigate(location.pathname, { replace: true })
      
      // Verberg de message na 5 seconden
      setTimeout(() => setShowMessage(false), 5000)
    }
  }, [location, navigate])

  // Toon loading state tijdens authenticatie
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--kleur-background)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
          <p className="text-[var(--kleur-muted)]">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--kleur-background)] text-[var(--kleur-text)]">
      {/*<Navigatiebalk extraButtons={[]} />*/}

      <div className="max-w-4xl mx-auto pt-20 px-4 space-y-8">
        {showMessage && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-800 font-medium">{message}</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-4">Welkom op het medewerkersportaal</h1>
          
          {/* Toelichting */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Op deze pagina kun je gesprekken starten, je eerdere gesprekken bekijken, je instellingen beheren en meer te weten komen over hoe we met jouw gegevens omgaan.
            </p>
            <button 
              onClick={() => setShowHoeWerktHet(true)}
              className="btn btn-outline text-sm"
            >
              Hoe werkt het?
            </button>
          </div>
        </div>

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Smile className="text-[var(--kleur-primary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Start een gesprek</h2>
              <p className="text-sm text-gray-500">Beantwoord vragen om je situatie en gevoel in kaart te brengen.</p>
            </div>
          </div>
          <button onClick={() => navigate('/thema-overzicht')} className="btn btn-primary">Start het gesprek</button>
        </section>

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <History className="text-[var(--kleur-accent)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Eerdere gesprekken</h2>
              <p className="text-sm text-gray-500">Bekijk samenvattingen van je vorige gesprekken.</p>
            </div>
          </div>
          <button onClick={() => navigate('/gesprek-resultaten')} className="btn btn-accent">Bekijk samenvattingen</button>
        </section>

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Settings className="text-[var(--kleur-secondary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Instellingen</h2>
              <p className="text-sm text-gray-500">Beheer je profiel en voorkeuren.</p>
            </div>
          </div>
          <Link to="/werknemer-instellingen" className="btn btn-secondary">Ga naar instellingen</Link>
        </section>

        {user?.is_teamleider && (
          <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Users className="text-[var(--kleur-primary)] w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold">Teamresultaten bekijken</h2>
                <p className="text-sm text-gray-500">Als teamleider kun je de geaggregeerde resultaten van je team bekijken.</p>
              </div>
            </div>
            <button onClick={() => navigate('/thema-dashboard')} className="btn btn-primary">Bekijk teamresultaten</button>
          </section>
        )}

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Shield className="text-[var(--kleur-primary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Hoe gaan wij om met jouw gegevens?</h2>
              <p className="text-sm text-gray-500">Lees meer over privacy, beveiliging en hoe we jouw gegevens beschermen.</p>
            </div>
          </div>
          <Link to="/uitleg-privacy" className="btn btn-primary">Lees meer</Link>
        </section>
      </div>

      {/* Hoe werkt het Modal */}
      {showHoeWerktHet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--kleur-primary)]">Hoe werkt het?</h2>
                  <p className="text-sm text-gray-600 mt-1">Leer hoe je het GroeiPortaal gebruikt om te groeien.</p>
                </div>
                <button
                  onClick={() => setShowHoeWerktHet(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Stappen */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Via start gesprek kun je gesprekken starten</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Kies het thema waar je wilt beginnen</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Alle thema's moeten worden afgerond</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Na elk thema krijg je een samenvatting en verbeteradviezen te zien</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Na afronden van alle thema's krijg je een top 3 van de verbeteradviezen te zien</h3>
                  </div>
                </div>
              </div>

              {/* Belangrijk privacy sectie */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Belangrijk:</h3>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      Jouw werkgever krijgt nooit letterlijk jouw antwoorden op de vragen te zien. (Dus ook niet de samenvatting of jouw score op een thema.)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowHoeWerktHet(false)}
                  className="btn btn-primary"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeePortal
