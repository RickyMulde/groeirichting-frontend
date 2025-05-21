import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function PostLoginRedirect() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          navigate('/login')
          return
        }

        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (error || !data?.role) {
          console.error('Rol niet gevonden of fout bij ophalen:', error)
          navigate('/registratie-verplicht')
          return
        }

        // Navigeer naar de juiste portal op basis van de rol
        if (data.role === 'employer') {
          navigate('/werkgever-portaal')
        } else if (data.role === 'employee') {
          navigate('/werknemerbeheer')
        } else {
          navigate('/registratie-verplicht')
        }
      } catch (error) {
        console.error('Fout bij ophalen gebruikersrol:', error)
        navigate('/registratie-verplicht')
      } finally {
        setLoading(false)
      }
    }

    checkUserRole()
  }, [navigate])

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)]"></div>
        </div>
      </div>
    )
  }

  return null
}

export default PostLoginRedirect
