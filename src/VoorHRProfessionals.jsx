import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar, TrendingDown, Brain, Shield, CheckCircle,
  BarChart3, FileText, Database
} from 'lucide-react'

import HeroIllustratie from './assets/hero.svg?react'
import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'

function VoorHRProfessionals() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)

  return (
    <>
      <SEOHead 
        title="Voor HR Professionals - Van administratief HR naar strategisch Business Partner"
        description="Stop met het jaarlijkse MTO dat niemand leest. Krijg realtime data over betrokkenheid, verzuimrisico's en retentie. Onderbouw jouw advies aan de directie met harde feiten."
        keywords="HR professional, HR manager, business partner, MTO alternatief, HR data, verzuimpreventie, HR analytics, strategisch HR"
        canonical="https://groeirichting.nl/voor-hr-professionals"
      />
      <div className="space-y-16 bg-[var(--kleur-background)]">

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        <div>
          <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
            Van administratief HR naar strategisch Business Partner.
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] mb-6">
            Stop met het jaarlijkse MTO dat niemand leest. Krijg realtime data over betrokkenheid, verzuimrisico's en retentie. Onderbouw jouw advies aan de directie met harde feiten.
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
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-accent text-center"
            >
              Download voorbeeldrapport
            </button>
          </div>
        </div>
        <HeroIllustratie className="w-full h-auto" />
      </section>

      {/* Het Probleem - Vergelijkingstabel */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Waarom het jaarlijkse MTO niet meer werkt.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Blok Oud */}
            <div className="bg-gray-100 p-8 rounded-xl border border-gray-300">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-gray-500" />
                <h3 className="text-2xl font-semibold text-gray-700">
                  Oud
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                Eén keer per jaar een momentopname. Resultaten zijn al achterhaald als het rapport af is.
              </p>
            </div>

            {/* Blok Nieuw */}
            <div className="bg-[var(--kleur-accent)] p-8 rounded-xl border-2 border-[var(--kleur-accent)]">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-white" />
                <h3 className="text-2xl font-semibold text-white">
                  Nieuw
                </h3>
              </div>
              <p className="text-lg text-white">
                Continue hartslagmeting met GroeiRichting. Signaleer problemen terwijl ze ontstaan en stuur direct bij.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* De Oplossing - Data & AI Focus */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-12 text-center">
            Voorspel verzuim en verloop met AI.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Verzuimpreventie */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-[var(--kleur-primary)] p-4 rounded-lg w-fit mb-4">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Verzuimpreventie
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Zie trends in werkdruk voordat iemand uitvalt.
              </p>
            </div>

            {/* Feature 2: Boardroom-ready */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-[var(--kleur-primary)] p-4 rounded-lg w-fit mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                Boardroom-ready
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Geen "ik denk dat...", maar "uit de data blijkt dat...".
              </p>
            </div>

            {/* Feature 3: AI-analyse */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-[var(--kleur-primary)] p-4 rounded-lg w-fit mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                AI-analyse
              </h3>
              <p className="text-[var(--kleur-muted)]">
                Interviews ondersteund door AI voor meer en concretere informatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GroeiRichting biedt de oplossing */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
            GroeiRichting biedt de oplossing: MTO-alternatief met AI-ondersteuning
          </h2>
          
          <p className="text-lg text-[var(--kleur-muted)] text-center max-w-3xl mx-auto mb-12">
            Met AI-ondersteunde gesprekken over vaste thema's zoals werkdruk & taaklast, motivatie & werkplezier, samenwerking & werksfeer en perspectief & ontwikkeling, creëer je een gesprekscultuur die helpt om medewerkerstevredenheid structureel te verbeteren en verzuim tijdig te signaleren. Je krijgt als werkgever direct bruikbare input, terwijl medewerkers ervaren dat hun stem telt.
          </p>

          {/* CTA's */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-accent text-lg px-8 py-4"
            >
              Download voorbeeldrapport
            </button>
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

      {/* Brochure Modal */}
      <BrochureDownloadModal 
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
        title="Voorbeeld-rapport"
        description="Vul je gegevens in en download het voorbeeld-rapport direct."
      />
    </>
  )
}

export default VoorHRProfessionals

