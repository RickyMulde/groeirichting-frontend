import { useState, useEffect } from 'react'
import { BarChart3, Users, Settings, X, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function EmployerPortal() {
  const navigate = useNavigate()
  const [taken, setTaken] = useState([])
  const [loading, setLoading] = useState(true)
  const [employerId, setEmployerId] = useState(null)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  // Haal taken status op
  useEffect(() => {
    const fetchTakenStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Haal employer_id op uit user data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('employer_id')
          .eq('id', user.id)
          .single()

        if (userError || !userData?.employer_id) {
          console.error('Fout bij ophalen employer_id:', userError)
          return
        }

        setEmployerId(userData.employer_id)

        // Haal taken status op
        const { data: { session } } = await supabase.auth.getSession()
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen/${userData.employer_id}/taken-status`, {
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setTaken(data.taken || [])
        } else {
          console.error('Fout bij ophalen taken status:', response.status)
        }
      } catch (error) {
        console.error('Fout bij ophalen taken status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTakenStatus()
  }, [])

  return (
    <div className="page-container">
      {/* De absolute gepositioneerde uitlogknop die verwijderd moet worden */}
      {/* <div className="absolute top-4 right-4">
        <button onClick={handleLogout} className="btn btn-primary flex items-center gap-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out w-4 h-4" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Uitloggen
        </button>
      </div> */}

      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Welkom bij het werkgever portaal</h1>

      {/* Takenlijst */}
      {!loading && taken.length > 0 && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Opstart taken</h2>
            <div className="space-y-4">
              {taken.map((taak, index) => (
                <div key={taak.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  {/* Status indicator */}
                  <div className="flex-shrink-0 mt-1">
                    {taak.voltooid ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  
                  {/* Taak inhoud */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{taak.icon}</span>
                      <h3 className="font-medium text-gray-800 text-sm leading-tight">
                        {taak.titel}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      {taak.beschrijving}
                    </p>
                    <Link 
                      to={taak.link}
                      className="inline-flex items-center text-xs text-[var(--kleur-primary)] hover:text-[var(--kleur-primary-dark)] font-medium"
                    >
                      {taak.voltooid ? 'Bekijk instellingen' : 'Ga naar instellingen'} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto pt-8 px-4 space-y-4">
        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-[var(--kleur-primary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Thema Dashboard</h2>
              <p className="text-sm text-gray-500">Bekijk thema's, scores en samenvattingen van alle medewerkers.</p>
            </div>
          </div>
                          <Link to="/thema-dashboard" className="btn btn-primary">Ga naar dashboard</Link>
        </section>

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users className="text-[var(--kleur-accent)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Teams en Werknemers beheren</h2>
              <p className="text-sm text-gray-500">Beheer teams, nodig medewerkers uit en beheer accounts.</p>
            </div>
          </div>
          <Link to="/beheer-teams-werknemers" className="btn btn-accent">Beheer teams en werknemers</Link>
        </section>

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Settings className="text-[var(--kleur-secondary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Instellingen & Thema's</h2>
              <p className="text-sm text-gray-500">Beheer actieve thema's, organisatie-instellingen en gebruikersrechten.</p>
            </div>
          </div>
          <Link to="/instellingen" className="btn btn-secondary">Ga naar instellingen</Link>
        </section>
      </div>
    </div>
  )
}

export default EmployerPortal