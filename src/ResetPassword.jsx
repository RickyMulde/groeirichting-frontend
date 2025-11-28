import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function ResetPassword() {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [checkingToken, setCheckingToken] = useState(true)

  useEffect(() => {
    // Check of er een reset token in de URL zit
    const checkResetToken = async () => {
      try {
        const hash = window.location.hash
        const searchParams = new URLSearchParams(window.location.search)
        
        // Supabase gebruikt hash fragment voor password reset tokens
        // Format: #access_token=...&type=recovery&...
        if (hash && (hash.includes('access_token') || hash.includes('type=recovery'))) {
          // Supabase verwerkt de hash automatisch, wacht even en check sessie
          setTimeout(async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()
            
            if (sessionError) {
              console.error('Session error:', sessionError)
              setError('De reset link is ongeldig of verlopen. Vraag een nieuwe aan.')
              setIsValidToken(false)
              setCheckingToken(false)
              return
            }

            // Als er een sessie is, is de token geldig
            if (session && session.user) {
              setIsValidToken(true)
              setCheckingToken(false)
              return
            }
            
            // Geen sessie, token is ongeldig
            setError('De reset link is ongeldig of verlopen. Vraag een nieuwe aan.')
            setIsValidToken(false)
            setCheckingToken(false)
          }, 500)
          return
        }

        // Check voor query parameters (alternatieve methode)
        if (searchParams.has('token') && searchParams.get('type') === 'recovery') {
          // Wacht even en probeer sessie op te halen
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession()
            if (retrySession && retrySession.user) {
              setIsValidToken(true)
              setCheckingToken(false)
            } else {
              setError('De reset link is ongeldig of verlopen. Vraag een nieuwe aan.')
              setIsValidToken(false)
              setCheckingToken(false)
            }
          }, 1000)
          return
        }

        // Geen token gevonden - wacht even om te zien of Supabase het asynchroon verwerkt
        setTimeout(async () => {
          const { data: { session } } = await supabase.auth.getSession()
          if (session && session.user) {
            setIsValidToken(true)
            setCheckingToken(false)
          } else {
            setError('Geen geldige reset link gevonden. Controleer de link in je e-mail.')
            setIsValidToken(false)
            setCheckingToken(false)
          }
        }, 1500)
      } catch (err) {
        console.error('Token check error:', err)
        setError('Er is een fout opgetreden bij het controleren van de reset link.')
        setIsValidToken(false)
        setCheckingToken(false)
      }
    }

    checkResetToken()

    // Luister naar auth state changes (voor als Supabase de token asynchroon verwerkt)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session?.user) {
        setIsValidToken(true)
        setCheckingToken(false)
      } else if (event === 'SIGNED_IN' && session?.user && window.location.hash.includes('type=recovery')) {
        // Soms wordt het als SIGNED_IN event getriggerd in plaats van PASSWORD_RECOVERY
        setIsValidToken(true)
        setCheckingToken(false)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validatie
    if (!newPassword || newPassword.length < 6) {
      setError('Wachtwoord moet minimaal 6 tekens lang zijn.')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen.')
      setLoading(false)
      return
    }

    try {
      // Update wachtwoord
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        console.error('Password update error:', updateError)
        
        // Gebruiksvriendelijke error messages
        if (updateError.message.includes('session')) {
          setError('De reset link is verlopen. Vraag een nieuwe aan via de login pagina.')
        } else if (updateError.message.includes('weak')) {
          setError('Het wachtwoord is te zwak. Gebruik een sterker wachtwoord.')
        } else {
          setError('Fout bij resetten wachtwoord: ' + updateError.message)
        }
        setLoading(false)
        return
      }

      // Succes!
      setSuccess(true)
      
      // Log uit (om sessie te resetten)
      await supabase.auth.signOut()
      
      // Stuur door naar login na 2 seconden
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen.' }
        })
      }, 2000)
    } catch (err) {
      console.error('Reset password catch error:', err)
      setError('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.')
      setLoading(false)
    }
  }

  // Loading state tijdens token check
  if (checkingToken) {
    return (
      <div className="page-container max-w-md mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Controleren...</h1>
          <p className="text-gray-600">We controleren je reset link.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
        </div>
      </div>
    )
  }

  // Error state - geen geldige token
  if (!isValidToken) {
    return (
      <div className="page-container max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="text-red-600 text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Ongeldige reset link</h1>
          <p className="text-gray-600">{error || 'De reset link is ongeldig of verlopen.'}</p>
          <div className="space-y-2">
            <Link to="/login" className="btn btn-primary inline-block">
              Terug naar login
            </Link>
            <p className="text-sm text-gray-600">
              Vraag een nieuwe reset link aan via de login pagina.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="page-container max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="text-green-600 text-6xl">✅</div>
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Wachtwoord gewijzigd!</h1>
          <p className="text-gray-600">Je wachtwoord is succesvol gewijzigd. Je wordt doorgestuurd naar de login pagina...</p>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="page-container max-w-md mx-auto">
      <div className="mb-8">
        <Link to="/login">
          <button className="btn btn-secondary">← Terug naar login</button>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">
        Nieuw wachtwoord instellen
      </h2>

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nieuw wachtwoord
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Minimaal 6 tekens"
              className="w-full px-3 py-1.5 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[var(--kleur-accent)]"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimaal 6 tekens</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bevestig wachtwoord
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Herhaal je wachtwoord"
              className="w-full px-3 py-1.5 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[var(--kleur-accent)]"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Wachtwoord wijzigen...' : 'Wachtwoord wijzigen'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Terug naar <Link to="/login" className="text-blue-600 hover:underline">login pagina</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword

