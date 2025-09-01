import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function VerifyEmail() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Controleer of er een auth hash in de URL staat (van verificatielink)
    const handleAuthCallback = async () => {
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        console.log('Auth callback detected, processing...')
        
        try {
          // Probeer de sessie op te halen na verificatie
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Session error:', error)
            setMessage('Fout bij verwerken verificatie: ' + error.message)
            return
          }

          if (session?.user) {
            console.log('User verified:', session.user.email)
            setMessage('E-mail succesvol geverifieerd! Je wordt doorgestuurd...')
            
            // Haal gebruikersrol op
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('role')
              .eq('id', session.user.id)
              .single()
            
            if (profileError) {
              console.error('Profile error:', profileError)
              setMessage('Verificatie succesvol, maar er is een probleem met je profiel.')
              return
            }
            
            // Stuur door naar juiste portaal
            setTimeout(() => {
              if (profile?.role === 'employer') {
                navigate('/werkgever-portaal')
              } else if (profile?.role === 'employee') {
                navigate('/werknemer-portaal')
              } else {
                navigate('/login')
              }
            }, 2000)
            
            return
          }
        } catch (error) {
          console.error('Auth callback error:', error)
          setMessage('Er is iets misgegaan bij het verwerken van de verificatie.')
        }
      }
      
      // Als geen auth callback, controleer of gebruiker al geverifieerd is
      const checkExistingVerification = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user?.email_confirmed_at) {
            console.log('User already verified:', user.email)
            
            // Haal gebruikersrol op en stuur door naar juiste portaal
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
        } catch (error) {
          console.error('Check verification error:', error)
        }
      }

      await checkExistingVerification()
    }

    handleAuthCallback()
  }, [navigate])

  // Haal emailadres op uit URL parameters
  const getEmailFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('email')
  }

  const emailFromUrl = getEmailFromUrl()

  const handleResendVerification = async () => {
    setResendLoading(true)
    setMessage('')

    try {
      let emailToUse = null
      
      // Methode 1: Probeer eerst de huidige gebruiker op te halen (als er een sessie is)
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (!userError && user?.email) {
          emailToUse = user.email
        }
      } catch (e) {
        // Geen actieve sessie, geen probleem
      }
      
      // Methode 2: Als geen sessie, probeer email uit URL parameters
      if (!emailToUse) {
        const urlParams = new URLSearchParams(window.location.search)
        const emailFromUrl = urlParams.get('email')
        if (emailFromUrl) {
          emailToUse = emailFromUrl
        }
      }
      
      // Methode 3: Als nog steeds geen email, probeer localStorage (fallback)
      if (!emailToUse) {
        const storedEmail = localStorage.getItem('pendingVerificationEmail')
        if (storedEmail) {
          emailToUse = storedEmail
        }
      }
      
      // Methode 4: Als alle methoden falen, probeer email uit hash fragment (Supabase redirect)
      if (!emailToUse) {
        const hash = window.location.hash
        if (hash) {
          const hashParams = new URLSearchParams(hash.substring(1))
          const emailFromHash = hashParams.get('email')
          if (emailFromHash) {
            emailToUse = emailFromHash
          }
        }
      }
      
      if (!emailToUse) {
        setMessage('Geen e-mailadres gevonden. Probeer de verificatielink opnieuw te openen of ga terug naar de registratiepagina.')
        return
      }

      // Probeer eerst via Supabase Auth resend
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: emailToUse
        })

        if (error) {
          console.error('Supabase resend error:', error)
          throw error // Ga door naar backend fallback
        } else {
          setMessage('Verificatie-e-mail opnieuw verzonden! Controleer je inbox.')
          return
        }
      } catch (supabaseError) {
        // Als Supabase resend faalt, probeer via backend
        console.log('Supabase resend faalt, probeer via backend...')
        
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resend-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailToUse })
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
            {emailFromUrl && (
              <p className="text-blue-700 text-sm mb-2">
                <strong>E-mailadres:</strong> {emailFromUrl}
              </p>
            )}
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
