import { LogOut, BarChart3, Users, Settings } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function EmployerPortal() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

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

      <div className="max-w-4xl mx-auto pt-20 px-4 space-y-8">
        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-[var(--kleur-primary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Dashboard</h2>
              <p className="text-sm text-gray-500">Bekijk signalen, actieve thema's en respons in één overzicht.</p>
            </div>
          </div>
          <Link to="/dashboard" className="btn btn-primary">Ga naar dashboard</Link>
        </section>

        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users className="text-[var(--kleur-accent)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Werknemers beheren</h2>
              <p className="text-sm text-gray-500">Nodig medewerkers uit, beheer accounts of verwijder gebruikers.</p>
            </div>
          </div>
          <Link to="/werknemerbeheer" className="btn btn-accent">Beheer werknemers</Link>
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