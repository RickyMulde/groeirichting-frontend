import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserX, Briefcase, TrendingUp, CheckCircle,
  Quote, Zap, MessageSquare, BarChart,
  LogOut, FileStack, Users, Bot, ChatBubbleLeftRight, Bell
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'

function VoorDirectieEnOffice() {
  const [showVoorbeeldRapportModal, setShowVoorbeeldRapportModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Voor Directie & Office - Groei zonder grip te verliezen"
        description="Je bedrijf wordt groter, maar het familiegevoel staat onder druk. GroeiRichting is de digitale rechterhand die luistert naar al je medewerkers, zonder dat het jou of je Office Manager extra tijd kost."
        keywords="directie, office manager, MKB, medewerkersbehoud, cultuur behouden, groeipijn, toptalent behouden"
        canonical="https://groeirichting.nl/voor-directie-en-office"
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Groei zonder de grip op je mensen te verliezen.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Je bedrijf wordt groter, maar het familiegevoel staat onder druk. GroeiRichting is de digitale rechterhand die luistert naar al je medewerkers, zonder dat het jou of je (Office) Manager extra tijd kost.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <Link 
              to="/contact"
              className="btn btn-primary text-center"
            >
              Neem contact op
            </Link>
            <button 
              onClick={() => setShowVoorbeeldRapportModal(true)}
              className="btn btn-accent text-center"
            >
              Download voorbeeldrapport
            </button>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Het Probleem - 3 Kolommen */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Weet jij écht wat er speelt, of gok je maar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom 1: Het stille vertrek */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-4 rounded-lg w-fit mb-4">
                <LogOut className="w-8 h-8 text-[var(--kleur-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Het stille vertrek
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Toptalent klaagt vaak niet, ze vertrekken 'opeens'. Voorkom die verrassing door signalen vroegtijdig op te vangen.
              </p>
            </div>

            {/* Kolom 2: De overbelaste Office Manager */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-4 rounded-lg w-fit mb-4">
                <FileStack className="w-8 h-8 text-[var(--kleur-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                De overbelaste Office Manager
              </h3>
              <p className="text-[var(--kleur-muted)]">
                HR 'erbij doen' is niet langer houdbaar. Je hebt een tool nodig die het operationele werk uit handen neemt.
              </p>
            </div>

            {/* Kolom 3: Groeipijn */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-4 rounded-lg w-fit mb-4">
                <Users className="w-8 h-8 text-[var(--kleur-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Groeipijn
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Nieuwe mensen voelen zich soms nog geen onderdeel van de club. Met GroeiRichting bewaak je de cultuur, ook als je groeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* De Oplossing - Feature Highlight */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
            Jullie tool om concrete inzichten te genereren van de organisatie
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--kleur-accent)] bg-opacity-10 p-3 rounded-lg flex-shrink-0">
                  <Bot className="w-6 h-6 text-[var(--kleur-accent)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Geautomatiseerd
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    De tool voert de interviews, jij krijgt de inzichten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--kleur-accent)] bg-opacity-10 p-3 rounded-lg flex-shrink-0">
                  <ChatBubbleLeftRight className="w-6 h-6 text-[var(--kleur-accent)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Laagdrempelig
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Medewerkers antwoorden via een simpele chat, voelt niet als administratie.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[var(--kleur-accent)] bg-opacity-10 p-3 rounded-lg flex-shrink-0">
                  <Bell className="w-6 h-6 text-[var(--kleur-accent)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-2">
                    Actiegericht
                  </h3>
                  <p className="text-[var(--kleur-muted)]">
                    Je krijgt geen dik rapport, maar direct een seintje: "Let op team Marketing ervaart de werkdruk als te hoog."
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollbaar afbeelding vlak */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="overflow-y-auto rounded-lg" style={{ maxHeight: '400px' }}>
                <img 
                  src="/thema-overzicht-dashboard.png" 
                  alt="Dashboard overzicht met thema's: Werkdruk & Taaklast, Perspectief & Ontwikkeling, Motivatie en Werkplezier, Samenwerking & Werksfeer"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Afsluiting */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial */}
          <div className="bg-[var(--kleur-accent)] text-white p-8 rounded-xl mb-12">
            <Quote className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <p className="text-lg italic text-center max-w-2xl mx-auto mb-4">
              "Vroeger sprak ik iedereen zelf. Nu groeit mijn bedrijf, maar dankzij GroeiRichting weet ik nog steeds precies wie er niet lekker in zijn vel zit."
            </p>
            <p className="text-center font-medium">– DGA, MKB-bedrijf</p>
          </div>

          {/* Afsluitende CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-6">
              Klaar om je cultuur te borgen?
            </h2>
            <Link 
              to="/contact"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      </div>

      {/* Modal */}
      <BrochureDownloadModal 
        isOpen={showVoorbeeldRapportModal}
        onClose={() => setShowVoorbeeldRapportModal(false)}
        title="Voorbeeld-rapport"
        description="Vul je gegevens in en download het voorbeeld-rapport direct."
      />
    </>
  )
}

export default VoorDirectieEnOffice

