import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserX, Briefcase, TrendingUp, CheckCircle,
  Quote, Zap, MessageSquare, BarChart,
  LogOut, FileStack, Users, Bot, MessageCircle, Bell
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'

function VoorDirectieEnOffice() {
  const [showVoorbeeldRapportModal, setShowVoorbeeldRapportModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Voor Directie & Office - Groei zonder grip te verliezen"
        description="Je bedrijf wordt groter, maar het familiegevoel staat onder druk. GroeiRichting is de digitale rechterhand die luistert naar al je medewerkers, zonder dat het jou of je Office Manager extra tijd kost."
        keywords="directie, office manager, MKB, medewerkersbehoud, cultuur behouden, groeipijn, toptalent behouden"
        canonical="https://groeirichting.nl/voor-directie-en-office"
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Groei zonder de grip op je mensen te verliezen.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Je bedrijf wordt groter, maar het familiegevoel staat onder druk. GroeiRichting is de digitale rechterhand die luistert naar al je medewerkers, zonder dat het jou of je (Office) Manager extra tijd kost.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Voorkom ongewenst vertrek:</strong> Krijg vroegtijdig inzicht in onvrede of hoge werkdruk, nog voordat iemand zijn ontslagbrief schrijft.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Geen HR-achtergrond nodig:</strong> Je krijgt geen theoretische modellen, maar concrete, hapklare actiepunten die je morgen in het teamoverleg kunt bespreken.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Minimale administratie:</strong> Wij regelen de uitnodigingen en de interviews. Jij krijgt puur de resultaten. 100% inzicht, 0% gedoe.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Link 
              to="/contact"
              className="btn btn-primary"
            >
              Neem contact op
            </Link>
            <button 
              onClick={() => setShowVoorbeeldRapportModal(true)}
              className="btn btn-accent"
            >
              Download voorbeeldrapport
            </button>
          </div>

          {/* Micro-trust */}
          <p className="text-sm text-[var(--kleur-muted)] italic">
            Optioneel: Fysieke HR-ondersteuning op locatie mogelijk.
          </p>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Het Probleem - 3 Kolommen */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Weet jij écht wat er speelt, of gok je maar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom 1: Het stille vertrek */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <LogOut className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Het stille vertrek
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Toptalent klaagt vaak niet, ze vertrekken 'opeens'. Voorkom die verrassing door signalen vroegtijdig op te vangen.
              </p>
            </div>

            {/* Kolom 2: De overbelaste Office Manager */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <FileStack className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                De overbelaste Office Manager
              </h3>
              <p className="text-[var(--kleur-muted)]">
                HR 'erbij doen' is niet langer houdbaar. Je hebt een tool nodig die het operationele werk uit handen neemt.
              </p>
            </div>

            {/* Kolom 3: Groeipijn */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <Users className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Groeipijn
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Nieuwe mensen voelen zich soms nog geen onderdeel van de club. Met GroeiRichting bewaak je de cultuur, ook als je groeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wat levert het op */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4">Wat levert GroeiRichting op voor jouw organisatie?</h2>
        <p className="text-lg text-[var(--kleur-muted)] text-center mb-8 max-w-3xl mx-auto">
          Ontdek hoe GroeiRichting werkgevers helpt om medewerkerstevredenheid te verbeteren, betrokkenheid te vergroten en verzuim terug te dringen — terwijl medewerkers meer invloed en ondersteuning krijgen om te groeien en te ontwikkelen.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Voor werkgevers */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🌍</span>
              <h3 className="text-2xl font-bold text-[var(--kleur-primary)]">Voor werkgevers</h3>
            </div>
            <p className="text-[var(--kleur-muted)] mb-6 italic">
              Waarom GroeiRichting waardevol is voor jouw organisatie
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Ontvang voorspellende signalen</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Herken signalen van stress en ontevredenheid vóórdat mensen uitvallen of vertrekken.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Binden en boeien</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Medewerkers voelen zich gezien en blijven langer loyaal en productief.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Objectieve inzichten</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Overzichtelijke scores en adviezen per thema. Geen onderbuikgevoel, maar data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Tijdbesparing</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Gesprekken en samenvattingen zijn voorbereid en gestructureerd. Jij kunt sneller schakelen.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Inzicht per team</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Geen gemiddeld cijfer voor het hele bedrijf, maar concrete signalen per team en rol. Zo krijgt elke teamleider grip op zijn eigen mensen.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Voor medewerkers */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👩‍💼</span>
              <h3 className="text-2xl font-bold text-[var(--kleur-accent)]">Voor medewerkers</h3>
            </div>
            <p className="text-[var(--kleur-muted)] mb-6 italic">
              Wat GroeiRichting voor jouw medewerkers kan betekenen
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Medewerkers bepalen zelf wat jij onder ogen moet krijgen</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Hun stem telt, niet alleen tijdens één gesprek maar continu.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Veilig en laagdrempelig</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Medewerkers kunnen zich vrij uitspreken, ook over lastige onderwerpen.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Invloed op werk en toekomst</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Medewerkers dragen zelf bij aan verbeteringen en hun interne loopbaanpad.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Tips om te groeien</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Medewerkers krijgen persoonlijke suggesties om werkplezier, balans of ontwikkeling te verbeteren.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Geen saaie statische formulieren, maar echte gesprekken</p>
                  <p className="text-sm text-[var(--kleur-muted)]">AI ondersteunt medewerkers om betere gesprekken te voeren.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom dit belangrijk is */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">Waarom dit belangrijk is</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-8">
          Het vervangen van één medewerker kost maanden en tienduizenden euro's aan inwerken, gemiste output en druk op collega's. Burn‑outtrajecten duren gemiddeld maanden, met hoge kosten per dag verzuim. Zonder structurele gesprekken over werkdruk, motivatie en samenwerking blijven de echte oorzaken vaak onzichtbaar en wordt verzuim terugdringen een dure inhaalrace in plaats van een preventieve aanpak.
        </p>
        
        {/* Mini-stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">€ 300</div>
            <p className="text-[var(--kleur-muted)]">per dag verzuimkosten</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">6</div>
            <p className="text-[var(--kleur-muted)]">maanden tot gemiddelde terugkeer bij stress/uitval</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">46%</div>
            <p className="text-[var(--kleur-muted)]">van medewerkers voelt zich niet structureel gehoord</p>
          </div>
        </div>
        
        {/* CTA */}
        <Link to="/contact" className="btn btn-primary">Neem contact op</Link>
      </section>

      {/* De Oplossing - Feature Highlight */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
            Jullie tool om concrete inzichten te genereren van de organisatie
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <Bot className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Geautomatiseerd
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    De tool voert de interviews, jij krijgt de inzichten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <MessageCircle className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Laagdrempelig
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Medewerkers antwoorden via een simpele chat, voelt niet als administratie.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <Bell className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Actiegericht
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Je krijgt geen dik rapport, maar direct een seintje: "Let op team Marketing ervaart de werkdruk als te hoog."
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollbaar afbeelding vlak */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="overflow-y-auto rounded-lg" style={{ maxHeight: '400px' }}>
                <img 
                  src="/thema-overzicht-dashboard.png" 
                  alt="Dashboard overzicht met thema's: Werkdruk & Taaklast, Perspectief & Ontwikkeling, Motivatie en Werkplezier, Samenwerking & Werksfeer"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Afsluiting */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial */}
          <div className="bg-[var(--kleur-accent)] text-white p-8 rounded-xl mb-12">
            <Quote className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <p className="text-lg italic text-center max-w-2xl mx-auto mb-4">
              "Vroeger sprak ik iedereen zelf. Nu groeit mijn bedrijf, maar dankzij GroeiRichting weet ik nog steeds precies wie er niet lekker in zijn vel zit."
            </p>
            <p className="text-center font-medium">– DGA, MKB-bedrijf</p>
          </div>

          {/* Afsluitende CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-6">
              Klaar om je cultuur te borgen?
            </h2>
            <Link 
              to="/contact"
              className="btn btn-primary"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      </div>

      {/* Modal */}
      <BrochureDownloadModal 
        isOpen={showVoorbeeldRapportModal}
        onClose={() => setShowVoorbeeldRapportModal(false)}
        title="Voorbeeld-rapport"
        description="Vul je gegevens in en download het voorbeeld-rapport direct."
      />
    </>
  )
}

export default VoorDirectieEnOffice

