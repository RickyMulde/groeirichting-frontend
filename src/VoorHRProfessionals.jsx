import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar, TrendingDown, Brain, Shield, CheckCircle,
  BarChart3, FileText, Database
} from 'lucide-react'

import SEOHead from './components/SEOHead'
import BrochureDownloadModal from './components/BrochureDownloadModal'
import ContactForm from './components/ContactForm'

function VoorHRProfessionals() {
  const [showBrochureModal, setShowBrochureModal] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

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
            <button 
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary text-center"
            >
              Vraag demo aan
            </button>
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="text-[var(--kleur-primary)] hover:text-[var(--kleur-accent)] underline text-center"
            >
              Download informatie-brochure: Het einde van het MTO
            </button>
          </div>
        </div>
        <div className="bg-gray-100 p-8 rounded-xl border border-gray-300">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[var(--kleur-primary)]" />
              <h3 className="font-semibold text-[var(--kleur-text)]">Dashboard Overzicht</h3>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-[var(--kleur-primary)] rounded-full w-3/4"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-[var(--kleur-accent)] rounded-full w-1/2"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-[var(--kleur-secondary)] rounded-full w-2/3"></div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[var(--kleur-primary)]">87%</div>
                <div className="text-xs text-[var(--kleur-muted)]">Betrokkenheid</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--kleur-accent)]">12%</div>
                <div className="text-xs text-[var(--kleur-muted)]">Verzuimrisico</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--kleur-secondary)]">94%</div>
                <div className="text-xs text-[var(--kleur-muted)]">Retentie</div>
              </div>
            </div>
          </div>
        </div>
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
            <div className="bg-[var(--kleur-accent)] bg-opacity-10 p-8 rounded-xl border-2 border-[var(--kleur-accent)]">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-[var(--kleur-accent)]" />
                <h3 className="text-2xl font-semibold text-[var(--kleur-accent)]">
                  Nieuw
                </h3>
              </div>
              <p className="text-lg text-[var(--kleur-text)]">
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
              <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-4 rounded-lg w-fit mb-4">
                <TrendingDown className="w-8 h-8 text-[var(--kleur-primary)]" />
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
              <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-4 rounded-lg w-fit mb-4">
                <BarChart3 className="w-8 h-8 text-[var(--kleur-primary)]" />
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
              <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-4 rounded-lg w-fit mb-4">
                <Brain className="w-8 h-8 text-[var(--kleur-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--kleur-text)] mb-3">
                AI-analyse
              </h3>
              <p className="text-[var(--kleur-muted)]">
                De tool helpt je de juiste diepte-vragen te stellen en analyseert open antwoorden automatisch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Integratie */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
            Veilig, AVG-proof en integreert met jouw systemen.
          </h2>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
            <p className="text-lg text-[var(--kleur-muted)] text-center max-w-3xl mx-auto">
              Wij snappen dat dataveiligheid op 1 staat. Volledig AVG-compliant en makkelijk te koppelen.
            </p>
          </div>

          {/* Integraties (placeholder logos) */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="bg-gray-100 px-6 py-4 rounded-lg border border-gray-300">
              <p className="text-sm text-[var(--kleur-muted)] font-medium">HRIS Integraties</p>
            </div>
            <div className="bg-gray-100 px-6 py-4 rounded-lg border border-gray-300">
              <p className="text-sm text-[var(--kleur-muted)] font-medium">AVG Compliant</p>
            </div>
            <div className="bg-gray-100 px-6 py-4 rounded-lg border border-gray-300">
              <p className="text-sm text-[var(--kleur-muted)] font-medium">API Koppelingen</p>
            </div>
          </div>

          {/* Grote CTA */}
          <div className="text-center">
            <button 
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Vraag demo aan voor jouw team
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowContactForm(false)
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Sluiten"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-4">
              Vraag demo aan
            </h2>
            <ContactForm />
          </div>
        </div>
      )}

      </div>

      {/* Brochure Modal */}
      <BrochureDownloadModal 
        isOpen={showBrochureModal}
        onClose={() => setShowBrochureModal(false)}
      />
    </>
  )
}

export default VoorHRProfessionals

