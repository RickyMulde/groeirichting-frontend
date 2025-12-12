import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar, TrendingDown, Brain, Shield, CheckCircle,
  BarChart3, FileText, Database, MessageSquare, Bot, Bell
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'

function VoorHRProfessionals() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Voor HR Professionals - Van administratief HR naar strategisch Business Partner"
        description="Stop met het jaarlijkse MTO dat niemand leest. Krijg realtime data over betrokkenheid, verzuimrisico's en retentie. Onderbouw jouw advies aan de directie met harde feiten."
        keywords="HR professional, HR manager, business partner, MTO alternatief, HR data, verzuimpreventie, HR analytics, strategisch HR"
        canonical="https://groeirichting.nl/voor-hr-professionals"
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Van administratief HR naar strategisch Business Partner.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Stop met het jaarlijkse MTO dat niemand leest. Krijg realtime data over betrokkenheid, verzuimrisico's en retentie. Onderbouw jouw advies aan de directie met harde feiten.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Link 
              to="/contact"
              className="btn btn-primary"
            >
              Neem contact op
            </Link>
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-accent"
            >
              Download voorbeeldrapport
            </button>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* De verborgen kosten van niet luisteren */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            De verborgen kosten van niet luisteren.
          </h2>
          <p className="text-lg text-[var(--kleur-muted)] mb-8 text-center max-w-3xl mx-auto">
            Zonder continue signalering ben je als HR altijd te laat. De kosten van reactief beleid lopen snel op.
          </p>
          
          {/* Mini-stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blok 1: Verzuim */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">
                € 250 - € 400
              </div>
              <p className="text-[var(--kleur-muted)] font-medium mb-2">
                verzuimkosten per dag
              </p>
              <p className="text-sm text-[var(--kleur-muted)]">
                Een burn-out duurt gemiddeld 290 dagen. Zonder vroege signalering lopen de kosten in de tienduizenden euro's.
              </p>
            </div>

            {/* Blok 2: Verloop */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">
                6-9 maanden
              </div>
              <p className="text-[var(--kleur-muted)] font-medium mb-2">
                om een specialist te vervangen
              </p>
              <p className="text-sm text-[var(--kleur-muted)]">
                Werving, onboarding en productiviteitsverlies kosten bij elkaar vaak 120% van een jaarsalaris.
              </p>
            </div>

            {/* Blok 3: Engagement */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">
                46%
              </div>
              <p className="text-[var(--kleur-muted)] font-medium mb-2">
                voelt zich niet gehoord
              </p>
              <p className="text-sm text-[var(--kleur-muted)]">
                Medewerkers die zich niet gehoord voelen, zijn 3x vaker geneigd om binnen een jaar te vertrekken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Het Probleem - Vergelijkingstabel */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Waarom het jaarlijkse MTO niet meer werkt.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Blok Oud */}
            <div className="bg-gray-100 p-8 rounded-xl border border-gray-300">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-gray-500" />
                <h3 className="text-2xl font-semibold text-gray-700">
                  Oud
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                Eén keer per jaar een momentopname. Resultaten zijn al achterhaald als het rapport af is.
              </p>
            </div>

            {/* Blok Nieuw */}
            <div className="bg-[var(--kleur-accent)] p-8 rounded-xl border-2 border-[var(--kleur-accent)]">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-white" />
                <h3 className="text-2xl font-semibold text-white">
                  Nieuw
                </h3>
              </div>
              <p className="text-lg text-white">
                Continue hartslagmeting met GroeiRichting. Signaleer problemen terwijl ze ontstaan en stuur direct bij.
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
                  <MessageSquare className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
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

      {/* De Oplossing - Data & AI Focus */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Voorspel verzuim en verloop met AI.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Verzuimpreventie */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <TrendingDown className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Verzuimpreventie
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Zie trends in werkdruk voordat iemand uitvalt.
              </p>
            </div>

            {/* Feature 2: Boardroom-ready */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <BarChart3 className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Boardroom-ready
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Geen "ik denk dat...", maar "uit de data blijkt dat...".
              </p>
            </div>

            {/* Feature 3: AI-analyse */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <Brain className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                AI-analyse
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Interviews ondersteund door AI voor meer en concretere informatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GroeiRichting biedt de oplossing */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
            GroeiRichting biedt de oplossing: MTO-alternatief met AI-ondersteuning
          </h2>
          
          <p className="text-lg text-[var(--kleur-muted)] text-center max-w-3xl mx-auto mb-12">
            Met AI-ondersteunde gesprekken over vaste thema's zoals werkdruk & taaklast, motivatie & werkplezier, samenwerking & werksfeer en perspectief & ontwikkeling, creëer je een gesprekscultuur die helpt om medewerkerstevredenheid structureel te verbeteren en verzuim tijdig te signaleren. Je krijgt als werkgever direct bruikbare input, terwijl medewerkers ervaren dat hun stem telt.
          </p>

          {/* CTA's */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-accent"
            >
              Download voorbeeldrapport
            </button>
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

      {/* Brochure Modal */}
      <BrochureDownloadModal 
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
        title="Voorbeeld-rapport"
        description="Vul je gegevens in en download het voorbeeld-rapport direct."
      />
    </>
  )
}

export default VoorHRProfessionals

