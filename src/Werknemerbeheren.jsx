import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { MailPlus, Pencil, Trash2, RefreshCw, ArrowLeft, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'

function WerknemerBeheren() {
  const [email, setEmail] = useState('')
  const [functieOmschrijving, setFunctieOmschrijving] = useState('')
  const [uitnodigingen, setUitnodigingen] = useState([])
  const [werknemers, setWerknemers] = useState([])
  const [selectedWerknemer, setSelectedWerknemer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

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

    const [uitnodigingenData, werknemersData] = await Promise.all([
      supabase.from('invitations').select('*').eq('employer_id', userProfiel.employer_id).order('created_at', { ascending: false }),
      supabase.from('users').select('*').eq('employer_id', userProfiel.employer_id).eq('role', 'employee').order('created_at', { ascending: false })
    ])

    setUitnodigingen(uitnodigingenData.data || [])
    setWerknemers(werknemersData.data || [])
  }

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
      expires_at: expiresAt,
      functie_omschrijving: functieOmschrijving.trim() || null
    })

    if (insertError) {
      setFoutmelding('Fout bij opslaan in database')
      setLoading(false)
      return
    }

    const response = await fetch('https://groeirichting-backend.onrender.com/api/send-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        to: email, 
        name: 'Medewerker', 
        employerId: profiel.employer_id.toString(), 
        token,
        functieOmschrijving: functieOmschrijving.trim() || null
      })
    })

    if (!response.ok) {
      setFoutmelding('Uitnodiging aangemaakt, maar e-mail verzenden is mislukt.')
    } else {
      setEmail('')
      setFunctieOmschrijving('')
      setSuccesmelding('Uitnodiging succesvol verzonden!')
      setTimeout(() => setSuccesmelding(''), 5000)
      fetchData()
    }

    setLoading(false)
  }

  const handleEdit = (werknemer) => setSelectedWerknemer(werknemer)
  const handleCloseModal = () => setSelectedWerknemer(null)
  const handleSaveChanges = async () => {
    const { id, email, first_name, middle_name, last_name, birthdate, gender } = selectedWerknemer
    await supabase.from('users').update({ email, first_name, middle_name, last_name, birthdate, gender }).eq('id', id)
    handleCloseModal()
    fetchData()
  }

  const handleDelete = async (id) => {
    if (confirm('Weet je zeker dat je deze werknemer wilt verwijderen?')) {
      await supabase.from('users').delete().eq('id', id)
      fetchData()
    }
  }

  const handleResend = async (invitation) => {
    const response = await fetch('https://groeirichting-backend.onrender.com/api/send-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: invitation.email,
        name: 'Medewerker',
        employerId: invitation.employer_id.toString(),
        token: invitation.token
      })
    })
    if (response.ok) alert('Uitnodiging opnieuw verzonden.')
  }

  return (
    <div className="page-container space-y-12">
      <Alert type="success" message={succesmelding} onClose={() => setSuccesmelding('')} />
      <Alert type="error" message={foutmelding} onClose={() => setFoutmelding('')} />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/werkgever-portaal')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar portaal
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Werknemers beheren</h1>
                <p className="text-gray-600 text-sm sm:text-base">Nodig nieuwe medewerkers uit en beheer bestaande accounts.</p>
              </div>
            </div>
            <Users className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>
      </div>

      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <MailPlus className="text-kleur-primary" /> Werknemer uitnodigen
        </h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="E-mailadres" 
              required 
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Versturen...' : 'Uitnodigen'}
            </button>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Voeg een korte omschrijving van de functie van deze werknemer toe
            </label>
            <input 
              type="text" 
              value={functieOmschrijving} 
              onChange={(e) => setFunctieOmschrijving(e.target.value)} 
              placeholder="Bijv. Planner thuiszorgroutes en ondersteuning zorgverleners" 
              maxLength={100}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
            />
            <div className="text-sm text-gray-600">
              <p className="mb-2">Met deze omschrijving kunnen de vragen beter op de betreffende werknemer/teamlid worden afgestemd. Hieronder 3 voorbeelden:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Planner thuiszorgroutes en ondersteuning zorgverleners</li>
                <li>Schadebehandelaar met telefonisch klantcontact</li>
                <li>Logistiek medewerker orderverwerking en verzending</li>
              </ul>
            </div>
          </div>
        </form>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Hoe werkt het uitnodigen?</p>
              <p className="text-blue-700">
                Jouw werknemer/teamlid ontvangt een mail, waarmee jouw werknemer/teamlid het account kan aanmaken. Je hoeft verder niks te doen. 
                Jouw werknemer/teamlid kan gesprekken in de thema's starten in de 'actieve' maanden die jij hebt ingesteld.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werknemerslijst */}
      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-medium mb-4">Actieve werknemers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Naam</th>
                <th className="py-2">E-mailadres</th>
                <th className="py-2">Functie</th>
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
                  <td className="py-2 text-gray-600">{w.functie_omschrijving || '-'}</td>
                  <td className="py-2 text-green-600 font-medium">Geactiveerd</td>
                  <td className="py-2">
                    <div className="flex gap-3 justify-start">
                      <button 
                        onClick={() => handleEdit(w)} 
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Bewerken"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(w.id)} 
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Verwijderen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Uitnodigingenlijst */}
      <section className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-medium mb-4">Openstaande uitnodigingen</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">E-mailadres</th>
                <th className="py-2">Status</th>
                <th className="py-2">Acties</th>
              </tr>
            </thead>
            <tbody>
              {uitnodigingen.filter(u => u.status === 'pending').map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 text-yellow-600 font-medium">Uitgenodigd</td>
                  <td className="py-2">
                    <button 
                      onClick={() => handleResend(u)} 
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Opnieuw versturen"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bewerken modal */}
      {selectedWerknemer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Werknemer bewerken</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                <input 
                  value={selectedWerknemer.email} 
                  onChange={e => setSelectedWerknemer({ ...selectedWerknemer, email: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voornaam</label>
                <input 
                  value={selectedWerknemer.first_name} 
                  onChange={e => setSelectedWerknemer({ ...selectedWerknemer, first_name: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tussenvoegsel</label>
                <input 
                  value={selectedWerknemer.middle_name || ''} 
                  onChange={e => setSelectedWerknemer({ ...selectedWerknemer, middle_name: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achternaam</label>
                <input 
                  value={selectedWerknemer.last_name} 
                  onChange={e => setSelectedWerknemer({ ...selectedWerknemer, last_name: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Geboortedatum</label>
                <input 
                  type="date" 
                  value={selectedWerknemer.birthdate || ''} 
                  onChange={e => setSelectedWerknemer({ ...selectedWerknemer, birthdate: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Geslacht</label>
                                 <select 
                   value={selectedWerknemer.gender || ''} 
                   onChange={e => setSelectedWerknemer({ ...selectedWerknemer, gender: e.target.value })} 
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 >
                   <option value="">Selecteer geslacht</option>
                   <option value="man">Man</option>
                   <option value="vrouw">Vrouw</option>
                   <option value="niet-binair">Niet-binair</option>
                   <option value="liever-niet-zeggen">Liever niet zeggen</option>
                 </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={handleCloseModal} className="btn btn-secondary">Annuleren</button>
              <button onClick={handleSaveChanges} className="btn btn-primary">Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WerknemerBeheren
