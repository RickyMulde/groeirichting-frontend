import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Menu, X, ChevronDown } from 'lucide-react'
import CookieBanner from './components/CookieBanner'
import ZohoSalesIQ from './components/ZohoSalesIQ'

function Layout({ children }) {
  const [session, setSession] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVoorWieOpen, setIsVoorWieOpen] = useState(false)
  const [isMobileVoorWieOpen, setIsMobileVoorWieOpen] = useState(false)
  const dropdownRef = useRef(null)
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
    setIsMobileVoorWieOpen(false)
  }

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVoorWieOpen(false)
      }
    }

    if (isVoorWieOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVoorWieOpen])


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
              
              {/* Voor wie Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsVoorWieOpen(true)}
                onMouseLeave={() => setIsVoorWieOpen(false)}
              >
                <button
                  onClick={() => setIsVoorWieOpen(!isVoorWieOpen)}
                  className="px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-1"
                >
                  Voor wie
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${isVoorWieOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Dropdown Menu */}
                {isVoorWieOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/voor-directie-en-office"
                      onClick={() => setIsVoorWieOpen(false)}
                      className="block px-4 py-3 text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="font-medium">Directie & Office</div>
                      <div className="text-sm text-[var(--kleur-muted)]">Voor MKB-bedrijven</div>
                    </Link>
                    <Link
                      to="/voor-hr-professionals"
                      onClick={() => setIsVoorWieOpen(false)}
                      className="block px-4 py-3 text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 border-t border-gray-100"
                    >
                      <div className="font-medium">HR Professionals</div>
                      <div className="text-sm text-[var(--kleur-muted)]">Voor corporate organisaties</div>
                    </Link>
                  </div>
                )}
              </div>

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
                
                {/* Mobile Voor wie Dropdown */}
                <div>
                  <button
                    onClick={() => setIsMobileVoorWieOpen(!isMobileVoorWieOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Voor wie
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${isMobileVoorWieOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {/* Mobile Dropdown Items */}
                  {isMobileVoorWieOpen && (
                    <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                      <Link
                        to="/voor-directie-en-office"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="font-medium">Directie & Office</div>
                        <div className="text-sm text-[var(--kleur-muted)]">Voor MKB-bedrijven</div>
                      </Link>
                      <Link
                        to="/voor-hr-professionals"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 rounded-lg text-[var(--kleur-text)] hover:text-[var(--kleur-primary)] hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="font-medium">HR Professionals</div>
                        <div className="text-sm text-[var(--kleur-muted)]">Voor corporate organisaties</div>
                      </Link>
                    </div>
                  )}
                </div>

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