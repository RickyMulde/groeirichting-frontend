import {
    AlertCircle, UserMinus, TrendingDown,
    BarChart, Smile, MessageCircle,
    LogIn, Users, BarChartBig, Quote
  } from 'lucide-react'
  
  import HeroIllustratie from './assets/hero.svg?react'
  import StepsIllustratie from './assets/steps.svg?react'
  
  function Home() {
    return (
      <div className="space-y-24">
  
        {/* 1. Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
          <div>
            <h1 className="text-4xl font-bold text-kleur-primary mb-4">
              Laat je mensen groeien. Dan groeit je bedrijf vanzelf mee.
            </h1>
            <p className="text-lg text-kleur-muted mb-6">
              GroeiRichting is hét portaal voor werkgevers die willen investeren in duurzame inzetbaarheid en werkgeluk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary">Bekijk hoe het werkt</button>
              <button className="btn btn-accent">Start gratis met 3 medewerkers</button>
            </div>
          </div>
          <HeroIllustratie className="w-full h-auto" />
        </section>
  
        {/* 3. Wat levert het op */}
        <section>
          <h2 className="text-2xl font-semibold text-center mb-12">Wat levert GroeiRichting jou op?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-md rounded-xl text-center">
              <BarChart className="mx-auto mb-4 text-kleur-primary" />
              <h3 className="font-medium mb-2">Inzicht in mentale belasting</h3>
              <p>Signaleer knelpunten voordat ze problemen worden.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center">
              <Smile className="mx-auto mb-4 text-kleur-accent" />
              <h3 className="font-medium mb-2">Meer werkgeluk</h3>
              <p>Creëer een cultuur waarin mensen willen blijven groeien.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center">
              <MessageCircle className="mx-auto mb-4 text-kleur-secondary" />
              <h3 className="font-medium mb-2">Gerichte communicatie</h3>
              <p>Ondersteun medewerkers daar waar het echt nodig is.</p>
            </div>
          </div>
        </section>
  
        {/* 4. Hoe het werkt */}
        <section>
          <h2 className="text-2xl font-semibold text-center mb-12">Hoe het werkt</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <StepsIllustratie className="w-full md:w-1/2" />
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <LogIn className="text-kleur-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">1. Meld je aan als werkgever</h4>
                  <p>Registreer in 2 minuten en stel je voorkeuren in.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="text-kleur-accent mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">2. Nodig je medewerkers uit</h4>
                  <p>Via e-mail of directe link. Geen app nodig.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BarChartBig className="text-kleur-secondary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">3. Ontvang inzichten</h4>
                  <p>Bekijk het dashboard met de signalen, anoniem en thematisch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* 2. Als je het niet doet */}
        <section className="bg-gray-900 text-white p-12 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">En als je het niet doet?</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><AlertCircle className="text-red-500" /> Gemotiveerde medewerkers vertrekken</li>
            <li className="flex items-center gap-2"><UserMinus className="text-red-500" /> Ziekteverzuim stijgt, kosten lopen op</li>
            <li className="flex items-center gap-2"><TrendingDown className="text-red-500" /> Teamspirit daalt, klanten merken het</li>
            <li className="flex items-center gap-2"><AlertCircle className="text-red-500" /> Talenten kiezen voor andere werkgevers</li>
          </ul>
        </section>
  
        {/* 5. Quote */}
        <section className="bg-kleur-accent text-white p-12 rounded-xl text-center">
          <Quote className="w-8 h-8 mx-auto mb-4" />
          <p className="text-lg italic max-w-2xl mx-auto">
            "Sinds we met GroeiRichting werken, hebben we écht inzicht in wat er speelt. We kunnen nu preventief handelen."
          </p>
          <p className="mt-4 font-medium">– HR-manager in de zorg</p>
        </section>
  
        {/* 6. Afsluiter */}
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