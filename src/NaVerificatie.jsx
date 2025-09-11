import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function NaVerificatie() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [provisioning, setProvisioning] = useState(false)

  // Check if user is already provisioned
  const checkProvisioning = async (userId) => {
    try {
      const { data: user } = await supabase
        .from('users')
        .select('id, employer_id, role')
        .eq('id', userId)
        .single()

      return user?.employer_id && user?.role === 'employer'
    } catch (error) {
      console.error('Check provisioning error:', error)
      return false
    }
  }

  // Provision employer data
  const provisionEmployer = async (employerData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        throw new Error('Geen toegangstoken gevonden')
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/provision-employer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(employerData)
      })

      const result = await response.json()

      if (response.ok) {
        return { success: true, data: result }
      } else {
        throw new Error(result.error || 'Provisioning mislukt')
      }
    } catch (error) {
      console.error('Provisioning error:', error)
      throw error
    }
  }

  useEffect(() => {
    const handleBootstrap = async () => {
      try {
        setLoading(true)
        setMessage('')

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          setMessage('Fout bij ophalen sessie: ' + sessionError.message)
          return
        }

        if (!session?.user) {
          setMessage('Geen actieve sessie gevonden. Probeer opnieuw in te loggen.')
          return
        }

        const userId = session.user.id

        // Check if already provisioned
        const isProvisioned = await checkProvisioning(userId)
        
        if (isProvisioned) {
          setMessage('Account is al ingericht. Je wordt doorgestuurd...')
          setTimeout(() => navigate('/werkgever-portaal'), 1000)
          return
        }

        // Check for pending data
        const pendingData = localStorage.getItem('pendingEmployerData')
        if (!pendingData) {
          setMessage('Geen bedrijfsgegevens gevonden. Ga terug naar registratie.')
          return
        }

        const employerData = JSON.parse(pendingData)
        
        // Provision employer
        setProvisioning(true)
        setMessage('Account wordt ingericht...')
        
        await provisionEmployer(employerData)
        
        // Clean up
        localStorage.removeItem('pendingEmployerData')
        
        setMessage('Account succesvol ingericht! Je wordt doorgestuurd...')
        setTimeout(() => navigate('/werkgever-portaal'), 2000)

      } catch (error) {
        console.error('Bootstrap error:', error)
        setMessage('Fout bij inrichten account: ' + error.message)
      } finally {
        setLoading(false)
        setProvisioning(false)
      }
    }

    handleBootstrap()
  }, [navigate])

  if (loading) {
    return (
      <div className="page-container max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Account wordt ingericht...</h1>
          <p className="text-gray-600">Even geduld, we zetten je account klaar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container max-w-2xl">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-semibold text-[var(--kleur-primary)]">
          Account Inrichten
        </h1>
        
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('Fout') || message.includes('mislukt') 
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {provisioning && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700">Account wordt ingericht...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NaVerificatie
