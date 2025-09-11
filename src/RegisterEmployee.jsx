import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from './supabaseClient'

function RegisterEmployee() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [tokenOngeldig, setTokenOngeldig] = useState(false)

  const [email, setEmail] = useState('')
  const [bedrijf, setBedrijf] = useState('')

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')

  const [wachtwoord, setWachtwoord] = useState('')
  const [bevestiging, setBevestiging] = useState('')
  const [toestemmingAvg, setToestemmingAvg] = useState(false)

  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')
  const [toontToestemmingModal, setToontToestemmingModal] = useState(false)

  useEffect(() => {
    const fetchInvitation = async () => {
      const { data, error } = await supabase
        .from('invitations')
        .select('email, employer_id, status')
        .eq('token', token)
        .single()

      if (error || !data || data.status !== 'pending') {
        setTokenOngeldig(true)
      } else {
        setEmail(data.email)
        setBedrijf(data.employer_id)
      }

      setLoading(false)
    }

    if (token) {
      fetchInvitation()
    } else {
      setTokenOngeldig(true)
      setLoading(false)
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFoutmelding('')
    setSuccesmelding('')

    if (!firstName || !lastName || !birthdate || !gender) {
      setFoutmelding('Vul alle verplichte velden in.')
      return
    }

    if (wachtwoord.length < 8) {
      setFoutmelding('Wachtwoord moet minimaal 8 tekens zijn.')
      return
    }

    if (wachtwoord !== bevestiging) {
      setFoutmelding('Wachtwoorden komen niet overeen.')
      return
    }

    if (!toestemmingAvg) {
      setToontToestemmingModal(true)
      return
    }

    // Geen Authorization header voor registratie - gebruiker is nog niet ingelogd
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register-employee`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        birthdate,
        gender,
        password: wachtwoord,
        toestemming_avg: toestemmingAvg
      })
    })

    const result = await response.json()

    if (!response.ok) {
      setFoutmelding(result.error || 'Registratie mislukt')
    } else {
      // Probeer automatisch in te loggen
      const loginResult = await supabase.auth.signInWithPassword({
        email: email,
        password: wachtwoord
      })

      if (loginResult.error) {
        setFoutmelding('Registratie gelukt, maar automatisch inloggen mislukt: ' + loginResult.error.message)
        return
      }

      setSuccesmelding('Je account is succesvol geregistreerd! Je wordt nu doorgestuurd naar je portaal...')
      setTimeout(() => {
        window.location.href = '/werknemer-portaal'
      }, 2000)
    }
  }

  if (loading) return <p>Token wordt gecontroleerd...</p>
  if (tokenOngeldig) return <p className="text-red-600">Deze uitnodiging is niet geldig of is verlopen.</p>

  return (
    <div className="page-container max-w-xl space-y-8">
      <section>
        <h1 className="text-2xl font-semibold mb-2">Account aanmaken</h1>
        <p className="text-kleur-muted">Vul je gegevens in om je account te activeren.</p>
      </section>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-xl space-y-4">
        <input type="text" value={bedrijf} disabled className="bg-gray-100" />
        <input type="email" value={email} disabled className="bg-gray-100" />
        <input type="text" placeholder="Voornaam" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Tussenvoegsel (optioneel)" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        <input type="text" placeholder="Achternaam" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="date" placeholder="Geboortedatum" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
        <select value={gender} onChange={(e) => setGender(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Selecteer geslacht *</option>
          <option value="man">Man</option>
          <option value="vrouw">Vrouw</option>
          <option value="niet-binair">Niet-binair</option>
          <option value="liever-niet-zeggen">Liever niet zeggen</option>
        </select>
        <input type="password" placeholder="Wachtwoord" value={wachtwoord} onChange={(e) => setWachtwoord(e.target.value)} required />
        <input type="password" placeholder="Bevestig wachtwoord" value={bevestiging} onChange={(e) => setBevestiging(e.target.value)} required />
        
        {/* Toestemming verwerking antwoorden */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-blue-900">Toestemming verwerking antwoorden</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>Voor deze gesprekken vragen wij je expliciet toestemming om jouw antwoorden te verwerken. Dit kan ook informatie bevatten over je werkdruk of welzijn.</p>
            <p>• Deelname is vrijwillig.</p>
            <p>• Je antwoorden worden niet gebruikt voor beoordeling of personeelsdossiers.</p>
            <p>• De inzichten worden anoniem samengevat voor jouw werkgever.</p>
            <p><strong>Belangrijk:</strong> jouw antwoorden worden verwerkt door een AI-systeem (Microsoft Azure OpenAI). Hierbij sturen wij geen persoonsgegevens (zoals naam, e-mail of medewerker-ID) mee. De AI ziet alleen je tekst en kan deze niet aan jou koppelen.</p>
          </div>
          <label className="flex items-start space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={toestemmingAvg} 
              onChange={(e) => setToestemmingAvg(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-blue-900 font-medium">Ik geef toestemming voor verwerking van mijn antwoorden.</span>
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary w-full">Account aanmaken</button>

        {foutmelding && <p className="mt-2 text-red-600">{foutmelding}</p>}
        {succesmelding && <p className="mt-2 text-green-600">{succesmelding}</p>}
      </form>

      {/* Toestemming Modal */}
      {toontToestemmingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Toestemming niet gegeven</h3>
              <div className="text-sm text-gray-700 space-y-3 mb-6">
                <p>Je hebt geen toestemming gegeven om je antwoorden te verwerken. Zonder toestemming kun je niet deelnemen aan de gesprekken van GroeiRichting.</p>
                <p>Deelname is vrijwillig en heeft geen gevolgen voor je dienstverband.</p>
                <p>Meer weten over wat we verwerken? <a href="/privacy-veiligheid" className="text-blue-600 hover:underline">Bekijk onze privacyverklaring</a>.</p>
              </div>
              <button 
                onClick={() => setToontToestemmingModal(false)}
                className="btn btn-primary w-full"
              >
                Begrepen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterEmployee
