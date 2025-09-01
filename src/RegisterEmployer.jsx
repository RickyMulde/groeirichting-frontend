import { useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterEmployer() {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (password !== confirmPassword) {
        setError('Wachtwoorden komen niet overeen.')
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register-employer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          contact_phone: contactPhone,
          email,
          password,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName
        })
      })

      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'Registratie mislukt.')
      } else {
        // Sla email op in localStorage voor verificatiepagina
        localStorage.setItem('pendingVerificationEmail', email)
        
        setSuccess('Account succesvol aangemaakt! Controleer je e-mailadres voor de verificatielink om je account te activeren.')
        
        // Wacht even en ga dan naar verificatiepagina
        setTimeout(() => {
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl
          } else {
            window.location.href = `/verify-email?email=${encodeURIComponent(email)}`
          }
        }, 2000)
        
        setCompanyName('')
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setContactPhone('')
        setPassword('')
        setConfirmPassword('')
        // Behoud email voor verificatiepagina
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

      <h2 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Maak een werkgever-account aan</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bedrijfsgegevens */}
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
          
          <div className="form-group">
            <label className="form-label">Telefoonnummer</label>
            <input 
              type="tel" 
              value={contactPhone} 
              onChange={(e) => setContactPhone(e.target.value)} 
              className="form-input"
            />
          </div>
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
              required 
              className="form-input"
            />
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
