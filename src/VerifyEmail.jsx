import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function VerifyEmail() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Controleer of gebruiker al geverifieerd is
    const checkVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email_confirmed_at) {
        // Gebruiker is al geverifieerd, doorsturen naar juiste portaal
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (profile?.role === 'employer') {
          navigate('/werkgever-portaal')
        } else if (profile?.role === 'employee') {
          navigate('/werknemer-portaal')
        }
      }
    }

    checkVerification()
  }, [navigate])

  const handleResendVerification = async () => {
    setResendLoading(true)
    setMessage('')

    try {
      // Probeer eerst de huidige gebruiker op te halen
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user?.email) {
        setMessage('Geen gebruiker gevonden. Log eerst in om een nieuwe verificatiemail aan te vragen.')
        return
      }

      // Probeer via Supabase Auth resend
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      })

      if (error) {
        console.error('Supabase resend error:', error)
        
        // Als Supabase resend faalt, probeer via backend
        if (error.message?.includes('email address') || error.message?.includes('Type provided')) {
          setMessage('Probeer een nieuwe verificatiemail aan te vragen via de backend...')
          
          try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resend-verification`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email })
            })
            
            const result = await response.json()
            
            if (response.ok) {
              setMessage('Verificatie-e-mail opnieuw verzonden via backend! Controleer je inbox.')
            } else {
              setMessage('Fout bij opnieuw versturen: ' + (result.error || 'Onbekende fout'))
            }
          } catch (backendError) {
            console.error('Backend resend error:', backendError)
            setMessage('Beide methoden zijn mislukt. Neem contact op met support.')
          }
        } else {
          setMessage('Fout bij opnieuw versturen: ' + error.message)
        }
      } else {
        setMessage('Verificatie-e-mail opnieuw verzonden! Controleer je inbox.')
      }
    } catch (err) {
      console.error('Resend catch error:', err)
      setMessage('Er is iets misgegaan bij het opnieuw versturen. Probeer het later opnieuw.')
    } finally {
      setResendLoading(false)
    }
  }

  const handleCheckVerification = async () => {
    setLoading(true)
    setMessage('')

    try {
      // Ververs de sessie om te controleren of e-mail is geverifieerd
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        setMessage('Fout bij controleren verificatie: ' + error.message)
        return
      }

      if (session?.user?.email_confirmed_at) {
        setMessage('Je e-mail is geverifieerd! Je wordt doorgestuurd...')
        
        // Haal gebruikersrol op en stuur door naar juiste portaal
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
        
        setTimeout(() => {
          if (profile?.role === 'employer') {
            navigate('/werkgever-portaal')
          } else if (profile?.role === 'employee') {
            navigate('/werknemer-portaal')
          }
        }, 2000)
      } else {
        setMessage('Je e-mail is nog niet geverifieerd. Controleer je inbox en klik op de verificatielink.')
      }
    } catch (err) {
      setMessage('Er is iets misgegaan bij het controleren van je verificatie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container max-w-2xl">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[var(--kleur-primary)]">
            Verificeer je e-mailadres
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 mb-4">
              We hebben je een verificatielink gestuurd naar je e-mailadres.
            </p>
            <p className="text-blue-700 text-sm">
              Klik op de link in de e-mail om je account te activeren.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleCheckVerification}
              disabled={loading}
              className="btn btn-primary w-full md:w-auto"
            >
              {loading ? 'Controleren...' : 'Ik heb mijn e-mail geverifieerd'}
            </button>

            <div className="text-sm text-gray-600">
              <p>Geen e-mail ontvangen?</p>
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="text-[var(--kleur-accent)] hover:underline mt-1"
              >
                {resendLoading ? 'Versturen...' : 'Verificatie-e-mail opnieuw versturen'}
              </button>
            </div>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg ${
              message.includes('Fout') || message.includes('misgegaan') 
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">
            Heb je vragen? Neem contact op met ons support team.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
