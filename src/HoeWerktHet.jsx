import { Link } from 'react-router-dom'
import {
  CheckCircle, Users, MessageCircle, BarChart,
  Smartphone, Shield, TrendingUp, Quote, ArrowRight
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'

function HoeWerktHet() {
  return (
    <>
      <SEOHead 
        title="Hoe Werkt GroeiRichting - AI-Gestuurde Gesprekken"
        description="Ontdek stap voor stap hoe GroeiRichting werkt. Van registratie tot AI-gestuurde gesprekken tussen werkgevers en werknemers. Eenvoudig, veilig en effectief."
        keywords="hoe werkt groeirichting, AI gesprekken uitleg, werkgever werknemer gesprekken, AI HR proces, gespreksvoering stappen"
        canonical="https://groeirichting.nl/hoe-werkt-het"
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Meer inzicht, betere gesprekken, sterkere teams
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Transformeer je jaarlijkse functioneringsgesprek in een doorlopende dialoog die direct resultaat oplevert.
          </p>
          
          <button className="btn btn-primary">Start met één team gratis</button>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Herken je dit? */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Herken je dit?</h2>
          
          <div className="space-y-4 text-lg text-[var(--kleur-muted)] mb-8">
            <p>Je wilt meer binding met je werknemers.</p>
            <p>Je wilt eerder weten wat er speelt, zodat je problemen voorkomt in plaats van achteraf oplost.</p>
            <p>Nu voer je één of twee functioneringsgesprekken per jaar, maar eigenlijk voel je: dit is niet genoeg.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <p className="text-lg font-medium text-[var(--kleur-primary)]">
              Met het GroeiPortaal van GroeiRichting maak je die gesprekken rijker, persoonlijker en waardevoller — zonder dat het jou of je team extra tijd kost.
            </p>
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
                  <p className="text-[var(--kleur-muted)]">Werknemers beantwoorden korte, dynamische vragen per thema.</p>
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
        </div>
      </section>

      {/* Hoe motiveer je je werknemers? */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Hoe motiveer je je werknemers om mee te doen?</h2>
          
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-8">
            De ervaring leert: werknemers doen graag mee, mits drie dingen duidelijk zijn:
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
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-center">
            <p className="font-medium text-yellow-800">
              Vertrouwen ontstaat niet door beloftes, maar door waarmaken. Daarom hoort terugkoppeling altijd bij het proces.
            </p>
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
        </div>
      </section>

      {/* Waarom werknemers wel meedoen */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Waarom werknemers wel meedoen</h2>
          
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
              👉 Start met één team gratis en ervaar hoe het werkt.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-[var(--kleur-primary)] hover:bg-gray-100">
              Start met één team gratis
            </button>
            <button className="btn border-2 border-white text-white hover:bg-white hover:text-[var(--kleur-primary)]">
              Plan een demo
            </button>
          </div>
        </div>
      </section>

      </div>
    </>
  )
}

export default HoeWerktHet
