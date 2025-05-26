// 📁 Bestand: ThemaBeheer.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Alert from './Alert'

function ThemaBeheer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const nieuwThema = id === 'nieuw'
  const [formData, setFormData] = useState({
    titel: '', beschrijving: '', klaar_voor_gebruik: false,
    voorgesteld_als_verplicht: false, standaard_zichtbaar: true,
    alleen_premium: false, alleen_concept: false, intro_prompt: '',
    vragenlijst: '', vervolgvragen: '', gespreksdoel: '', doel_vraag: '',
    geeft_score: true, geeft_samenvatting: true, geeft_ai_advies: true,
    ai_configuratie: '', branche_labels: '', doelgroep_labels: '',
    zichtbaar_vanaf: '', zichtbaar_tot: '', zoeklabels: '', taalcode: 'nl',
    ai_model: 'gpt-4', volgorde_index: 0, versiebeheer: ''
  })
  const [vragen, setVragen] = useState([])
  const [nieuweVraag, setNieuweVraag] = useState({ tekst: '', verplicht: false, type: 'initieel', taalcode: 'nl' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          navigate('/login')
          return
        }

        const { data: profiel, error: profielError } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profielError || !profiel || profiel.role !== 'superuser') {
          navigate('/login')
          return
        }

        if (!nieuwThema) {
          const { data: themaData, error: themaError } = await supabase
            .from('themes')
            .select('*')
            .eq('id', id)
            .single()

          if (themaError) {
            console.error('Fout bij ophalen thema:', themaError)
            setError('Kan thema niet ophalen. Controleer of de tabel bestaat.')
            setLoading(false)
            return
          }

          if (!themaData) {
            setError('Thema niet gevonden')
            setLoading(false)
            return
          }

          setFormData({
            ...themaData,
            vragenlijst: JSON.stringify(themaData.vragenlijst || {}, null, 2),
            vervolgvragen: JSON.stringify(themaData.vervolgvragen || {}, null, 2),
            ai_configuratie: JSON.stringify(themaData.ai_configuratie || {}, null, 2),
            versiebeheer: JSON.stringify(themaData.versiebeheer || {}, null, 2),
            branche_labels: (themaData.branche_labels || []).join(', '),
            doelgroep_labels: (themaData.doelgroep_labels || []).join(', '),
            zoeklabels: (themaData.zoeklabels || []).join(', ')
          })

          const { data: loadedVragen, error: vragenError } = await supabase
            .from('theme_questions')
            .select('*')
            .eq('theme_id', id)
            .order('volgorde_index')

          if (vragenError) {
            console.error('Fout bij ophalen vragen:', vragenError)
            setError('Kan vragen niet ophalen')
          } else {
            setVragen(loadedVragen || [])
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Fout bij authenticatie:', error)
        setError('Er is een fout opgetreden')
        setLoading(false)
      }
    }

    checkAuth()
  }, [id, navigate, nieuwThema])

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleVraagChange = (e) => {
    const { name, value, type, checked } = e.target
    setNieuweVraag((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const voegVraagToe = () => {
    if (nieuweVraag.tekst.trim()) {
      setVragen((prev) => [...prev, nieuweVraag])
      setNieuweVraag({ tekst: '', verplicht: false, type: 'initieel', taalcode: 'nl' })
    }
  }

  const verwijderVraag = (index) => {
    const vraag = vragen[index]
    if (vraag?.id) {
      supabase.from('theme_questions').delete().eq('id', vraag.id)
    }
    setVragen(vragen.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const payload = {
      ...formData,
      vragenlijst: safeParseJSON(formData.vragenlijst),
      vervolgvragen: safeParseJSON(formData.vervolgvragen),
      ai_configuratie: safeParseJSON(formData.ai_configuratie),
      versiebeheer: safeParseJSON(formData.versiebeheer),
      branche_labels: splitList(formData.branche_labels),
      doelgroep_labels: splitList(formData.doelgroep_labels),
      zoeklabels: splitList(formData.zoeklabels)
    }

    if (nieuwThema) {
      const response = await fetch('/api/create-theme-with-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thema: payload, vragen })
      })
      const result = await response.json()
      if (!response.ok) return setError(result.error || 'Opslaan mislukt')
      setSuccess('Thema en vragen opgeslagen')
      navigate('/superadmin-portaal')
    } else {
      const { error } = await supabase.from('themes').update(payload).eq('id', id)
      if (error) return setError('Opslaan mislukt')

      // bewaar wijzigingen aan vragen (alleen nieuwe toevoegen)
      const nieuwe = vragen.filter((v) => !v.id)
      if (nieuwe.length > 0) {
        const response = await supabase.from('theme_questions').insert(
          nieuwe.map((v, i) => ({ ...v, theme_id: id, volgorde_index: i }))
        )
        if (response.error) return setError('Vragen opslaan mislukt')
      }

      setSuccess('Thema bijgewerkt')
    }
  }

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-6">{nieuwThema ? 'Nieuw thema aanmaken' : 'Thema bewerken'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize">{key.replace(/_/g, ' ')}</label>
            {typeof val === 'boolean' ? (
              <input type="checkbox" name={key} checked={val} onChange={handleChange} />
            ) : (
              <input type={key.includes('datum') ? 'date' : 'text'} name={key} value={val || ''} onChange={handleChange} />
            )}
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-6">Vragen toevoegen</h2>
        <div className="bg-gray-50 p-4 rounded-xl">
          <input type="text" name="tekst" value={nieuweVraag.tekst} onChange={handleVraagChange} placeholder="Vraagtekst" />
          <label className="inline-flex items-center ml-4">
            <input type="checkbox" name="verplicht" checked={nieuweVraag.verplicht} onChange={handleVraagChange} /> Verplicht
          </label>
          <select name="type" value={nieuweVraag.type} onChange={handleVraagChange}>
            <option value="initieel">Initieel</option>
            <option value="vervolg">Vervolg</option>
          </select>
          <button type="button" className="btn btn-secondary ml-4" onClick={voegVraagToe}>+ Voeg vraag toe</button>
        </div>

        {vragen.length > 0 && (
          <ul className="mt-4 list-disc list-inside">
            {vragen.map((vraag, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{vraag.tekst} ({vraag.type}) {vraag.verplicht ? '[verplicht]' : ''}</span>
                <button type="button" className="text-sm text-red-600 underline" onClick={() => verwijderVraag(i)}>Verwijder</button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="btn btn-primary">Opslaan</button>
      </form>

      <Alert message={error} type="error" onClose={() => setError('')} />
      <Alert message={success} type="success" onClose={() => setSuccess('')} />
    </div>
  )
}

function safeParseJSON(str) {
  try {
    return JSON.parse(str || '{}')
  } catch {
    return {}
  }
}

function splitList(str) {
  return str ? str.split(',').map((s) => s.trim()) : []
}

export default ThemaBeheer
