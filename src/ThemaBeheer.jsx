// 📁 Bestand: ThemaBeheer.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Alert from './Alert'
import React from 'react'

const tooltipData = {
  verwachte_signalen: 'Welke signalen hoop je dat dit thema zichtbaar maakt? Bijvoorbeeld: werkdruk, motivatie, betrokkenheid. Gescheiden door komma\'s.',
  titel: 'De naam van het thema zoals die getoond wordt aan werknemers en werkgevers.',
  beschrijving: 'Interne toelichting voor superadmins en werkgevers. Wordt niet getoond aan werknemers.',
  intro_prompt: 'Inleidingstekst voor werknemers. Wordt getoond vóór het invullen van de vragenlijst.',
  vragenlijst: 'JSON met de standaardvragen die in dit thema gesteld worden. Wordt automatisch bijgewerkt bij het toevoegen van vragen. Alleen ter controle.',
  vervolgvragen: 'JSON met eventuele vervolgvraaglogica. Bijvoorbeeld: toon vraag X alleen als antwoord op Y = ja.',
  gespreksdoel: 'Interne beschrijving van het doel van het AI-gesprek (bijv. evaluatie, signalering, coaching).',
  doel_vraag: 'Specifieke kernvraag die als basis dient voor de AI-samenvatting, bijvoorbeeld: "Wat wil je bespreken?"',
  toelichting: 'Uitleg voor de werknemer bij het starten van een gesprek. Wordt prominent getoond.',
  geeft_score: 'Vink aan als het AI-gesprek een score teruggeeft over bijvoorbeeld werkdruk of veerkracht.',
  geeft_samenvatting: 'Vink aan als het AI een samenvatting van het gesprek moet genereren.',
  geeft_ai_advies: 'Vink aan als de AI ook aanbevelingen mag geven (zoals coaching- of ontwikkelrichtingen).',
  ai_configuratie: 'JSON met instellingen voor de AI, zoals toon, gevoeligheid voor emoties, beperkingen.',
  ai_model: 'Model dat gebruikt wordt (standaard: GPT-4).',
  standaard_zichtbaar: 'Vink aan als dit thema standaard actief moet zijn voor nieuwe werkgevers.',
  alleen_premium: 'Vink aan als dit thema alleen beschikbaar is in het premium pakket.',
  alleen_concept: 'Alleen zichtbaar voor jou als superadmin. Gebruik dit voor testen of voorbereiding.',
  voorgesteld_als_verplicht: 'Geef aan of je dit thema aanbeveelt als verplicht onderdeel voor werknemers.',
  zichtbaar_vanaf: 'Optionele datum vanaf wanneer dit thema beschikbaar is voor werknemers.',
  zichtbaar_tot: 'Optionele datum tot wanneer het thema beschikbaar is (handig bij seizoensgebonden onderwerpen).',
  branche_labels: 'Lijst met branches waarvoor dit thema relevant is (bijv. onderwijs, zorg). Gescheiden met komma\'s.',
  doelgroep_labels: 'Lijst met doelgroepen waarvoor het thema geschikt is (bijv. leidinggevenden, starters).',
  zoeklabels: 'Zoektermen waarop het thema gevonden mag worden binnen het superadminportaal.',
  versiebeheer: 'JSON met changelog of revisiegeschiedenis van dit thema.',
  volgorde_index: 'Nummer voor sortering van het thema in de weergave. Lager = eerder in de lijst.',
  taalcode: 'De taal waarin het thema is geschreven (standaard: nl).',
  tekst: 'De vraagtekst die aan de werknemer wordt gesteld.',
  verplicht: 'Vink aan of de werknemer verplicht is deze vraag te beantwoorden.',
  type: 'Geef aan of dit een initiële of vervolg-vraag is.'
}

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
    ai_model: 'gpt-4', volgorde_index: 0, versiebeheer: '',
    verwachte_signalen: ''
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
            
            // Zorg ervoor dat we altijd een geldige JSON string hebben
            const vragenlijstJSON = JSON.stringify(vragen, null, 2)
            
            setFormData(prev => ({
              ...prev,
              ...themaData,
              vragenlijst: vragenlijstJSON,
              vervolgvragen: JSON.stringify(themaData.vervolgvragen || {}, null, 2),
              ai_configuratie: JSON.stringify(themaData.ai_configuratie || {}, null, 2),
              versiebeheer: JSON.stringify(themaData.versiebeheer || {}, null, 2),
              branche_labels: (themaData.branche_labels || []).join(', '),
              doelgroep_labels: (themaData.doelgroep_labels || []).join(', '),
              zoeklabels: (themaData.zoeklabels || []).join(', '),
              verwachte_signalen: (themaData.verwachte_signalen || []).join(', ')
            }))
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
      setFormData(prev => ({
        ...prev,
        vragenlijst: JSON.stringify(nieuweVragen, null, 2)
      }))
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

    if (nieuwThema) {
      const response = await fetch('https://groeirichting-backend.onrender.com/api/create-theme-with-questions', {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thema Beheren</h1>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      {loading ? (
        <div>Laden...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, val]) => {
            if (key === 'vragenlijst') {
              return (
                <React.Fragment key={key}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium capitalize mb-1">
                      {key.replace(/_/g, ' ')}
                      {tooltipData[key] && (
                        <span
                          title={tooltipData[key]}
                          className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                        >🛈</span>
                      )}
                    </label>
                    <textarea
                      name={key}
                      value={val || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows="4"
                      readOnly
                    />
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Vragen toevoegen</h2>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="mb-4">
                        <label className="block text-sm font-medium capitalize mb-1">
                          Vraagtekst
                          {tooltipData.tekst && (
                            <span 
                              title={tooltipData.tekst} 
                              className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                            >🛈</span>
                          )}
                        </label>
                        <input 
                          type="text" 
                          name="tekst" 
                          value={nieuweVraag.tekst} 
                          onChange={handleVraagChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium capitalize mb-1">
                          Verplicht
                          {tooltipData.verplicht && (
                            <span 
                              title={tooltipData.verplicht} 
                              className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                            >🛈</span>
                          )}
                        </label>
                        <input 
                          type="checkbox" 
                          name="verplicht" 
                          checked={nieuweVraag.verplicht} 
                          onChange={handleVraagChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium capitalize mb-1">
                          Type
                          {tooltipData.type && (
                            <span 
                              title={tooltipData.type} 
                              className="ml-2 cursor-help text-gray-400 hover:text-gray-600"
                            >🛈</span>
                          )}
                        </label>
                        <select 
                          name="type" 
                          value={nieuweVraag.type} 
                          onChange={handleVraagChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="initieel">Initieel</option>
                          <option value="vervolg">Vervolg</option>
                        </select>
                      </div>
                      <button 
                        type="button" 
                        onClick={voegVraagToe}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        + Voeg vraag toe
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )
            }
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

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Huidige vragen</h2>
            {(() => {
              try {
                const vragenlijst = typeof formData.vragenlijst === 'string' 
                  ? safeParseJSON(formData.vragenlijst) 
                  : formData.vragenlijst;
                
                if (Array.isArray(vragenlijst) && vragenlijst.length > 0) {
                  return (
                    <div className="space-y-4">
                      {vragenlijst.map((vraag, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow">
                          <p className="font-medium">{vraag.tekst}</p>
                          <p className="text-sm text-gray-600">
                            Type: {vraag.type} | Verplicht: {vraag.verplicht ? 'Ja' : 'Nee'}
                          </p>
                          <button
                            type="button"
                            onClick={() => verwijderVraag(index)}
                            className="mt-2 text-red-500 hover:text-red-700"
                          >
                            Verwijder
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }
                return <p className="text-gray-500">Nog geen vragen toegevoegd</p>;
              } catch (error) {
                console.error('Fout bij parsen vragenlijst:', error);
                return <p className="text-red-500">Fout bij laden van de vragen</p>;
              }
            })()}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/superadmin')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Opslaan
            </button>
          </div>
        </form>
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
