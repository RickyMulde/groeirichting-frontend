import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link, useLocation } from 'react-router-dom'
//import Navigatiebalk from './Navigatiebalk'
import { Smile, History, Settings, Shield } from 'lucide-react'

function EmployeePortal() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        navigate('/login')
      } else {
        setUser(data.user)
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
