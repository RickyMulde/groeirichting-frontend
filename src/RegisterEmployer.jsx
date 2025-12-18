import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from './supabaseClient'

function RegisterEmployer() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const [companyName, setCompanyName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [tokenOngeldig, setTokenOngeldig] = useState(false)
  const [isInvitation, setIsInvitation] = useState(false)

  // Haal invitation data op als er een token is
  useEffect(() => {
    const fetchInvitation = async () => {
      if (!token) {
        setIsInvitation(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('email, employer_id, status, invite_role')
          .eq('token', token)
          .single()

        if (error || !data || data.status !== 'pending') {
          setTokenOngeldig(true)
          setIsInvitation(false)
        } else if (data.invite_role === 'employer') {
          setIsInvitation(true)
          setEmail(data.email)
        } else {
          // Token is voor werknemer, niet voor werkgever
          setTokenOngeldig(true)
          setIsInvitation(false)
        }
      } catch (err) {
        setTokenOngeldig(true)
        setIsInvitation(false)
      }
    }

    if (token) {
      fetchInvitation()
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (password !== confirmPassword) {
        setError('Wachtwoorden komen niet overeen.')
        setLoading(false)
        return
      }

      let response
      let endpoint
      let body

      if (isInvitation && token) {
        // Uitnodiging-gebaseerde registratie
        endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/register-employer/invitation`
        body = {
          token,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          password
        }
      } else {
        // Nieuwe werkgever registratie
        endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/register-employer`
        body = {
          company_name: companyName,
          contact_phone: contactPhone,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email,
          password
        }
      }

      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      const result = await response.json()

      if (response.ok) {
        // Voor zowel uitnodiging als normale registratie: email verificatie vereist
        setSuccess(result.message || 'Account succesvol aangemaakt! Je ontvangt automatisch een verificatie-e-mail.')
        // Stuur door naar verificatie pagina
        window.location.href = '/verify-email?email=' + encodeURIComponent(email)
      } else {
        setError(result.error || 'Registratie mislukt.')
      }
    } catch (err) {
      setError('Er is iets misgegaan bij de registratie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="mb-8">
        <Link to="/">
          <button className="btn btn-primary">← Terug naar startpagina</button>
        </Link>
      </div>

      {tokenOngeldig && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-800">Deze uitnodiging is niet geldig of is verlopen.</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">
        {isInvitation ? 'Activeer je werkgever-account' : 'Maak een werkgever-account aan'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bedrijfsgegevens - alleen voor nieuwe registraties */}
        {!isInvitation && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[var(--kleur-primary)] border-b border-gray-200 pb-2">Bedrijfsgegevens</h3>
            
            <div className="form-group">
              <label className="form-label">Bedrijfsnaam *</label>
              <input 
                type="text" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                required 
                className="form-input"
              />
            </div>
          </div>
        )}

        {/* Contactpersoon */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--kleur-primary)] border-b border-gray-200 pb-2">Contactpersoon</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Voornaam *</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tussenvoegsel</label>
              <input 
                type="text" 
                value={middleName} 
                onChange={(e) => setMiddleName(e.target.value)} 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Achternaam *</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
                className="form-input"
              />
            </div>
          </div>
          
          {!isInvitation && (
            <div className="form-group">
              <label className="form-label">Telefoonnummer</label>
              <input 
                type="tel" 
                value={contactPhone} 
                onChange={(e) => setContactPhone(e.target.value)} 
                className="form-input"
              />
            </div>
          )}
        </div>

        {/* Accountgegevens */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--kleur-primary)] border-b border-gray-200 pb-2">Accountgegevens</h3>
          
          <div className="form-group">
            <label className="form-label">E-mailadres *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={isInvitation}
              required 
              className={`form-input ${isInvitation ? 'bg-gray-100' : ''}`}
            />
            {isInvitation && (
              <p className="text-sm text-gray-500 mt-1">Dit e-mailadres is gekoppeld aan je uitnodiging.</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Wachtwoord *</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bevestig wachtwoord *</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={loading} className="btn btn-primary w-full md:w-auto">
            {loading ? 'Bezig...' : 'Account aanmaken'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
      {success && <p className="mt-4 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">{success}</p>}
    </div>
  )
}

export default RegisterEmployer
