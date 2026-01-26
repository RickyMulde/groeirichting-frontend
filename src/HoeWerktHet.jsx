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
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Plan een demo
            </a>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" aria-label="Illustratie van hoe GroeiRichting werkt: AI-gestuurde gesprekken tussen werkgevers en medewerkers" />
      </section>

      {/* Thema's sectie */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--kleur-primary)] mb-4">
            Thema's die je organisatie inzicht geven
          </h2>
          <p className="text-lg text-center text-[var(--kleur-muted)] mb-12">
            Elk thema levert concrete inzichten op waar je direct mee aan de slag kunt.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Werkdruk & taaklast */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                Werkdruk & taaklast
              </h3>
              <p className="text-[var(--kleur-muted)]">
                <strong className="text-[var(--kleur-text)]">Wat het oplevert:</strong> Signaleer vroegtijdig stress en overbelasting. Voorkom verzuim door tijdig in te grijpen.
              </p>
            </div>

            {/* Motivatie & werkplezier */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                Motivatie & werkplezier
              </h3>
              <p className="text-[var(--kleur-muted)]">
                <strong className="text-[var(--kleur-text)]">Wat het oplevert:</strong> Ontdek wat medewerkers motiveert en waar energie vandaan komt. Verhoog betrokkenheid en productiviteit.
              </p>
            </div>

            {/* Samenwerking & werksfeer */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                Samenwerking & werksfeer
              </h3>
              <p className="text-[var(--kleur-muted)]">
                <strong className="text-[var(--kleur-text)]">Wat het oplevert:</strong> Krijg inzicht in teamdynamiek en samenwerking. Verbeter de werksfeer en voorkom conflicten.
              </p>
            </div>

            {/* Perspectief & ontwikkeling */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-3">
                Perspectief & ontwikkeling
              </h3>
              <p className="text-[var(--kleur-muted)]">
                <strong className="text-[var(--kleur-text)]">Wat het oplevert:</strong> Ontdek ontwikkelwensen en loopbaanambities. Behoud talent door gerichte groeimogelijkheden te bieden.
              </p>
            </div>
          </div>

          {/* Maatwerk thema's box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg max-w-4xl mx-auto mb-8">
            <p className="text-[var(--kleur-text)] font-medium">
              Naast deze standaard thema's kun je ook maatwerk thema's toevoegen. Vraag het sjabloon op bij GroeiRichting en we helpen je professioneel bij het opstellen van thema's die perfect aansluiten bij jouw organisatie.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link to="/contact">
              <button className="btn btn-primary">
                Neem contact op
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* GroeiPortaal: jouw aanvulling */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">GroeiPortaal: jouw aanvulling op functioneringsgesprekken</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-[var(--kleur-muted)]">
                Het GroeiPortaal is geen vervanging van het persoonlijke gesprek, maar een hulpmiddel dat medewerkers vaker helpt betere input te geven.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Medewerkers beantwoorden korte, dynamische vragen per thema.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">AI helpt hen om hun gedachten concreter en vollediger op te schrijven.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Je ontvangt heldere samenvattingen en adviezen die je direct kunt gebruiken in je gesprekken.</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="font-medium text-blue-800">
                  👉 Zo bereid je beide kanten beter voor en ontstaan er gesprekken die verder gaan dan een standaard evaluatie.
                </p>
              </div>
            </div>
            
            {/* Chat mockup */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="text-[var(--kleur-primary)]" />
                <h3 className="font-semibold text-[var(--kleur-primary)]">AI-gesprek voorbeeld</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm">Hoe ervaar je je werkdruk de laatste tijd?</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg ml-8">
                  <p className="text-sm">Soms te hoog, vooral op maandagen.</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm">Waardoor voelt het op maandag zwaarder?</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg ml-8">
                  <p className="text-sm">Omdat we dan alle binnengekomen aanvragen van het weekend tegelijk moeten verwerken.</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm">Wat zou helpen om dit beter te laten verlopen?</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg ml-8">
                  <p className="text-sm">Als we iemand die dag extra inzetten of de taken beter verdelen.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Link to="/contact">
              <button className="btn btn-primary">
                Plan demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hoe motiveer je je medewerkers? */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Hoe motiveer je je medewerkers om mee te doen?</h2>
          
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-8">
            De ervaring leert: medewerkers doen graag mee, mits drie dingen duidelijk zijn:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-3">Waarom het wordt gedaan</h3>
              <p className="text-[var(--kleur-muted)]">
                Jij vertelt je team: "We willen meer verbinding, sneller weten wat er speelt, en jullie stem gebruiken om de organisatie te verbeteren."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-3">Hoe het werkt</h3>
              <p className="text-[var(--kleur-muted)]">
                Je laat zien: "Alles wat je deelt blijft anoniem. Alleen samenvattingen komen terug bij ons, nooit jouw persoonlijke antwoorden."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-3">Wat er gebeurt met de uitkomsten</h3>
              <p className="text-[var(--kleur-muted)]">
                Je belooft en laat zien: "We gaan echt iets doen met jullie input en koppelen de resultaten terug."
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-center mb-8">
            <p className="font-medium text-yellow-800">
              Vertrouwen ontstaat niet door beloftes, maar door waarmaken. Daarom hoort terugkoppeling altijd bij het proces.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-primary"
            >
              Download informatiebrochure
            </button>
          </div>
        </div>
      </section>

      {/* Concreet plan van aanpak */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Concreet plan van aanpak</h2>
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-8">
            Zo organiseer je GroeiRichting in jouw bedrijf:
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-2">Kick-off</h3>
                <ul className="space-y-1 text-[var(--kleur-muted)]">
                  <li>• Jij legt uit waarom je dit belangrijk vindt.</li>
                  <li>• GroeiRichting geeft (optioneel) een korte demo of uitleg.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-2">Eerste ronde</h3>
                <ul className="space-y-1 text-[var(--kleur-muted)]">
                  <li>• Medewerkers vullen de vragen in via het portaal (anoniem en in hun eigen tijd, het kost maar enkele minuten).</li>
                  <li>• AI helpt hen betere antwoorden te geven.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-2">Samenvatting & advies</h3>
                <ul className="space-y-1 text-[var(--kleur-muted)]">
                  <li>• Jij krijgt een overzicht met thema's, inzichten en concrete adviezen.</li>
                  <li>• Geen losse opmerkingen, maar direct bruikbare handvatten.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-2">Bespreken & opvolgen</h3>
                <ul className="space-y-1 text-[var(--kleur-muted)]">
                  <li>• Je koppelt terug: "Dit is wat we geleerd hebben, en dit gaan we doen."</li>
                  <li>• Medewerkers zien direct dat hun stem invloed heeft.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-2">Vervolg</h3>
                <ul className="space-y-1 text-[var(--kleur-muted)]">
                  <li>• Herhaal dit twee keer per jaar, bijvoorbeeld in maart en oktober.</li>
                  <li>• Combineer het met je functionerings- of voortgangsgesprekken.</li>
                  <li>• Zo ontstaat een continue cyclus van luisteren → verbeteren → groeien.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Link to="/offerte">
              <button className="btn btn-primary">
                Vraag offerte op
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Waarom medewerkers wel meedoen */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Waarom medewerkers wel meedoen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <Smartphone className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[var(--kleur-text)]">Laagdrempelig</h3>
                <p className="text-[var(--kleur-muted)]">Enkele minuten per ronde, op elk device.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[var(--kleur-text)]">Veilig</h3>
                <p className="text-[var(--kleur-muted)]">Persoonlijke antwoorden zijn nooit zichtbaar voor de werkgever.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[var(--kleur-text)]">Waardevol</h3>
                <p className="text-[var(--kleur-muted)]">Hun input wordt omgezet in concrete verbeteracties.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[var(--kleur-text)]">Vertrouwd</h3>
                <p className="text-[var(--kleur-muted)]">Dit gaat niet over controleren, maar over samen groeien.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <Quote className="text-[var(--kleur-primary)] mx-auto mb-4" size={32} />
            <p className="text-lg italic text-[var(--kleur-muted)] mb-2">
              "Via GroeiRichting durfde ik eerlijker te zijn. In mijn gesprek werd dat opgepakt en verbeterd."
            </p>
            <p className="text-sm text-[var(--kleur-muted)]">– Medewerker pilotbedrijf</p>
          </div>
        </div>
      </section>

      {/* Resultaat voor jou als werkgever */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Resultaat voor jou als werkgever</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Meer en betere input uit je organisatie.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Functioneringsgesprekken die echt ergens over gaan.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Medewerkers die zien dat hun stem telt.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Minder verloop, minder verzuim, meer betrokkenheid.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technische FAQ sectie */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--kleur-primary)] mb-12">
            Veelgestelde vragen over hoe GroeiRichting werkt
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Hoe werkt de AI in GroeiRichting precies?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                De AI in GroeiRichting helpt medewerkers tijdens het gesprek door door te vragen op hun antwoorden. 
                Als een medewerker bijvoorbeeld zegt "de werkdruk is soms te hoog", vraagt de AI automatisch: 
                "Waardoor voelt het zwaarder?" of "Wat zou helpen om dit beter te laten verlopen?". 
                Zo ontstaan diepere, concretere antwoorden zonder dat de medewerker zelf alles moet bedenken.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Hoe lang duurt een gesprek in het GroeiPortaal?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Een gesprek per thema duurt gemiddeld 5-7,5 minuten. Medewerkers kunnen het gesprek op elk moment 
                pauzeren en later verder gaan. Er is geen tijdsdruk en alles gebeurt in hun eigen tempo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Hoe worden de antwoorden van medewerkers verwerkt?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                De AI analyseert alle antwoorden per thema en genereert een persoonlijke samenvatting voor de medewerker 
                met groeisuggesties. Voor werkgevers worden de antwoorden geanonimiseerd en samengevoegd tot trends en 
                signalen per team. Persoonlijke antwoorden zijn nooit zichtbaar voor de werkgever.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Welke thema's kunnen besproken worden?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Standaard thema's zijn: werkdruk & taaklast, motivatie & werkplezier, samenwerking & werksfeer, 
                en perspectief & ontwikkeling. Je kunt als werkgever zelf bepalen welke thema's relevant zijn 
                voor jouw organisatie en wanneer gesprekken plaatsvinden.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Kan ik zelf thema's toevoegen?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Ja, je kunt zelf thema's toevoegen. Vraag hiervoor het sjabloon op om in te vullen bij GroeiRichting. 
                Je wordt hier professioneel ondersteund bij het opstellen van thema's die aansluiten bij jouw organisatie.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Hoe werkt de anonimiteit precies?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Persoonlijke antwoorden van medewerkers zijn volledig privé en nooit zichtbaar voor werkgevers. 
                Alleen geanonimiseerde samenvattingen en trends per team worden gedeeld. Als een team bijvoorbeeld 
                uit 5 personen bestaat, zie je alleen dat "3 van de 5 medewerkers" iets melden, nooit wie specifiek.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Moeten medewerkers een app installeren?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Nee, GroeiRichting werkt volledig via de browser op desktop, tablet of smartphone. 
                Geen app nodig, geen installatie. Medewerkers loggen in via een link en kunnen direct starten.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-[var(--kleur-text)] mb-2 text-lg">
                Wat gebeurt er met de data na een gesprek?
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Medewerkers ontvangen direct na het gesprek een persoonlijke samenvatting met groeisuggesties. 
                Werkgevers krijgen binnen enkele dagen een overzicht met thema's, trends en concrete adviezen. 
                Alle data wordt veilig opgeslagen volgens AVG/GDPR richtlijnen en blijft eigendom van de organisatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Groei begint met luisteren */}
      <section className="bg-[var(--kleur-primary)] py-16 px-6 rounded-xl text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Groei begint met luisteren</h2>
          <p className="text-xl mb-8 opacity-90">
            Met het GroeiPortaal maak je van één moment per jaar een continue dialoog.<br />
            Niet in plaats van persoonlijk contact, maar als versterking ervan.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <p className="text-lg font-medium">
              👉 Wacht niet langer en breng je organisatie direct in beeld.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="btn bg-white text-[var(--kleur-primary)] hover:bg-gray-100"
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

export default HoeWerktHet
