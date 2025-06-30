import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login')
        return
      }

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user?.email_confirmed_at) {
        return
      }

      const { data: profiel, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !profiel) {
        navigate('/login')
        return
      }

      if (location.pathname === '/' || location.pathname === '/login') {
        if (profiel.role === 'employer') {
          navigate('/werkgever-portaal')
        } else if (profiel.role === 'employee') {
          navigate('/dashboard')
        }
      }
    }

    checkAuth()
  }, [navigate])

  return children
}

export default ProtectedRoute
