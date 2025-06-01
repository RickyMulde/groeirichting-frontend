
import {
  BarChart, Smile, MessageCircle,
  LogIn, Users, BarChartBig, Quote, Eye, Speech
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
            GroeiRichting helpt organisaties signalen te herkennen, betere gesprekken te voeren en medewerkers écht te betrekken. Eén platform. Thematisch, gestructureerd en AVG-proof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn btn-primary">Plan een demo</button>
            <button className="btn btn-accent">Bekijk hoe het werkt</button>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Wat is GroeiRichting */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">Wat is GroeiRichting?</h2>
        <div className="max-w-3xl mx-auto text-center text-kleur-muted space-y-4">
          <p>GroeiRichting is een digitale gespreksassistent die de brug slaat tussen medewerkertevredenheidsonderzoeken en functioneringsgesprekken.</p>
          <p>Medewerkers vullen themagerichte vragen in en het platform vertaalt hun input naar duidelijke signalen en gespreksvoorstellen.</p>
          <p>Zo weet jij wat er écht speelt – en voer je gesprekken die verschil maken.</p>
        </div>
      </section>

      {/* Voordelen */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">Wat levert het op?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <Eye className="mx-auto mb-4 text-kleur-primary" />
            <h3 className="font-medium mb-2">Signalen herkennen</h3>
            <p>Zie op tijd waar het wringt binnen je team of organisatie.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <Speech className="mx-auto mb-4 text-kleur-accent" />
            <h3 className="font-medium mb-2">Betere gesprekken</h3>
            <p>AI-samenvattingen, gesprekstips en opvolging per medewerker.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl text-center">
            <Smile className="mx-auto mb-4 text-kleur-secondary" />
            <h3 className="font-medium mb-2">Actieve betrokkenheid</h3>
            <p>Medewerkers zien dat hun input telt én wordt opgevolgd.</p>
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

      {/* Vergelijkingstabel */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">Waarom GroeiRichting?</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-kleur-primary">
                <th className="px-4 py-2">Kenmerk</th>
                <th className="px-4 py-2">MTO</th>
                <th className="px-4 py-2">Functioneringsgesprek</th>
                <th className="px-4 py-2">GroeiRichting</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Frequentie</td>
                <td className="px-4 py-2">1× per jaar</td>
                <td className="px-4 py-2">1× per jaar</td>
                <td className="px-4 py-2">Thematisch & continu</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Medewerkerinput</td>
                <td className="px-4 py-2">Anoniem</td>
                <td className="px-4 py-2">Subjectief</td>
                <td className="px-4 py-2">Persoonlijk + gestructureerd</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Opvolging</td>
                <td className="px-4 py-2">Beperkt</td>
                <td className="px-4 py-2">Afhankelijk van leidinggevende</td>
                <td className="px-4 py-2">AI-voorstellen + reflectie & logging</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Inzetbaarheid</td>
                <td className="px-4 py-2">Lange termijn</td>
                <td className="px-4 py-2">Vaak vergeten</td>
                <td className="px-4 py-2">Doorlopend inzichtelijk</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Privacy & grip</td>
                <td className="px-4 py-2">Ja</td>
                <td className="px-4 py-2">Ja</td>
                <td className="px-4 py-2">AVG + instelbaar per thema</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA afsluiter */}
      <section className="bg-kleur-primary text-white py-12 text-center rounded-xl mt-16">
        <h2 className="text-2xl font-bold mb-4">Klaar met vrijblijvende evaluatiegesprekken?</h2>
        <p className="mb-6">Start vandaag met groeigesprekken die écht impact maken.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-accent">Vraag een gratis proefperiode aan</button>
          <button className="btn btn-secondary">Bekijk het platform</button>
        </div>
      </section>
    </div>
  )
}

export default Home
