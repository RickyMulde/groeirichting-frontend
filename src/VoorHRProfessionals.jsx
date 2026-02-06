import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar, TrendingDown, Brain, Shield, CheckCircle,
  BarChart3, FileText, Database, MessageSquare, Bot, Bell,
  LogOut, FileStack, Users, MessageCircle, Clock
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'
import ProcessVisualisation from './components/ProcessVisualisation'
import Reviews from './components/Reviews'

function VoorHRProfessionals() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Voor HR Professionals - Van administratief HR naar strategisch Business Partner"
        description="Stop met het jaarlijkse MTO dat niemand leest. Krijg realtime data over betrokkenheid, verzuimrisico's en retentie. Onderbouw jouw advies aan de directie met harde feiten."
        keywords="HR professional, HR manager, business partner, MTO alternatief, HR data, verzuimpreventie, HR analytics, strategisch HR, hr analytics tool voor verzuimpreventie, continue medewerkerstevredenheid meten, alternatief voor jaarlijks mto met doorlopende metingen, hoe onderbouw ik hr beleid met data voor directie, hr dashboard voor betrokkenheid en werkdruk"
        canonical="https://groeirichting.nl/voor-hr-professionals"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "GroeiRichting - HR Professionals",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "description": "Persoonlijke offerte op maat voor HR-teams die strategische impact willen maken"
          },
          "description": "HR analytics en MTO-alternatief voor HR-professionals die continu medewerkerstevredenheid willen meten, verzuimrisico's vroegtijdig willen signaleren en beleid met data willen onderbouwen richting de directie.",
          "keywords": "hr analytics software, verzuimpreventie tool, alternatief voor jaarlijks mto, continue medewerkerstevredenheid meten, hr dashboard voor betrokkenheid en werkdruk, strategisch hr business partner",
          "url": "https://groeirichting.nl/voor-hr-professionals"
        }}
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Van brandjes blussen naar strategische impact.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Je wilt bouwen aan een vitale organisatie, maar de waan van de dag regeert. GroeiRichting geeft je de data en tools om verzuim en verloop structureel aan te pakken — met draagvlak van de directie.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Weet aan welke knoppen je moet draaien:</strong> Stop met gissen naar de oorzaken van onvrede. Zie per team exact waar de schoen wringt.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Onderbouw je intuïtie met feiten:</strong> Krijg de harde data die je nodig hebt om je plannen en budgetten erdoor te krijgen in de boardroom.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Preventie in plaats van reparatie:</strong> Signaleer risico's op uitval vroegtijdig, zodat je kunt sturen op vitaliteit in plaats van verzuimdossiers.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Boek een demo
            </a>
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

      {/* Het Probleem - 3 Kolommen */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Je wilt bouwen aan de organisatie, maar de realiteit houdt je tegen.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom 1: De Blinde Vlek */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <Brain className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Je weet niet precies waar de pijn zit
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Je voelt aan dat de sfeer op een afdeling verhardt, maar je krijgt de vinger er niet achter. Ligt het aan de teamleider? De werkdruk? Of onduidelijke processen? Zolang je de oorzaak niet kent, weet je niet aan welke knoppen je moet draaien.
              </p>
            </div>

            {/* Kolom 2: De Bewijslast */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <BarChart3 className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Discussies winnen op gevoel is lastig
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Jij ziet het belang van preventie, maar de directie stuurt op cijfers. Zonder harde data over verzuimrisico's en retentie is het lastig om budget en prioriteit te krijgen voor jouw plannen. Je staat vaak alleen in je pleidooi.
              </p>
            </div>

            {/* Kolom 3: De Tijdgebrek-Val */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <Clock className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Geen tijd voor diepgang
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Je agenda wordt beheerst door operationele issues en de waan van de dag. Je zou wel vaker diepte-interviews willen houden met medewerkers, maar die tijd is er simpelweg niet. Je wordt gedwongen tot reactief handelen.
              </p>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/contact" className="btn btn-primary">
              Plan kennismaking
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            Van onderbuikgevoel naar feitelijk inzicht
          </h2>
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-12 max-w-3xl mx-auto">
            Ontdek hoe directie en HR GroeiRichting inzetten voor grip op de organisatie.
          </p>
          <Reviews />
        </div>
      </section>

      {/* Van inzicht naar resultaat: Zo werkt doorlopend Groeien */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Tekst links */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-6">
                Van inzicht naar resultaat: Zo werkt doorlopend Groeien.
              </h2>
              
              <div className="space-y-8 text-lg text-[var(--kleur-muted)] mb-8">
                {/* Stap 1 */}
                <div>
                  <h4 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                    1. Start met de GroeiScan
                  </h4>
                  <p className="mb-3">
                    We vervangen statische vinkjes door diepgaande AI-interviews. Je ziet direct per team hoe de vlag erbij hangt op de vier kernpijlers.
                  </p>
                  <div className="bg-[var(--kleur-accent)]/10 border-l-4 border-[var(--kleur-accent)] p-4 rounded-r-lg">
                    <p className="text-sm font-semibold text-[var(--kleur-accent)] mb-1">Winst:</p>
                    <p className="text-sm text-[var(--kleur-text)]">Je weet exact waar de pijn zit en waar je niet op hoeft te focussen.</p>
                  </div>
                </div>

                {/* Stap 2 */}
                <div>
                  <h4 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                    2. Focus & Maatwerk
                  </h4>
                  <p className="mb-3">
                    Geen dikke rapporten voor in de lade. Je pakt alleen de knelpunten aan. Daarnaast zet je flexibele 'Specials' in, bijvoorbeeld ter voorbereiding op het functioneringsgesprek.
                  </p>
                  <div className="bg-[var(--kleur-accent)]/10 border-l-4 border-[var(--kleur-accent)] p-4 rounded-r-lg">
                    <p className="text-sm font-semibold text-[var(--kleur-accent)] mb-1">Winst:</p>
                    <p className="text-sm text-[var(--kleur-text)]">Managers krijgen een concrete agenda, zonder voorbereidingstijd.</p>
                  </div>
                </div>

                {/* Stap 3 */}
                <div>
                  <h4 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                    3. De Check (Resultaat)
                  </h4>
                  <p className="mb-3">
                    Halverwege de cyclus hermeten we alleen de verbeterpunten. Hebben de acties effect gehad? Is de werkdruk gedaald?
                  </p>
                  <div className="bg-[var(--kleur-accent)]/10 border-l-4 border-[var(--kleur-accent)] p-4 rounded-r-lg">
                    <p className="text-sm font-semibold text-[var(--kleur-accent)] mb-1">Winst:</p>
                    <p className="text-sm text-[var(--kleur-text)]">Je maakt groei aantoonbaar voor directie én medewerkers.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setShowBrochureModal(true)}
                  className="btn btn-accent"
                >
                  Download informatie-brochure
                </button>
              </div>
            </div>
            
            {/* Visualisatie rechts */}
            <div className="flex items-center justify-center">
              <ProcessVisualisation />
            </div>
          </div>
        </div>
      </section>

      {/* Geen dikke rapporten, maar direct inzicht */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            Geen dikke rapporten, maar direct inzicht.
          </h2>
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-8 max-w-3xl mx-auto">
            Zie direct hoe de vlag erbij hangt. Scoort 'Samenwerking' groen? Top. Is 'Werkdruk' oranje? Dan weet je precies welk thema de komende periode aandacht krijgt en dat per team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <Bot className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Wij doen de uitvoering
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Jij hoeft geen vragen te verzinnen of interviews te plannen. Onze software regelt de uitnodigingen, de interviews en de analyse. Jij krijgt puur een seintje als de resultaten klaar staan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <MessageCircle className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Geen HR-jargon
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Kijk naar het dashboard hiernaast. Je ziet geen complexe statistieken, maar heldere scores en kleuren. Iedere manager ziet in 3 seconden waar de aandacht heen moet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <Bell className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Van inzicht naar actie
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Klik op een oranje thema (zoals Werkdruk) en zie direct waarom het team ontevreden is. Je krijgt concrete handvatten om het gesprek aan te gaan en het probleem op te lossen.
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

          {/* CTA Offerte */}
          <div className="text-center mt-12">
            <Link to="/offerte" className="btn btn-primary">
              Vraag offerte op
            </Link>
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
          
          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/offerte" className="btn btn-secondary">
              Vraag offerte op
            </Link>
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
            <a
              href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Boek een demo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ HR Professionals */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            Veelgestelde vragen van HR Professionals
          </h2>

          {/* Vraag 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              1. Hoe verschilt dit van ons jaarlijkse MTO (Medewerkerstevredenheidsonderzoek)?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Het traditionele MTO is een momentopname achteraf; vaak is de data al verouderd tegen de tijd dat het rapport af is. GroeiRichting meet continu (of met een frequentie naar keuze) en real-time. Bovendien is een MTO vaak een statische vragenlijst ("Geef een cijfer van 1 tot 10"). Onze AI-interviews vragen door op het waarom achter het cijfer, waardoor je diepere, kwalitatieve inzichten krijgt die je anders mist.
            </p>
          </div>

          {/* Vraag 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              2. Is de privacy en anonimiteit echt gewaarborgd (AVG)?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Ja, dit is onze topprioriteit. Wij rapporteren uitsluitend op geaggregeerd niveau (team- of organisatieniveau). Als een team te klein is (&lt; 5 personen), worden de resultaten samengevoegd om herleidbaarheid te voorkomen. Medewerkers durven zich alleen uit te spreken als ze zich 100% veilig voelen, en onze software is daar volledig op ingericht ("Privacy by Design").
            </p>
          </div>

          {/* Vraag 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              3. Kost de implementatie veel tijd en heb ik IT-support nodig?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Nee, de implementatie is 'light'. Omdat we een cloud-based oplossing zijn, hoeft er niets lokaal geïnstalleerd te worden. We hebben enkel een medewerkerslijst (naam + e-mail) nodig om te starten. Wij richten de omgeving in. Vaak kunnen we binnen enkele dagen live zijn, zonder belasting van jullie IT-afdeling.
            </p>
          </div>

          {/* Vraag 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              4. Krijg ik als HR niet een dagtaak aan het opvolgen van alle signalen?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Integendeel. De kracht van GroeiRichting is dat het de verantwoordelijkheid teruglegt waar hij hoort: bij de lijnmanager. Managers krijgen toegang tot hun eigen teamdashboard met concrete actiepunten. Jouw rol verschuift van het 'ophalen en verwerken van data' naar het strategisch adviseren van managers op basis van die data.
            </p>
          </div>

          {/* Vraag 5 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              5. Is de methodiek wel wetenschappelijk onderbouwd?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              We baseren onze thema's op gevalideerde drivers voor werkgeluk en duurzame inzetbaarheid, zoals autonomie, competentie, verbondenheid (SDT-theorie) en werkdrukmodellen. De AI is getraind om objectief en onbevooroordeeld door te vragen, waardoor je bias (die een menselijke interviewer wel heeft) voorkomt.
            </p>
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

