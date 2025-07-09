// 📁 Bestand: ThemaBeheer.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Alert from './Alert'
import React from 'react'

const tooltipData = {
  // Basis thema informatie
  titel: 'De naam van het thema zoals die getoond wordt aan werknemers en werkgevers.',
  beschrijving: 'Interne toelichting voor superadmins en werkgevers. Wordt niet getoond aan werknemers.',
  intro_prompt: 'Inleidingstekst voor werknemers. Wordt getoond vóór het invullen van de vragenlijst.',
  
  // 🎯 AI PROMPT CONFIGURATIE - Deze velden bepalen hoe de AI zich gedraagt
  gpt_doelstelling: '🎯 WORDT GEBRUIKT IN AI-PROMPT: Het specifieke doel van het AI-gesprek voor dit thema. Bijvoorbeeld: "Het doel is om werkdruk-signalen te identificeren en de medewerker te ondersteunen bij het vinden van oplossingen."',
  prompt_style: '🎯 WORDT GEBRUIKT IN AI-PROMPT: De communicatiestijl van de AI tijdens het gesprek. Vragend = veel doorvragen, Informatief = meer uitleg geven, Gemengd = balans tussen beide.',
  ai_behavior: '🎯 WORDT GEBRUIKT IN AI-PROMPT: Het gedrag en de rol van de AI. Coach = begeleidend, Informer = informatief, Facilitator = ondersteunend, Reviewer = evaluerend.',
  gpt_beperkingen: '🎯 WORDT GEBRUIKT IN AI-PROMPT: Specifieke beperkingen of richtlijnen voor de AI. Bijvoorbeeld: "Vermijd medische adviezen" of "Focus op werkgerelateerde aspecten".',
  thema_type: '🎯 WORDT GEBRUIKT IN AI-PROMPT: Het type thema dat de AI helpt bepalen hoe het gesprek gevoerd moet worden. Coachend = ontwikkeling, Informatief = kennisoverdracht, Toetsend = evaluatie, Open = verkennend.',

  
  // Vragen en gesprekslogica
  gebruik_gpt_vragen: 'Vink aan als je in dit thema GPT-vervolgvragen wilt gebruiken in plaats van handmatig ingestelde vervolgvragen.',
  
  // AI output configuratie
  geeft_score: 'Vink aan als het AI-gesprek een score teruggeeft over bijvoorbeeld werkdruk of veerkracht.',
  geeft_samenvatting: 'Vink aan als het AI een samenvatting van het gesprek moet genereren.',
  geeft_ai_advies: 'Vink aan als de AI ook aanbevelingen mag geven (zoals coaching- of ontwikkelrichtingen).',
  ai_model: 'Model dat gebruikt wordt (standaard: GPT-4).',
  
  // Thema zichtbaarheid en toegang
  standaard_zichtbaar: 'Vink aan als dit thema standaard actief moet zijn voor nieuwe werkgevers.',
  alleen_premium: 'Vink aan als dit thema alleen beschikbaar is in het premium pakket.',
  alleen_concept: 'Alleen zichtbaar voor jou als superadmin. Gebruik dit voor testen of voorbereiding.',
  voorgesteld_als_verplicht: 'Geef aan of je dit thema aanbeveelt als verplicht onderdeel voor werknemers.',
  klaar_voor_gebruik: 'Vink aan als dit thema klaar is voor gebruik door werknemers.',
  
  // Tijdsgebonden instellingen
  zichtbaar_vanaf: 'Optionele datum vanaf wanneer dit thema beschikbaar is voor werknemers.',
  zichtbaar_tot: 'Optionele datum tot wanneer het thema beschikbaar is (handig bij seizoensgebonden onderwerpen).',
  
  // Categorisering
  branche_labels: 'Lijst met branches waarvoor dit thema relevant is (bijv. onderwijs, zorg). Gescheiden met komma\'s.',
  doelgroep_labels: 'Lijst met doelgroepen waarvoor het thema geschikt is (bijv. leidinggevenden, starters).',
  zoeklabels: 'Zoektermen waarop het thema gevonden mag worden binnen het superadminportaal.',
  verwachte_signalen: 'Welke signalen hoop je dat dit thema zichtbaar maakt? Bijvoorbeeld: werkdruk, motivatie, betrokkenheid. Gescheiden door komma\'s.',
  
  // Technische instellingen
  versiebeheer: 'JSON met changelog of revisiegeschiedenis van dit thema.',
  volgorde_index: 'Nummer voor sortering van het thema in de weergave. Lager = eerder in de lijst.',
  taalcode: 'De taal waarin het thema is geschreven (standaard: nl).',
  
  // Vraag-specifieke velden
  tekst: 'De vraagtekst die aan de werknemer wordt gesteld.',
  vervolgvragen: 'JSON met eventuele vervolgvraaglogica. Bijvoorbeeld: toon vraag X alleen als antwoord op Y = ja.',
  toelichting: 'Uitleg voor de werknemer bij het starten van een gesprek. Wordt prominent getoond.'
}

