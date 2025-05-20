import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function Layout({ children }) {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--kleur-background)] text-[var(--kleur-text)]">
      {/* Navigatiebalk */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-kleur-primary">GroeiRichting</div>

        <nav className="flex items-center space-x-4">
          {/* Hier kun je later navigatielinks plaatsen */}
        </nav>

        <div className="flex items-center space-x-3">
          {session ? (
            <button onClick={handleLogout} className="btn btn-primary">Uitloggen</button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/registreer-werkgever">
                <button className="btn btn-accent">Account aanmaken</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Pagina-inhoud */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} GroeiRichting. Alle rechten voorbehouden.
      </footer>
    </div>
  )
}

export default Layout