import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, LogIn, Copy, Check, Settings } from 'lucide-react'

function GebruikersBeheer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [werkgevers, setWerkgevers] = useState([])
  const [werknemers, setWerknemers] = useState([])
  const [zoekterm, setZoekterm] = useState('')
  const [generatingLink, setGeneratingLink] = useState(null) // userId of email die link genereert
  const [copiedLink, setCopiedLink] = useState(null) // userId of email waarvan link is gekopieerd
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
      try {
        setError(null)
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          setError('Geen actieve sessie')
          return
        }

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

        // Haal werkgevers op via backend endpoint
        const werkgeversResponse = await fetch(`${apiBaseUrl}/api/admin/get-all-employers`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!werkgeversResponse.ok) {
          if (werkgeversResponse.status === 403) {
            setError('Geen toegang. Alleen superusers kunnen deze pagina bekijken.')
            return
          }
          if (werkgeversResponse.status === 401) {
            navigate('/login')
            return
          }
          const errorData = await werkgeversResponse.json().catch(() => ({}))
          throw new Error(errorData.error || 'Fout bij ophalen werkgevers')
        }

        const werkgeversData = await werkgeversResponse.json()
        if (werkgeversData.success && werkgeversData.employers) {
          setWerkgevers(werkgeversData.employers)
        }

        // Haal werknemers op via backend endpoint
        const werknemersResponse = await fetch(`${apiBaseUrl}/api/admin/get-all-users?role=employee`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!werknemersResponse.ok) {
          if (werknemersResponse.status === 403) {
            setError('Geen toegang. Alleen superusers kunnen deze pagina bekijken.')
            return
          }
          if (werknemersResponse.status === 401) {
            navigate('/login')
            return
          }
          const errorData = await werknemersResponse.json().catch(() => ({}))
          throw new Error(errorData.error || 'Fout bij ophalen werknemers')
        }

        const werknemersData = await werknemersResponse.json()
        if (werknemersData.success && werknemersData.users) {
          setWerknemers(werknemersData.users)
        }

      } catch (err) {
        console.error('Fout bij ophalen gebruikers:', err)
        setError(err.message || 'Er is een fout opgetreden bij het ophalen van de gegevens.')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
    fetchGebruikers()
  }, [navigate])

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

  // Functie om magic link te genereren en te openen
  const handleLoginAsUser = async (email, userId = null) => {
    try {
      setGeneratingLink(userId || email)
      setError(null)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Geen actieve sessie')
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

      const response = await fetch(`${apiBaseUrl}/api/admin/generate-magic-link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          userId: userId
        })
      })

      if (!response.ok) {
        if (response.status === 403) {
          setError('Geen toegang. Alleen superusers kunnen deze functie gebruiken.')
          return
        }
        if (response.status === 401) {
          navigate('/login')
          return
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Fout bij genereren magic link')
      }

      const data = await response.json()
      if (data.success && data.magicLink) {
        // Open link in nieuw tabblad
        window.open(data.magicLink, '_blank')
      } else {
        throw new Error('Geen magic link ontvangen')
      }

    } catch (err) {
      console.error('Fout bij genereren magic link:', err)
      setError(err.message || 'Er is een fout opgetreden bij het genereren van de login link.')
    } finally {
      setGeneratingLink(null)
    }
  }

  // Functie om magic link te kopiëren naar clipboard
  const handleCopyMagicLink = async (email, userId = null) => {
    try {
      setGeneratingLink(userId || email)
      setError(null)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Geen actieve sessie')
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

      const response = await fetch(`${apiBaseUrl}/api/admin/generate-magic-link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          userId: userId
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Fout bij genereren magic link')
      }

      const data = await response.json()
      if (data.success && data.magicLink) {
        // Kopieer naar clipboard
        await navigator.clipboard.writeText(data.magicLink)
        setCopiedLink(userId || email)
        setTimeout(() => setCopiedLink(null), 2000) // Reset na 2 seconden
      } else {
        throw new Error('Geen magic link ontvangen')
      }

    } catch (err) {
      console.error('Fout bij kopiëren magic link:', err)
      setError(err.message || 'Er is een fout opgetreden bij het kopiëren van de login link.')
    } finally {
      setGeneratingLink(null)
    }
  }

  if (loading) return <div className="page-container">Laden...</div>
  if (error) return <div className="page-container text-red-600">{error}</div>

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/superadmin-portaal')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar portaal
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Werkgevers en werknemers instellingen</h1>
                <p className="text-gray-600 text-sm sm:text-base">Beheer alle werkgevers en werknemers in het systeem.</p>
              </div>
            </div>
            <Users className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>

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
                    <div className="flex gap-2 flex-wrap">
                      <Link
                        to={`/superadmin/werkgever/${werkgever.id}/instellingen`}
                        className="btn btn-accent text-xs flex items-center gap-1"
                        title="GPT-doelstelling per thema"
                      >
                        <Settings className="w-3 h-3" />
                        Instellingen
                      </Link>
                      <button 
                        onClick={() => handleLoginAsUser(werkgever.contact_email)}
                        disabled={generatingLink === werkgever.contact_email}
                        className="btn btn-primary text-xs flex items-center gap-1"
                        title="Login als deze werkgever"
                      >
                        {generatingLink === werkgever.contact_email ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Laden...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-3 h-3" />
                            Login als
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleCopyMagicLink(werkgever.contact_email)}
                        disabled={generatingLink === werkgever.contact_email}
                        className="btn btn-secondary text-xs flex items-center gap-1"
                        title="Kopieer login link"
                      >
                        {copiedLink === werkgever.contact_email ? (
                          <>
                            <Check className="w-3 h-3" />
                            Gekopieerd!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Kopieer link
                          </>
                        )}
                      </button>
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
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={() => handleLoginAsUser(werknemer.email, werknemer.id)}
                        disabled={generatingLink === werknemer.id}
                        className="btn btn-primary text-xs flex items-center gap-1"
                        title="Login als deze werknemer"
                      >
                        {generatingLink === werknemer.id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Laden...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-3 h-3" />
                            Login als
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleCopyMagicLink(werknemer.email, werknemer.id)}
                        disabled={generatingLink === werknemer.id}
                        className="btn btn-secondary text-xs flex items-center gap-1"
                        title="Kopieer login link"
                      >
                        {copiedLink === werknemer.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            Gekopieerd!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Kopieer link
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GebruikersBeheer 