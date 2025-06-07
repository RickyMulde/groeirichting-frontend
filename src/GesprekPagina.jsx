import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from './supabaseClient'
import { containsSensitiveInfo } from './utils/filterInput';

function GesprekPagina() {
  const [params] = useSearchParams()
  const themeId = params.get('theme_id')
  const navigate = useNavigate();

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
  const [gesprekId, setGesprekId] = useState(null)

  useEffect(() => {
    const fetchThema = async () => {
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel, intro_prompt, doel_vraag')
        .eq('id', themeId)
        .single()

      if (!error && data) {
        setTheme(data)
        const { data: vragenData, error: vragenError } = await supabase
          .from('theme_questions')
          .select('*')
          .eq('theme_id', themeId)
          .order('volgorde_index');
        if (!vragenError) {
          setVragen(vragenData || []);
        } else {
          setVragen([]);
        }
      } else {
        console.error('Fout bij ophalen thema:', error)
      }
    }

    if (themeId) fetchThema()
  }, [themeId])

  const slaGesprekOp = async (theme_question_id, antwoord) => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employee_id: user.id,
        theme_id: themeId,
        theme_question_id: theme_question_id,
        antwoord: antwoord,
        status: 'Nog niet afgerond'
      })
    })

    const result = await response.json()
    if (!response.ok) {
      console.error('Opslaan mislukt:', result.error)
    }
  }

  const verstuurAntwoord = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const check = containsSensitiveInfo(input)
    if (check.flagged) {
      setFoutmelding(check.reason)
      return
    }

    const huidigeVraag = vragen[currentIndex]
    const nieuweAntwoorden = [...antwoorden, { vraag: huidigeVraag?.tekst, antwoord: input }]
    setAntwoorden(nieuweAntwoorden)
    setInput('')
    setFoutmelding(null)

    // Direct het antwoord opslaan
    await slaGesprekOp(huidigeVraag.id, input)

    if (currentIndex + 1 >= vragen.length) {
      // Bij het laatste antwoord, markeer het gesprek als afgerond
      await updateGesprekStatus('Afgerond')
      setDone(true)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const updateGesprekStatus = async (status) => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employee_id: user.id,
        theme_id: themeId,
        status: status
      })
    })

    const result = await response.json()
    if (!response.ok) {
      console.error('Status update mislukt:', result.error)
    }
  }

  // Voeg een cleanup functie toe voor als de gebruiker de pagina verlaat
  useEffect(() => {
    return () => {
      if (currentIndex > 0 && !done) {
        updateGesprekStatus('Nog niet afgerond')
      }
    }
  }, [currentIndex, done])

  const startGesprek = async () => {
    setCurrentIndex(0)
    await updateGesprekStatus('Nog niet gestart')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--kleur-background)]">
      <div
        className="w-full h-full fixed inset-0 md:static md:w-[500px] md:h-[90vh] md:max-w-xl md:max-h-[90vh] md:rounded-3xl md:shadow-2xl md:bg-white flex flex-col"
      >
        <header className="flex items-center gap-2 p-2 border-b bg-white md:rounded-t-3xl md:min-h-[56px]">
          <button onClick={() => navigate('/thema-overzicht')} className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <ArrowLeft className="text-[var(--kleur-muted)]" />
          </button>
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
                Bedankt voor je antwoorden. Je gesprek is opgeslagen. Hieronder komt de samenvatting + cijfer + anoniem of niet naar werkgever. 
              </p>
              <pre className="bg-white p-4 rounded text-xs border">{JSON.stringify(antwoorden, null, 2)}</pre>
            </div>
          )}
        </div>

        {!done && currentIndex >= 0 && (
          <>
            {foutmelding && (
              <div className="mb-2 flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{foutmelding}</span>
              </div>
            )}
            <form
              onSubmit={verstuurAntwoord}
              className="p-4 border-t bg-white flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Typ je antwoord..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (foutmelding) setFoutmelding(null);
                }}
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm"
              />
              <button type="submit" className="btn btn-primary rounded-full px-3">→</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default GesprekPagina