import { Link } from 'react-router-dom'
import { CheckCircle, Calendar } from 'lucide-react'

import SEOHead from './components/SEOHead'

const DEMO_URL = 'https://calendar.app.google/nBkzwXbFmVLCUpKk7'

const STAPPEN = [
  {
    id: 1,
    titel: 'Maak eenvoudig een account aan',
    tekst: 'Geen ingewikkelde procedures. Geen creditcard nodig. Vul de gegevens in en je hebt een account.',
    badge: 'Altijd gratis voor het eerste team',
    imagePlaceholder: 'Maak eenvoudig een account aan',
  },
  {
    id: 2,
    titel: 'Een eenvoudig dashboard',
    tekst: 'Eenvoudig en overzichtelijk. Breng medewerkers op de hoogte van de plannen en nodig ze eenvoudig uit. Beheer instellingen en bekijk direct resultaten zodra de medewerkers de gesprekken hebben gevoerd.',
    imagePlaceholder: 'Een eenvoudig dashboard',
  },
  {
    id: 3,
    titel: 'Beheer teams en medewerkers',
    tekst: 'Maak teams aan waarvan je op teamniveau resultaten wilt zien (bijvoorbeeld van alle buitendienst medewerkers en alle binnendienst medewerkers). Nodig vervolgens per team de juiste medewerkers uit.',
    feature: 'Import medewerkersbestand mogelijk.',
    imagePlaceholder: 'Beheer teams en medewerkers',
  },
  {
    id: 4,
    titel: 'De resultaten voor jou',
    tekst: "Direct nadat de medewerkers de gesprekken binnen de thema's hebben doorlopen, ontvang jij de resultaten. Overzichtelijk en je ziet direct waar jouw aandacht nodig is.",
    imagePlaceholder: 'De resultaten voor jou',
  },
  {
    id: 5,
    titel: 'Adviezen op basis van de gesprekken',
    tekst: "Deze adviezen worden gegenereerd op alle gesprekken die binnen dit thema zijn gevoerd. Adviezen worden door medewerkers zelf en door AI gegenereerd.",
    badge: "Focus op thema's waar het nodig is.",
    imagePlaceholder: 'Adviezen op basis van de gesprekken',
  },
  {
    id: 6,
    titel: 'Dashboard voor de medewerker',
    tekst: 'Het dashboard voor de medewerker is ook overzichtelijk en eenvoudig. Na de uitnodigingsmail die jij hebt verstuurd vanuit jouw dashboard, belandt de medewerker in zijn/haar dashboard.',
    imagePlaceholder: 'Dashboard voor de medewerker',
  },
  {
    id: 7,
    titel: 'Start gesprek medewerker',
    tekst: "Standaard doorloopt de medewerker gesprekken binnen 4 thema's. Als organisatie bepaal je zelf of je hier thema's toevoegt, aanpast of weglaat.",
    imagePlaceholder: 'Start gesprek medewerker',
  },
  {
    id: 8,
    titel: 'Het gesprek van een medewerker',
    tekst: 'Een formulier of zelfs sommige leidinggevenden vragen niet door. De slimme gesprekken in het GroeiPortaal wel. Er worden vaste vragen gesteld en AI vraagt door tot er voldoende informatie is verzameld.',
    imagePlaceholder: 'Het gesprek van een medewerker',
  },
  {
    id: 9,
    titel: 'Resultaten medewerker',
    tekst: 'Niet alleen jij ontvangt resultaten over gesprekken, maar medewerkers ontvangen zelf ook een score, samenvatting en adviezen naar aanleiding van hun gesprekken.',
    imagePlaceholder: 'Resultaten medewerker',
  },
  {
    id: 10,
    titel: 'Top 3 adviezen medewerker',
    tekst: 'Elke medewerker krijgt per thema 3 adviezen. Om overzicht te bewaren en het behapbaar te maken wordt er een top 3 samengesteld.',
    imagePlaceholder: 'Top 3 adviezen medewerker',
  },
]

const VOORDELEN_WERKGEVER = [
  'Het kost weinig tijd',
  'Direct overzicht per team en thema',
  'Direct adviezen om mee aan de slag te kunnen',
  'Grondslag voor communicatie richting directie',
]

