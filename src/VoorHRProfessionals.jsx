import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar, TrendingDown, Brain, Shield, CheckCircle,
  BarChart3, FileText, Database, MessageSquare, Bot, Bell,
  LogOut, FileStack, Users, MessageCircle
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'
import ProcessVisualisation from './components/ProcessVisualisation'

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
            Onderbouw je intuïtie met harde data.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Je voelt vaak haarfijn aan wat er speelt, maar zonder cijfers is het lastig sturen. GroeiRichting geeft je de feiten bij je gevoel. Transformeer van faciliterend HR naar een strategische partner die verzuim, verloop en cultuur inzichtelijk maakt voor de directie.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Van onderbuikgevoel naar bewijs:</strong> Krijg de "harde" cijfers om jouw "zachte" thema's (zoals werkdruk en sfeer) bespreekbaar te maken in de boardroom.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Signaleer risico's proactief:</strong> Wacht niet op de verzuimcijfers achteraf. Zie realtime trends per team en adviseer managers voordat het misgaat.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Faciliteer de lijn:</strong> Geef teamleiders de handvatten om zelf het goede gesprek te voeren, zodat jij je kunt focussen op de grote lijnen en het beleid.</p>
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
            Weet jij écht wat er speelt, of gok je maar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom 1: Het stille vertrek */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <LogOut className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Toptalent vertrekt 'opeens'
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Vaak zijn het je beste mensen die niet klagen, maar opzeggen. Ze missen perspectief of waardering. Met GroeiRichting vang je deze signalen op vòòrdat de ontslagbrief op je bureau ligt.
              </p>
            </div>

            {/* Kolom 2: De overbelaste Office Manager */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <FileStack className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                HR 'erbij doen' lukt niet meer
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Je wilt goed voor je mensen zorgen, maar je wordt gestuurd door de waan van de dag. Periodieke functioneringsgesprekken schieten erbij in en signalen sneeuwen onder. Je hebt geen extra handen nodig, maar een slim systeem.
              </p>
            </div>

            {/* Kolom 3: Groeipijn */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="relative p-4 rounded-xl w-fit mb-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm">
                <Users className="w-8 h-8 text-[var(--kleur-primary)] drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Het familiegevoel staat onder druk
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Vroeger sprak je iedereen bij de koffieautomaat. Nu zijn er eilandjes en weet je niet meer wat er leeft op de verschillende afdelingen. Hoe bewaak je de cultuur als je groeit?
              </p>
            </div>
          </div>
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
              
              <div className="mt-8">
                <p className="text-lg text-[var(--kleur-muted)] mb-4">Bekijk hoe wij jou kunnen helpen:</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/voor-directie-en-office" className="btn btn-primary">Voor Directie en Office</Link>
                  <Link to="/voor-hr-professionals" className="btn btn-accent">Voor HR-professionals</Link>
                </div>
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

