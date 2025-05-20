import { useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterEmployer() {
  const [companyName, setCompanyName] = useState('')
  const [kvk, setKvk] = useState('')
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

      const response = await fetch('https://groeirichting-backend.onrender.com/api/register-employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          kvk_number: kvk,
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
        setSuccess('Account succesvol aangemaakt! Bevestig je e-mailadres via de ontvangen mail.')
        setCompanyName('')
        setKvk('')
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setContactPhone('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Bedrijfsnaam</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <div>
          <label>KvK-nummer</label>
          <input type="text" value={kvk} onChange={(e) => setKvk(e.target.value)} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Voornaam</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div>
            <label>Tussenvoegsel</label>
            <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          <div>
            <label>Achternaam</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>
        <div>
          <label>Telefoonnummer</label>
          <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        </div>
        <div>
          <label>E-mailadres</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Wachtwoord</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label>Bevestig wachtwoord</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Bezig...' : 'Account aanmaken'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
  )
}

export default RegisterEmployer
