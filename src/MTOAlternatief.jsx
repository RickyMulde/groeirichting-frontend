import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  X, CheckCircle, UserPlus, Mail, Zap,
  ArrowRight, Calendar, ShieldCheck, Target, TrendingUp
} from 'lucide-react'
import SEOHead from './components/SEOHead'
import Reviews from './components/Reviews'
import ProcessVisualisation from './components/ProcessVisualisation'
import BrochureDownloadModal from './components/BrochureDownloadModal'

function MTOAlternatief() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)
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
          <div className="order-1 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--kleur-primary)] mb-6 leading-tight">
              Stop met saaie MTO's die in de la belanden.
            </h1>
            <h2 className="text-xl md:text-2xl text-[var(--kleur-muted)] mb-8 font-normal">
              Krijg real-time inzicht in je team en voorkom verloop. Geen maanden wachten, maar direct resultaat.
            </h2>
            
            {/* CTA Buttons */}
            <div className="mb-4 flex flex-wrap gap-4">
              <a
                href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Boek een demo
              </a>
            </div>
            
            {/* Micro-copy */}
            <p className="text-sm text-[var(--kleur-muted)] italic">
              Geen creditcard nodig. Installatie duurt 1 minuut.
            </p>
          </div>
          
          {/* Scrollbaar dashboard screenshot */}
          <div className="flex items-center justify-center md:justify-end order-2 md:order-2">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-xl max-w-md w-full">
              <div className="overflow-y-auto rounded-lg" style={{ maxHeight: '500px' }}>
                <img 
                  src="/thema-overzicht-dashboard.png" 
                  alt="Dashboard overzicht met thema's: Werkdruk & Taaklast, Perspectief & Ontwikkeling, Motivatie en Werkplezier, Samenwerking & Werksfeer"
                  className="w-full h-auto rounded-lg"
                />
              </div>
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
              {/* Kaart 1: Traditioneel MTO */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--kleur-text)]">
                    Traditioneel MTO
                  </h3>
                </div>
                <ul className="space-y-4 text-[var(--kleur-muted)]">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Slechts een jaarlijkse momentopname achteraf</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Ellenlange, statische vragenlijsten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Cijfers zonder de achterliggende oorzaak</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Rapporten die in de lade verdwijnen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Geen directe waarde voor de medewerker</span>
                  </li>
                </ul>
              </div>

              {/* Kaart 2: GroeiRichting */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[var(--kleur-accent)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-[var(--kleur-accent)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--kleur-text)]">
                    GroeiRichting
                  </h3>
                </div>
                <ul className="space-y-4 text-[var(--kleur-muted)]">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Geen momentopname, maar continu inzicht in trends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Geen statische vragenlijst, maar een interactief AI-gesprek</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Ontdek de diepgang en het &apos;waarom&apos; achter het cijfer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Concrete actiepunten om morgen mee aan de slag te gaan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--kleur-accent)] mt-0.5 flex-shrink-0" />
                    <span>Directe meerwaarde en groeitips voor de medewerker zelf</span>
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
              Less is more
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
                  Maak binnen 1 minuut een account aan.
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
                  Nodig medewerkers uit en start direct.
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
            <div className="text-center mt-10">
              <Link
                to="/hoe-werkt-het"
                className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Bekijk het GroeiPortaal
              </Link>
            </div>
          </div>
        </section>

        {/* Resultaat: Een zelfsturende organisatie waar talent blijft. */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Tekst links */}
              <div>
                <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-6">
                  Resultaat: Een zelfsturende organisatie waar talent blijft.
                </h2>
                
                <div className="space-y-8 text-[var(--kleur-muted)] mb-8">
                  {/* Resultaat 1 */}
                  <div>
                    <h4 className="flex items-center gap-3 text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                      <ShieldCheck className="w-6 h-6 flex-shrink-0" />
                      Geen onverwacht vertrek meer
                    </h4>
                    <p className="text-base mb-3">
                      <strong>De situatie:</strong> Je wordt niet meer verrast door het plotselinge vertrek van je beste mensen. Het systeem herkent twijfel en verminderde betrokkenheid in een vroeg stadium.
                    </p>
                    <div className="bg-[var(--kleur-accent)]/10 border-l-4 border-[var(--kleur-accent)] p-4 rounded-r-lg">
                      <p className="text-sm font-semibold text-[var(--kleur-accent)] mb-1">Het voordeel:</p>
                      <p className="text-sm text-[var(--kleur-text)]">Je behoudt kennis en ervaring binnen boord, zonder dat jij continu bezig bent met micromanagement of brandjes blussen.</p>
                    </div>
                  </div>

                  {/* Resultaat 2 */}
                  <div>
                    <h4 className="flex items-center gap-3 text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                      <Target className="w-6 h-6 flex-shrink-0" />
                      Managers pakken hun verantwoordelijkheid
                    </h4>
                    <p className="text-base mb-3">
                      <strong>De situatie:</strong> Je hoeft niet meer te sturen op elk detail. Teamleiders zien in hun eigen dashboard waar de werkdruk of sfeer aandacht vraagt en krijgen concrete handvatten om dit op te lossen.
                    </p>
                    <div className="bg-[var(--kleur-accent)]/10 border-l-4 border-[var(--kleur-accent)] p-4 rounded-r-lg">
                      <p className="text-sm font-semibold text-[var(--kleur-accent)] mb-1">Het voordeel:</p>
                      <p className="text-sm text-[var(--kleur-text)]">Problemen worden opgelost op de werkvloer, zodat jij je kunt focussen op de strategie en de grote lijnen.</p>
                    </div>
                  </div>

                  {/* Resultaat 3 */}
                  <div>
                    <h4 className="flex items-center gap-3 text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                      <TrendingUp className="w-6 h-6 flex-shrink-0" />
                      Een cultuur die rendeert
                    </h4>
                    <p className="text-base mb-3">
                      <strong>De situatie:</strong> Doordat medewerkers zich gehoord voelen, daalt het verzuim en stijgt de productiviteit. Goed werkgeverschap wordt meetbaar en draagt direct bij aan het bedrijfsresultaat.
                    </p>
                    <div className="bg-[var(--kleur-accent)]/10 border-l-4 border-[var(--kleur-accent)] p-4 rounded-r-lg">
                      <p className="text-sm font-semibold text-[var(--kleur-accent)] mb-1">Het voordeel:</p>
                      <p className="text-sm text-[var(--kleur-text)]">Je bespaart aanzienlijk op werving- en verzuimkosten, simpelweg door processen te automatiseren die voorheen tijdrovend waren.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visualisatie rechts */}
              <div className="flex items-center justify-center">
                <ProcessVisualisation />
              </div>
            </div>
            
            {/* Download voorbeeldrapport knop */}
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowBrochureModal(true)}
                className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white px-8 py-4"
              >
                Download voorbeeldrapport
              </button>
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

        {/* FAQ Sectie */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
              Veelgestelde vragen
            </h2>

            {/* Vraag 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
                Is het wel anoniem voor mijn medewerkers?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Absoluut. Veiligheid en vertrouwen staan op 1. Jij ziet de trends en cijfers per team, maar nooit wie wat exact heeft ingevuld. Zo durven medewerkers eerlijk te zijn.
              </p>
            </div>

            {/* Vraag 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
                Vervangt dit mijn jaarlijkse MTO volledig?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Ja, en het verbetert het. Een MTO is een momentopname (foto), GroeiRichting is een continue monitor (film). Je weet dus altijd hoe het gaat, niet alleen in oktober.
              </p>
            </div>

            {/* Vraag 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
                Ik ben geen technische held, is de installatie moeilijk?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Nee, we hebben het 'hufterproof' gemaakt. Je maakt een account, kopieert de e-mailadressen van je team, en zij krijgen vanzelf een uitnodiging. Je bent binnen 5 minuten klaar.
              </p>
            </div>

            {/* Vraag 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
                Wat gebeurt er na de 14 dagen proefperiode?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Niets. Het stopt automatisch. Je zit nergens aan vast en hoeft geen betaalgegevens in te vullen om te starten. Alleen als jij blij bent, praten we verder.
              </p>
            </div>

            {/* Vraag 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-2">
                Is de data veilig (AVG/GDPR)?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Zeker. Al onze data wordt versleuteld opgeslagen op Nederlandse servers en we voldoen aan de strengste AVG-eisen.
              </p>
            </div>
            <div className="text-center pt-6">
              <Link
                to="/hoe-werkt-het"
                className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Bekijk hoe het werkt
              </Link>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/registreer-werkgever" 
                className="btn bg-white text-[var(--kleur-primary)] hover:bg-gray-100 text-lg px-8 md:px-10 py-4 md:py-5 inline-flex items-center gap-2 font-bold shadow-lg"
              >
                Maak nu je gratis account aan
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white text-lg px-8 md:px-10 py-4 md:py-5 inline-flex items-center gap-2 font-bold shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Boek een demo
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Brochure Download Modal */}
      <BrochureDownloadModal 
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
        title="Download voorbeeldrapport"
        description="Vul je gegevens in en we sturen het voorbeeldrapport direct naar je email."
      />
    </>
  )
}

export default MTOAlternatief
