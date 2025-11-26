import { Shield, Lock, Eye, EyeOff, CheckCircle, XCircle, Users, FileText, Clock, Key } from 'lucide-react'
import SEOHead from './components/SEOHead'

function PrivacyVeiligheid() {
  return (
    <>
      <SEOHead 
        title="Privacy & Veiligheid - GroeiRichting"
        description="Bij GroeiRichting staat vertrouwen voorop. We maken het eenvoudig om open te delen, zónder dat antwoorden herleidbaar zijn tot een persoon. AVG-proof en veilig."
        keywords="privacy groeirichting, AVG, GDPR, veiligheid, databescherming, anonimiteit, privacybeleid"
        canonical="https://groeirichting.nl/privacy-veiligheid"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy & Veiligheid - GroeiRichting",
          "description": "Privacy- en veiligheidsbeleid van GroeiRichting. AVG-proof, anoniem en veilig.",
          "about": {
            "@type": "Thing",
            "name": "Privacy en gegevensbescherming",
            "description": "GroeiRichting maakt het eenvoudig om open te delen, zónder dat antwoorden herleidbaar zijn tot een persoon. Managers krijgen inzicht per team, niet per individu."
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Ziet mijn manager mijn individuele antwoorden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee. Rapportages verschijnen alleen op team/rol-niveau en pas boven een minimale groepsgrootte."
                }
              },
              {
                "@type": "Question",
                "name": "Wat gebeurt er met gevoelige informatie die ik noem?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die wordt automatisch gefilterd of geanonimiseerd voordat rapportages worden gemaakt."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen kleine teams herleidbaar zijn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee. Onder de drempel (standaard 4) worden groepen samengevoegd of niet getoond."
                }
              }
            ]
          }
        }}
      />
      <div className="space-y-16 bg-[var(--kleur-background)] py-12">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <Shield className="w-16 h-16 text-[var(--kleur-primary)]" />
        </div>
        <h1 className="text-4xl font-bold text-[var(--kleur-text)] mb-6">
          Privacy & Veiligheid
        </h1>
        <p className="text-xl text-[var(--kleur-muted)] leading-relaxed">
          Bij GroeiRichting staat vertrouwen voorop. We maken het eenvoudig om open te delen, zónder dat antwoorden herleidbaar zijn tot een persoon. Managers krijgen inzicht per team, niet per individu.
        </p>
      </section>

      {/* In het kort */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
          In het kort
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <Eye className="w-12 h-12 text-[var(--kleur-primary)] mx-auto mb-4" />
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">Anoniem en veilig</h3>
            <p className="text-sm text-[var(--kleur-muted)]">
              Managers zien trends op team- en rolniveau, nooit individuele antwoorden.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <Lock className="w-12 h-12 text-[var(--kleur-primary)] mx-auto mb-4" />
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">AVG-proof</h3>
            <p className="text-sm text-[var(--kleur-muted)]">
              We vragen en bewaren alleen wat nodig is, met duidelijke bewaartermijnen.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <Shield className="w-12 h-12 text-[var(--kleur-primary)] mx-auto mb-4" />
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">Bescherming standaard</h3>
            <p className="text-sm text-[var(--kleur-muted)]">
              Versleuteling, toegangsrechten, logging en drempelwaarden tegen herleidbaarheid.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <Users className="w-12 h-12 text-[var(--kleur-primary)] mx-auto mb-4" />
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">Echte verbetering</h3>
            <p className="text-sm text-[var(--kleur-muted)]">
              Medewerkers krijgen samenvattingen en tips om te groeien; teamleiders krijgen concrete signalen.
            </p>
          </div>
        </div>
      </section>

      {/* Wat je wél en níet ziet */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
          Wat je wél en níet ziet
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voor teamleiders/werkgevers */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-primary)] mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Voor teamleiders/werkgevers
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Team- en rolniveau: scores, trends en anonieme samenvattingen.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Inzicht per team: geen organisatie-gemiddelde dat alles verbergt, maar bruikbare signalen waar je direct op kunt sturen.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Geen individuele antwoorden.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="text-red-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Geen kleine subgroepen onder de drempel (standaard: 4 personen) — die worden samengevoegd of verborgen.</p>
              </div>
            </div>
          </div>

          {/* Voor werknemers */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-[var(--kleur-accent)] mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Voor werknemers
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Je eigen samenvatting en tips om te groeien.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Duidelijk wat er met je input gebeurt.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-600 mt-1 flex-shrink-0" />
                <p className="text-[var(--kleur-text)]">Je antwoorden zijn niet zichtbaar voor je manager of collega's.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe we je gegevens beschermen */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
          Hoe we je gegevens beschermen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--kleur-primary)]" />
              Dataminimalisatie
            </h3>
            <p className="text-[var(--kleur-muted)] text-sm">
              We verwerken alleen wat nodig is om gesprekken te voeren, te samenvatten en trends te tonen.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-[var(--kleur-primary)]" />
              Filtering van gevoelige info
            </h3>
            <p className="text-[var(--kleur-muted)] text-sm">
              Bijzondere persoonsgegevens (zoals medische/levensovertuiging) en andere PII worden automatisch gefilterd of geanonimiseerd vóór verwerking.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--kleur-primary)]" />
              Versleuteling standaard
            </h3>
            <p className="text-[var(--kleur-muted)] text-sm">
              Data wordt versleuteld verzonden en opgeslagen.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3 flex items-center gap-2">
              <Key className="w-5 h-5 text-[var(--kleur-primary)]" />
              Strikte toegang
            </h3>
            <p className="text-[var(--kleur-muted)] text-sm">
              Rolgebaseerde rechten (werknemer, teamleider, beheer) en logging van beheeracties.
            </p>
          </div>
        </div>
      </section>

      {/* Bewaartermijn & anonimisering */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
          Bewaartermijn & anonimisering
        </h2>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="w-16 h-16 text-[var(--kleur-primary)] mx-auto mb-4" />
              <p className="text-lg text-[var(--kleur-text)]">
                Werkgever stelt de bewaartermijn in voor ruwe antwoorden: <strong>30, 60, 90 of 180 dagen</strong>.
              </p>
            </div>
            
            <div className="text-center">
              <EyeOff className="w-16 h-16 text-[var(--kleur-primary)] mx-auto mb-4" />
              <p className="text-lg text-[var(--kleur-text)]">
                Na die periode worden ruwe antwoorden <strong>onomkeerbaar geanonimiseerd</strong> (niet meer terug te herleiden).
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-3">Samenvattingen blijven bewaard:</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Werknemers zien hun eigen samenvatting terug.</li>
                <li>• Werkgevers zien geaggregeerde samenvattingen en trends per team/rol.</li>
                <li>• Zo kun je later voortgang meten, zonder herleidbare details.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Jouw rechten */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
          Jouw rechten
        </h2>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <Shield className="w-16 h-16 text-[var(--kleur-primary)] mx-auto mb-6" />
          <div className="space-y-4">
            <p className="text-lg text-[var(--kleur-text)]">
              <strong>Inzage, correctie, verwijdering:</strong> we helpen je om gebruik te maken van je AVG-rechten.
            </p>
            <p className="text-lg text-[var(--kleur-text)]">
              <strong>Vragen of zorgen?</strong> We reageren snel en transparant.
            </p>
          </div>
        </div>
      </section>

      {/* Veelgestelde vragen */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-8 text-center">
          Veelgestelde vragen
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3">
              Ziet mijn manager mijn individuele antwoorden?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Nee. Rapportages verschijnen alleen op team/rol-niveau en pas boven een minimale groepsgrootte.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3">
              Wat gebeurt er met gevoelige informatie die ik noem?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Die wordt automatisch gefilterd of geanonimiseerd voordat rapportages worden gemaakt.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3">
              Wat blijft er bewaard na de bewaartermijn?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Ruwe antwoorden worden geanonimiseerd. Samenvattingen (voor jou en op teamniveau) en trenddata blijven beschikbaar zodat je verbetering kunt volgen.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3">
              Kunnen kleine teams herleidbaar zijn?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Nee. Onder de drempel (standaard 4) worden groepen samengevoegd of niet getoond.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-3">
              Waar staat de data en hoe wordt die beveiligd?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Data wordt versleuteld opgeslagen en verzonden. We hanteren strikte toegangsrechten en logging.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default PrivacyVeiligheid
