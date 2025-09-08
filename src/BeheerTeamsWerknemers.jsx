import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabaseClient'
import { Trash2, RefreshCw, ArrowLeft, Users, Settings, Plus, MailPlus, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTeams } from './contexts/TeamsContext'
import TeamManagementModal from './components/TeamManagementModal'
import TeamSelector from './components/TeamSelector'
import InviteModal from './components/InviteModal'
import Alert from './Alert'

function BeheerTeamsWerknemers() {
  const { teams, selectedTeam, selectTeam } = useTeams()
  const [uitnodigingen, setUitnodigingen] = useState([])
  const [werknemers, setWerknemers] = useState([])
  const [selectedWerknemer, setSelectedWerknemer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [email, setEmail] = useState('')
  const [functieOmschrijving, setFunctieOmschrijving] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const fetchData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      // Haal teams op via backend API
      const teamsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      
      if (teamsResponse.ok) {
        const teamsData = await teamsResponse.json()
        // Teams worden al beheerd door TeamsContext, dus we hoeven ze hier niet te zetten
      }

      // Haal uitnodigingen op via Supabase (deze hebben we nog niet geconverteerd naar backend API)
      const { data: uitnodigingenData } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false })

      setUitnodigingen(uitnodigingenData || [])

      // Haal werknemers op via Supabase (gefilterd op team als geselecteerd)
      let werknemersQuery = supabase
        .from('users')
        .select('*')
        .eq('role', 'employee')
        .order('created_at', { ascending: false })

      if (selectedTeam) {
        werknemersQuery = werknemersQuery.eq('team_id', selectedTeam)
      }

      const { data: werknemersData } = await werknemersQuery
      setWerknemers(werknemersData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setFoutmelding('Fout bij ophalen van gegevens')
    }
  }, [selectedTeam])

  const handleInviteSent = (result) => {
    setSuccesmelding(`Uitnodiging verzonden naar ${result.email}`)
    // Refresh data via useEffect dependency
    fetchData()
  }

  // Inline uitnodiging functionaliteit (van oude Werknemerbeheren.jsx)
  const handleInvite = async (e) => {
    e.preventDefault()
    setFoutmelding('')
    setSuccesmelding('')
    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setFoutmelding('Gebruiker niet ingelogd')
      setLoading(false)
      return
    }

    // Valideer dat een team is geselecteerd
    if (!selectedTeam) {
      setFoutmelding('Selecteer eerst een team')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-invite`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ 
          to: email, 
          name: 'Medewerker', 
          teamId: selectedTeam,
          functieOmschrijving: functieOmschrijving.trim() || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        setFoutmelding(errorData.error || 'Fout bij verzenden uitnodiging')
      } else {
        setEmail('')
        setFunctieOmschrijving('')
        setSuccesmelding('Uitnodiging succesvol verzonden!')
        setTimeout(() => setSuccesmelding(''), 5000)
        fetchData()
      }
    } catch (error) {
      console.error('Error sending invite:', error)
      setFoutmelding('Fout bij verzenden uitnodiging')
    }

    setLoading(false)
  }

  // Werknemer bewerken functionaliteit
  const handleEdit = (werknemer) => setSelectedWerknemer(werknemer)
  const handleCloseModal = () => setSelectedWerknemer(null)
  const handleSaveChanges = async () => {
    const { id, email, first_name, middle_name, last_name, birthdate, gender, functie_omschrijving } = selectedWerknemer
    
    try {
      const { error } = await supabase.from('users').update({ 
        email, 
        first_name, 
        middle_name, 
        last_name, 
        birthdate, 
        gender, 
        functie_omschrijving 
      }).eq('id', id)

      if (error) {
        setFoutmelding('Fout bij opslaan wijzigingen')
      } else {
        setSuccesmelding('Wijzigingen opgeslagen')
        handleCloseModal()
        fetchData()
      }
    } catch (error) {
      console.error('Error saving changes:', error)
      setFoutmelding('Fout bij opslaan wijzigingen')
    }
  }

  const handleResend = async (invitation) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-invite`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          to: invitation.email,
          name: 'Medewerker',
          teamId: invitation.team_id,
          functieOmschrijving: invitation.functie_omschrijving || null
        })
      })

      if (response.ok) {
        setSuccesmelding('Uitnodiging opnieuw verzonden')
        fetchData()
      } else {
        const errorData = await response.json()
        setFoutmelding(errorData.error || 'Fout bij opnieuw versturen uitnodiging')
      }
    } catch (error) {
      console.error('Error resending invite:', error)
      setFoutmelding('Fout bij opnieuw versturen uitnodiging')
    }
  }

  const handleDeleteInvitation = async (invitationId) => {
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', invitationId)

    if (error) {
      setFoutmelding('Fout bij verwijderen uitnodiging')
    } else {
      setSuccesmelding('Uitnodiging verwijderd')
      fetchData()
    }
  }

  const handleDeleteWerknemer = async (werknemerId) => {
    if (!confirm('Weet je zeker dat je deze werknemer wilt verwijderen?')) return

    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', werknemerId)

      if (error) {
        setFoutmelding('Fout bij verwijderen werknemer')
      } else {
        setSuccesmelding('Werknemer verwijderd')
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      setFoutmelding('Fout bij verwijderen werknemer')
    }
  }

  const getTeamName = (teamId) => {
    if (!teamId) return 'Geen team'
    const team = teams.find(t => t.id === teamId)
    return team ? team.naam : 'Onbekend team'
  }

  const getFilteredWerknemers = () => {
    if (!selectedTeam) return werknemers
    return werknemers.filter(werknemer => werknemer.team_id === selectedTeam)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Beheer Teams en Werknemers</h1>
                <p className="text-sm text-gray-500">Beheer je teams en werknemers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTeamModal(true)}
                className="btn btn-accent flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Beheer Teams</span>
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Werknemer Uitnodigen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {foutmelding && <Alert type="error" message={foutmelding} onClose={() => setFoutmelding('')} />}
        {succesmelding && <Alert type="success" message={succesmelding} onClose={() => setSuccesmelding('')} />}

        {/* Team Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter op Team
          </label>
          <TeamSelector
            onTeamSelect={selectTeam}
            selectedTeamId={selectedTeam}
            className="max-w-md"
          />
        </div>

        {/* Inline Uitnodiging Form */}
        <div className="bg-white shadow-md p-6 rounded-xl mb-8">
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
              <button type="submit" disabled={loading || !selectedTeam} className="btn btn-primary">
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
        </div>

        {/* Teams Overzicht */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Teams Overzicht</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTeam === team.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => selectTeam(team.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{team.naam}</h3>
                    <p className="text-sm text-gray-500">
                      {team.members_count || 0} {team.members_count === 1 ? 'lid' : 'leden'}
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Werknemers Lijst */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Werknemers {selectedTeam ? `- ${getTeamName(selectedTeam)}` : '- Alle Teams'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Naam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E-mail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Functie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aangemeld
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredWerknemers().map((werknemer) => (
                  <tr key={werknemer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {werknemer.first_name} {werknemer.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{werknemer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getTeamName(werknemer.team_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {werknemer.functie_omschrijving || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(werknemer.created_at).toLocaleDateString('nl-NL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(werknemer)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Bewerken"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteWerknemer(werknemer.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Verwijderen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Uitnodigingen Lijst */}
        {uitnodigingen.length > 0 && (
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Openstaande Uitnodigingen</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-mail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verzonden
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acties
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uitnodigingen.map((uitnodiging) => (
                    <tr key={uitnodiging.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{uitnodiging.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getTeamName(uitnodiging.team_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(uitnodiging.created_at).toLocaleDateString('nl-NL')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleResend(uitnodiging)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                            title="Opnieuw verzenden"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInvitation(uitnodiging.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Verwijderen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <TeamManagementModal
        isOpen={showTeamModal}
        onClose={() => setShowTeamModal(false)}
      />
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInviteSent={handleInviteSent}
      />

      {/* Werknemer Bewerken Modal */}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Functie omschrijving</label>
                <input 
                  type="text" 
                  value={selectedWerknemer.functie_omschrijving || ''} 
                  onChange={e => setSelectedWerknemer({ ...selectedWerknemer, functie_omschrijving: e.target.value })} 
                  placeholder="Bijv. Planner thuiszorgroutes en ondersteuning zorgverleners"
                  maxLength={100}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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

export default BeheerTeamsWerknemers
