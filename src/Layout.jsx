import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Menu, X } from 'lucide-react'
import CookieBanner from './components/CookieBanner'
import ZohoSalesIQ from './components/ZohoSalesIQ'

function Layout({ children }) {
  const [session, setSession] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Layout luistert altijd naar auth state changes voor logout knop
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Layout: Session error:', error)
        }
        setSession(session)
      } catch (error) {
        console.error('Layout: Auth initialization error:', error)
        setSession(null)
      }
    }

    initializeAuth()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      // Probeer uit te loggen bij Supabase
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Layout: Logout error:', error)
        // Ga door met logout ook bij fout
      }
      
      // Clear alle lokale storage
      localStorage.clear()
      sessionStorage.clear()
      
      // Clear local state
      setSession(null)
      
    } catch (error) {
      console.error('Layout: Logout error:', error)
      // Ga door met logout ook bij fout
      setSession(null)
    } finally {
      // Navigeer en reload altijd
      navigate('/')
      
      // Forceer page reload om alle state te resetten
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }


  return (
    <div className="min-h-screen flex flex-col bg-[var(--kleur-background)] text-[var(--kleur-text)]">
      {/* Navigatiebalk */}
      <header className="bg-white shadow-md relative">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/Logo.svg" 
              alt="GroeiRichting Logo" 
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigatie - Alleen zichtbaar voor niet-ingelogde gebruikers */}
          {!session && (
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Home
              </Link>
              <Link 
                to="/hoe-werkt-het" 
                className="px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Hoe werkt het
              </Link>
              <Link 
                to="/offerte" 
                className="px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Offerte
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Contact
              </Link>
              <Link 
                to="/privacy-veiligheid" 
                className="px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Privacy & Veiligheid
              </Link>
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            {/* Mobile Navigatie - Alleen zichtbaar voor niet-ingelogde gebruikers */}
            {!session && (
              <nav className="px-6 py-4 space-y-2">
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/hoe-werkt-het" 
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Hoe werkt het
                </Link>
                <Link 
                  to="/offerte" 
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Offerte
                </Link>
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Contact
                </Link>
                <Link 
                  to="/privacy-veiligheid" 
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Privacy & Veiligheid
                </Link>
              </nav>
            )}
            
            {/* Mobile Auth Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 space-y-3">
              {session ? (
                <button 
                  onClick={() => {
                    handleLogout()
                    closeMobileMenu()
                  }} 
                  className="w-full btn btn-primary"
                >
                  Uitloggen
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobileMenu}>
                    <button className="w-full btn btn-primary">Login</button>
                  </Link>
                  <Link to="/registreer-werkgever" onClick={closeMobileMenu}>
                    <button className="w-full btn btn-accent">Account aanmaken</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Pagina-inhoud */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} GroeiRichting. Alle rechten voorbehouden.
      </footer>

      {/* Cookie Banner - Alleen voor niet-ingelogde gebruikers */}
      {!session && <CookieBanner />}

      {/* Zoho SalesIQ Chat Widget - AVG-compliant, laadt alleen na cookie consent */}
      <ZohoSalesIQ />
    </div>
  )
}

export default Layout