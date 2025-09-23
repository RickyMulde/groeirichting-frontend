import { Link } from 'react-router-dom'
import {
  BarChart, Smile, MessageCircle,
  Users, Quote, CheckCircle
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import ContactForm from './components/ContactForm'

function Home() {
  return (
    <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Verbind met je mensen. Groei samen verder.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Verzuim en verloop zijn duur. GroeiRichting signaleert vroegtijdig risico's, geeft inzicht in hoe werknemers in de wedstrijd staan en helpt jouw organisatie de juiste richting op te groeien.
          </p>
          
          {/* Bullets */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]">Geen HR-afdeling? Geen probleem. Wij helpen je.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]">Geen statische formulieren, maar interactieve gesprekken met AI.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
              <p className="text-[var(--kleur-muted)]">Van signalen naar samenvattingen en richting.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="btn btn-primary">Plan een demo</button>
            <button className="btn btn-accent">Bekijk een 3‑min demo</button>
          </div>

          {/* Micro-trust */}
          <p className="text-sm text-[var(--kleur-muted)] italic">
            Gebouwd op inzichten uit HR, psychologie en praktijkervaring in het MKB.
          </p>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Het probleem */}
      <section className="bg-gray-50 py-12 px-6 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">De werkelijkheid: het kost meer dan je denkt</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-8">
          Het vervangen van één professional kost maanden en tienduizenden euro's aan inwerken, gemiste output en druk op collega's. Burn‑outtrajecten duren gemiddeld maanden, met hoge kosten per dag verzuim. Ondertussen blijft echte oorzaak vaak onzichtbaar tot het te laat is.
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
        <button className="btn btn-primary">Plan een demo</button>
      </section>

      {/* Meer gesprekken, zonder extra tijd */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Meer gesprekken, zonder extra tijd</h2>
          
          <div className="space-y-6 text-lg text-[var(--kleur-muted)]">
            <p>
              Waarschijnlijk voer je nu één functioneringsgesprek per jaar. Misschien zelfs twee.
            </p>
            
            <p>
              Maar in zes maanden kan er veel gebeuren — óók bij je medewerkers. Stress, motivatie, werkdruk, samenwerking: het verandert sneller dan een jaarlijks gesprek kan bijhouden.
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
              Breid het aantal gesprekken eenvoudig uit, zonder dat het jou of je managers meer tijd kost.
            </p>
            
            <p>
              Het platform laat jouw werknemers/ teamleden gesprekken voeren met AI, in verschillende thema's. Vervolgens verzamelt GroeiRichting input en zet dit om in heldere samenvattingen, signalen en concrete verbeteradviezen.
            </p>
            
            <p>
              Zo krijg je méér feedback en waardevolle signalen, terwijl jij juist minder tijd kwijt bent.
            </p>
               
            <p>
              Bijkomend voordeel: Ook jouw werknemers/ teamleden krijgen concrete vervolgacties om de motivatie te stimuleren en te groeien.
            </p>
          </div>
          
          <div className="text-center mt-8">
            <button className="btn btn-primary">Plan een demo</button>
          </div>
        </div>
      </section>

      {/* Wat levert het op */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4">De waarde van GroeiRichting</h2>
        <p className="text-lg text-[var(--kleur-muted)] text-center mb-8 max-w-3xl mx-auto">
          Ontdek hoe GroeiRichting zowel werkgevers als werknemers helpt om te groeien en te verbeteren
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
                  <p className="font-medium text-[var(--kleur-text)]">Lagere verzuim- en verloopkosten</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Herken signalen van stress en ontevredenheid vóórdat mensen uitvallen of vertrekken.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Betere retentie en betrokkenheid</p>
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
          
          {/* Voor werknemers */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👩‍💼</span>
              <h3 className="text-2xl font-bold text-[var(--kleur-accent)]">Voor werknemers</h3>
            </div>
            <p className="text-[var(--kleur-muted)] mb-6 italic">
              Wat GroeiRichting voor jou betekent
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Echt gehoord worden</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Jouw stem telt, niet alleen tijdens één gesprek maar continu.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Veilig en laagdrempelig</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Je kunt je vrij uitspreken, ook over lastige onderwerpen.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Invloed op werk en toekomst</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Je draagt zelf bij aan verbeteringen en je loopbaanpad.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Tips om te groeien</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Je krijgt persoonlijke suggesties om werkplezier, balans of ontwikkeling te verbeteren.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--kleur-text)]">Meer duidelijkheid en structuur</p>
                  <p className="text-sm text-[var(--kleur-muted)]">Je weet altijd waar gesprekken over gaan en wat ermee gebeurt.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voordelen van GroeiRichting */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">Voordelen van GroeiRichting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Flexibele themastructuur afgestemd op wat er nú speelt</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>AI kan beter doorvragen en werkt drempelverlagend om informatie te delen</p>
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
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4">Twijfels? Logisch.</h2>
          <p className="text-xl text-[var(--kleur-muted)] mb-12">Maar met GroeiRichting zijn ze sneller weg dan je denkt.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Grid item 1 */}
            <div className="bg-[var(--kleur-accent)] bg-opacity-20 p-6 rounded-xl">
              <h3 className="font-semibold text-white mb-3 text-left">"Mijn werknemers willen niet met AI praten."</h3>
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
                Prima, maar er kan veel gebeuren in 6 maanden. Bovendien vertellen medewerkers soms méér tegen AI dan rechtstreeks tegen hun leidinggevende.
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
        <h2 className="text-2xl font-semibold mb-6">GroeiRichting biedt de oplossing</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-6">
          Met thematische gesprekken, AI-ondersteuning en flexibele instellingen geef je richting aan ontwikkeling. Je krijgt als werkgever direct bruikbare input, terwijl medewerkers ervaren dat hun stem telt. Zo ontstaat een gesprekscultuur waarin groei centraal staat.
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
        <h3 className="text-xl font-bold mb-4 text-white">Wil jij werken aan en met een team van gemotiveerde medewerkers die samen het bedrijf willen laten groeien in de richting die jij wilt?</h3>
        <p className="mb-6">Dan start je met GroeiRichting.</p>
        <Link to="/hoe-werkt-het">
          <button className="btn btn-secondary">Hoe werkt het?</button>
        </Link>
      </section>
    </div>
  )
}

export default Home
