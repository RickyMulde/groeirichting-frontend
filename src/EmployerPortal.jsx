import { useState } from 'react'
import { BarChart3, Users, Settings, X } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function EmployerPortal() {
  const navigate = useNavigate()
  const [showWelcomeBalloons, setShowWelcomeBalloons] = useState(true)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const closeBalloon = (balloonIndex) => {
    // Sluit een specifiek ballonnetje
    setShowWelcomeBalloons(false)
  }

  const closeAllBalloons = () => {
    setShowWelcomeBalloons(false)
  }

  const welcomeSteps = [
    {
      title: "Vul een omschrijving van de werkzaamheden van je bedrijf/team in",
      description: "Help je team om beter te begrijpen wat er van hen wordt verwacht",
      icon: "🏢"
    },
    {
      title: "Stel in, in welke maand de gesprekken moeten plaatsvinden",
      description: "Plan je gesprekscyclus voor optimale resultaten",
      icon: "📅"
    },
    {
      title: "Nodig de betreffende werknemers/teamleden uit",
      description: "Start je eerste gesprekken en begin met groeien",
      icon: "👥"
    }
  ]

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

      {/* Welkomst Ballonnetjes */}
      {showWelcomeBalloons && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {welcomeSteps.map((step, index) => (
              <div key={index} className="relative bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Kruisje om ballonnetje te sluiten */}
                <button
                  onClick={() => closeBalloon(index)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 border-white hover:scale-110"
                  title="Sluit dit ballonnetje"
                >
                  <X className="w-4 h-4 font-bold" />
                </button>
                
                {/* Ballonnetje inhoud */}
                <div className="text-center">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          

        </div>
      )}

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