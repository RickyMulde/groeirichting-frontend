import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, Calendar, Save } from 'lucide-react'
import { supabase } from './supabaseClient'

function Instellingen() {
  const navigate = useNavigate()
  const [themas, setThemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [werkgeverConfig, setWerkgeverConfig] = useState({
    actieve_maanden: [3, 6, 9],
    verplicht: true,
    actief: true,
    anonimiseer_na_dagen: 60,
    organisatie_omschrijving: ''
  })
  const [configLoading, setConfigLoading] = useState(true)
  const [configSaving, setConfigSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Haal werkgever ID op
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: werkgever, error: werkgeverError } = await supabase
          .from('employers')
          .select('id')
          .eq('contact_email', user.email)
          .single()

        if (werkgeverError) {
          console.error('Fout bij ophalen werkgever:', werkgeverError)
          return
        }

        // Haal werkgever configuratie op
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen/${werkgever.id}`)
        if (response.ok) {
          const configData = await response.json()
          setWerkgeverConfig(configData)
        }

        // Haal thema's op
        const { data: themaData, error: themaError } = await supabase
          .from('themes')
          .select('id, titel, beschrijving_werknemer, beschrijving_werkgever, standaard_zichtbaar, klaar_voor_gebruik')
          .eq('klaar_voor_gebruik', true)
          .order('volgorde_index', { ascending: true })

        if (themaError) {
          console.error('Fout bij ophalen thema\'s:', themaError)
        } else {
          const enriched = themaData.map((t) => ({
            ...t,
            actief: t.standaard_zichtbaar
          }))
          setThemas(enriched)
        }
      } catch (error) {
        console.error('Fout bij ophalen data:', error)
      } finally {
        setLoading(false)
        setConfigLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleThema = async (id, huidigeStatus) => {
    const nieuweStatus = !huidigeStatus
    const { error } = await supabase
      .from('themes')
      .update({ standaard_zichtbaar: nieuweStatus })
      .eq('id', id)

    if (error) {
      console.error('Fout bij updaten thema:', error)
    } else {
      setThemas((prev) =>
        prev.map((t) => t.id === id ? { ...t, actief: nieuweStatus } : t)
      )
    }
  }

  const toggleMaand = (maand) => {
    setWerkgeverConfig(prev => {
      const nieuweMaanden = prev.actieve_maanden.includes(maand)
        ? prev.actieve_maanden.filter(m => m !== maand)
        : [...prev.actieve_maanden, maand].sort((a, b) => a - b)
      
      return {
        ...prev,
        actieve_maanden: nieuweMaanden
      }
    })
  }

  const saveConfiguratie = async () => {
    try {
      setConfigSaving(true)
      
      // Haal werkgever ID op
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: werkgever, error: werkgeverError } = await supabase
        .from('employers')
        .select('id')
        .eq('contact_email', user.email)
        .single()

      if (werkgeverError) {
        console.error('Fout bij ophalen werkgever:', werkgeverError)
        return
      }

      // Sla configuratie op
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/werkgever-gesprek-instellingen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werkgever_id: werkgever.id,
          ...werkgeverConfig
        })
      })

      if (response.ok) {
        alert('Configuratie succesvol opgeslagen!')
      } else {
        const errorData = await response.json()
        alert(`Fout bij opslaan: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Fout bij opslaan configuratie:', error)
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
            </div>
          </div>
        </div>

        {/* Gespreksfrequentie Configuratie */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[var(--kleur-primary)]" />
              <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">Gespreksfrequentie</h2>
            </div>
            
            {configLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
                <p className="text-gray-600 mt-2">Configuratie laden...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Actieve maanden */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Actieve maanden voor alle thema's:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(maand => (
                      <label key={maand} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={werkgeverConfig.actieve_maanden.includes(maand)}
                          onChange={() => toggleMaand(maand)}
                          className="w-4 h-4 text-[var(--kleur-primary)] border-gray-300 rounded focus:ring-[var(--kleur-primary)]"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {getMaandNaam(maand)}
                        </span>
                      </label>
                    ))}
                  </div>
                  {werkgeverConfig.actieve_maanden.length === 0 && (
                    <p className="text-red-600 text-sm mt-2">
                      Selecteer minimaal één maand
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Selecteer in welke maanden jouw werknemers de gesprekken gaan voeren. Op de eerste van de actieve maand ontvangen ze automatisch een uitnodiging. Op de 1e dag van maand daarop zou iedereen de gesprekken moeten hebben gevoerd en is het dashboard met resultaten (samenvattingen, scores en tips om bedrijfsvoering te verbeteren) inzichtelijk.
                  </p>
                </div>

                {/* Overige instellingen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={werkgeverConfig.verplicht}
                        onChange={(e) => setWerkgeverConfig(prev => ({ ...prev, verplicht: e.target.checked }))}
                        className="w-4 h-4 text-[var(--kleur-primary)] border-gray-300 rounded focus:ring-[var(--kleur-primary)]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Gesprekken zijn verplicht
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={werkgeverConfig.actief}
                        onChange={(e) => setWerkgeverConfig(prev => ({ ...prev, actief: e.target.checked }))}
                        className="w-4 h-4 text-[var(--kleur-primary)] border-gray-300 rounded focus:ring-[var(--kleur-primary)]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Gespreksfrequentie actief
                      </span>
                    </label>
                  </div>
                </div>

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

        {/* Thema's sectie */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4">Thema's</h2>
          {loading ? (
            <div>Bezig met laden...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themas.map((thema) => (
                <div key={thema.id} className="p-4 border rounded-xl shadow-sm bg-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--kleur-primary)]">{thema.titel}</h3>
                    <p className="text-gray-600 text-sm mt-1">{thema.beschrijving_werkgever || thema.beschrijving_werknemer || 'Geen beschrijving beschikbaar.'}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <label className="text-sm text-gray-700 mr-2">Zichtbaar voor medewerkers</label>
                    <input
                      type="checkbox"
                      checked={thema.actief}
                      onChange={() => toggleThema(thema.id, thema.actief)}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Instellingen