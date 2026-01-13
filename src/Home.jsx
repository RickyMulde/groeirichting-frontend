import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Smile, MessageCircle,
  Users, Quote, CheckCircle,
  ShieldCheck, Target, TrendingUp
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import ContactForm from './components/ContactForm'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'
import ProcessVisualisation from './components/ProcessVisualisation'

function Home() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Medewerkerstevredenheid verbeteren met AI-gesprekken"
        description="Versterk de verbinding met je medewerkers en signaleer vroegtijdig wat er speelt. GroeiRichting is hét MTO-alternatief voor meer betrokkenheid, minder verzuim en groei."
        keywords="medewerkerstevredenheid verbeteren, betrokkenheid medewerkers, verzuim terugdringen, MTO alternatief, AI HR, gespreksplatform, werkgeluk"
        canonical="https://groeirichting.nl/"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "GroeiRichting",
              "url": "https://groeirichting.nl",
              "logo": "https://groeirichting.nl/Logo.svg",
              "description": "AI-gestuurde gesprekken voor werkgevers en werknemers om samen te groeien. MTO-alternatief voor meer betrokkenheid, minder verzuim en groei.",
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
              "description": "AI-gestuurde gespreksplatform voor medewerkerstevredenheid. Digitaal gesprek- en ontwikkelportaal dat het gat vult tussen een traditioneel MTO en het functioneringsgesprek.",
              "featureList": [
                "AI-gestuurde gesprekken over werkdruk, motivatie, samenwerking en ontwikkeling",
                "Persoonlijke samenvattingen en groeisuggesties voor medewerkers",
                "Geanonimiseerde trends en signalen per team voor werkgevers",
                "Vroege signalering van risico's in werkdruk, motivatie en samenwerking",
                "MTO-alternatief met meer diepgang en minder tijd",
                "Privacy-first: AVG-proof met anonieme rapportages",
                "Begeleide gesprekken per thema",
                "Dashboard met inzichten per team en rol"
              ],
              "keywords": "medewerkerstevredenheid, MTO alternatief, AI HR, gespreksplatform, werkgeluk, betrokkenheid medewerkers, verzuim terugdringen, medewerkerstevredenheid verbeteren, AI gesprekken, HR software, personeelsgesprekken",
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
            Krijg grip op wat er écht speelt in je teams.
          </h1>
          <h2 className="sr-only">MTO alternatief en AI HR platform voor medewerkerstevredenheid</h2>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
          Traditionele statische MTO's geven cijfers, GroeiRichting geeft de oorzaken. Of je nu al meet of net begint: De GroeiScan verandert onderbuikgevoel direct in een concreet verbeterplan per thema.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Behoud je beste mensen:</strong> Zie direct wie er dreigt af te haken en waarom.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Verlaag verzuimkosten:</strong> Grijp in bij hoge werkdruk voordat iemand uitvalt.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Verhoog productiviteit:</strong> Een betrokken team werkt harder en efficiënter.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link to="/voor-directie-en-office" className="btn btn-primary">Voor Directie en Office</Link>
            <Link to="/voor-hr-professionals" className="btn btn-accent">Voor HR-professionals</Link>
          </div>

          {/* Micro-trust */}
          <p className="text-sm text-[var(--kleur-muted)] italic">
            Ook maatwerkthema's mogelijk voor specifieke events/informatiebehoefte.
          </p>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Wat is GroeiRichting? */}
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
        </div>
      </section>

      {/* Kies je Winst */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
            GroeiRichting werkt voor de hele organisatie.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Blok 1: Directie & Office */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[var(--kleur-primary)]/20 hover:border-[var(--kleur-primary)]/40 transition-all">
              <h3 className="text-2xl font-bold text-[var(--kleur-primary)] mb-4">
                Ik wil zakelijk rendement en rust.
              </h3>
              <p className="text-lg text-[var(--kleur-muted)] mb-6">
                Je wilt geen gedoe, maar een bedrijf dat loopt. Verlaag verzuimkosten, behoud je beste mensen en borg de cultuur, zonder dat het jou extra tijd kost.
              </p>
              <Link to="/voor-directie-en-office" className="btn btn-primary inline-flex items-center gap-2">
                Bekijk de zakelijke voordelen
                <span>→</span>
              </Link>
            </div>

            {/* Blok 2: HR-Professionals */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[var(--kleur-accent)]/20 hover:border-[var(--kleur-accent)]/40 transition-all">
              <h3 className="text-2xl font-bold text-[var(--kleur-accent)] mb-4">
                Ik wil strategische impact met data.
              </h3>
              <p className="text-lg text-[var(--kleur-muted)] mb-6">
                Je wilt af van de administratie en de diepte in. Krijg de tools en data om de directie te overtuigen en lijnmanagers te activeren.
              </p>
              <Link to="/voor-hr-professionals" className="btn btn-accent inline-flex items-center gap-2">
                Bekijk de HR-oplossing
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heb je nog vragen? */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium text-[var(--kleur-primary)] mb-8">Heb je nog vragen?</p>
          <ContactForm />
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[var(--kleur-accent)] text-white p-8 rounded-xl text-center">
        <Quote className="w-8 h-8 mx-auto mb-4" />
        <p className="text-lg italic max-w-2xl mx-auto">
          "Sinds we met GroeiRichting werken, hebben we écht inzicht in wat er speelt. We kunnen nu preventief handelen."
        </p>
        <p className="mt-4 font-medium">– HR-manager in de zorg</p>
      </section>

      {/* Eindkreet */}
      <section className="bg-[var(--kleur-primary)] text-white py-8 text-center rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-white">De beste resultaten bereik je met verbonden, geboeide medewerkers die plezier ervaren bij wat ze doen. GroeiRichting ondersteunt jou hierbij!</h3>
        <Link to="/contact" className="btn btn-secondary">Plan vrijblijvend gesprek</Link>
      </section>
      </div>

      {/* Brochure Download Modal */}
      <BrochureDownloadModal 
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
      />
    </>
  )
}

export default Home
