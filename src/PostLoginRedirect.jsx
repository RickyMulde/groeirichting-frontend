
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function PostLoginRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        console.error('Gebruiker niet gevonden:', userError)
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !data?.role) {
        console.error('Rol niet gevonden of fout bij ophalen:', error)
        navigate('/login')
        return
      }

      if (data.role === 'medewerker') {
        navigate('/werknemer-portaal')
      } else if (data.role === 'werkgever' || data.role === 'employer') {
        navigate('/werkgever-portaal')
      } else {
        console.warn('Onbekende rol:', data.role)
        navigate('/login')
      }
    }

    fetchAndRedirect()
  }, [])

  return <p className="p-4 text-center text-gray-600">Je wordt doorgestuurd...</p>
}

export default PostLoginRedirect
