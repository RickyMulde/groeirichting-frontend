import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabaseClient'
import { Trash2, RefreshCw, ArrowLeft, Users, Settings, MailPlus, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTeams } from './contexts/TeamsContext'
import TeamManagementModal from './components/TeamManagementModal'
import TeamSelector from './components/TeamSelector'
import Alert from './Alert'

function BeheerTeamsWerknemers() {
  const { teams, selectedTeam, selectTeam, refreshTeams } = useTeams()
  const [uitnodigingen, setUitnodigingen] = useState([])
  const [werknemers, setWerknemers] = useState([])
  const [selectedWerknemer, setSelectedWerknemer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [email, setEmail] = useState('')
  const [functieOmschrijving, setFunctieOmschrijving] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isInviteExpanded, setIsInviteExpanded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [selectedTeam, refreshTrigger])

  const fetchData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      // Teams worden al beheerd door TeamsContext, dus we gebruiken die data
      // Haal alle werknemers uit de teams data uit context
      let allWerknemers = []
      if (teams && teams.length > 0) {
        teams.forEach(team => {
          if (team.leden) {
            allWerknemers = allWerknemers.concat(team.leden)
          }
        })
      }
      
      // Filter op geselecteerd team als nodig
      if (selectedTeam) {
        const selectedTeamData = teams?.find(team => team.id === selectedTeam)
        setWerknemers(selectedTeamData?.leden || [])
      } else {
        setWerknemers(allWerknemers)
      }

      // Haal uitnodigingen op via Supabase (gefilterd op employer, exclusief geaccepteerde)
      const { data: currentUser } = await supabase
        .from('users')
        .select('employer_id')
        .eq('id', session.user.id)
        .single()

        if (currentUser?.employer_id) {
          let uitnodigingenQuery = supabase
            .from('invitations')
            .select('*')
            .eq('employer_id', currentUser.employer_id)
            .in('status', ['pending', 'revoked', 'expired'])
            .order('created_at', { ascending: false })

          // Filter op team als een specifiek team is geselecteerd
          if (selectedTeam) {
            uitnodigingenQuery = uitnodigingenQuery.eq('team_id', selectedTeam)
          }

          const { data: uitnodigingenData } = await uitnodigingenQuery
          
          // Filter uitnodigingen waarvan de email al bestaat bij actieve werknemers
          const actieveEmails = allWerknemers.map(w => w.email.toLowerCase())
          
          // Extra check: controleer ook of er al een actieve gebruiker bestaat met dit email
          const gefilterdeUitnodigingen = await Promise.all(
            (uitnodigingenData || []).map(async (uitnodiging) => {
              // Check of email al bestaat bij actieve werknemers
              if (actieveEmails.includes(uitnodiging.email.toLowerCase())) {
                return null
              }
              
              // Extra check: controleer of er al een actieve gebruiker bestaat via backend
              try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session?.access_token) {
                  console.warn('No session token available for user check')
                  return uitnodiging
                }

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/check-user-exists`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                  },
                  body: JSON.stringify({ email: uitnodiging.email })
                })
                
                if (response.ok) {
                  const { exists } = await response.json()
                  return exists ? null : uitnodiging
                } else {
                  // Als er een error is, negeer dan en toon de uitnodiging
                  console.warn('Error checking existing user via backend:', response.status)
                  return uitnodiging
                }
              } catch (error) {
                // Als er een exception is, negeer dan en toon de uitnodiging
                console.warn('Exception checking existing user via backend:', error)
                return uitnodiging
              }
            })
          )
          
          // Filter null values
          const geldigeUitnodigingen = gefilterdeUitnodigingen.filter(Boolean)
          setUitnodigingen(geldigeUitnodigingen)
      } else {
        setUitnodigingen([])
      }
    } catch (error) {
      setFoutmelding('Fout bij ophalen van gegevens')
    }
  }, [selectedTeam, refreshTrigger, teams])


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

    // Valideer dat een team is geselecteerd (niet "Totaal")
    if (!selectedTeam) {
      setFoutmelding('Selecteer eerst een specifiek team om uit te nodigen')
      setLoading(false)
      return
    }

    try {
      // Haal employer_id op
      const { data: currentUser } = await supabase
        .from('users')
        .select('employer_id')
        .eq('id', session.user.id)
        .single()

      if (!currentUser?.employer_id) {
        setFoutmelding('Geen werkgever gevonden')
        setLoading(false)
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-invite`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ 
          to: email, 
          name: 'Medewerker', 
          employerId: currentUser.employer_id,
          token: crypto.randomUUID(),
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
        setIsInviteExpanded(false)
        setSuccesmelding('Uitnodiging succesvol verzonden!')
        setTimeout(() => setSuccesmelding(''), 5000)
        // Ververs de teams data om eventuele wijzigingen te tonen
        refreshTeams()
        setRefreshTrigger(prev => prev + 1)
      }
    } catch (error) {
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
        // Ververs de teams data om de bijgewerkte werknemer gegevens te tonen
        refreshTeams()
        setRefreshTrigger(prev => prev + 1)
      }
    } catch (error) {
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
        // Ververs de teams data om eventuele wijzigingen te tonen
        refreshTeams()
        setRefreshTrigger(prev => prev + 1)
      } else {
        const errorData = await response.json()
        setFoutmelding(errorData.error || 'Fout bij opnieuw versturen uitnodiging')
      }
    } catch (error) {
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
      // Ververs de teams data om eventuele wijzigingen te tonen
      refreshTeams()
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
        // Ververs de teams data om de bijgewerkte teamleden te tonen
        refreshTeams()
        setRefreshTrigger(prev => prev + 1)
      }
    } catch (error) {
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
                onClick={() => navigate('/werkgever-portaal')}
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

        {/* Uitnodiging Harmonica - Alleen zichtbaar als specifiek team geselecteerd */}
        {selectedTeam !== null && selectedTeam !== undefined && (
          <div className="bg-white shadow-md rounded-xl mb-8 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <MailPlus className="text-kleur-primary" /> 
                Werknemer uitnodigen <span className="text-sm text-gray-500">in team {teams.find(team => team.id === selectedTeam)?.naam || 'Onbekend'}</span>
              </h2>
              
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (e.target.value.length > 0) {
                        setIsInviteExpanded(true)
                      }
                    }}
                    onFocus={() => setIsInviteExpanded(true)}
                    placeholder="E-mailadres" 
                    required 
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                  />
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Versturen...' : 'Uitnodigen'}
                  </button>
                </div>
                
                {/* Harmonica inhoud */}
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isInviteExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-3 pt-4">
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
              </form>
            </div>
          </div>
        )}

        {/* Team aanmaken sectie - Alleen zichtbaar als geen specifiek team geselecteerd */}
        {(selectedTeam === null || selectedTeam === undefined) && (
          <div className="bg-white shadow-md rounded-xl mb-8 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-2 text-gray-900">
                Maak (eerst) een team aan
              </h2>
              <p className="text-gray-600 mb-4">
                Je kunt één team aanmaken voor het hele bedrijf of meerdere teams om per team resultaten in te zien.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Let op:</p>
                    <p className="text-amber-700">
                      Resultaten worden pas gegenereerd als minimaal 4 werknemers/teamleden de gesprekken hebben afgerond. (Als een team 4 werknemers/teamleden heeft en één werknemer/teamlid rond het gesprek niet af, dan zijn er dus geen resultaten beschikbaar.)
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowTeamModal(true)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Beheer teams</span>
              </button>
            </div>
          </div>
        )}

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
