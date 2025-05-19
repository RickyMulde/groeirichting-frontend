import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError) {
      setError(loginError.message)
      return
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
    </div>
  )
}

export default Login