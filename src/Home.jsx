
import {
  BarChart, Smile, MessageCircle,
  LogIn, Users, BarChartBig, Quote
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import StepsIllustratie from './assets/steps.svg?react'

function Home() {
  return (
    <div className="space-y-24">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-kleur-primary mb-4">
            Tussen functioneringsgesprek en medewerkertevredenheidsonderzoek in.
          </h1>
          <p className="text-lg text-kleur-muted mb-6">
            GroeiRichting helpt organisaties signalen op te vangen, betere gesprekken te voeren en medewerkers écht te betrekken. Eén platform. Thematisch, gestructureerd en AVG-proof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn btn-primary">Bekijk hoe het werkt</button>
            <button className="btn btn-accent">Start gratis met 3 medewerkers</button>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Wat levert het op */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">Wat levert GroeiRichting jou op?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <BarChart className="mx-auto mb-4 text-kleur-primary" />
            <h3 className="font-medium mb-2">Signalen herkennen</h3>
            <p>Zie op tijd wat er speelt in je team op thema’s als werkdruk, balans of motivatie.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <Smile className="mx-auto mb-4 text-kleur-accent" />
            <h3 className="font-medium mb-2">Betere gesprekken</h3>
            <p>Krijg AI-samenvattingen, gespreksvoorstellen en opvolging per medewerker.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <MessageCircle className="mx-auto mb-4 text-kleur-secondary" />
            <h3 className="font-medium mb-2">Actieve betrokkenheid</h3>
            <p>Laat medewerkers ervaren dat hun input terugkomt in echte actie.</p>
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">Hoe het werkt</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <StepsIllustratie className="w-full md:w-1/2" />
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <LogIn className="text-kleur-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">1. Meld je aan als organisatie</h4>
                <p>Registreer in 2 minuten en stel je voorkeuren in per thema.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="text-kleur-accent mt-1" />
              <div>
                <h4 className="font-semibold mb-1">2. Nodig je medewerkers uit</h4>
                <p>Via e-mail of directe link. Geen installatie nodig.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BarChartBig className="text-kleur-secondary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">3. Ontvang inzichten en gespreksvoorstellen</h4>
                <p>Bekijk het dashboard met signalen, samenvattingen en reflecties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-kleur-accent text-white p-12 rounded-xl text-center">
        <Quote className="w-8 h-8 mx-auto mb-4" />
        <p className="text-lg italic max-w-2xl mx-auto">
          "Sinds we met GroeiRichting werken, hebben we écht inzicht in wat er speelt. We kunnen nu preventief handelen."
        </p>
        <p className="mt-4 font-medium">– HR-manager in de zorg</p>
      </section>

      {/* Afsluiter */}
      <section className="bg-kleur-primary text-white py-12 text-center rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Jouw mensen zijn je belangrijkste kapitaal.</h2>
        <p className="mb-6">Investeer slim — zonder gedoe.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-accent">Bekijk het voorbeeldrapport</button>
          <button className="btn btn-secondary">Probeer GroeiRichting gratis</button>
        </div>
      </section>
    </div>
  )
}

export default Home
