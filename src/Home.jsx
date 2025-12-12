import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Smile, MessageCircle,
  Users, Quote, CheckCircle
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
              <p className="text-[var(--kleur-muted)]"><strong>Van cijfers naar oorzaken:</strong> Geen statische vinkjes, maar een dynamisch gesprek dat tot de kern komt.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Geen dikke rapporten:</strong> Krijg direct een kant-en-klare agenda voor het goede gesprek.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]"><strong>Continu grip:</strong> Niet één meetmoment, maar een vast ritme van inzicht en verbetering.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link to="/voor-directie-en-office" className="btn btn-primary">Voor Directie en Office</Link>
            <Link to="/voor-hr-professionals" className="btn btn-accent">Voor HR-professionals</Link>
          </div>

          {/* Micro-trust */}
          <p className="text-sm text-[var(--kleur-muted)] italic">
            Gebouwd op inzichten uit HR, psychologie en praktijkervaring in het MKB.
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
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/voor-directie-en-office" className="btn btn-primary">Voor Directie en Office</Link>
                <Link to="/voor-hr-professionals" className="btn btn-accent">Voor HR-professionals</Link>
              </div>
            </div>
            
            {/* Visualisatie rechts */}
            <div className="flex items-center justify-center">
              <ProcessVisualisation />
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
