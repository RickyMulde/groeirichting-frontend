import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, Calendar, Save } from 'lucide-react'
import { supabase } from './supabaseClient'
import { useTeams } from './contexts/TeamsContext'

function Instellingen() {
  const navigate = useNavigate()
  const { teams } = useTeams()
  const [themas, setThemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTeamId, setSelectedTeamId] = useState(null) // null = organisatie-breed
  const [togglingThemeId, setTogglingThemeId] = useState(null) // Voor loading state per thema
  const [werkgeverConfig, setWerkgeverConfig] = useState({
    actieve_maanden: [3, 6, 9],
    verplicht: true,
    actief: true,
    anonimiseer_na_dagen: 60,
    organisatie_omschrijving: ''
  })
  const [configLoading, setConfigLoading] = useState(true)
  const [configSaving, setConfigSaving] = useState(false)
  const [foutmelding, setFoutmelding] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starten met ophalen data voor instellingen...')
        
        // Haal werkgever ID op via users tabel
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          console.error('❌ Geen gebruiker gevonden')
          return
        }
        console.log('✅ Gebruiker gevonden:', user.email)

        // Haal user data op om employer_id te krijgen
        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('id, role, employer_id')
          .eq('id', user.id)
          .single()

        if (userDataError || !userData) {
          console.error('❌ Fout bij ophalen user data:', userDataError)
          return
        }

        if (!userData.employer_id) {
          console.error('❌ Geen employer_id gekoppeld aan gebruiker')
          return
        }

        const werkgeverId = userData.employer_id
        console.log('✅ Werkgever ID gevonden:', werkgeverId)

        // Haal werkgever configuratie op
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.access_token) {
          console.error('❌ Geen access token gevonden')
          return
        }

        console.log('🔄 Ophalen werkgever configuratie...')
        const configUrl = `${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen/${werkgeverId}`
        console.log('API URL:', configUrl)
        
        const response = await fetch(configUrl, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })
        
        console.log('Configuratie response status:', response.status)
        
        if (response.ok) {
          const configData = await response.json()
          console.log('✅ Configuratie data ontvangen:', configData)
          setWerkgeverConfig(configData)
        } else {
          const errorText = await response.text()
          console.error('❌ Fout bij ophalen configuratie:', response.status, errorText)
          // Toon foutmelding aan gebruiker in plaats van fallback waarden
          setFoutmelding(`Kon configuratie niet laden: ${response.status} ${errorText}`)
        }

        // Haal thema's op via API (met zichtbaarheid status)
        console.log('🔄 Ophalen thema\'s via API...')
        const themaUrl = `${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen/${werkgeverId}/themas`
        const themaResponse = await fetch(themaUrl, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })

        if (themaResponse.ok) {
          const themaData = await themaResponse.json()
          console.log('✅ Thema\'s gevonden via API:', themaData.themas?.length || 0)
          setThemas(themaData.themas || [])
        } else {
          const errorText = await themaResponse.text()
          console.error('❌ Fout bij ophalen thema\'s:', themaResponse.status, errorText)
          setFoutmelding(`Kon thema's niet laden: ${themaResponse.status} ${errorText}`)
        }
      } catch (error) {
        console.error('❌ Onverwachte fout bij ophalen data:', error)
        setFoutmelding(`Onverwachte fout: ${error.message}`)
      } finally {
        setLoading(false)
        setConfigLoading(false)
      }
    }

    fetchData()
  }, [])

  // Herlaad thema's wanneer team selectie verandert
  useEffect(() => {
    const reloadThemas = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Haal user data op om employer_id te krijgen
        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('id, employer_id')
          .eq('id', user.id)
          .single()

        if (userDataError || !userData || !userData.employer_id) return

        const werkgeverId = userData.employer_id

        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.access_token) return

        const themaUrl = `${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen/${werkgeverId}/themas${selectedTeamId ? `?team_id=${selectedTeamId}` : ''}`
        const themaResponse = await fetch(themaUrl, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })

        if (themaResponse.ok) {
          const themaData = await themaResponse.json()
          setThemas(themaData.themas || [])
        }
      } catch (error) {
        console.error('❌ Fout bij herladen thema\'s:', error)
      }
    }

    if (!loading) {
      reloadThemas()
    }
  }, [selectedTeamId, loading])

  const toggleThema = async (themaId, huidigeZichtbaar) => {
    try {
      setTogglingThemeId(themaId)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Geen gebruiker gevonden')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        alert('Geen toegangstoken gevonden')
        return
      }

      const nieuweZichtbaar = !huidigeZichtbaar

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/employer-themes/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          theme_id: themaId,
          zichtbaar: nieuweZichtbaar,
          team_id: selectedTeamId || null
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Thema toggle succesvol:', result)
        
        // Update lokale state
        setThemas((prev) =>
          prev.map((t) => 
            t.id === themaId 
              ? { ...t, zichtbaar: nieuweZichtbaar, is_expliciet_uitgezet: !nieuweZichtbaar && t.is_generiek }
              : t
          )
        )
      } else {
        const errorData = await response.json()
        console.error('❌ Fout bij toggle thema:', errorData)
        alert(`Fout bij wijzigen thema: ${errorData.error || 'Onbekende fout'}`)
      }
    } catch (error) {
      console.error('❌ Onverwachte fout bij toggle thema:', error)
      alert('Er is een fout opgetreden bij het wijzigen van het thema')
    } finally {
      setTogglingThemeId(null)
    }
  }

  const selecteerMaand = (maand) => {
    // Zet de geselecteerde maand als enige actieve maand (altijd maar 1 maand)
    setWerkgeverConfig(prev => ({
      ...prev,
      actieve_maanden: maand ? [parseInt(maand)] : []
    }))
  }

  const saveConfiguratie = async () => {
    try {
      setConfigSaving(true)
      console.log('🔄 Opslaan configuratie...', werkgeverConfig)
      
      // Haal werkgever ID op via users tabel
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('❌ Geen gebruiker gevonden bij opslaan')
        return
      }

      // Haal user data op om employer_id te krijgen
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('id, employer_id')
        .eq('id', user.id)
        .single()

      if (userDataError || !userData || !userData.employer_id) {
        console.error('❌ Fout bij ophalen user data bij opslaan:', userDataError)
        return
      }

      const werkgeverId = userData.employer_id

      // Sla configuratie op
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        console.error('❌ Geen access token bij opslaan')
        return
      }

      const saveData = {
        werkgever_id: werkgeverId,
        ...werkgeverConfig,
        verplicht: true,  // Altijd true
        actief: true      // Altijd true
      }
      console.log('📤 Data die wordt opgeslagen:', saveData)

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(saveData)
      })

      console.log('Opslaan response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Configuratie succesvol opgeslagen:', result)
        alert('Configuratie succesvol opgeslagen!')
      } else {
        const errorData = await response.json()
        console.error('❌ Fout bij opslaan:', errorData)
        alert(`Fout bij opslaan: ${errorData.error}`)
      }
    } catch (error) {
      console.error('❌ Onverwachte fout bij opslaan configuratie:', error)
      alert('Er is een fout opgetreden bij het opslaan')
    } finally {
      setConfigSaving(false)
    }
  }

  const getMaandNaam = (maand) => {
    const maanden = [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ]
    return maanden[maand - 1] || 'Onbekend'
  }

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Foutmelding */}
        {foutmelding && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-red-800 font-medium">Er is een fout opgetreden</p>
                <p className="text-red-700 text-sm">{foutmelding}</p>
              </div>
              <button 
                onClick={() => setFoutmelding('')} 
                className="btn btn-primary text-sm"
              >
                Sluiten
              </button>
            </div>
          </div>
        )}
        {/* Header */}
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
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Instellingen & Thema's</h1>
                <p className="text-gray-600 text-sm sm:text-base">Beheer hier je thema's, organisatie-instellingen en gebruikersrechten.</p>
              </div>
            </div>
            <Settings className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>

        {/* Organisatie Omschrijving */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4">Omschrijving organisatie/team</h2>
            <div className="space-y-4">
              <div>
                <textarea
                  value={werkgeverConfig.organisatie_omschrijving}
                  onChange={(e) => setWerkgeverConfig(prev => ({ ...prev, organisatie_omschrijving: e.target.value }))}
                  placeholder="Geef een korte bondige omschrijving van de werkzaamheden van de betreffende personen die de thema's gaan behandelen."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent resize-none"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Geef een korte bondige omschrijving van de werkzaamheden van de betreffende personen die de thema's gaan behandelen.</p>
                <p className="italic">Hieronder 3 voorbeelden:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>"Onze medewerkers plannen routes, ondersteunen zorgverleners en hebben veel telefonisch contact met cliënten en mantelzorgers."</li>
                  <li>"Het team behandelt klantvragen over verzekeringen, verwerkt wijzigingen in polissen en voert administratieve werkzaamheden uit."</li>
                  <li>"Onze medewerkers stellen orders samen, verwerken zendingen en zorgen dat alles op tijd de deur uit gaat. Het werk is fysiek en kent piekperiodes."</li>
                </ul>
              </div>
              
              {/* Opslaan knop */}
              <div className="pt-4 border-t">
                <button
                  onClick={saveConfiguratie}
                  disabled={configSaving}
                  className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {configSaving ? 'Opslaan...' : 'Opslaan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GroeiScan Configuratie */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-[var(--kleur-primary)]" />
              <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">GroeiScan</h2>
            </div>
            
            {configLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
                <p className="text-gray-600 mt-2">Configuratie laden...</p>
              </div>
            ) : foutmelding ? (
              <div className="text-center py-4">
                <p className="text-red-600">Configuratie kon niet worden geladen. Probeer de pagina te vernieuwen.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-primary mt-2"
                >
                  Pagina vernieuwen
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Actieve maand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Selecteer maand om de GroeiScan uit te voeren.
                  </label>
                  
                  {/* Info box */}
                  <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      In deze maand moeten alle medewerkers de thema's afronden. Gesprekken buiten deze maand worden niet meegenomen in de resultaten.
                    </p>
                  </div>
                  
                  <select
                    value={werkgeverConfig.actieve_maanden.length > 0 ? werkgeverConfig.actieve_maanden[0] : ''}
                    onChange={(e) => selecteerMaand(e.target.value)}
                    className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                  >
                    <option value="">-- Selecteer een maand --</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(maand => (
                      <option key={maand} value={maand}>
                        {getMaandNaam(maand)}
                      </option>
                    ))}
                  </select>
                  {werkgeverConfig.actieve_maanden.length === 0 && (
                    <p className="text-red-600 text-sm mt-2">
                      Selecteer een maand
                    </p>
                  )}
                </div>

                {/* Opslaan knop */}
                <div className="pt-4 border-t">
                  <button
                    onClick={saveConfiguratie}
                    disabled={configSaving || werkgeverConfig.actieve_maanden.length === 0}
                    className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {configSaving ? 'Opslaan...' : 'Configuratie opslaan'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thema's sectie */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4">Thema's</h2>
            
            {/* Team selectie */}
            {teams && teams.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beheer thema's voor:
                </label>
                <select
                  value={selectedTeamId || ''}
                  onChange={(e) => setSelectedTeamId(e.target.value || null)}
                  className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                >
                  <option value="">Hele organisatie</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.naam}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedTeamId 
                    ? `Je beheert nu thema's voor het geselecteerde team.`
                    : `Je beheert nu thema's voor de hele organisatie.`
                  }
                </p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
                <p className="text-gray-600 mt-2">Thema's laden...</p>
              </div>
            ) : themas.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Geen thema's beschikbaar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themas.map((thema) => {
                  const isDisabled = togglingThemeId === thema.id
                  const canToggle = thema.is_generiek || (thema.is_exclusief && thema.zichtbaar)
                  const isExclusiefNietGekoppeld = thema.is_exclusief && !thema.zichtbaar

                  return (
                    <div key={thema.id} className="p-4 border rounded-xl shadow-sm bg-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-[var(--kleur-primary)]">{thema.titel}</h3>
                          <div className="flex gap-2">
                            {thema.is_generiek && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                Generiek
                              </span>
                            )}
                            {thema.is_exclusief && (
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                Exclusief
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {thema.beschrijving_werkgever || thema.beschrijving_werknemer || 'Geen beschrijving beschikbaar.'}
                        </p>
                        {isExclusiefNietGekoppeld && (
                          <p className="text-xs text-amber-600 mt-2 italic">
                            Dit thema is alleen beschikbaar na koppeling door een beheerder.
                          </p>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <label className="text-sm text-gray-700 mr-2">
                          Zichtbaar voor medewerkers
                        </label>
                        <input
                          type="checkbox"
                          checked={thema.zichtbaar}
                          onChange={() => toggleThema(thema.id, thema.zichtbaar)}
                          disabled={isDisabled || !canToggle || isExclusiefNietGekoppeld}
                          className="w-5 h-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      {isDisabled && (
                        <p className="text-xs text-gray-500 mt-2">Bezig met bijwerken...</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Overige instellingen */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-[var(--kleur-primary)]" />
              <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">Overige instellingen</h2>
            </div>
            
            {configLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
                <p className="text-gray-600 mt-2">Configuratie laden...</p>
              </div>
            ) : foutmelding ? (
              <div className="text-center py-4">
                <p className="text-red-600">Configuratie kon niet worden geladen. Probeer de pagina te vernieuwen.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-primary mt-2"
                >
                  Pagina vernieuwen
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Anonimisering */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anonimiseer gesprekken na:
                  </label>
                  <select
                    value={werkgeverConfig.anonimiseer_na_dagen}
                    onChange={(e) => setWerkgeverConfig(prev => ({ ...prev, anonimiseer_na_dagen: parseInt(e.target.value) }))}
                    className="w-full md:w-48 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                  >
                    <option value={30}>30 dagen</option>
                    <option value={60}>60 dagen</option>
                    <option value={90}>90 dagen</option>
                    <option value={180}>180 dagen</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Na deze periode worden persoonlijke antwoorden automatisch geanonimiseerd
                  </p>
                </div>

                {/* Opslaan knop */}
                <div className="pt-4 border-t">
                  <button
                    onClick={saveConfiguratie}
                    disabled={configSaving || werkgeverConfig.actieve_maanden.length === 0}
                    className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {configSaving ? 'Opslaan...' : 'Configuratie opslaan'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instellingen