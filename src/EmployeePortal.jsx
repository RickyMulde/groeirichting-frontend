import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link, useLocation } from 'react-router-dom'
//import Navigatiebalk from './Navigatiebalk'
import { Smile, History, Settings, Shield } from 'lucide-react'

function EmployeePortal() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

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
          .select('id, email, role, employer_id')
          .eq('id', session.user.id)
          .single()

        if (userDataError || !userData) {
          console.log('EmployeePortal: User data not found')
          
          // Check of er pending employer data is voor provisioning
          const { data: pendingData } = await supabase
            .from('pending_employers')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('status', 'pending_verification')
            .single()
          
          if (pendingData) {
            // Stuur door naar provisioning
            navigate('/provision-employer')
            return
          }
          
          // Geen pending data, stuur naar login
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
    </div>
  )
}

export default EmployeePortal
