import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'

import SEOHead from './components/SEOHead'

const DEMO_URL = 'https://calendar.app.google/nBkzwXbFmVLCUpKk7'
const IMG_BASE = '/hoe-werkt-het'

const STAPPEN = [
  {
    id: 1,
    titel: 'Maak eenvoudig een account aan',
    tekst: 'Geen ingewikkelde procedures. Geen creditcard nodig. Vul de gegevens in en je hebt een account.',
    badge: 'Altijd gratis voor het eerste team',
    images: ['Sectie1-Registreren.png'],
  },
  {
    id: 2,
    titel: 'Een eenvoudig dashboard',
    tekst: 'Eenvoudig en overzichtelijk. Breng medewerkers op de hoogte van de plannen en nodig ze eenvoudig uit. Beheer instellingen en bekijk direct resultaten zodra de medewerkers de gesprekken hebben gevoerd.',
    images: ['sectie2-dashboardwerkgever.png'],
  },
  {
    id: 3,
    titel: 'Beheer teams en medewerkers',
    tekst: 'Maak teams aan waarvan je op teamniveau resultaten wilt zien (bijvoorbeeld van alle buitendienst medewerkers en alle binnendienst medewerkers). Nodig vervolgens per team de juiste medewerkers uit.',
    feature: 'Import medewerkersbestand mogelijk.',
    images: ['sectie3-beheerteamsenmedewerkers.png'],
  },
  {
    id: 4,
    titel: 'De resultaten voor jou',
    tekst: "Direct nadat de medewerkers de gesprekken binnen de thema's hebben doorlopen, ontvang jij de resultaten. Overzichtelijk en je ziet direct waar jouw aandacht nodig is.",
    images: ['sectie4a-Resultaten.png', 'sectie4b-samenvattingenscore.png'],
  },
  {
    id: 5,
    titel: 'Adviezen op basis van de gesprekken',
    tekst: "Deze adviezen worden gegenereerd op alle gesprekken die binnen dit thema zijn gevoerd. Adviezen worden door medewerkers zelf en door AI gegenereerd.",
    badge: "Focus op thema's waar het nodig is.",
    images: ['sectie5-adviezen1.png', 'sectie5-adviezen2.png', 'sectie5-adviezen3.png'],
  },
  {
    id: 6,
    titel: 'Dashboard voor de medewerker',
    tekst: 'Het dashboard voor de medewerker is ook overzichtelijk en eenvoudig. Na de uitnodigingsmail die jij hebt verstuurd vanuit jouw dashboard, belandt de medewerker in zijn/haar dashboard.',
    images: ['sectie6-dashboardmedewerker.png'],
  },
  {
    id: 7,
    titel: 'Start gesprek medewerker',
    tekst: "Standaard doorloopt de medewerker gesprekken binnen 4 thema's. Als organisatie bepaal je zelf of je hier thema's toevoegt, aanpast of weglaat.",
    images: ['sectie7-startgesprekmedewerker.png'],
  },
  {
    id: 8,
    titel: 'Het gesprek van een medewerker',
    tekst: 'Een formulier of zelfs sommige leidinggevenden vragen niet door. De slimme gesprekken in het GroeiPortaal wel. Er worden vaste vragen gesteld en AI vraagt door tot er voldoende informatie is verzameld.',
    images: ['sectie8-gesprekmedewerker.png'],
  },
  {
    id: 9,
    titel: 'Resultaten medewerker',
    tekst: 'Niet alleen jij ontvangt resultaten over gesprekken, maar medewerkers ontvangen zelf ook een score, samenvatting en adviezen naar aanleiding van hun gesprekken.',
    images: ['sectie9-medewerkerscoreensamenvatting1.png', 'sectie9-medewerkerscoreensamenvatting2.png', 'sectie9-medewerkerscoreensamenvatting3.png', 'sectie9-medewerkerscoreensamenvatting4.png'],
  },
  {
    id: 10,
    titel: 'Top 3 adviezen medewerker',
    tekst: 'Elke medewerker krijgt per thema 3 adviezen. Om overzicht te bewaren en het behapbaar te maken wordt er een top 3 samengesteld.',
    images: ['sectie10-top3adviezen.png'],
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
  const [lightbox, setLightbox] = useState({ open: false, stepIndex: null, imageIndex: 0 })

  useEffect(() => {
    if (!lightbox.open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox((prev) => ({ ...prev, open: false }))
      const step = lightbox.stepIndex != null ? STAPPEN[lightbox.stepIndex] : null
      if (!step || step.images.length <= 1) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightbox((prev) => ({ ...prev, imageIndex: (prev.imageIndex - 1 + step.images.length) % step.images.length }))
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setLightbox((prev) => ({ ...prev, imageIndex: (prev.imageIndex + 1) % step.images.length }))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox.open, lightbox.stepIndex, lightbox.imageIndex])

  const openLightbox = (stepIndex, imageIndex = 0) => setLightbox({ open: true, stepIndex, imageIndex })
  const closeLightbox = () => setLightbox({ open: false, stepIndex: null, imageIndex: 0 })
  const goPrev = () => {
    const step = STAPPEN[lightbox.stepIndex]
    if (!step || step.images.length <= 1) return
    setLightbox((prev) => ({ ...prev, imageIndex: (prev.imageIndex - 1 + step.images.length) % step.images.length }))
  }
  const goNext = () => {
    const step = STAPPEN[lightbox.stepIndex]
    if (!step || step.images.length <= 1) return
    setLightbox((prev) => ({ ...prev, imageIndex: (prev.imageIndex + 1) % step.images.length }))
  }

  const lightboxStep = lightbox.stepIndex != null ? STAPPEN[lightbox.stepIndex] : null
  const lightboxImages = lightboxStep?.images ?? []
  const hasMultiple = lightboxImages.length > 1

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
            {STAPPEN.map((stap, stepIndex) => {
              const imageLinks = stepIndex % 2 === 0
              const { titel, tekst, badge, feature, images } = stap
              const firstImg = images?.[0] ? `${IMG_BASE}/${images[0]}` : null
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
              const imageBlock = firstImg ? (
                <button
                  type="button"
                  onClick={() => openLightbox(stepIndex, 0)}
                  className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:ring-offset-2"
                  aria-label={`${titel} vergroten${images.length > 1 ? ', carrousel met meerdere afbeeldingen' : ''}`}
                >
                  <img
                    src={firstImg}
                    alt=""
                    className="w-full aspect-video sm:aspect-[4/3] object-cover object-top max-h-64 sm:max-h-72"
                  />
                  {images.length > 1 && (
                    <span className="block py-2 text-xs text-gray-500">Klik om te vergroten · {images.length} afbeeldingen</span>
                  )}
                </button>
              ) : (
                <div className="w-full aspect-video sm:aspect-[4/3] rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm text-center px-4">
                  {titel}
                </div>
              )
              return (
                <article key={stap.id} className="py-10 sm:py-14 border-b border-gray-100 last:border-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {imageLinks ? (
                      <>
                        <div className="order-2 lg:order-1">{imageBlock}</div>
                        <div className="order-1 lg:order-2">{content}</div>
                      </>
                    ) : (
                      <>
                        <div>{content}</div>
                        <div>{imageBlock}</div>
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

      {/* Lightbox met carousel */}
      {lightbox.open && lightboxStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Afbeelding vergroot weergave"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-10 right-0 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
              aria-label="Sluiten"
            >
              <X className="w-8 h-8" />
            </button>
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
                  aria-label="Vorige afbeelding"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
                  aria-label="Volgende afbeelding"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </>
            )}
            <img
              src={`${IMG_BASE}/${lightboxImages[lightbox.imageIndex]}`}
              alt=""
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            {hasMultiple && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {lightboxImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightbox((prev) => ({ ...prev, imageIndex: i }))}
                    className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.imageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                    aria-label={`Afbeelding ${i + 1} van ${lightboxImages.length}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default HoeWerktHet
