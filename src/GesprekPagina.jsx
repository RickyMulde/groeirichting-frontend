import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from './supabaseClient'
import { containsSensitiveInfo } from './utils/filterInput';

function GesprekPagina() {
  const [params] = useSearchParams()
  const themeId = params.get('theme_id')

  if (!themeId) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-semibold text-kleur-primary">Gesprek</h1>
        <p className="text-red-600 bg-red-50 p-4 rounded-xl">Er is geen thema geselecteerd. Je kunt geen gesprek starten.</p>
        <a href="/thema-overzicht" className="inline-block text-blue-600 underline">← Terug naar thema-overzicht</a>
      </div>
    )
  }

  const [theme, setTheme] = useState(null)
  const [vragen, setVragen] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [antwoorden, setAntwoorden] = useState([])
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)
  const [saved, setSaved] = useState(false)
  const [foutmelding, setFoutmelding] = useState(null)

  useEffect(() => {
    const fetchThema = async () => {
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel, intro_prompt, doel_vraag, vragenlijst')
        .eq('id', themeId)
        .single()

      if (!error && data) {
        setTheme(data)
        try {
          const parsed = typeof data.vragenlijst === 'string' ? JSON.parse(data.vragenlijst) : data.vragenlijst
          setVragen(parsed || [])
        } catch {
          console.warn('Vragenlijst kon niet worden geladen.')
        }
      } else {
        console.error('Fout bij ophalen thema:', error)
      }
    }

    if (themeId) fetchThema()
  }, [themeId])

  const verstuurAntwoord = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const nieuweAntwoorden = [...antwoorden, { vraag: vragen[currentIndex]?.tekst, antwoord: input }]
    setAntwoorden(nieuweAntwoorden)
    setInput('')

    if (currentIndex + 1 >= vragen.length) {
      setDone(true)
      slaGesprekOp(nieuweAntwoorden)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const startGesprek = () => setCurrentIndex(0)

  const slaGesprekOp = async (antwoorden) => {
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        werknemer_id: user.id,
        theme_id: themeId,
        antwoorden,
        status: 'verzonden',
        taalcode: 'nl'
      })
    })

    const result = await response.json()
    if (response.ok) {
      setSaved(true)
    } else {
      console.error('Opslaan mislukt:', result.error)
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--kleur-background)]">
      <header className="flex items-center gap-2 p-4 border-b bg-white">
        <ArrowLeft className="text-[var(--kleur-muted)]" />
        <h1 className="text-xl font-semibold text-[var(--kleur-primary)]">
          {theme?.titel || 'Gesprek'}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentIndex === -1 && (
          <div className="space-y-4">
            <p className="bg-[var(--kleur-secondary)] p-4 rounded-2xl text-sm max-w-[80%]">
              {theme?.intro_prompt || 'Welkom bij dit thema.'}
            </p>
            <button
              onClick={startGesprek}
              className="btn btn-primary px-4 py-2 rounded-full"
            >
              Start gesprek
            </button>
          </div>
        )}

        {currentIndex >= 0 && !done && (
          <div className="bg-[var(--kleur-secondary)] p-4 rounded-2xl text-sm max-w-[80%]">
            {vragen[currentIndex]?.tekst}
          </div>
        )}

        {done && (
          <div className="space-y-4">
            <p className="bg-green-100 text-green-800 p-4 rounded-xl">
              Bedankt voor je antwoorden. Je gesprek is {saved ? 'opgeslagen.' : 'klaar om op te slaan...'}
            </p>
            <pre className="bg-white p-4 rounded text-xs border">{JSON.stringify(antwoorden, null, 2)}</pre>
          </div>
        )}
      </div>

      {!done && currentIndex >= 0 && (
        <> {foutmelding && (
          <div className="bg-red-100 text-red-800 text-sm p-3 rounded-xl mb-2">{foutmelding}</div>
        )}
        <form
          onSubmit={verstuurAntwoord}
          className="p-4 border-t bg-white flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Typ je antwoord..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm"
          />
          <button type="submit" className="btn btn-primary rounded-full px-3">→</button>
        </form>
        </>)}
    </div>
  )
}

export default GesprekPagina