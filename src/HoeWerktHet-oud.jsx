import {
  CheckCircle, Users, MessageCircle, BarChart,
  Smartphone, Shield, TrendingUp, Quote
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
      <div className="space-y-24 bg-[var(--kleur-background)]">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Zo werkt GroeiRichting – eenvoudig voor iedereen in de organisatie.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Of je nu leidinggevende of medewerker bent: het platform begeleidt het proces. Zo ontstaat een gesprekscultuur waarin groei centraal staat en verloop en verzuim worden voorkomen.
          </p>
          
          <button className="btn btn-primary">Boek een demo</button>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Voor werkgevers en leidinggevenden */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Voor werkgevers en leidinggevenden</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Maak een account aan en nodig je medewerkers uit – That's it!</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Jouw medewerkers/ teamleden voeren de gesprekken met AI</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Ontvang inzichten en signalen (waar je op kunt sturen).</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Groei als organisatie en laat je medewerkers/ teamleden zien dat ze worden gehoord.</p>
              </div>
              
              <div className="pt-4">
                <button className="btn btn-primary">Boek een demo en zie jouw dashboard in actie</button>
              </div>
            </div>
            
            {/* Dashboard mockup placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="text-[var(--kleur-primary)]" />
                <h3 className="font-semibold text-[var(--kleur-primary)]">Dashboard Overzicht</h3>
              </div>
              
              {/* Voortgangsbalk gesprekken */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[var(--kleur-muted)]">Gesprekken afgerond</span>
                  <span className="text-sm font-medium text-[var(--kleur-primary)]">8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[var(--kleur-primary)] h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              
              {/* AI samenvatting knop */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">AI-samenvatting klaar</p>
                    <p className="text-xs text-blue-600">3 nieuwe inzichten beschikbaar</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs rounded-lg transition-colors">
                    Bekijk
                  </button>
                </div>
              </div>
              
              {/* Verbeteradviezen */}
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Verbeteradviezen</p>
                    <p className="text-xs text-green-600">5 acties klaar voor uitvoering</p>
                  </div>
                  <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 text-xs rounded-lg transition-colors">
                    Bekijk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voor medewerkers en teams */}
      <section className="bg-gray-50 py-16 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Voor medewerkers en teams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Chat mockup placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="text-[var(--kleur-primary)]" />
                <h3 className="font-semibold text-[var(--kleur-primary)]">Gesprek Starten</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm">Hoe voel je je vandaag?</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg ml-8">
                  <p className="text-sm">Ik voel me gemotiveerd!</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm">Wat zou je willen verbeteren?</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Je ontvangt een uitnodiging van je werkgever of teamleider</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Je voert gesprekken per thema, makkelijk via mobiel of desktop</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Je krijgt een persoonlijke samenvatting en tips om te groeien</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-muted)]">Samen werken jullie aan verbeteringen in de organisatie</p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <p className="font-medium text-blue-800">
                  Medewerkers ervaren dat hun stem telt én opvolging krijgt.
                </p>
                <p className="text-xs text-blue-600 mt-2 italic">
                  Jouw antwoorden worden zorgvuldig en vertrouwelijk verwerkt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voordelen voor beide kanten */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Wat levert het op?</h2>
          <p className="text-lg text-[var(--kleur-muted)] text-center mb-12">
            GroeiRichting slaat de brug tussen werkgever en werknemer.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Werkgevers */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-[var(--kleur-primary)]" />
                <h3 className="font-semibold text-[var(--kleur-primary)]">Werkgevers</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Grip op risico's</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Minder verloop</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Voorkom uitval</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-primary)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Data voor beleid</p>
                </div>
              </div>
            </div>
            
            {/* Medewerkers */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-[var(--kleur-accent)]" />
                <h3 className="font-semibold text-[var(--kleur-accent)]">Medewerkers</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Gehoord worden</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Krijg tips om te groeien</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Meer eigenaarschap</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--kleur-accent)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--kleur-muted)]">Meer duidelijkheid en structuur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra trust */}
      <section className="bg-gray-50 py-16 px-6 rounded-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Waarom GroeiRichting werkt</h2>
          <p className="text-lg text-[var(--kleur-muted)] mb-8">
            Gebouwd op inzichten uit HR en psychologie, getest in het MKB en volledig AVG-proof.
          </p>
          
          {/* Testimonial */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <Quote className="text-[var(--kleur-primary)] mx-auto mb-4" size={32} />
            <blockquote className="text-lg text-[var(--kleur-muted)] mb-4 italic">
              "Sinds we met GroeiRichting werken, zien we eerder wat er wringt en nemen we direct actie."
            </blockquote>
            <p className="font-medium text-[var(--kleur-primary)]">– HR-manager (pilot)</p>
          </div>
        </div>
      </section>

      {/* Slotsectie met CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-4">
            Klaar om betere gesprekken te voeren?
          </h2>
          <p className="text-lg text-[var(--kleur-muted)] mb-8">
            Voorkom uitval en vergroot betrokkenheid – zonder extra HR-last.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary">Boek een demo</button>
            <button className="btn btn-accent">Bekijk 3-min demo</button>
          </div>
        </div>
      </section>

      </div>
    </>
  )
}

export default HoeWerktHet
