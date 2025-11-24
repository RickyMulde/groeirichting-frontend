import { Link } from 'react-router-dom'
import {
  BarChart, Smile, MessageCircle,
  Users, Quote, CheckCircle
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import ContactForm from './components/ContactForm'
import SEOHead from './components/SEOHead'

function Home() {
  return (
    <>
      <SEOHead 
        title="Medewerkerstevredenheid verbeteren met AI-gesprekken – GroeiRichting"
        description="Versterk de verbinding met je medewerkers en signaleer vroegtijdig wat er speelt. GroeiRichting is hét MTO-alternatief voor meer betrokkenheid, minder verzuim en groei."
        keywords="medewerkerstevredenheid verbeteren, betrokkenheid medewerkers, verzuim terugdringen, MTO alternatief, AI HR, gespreksplatform, werkgeluk"
        canonical="https://groeirichting.nl/"
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Verbind met je mensen. Groei samen verder.
          </h1>
          <h2 className="sr-only">MTO alternatief en AI HR platform voor medewerkerstevredenheid</h2>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Versterk de verbinding met je medewerkers, verhoog de betrokkenheid en stimuleer groei — zonder extra tijd kwijt te zijn.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]">Mis je de échte binding met je medewerkers?</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]">Ontbreekt het je aan tijd om continu in gesprek te blijven?</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]">Heb je te maken met onverwacht verloop of langdurig verzuim?</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link to="/contact" className="btn btn-primary">Plan een vrijblijvend gesprek</Link>
            <Link to="/hoe-werkt-het" className="btn btn-accent">Bekijk hoe het werkt</Link>
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4 text-center">
            Wat is GroeiRichting?
          </h2>
          <p className="text-xl text-[var(--kleur-muted)] mb-8 text-center max-w-3xl mx-auto">
            GroeiRichting biedt een digitaal gesprek- en ontwikkelportaal dat het gat vult tussen een traditioneel MTO en het functioneringsgesprek.
          </p>
          
          <div className="space-y-6 text-lg text-[var(--kleur-muted)] mb-8">
            <p>
              Medewerkers voeren periodiek begeleide gesprekken over werkdruk, motivatie, samenwerking en ontwikkeling.
            </p>
            
            <div className="bg-[var(--kleur-primary)] bg-opacity-10 border-l-4 border-[var(--kleur-primary)] p-6 my-6 rounded-r-lg">
              <p className="text-xl font-semibold text-[var(--kleur-primary)] text-center">
                Je ontvangt diepere inzichten dan bij een MTO, maar het kost minder tijd dan fysieke gesprekken.
              </p>
            </div>
            
            <p>
              In het GroeiPortaal worden gesprekken slim ondersteund door AI. Medewerkers ontvangen persoonlijke samenvattingen en groeisuggesties. Werkgevers krijgen geanonimiseerde trends en signalen per team, waardoor je eerder ziet waar spanning ontstaat, zonder extra HR-tijd.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6 text-center">
              In het kort
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Begeleide gesprekken per thema</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Persoonlijke samenvattingen & groeisuggesties</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Geanonimiseerde trends en signalen per team</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Eerder zicht op risico's in werkdruk, motivatie en samenwerking</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-300">
              <p className="text-center font-semibold text-[var(--kleur-primary)] text-lg">
                Betere gesprekken, minder verrassingen, minder verloop
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/contact" className="btn btn-primary">Plan een vrijblijvend gesprek</Link>
          </div>
        </div>
      </section>

      {/* Meer gesprekken, zonder extra tijd */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Meer gesprekken over werkdruk, motivatie en ontwikkeling — zonder extra tijd</h2>
          
          <div className="space-y-6 text-lg text-[var(--kleur-muted)]">
            <p>
              Waarschijnlijk voer je nu één functioneringsgesprek per jaar, misschien zelfs twee.
            </p>
            
            <p>
              Weet dat er in zes maanden kan er veel gebeuren — óók bij je medewerkers. Stress, motivatie, werkdruk, samenwerking: het verandert sneller dan een jaarlijks gesprek kan bijhouden.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
              <p className="font-medium text-red-800">
                Het risico? Problemen blijven onzichtbaar tot ze groot zijn. Dan kost het je geld, energie en misschien zelfs een waardevolle medewerker.
              </p>
            </div>
            
            <p className="text-center font-semibold text-[var(--kleur-primary)]">
              GroeiRichting voorkomt dat.
            </p>
            
            <p>
              Breid het aantal gesprekken met je medewerkers eenvoudig uit, zodat je op meer momenten signalen kunt oppikken.
            </p>
            
            <p>
              Het GroeiPortaal laat jouw medewerkers AI-ondersteunde gesprekken voeren over thema's als werkdruk & taaklast, motivatie & werkplezier, samenwerking & werksfeer en perspectief & ontwikkeling. Zo ontstaat continu waardevolle input waarmee je als werkgever actief kunt werken aan betrokkenheid vergroten, medewerkerstevredenheid verbeteren en een cultuur van groei en vertrouwen versterken, zonder extra tijd kwijt te zijn.
            </p>
            
            <p>
              Zo krijg je méér feedback en waardevolle signalen, terwijl jij juist minder tijd kwijt bent.
            </p>
               
            <p>
              Bijkomend voordeel: Ook jouw medewerkers/ teamleden krijgen concrete vervolgacties om persoonlijke groei te stimuleren.
            </p>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/hoe-werkt-het" className="btn btn-primary">Bekijk hoe het werkt</Link>
          </div>
        </div>
      </section>

      {/* Het probleem */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">De werkelijkheid: verzuim en verloop kosten meer dan je denkt</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-8">
          Het vervangen van één medewerker kost maanden en tienduizenden euro's aan inwerken, gemiste output en druk op collega's. Burn‑outtrajecten duren gemiddeld maanden, met hoge kosten per dag verzuim. Zonder structurele gesprekken over werkdruk, motivatie en samenwerking blijven de echte oorzaken vaak onzichtbaar en wordt verzuim terugdringen een dure inhaalrace in plaats van een preventieve aanpak.
        </p>
        
        {/* Mini-stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">€ 300</div>
            <p className="text-[var(--kleur-muted)]">per dag verzuimkosten</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">6</div>
            <p className="text-[var(--kleur-muted)]">maanden tot gemiddelde terugkeer bij stress/uitval</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[var(--kleur-primary)] mb-2">46%</div>
            <p className="text-[var(--kleur-muted)]">van medewerkers voelt zich niet structureel gehoord</p>
          </div>
        </div>
        
        {/* CTA */}
        <Link to="/contact" className="btn btn-primary">Plan een vrijblijvend gesprek</Link>
      </section>

      {/* Wat levert het op */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4">Waarin GroeiRichting ondersteunt: meer tevredenheid, minder verloop en verzuim</h2>
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

      {/* Extra CTA blok */}
      <section className="py-12 px-6 text-center bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">Klaar om te beginnen?</h2>
        <p className="text-lg text-[var(--kleur-muted)] mb-8 max-w-2xl mx-auto">
          Ontdek hoe GroeiRichting jouw organisatie kan helpen om medewerkerstevredenheid te verbeteren en een cultuur van groei te creëren.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <Link to="/contact" className="btn btn-primary">Plan vrijblijvend gesprek</Link>
          <Link to="/hoe-werkt-het" className="btn btn-accent">Bekijk hoe het werkt</Link>
          <a href="/brochures/groeirichting-brochure.pdf" download className="btn btn-secondary">Download brochure</a>
        </div>
      </section>

      {/* Voordelen van GroeiRichting */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">Voordelen van GroeiRichting: AI-ondersteunde gesprekken voor betere medewerkerstevredenheid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Flexibele themastructuur afgestemd op wat er nú speelt</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>AI kan concreet doorvragen en werkt drempelverlagend om informatie te delen</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Signalering op individueel én teamniveau</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Volledige controle en instelbaarheid per werkgever of team</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Professionalisering zonder extra HR-capaciteit nodig te hebben</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Een dashboard om beleidskeuzes op te baseren</p>
          </div>
        </div>
      </section>

      {/* Twijfels sectie */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4">Twijfels? Dat is niet nodig!</h2>
          <p className="text-xl text-[var(--kleur-muted)] mb-12">Laat GroeiRichting je overtuigen...</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Grid item 1 */}
            <div className="bg-[var(--kleur-accent)] bg-opacity-20 p-6 rounded-xl">
              <h3 className="font-semibold text-white mb-3 text-left">"Mijn medewerkers willen niet met AI praten."</h3>
              <p className="text-white text-sm text-left">
                Sterker nog, dat doen ze nu al (ChatGPT, Copilot, etc.). Het verschil: met GroeiRichting komt die input bij jou terug als bruikbare inzichten, in plaats van nergens.
              </p>
            </div>
            
            {/* Grid item 2 */}
            <div className="bg-[var(--kleur-accent)] bg-opacity-20 p-6 rounded-xl">
              <h3 className="font-semibold text-white mb-3 text-left">"We gebruiken al MTO-formulieren."</h3>
              <p className="text-white text-sm text-left">
                Goed bezig. Alleen: traditionele medewerkertevredenheidsonderzoeken zijn vaak statische formulieren. Met GroeiRichting worden er gesprekken gevoerd en wordt er doorgevraagd en meer signalen verzameld.
              </p>
            </div>
            
            {/* Grid item 3 */}
            <div className="bg-[var(--kleur-accent)] bg-opacity-20 p-6 rounded-xl">
              <h3 className="font-semibold text-white mb-3 text-left">"We voeren al 2 functioneringsgesprekken per jaar."</h3>
              <p className="text-white text-sm text-left">
                Heel goed, maar er kan veel gebeuren in 6 maanden. Bovendien vertellen medewerkers soms méér tegen AI dan rechtstreeks tegen hun leidinggevende.
              </p>
            </div>
            
            {/* Grid item 4 */}
            <div className="bg-[var(--kleur-accent)] bg-opacity-20 p-6 rounded-xl">
              <h3 className="font-semibold text-white mb-3 text-left">"Weer een extra tool?"</h3>
              <p className="text-white text-sm text-left">
                Behoud van medewerkers is belangrijker dan ooit. Extra gespreksmomenten vergroten de kans dat signalen tijdig boven tafel komen. GroeiRichting maakt dat laagdrempelig en effectief.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-lg font-medium text-[var(--kleur-primary)] mb-8">Heb je nog vragen?</p>
            
            {/* Contactformulier */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* GroeiRichting als oplossing */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">GroeiRichting biedt de oplossing: MTO-alternatief met AI-ondersteuning</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-6">
          Met AI-ondersteunde gesprekken over vaste thema's zoals werkdruk & taaklast, motivatie & werkplezier, samenwerking & werksfeer en perspectief & ontwikkeling, creëer je een gesprekscultuur die helpt om medewerkerstevredenheid structureel te verbeteren en verzuim tijdig te signaleren. Je krijgt als werkgever direct bruikbare input, terwijl medewerkers ervaren dat hun stem telt.
        </p>
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
        <h3 className="text-xl font-bold mb-4 text-white">De beste resultaten bereik je met verbonden, geboeide medewerkers die plezier ervaren bij wat ze doen, GroeiRichting ondersteunt jou hierbij!</h3>
        <Link to="/contact" className="btn btn-secondary">Plan vrijblijvend gesprek</Link>
      </section>
      </div>
    </>
  )
}

export default Home
