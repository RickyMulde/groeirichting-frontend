import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle, Users, MessageCircle, BarChart,
  Smartphone, Shield, TrendingUp, Quote, ArrowRight, Calendar
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'

function HoeWerktHet() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Hoe Werkt GroeiRichting - AI-Gestuurde Gesprekken"
        description="Ontdek stap voor stap hoe GroeiRichting werkt. Van registratie tot AI-gestuurde gesprekken tussen werkgevers en medewerkers. Eenvoudig, veilig en effectief."
        keywords="hoe werkt groeirichting, AI gesprekken uitleg, werkgever medewerker gesprekken, AI HR proces, gespreksvoering stappen"
        canonical="https://groeirichting.nl/hoe-werkt-het"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HowTo",
              "name": "Hoe werkt GroeiRichting",
              "description": "Stap-voor-stap uitleg hoe je GroeiRichting gebruikt voor AI-gestuurde gesprekken tussen werkgevers en medewerkers",
              "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Kick-off",
              "text": "Jij legt uit waarom je dit belangrijk vindt. GroeiRichting geeft (optioneel) een korte demo of uitleg."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Eerste ronde",
              "text": "Medewerkers vullen de vragen in via het portaal (anoniem en in hun eigen tijd, het kost maar enkele minuten). AI helpt hen betere antwoorden te geven."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Samenvatting & advies",
              "text": "Jij krijgt een overzicht met thema's, inzichten en concrete adviezen. Geen losse opmerkingen, maar direct bruikbare handvatten."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Bespreken & opvolgen",
              "text": "Je koppelt terug: 'Dit is wat we geleerd hebben, en dit gaan we doen.' Medewerkers zien direct dat hun stem invloed heeft."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Vervolg",
              "text": "Herhaal dit twee keer per jaar, bijvoorbeeld in maart en oktober. Combineer het met je functionerings- of voortgangsgesprekken. Zo ontstaat een continue cyclus van luisteren → verbeteren → groeien."
            }
          ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Hoe werkt de AI in GroeiRichting precies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "De AI in GroeiRichting helpt medewerkers tijdens het gesprek door door te vragen op hun antwoorden. Als een medewerker bijvoorbeeld zegt 'de werkdruk is soms te hoog', vraagt de AI automatisch: 'Waardoor voelt het zwaarder?' of 'Wat zou helpen om dit beter te laten verlopen?'. Zo ontstaan diepere, concretere antwoorden zonder dat de medewerker zelf alles moet bedenken."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hoe lang duurt een gesprek in het GroeiPortaal?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Een gesprek per thema duurt gemiddeld 5-7,5 minuten. Medewerkers kunnen het gesprek op elk moment pauzeren en later verder gaan. Er is geen tijdsdruk en alles gebeurt in hun eigen tempo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hoe worden de antwoorden van medewerkers verwerkt?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "De AI analyseert alle antwoorden per thema en genereert een persoonlijke samenvatting voor de medewerker met groeisuggesties. Voor werkgevers worden de antwoorden geanonimiseerd en samengevoegd tot trends en signalen per team. Persoonlijke antwoorden zijn nooit zichtbaar voor de werkgever."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welke thema's kunnen besproken worden?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Standaard thema's zijn: werkdruk & taaklast, motivatie & werkplezier, samenwerking & werksfeer, en perspectief & ontwikkeling. Je kunt als werkgever zelf bepalen welke thema's relevant zijn voor jouw organisatie en wanneer gesprekken plaatsvinden."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kan ik zelf thema's toevoegen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, je kunt zelf thema's toevoegen. Vraag hiervoor het sjabloon op om in te vullen bij GroeiRichting. Je wordt hier professioneel ondersteund bij het opstellen van thema's die aansluiten bij jouw organisatie."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hoe werkt de anonimiteit precies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Persoonlijke antwoorden van medewerkers zijn volledig privé en nooit zichtbaar voor werkgevers. Alleen geanonimiseerde samenvattingen en trends per team worden gedeeld. Als een team bijvoorbeeld uit 5 personen bestaat, zie je alleen dat '3 van de 5 medewerkers' iets melden, nooit wie specifiek."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Moeten medewerkers een app installeren?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nee, GroeiRichting werkt volledig via de browser op desktop, tablet of smartphone. Geen app nodig, geen installatie. Medewerkers loggen in via een link en kunnen direct starten."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wat gebeurt er met de data na een gesprek?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Medewerkers ontvangen direct na het gesprek een persoonlijke samenvatting met groeisuggesties. Werkgevers krijgen binnen enkele dagen een overzicht met thema's, trends en concrete adviezen. Alle data wordt veilig opgeslagen volgens AVG/GDPR richtlijnen en blijft eigendom van de organisatie."
                  }
                }
              ]
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
                  "name": "Hoe werkt het",
                  "item": "https://groeirichting.nl/hoe-werkt-het"
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
            Meet direct hoe jouw organisatie er voor staat
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Per team. Per thema. Concrete inzichten die je direct kunt gebruiken.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg">
            <p className="text-[var(--kleur-text)] font-medium">
              Geen traditioneel MTO met vage uitkomsten die niet worden opgevolgd, maar concrete inzichten waar je direct iets mee kunt.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-primary"
            >
              Download informatiebrochure
            </button>
            <a
              href="https://calendar.app.google/nBkzwXbFmVLCUpKk7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Plan een demo
            </a>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" aria-label="Illustratie van hoe GroeiRichting werkt: AI-gestuurde gesprekken tussen werkgevers en medewerkers" />
      </section>

      {/* ... rest of original content ... */}
      </div>
      <BrochureDownloadModal 
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
      />
    </>
  )
}

export default HoeWerktHet