function ThemaBeheer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const nieuwThema = id === 'nieuw'
  const [formData, setFormData] = useState({
    gebruik_gpt_vragen: false,
    titel: '', beschrijving: '', klaar_voor_gebruik: false,
    voorgesteld_als_verplicht: false, standaard_zichtbaar: true,
    alleen_premium: false, alleen_concept: false, intro_prompt: '',

    geeft_score: true, geeft_samenvatting: true, geeft_ai_advies: true,
    branche_labels: '', doelgroep_labels: '',
    zichtbaar_vanaf: '', zichtbaar_tot: '', zoeklabels: '', taalcode: 'nl',
    ai_model: 'gpt-4', volgorde_index: 0, versiebeheer: '',
    verwachte_signalen: '',
    vraag_1: '', vraag_1_doel: '',
    vraag_2: '', vraag_2_doel: '',
    vraag_3: '', vraag_3_doel: '',
    vraag_4: '', vraag_4_doel: '',
    vraag_5: '', vraag_5_doel: '',
    ai_behavior: '', prompt_style: '', thema_type: '', gpt_doelstelling: '', gpt_beperkingen: '',
  })
  const [vragen, setVragen] = useState([])
  const [nieuweVraag, setNieuweVraag] = useState({ tekst: '', taalcode: 'nl' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [scoreInstructies, setScoreInstructies] = useState({
    score_instructie: '',
    ...Object.fromEntries(Array.from({length: 10}, (_, i) => [`score_bepalen_${i+1}`, '']))
  });
  const [scoreInstructiesError, setScoreInstructiesError] = useState('');

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

          const { data: loadedVragen, error: vragenError } = await supabase
            .from('theme_questions')
            .select('*')
            .eq('theme_id', id)
            .order('volgorde_index')

          if (vragenError) {
            console.error('Fout bij ophalen vragen:', vragenError)
            setError('Kan vragen niet ophalen')
          } else {
            const vragen = loadedVragen || []
            setVragen(vragen)
            
            // Vul de formData met de geladen vragen en doelvragen
            const formDataMetVragen = {
              ...themaData,
              versiebeheer: JSON.stringify(themaData.versiebeheer || {}, null, 2),
              branche_labels: (themaData.branche_labels || []).join(', '),
              doelgroep_labels: (themaData.doelgroep_labels || []).join(', '),
              zoeklabels: (themaData.zoeklabels || []).join(', '),
              verwachte_signalen: (themaData.verwachte_signalen || []).join(', ')
            }
            
            // Vul de vraag velden in formData
            vragen.forEach((vraag, index) => {
              const vraagNr = index + 1
              formDataMetVragen[`vraag_${vraagNr}`] = vraag.tekst || ''
              formDataMetVragen[`vraag_${vraagNr}_doel`] = vraag.doel_vraag || ''
            })
            
            setFormData(formDataMetVragen)
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
      if (vragen.length >= 5) {
        setError('Je kunt maximaal 5 vragen toevoegen.')
        return
      }
      const nieuweVragen = [...vragen, nieuweVraag]
      setVragen(nieuweVragen)
      setNieuweVraag({ tekst: '', taalcode: 'nl' })
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
    setSaving(true)
    try {
      const payload = {
        ...formData,
        versiebeheer: safeParseJSON(formData.versiebeheer),
        branche_labels: splitList(formData.branche_labels),
        doelgroep_labels: splitList(formData.doelgroep_labels),
        zoeklabels: splitList(formData.zoeklabels),
        verwachte_signalen: splitList(formData.verwachte_signalen)
      }

      // Foutafhandeling: voorkom crash op zichtbaar_* velden
      ;['zichtbaar_vanaf', 'zichtbaar_tot'].forEach((field) => {
        if (payload[field] === '') payload[field] = null
        if (Array.isArray(payload[field])) {
          console.warn(`⚠️ ${field} is per ongeluk een array:`, payload[field])
          payload[field] = payload[field][0] || null
        }
      })

      // Bereid de vragen voor met hun doelvragen
      const vragenMetDoel = [1,2,3,4,5].map((nr) => ({
        tekst: formData[`vraag_${nr}`],
        doel_vraag: formData[`vraag_${nr}_doel`]
      })).filter(vraag => vraag.tekst.trim() !== ''); // Alleen vragen met tekst meesturen

      // Valideer scoreInstructies
      const emptyScoreField = Object.values(scoreInstructies).some(v => !v || v.trim() === '');
      if (emptyScoreField) {
        setScoreInstructiesError('Vul alle velden in bij Promptinstellingen genereer-samenvatting.');
        setSaving(false);
        return;
      } else {
        setScoreInstructiesError('');
      }

      // Voeg toe aan payload
      payload.score_instructies = {...scoreInstructies};

      if (nieuwThema) {
        const response = await fetch('https://groeirichting-backend.onrender.com/api/create-theme-with-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thema: payload, vragen: vragenMetDoel })
        })
        const result = await response.json()
        if (!response.ok) return setError(result.error || 'Opslaan mislukt')
        setSuccess('Thema en vragen opgeslagen')
        navigate('/superadmin-portaal')
      } else {
        const response = await fetch('https://groeirichting-backend.onrender.com/api/create-theme-with-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thema: { ...payload, id }, vragen: vragenMetDoel })
        });
        const result = await response.json();
        if (!response.ok) return setError(result.error || 'Opslaan mislukt');
        setSuccess('Thema en vragen bijgewerkt');
        navigate('/superadmin-portaal');
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thema Beheren</h1>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      {loading ? (
        <div>Laden...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 📝 BASIS THEMA INFORMATIE */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">📝 Basis Thema Informatie</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Links: Titel, Beschrijving, Intro Prompt */}
              <div className="lg:col-span-2 space-y-4">
                {['titel', 'beschrijving', 'intro_prompt'].map(key => (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium capitalize mb-1">
                      {key.replace(/_/g, ' ')}
                      {tooltipData[key] && (
                        <span
                          title={tooltipData[key]}
                          className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                        >🛈</span>
                      )}
                    </label>
                    {key === 'beschrijving' ? (
                      <textarea
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Rechts: Checkbox velden */}
              <div className="space-y-3 pl-4">
                {['gebruik_gpt_vragen', 'klaar_voor_gebruik', 'voorgesteld_als_verplicht', 'standaard_zichtbaar', 'alleen_premium', 'alleen_concept'].map(key => (
                  <div key={key} className="flex items-center">
                    <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name={key} 
                        checked={formData[key]} 
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      {tooltipData[key] ? (
                        <span
                          title={tooltipData[key]}
                          className="flex items-center"
                        >
                          {key.replace(/_/g, ' ')}
                          <span className="ml-1 cursor-help text-gray-400 hover:text-gray-600">🛈</span>
                        </span>
                      ) : (
                        key.replace(/_/g, ' ')
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🎯 AI PROMPT CONFIGURATIE */}
          <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold mb-4 text-orange-800">🎯 AI Prompt Configuratie</h2>
            <p className="text-sm text-orange-700 mb-4">Deze velden bepalen hoe de AI zich gedraagt tijdens het gesprek</p>
            
            {/* Prompt overzicht */}
            <div className="bg-orange-100 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-orange-800 mb-2">📋 Hoe worden deze velden gebruikt?</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>GPT Doelstelling:</strong> Wordt gebruikt als "Doel van het gesprek" in de AI-prompt</p>
                <p><strong>Prompt Stijl:</strong> Bepaalt de communicatiestijl (vragend/informatief/gemengd)</p>
                <p><strong>AI Gedrag:</strong> Definieert de rol van de AI (coach/informer/facilitator/reviewer)</p>
                <p><strong>GPT Beperkingen:</strong> Specifieke richtlijnen voor wat de AI wel/niet mag doen</p>
                <p><strong>Thema Type:</strong> Helpt de AI begrijpen wat voor soort gesprek het is</p>
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-orange-800">🔍 Voorbeeld van hoe de AI-prompt eruit ziet</summary>
                <div className="mt-2 p-3 bg-white rounded border text-xs font-mono text-gray-700">
                  <p>Je bent een AI-coach binnen een HR-tool. Je begeleidt medewerkers in reflectieve gesprekken over het thema: "[titel]".</p>
                  <br/>
                  <p>Doel van het gesprek: [gpt_doelstelling]</p>
                  <p>Gedrag en stijl: Hanteer de volgende stijl: [prompt_style]. Jouw gedrag als AI: [ai_behavior].</p>
                  <p>Beperkingen: [gpt_beperkingen]</p>
                  <p>Organisatiecontext: Deze gesprekken zijn bedoeld om medewerkers te ondersteunen, signalen op te halen en werkplezier te verhogen.</p>
                </div>
              </details>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* gpt_doelstelling */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  GPT Doelstelling
                  {tooltipData.gpt_doelstelling && (
                    <span
                      title={tooltipData.gpt_doelstelling}
                      className="ml-2 cursor-help text-orange-600 hover:text-orange-800"
                    >🛈</span>
                  )}
                </label>
                <textarea
                  name="gpt_doelstelling"
                  value={formData.gpt_doelstelling || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Bijvoorbeeld: Het doel is om werkdruk-signalen te identificeren en de medewerker te ondersteunen bij het vinden van oplossingen."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* gpt_beperkingen */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  GPT Beperkingen
                  {tooltipData.gpt_beperkingen && (
                    <span
                      title={tooltipData.gpt_beperkingen}
                      className="ml-2 cursor-help text-orange-600 hover:text-orange-800"
                    >🛈</span>
                  )}
                </label>
                <textarea
                  name="gpt_beperkingen"
                  value={formData.gpt_beperkingen || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Bijvoorbeeld: Vermijd medische adviezen, focus op werkgerelateerde aspecten"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* prompt_style */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Prompt Stijl
                  {tooltipData.prompt_style && (
                    <span
                      title={tooltipData.prompt_style}
                      className="ml-2 cursor-help text-orange-600 hover:text-orange-800"
                    >🛈</span>
                  )}
                </label>
                <select
                  name="prompt_style"
                  value={formData.prompt_style || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">-- Kies een optie --</option>
                  <option value="vragend">Vragend (veel doorvragen)</option>
                  <option value="informatief">Informatief (meer uitleg geven)</option>
                  <option value="gemengd">Gemengd (balans tussen beide)</option>
                </select>
              </div>

              {/* ai_behavior */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  AI Gedrag
                  {tooltipData.ai_behavior && (
                    <span
                      title={tooltipData.ai_behavior}
                      className="ml-2 cursor-help text-orange-600 hover:text-orange-800"
                    >🛈</span>
                  )}
                </label>
                <select
                  name="ai_behavior"
                  value={formData.ai_behavior || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">-- Kies een optie --</option>
                  <option value="coach">Coach (begeleidend)</option>
                  <option value="informer">Informer (informatief)</option>
                  <option value="facilitator">Facilitator (ondersteunend)</option>
                  <option value="reviewer">Reviewer (evaluerend)</option>
                </select>
              </div>

              {/* thema_type */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Thema Type
                  {tooltipData.thema_type && (
                    <span
                      title={tooltipData.thema_type}
                      className="ml-2 cursor-help text-orange-600 hover:text-orange-800"
                    >🛈</span>
                  )}
                </label>
                <select
                  name="thema_type"
                  value={formData.thema_type || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">-- Kies een optie --</option>
                  <option value="coachend">Coachend (ontwikkeling)</option>
                  <option value="informatief">Informatief (kennisoverdracht)</option>
                  <option value="toetsend">Toetsend (evaluatie)</option>
                  <option value="open">Open (verkennend)</option>
                </select>
              </div>
            </div>


          </div>

          {/* ⚙️ AI OUTPUT CONFIGURATIE */}
          <div className="bg-green-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-green-800">⚙️ AI Output Configuratie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['geeft_score', 'geeft_samenvatting', 'geeft_ai_advies'].map(key => (
                <div key={key} className="mb-4">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name={key} 
                      checked={formData[key]} 
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium capitalize">
                      {key.replace(/_/g, ' ')}
                      {tooltipData[key] && (
                        <span
                          title={tooltipData[key]}
                          className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                        >🛈</span>
                      )}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* ❓ VRAGEN */}
          <div className="bg-purple-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">❓ Vragen (max 5)</h2>
            {[1,2,3,4,5].map((nr) => (
              <div key={nr} className="bg-white p-4 rounded-xl mb-4 border border-purple-200">
                <label className="block text-sm font-medium mb-1">
                  Vraag {nr}
                </label>
                <input
                  type="text"
                  name={`vraag_${nr}`}
                  value={formData[`vraag_${nr}`]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder={`Vraag ${nr}`}
                />
                <label className="block text-sm font-medium mt-2 mb-1">
                  Doel van vraag {nr}
                </label>
                <input
                  type="text"
                  name={`vraag_${nr}_doel`}
                  value={formData[`vraag_${nr}_doel`]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder={`Wat is het doel van vraag ${nr}?`}
                />


              </div>
            ))}
          </div>

          {/* 🔧 OVERIGE INSTELLINGEN */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🔧 Overige Instellingen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, val]) => {
                if (key.startsWith('vraag_')) return null;
                if (['titel', 'beschrijving', 'intro_prompt', 'gpt_doelstelling', 'prompt_style', 'ai_behavior', 'gpt_beperkingen', 'thema_type', 'geeft_score', 'geeft_samenvatting', 'geeft_ai_advies', 'ai_configuratie', 'doel_vraag', 'gebruik_gpt_vragen', 'klaar_voor_gebruik', 'voorgesteld_als_verplicht', 'standaard_zichtbaar', 'alleen_premium', 'alleen_concept'].includes(key)) return null;
                
                return (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium capitalize mb-1">
                      {key.replace(/_/g, ' ')}
                      {tooltipData[key] && (
                        <span
                          title={tooltipData[key]}
                          className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                        >🛈</span>
                      )}
                    </label>
                    {typeof val === 'boolean' ? (
                      <input 
                        type="checkbox" 
                        name={key} 
                        checked={val} 
                        onChange={handleChange}
                        className="mt-1"
                      />
                    ) : (
                      <input
                        type={key.includes('datum') ? 'date' : 'text'}
                        name={key}
                        value={val || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Promptinstellingen genereer-samenvatting */}
          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-400 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Promptinstellingen genereer-samenvatting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium mb-1">Score instructie (signalen) <span className="text-red-500">*</span></label>
                <textarea name="score_instructie" value={scoreInstructies.score_instructie} onChange={e => setScoreInstructies(s => ({...s, score_instructie: e.target.value}))} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" required />
              </div>
              {Array.from({length: 10}, (_, i) => (
                <div className="mb-4" key={i}>
                  <label className="block text-sm font-medium mb-1">Score bepalen {i+1} <span className="text-red-500">*</span></label>
                  <input type="text" name={`score_bepalen_${i+1}`} value={scoreInstructies[`score_bepalen_${i+1}`]} onChange={e => setScoreInstructies(s => ({...s, [`score_bepalen_${i+1}`]: e.target.value}))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" required />
                </div>
              ))}
            </div>
            {scoreInstructiesError && <div className="text-red-600 text-sm mt-2">{scoreInstructiesError}</div>}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/superadmin')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={saving}
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Bezig met opslaan...' : 'Opslaan'}
            </button>
          </div>
        </form>
      )}
      {saving && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)]"></div>
          <span className="ml-4 text-blue-700">Bezig met opslaan...</span>
        </div>
      )}
    </div>
  )
}

function safeParseJSON(str) {
  if (!str) return {}
  try {
    const parsed = JSON.parse(str)
    return parsed || {}
  } catch (error) {
    console.warn('JSON parse error:', error)
    return {}
  }
}

function splitList(str) {
  if (!str) return []
  return str.split(',').map((s) => s.trim()).filter(Boolean)
}

export default ThemaBeheer
