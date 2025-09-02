import { useState } from 'react'
import { CheckCircle, Mail, Phone, Users, MessageSquare } from 'lucide-react'

function Offerte() {
  const [formData, setFormData] = useState({
    naam: '',
    bedrijfsnaam: '',
    email: '',
    telefoon: '',
    aantalMedewerkers: '',
    opmerkingen: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuleer API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Offerte aanvraag ontvangen!</h2>
          <p className="text-green-700 mb-6">
            Je ontvangt binnen 24 uur een persoonlijk voorstel van ons team.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="btn btn-primary"
          >
            Nieuwe aanvraag
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
          Vraag een offerte aan
        </h1>
        <p className="text-xl text-[var(--kleur-muted)] max-w-2xl mx-auto">
          Ontvang binnen 24 uur een persoonlijk voorstel dat aansluit bij jouw organisatie.
        </p>
      </div>

      {/* ROI-prikkel */}
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
        <h2 className="text-xl font-semibold text-red-800 mb-3">
          Verloop en verzuim zijn kostbaar
        </h2>
        <p className="text-red-700 text-lg">
          Het vertrek van je beste medewerker of uitval van je hardste werker kan je bedrijf duizenden euro's kosten. GroeiRichting helpt je die risico's tijdig te signaleren en voorkomen.
        </p>
      </div>

      {/* Formulier */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Naam */}
            <div>
              <label htmlFor="naam" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
                Naam *
              </label>
              <input
                type="text"
                id="naam"
                name="naam"
                value={formData.naam}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
                placeholder="Jouw volledige naam"
              />
            </div>

            {/* Bedrijfsnaam */}
            <div>
              <label htmlFor="bedrijfsnaam" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
                Bedrijfsnaam *
              </label>
              <input
                type="text"
                id="bedrijfsnaam"
                name="bedrijfsnaam"
                value={formData.bedrijfsnaam}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
                placeholder="Naam van je organisatie"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* E-mailadres */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                E-mailadres *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
                placeholder="jouw@email.nl"
              />
            </div>

            {/* Telefoonnummer */}
            <div>
              <label htmlFor="telefoon" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefoonnummer
              </label>
              <input
                type="tel"
                id="telefoon"
                name="telefoon"
                value={formData.telefoon}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
                placeholder="06-12345678"
              />
            </div>
          </div>

          {/* Aantal medewerkers */}
          <div>
            <label htmlFor="aantalMedewerkers" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Aantal medewerkers *
            </label>
            <input
              type="number"
              id="aantalMedewerkers"
              name="aantalMedewerkers"
              value={formData.aantalMedewerkers}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
              placeholder="Bijv. 25"
            />
          </div>

          {/* Vragen of Opmerkingen */}
          <div>
            <label htmlFor="opmerkingen" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Vragen of Opmerkingen
            </label>
            <textarea
              id="opmerkingen"
              name="opmerkingen"
              value={formData.opmerkingen}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Vertel ons meer over je organisatie, specifieke wensen of vragen..."
            />
          </div>

          {/* CTA Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Bezig met versturen...' : 'Ontvang mijn offerte'}
            </button>
          </div>
        </form>
      </div>

      {/* Afsluitzin */}
      <div className="text-center py-6">
        <p className="text-lg text-[var(--kleur-muted)]">
          Je ontvangt binnen 24 uur een persoonlijk voorstel van ons team.
        </p>
      </div>
    </div>
  )
}

export default Offerte
