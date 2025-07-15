import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'
import { supabase } from './supabaseClient'

function Instellingen() {
  const navigate = useNavigate()
  const [themas, setThemas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThemas = async () => {
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel, beschrijving, standaard_zichtbaar, klaar_voor_gebruik')
        .eq('klaar_voor_gebruik', true)
        .order('volgorde_index')

      if (error) {
        console.error('Fout bij ophalen thema\'s:', error)
      } else {
        const enriched = data.map((t) => ({
          ...t,
          actief: t.standaard_zichtbaar // default: aan of uit
        }))
        setThemas(enriched)
      }
      setLoading(false)
    }

    fetchThemas()
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
        {/* Rest van de pagina */}
        {loading ? (
          <div>Bezig met laden...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themas.map((thema) => (
              <div key={thema.id} className="p-4 border rounded-xl shadow-sm bg-white flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-kleur-primary">{thema.titel}</h2>
                  <p className="text-gray-600 text-sm mt-1">{thema.beschrijving || 'Geen beschrijving beschikbaar.'}</p>
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
  )
}

export default Instellingen