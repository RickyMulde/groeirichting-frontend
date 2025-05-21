import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--kleur-background)] text-[var(--kleur-text)]">
      {/* Verwijderde header */}

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
