import { useState } from 'react'
import {
  BarChart, Smile, MessageCircle,
  Users, CheckCircle, X,
  ShieldCheck, Target, TrendingUp, Calendar,
  Bot, Bell
} from 'lucide-react'

import ContactForm from './components/ContactForm'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'
import ProcessVisualisation from './components/ProcessVisualisation'
import Reviews from './components/Reviews'

function Home() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Stop met brandjes blussen. Start weer met ondernemen!"
        description="Je bedrijf groeit, maar je tijd wordt opgeslokt door brandjes blussen. Met GroeiRichting breng je bloot waar de brandhaarden zitten en krijg je hapklare oplossingen. Voor scale-up ondernemers die weer willen bouwen."
        keywords="scale-up ondernemer, organisatiecultuur, personeelsgedoe, DGA, brandjes blussen, medewerkerstevredenheid, verloop verzuim, GroeiRichting, HR-capaciteit"
        canonical="https://groeirichting.nl/"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "GroeiRichting",
              "url": "https://groeirichting.nl",
              "logo": "https://groeirichting.nl/Logo.svg",
              "description": "Wij bevrijden de scale-up ondernemer van de rol van fulltime brandweerman. We geven de controle over de organisatiecultuur terug, zodat de DGA weer kan bouwen aan het bedrijf in plaats van opgeslokt te worden door personeelsgedoe.",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "rick@groeirichting.nl",
                "telephone": "+31-85-060-7424",
                "availableLanguage": "Dutch",
                "areaServed": "NL"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Schutstraat 145",
                "addressLocality": "Hoogeveen",
                "addressCountry": "NL"
              },
              "sameAs": [
                "https://linkedin.com/company/groeirichting"
              ]
            },
            {
              "@type": "SoftwareApplication",
              "name": "GroeiRichting",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "description": "Persoonlijke offerte op maat"
              },
              "description": "De meting: AI-gesprekken met medewerkers op vaste momenten. De diepgang: echt gesprek in plaats van statische vragenlijst. De analyse: waarom achter het cijfer, haarscherp rapport met uitvoerbare adviezen. De oplossing: HR-capaciteit om brandhaarden daadwerkelijk te blussen.",
              "featureList": [
                "AI-gesprekken met medewerkers op vaste momenten (de meting)",
                "Echt gesprek in plaats van statische vragenlijst — eerlijke waarheid boven tafel",
                "Haarscherp rapport met direct uitvoerbare adviezen (de analyse)",
                "HR-capaciteit om brandhaarden uit de meting daadwerkelijk te blussen",
                "Krijg je handen vrij: focus terug op strategie",
                "Werk aan je bedrijf in plaats van in je bedrijf",
                "Signaleer verloop- en verzuimrisico's vóór ze roadmap en winstgevendheid saboteren",
                "Privacy-first: AVG-proof met anonieme rapportages"
              ],
              "keywords": "scale-up ondernemer, organisatiecultuur, brandjes blussen, DGA, medewerkerstevredenheid, verloop verzuim, HR-capaciteit, GroeiRichting",
              "screenshot": "https://groeirichting.nl/Logo.svg",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1",
                "bestRating": "5",
                "worstRating": "1"
              },
              "provider": {
                "@type": "Organization",
                "name": "GroeiRichting B.V."
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
                }
              ]
            }
          ]
        }}
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Stop met brandjes blussen. Start weer met ondernemen!
          </h1>
          <h2 className="sr-only">GroeiRichting: controle over organisatiecultuur voor scale-up ondernemers</h2>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
          Je bedrijf groeit, maar je tijd wordt steeds opgeslokt door het blussen van brandjes. Met GroeiRichting breng je direct bloot waar de brandhaarden zitten en worden hapklare oplossingen voorgeschoteld.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Krijg je handen weer vrij:</strong> Stop met het managen van individuele irritaties en krijg je focus terug op de strategie.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Werk aan je bedrijf in plaats van in je bedrijf:</strong> Verschuif van reactief brandjes blussen naar proactief bouwen aan een schaalbaar team.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Voorkom de &apos;Groei-Stagnatie&apos;:</strong> Signaleer verloop- en verzuimrisico&apos;s voordat ze je roadmap en je winstgevendheid saboteren.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              type="button"
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-primary"
            >
              Download voorbeeldrapport
            </button>
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

          {/* Micro-trust */}
          <p className="text-sm text-[var(--kleur-muted)] italic">
            Ook maatwerkthema&apos;s mogelijk voor specifieke events/informatiebehoefte.
          </p>
        </div>
        <img src="/performance.svg" alt="" className="w-full h-auto" />
      </section>

      {/* De Confrontatie: Brandweerman vs. Ondernemer */}
      <section className="py-12 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4">
              Herken je dit? De &apos;Scale-up Trap&apos;.
            </h2>
            <p className="text-lg text-[var(--kleur-muted)] max-w-2xl mx-auto">
              Hoe harder je groeit, hoe meer je agenda wordt gegijzeld door personeelsgedoe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* De Huidige Situatie */}
            <div className="rounded-xl p-8 shadow-lg border-2 border-red-100 bg-red-50">
              <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                <X className="w-6 h-6 flex-shrink-0" /> Nu: De Brandweerman
              </h3>
              <ul className="space-y-4 text-red-900/80">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Je bent teveel bezig met brandjes blussen.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Je loopt continu achter de feiten aan.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  De groei van je bedrijf komt in gevaar.
                </li>
              </ul>
            </div>

            {/* De GroeiRichting Situatie */}
            <div className="rounded-xl p-8 shadow-lg border-2 border-[var(--kleur-accent)] bg-teal-50">
              <h3 className="text-xl font-bold text-teal-700 mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 flex-shrink-0" /> Met GroeiRichting: De Architect
              </h3>
              <ul className="space-y-4 text-teal-900/80">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  Je hebt de regie terug en focust weer op je groeistrategie.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  Brandhaarden worden geblust voordat ze schade aanrichten.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  Je bouwt op data en feiten, niet op onderbuikgevoel.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Van onrust naar inzicht. Van inzicht naar rust. */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            Van onrust naar inzicht. Van inzicht naar rust.
          </h2>
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-8 max-w-3xl mx-auto">
            Je onderbuikgevoel heeft je ver gebracht, maar schaalt niet meer mee met je team. Die vage twijfel op de achtergrond is onrust geworden. Wij maken die onrust concreet, zodat je weer met een gerust hart kunt sturen op feiten.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <Bot className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Stap 1: De Onrust wegnemen <span className="font-normal text-[var(--kleur-muted)]">(De Uitvoering)</span>
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Jij hoeft niet meer te gissen of zelf de lastige gesprekken te voeren. Onze AI-methode regelt het volledige proces en haalt de ongefilterde waarheid boven tafel die jij niet meer voelt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <MessageCircle className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Stap 2: Het Inzicht krijgen <span className="font-normal text-[var(--kleur-muted)]">(Het Dashboard)</span>
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Geen vage verhalen bij het koffiezetapparaat, maar harde data. In één oogopslag zie je de blinde vlekken en brandhaarden die jouw groei op dit moment saboteren.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative p-3 rounded-xl flex-shrink-0 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 shadow-sm">
                  <Bell className="w-6 h-6 text-[var(--kleur-accent)] drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Stap 3: De Rust herstellen <span className="font-normal text-[var(--kleur-muted)]">(De Actie)</span>
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Inzicht is het begin van rust. Zodra de feiten op tafel liggen, ben jij weer in control. Je stopt met reactief brandjes blussen en krijgt de ruimte om weer te bouwen aan de toekomst van je bedrijf.
                  </p>
                </div>
              </div>
            </div>

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

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button
              type="button"
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-accent"
            >
              Download voorbeeldrapport
            </button>
          </div>
        </div>
      </section>

      {/* Traditioneel MTO vs. GroeiRichting */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Waarom ouderwetse MTO&apos;s niet meer werken
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
          <div className="text-center mt-10">
            <a
              href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Boek een demo
            </a>
          </div>
        </div>
      </section>

      {/* Start met een nulmeting, groei door met een systeem. */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Tekst links */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4">
                Start met een nulmeting, groei door met een systeem.
              </h2>
              <p className="text-lg text-[var(--kleur-muted)] mb-8">
                Inzicht biedt direct rust. Door de blinde vlekken in kaart te brengen, pak jij de regie terug en bouw je aan je bedrijf in plaats van dat je brandjes blust.
              </p>
              
              <div className="space-y-8 text-[var(--kleur-muted)] mb-8">
                {/* De Nulmeting */}
                <div>
                  <h4 className="flex items-center gap-3 text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                    <ShieldCheck className="w-6 h-6 flex-shrink-0" />
                    De Nulmeting <span className="font-normal text-[var(--kleur-muted)]">(Directe Rust)</span>
                  </h4>
                  <p className="text-base">
                    Stop de onrust en lokaliseer binnen 2 weken alle brandhaarden. Krijg een feitelijk dashboard van je volledige organisatiecultuur, zodat je precies weet waar je moet beginnen.
                  </p>
                </div>

                {/* Onboarding-check */}
                <div>
                  <h4 className="flex items-center gap-3 text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                    <Target className="w-6 h-6 flex-shrink-0" />
                    Onboarding-check <span className="font-normal text-[var(--kleur-muted)]">(Borging bij Groei)</span>
                  </h4>
                  <p className="text-base">
                    Voorkom dat je nieuw personeel voor niks inwerkt. Onze AI meet na 90 dagen of nieuwe talenten echt landen. Zo voorkom je dat kostbaar talent via de achterdeur vertrekt terwijl jij opschaalt.
                  </p>
                </div>

                {/* Ontwikkelgesprekken */}
                <div>
                  <h4 className="flex items-center gap-3 text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                    <TrendingUp className="w-6 h-6 flex-shrink-0" />
                    Ontwikkelgesprekken <span className="font-normal text-[var(--kleur-muted)]">(Continu Behoud)</span>
                  </h4>
                  <p className="text-base">
                    Je wilt het maximale uit je medewerkers halen. Vraag ze ernaar en ze blijven vaak stil. Bereid je medewerkers voor op het fysieke ontwikkelgesprek, door een voorbereidingsgesprek met AI te laten voeren.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Visualisatie rechts */}
            <div className="flex items-center justify-center">
              <ProcessVisualisation />
            </div>
          </div>
          
          {/* CTA: Boek een demo */}
          <div className="text-center mt-8">
            <a
              href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white px-8 py-4 inline-flex items-center gap-2 justify-center"
            >
              <Calendar className="w-5 h-5" />
              Boek een demo
            </a>
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

      {/* Heb je nog vragen? */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium text-[var(--kleur-primary)] mb-8">Heb je nog vragen?</p>
          <ContactForm />
        </div>
      </section>

      {/* Eindkreet */}
      <section className="bg-[var(--kleur-primary)] text-white py-8 text-center rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-white">De beste resultaten bereik je met verbonden, geboeide medewerkers die plezier ervaren bij wat ze doen. GroeiRichting ondersteunt jou hierbij!</h3>
        <div className="flex justify-center">
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

export default Home
