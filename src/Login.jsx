import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [clearLoading, setClearLoading] = useState(false)
  const navigate = useNavigate()

  // Functie om alle cached data te wissen
  const clearAllData = async () => {
    try {
      setClearLoading(true)
      // Probeer uit te loggen bij Supabase
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error)
        // Ga door met logout ook bij fout
      }
      
      // Clear localStorage
      localStorage.clear()
      
      // Clear sessionStorage
      sessionStorage.clear()
      
      // Reset form state
      setEmail('')
      setPassword('')
      setError('')
      
      console.log('Alle data gewist')
      
      // Forceer page reload om alle state te resetten
      window.location.reload()
    } catch (error) {
      console.error('Fout bij wissen data:', error)
      // Forceer page reload ook bij fout
      window.location.reload()
    } finally {
      setClearLoading(false)
    }
  }

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
          <label className="block text-sm font-medium text-gray-700">E-mailadres</label>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
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
      
      {/* Debug knop voor het wissen van alle data */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700 text-sm mb-3">
          <strong>Problemen met inloggen?</strong> Probeer alle opgeslagen gegevens te wissen:
        </p>
        <button 
          onClick={clearAllData}
          disabled={clearLoading}
          className="btn btn-accent text-sm"
        >
          {clearLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Wissen...
            </div>
          ) : (
            'Alle data wissen & opnieuw beginnen'
          )}
        </button>
      </div>
    </div>
  )
}

export default Login