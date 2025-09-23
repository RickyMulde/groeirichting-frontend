import { useState, useEffect } from 'react'
import { BarChart3, Users, Settings, X, CheckCircle, XCircle, Calendar, Users2, Target, Lightbulb, CheckCircle2 } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function EmployerPortal() {
  const navigate = useNavigate()
  const [taken, setTaken] = useState([])
  const [loading, setLoading] = useState(true)
  const [employerId, setEmployerId] = useState(null)
  const [verborgen, setVerborgen] = useState(false)
  const [showImplementatieplan, setShowImplementatieplan] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const verbergTakenlijst = async () => {
    if (!employerId) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen/${employerId}/verberg-takenlijst`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setVerborgen(true)
      } else {
        console.error('Fout bij verbergen takenlijst:', response.status)
      }
    } catch (error) {
      console.error('Fout bij verbergen takenlijst:', error)
    }
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
          setVerborgen(data.verborgen || false)
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

      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-4">Welkom bij het werkgever portaal</h1>
      
      {/* Toelichting */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Op deze pagina navigeer je eenvoudig naar de verschillende onderdelen van het GroeiPortaal of bekijk het implementatieplan.
        </p>
        <button 
          onClick={() => setShowImplementatieplan(true)}
          className="btn btn-outline text-sm"
        >
          Implementatieplan
        </button>
      </div>

      {/* Takenlijst */}
      {!loading && taken.length > 0 && !verborgen && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative">
            {/* Kruisje om sectie te verbergen */}
            <button
              onClick={verbergTakenlijst}
              className="absolute top-4 right-4 w-8 h-8 bg-[var(--kleur-primary)] hover:bg-[var(--kleur-primary-dark)] text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
              title="Verberg deze sectie"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pr-12">Opstart taken</h2>
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

      {/* Implementatieplan Modal */}
      {showImplementatieplan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--kleur-primary)]">Implementatieplan</h2>
                  <p className="text-sm text-gray-600 mt-1">Krijg je medewerkers mee, zodat jullie samen kunnen groeien.</p>
                </div>
                <button
                  onClick={() => setShowImplementatieplan(false)}
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
                    <h3 className="font-semibold text-gray-800 mb-2">Bepaal in welke maanden de gespreksrondes moeten plaatsen</h3>
                    <p className="text-sm text-gray-600">(Bijvoorbeeld in rustige(re) maanden (maar niet in vakanties).</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Start elke gespreksronde met een kickoff om elke werknemer enthousiast te krijgen</h3>
                    <p className="text-sm text-gray-600">(Hoe hoger de deelname, des te concreter de Verbeteradviezen zijn)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Zorg dat alle werknemers de gesprekken in de actieve periodes doorlopen</h3>
                    <p className="text-sm text-gray-600">(Stimuleer en herinner je werknemers of blok een moment in hun agenda af.)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Organiseer een follow-up om concrete invulling te geven aan de verbeteradviezen en afspraken te maken</h3>
                  </div>
                </div>
              </div>

              {/* Tips sectie */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-3">Tips:</h3>
                    <ul className="space-y-2 text-sm text-yellow-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Bekijk in Teams en Werknemers welke teams en werknemers een account hebben en/of zijn uitgenodigd.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Betrek je werknemers bij het plan voor een zo hoog mogelijke deelname.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Volg Verbeteradviezen op en bespreek dit met je werknemers om samen te groeien.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowImplementatieplan(false)}
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

export default EmployerPortal