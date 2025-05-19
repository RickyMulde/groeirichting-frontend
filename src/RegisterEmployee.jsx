import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from './supabaseClient'

function RegisterEmployee() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [tokenOngeldig, setTokenOngeldig] = useState(false)

  const [email, setEmail] = useState('')
  const [bedrijf, setBedrijf] = useState('')

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')

  const [wachtwoord, setWachtwoord] = useState('')
  const [bevestiging, setBevestiging] = useState('')

  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')

  useEffect(() => {
    const fetchInvitation = async () => {
      const { data, error } = await supabase
        .from('invitations')
        .select('email, bedrijf, status')
        .eq('token', token)
        .single()

      if (error || !data || data.status !== 'pending') {
        setTokenOngeldig(true)
      } else {
        setEmail(data.email)
        setBedrijf(data.bedrijf)
      }

      setLoading(false)
    }

    if (token) {
      fetchInvitation()
    } else {
      setTokenOngeldig(true)
      setLoading(false)
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFoutmelding('')
    setSuccesmelding('')

    if (!firstName || !lastName || !birthdate || !gender) {
      setFoutmelding('Vul alle verplichte velden in.')
      return
    }

    if (wachtwoord.length < 8) {
      setFoutmelding('Wachtwoord moet minimaal 8 tekens zijn.')
      return
    }

    if (wachtwoord !== bevestiging) {
      setFoutmelding('Wachtwoorden komen niet overeen.')
      return
    }

    const response = await fetch('https://groeirichting-backend.onrender.com/api/register-employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        birthdate,
        gender,
        password: wachtwoord
      })
    })

    const result = await response.json()

    if (!response.ok) {
      setFoutmelding(result.error || 'Registratie mislukt')
    } else {
      setSuccesmelding('Je account is succesvol geregistreerd.')
    }
  }

  if (loading) return <p>Token wordt gecontroleerd...</p>
  if (tokenOngeldig) return <p className="text-red-600">Deze uitnodiging is niet geldig of is verlopen.</p>

  return (
    <div className="page-container max-w-xl space-y-8">
      <section>
        <h1 className="text-2xl font-semibold mb-2">Account aanmaken</h1>
        <p className="text-kleur-muted">Vul je gegevens in om je account te activeren.</p>
      </section>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-xl space-y-4">
        <input type="text" value={bedrijf} disabled className="bg-gray-100" />
        <input type="email" value={email} disabled className="bg-gray-100" />
        <input type="text" placeholder="Voornaam" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Tussenvoegsel (optioneel)" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        <input type="text" placeholder="Achternaam" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="date" placeholder="Geboortedatum" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
        <input type="text" placeholder="Geslacht (bijv. man, vrouw, non-binair)" value={gender} onChange={(e) => setGender(e.target.value)} required />
        <input type="password" placeholder="Wachtwoord" value={wachtwoord} onChange={(e) => setWachtwoord(e.target.value)} required />
        <input type="password" placeholder="Bevestig wachtwoord" value={bevestiging} onChange={(e) => setBevestiging(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-full">Account aanmaken</button>

        {foutmelding && <p className="mt-2 text-red-600">{foutmelding}</p>}
        {succesmelding && <p className="mt-2 text-green-600">{succesmelding}</p>}
      </form>
    </div>
  )
}

export default RegisterEmployee
