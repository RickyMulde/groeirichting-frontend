import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function Navigatiebalk({ extraButtons = [] }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const standaardKnoppen = [
    { label: 'Werkgever-portaal', to: '/werkgever-portaal' },
    { label: 'Gebruikers', to: '/gebruikers' }
  ]

  const alleKnoppen = [...standaardKnoppen, ...extraButtons]

  return (
    <nav className="bg-gray-100 px-6 py-3 flex items-center gap-4 border-b border-gray-200">
      {alleKnoppen.map((knop, index) => (
        <Link 
          key={index} 
          to={knop.to} 
          className="text-gray-700 hover:text-[var(--kleur-primary)] transition-colors"
        >
          {knop.label}
        </Link>
      ))}
      <button 
        onClick={handleLogout} 
        className="ml-auto bg-[var(--kleur-primary)] text-white px-4 py-2 rounded-xl hover:bg-[var(--kleur-secondary)] transition-colors"
      >
        Uitloggen
      </button>
    </nav>
  )
}

export default Navigatiebalk
