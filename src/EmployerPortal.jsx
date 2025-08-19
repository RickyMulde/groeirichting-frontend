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

      {/* Onboarding Checklist */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-[var(--kleur-primary)] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[var(--kleur-primary)] mb-3">
              🚀 Welkom! Laten we je account instellen
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Voltooi deze stappen om je account optimaal te benutten en je team te laten groeien.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="font-medium text-gray-800">Vul een omschrijving van de werkzaamheden van je bedrijf/team in</span>
                  <p className="text-xs text-gray-500 mt-1">Help je team om beter te begrijpen wat er van hen wordt verwacht</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="font-medium text-gray-800">Stel in, in welke maand de gesprekken moeten plaatsvinden</span>
                  <p className="text-xs text-gray-500 mt-1">Plan je gesprekscyclus voor optimale resultaten</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="font-medium text-gray-800">Nodig de betreffende werknemers/teamleden uit</span>
                  <p className="text-xs text-gray-500 mt-1">Start je eerste gesprekken en begin met groeien</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-gray-500">
                💡 <strong>Tip:</strong> Deze checklist verdwijnt automatisch na 30 dagen of wanneer je alle stappen hebt voltooid.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-8 px-4 space-y-8">
        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-[var(--kleur-primary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Thema Dashboard</h2>
              <p className="text-sm text-gray-500">Bekijk thema's, scores en samenvattingen van alle medewerkers.</p>
            </div>
          </div>
          <Link to="/organisatie-dashboard" className="btn btn-primary">Ga naar dashboard</Link>
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