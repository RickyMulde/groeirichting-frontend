import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { MailPlus } from 'lucide-react'

function WerknemerBeheren() {
  const [email, setEmail] = useState('')
  const [uitnodigingen, setUitnodigingen] = useState([])
  const [werknemers, setWerknemers] = useState([])
  const [loading, setLoading] = useState(false)
  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user?.id
      if (!userId) return

      const { data: userProfiel } = await supabase
        .from('users')
        .select('employer_id')
        .eq('id', userId)
        .single()

      if (!userProfiel) return

      const { data: uitnodigingenData } = await supabase
        .from('invitations')
        .select('*')
        .eq('employer_id', userProfiel.employer_id)
        .order('created_at', { ascending: false })

      const { data: werknemersData } = await supabase
        .from('users')
        .select('*')
        .eq('employer_id', userProfiel.employer_id)
        .eq('role', 'employee')
        .order('created_at', { ascending: false })

      setUitnodigingen(uitnodigingenData || [])
      setWerknemers(werknemersData || [])
    }

    fetchData()
  }, [])

  const handleInvite = async (e) => {
    e.preventDefault()
    setFoutmelding('')
    setSuccesmelding('')
    setLoading(true)

    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (!userId) {
      setFoutmelding('Gebruiker niet ingelogd')
      setLoading(false)
      return
    }

    const { data: profiel } = await supabase
      .from('users')
      .select('employer_id')
      .eq('id', userId)
      .single()

    if (!profiel) {
      setFoutmelding('Werkgever niet gevonden')
      setLoading(false)
      return
    }

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

    const { error: insertError } = await supabase.from('invitations').insert({
      email,
      employer_id: profiel.employer_id,
      status: 'pending',
      created_by: userId,
      token,
      expires_at: expiresAt
    })

    if (insertError) {
      setFoutmelding('Fout bij opslaan in database')
      setLoading(false)
      return
    }

    const response = await fetch('https://groeirichting-backend.onrender.com/api/send-invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: email,
        name: 'Medewerker',
        employerId: profiel.employer_id?.toString?.() || '',
        token: token
      })
    })

    if (!response.ok) {
      setFoutmelding('Uitnodiging aangemaakt, maar e-mail verzenden is mislukt.')
    } else {
      setEmail('')
      setSuccesmelding('Uitnodiging succesvol verzonden!')
      setTimeout(() => setSuccesmelding(''), 5000)

      const { data: nieuwe } = await supabase
        .from('invitations')
        .select('*')
        .eq('employer_id', profiel.employer_id)
        .order('created_at', { ascending: false })

      const { data: nieuweWerknemers } = await supabase
        .from('users')
        .select('*')
        .eq('employer_id', profiel.employer_id)
        .eq('role', 'employee')
        .order('created_at', { ascending: false })

      setUitnodigingen(nieuwe)
      setWerknemers(nieuweWerknemers)
    }

    setLoading(false)
  }

  return (
    <div className="page-container space-y-12">
      <section>
        <h1 className="text-2xl font-semibold mb-2">Werknemers beheren</h1>
        <p className="text-kleur-muted">Nodig nieuwe medewerkers uit en beheer bestaande accounts.</p>
      </section>

      {/* Werknemer uitnodigen */}
      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <MailPlus className="text-kleur-primary" /> Werknemer uitnodigen
        </h2>
        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mailadres" required />
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Versturen...' : 'Uitnodigen'}
          </button>
        </form>
        {foutmelding && <p className="mt-2 text-red-600">{foutmelding}</p>}
        {succesmelding && <p className="mt-2 text-green-600">{succesmelding}</p>}
      </section>

      {/* Tabel met werknemers */}
      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-medium mb-4">Actieve werknemers</h2>
        <table className="w-full text-sm table-auto">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2">Naam</th>
              <th className="py-2">E-mailadres</th>
              <th className="py-2">Status</th>
              <th className="py-2">Acties</th>
            </tr>
          </thead>
          <tbody>
            {werknemers.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-400">Geen werknemers gevonden.</td>
              </tr>
            )}
            {werknemers.map((w) => (
              <tr key={w.id} className="border-b">
                <td className="py-2">{w.first_name} {w.middle_name} {w.last_name}</td>
                <td className="py-2">{w.email}</td>
                <td className="py-2 text-green-600 font-medium">Geactiveerd</td>
                <td className="py-2">
                  <button className="text-blue-600 hover:underline text-sm">Bewerken</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default WerknemerBeheren
