import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from './supabaseClient'

function ProtectedRoute({ children, requiredRole = null, redirectTo = null }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Auth check start
        setIsLoading(true)
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
          navigate('/login')
          return
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          navigate('/login')
          return
        }

        if (!user?.email_confirmed_at) {
          navigate('/verify-email')
          return
        }

        // Haal user data op uit database (inclusief role en employer_id)
        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('id, email, role, employer_id')
          .eq('id', user.id)
          .single()

        if (userDataError || !userData) {
          navigate('/login')
          return
        }

        // Controleer rol-specifieke toegang
        if (requiredRole) {
          if (userData.role !== requiredRole) {
            // Redirect naar juiste portaal op basis van rol
            const redirectPath = userData.role === 'employer' ? '/werkgever-portaal' :
                                userData.role === 'employee' ? '/werknemer-portaal' :
                                userData.role === 'superadmin' ? '/superadmin-portaal' : '/login'
            
            navigate(redirectPath)
            return
          }
        }

        // Voor werkgevers: controleer of employer bestaat in database
        if (userData.role === 'employer') {
          const { data: employer, error: employerError } = await supabase
            .from('employers')
            .select('id')
            .eq('contact_email', userData.email)
            .single()

          if (employerError || !employer) {
            // Redirect naar werkgever portaal (laat EmployerPortal de fout afhandelen)
            navigate('/werkgever-portaal')
            return
          }
        }

        // Voor employees: controleer of ze bij een werkgever horen
        if (userData.role === 'employee' && !userData.employer_id) {
          navigate('/registratie-verplicht')
          return
        }

        // Auto-redirect op basis van rol voor bepaalde routes
        if (location.pathname === '/' || location.pathname === '/login') {
          const redirectPath = userData.role === 'employer' ? '/werkgever-portaal' :
                              userData.role === 'employee' ? '/werknemer-portaal' :
                              userData.role === 'superadmin' ? '/superadmin-portaal' : null
          
          if (redirectPath) {
            navigate(redirectPath)
            return
          }
        }

        // Custom redirect
        if (redirectTo) {
          navigate(redirectTo)
          return
        }

        setIsAuthorized(true)
      } catch (error) {
        console.error('ProtectedRoute: Auth check error:', error)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate, requiredRole, redirectTo, location.pathname])

  // Toon loading state tijdens authenticatie
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Beveiliging controleren...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return children
}

export default ProtectedRoute
