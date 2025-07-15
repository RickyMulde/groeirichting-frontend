import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function EmployerProtectedRoute({ children }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          navigate('/login')
          return
        }

        const { data: { user } } = await supabase.auth.getUser()

        if (!user?.email_confirmed_at) {
          navigate('/login')
          return
        }

        // Controleer of gebruiker een werkgever is
        const { data: profiel, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error || !profiel) {
          navigate('/login')
          return
        }

        if (profiel.role !== 'employer') {
          // Als het geen werkgever is, redirect naar het juiste portaal
          if (profiel.role === 'employee') {
            navigate('/werknemer-portaal')
          } else {
            navigate('/login')
          }
          return
        }

        // Controleer of werkgever bestaat in employers tabel
        const { data: employer, error: employerError } = await supabase
          .from('employers')
          .select('id')
          .eq('contact_email', user.email)
          .single()

        if (employerError || !employer) {
          console.error('Werkgever niet gevonden:', employerError)
          navigate('/werkgever-portaal')
          return
        }

        setIsAuthorized(true)
      } catch (error) {
        console.error('Auth check error:', error)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

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

export default EmployerProtectedRoute 