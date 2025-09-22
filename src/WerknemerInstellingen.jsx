import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, Save, Eye, EyeOff } from 'lucide-react'
import { supabase } from './supabaseClient'
import Alert from './Alert'

function WerknemerInstellingen() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    birthdate: '',
    gender: ''
  })
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [foutmelding, setFoutmelding] = useState('')
  const [succesmelding, setSuccesmelding] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      console.log('🔄 Werknemer instellingen: Ophalen gebruikersdata...')
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('❌ Geen gebruiker gevonden, redirect naar login')
        navigate('/login')
        return
      }
      console.log('✅ Gebruiker gevonden:', user.email)

      console.log('🔄 Ophalen gebruikersgegevens uit database...')
      const { data, error } = await supabase
        .from('users')
        .select('email, first_name, middle_name, last_name, birthdate, gender')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('❌ Fout bij ophalen gebruikersgegevens:', error)
        setFoutmelding(`Fout bij ophalen gegevens: ${error.message}`)
        return
      }

      console.log('✅ Gebruikersgegevens opgehaald:', data)
      setUserData(data)
    } catch (error) {
      console.error('❌ Onverwachte fout bij ophalen data:', error)
      setFoutmelding(`Er is een fout opgetreden: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFoutmelding('')
    setSuccesmelding('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setFoutmelding('Gebruiker niet ingelogd')
        setSaving(false)
        return
      }

      // Controleer of email is gewijzigd
      const emailChanged = userData.email !== user.email
      
      // Controleer of wachtwoord is ingevuld
      const passwordChanged = newPassword && confirmPassword

      if (passwordChanged && newPassword !== confirmPassword) {
        setFoutmelding('Wachtwoorden komen niet overeen')
        setSaving(false)
        return
      }

      // Update gebruikersgegevens
      const { error: updateError } = await supabase
        .from('users')
        .update({
          email: userData.email,
          first_name: userData.first_name,
          middle_name: userData.middle_name,
          last_name: userData.last_name,
          birthdate: userData.birthdate,
          gender: userData.gender
        })
        .eq('id', user.id)

      if (updateError) {
        console.error('❌ Fout bij opslaan gegevens:', updateError)
        setFoutmelding(`Fout bij opslaan gegevens: ${updateError.message}`)
        setSaving(false)
        return
      }

      // Update wachtwoord indien gewijzigd
      if (passwordChanged) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword
        })

        if (passwordError) {
          console.error('❌ Fout bij wijzigen wachtwoord:', passwordError)
          setFoutmelding(`Fout bij wijzigen wachtwoord: ${passwordError.message}`)
          setSaving(false)
          return
        }
      }

      // Update email indien gewijzigd
      if (emailChanged) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: userData.email
        })

        if (emailError) {
          console.error('❌ Fout bij wijzigen emailadres:', emailError)
          setFoutmelding(`Fout bij wijzigen emailadres: ${emailError.message}`)
          setSaving(false)
          return
        }
      }

      // Toon melding over verificatie indien email of wachtwoord is gewijzigd
      if (emailChanged || passwordChanged) {
        setSuccesmelding('Gegevens opgeslagen! Je account moet opnieuw geverifieerd worden.')
      } else {
        setSuccesmelding('Gegevens succesvol opgeslagen!')
      }

      // Reset wachtwoord velden
      setNewPassword('')
      setConfirmPassword('')

      setTimeout(() => setSuccesmelding(''), 5000)

    } catch (error) {
      console.error('❌ Fout bij opslaan:', error)
      setFoutmelding(`Er is een fout opgetreden bij het opslaan: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Laden...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Alert type="success" message={succesmelding} onClose={() => setSuccesmelding('')} />
      <Alert type="error" message={foutmelding} onClose={() => setFoutmelding('')} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/werknemer-portaal')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar portaal
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Instellingen</h1>
                <p className="text-gray-600 text-sm sm:text-base">Beheer hier je persoonlijke gegevens en account-instellingen.</p>
              </div>
            </div>
            <Settings className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>

        {/* Instellingen formulier */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Persoonlijke gegevens</h2>
          
          <div className="space-y-6">
            {/* Persoonlijke gegevens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
                <input 
                  type="email"
                  value={userData.email} 
                  onChange={e => setUserData({ ...userData, email: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Wijziging vereist opnieuw verificatie</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voornaam *</label>
                <input 
                  value={userData.first_name} 
                  onChange={e => setUserData({ ...userData, first_name: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tussenvoegsel</label>
                <input 
                  value={userData.middle_name || ''} 
                  onChange={e => setUserData({ ...userData, middle_name: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achternaam *</label>
                <input 
                  value={userData.last_name} 
                  onChange={e => setUserData({ ...userData, last_name: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Geboortedatum</label>
                <input 
                  type="date" 
                  value={userData.birthdate || ''} 
                  onChange={e => setUserData({ ...userData, birthdate: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Geslacht</label>
                <select 
                  value={userData.gender || ''} 
                  onChange={e => setUserData({ ...userData, gender: e.target.value })} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecteer geslacht</option>
                  <option value="man">Man</option>
                  <option value="vrouw">Vrouw</option>
                  <option value="anders">Anders</option>
                </select>
              </div>
            </div>

            {/* Wachtwoord wijzigen */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Wachtwoord wijzigen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nieuw wachtwoord</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="Laat leeg om niet te wijzigen"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Wijziging vereist opnieuw verificatie</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bevestig nieuw wachtwoord</label>
                  <input 
                    type="password"
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Herhaal nieuw wachtwoord"
                  />
                </div>
              </div>
            </div>

            {/* Opslaan knop */}
            <div className="flex justify-end pt-6 border-t">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="btn btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Opslaan...' : 'Opslaan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WerknemerInstellingen 