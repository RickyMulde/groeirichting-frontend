import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { AlertCircle } from 'lucide-react'

function RegistratieVerplicht() {
  const navigate = useNavigate()

  // Auth check wordt nu gedaan door ProtectedRoute
  // useEffect(() => {
  //   const checkSession = async () => {
  //     const { data: { session } } = await supabase.auth.getSession()
  //     if (!session) {
  //       navigate('/login')
  //     }
  //   }
  //   checkSession()
  // }, [navigate])

  // Logout wordt nu centraal afgehandeld door Layout.jsx
  // const handleLogout = async () => { ... }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-[var(--kleur-primary)]" />
        </div>
        
        <h1 className="text-2xl font-semibold text-[var(--kleur-primary)]">
          Registratie Verplicht
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <p className="text-gray-700">
            Het lijkt erop dat je account nog niet volledig is geregistreerd. 
            Dit kan gebeuren als:
          </p>
          
          <ul className="text-left list-disc list-inside space-y-2 text-gray-600">
            <li>Je registratie niet is afgerond</li>
            <li>Je account nog niet is geactiveerd</li>
            <li>Er een probleem is met je gebruikersrol</li>
          </ul>

          <p className="text-gray-700">
            Neem contact op met je werkgever of probeer opnieuw in te loggen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Terug naar Login
          </button>
          {/* Uitloggen knop wordt nu centraal getoond in Layout.jsx */}
        </div>
      </div>
    </div>
  )
}

export default RegistratieVerplicht 