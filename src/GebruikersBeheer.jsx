import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function GebruikersBeheer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [werkgevers, setWerkgevers] = useState([])
  const [werknemers, setWerknemers] = useState([])
  const [zoekterm, setZoekterm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return navigate('/login')

      const { data: profiel } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!profiel || profiel.role !== 'superuser') return navigate('/login')
    }

    const fetchGebruikers = async () => {
      // Haal werkgevers op uit employers
      const { data: werkgeversData, error: werkgeversError } = await supabase
        .from('employers')
        .select('*')
        .order('created_at', { ascending: false })

      if (!werkgeversError && werkgeversData) {
        setWerkgevers(werkgeversData)
      }

      // Haal werknemers op uit users
      const { data: werknemersData, error: werknemersError } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'employee')
        .order('created_at', { ascending: false })

      if (!werknemersError && werknemersData) {
        setWerknemers(werknemersData)
      }
    }

    checkAuth()
    fetchGebruikers()
    setLoading(false)
  }, [])

  // Filteren op zoekterm (case-insensitive)
  const filterWerkgevers = (lijst) => {
    if (!zoekterm.trim()) return lijst
    return lijst.filter((werkgever) => {
      const email = werkgever.contact_email?.toLowerCase() || ''
      const company = werkgever.company_name?.toLowerCase() || ''
      const term = zoekterm.toLowerCase()
      return email.includes(term) || company.includes(term)
    })
  }

  const filterWerknemers = (lijst) => {
    if (!zoekterm.trim()) return lijst
    return lijst.filter((gebruiker) => {
      const email = gebruiker.email?.toLowerCase() || ''
      const first = gebruiker.first_name?.toLowerCase() || ''
      const last = gebruiker.last_name?.toLowerCase() || ''
      const term = zoekterm.toLowerCase()
      return email.includes(term) || first.includes(term) || last.includes(term)
    })
  }

  const gefilterdeWerkgevers = filterWerkgevers(werkgevers)
  const gefilterdeWerknemers = filterWerknemers(werknemers)

  if (loading) return <div className="page-container">Laden...</div>
  if (error) return <div className="page-container text-red-600">{error}</div>

  return (
    <div className="page-container">
      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Werkgevers en werknemers instellingen</h1>

      {/* Zoekveld */}
      <div className="mb-8 max-w-md">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Zoek op e-mailadres, bedrijfsnaam, voornaam of achternaam..."
          value={zoekterm}
          onChange={e => setZoekterm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Werkgevers sectie */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Werkgevers ({gefilterdeWerkgevers.length})</h2>
          <div className="space-y-3">
            {gefilterdeWerkgevers.length === 0 ? (
              <div className="text-gray-400 italic">Geen resultaten gevonden.</div>
            ) : (
              gefilterdeWerkgevers.map((werkgever) => (
                <div key={werkgever.id} className="border rounded-lg p-3">
                  <p className="font-medium">{werkgever.contact_email}</p>
                  {werkgever.company_name && (
                    <p className="text-sm text-gray-700">{werkgever.company_name}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-3">
                    Aangemaakt: {new Date(werkgever.created_at).toLocaleDateString('nl-NL')}
                  </p>
                  <div className="flex gap-2">
                    <button className="btn btn-accent text-xs">Bewerk</button>
                    <button className="btn btn-secondary text-xs">Details</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Werknemers sectie */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Werknemers ({gefilterdeWerknemers.length})</h2>
          <div className="space-y-3">
            {gefilterdeWerknemers.length === 0 ? (
              <div className="text-gray-400 italic">Geen resultaten gevonden.</div>
            ) : (
              gefilterdeWerknemers.map((werknemer) => (
                <div key={werknemer.id} className="border rounded-lg p-3">
                  <p className="font-medium">{werknemer.email}</p>
                  {(werknemer.first_name || werknemer.last_name) && (
                    <p className="text-sm text-gray-700">
                      {[werknemer.first_name, werknemer.last_name].filter(Boolean).join(' ')}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-3">
                    Aangemaakt: {new Date(werknemer.created_at).toLocaleDateString('nl-NL')}
                  </p>
                  <div className="flex gap-2">
                    <button className="btn btn-accent text-xs">Bewerk</button>
                    <button className="btn btn-secondary text-xs">Details</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GebruikersBeheer 