const VOORDELEN_MEDEWERKER = [
  'Geen saaie formulieren',
  'Een interessant interactief gesprek',
  'Privacy blijft gewaarborgd',
  'Persoonlijke adviezen om te groeien',
]

function HoeWerktHet() {
  return (
    <>
      <SEOHead
        title="Hoe werkt het GroeiPortaal - GroeiRichting"
        description="Laat jezelf overtuigen van het gemak van het GroeiPortaal. Van account tot resultaten: 9 stappen om organisatie en medewerkers te laten groeien."
        keywords="GroeiPortaal, hoe werkt GroeiRichting, account aanmaken, dashboard werkgever, teams beheren, AI gesprekken medewerkers"
        canonical="https://groeirichting.nl/hoe-werkt-het"
      />
      <div className="min-h-screen bg-[var(--kleur-background)]">
        {/* 1. Header */}
        <header className="bg-gray-50/80 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--kleur-primary)] mb-4">
              Hoe werkt het GroeiPortaal van GroeiRichting?
            </h1>
            <p className="text-lg sm:text-xl text-[var(--kleur-muted)]">
              Laat jezelf overtuigen van het gemak van het GroeiPortaal en laat de organisatie en medewerkers groeien.
            </p>
          </div>
        </header>

        {/* 2. De 9 Stappen (zig-zag) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8" aria-label="De 9 stappen">
          <div className="max-w-6xl mx-auto space-y-0">
            {STAPPEN.map((stap, index) => {
              const imageLinks = index % 2 === 0
              const { titel, tekst, badge, feature, imagePlaceholder } = stap
              const content = (
                <>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[var(--kleur-primary)] mb-3">{titel}</h2>
                  <p className="text-[var(--kleur-muted)] mb-4">{tekst}</p>
                  {badge && (
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800">
                      {badge}
                    </span>
                  )}
                  {feature && (
                    <p className="mt-3 text-sm font-medium text-[var(--kleur-primary)]">{feature}</p>
                  )}
                </>
              )
              const placeholder = (
                <div
                  className="w-full aspect-video sm:aspect-[4/3] rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm sm:text-base text-center px-4"
                  aria-hidden
                >
                  {imagePlaceholder}
                </div>
              )
              return (
                <article key={stap.id} className="py-10 sm:py-14 border-b border-gray-100 last:border-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {imageLinks ? (
                      <>
                        <div className="order-2 lg:order-1">{placeholder}</div>
                        <div className="order-1 lg:order-2">{content}</div>
                      </>
                    ) : (
                      <>
                        <div>{content}</div>
                        <div>{placeholder}</div>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* 3. De Voordelen */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/60" aria-label="De voordelen">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--kleur-primary)] mb-12">
              De voordelen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-4">
                  Voordelen werkgever
                </h3>
                <ul className="space-y-3">
                  {VOORDELEN_WERKGEVER.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--kleur-primary)] mt-0.5 flex-shrink-0 w-5 h-5" aria-hidden />
                      <span className="text-[var(--kleur-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[var(--kleur-primary)] mb-4">
                  Voordelen medewerker
                </h3>
                <ul className="space-y-3">
                  {VOORDELEN_MEDEWERKER.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--kleur-primary)] mt-0.5 flex-shrink-0 w-5 h-5" aria-hidden />
                      <span className="text-[var(--kleur-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Afsluiter / CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center" aria-label="Call to action">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)] mb-4">
              Heb je nog vragen?
            </h2>
            <p className="text-[var(--kleur-muted)] mb-8 text-lg">
              Wanneer maak je de juiste keuze? Wat is het beste programma? Start een gratis account en probeer het eens uit op 1 team. Nog niet overtuigd? Plan dan eenvoudig een demo in een tijdslot dat jou uitkomt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/registreer-werkgever"
                className="btn btn-primary inline-flex items-center justify-center gap-2"
              >
                Start gratis account
              </Link>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[var(--kleur-secondary)] hover:bg-[var(--kleur-secondary)] hover:brightness-110 text-white inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" aria-hidden />
                Plan een demo
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HoeWerktHet
