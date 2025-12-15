import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { ArrowLeft, Link2, Unlink, Users, Building2 } from 'lucide-react'

function WerkgeverThemaKoppelingen() {
  const { themeId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [thema, setThema] = useState(null)
  const [werkgevers, setWerkgevers] = useState([])
  const [koppelingen, setKoppelingen] = useState([])
  const [selectedEmployerId, setSelectedEmployerId] = useState('')
  const [selectedTeamId, setSelectedTeamId] = useState('')
  const [teams, setTeams] = useState([])
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [linking, setLinking] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Haal thema informatie op
  useEffect(() => {
    const fetchThema = async () => {
      try {
        const { data, error } = await supabase
          .from('themes')
          .select('id, titel, beschrijving_werkgever, beschrijving_werknemer, standaard_zichtbaar, klaar_voor_gebruik')
          .eq('id', themeId)
          .single()

        if (error) throw error
        setThema(data)
      } catch (err) {
        console.error('Fout bij ophalen thema:', err)
        setError('Kon thema niet ophalen')
      }
    }

    if (themeId) {
      fetchThema()
    }
  }, [themeId])

  // Haal werkgevers op
  useEffect(() => {
    const fetchWerkgevers = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
        const response = await fetch(`${apiBaseUrl}/api/admin/get-all-employers`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.employers) {
            setWerkgevers(data.employers)
          }
        }
      } catch (err) {
        console.error('Fout bij ophalen werkgevers:', err)
      }
    }

    fetchWerkgevers()
  }, [])

  // Haal koppelingen op
  useEffect(() => {
    const fetchKoppelingen = async () => {
      if (!themeId) return

      try {
        setLoading(true)
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
        const response = await fetch(`${apiBaseUrl}/api/employer-themes/theme/${themeId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setKoppelingen(data.koppelingen || [])
        } else {
          const errorData = await response.json().catch(() => ({}))
          setError(errorData.error || 'Kon koppelingen niet ophalen')
        }
      } catch (err) {
        console.error('Fout bij ophalen koppelingen:', err)
        setError('Fout bij ophalen koppelingen')
      } finally {
        setLoading(false)
      }
    }

    fetchKoppelingen()
  }, [themeId])

  // Haal teams op voor geselecteerde werkgever
  useEffect(() => {
    const fetchTeams = async () => {
      if (!selectedEmployerId) {
        setTeams([])
        setSelectedTeamId('')
        return
      }

      try {
        setLoadingTeams(true)
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        // Haal teams op via Supabase
        const { data, error } = await supabase
          .from('teams')
          .select('id, naam, teams_beschrijving')
          .eq('employer_id', selectedEmployerId)
          .is('archived', false)
          .order('naam')

        if (error) throw error
        setTeams(data || [])
      } catch (err) {
        console.error('Fout bij ophalen teams:', err)
        setError('Kon teams niet ophalen')
      } finally {
        setLoadingTeams(false)
      }
    }

    fetchTeams()
  }, [selectedEmployerId])

  // Koppel thema aan werkgever/team
  const handleKoppel = async () => {
    if (!selectedEmployerId || !themeId) {
      setError('Selecteer een werkgever')
      return
    }

    // Alleen exclusieve thema's kunnen gekoppeld worden
    if (thema?.standaard_zichtbaar) {
      setError('Generieke thema\'s kunnen niet handmatig gekoppeld worden. Ze zijn standaard zichtbaar voor alle werkgevers.')
      return
    }

    try {
      setLinking(true)
      setError('')
      setSuccess('')

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Geen actieve sessie')
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${apiBaseUrl}/api/employer-themes/admin/link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employer_id: selectedEmployerId,
          theme_id: themeId,
          team_id: selectedTeamId || null,
          zichtbaar: true
        })
      })

      if (response.ok) {
        setSuccess('Thema succesvol gekoppeld!')
        setSelectedEmployerId('')
        setSelectedTeamId('')
        setTeams([])
        
        // Herlaad koppelingen
        const koppelingenResponse = await fetch(`${apiBaseUrl}/api/employer-themes/theme/${themeId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        })
        if (koppelingenResponse.ok) {
          const data = await koppelingenResponse.json()
          setKoppelingen(data.koppelingen || [])
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.error || 'Fout bij koppelen thema')
      }
    } catch (err) {
      console.error('Fout bij koppelen thema:', err)
      setError('Er is een fout opgetreden bij het koppelen')
    } finally {
      setLinking(false)
    }
  }

  // Ontkoppel thema
  const handleOntkoppel = async (koppelingId, employerId, teamId) => {
    if (!confirm('Weet je zeker dat je deze koppeling wilt verwijderen?')) {
      return
    }

    try {
      setError('')
      setSuccess('')

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Geen actieve sessie')
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${apiBaseUrl}/api/employer-themes/admin/link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employer_id: employerId,
          theme_id: themeId,
          team_id: teamId || null,
          zichtbaar: false // Zet op false om te ontkoppelen
        })
      })

      if (response.ok) {
        setSuccess('Koppeling succesvol verwijderd!')
        
        // Herlaad koppelingen
        const koppelingenResponse = await fetch(`${apiBaseUrl}/api/employer-themes/theme/${themeId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        })
        if (koppelingenResponse.ok) {
          const data = await koppelingenResponse.json()
          setKoppelingen(data.koppelingen || [])
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.error || 'Fout bij verwijderen koppeling')
      }
    } catch (err) {
      console.error('Fout bij ontkoppelen thema:', err)
      setError('Er is een fout opgetreden bij het ontkoppelen')
    }
  }

  // Haal werkgever naam op
  const getEmployerName = (employerId) => {
    const werkgever = werkgevers.find(w => w.id === employerId)
    return werkgever?.company_name || werkgever?.contact_email || employerId
  }

  // Haal team naam op
  const getTeamName = (teamId) => {
    if (!teamId) return 'Hele organisatie'
    const team = teams.find(t => t.id === teamId)
    if (team) return team.naam
    
    // Als team niet in huidige lijst staat, probeer het uit koppelingen te halen
    const koppeling = koppelingen.find(k => k.team_id === teamId)
    return koppeling?.team_naam || teamId
  }

  if (loading && !thema) {
    return (
      <div className="page-container">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
            <p className="text-gray-600 mt-2">Laden...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!thema) {
    return (
      <div className="page-container">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800">Thema niet gevonden</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/superadmin/thema-beheer')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar thema overzicht
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">
                  Werkgever-koppelingen: {thema.titel}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Beheer welke werkgevers en teams toegang hebben tot dit thema
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thema informatie */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            {thema.standaard_zichtbaar ? (
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded font-medium">
                Generiek thema
              </span>
            ) : (
              <span className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded font-medium">
                Exclusief thema
              </span>
            )}
          </div>
          <p className="text-gray-700">
            {thema.beschrijving_werkgever || thema.beschrijving_werknemer || 'Geen beschrijving beschikbaar'}
          </p>
          {thema.standaard_zichtbaar && (
            <p className="text-sm text-amber-600 mt-2 italic">
              Dit is een generiek thema en is standaard zichtbaar voor alle werkgevers. Werkgevers kunnen het zelf uitzetten.
            </p>
          )}
        </div>

        {/* Foutmeldingen en success */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={() => setError('')} 
              className="text-red-600 text-sm mt-2 underline"
            >
              Sluiten
            </button>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800">{success}</p>
            <button 
              onClick={() => setSuccess('')} 
              className="text-green-600 text-sm mt-2 underline"
            >
              Sluiten
            </button>
          </div>
        )}

        {/* Nieuwe koppeling */}
        {!thema.standaard_zichtbaar && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              Nieuwe koppeling
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Werkgever
                </label>
                <select
                  value={selectedEmployerId}
                  onChange={(e) => {
                    setSelectedEmployerId(e.target.value)
                    setSelectedTeamId('')
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                >
                  <option value="">-- Selecteer werkgever --</option>
                  {werkgevers.map((werkgever) => (
                    <option key={werkgever.id} value={werkgever.id}>
                      {werkgever.company_name || werkgever.contact_email}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEmployerId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team (optioneel)
                  </label>
                  {loadingTeams ? (
                    <p className="text-sm text-gray-500">Teams laden...</p>
                  ) : (
                    <select
                      value={selectedTeamId}
                      onChange={(e) => setSelectedTeamId(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                    >
                      <option value="">Hele organisatie</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.naam}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Laat leeg voor organisatie-brede koppeling, of selecteer een specifiek team
                  </p>
                </div>
              )}

              <button
                onClick={handleKoppel}
                disabled={!selectedEmployerId || linking}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Link2 className="w-4 h-4" />
                {linking ? 'Koppelen...' : 'Koppel thema'}
              </button>
            </div>
          </div>
        )}

        {/* Huidige koppelingen */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Huidige koppelingen ({koppelingen.filter(k => k.zichtbaar).length})
          </h2>

          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
              <p className="text-gray-600 mt-2">Koppelingen laden...</p>
            </div>
          ) : koppelingen.filter(k => k.zichtbaar).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Geen actieve koppelingen gevonden.</p>
              {thema.standaard_zichtbaar && (
                <p className="text-sm text-gray-500 mt-2">
                  Dit generieke thema is standaard zichtbaar voor alle werkgevers.
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Werkgever</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Team</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {koppelingen
                    .filter(k => k.zichtbaar)
                    .map((koppeling) => (
                      <tr key={koppeling.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            {getEmployerName(koppeling.employer_id)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {koppeling.team_id ? (
                            <span className="text-gray-700">{getTeamName(koppeling.team_id)}</span>
                          ) : (
                            <span className="text-gray-500 italic">Hele organisatie</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded ${
                            koppeling.zichtbaar 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {koppeling.zichtbaar ? 'Actief' : 'Uitgeschakeld'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleOntkoppel(koppeling.id, koppeling.employer_id, koppeling.team_id)}
                            className="btn btn-secondary text-sm flex items-center gap-1"
                            title="Verwijder koppeling"
                          >
                            <Unlink className="w-4 h-4" />
                            Verwijder
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WerkgeverThemaKoppelingen

