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
        console.log('🔐 ProtectedRoute: Starting auth check', {
          path: location.pathname,
          requiredRole,
          redirectTo
        })
        setIsLoading(true)
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        console.log('🔐 ProtectedRoute: Session check', {
          hasSession: !!session,
          sessionError: sessionError?.message,
          userEmail: session?.user?.email
        })

        if (sessionError || !session) {
          console.log('❌ ProtectedRoute: No session, redirecting to login')
          navigate('/login')
          return
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        console.log('🔐 ProtectedRoute: User check', {
          hasUser: !!user,
          userError: userError?.message,
          emailConfirmed: !!user?.email_confirmed_at
        })

        if (userError || !user) {
          console.log('❌ ProtectedRoute: No user, redirecting to login')
          navigate('/login')
          return
        }

        if (!user?.email_confirmed_at) {
          console.log('❌ ProtectedRoute: Email not confirmed, redirecting to verify-email')
          navigate('/verify-email')
          return
        }

        // Haal user data op uit database (inclusief role en employer_id)
        console.log('🔐 ProtectedRoute: Fetching user data from database')
        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('id, email, role, employer_id')
          .eq('id', user.id)
          .single()

        console.log('🔐 ProtectedRoute: User data result', {
          hasUserData: !!userData,
          userDataError: userDataError?.message,
          role: userData?.role,
          employerId: userData?.employer_id
        })

        if (userDataError || !userData) {
          console.log('❌ ProtectedRoute: User data not found, redirecting to login')
          navigate('/login')
          return
        }

        // Controleer rol-specifieke toegang
        if (requiredRole) {
          console.log('🔐 ProtectedRoute: Checking role access', {
            userRole: userData.role,
            requiredRole,
            hasAccess: userData.role === requiredRole
          })
          
          if (userData.role !== requiredRole) {
            console.log(`❌ ProtectedRoute: Access denied - User role ${userData.role} does not match required role ${requiredRole}`)
            
            // Redirect naar juiste portaal op basis van rol
            const redirectPath = userData.role === 'employer' ? '/werkgever-portaal' :
                                userData.role === 'employee' ? '/werknemer-portaal' :
                                userData.role === 'superadmin' ? '/superadmin-portaal' : '/login'
            
            console.log(`🔄 ProtectedRoute: Redirecting to ${redirectPath} based on user role`)
            navigate(redirectPath)
            return
          }
        }

        // Voor werkgevers: controleer of employer bestaat in database
        if (userData.role === 'employer') {
          console.log('🔐 ProtectedRoute: Checking employer in database')
          const { data: employer, error: employerError } = await supabase
            .from('employers')
            .select('id')
            .eq('contact_email', userData.email)
            .single()

          console.log('🔐 ProtectedRoute: Employer check result', {
            hasEmployer: !!employer,
            employerError: employerError?.message,
            employerId: employer?.id
          })

          if (employerError || !employer) {
            console.log('⚠️ ProtectedRoute: Employer not found in database, but allowing access to portaal')
            // Redirect naar werkgever portaal (laat EmployerPortal de fout afhandelen)
            navigate('/werkgever-portaal')
            return
          }
        }

        // Voor employees: controleer of ze bij een werkgever horen
        if (userData.role === 'employee' && !userData.employer_id) {
          console.log('❌ ProtectedRoute: Employee has no employer_id, redirecting to registratie-verplicht')
          navigate('/registratie-verplicht')
          return
        }

        // Auto-redirect op basis van rol voor bepaalde routes
        if (location.pathname === '/' || location.pathname === '/login') {
          const redirectPath = userData.role === 'employer' ? '/werkgever-portaal' :
                              userData.role === 'employee' ? '/werknemer-portaal' :
                              userData.role === 'superadmin' ? '/superadmin-portaal' : null
          
          if (redirectPath) {
            console.log(`🔄 ProtectedRoute: Auto-redirect from ${location.pathname} to ${redirectPath}`)
            navigate(redirectPath)
            return
          }
        }

        // Custom redirect
        if (redirectTo) {
          console.log(`🔄 ProtectedRoute: Custom redirect to ${redirectTo}`)
          navigate(redirectTo)
          return
        }

        console.log('✅ ProtectedRoute: Auth check successful, granting access')
        setIsAuthorized(true)
      } catch (error) {
        console.error('❌ ProtectedRoute: Auth check error:', error)
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
