import { useState } from 'react'
import { supabase } from './supabaseClient'
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

  const validatePassword = (pw) => {
    return pw.length >= 8 && /[A-Za-z]/.test(pw) && /[0-9]/.test(pw)
  }

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

      if (!validatePassword(password)) {
        setError('Wachtwoord moet minimaal 8 tekens bevatten, incl. 1 letter en 1 cijfer.')
        return
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
      if (authError) {
        setError(authError.message)
        return
      }

      const userId = authData.user?.id
      if (!userId) {
        setError('Registratie mislukt. Geen gebruikers-ID ontvangen.')
        return
      }

      const { data: employerData, error: employerError } = await supabase
        .from('employers')
        .insert({
          company_name: companyName,
          kvk_number: kvk,
          contact_email: email,
          contact_phone: contactPhone
        })
        .select()
        .single()

      if (employerError) {
        setError(employerError.message)
        return
      }

      const { error: userError } = await supabase.from('users').insert({
        id: userId,
        email,
        role: 'werkgever',
        employer_id: employerData.id,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName
      })

      if (userError) {
        setError(userError.message)
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