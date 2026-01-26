import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserX, Briefcase, TrendingUp, CheckCircle,
  Quote, Zap, MessageSquare, BarChart,
  LogOut, FileStack, Users, Bot, MessageCircle, Bell, Info, Calendar
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'
import Reviews from './components/Reviews'

function VoorDirectieEnOffice() {
  const [showVoorbeeldRapportModal, setShowVoorbeeldRapportModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Voor Directie & Office - Groei zonder grip te verliezen"
        description="Je bedrijf wordt groter, maar het familiegevoel staat onder druk. GroeiRichting is de digitale rechterhand die luistert naar al je medewerkers, zonder dat het jou of je Office Manager extra tijd kost."
        keywords="directie, office manager, MKB, medewerkersbehoud, cultuur behouden, groeipijn, toptalent behouden, medewerkers behouden zonder hr afdeling, cultuur behouden bij groei mkb, verzuimpreventie software voor mkb, alternatief voor jaarlijks mto met doorlopende metingen, voorkom toptalent verlies mkb"
        canonical="https://groeirichting.nl/voor-directie-en-office"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "GroeiRichting - Directie & Office",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "description": "Persoonlijke offerte op maat voor directie en office in het MKB"
          },
          "description": "AI-gestuurd gespreks- en analyseplatform voor MKB-directies die grip willen houden op cultuur, verzuim en toptalentbehoud tijdens groei.",
          "keywords": "directie mkb, medewerkersbehoud, cultuur behouden bij groei, verzuimpreventie software voor mkb, alternatief voor jaarlijks mto, medewerkers behouden zonder hr afdeling, toptalent behouden",
          "url": "https://groeirichting.nl/voor-directie-en-office"
        }}
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
            <a
              href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Plan een demo
            </a>
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
          
          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/contact" className="btn btn-primary">
              Plan kennismaking
            </Link>
          </div>
        </div>
      </section>

      {/* De Oplossing - Feature Highlight */}
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

          {/* CTA's */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button 
              onClick={() => setShowVoorbeeldRapportModal(true)}
              className="btn btn-accent"
            >
              Download informatie-brochure
            </button>
            <Link to="/contact" className="btn btn-primary">
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      {/* Hulp nodig bij de opvolging */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Hulp nodig bij de opvolging?</h3>
                <div className="text-blue-800">
                  <p className="text-sm">
                    GroeiRichting is meer dan software. Concrete adviezen en support op afstand zitten standaard bij de prijs inbegrepen. Heb je door drukte behoefte aan extra fysieke slagkracht op kantoor? Dan koppelen we je eenvoudig aan een tijdelijke HR-expert uit ons netwerk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom dit belangrijk is */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">Waarom preventie goedkoper is dan genezen.</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-8">
          Het vervangen van één medewerker kost al snel 20% tot 50% van een jaarsalaris aan werving, inwerken en productiviteitsverlies. Tel daar de kosten van verzuim bij op en de rekensom is snel gemaakt. Investeren in luisteren is vele malen goedkoper dan de kosten van vertrek.
        </p>
        
        {/* Mini-stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">€ 300+</div>
            <p className="text-[var(--kleur-muted)]">per dag aan verzuimkosten</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">6</div>
            <p className="text-[var(--kleur-muted)]">maanden gemiddelde hersteltijd bij burn-out</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">46%</div>
            <p className="text-[var(--kleur-muted)]">van medewerkers vertrekt wegens gebrek aan waardering</p>
          </div>
        </div>
        
        {/* CTA */}
        <Link to="/contact" className="btn btn-primary">Neem contact op</Link>
      </section>

      {/* Wat levert het op */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4">Win-win: Grip voor jou, groei voor je team.</h2>
        <p className="text-lg text-[var(--kleur-muted)] text-center mb-8 max-w-3xl mx-auto">
          Ontdek hoe je met minimale tijdsinvestering verzuim voorkomt, talent behoudt en een professionele cultuur bouwt – zonder dat je daarvoor een HR-afdeling hoeft op te tuigen.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Voor jou als Ondernemer */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🌍</span>
              <h3 className="text-2xl font-bold text-[var(--kleur-primary)]">Voor jou als Ondernemer</h3>
            </div>
            <p className="text-[var(--kleur-muted)] mb-6 italic font-medium">
              De Hoofdzaak
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)] mb-1">AI vraagt door waar jij stopt</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Een manager neemt vaak genoegen met "het gaat wel goed". Onze AI vraagt vriendelijk maar scherp door naar de achterliggende oorzaken. Zo krijg je de échte verhalen op tafel die je anders mist, zonder sociaal ongemak.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)] mb-1">Voorkom verzuim (én verloop)</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Langdurig verzuim door stress zie je vaak niet aankomen, maar bouwt langzaam op. GroeiRichting signaleert de eerste scheurtjes in werkdruk en sfeer, zodat je kunt ingrijpen voordat iemand zich ziekmeldt.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)] mb-1">Professioneel werkgeverschap zonder HR-afdeling</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Je laat zien dat je je mensen serieus neemt en biedt structuur, zonder dat je daarvoor een fulltime HR-manager in dienst hoeft te nemen.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Voor je Medewerkers */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👩‍💼</span>
              <h3 className="text-2xl font-bold text-[var(--kleur-accent)]">Voor je Medewerkers</h3>
            </div>
            <p className="text-[var(--kleur-muted)] mb-6 italic font-medium">
              De Geruststelling
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)] mb-1">100% Veilig & Anoniem</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Ze kunnen eerlijk zijn zonder angst voor consequenties.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)] mb-1">Geen enquête-moeheid</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Het is een kort gesprek, geen lange saaie lijst.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)] mb-1">Direct tips voor zichzelf</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Ze krijgen na het gesprek meteen persoonlijke tips om hun eigen werkplezier te verhogen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Download brochure */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowVoorbeeldRapportModal(true)}
            className="btn btn-accent"
          >
            Download informatie-brochure
          </button>
        </div>
      </section>

      {/* FAQ Directie & Office */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            Veelgestelde vragen van Directie &amp; Office
          </h2>

          {/* Vraag 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              1. Kost dit mij of mijn Office Manager veel tijd om te beheren?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Nee, bijna niets. GroeiRichting is ontwikkeld om jullie te ontlasten, niet om werk toe te voegen. Wij regelen de uitnodigingen, de chats en de analyses. Jullie ontvangen alleen een seintje wanneer de resultaten klaarstaan. Je hoeft zelf geen vragenlijsten te maken of data in Excel te kloppen.
            </p>
          </div>

          {/* Vraag 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              2. Ik heb geen HR-achtergrond. Snap ik de rapportages wel?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Absoluut. Je krijgt geen dik boekwerk met complexe statistieken, maar een helder dashboard. We werken met kleuren (groen = goed, oranje = aandacht) en concrete actiepunten in gewone mensentaal. Iedere ondernemer of manager ziet in één oogopslag waar de prioriteiten liggen.
            </p>
          </div>

          {/* Vraag 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              3. Wat als er negatieve of kritische resultaten uitkomen?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Dat is juist waardevol. Liever dat je het nu weet via een dashboard, dan dat je beste mensen onverwacht hun ontslag indienen. Kritiek is geen aanval, maar een kans om bij te sturen voordat het te laat is. Bovendien geeft de tool je direct tips over hoe je dat gesprek aan kunt gaan.
            </p>
          </div>

          {/* Vraag 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              4. Is het wel anoniem? Anders vullen mijn mensen het niet eerlijk in.
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Ja, anonimiteit is heilig. Als medewerkers zich niet veilig voelen, krijg jij geen eerlijke antwoorden. Wij rapporteren daarom alleen op team- of organisatieniveau, nooit op individueel niveau. Niemand in jouw bedrijf kan zien wie wat heeft gezegd.
            </p>
          </div>

          {/* Vraag 5 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
              5. Stel dat ik geen tijd heb voor de opvolging, wat dan?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              De tool geeft je digitale handvatten die je weinig tijd kosten. Heb je liever dat iemand anders de gesprekken voert of de actiepunten oppakt? Dan koppelen we je eenvoudig aan een tijdelijke HR-professional uit ons netwerk. Zo heb je wel de lusten (betere cultuur), maar niet de lasten.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof & Afsluiting */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Reviews */}
          <div className="mb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
                Van onderbuikgevoel naar feitelijk inzicht
              </h2>
              <p className="text-lg text-[var(--kleur-muted)] text-center mb-12 max-w-3xl mx-auto">
                Ontdek hoe directie en HR GroeiRichting inzetten voor grip op de organisatie.
              </p>
              <Reviews />
            </div>
          </div>

          {/* Afsluitende CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-6">
              Klaar om je cultuur te borgen?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                Plan een demo
              </a>
              <Link 
                to="/offerte"
                className="btn btn-secondary"
              >
                Vraag offerte op
              </Link>
            </div>
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

