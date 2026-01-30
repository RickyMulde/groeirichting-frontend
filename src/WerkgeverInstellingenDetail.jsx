// 📁 Bestand: WerkgeverInstellingenDetail.jsx
// Superadmin: detailpagina per werkgever – GPT-doelstelling per thema bekijken en overschrijven.
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { ArrowLeft, Save } from 'lucide-react'

function WerkgeverInstellingenDetail() {
  const { werkgeverId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)
  const [error, setError] = useState(null)
  const [werkgever, setWerkgever] = useState(null)
  const [themas, setThemas] = useState([])
  const [overrideValues, setOverrideValues] = useState({})

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
    checkAuth()
  }, [navigate])

  useEffect(() => {
    if (!werkgeverId) return
    const fetchInstellingen = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.access_token) {
          setError('Geen sessie')
          return
        }
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/werkgevers/${werkgeverId}/instellingen`,
          { headers: { 'Authorization': `Bearer ${session.access_token}` } }
        )
        if (!res.ok) {
          if (res.status === 403) {
            setError('Geen toegang. Alleen superusers.')
            return
          }
          if (res.status === 404) {
            setError('Werkgever niet gevonden')
            return
          }
          const err = await res.json().catch(() => ({}))
          throw new Error(err.error || 'Fout bij ophalen instellingen')
        }
        const data = await res.json()
        setWerkgever(data.werkgever)
        setThemas(data.themas || [])
        const initial = {}
        ;(data.themas || []).forEach(t => {
          initial[t.theme_id] = t.gpt_doelstelling_override != null ? t.gpt_doelstelling_override : ''
        })
        setOverrideValues(initial)
      } catch (e) {
        setError(e.message || 'Er is een fout opgetreden')
      } finally {
        setLoading(false)
      }
    }
    fetchInstellingen()
  }, [werkgeverId])

  const handleOverrideChange = (themeId, value) => {
    setOverrideValues(prev => ({ ...prev, [themeId]: value }))
  }

  const saveOverride = async (themeId) => {
    setSaving(themeId)
    setError(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        setError('Geen sessie')
        return
      }
      const value = overrideValues[themeId]
      const body = value == null || String(value).trim() === '' ? { gpt_doelstelling: null } : { gpt_doelstelling: String(value).trim() }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/werkgevers/${werkgeverId}/instellingen/thema/${themeId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify(body)
        }
      )
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Fout bij opslaan')
      }
      setThemas(prev => prev.map(t => {
        if (t.theme_id !== themeId) return t
        const v = body.gpt_doelstelling
        return {
          ...t,
          gpt_doelstelling_override: v,
          gpt_doelstelling_effectief: v != null && v !== '' ? v : (t.gpt_doelstelling_standaard ?? '')
        }
      }))
    } catch (e) {
      setError(e.message || 'Opslaan mislukt')
    } finally {
      setSaving(null)
    }
  }

  if (loading) return <div className="page-container">Laden...</div>
  if (error && !werkgever) return <div className="page-container text-red-600">{error}</div>

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/superadmin/gebruikers-beheer')}
            className="btn btn-secondary flex items-center gap-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar gebruikersbeheer
          </button>
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)] mt-4">
            Instellingen: {werkgever?.company_name || werkgever?.contact_email}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            GPT-doelstelling per thema. Leeg = standaard van het thema wordt gebruikt.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {themas.map((t) => (
            <section key={t.theme_id} className="bg-white shadow-md rounded-xl p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{t.titel}</h2>
              <p className="text-sm text-gray-500 mb-3">
                Huidige waarde in gesprekken: {t.gpt_doelstelling_effectief || '(standaard thema)'}
              </p>
              <p className="text-xs text-gray-400 mb-2">
                Standaard (thema): {t.gpt_doelstelling_standaard || '—'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <textarea
                  className="input input-bordered w-full min-h-[80px]"
                  placeholder="Override voor deze werkgever (leeg = standaard gebruiken)"
                  value={overrideValues[t.theme_id] ?? ''}
                  onChange={e => handleOverrideChange(t.theme_id, e.target.value)}
                  rows={3}
                />
                <button
                  type="button"
                  className="btn btn-primary self-start sm:self-center shrink-0"
                  disabled={saving === t.theme_id}
                  onClick={() => saveOverride(t.theme_id)}
                >
                  {saving === t.theme_id ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 inline mr-1" />
                      Opslaan
                    </>
                  )}
                </button>
              </div>
            </section>
          ))}
        </div>

        {themas.length === 0 && (
          <p className="text-gray-500">Geen thema's beschikbaar.</p>
        )}
      </div>
    </div>
  )
}

export default WerkgeverInstellingenDetail
