import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import SEOHead from './components/SEOHead'
import ContactForm from './components/ContactForm'

function Offerte() {

  return (
    <>
      <SEOHead 
        title="Investeer in groei, niet in vinkjes - GroeiRichting"
        description="Veel organisaties besteden duizenden euro's per jaar aan consultants. Met GroeiPortaal haal je deze expertise in huis, maar dan continu en digitaal."
        keywords="offerte groeirichting, consultant alternatief, AI interviewer, medewerkerstevredenheid, groeiportaal"
        canonical="https://groeirichting.nl/offerte"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "serviceType": "AI-gestuurde gespreksplatform voor medewerkerstevredenheid",
              "provider": {
                "@type": "Organization",
                "name": "GroeiRichting B.V.",
                "url": "https://groeirichting.nl",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+31-85-060-7424",
                  "contactType": "customer service",
                  "email": "rick@groeirichting.nl",
                  "availableLanguage": "Dutch"
                }
              },
              "areaServed": "NL",
              "description": "GroeiRichting biedt een digitaal gesprek- en ontwikkelportaal dat het gat vult tussen een traditioneel MTO en het functioneringsgesprek. Medewerkers voeren periodiek begeleide gesprekken over werkdruk, motivatie, samenwerking en ontwikkeling.",
              "offers": {
                "@type": "Offer",
                "description": "Persoonlijke offerte op maat, afhankelijk van aantal medewerkers en gewenste functionaliteiten"
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
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Offerte",
                  "item": "https://groeirichting.nl/offerte"
                }
              ]
            }
          ]
        }}
      />
      <div className="max-w-4xl mx-auto space-y-12 py-12">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--kleur-primary)] mb-6">
            Investeer in groei, niet in vinkjes.
          </h1>
        </div>

        {/* Body tekst */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-[var(--kleur-text)] mb-6 leading-relaxed">
            Veel organisaties besteden duizenden euro's per jaar aan consultants om te achterhalen waarom teams vastlopen of medewerkers vertrekken. Met GroeiPortaal haal je deze expertise in huis, maar dan continu en digitaal.
          </p>
          <p className="text-lg text-[var(--kleur-text)] mb-8 leading-relaxed">
            Onze AI-interviewer voert de gesprekken waar leidinggevenden geen tijd voor hebben, analyseert de kernoorzaken en levert direct toepasbaar advies.
          </p>
        </div>

        {/* Onze belofte */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[var(--kleur-primary)]/20">
          <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-6">
            Onze belofte:
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
              <p className="text-lg text-[var(--kleur-text)]">
                <strong>Diepgang van een consultant, snelheid van software.</strong>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
              <p className="text-lg text-[var(--kleur-text)]">
                <strong>Geen uurtje-factuurtje, maar een vast bedrag per medewerker.</strong>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
              <p className="text-lg text-[var(--kleur-text)]">
                <strong>Direct inzicht, geen lange implementatie.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Sectie - Twee keuzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Blok Links: De Veilige Route (Pilot) */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[var(--kleur-primary)]/20 hover:border-[var(--kleur-primary)]/40 transition-all flex flex-col">
            <h3 className="text-2xl font-bold text-[var(--kleur-primary)] mb-3">
              Ervaar het eerst zelf
            </h3>
            <p className="text-lg text-[var(--kleur-muted)] mb-6 flex-grow">
              Wil je zien hoe de AI doorvraagt en welk advies eruit rolt? Start een gratis pilot met één team.
            </p>
            <Link 
              to="/registreer-werkgever"
              className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 justify-center mt-auto"
            >
              Start Gratis Pilot
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Blok Rechts: De Zakelijke Route (Offerte) */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[var(--kleur-accent)]/20 hover:border-[var(--kleur-accent)]/40 transition-all flex flex-col">
            <h3 className="text-2xl font-bold text-[var(--kleur-accent)] mb-3">
              Direct een voorstel op maat
            </h3>
            <p className="text-lg text-[var(--kleur-muted)] mb-6 flex-grow">
              Benieuwd naar de investering voor de hele organisatie? Wij maken graag een passend voorstel, inclusief opties voor maatwerkthema's.
            </p>
            <Link 
              to="/contact"
              className="btn btn-accent text-lg px-8 py-4 inline-flex items-center gap-2 justify-center mt-auto"
            >
              Vraag Voorstel Aan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* FAQ & Contact Sectie */}
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kolom 1: FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-6">
                Goed om te weten
              </h2>
              <div className="space-y-6">
                {/* Vraag 1 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[var(--kleur-text)] mb-3">
                    1. Kost de implementatie veel tijd?
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Nee. Omdat GroeiPortaal geen zware software-installatie vereist, kunnen we vaak binnen 24 uur live zijn. Wij richten de omgeving in, jij hoeft alleen de medewerkerslijst aan te leveren.
                  </p>
                </div>

                {/* Vraag 2 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[var(--kleur-text)] mb-3">
                    2. Is de data echt anoniem?
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Absoluut. Dit is essentieel voor eerlijke antwoorden. De AI analyseert patronen en trends, maar deelt nooit wie wat specifiek heeft gezegd met de leidinggevende. Privacy en AVG-compliance staan op 1.
                  </p>
                </div>

                {/* Vraag 3 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[var(--kleur-text)] mb-3">
                    3. Is GroeiRichting een MTO?
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Nee, het is een verbeterde vorm van een medewerkertevredenheidsonderzoek (MTO). GroeiRichting geeft ook aan waar het misgaat én hoe het opgelost kan worden.
                  </p>
                </div>

                {/* Vraag 4 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-[var(--kleur-text)] mb-3">
                    4. Zit ik direct vast aan een lang contract?
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Nee. We geloven in onze waarde. Je kunt starten met een vrijblijvende Pilot. Besluit je door te gaan? Dan werken we met transparante licenties die meebewegen met de grootte van je organisatie.
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 2: Contactformulier */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-6">
                Stuur een bericht
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Offerte
