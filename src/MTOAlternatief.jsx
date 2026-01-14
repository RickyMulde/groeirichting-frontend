import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  X, CheckCircle, UserPlus, Mail, Zap,
  ArrowRight, ChevronDown
} from 'lucide-react'
import SEOHead from './components/SEOHead'

function MTOAlternatief() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      vraag: "Is het wel anoniem voor mijn medewerkers?",
      antwoord: "Absoluut. Veiligheid en vertrouwen staan op 1. Jij ziet de trends en cijfers per team, maar nooit wie wat exact heeft ingevuld. Zo durven medewerkers eerlijk te zijn."
    },
    {
      vraag: "Vervangt dit mijn jaarlijkse MTO volledig?",
      antwoord: "Ja, en het verbetert het. Een MTO is een momentopname (foto), GroeiRichting is een continue monitor (film). Je weet dus altijd hoe het gaat, niet alleen in oktober."
    },
    {
      vraag: "Ik ben geen technische held, is de installatie moeilijk?",
      antwoord: "Nee, we hebben het 'hufterproof' gemaakt. Je maakt een account, kopieert de e-mailadressen van je team, en zij krijgen vanzelf een uitnodiging. Je bent binnen 5 minuten klaar."
    },
    {
      vraag: "Wat gebeurt er na de 14 dagen proefperiode?",
      antwoord: "Niets. Het stopt automatisch. Je zit nergens aan vast en hoeft geen betaalgegevens in te vullen om te starten. Alleen als jij blij bent, praten we verder."
    },
    {
      vraag: "Is de data veilig (AVG/GDPR)?",
      antwoord: "Zeker. Al onze data wordt versleuteld opgeslagen op Nederlandse servers en we voldoen aan de strengste AVG-eisen."
    }
  ]
  return (
    <>
      <SEOHead 
        title="MTO Alternatief - Inzicht in 1 minuut"
        description="Stop met trage medewerkerstevredenheidsonderzoeken. GroeiRichting geeft real-time inzicht in verzuim en werkdruk. Start vandaag gratis."
        keywords="MTO alternatief, medewerkerstevredenheidsonderzoek alternatief, real-time team inzicht, snelle MTO, moderne MTO, HR software, medewerkerstevredenheid"
        canonical="https://groeirichting.nl/mto-alternatief"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "GroeiRichting - MTO Alternatief",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "description": "14 dagen gratis proberen, geen creditcard nodig"
          },
          "description": "Het snelle, real-time alternatief voor traditionele MTO's. Krijg binnen 1 minuut inzicht in je team en voorkom verloop.",
          "keywords": "MTO alternatief, medewerkerstevredenheidsonderzoek alternatief, real-time team inzicht",
          "url": "https://groeirichting.nl/mto-alternatief"
        }}
      />
      
      <div className="space-y-16 bg-[var(--kleur-background)]">

        {/* Hero Sectie */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24 px-6 max-w-7xl mx-auto">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--kleur-primary)] mb-6 leading-tight">
              Stop met saaie MTO's die in de la belanden.
            </h1>
            <h2 className="text-xl md:text-2xl text-[var(--kleur-muted)] mb-8 font-normal">
              Krijg real-time inzicht in je team en voorkom verloop. Geen maanden wachten, maar direct resultaat.
            </h2>
            
            {/* CTA Button */}
            <div className="mb-4">
              <Link 
                to="/registreer-werkgever" 
                className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Start 14 dagen gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Micro-copy */}
            <p className="text-sm text-[var(--kleur-muted)] italic">
              Geen creditcard nodig. Installatie duurt 1 minuut.
            </p>
          </div>
          
          {/* Visual placeholder - Dashboard screenshot op mobiel */}
          <div className="flex items-center justify-center md:justify-end order-1 md:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-200 max-w-sm w-full">
              <div className="bg-gray-100 rounded-lg aspect-[9/16] flex items-center justify-center">
                <p className="text-[var(--kleur-muted)] text-sm text-center px-4">
                  Dashboard screenshot<br />op mobiel<br />(placeholder)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-gray-50 py-8 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-lg text-[var(--kleur-muted)] font-medium">
              Het moderne alternatief voor traditionele onderzoeken.
            </p>
            {/* Placeholder voor logo's - kan later worden toegevoegd */}
            <div className="flex justify-center gap-8 mt-6 opacity-50">
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </section>

        {/* Het Probleem vs. De Oplossing */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
              Waarom ouderwetse MTO's niet meer werken
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kaart 1: De Oude Manier */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--kleur-text)]">
                    De Oude Manier
                  </h3>
                </div>
                <ul className="space-y-4 text-[var(--kleur-muted)]">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>1x per jaar meten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Ellenlange vragenlijsten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Rapporten die niemand leest</span>
                  </li>
                </ul>
              </div>

              {/* Kaart 2: De GroeiRichting Manier */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[var(--kleur-accent)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-[var(--kleur-accent)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--kleur-text)]">
                    De GroeiRichting Manier
                  </h3>
                </div>
                <ul className="space-y-4 text-[var(--kleur-muted)]">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Real-time inzicht</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Max 5 minuten per thema</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Direct actie ondernemen op verloop</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hoe het werkt - De 1-2-3 Stap */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
              Inzicht in 60 seconden
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stap 1 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 mb-6 mx-auto w-fit">
                  <UserPlus className="w-12 h-12 text-[var(--kleur-primary)] mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4">
                  Account aanmaken
                </h3>
                <p className="text-[var(--kleur-muted)]">
                  Je bent letterlijk in 1 minuut up-and-running.
                </p>
              </div>

              {/* Stap 2 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-6 mb-6 mx-auto w-fit">
                  <Mail className="w-12 h-12 text-[var(--kleur-accent)] mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4">
                  Team uitnodigen
                </h3>
                <p className="text-[var(--kleur-muted)]">
                  Nodig collega's uit in 10 seconden via e-mail.
                </p>
              </div>

              {/* Stap 3 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 mb-6 mx-auto w-fit">
                  <Zap className="w-12 h-12 text-green-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-4">
                  Medewerkers doorlopen thema's
                </h3>
                <p className="text-[var(--kleur-muted)]">
                  Jij hoeft niks te doen. Zie direct hoe de vlag erbij hangt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Sectie */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
              Veelgestelde vragen
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-[var(--kleur-primary)] pr-4">
                      {faq.vraag}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-[var(--kleur-primary)] flex-shrink-0 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-[var(--kleur-muted)] leading-relaxed">
                        {faq.antwoord}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* De "No-Brainer" Afsluiter */}
        <section className="py-16 px-6 bg-gradient-to-br from-[var(--kleur-primary)] to-[var(--kleur-accent)] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Probeer het risicoloos met 1 team
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Je zit nergens aan vast. Na 14 dagen stopt de proefperiode automatisch, tenzij je zo enthousiast bent dat je wilt blijven.
            </p>
            <Link 
              to="/registreer-werkgever" 
              className="btn bg-white text-[var(--kleur-primary)] hover:bg-gray-100 text-lg px-8 md:px-10 py-4 md:py-5 inline-flex items-center gap-2 font-bold shadow-lg"
            >
              Maak nu je gratis account aan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}

export default MTOAlternatief
