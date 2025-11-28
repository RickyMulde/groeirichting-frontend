import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Check voor success message uit state (na password reset)
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear state na 5 seconden
      const timer = setTimeout(() => {
        setSuccessMessage('')
        // Clear location state
        window.history.replaceState({}, document.title)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [location])

  // Sluit modal bij Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showForgotPasswordModal) {
        setShowForgotPasswordModal(false)
        setForgotPasswordEmail('')
        setForgotPasswordMessage('')
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showForgotPasswordModal])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError) {
      // Gebruiksvriendelijkere foutmeldingen
      let userFriendlyError = loginError.message;
      
      if (loginError.message.includes('Email not confirmed')) {
        userFriendlyError = 'Je e-mailadres is nog niet geverifieerd. Controleer je inbox en klik op de verificatielink voordat je probeert in te loggen.';
      } else if (loginError.message.includes('Invalid login credentials')) {
        userFriendlyError = 'Ongeldige inloggegevens. Controleer je e-mailadres en wachtwoord.';
      } else if (loginError.message.includes('Too many requests')) {
        userFriendlyError = 'Te veel inlogpogingen. Probeer het over een paar minuten opnieuw.';
      }
      
      setError(userFriendlyError);
      return;
    }

    // Na succesvolle login, ga naar de redirect pagina
    navigate('/redirect')
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setForgotPasswordLoading(true)
    setForgotPasswordMessage('')

    if (!forgotPasswordEmail || !forgotPasswordEmail.includes('@')) {
      setForgotPasswordMessage('Voer een geldig e-mailadres in.')
      setForgotPasswordLoading(false)
      return
    }

    try {
      const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin
      const redirectTo = `${frontendUrl}/reset-password`

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: redirectTo
      })

      if (resetError) {
        console.error('Password reset error:', resetError)
        // Toon altijd een succesmelding (security best practice - voorkomt email enumeration)
        setForgotPasswordMessage('Als dit e-mailadres bestaat, hebben we een wachtwoord reset link gestuurd. Controleer je inbox.')
      } else {
        setForgotPasswordMessage('Als dit e-mailadres bestaat, hebben we een wachtwoord reset link gestuurd. Controleer je inbox.')
      }
    } catch (err) {
      console.error('Forgot password catch error:', err)
      setForgotPasswordMessage('Er is iets misgegaan. Probeer het later opnieuw.')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="mb-8">
        <Link to="/">
          <button className="btn btn-primary">← Terug naar startpagina</button>
        </Link>
      </div>
      
      <h2 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Inloggen</h2>
      <form onSubmit={handleLogin} className="space-y-2">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">E-mailadres</label>
            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(true)}
              className="text-sm text-white bg-[var(--kleur-primary)] px-3 py-1 rounded-lg hover:bg-[var(--kleur-accent)] transition-colors"
            >
              Wachtwoord vergeten?
            </button>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[var(--kleur-accent)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Wachtwoord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[var(--kleur-accent)]"
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn btn-secondary">Login</button>
        </div>
      </form>
      
      {successMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}
      
      {error && <p className="mt-4 text-red-600">{error}</p>}
      
      {error && error.includes('e-mailadres is nog niet geverifieerd') && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 mb-2">
            <strong>E-mailverificatie nodig?</strong>
          </p>
          <p className="text-blue-700 text-sm mb-3">
            Klik op de verificatielink in je inbox, of vraag een nieuwe aan.
          </p>
          <Link to="/verify-email" className="text-blue-600 hover:text-blue-800 underline text-sm">
            Verificatiepagina bezoeken →
          </Link>
        </div>
      )}

      {/* Wachtwoord vergeten modal */}
      {showForgotPasswordModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // Sluit modal bij klik buiten de modal content
            if (e.target === e.currentTarget) {
              setShowForgotPasswordModal(false)
              setForgotPasswordEmail('')
              setForgotPasswordMessage('')
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowForgotPasswordModal(false)
                setForgotPasswordEmail('')
                setForgotPasswordMessage('')
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-4">
              Wachtwoord vergeten?
            </h2>
            
            <p className="text-gray-600 mb-4">
              Voer je e-mailadres in en we sturen je een link om je wachtwoord opnieuw in te stellen.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mailadres
                </label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                  placeholder="jouw@email.nl"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[var(--kleur-accent)]"
                  disabled={forgotPasswordLoading}
                />
              </div>

              {forgotPasswordMessage && (
                <div className={`p-3 rounded-lg ${
                  forgotPasswordMessage.includes('misgegaan') || forgotPasswordMessage.includes('geldig')
                    ? 'bg-red-50 border border-red-200 text-red-700'
                    : 'bg-green-50 border border-green-200 text-green-700'
                }`}>
                  {forgotPasswordMessage}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordModal(false)
                    setForgotPasswordEmail('')
                    setForgotPasswordMessage('')
                  }}
                  className="btn btn-secondary flex-1"
                  disabled={forgotPasswordLoading}
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? 'Versturen...' : 'Verstuur reset link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login