import { useState } from 'react'
import { CheckCircle, Mail, Phone, Users, MessageSquare } from 'lucide-react'
import SEOHead from './components/SEOHead'

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
      <>
        <SEOHead 
          title="Offerte ontvangen - GroeiRichting"
          description="Je offerte aanvraag is ontvangen. Je ontvangt binnen 24 uur een persoonlijk voorstel."
          canonical="https://groeirichting.nl/offerte"
        />
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
      </>
    )
  }

  return (
    <>
      <SEOHead 
        title="Offerte aanvragen - Vraag een offerte aan voor GroeiRichting"
        description="Ontvang binnen 24 uur een persoonlijk voorstel dat aansluit bij jouw organisatie. Vraag nu een offerte aan voor GroeiRichting."
        keywords="offerte groeirichting, prijs, tarieven, kosten, aanvraag offerte"
        canonical="https://groeirichting.nl/offerte"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "serviceType": "AI-gestuurde gespreksplatform voor medewerkerstevredenheid",
              "provider": {
                "@type": "Organization",
                "name": "GroeiRichting B.V.",
                "url": "https://groeirichting.nl",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+31-85-060-7424",
                  "contactType": "customer service",
                  "email": "rick@groeirichting.nl",
                  "availableLanguage": "Dutch"
                }
              },
              "areaServed": "NL",
              "description": "GroeiRichting biedt een digitaal gesprek- en ontwikkelportaal dat het gat vult tussen een traditioneel MTO en het functioneringsgesprek. Medewerkers voeren periodiek begeleide gesprekken over werkdruk, motivatie, samenwerking en ontwikkeling.",
              "offers": {
                "@type": "Offer",
                "description": "Persoonlijke offerte op maat, afhankelijk van aantal medewerkers en gewenste functionaliteiten"
              }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://groeirichting.nl/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Offerte",
                  "item": "https://groeirichting.nl/offerte"
                }
              ]
            }
          ]
        }}
      />
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
      <div className="bg-gray-50 border-l-2 border-[var(--kleur-primary)] p-4 rounded-r-lg">
        <p className="text-[var(--kleur-muted)]">
          Verloop en verzuim zijn kostbaar. Het vertrek van je beste medewerker of uitval van je hardste werker kan je bedrijf duizenden euro's kosten. GroeiRichting helpt je die risico's tijdig te signaleren en voorkomen.
        </p>
      </div>

      {/* Prijzenoverzicht */}
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* PILOT Pakket */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-2xl font-bold text-[var(--kleur-text)] mb-2">PILOT</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-[var(--kleur-primary)]">GRATIS</span>
              </div>
              <p className="text-sm text-[var(--kleur-muted)]">1 team</p>
              <p className="text-sm text-[var(--kleur-muted)]">(max 15 personen)</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Incl. 4 thema's</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">AI-chats</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Overzichtelijk dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Incl. samenvatting en adviezen</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Resultaten van team</span>
              </li>
            </ul>
            <button className="w-full btn btn-primary mt-auto">
              Start Nu
            </button>
          </div>

          {/* BASIS Pakket */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-2xl font-bold text-[var(--kleur-text)] mb-2">BASIS</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-[var(--kleur-primary)]">€ 12,50</span>
              </div>
              <p className="text-sm text-[var(--kleur-muted)]">p.p.p.m.</p>
              <p className="text-sm text-[var(--kleur-muted)] mt-1">Onbeperkt teams</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Incl. 4 thema's</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">AI-chats</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Overzichtelijk dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Incl. samenvatting en adviezen</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Resultaten per team</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Resultaten hele organisatie</span>
              </li>
            </ul>
            <button className="w-full btn btn-primary mt-auto">
              Kies Basis
            </button>
          </div>

          {/* PLUS Pakket - Gemarkeerd */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[var(--kleur-secondary)] relative transform scale-105 hover:scale-[1.06] transition-all flex flex-col">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[var(--kleur-secondary)] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                POPULAIR
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-2xl font-bold text-[var(--kleur-text)] mb-2">PLUS</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-[var(--kleur-secondary)]">€ 17,50</span>
              </div>
              <p className="text-sm text-[var(--kleur-muted)]">p.p.p.m.</p>
              <p className="text-sm text-[var(--kleur-muted)] mt-1">Onbeperkt teams</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Incl. 4 thema's</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">AI-chats</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Overzichtelijk dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Incl. samenvatting en adviezen</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Resultaten per team</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)]">Resultaten hele organisatie</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-sm text-[var(--kleur-text)] font-bold">Incl. maatwerkthema's</span>
              </li>
            </ul>
            <button className="w-full btn btn-secondary text-lg font-bold mt-auto">
              Kies Plus
            </button>
          </div>
        </div>
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
    </>
  )
}

export default Offerte
