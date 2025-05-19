import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useSearchParams, useNavigate } from 'react-router-dom'

function RegisterEmployee() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = params.get('token')

  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birthdate: '',
    password: '',
    confirm_password: ''
  })

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('token', token)
        .eq('status', 'pending')
        .single()

      if (error || !data) {
        setError('Ongeldige of verlopen uitnodiging.')
      } else {
        setInvitation(data)
      }
      setLoading(false)
    }

    if (token) fetchInvitation()
    else setError('Geen token meegegeven.')
  }, [token])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm_password) {
      setError('Wachtwoorden komen niet overeen.')
      return
    }

    if (!invitation) {
      setError('Geen geldige uitnodiging.')
      return
    }

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: invitation.email,
      password: form.password
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    const userId = authData.user?.id
    if (!userId) {
      setError('Er ging iets mis met het aanmaken van het account.')
      return
    }

    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      email: invitation.email,
      role: 'medewerker',
      employer_id: invitation.employer_id,
      first_name: form.first_name,
      middle_name: form.middle_name,
      last_name: form.last_name,
      birthdate: form.birthdate
    })

    if (insertError) {
      setError('Kon gebruikersprofiel niet opslaan.')
      return
    }

    await supabase.from('invitations')
      .update({ status: 'gebruikt' })
      .eq('token', token)

    navigate('/login')
  }

  if (loading) return <div className="page-container">Laden...</div>
  if (error) return <div className="page-container text-red-600">{error}</div>

  return (
    <div className="page-container max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Account aanmaken</h1>
      <p className="mb-6">Je gaat een account aanmaken gekoppeld aan werkgever ID: <strong>{invitation.employer_id}</strong></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Voornaam</label>
          <input name="first_name" value={form.first_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Tussenvoegsel</label>
          <input name="middle_name" value={form.middle_name} onChange={handleChange} />
        </div>
        <div>
          <label>Achternaam</label>
          <input name="last_name" value={form.last_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Geboortedatum</label>
          <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} required />
        </div>
        <div>
          <label>Wachtwoord</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Bevestig wachtwoord</label>
          <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Account aanmaken</button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  )
}

export default RegisterEmployee;
