import {
  BarChart, Smile, MessageCircle,
  Users, Quote, CheckCircle
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'

function Home() {
  return (
    <div className="space-y-24 bg-[var(--kleur-background)]">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            GroeiRichting – Inzicht. Gesprek. Samen. Groei.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            GroeiRichting helpt organisaties signalen te herkennen, betere gesprekken te voeren en medewerkers écht te betrekken. Eén platform. Voorkom uitval en stimuleer groei.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn btn-primary">Plan een demo</button>
            <button className="btn btn-accent">Bekijk hoe het werkt</button>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Wat is GroeiRichting */}
      <section className="bg-gray-50 py-16 px-6 rounded-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">Wat is GroeiRichting?</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg">
          GroeiRichting is een digitale gespreksassistent die de brug slaat tussen medewerkertevredenheidsonderzoeken en functioneringsgesprekken. Medewerkers vullen themagerichte vragen in en het platform vertaalt hun input naar duidelijke signalen en gespreksvoorstellen. Zo weet jij wat er écht speelt – en voer je gesprekken die verschil maken.
        </p>
      </section>

      {/* Wat levert het op */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">Wat levert het op?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <BarChart className="mx-auto mb-4 text-[var(--kleur-primary)]" />
            <h3 className="font-medium mb-2">Signalen herkennen</h3>
            <p>Signaleer trends op persoonsniveau of over het hele team. Speel tijdig in op kansen of bedreigingen.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <MessageCircle className="mx-auto mb-4 text-[var(--kleur-accent)]" />
            <h3 className="font-medium mb-2">Betere gesprekken</h3>
            <p>GroeiRichting gaat verder dan een medewerkerstevredenheidsonderzoek. Ontdek wat jouw medewerkers echt denken en stuur bij met behulp van het dashboard met key trends.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <Smile className="mx-auto mb-4 text-[var(--kleur-secondary)]" />
            <h3 className="font-medium mb-2">Actieve betrokkenheid</h3>
            <p>De input van jouw medewerkers is een belangrijk onderdeel in het functioneringsgesprek. GroeiRichting zorgt voor een doorlopend verbeteringsproces, waarbij medewerkers het gevoel krijgen dat hun input telt én wordt opgevolgd.</p>
          </div>
        </div>
      </section>

      {/* Voordelen van GroeiRichting */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">Voordelen van GroeiRichting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>Flexibele themastructuur afgestemd op wat er nú speelt</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="text-[var(--kleur-primary)] mt-1" />
            <p>AI-samenvattingen die gesprekken efficiënter en gerichter maken</p>
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

      {/* Nadelen van huidige praktijk */}
      <section className="bg-gray-100 py-16 px-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-center mb-8">De nadelen van hoe het nu gaat</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-[var(--kleur-muted)] text-center text-lg">
          <p>Functioneringsgesprekken kosten veel tijd en zijn vaak oppervlakkig.</p>
          <p>Medewerkers zijn vaak al ontevreden vóór het gesprek plaatsvindt.</p>
          <p>MT's hebben geen goed zicht op wat er écht speelt in het team.</p>
          <p>MTO's zijn te algemeen en leiden zelden tot echte verandering.</p>
          <p>Leidinggevenden vinden het lastig om moeilijke onderwerpen bespreekbaar te maken.</p>
        </div>
      </section>

      {/* GroeiRichting als oplossing */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">GroeiRichting biedt de oplossing</h2>
        <p className="max-w-3xl mx-auto text-[var(--kleur-muted)] text-lg mb-6">
          Met thematische gesprekken, AI-ondersteuning en flexibele instellingen geef je richting aan ontwikkeling. Je krijgt als werkgever direct bruikbare input, terwijl medewerkers ervaren dat hun stem telt. Zo ontstaat een gesprekscultuur waarin groei centraal staat.
        </p>
      </section>

      {/* Quote */}
      <section className="bg-[var(--kleur-accent)] text-white p-12 rounded-xl text-center">
        <Quote className="w-8 h-8 mx-auto mb-4" />
        <p className="text-lg italic max-w-2xl mx-auto">
          "Sinds we met GroeiRichting werken, hebben we écht inzicht in wat er speelt. We kunnen nu preventief handelen."
        </p>
        <p className="mt-4 font-medium">– HR-manager in de zorg</p>
      </section>

      {/* Eindkreet */}
      <section className="bg-[var(--kleur-primary)] text-white py-12 text-center rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Wil jij werken aan en met een team van gemotiveerde medewerkers die samen het bedrijf willen laten groeien in de richting die jij wilt?</h2>
        <p className="mb-6">Dan start je met GroeiRichting.</p>
        <button className="btn btn-secondary">Hoe werkt het?</button>
      </section>
    </div>
  )
}

export default Home
