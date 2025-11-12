import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react'
import ContactForm from './components/ContactForm'

function Contact() {
  return (
    <div className="space-y-16 bg-[var(--kleur-background)] py-8">
      
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-[var(--kleur-primary)] mb-4">
          Neem contact met ons op
        </h1>
        <p className="text-xl text-[var(--kleur-muted)] max-w-2xl mx-auto">
          Heb je vragen over GroeiRichting? We helpen je graag verder. Stuur een bericht of bel ons direct.
        </p>
      </section>

      {/* Contact informatie en formulier */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact informatie */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-6">
                Contactgegevens
              </h2>
              
              <div className="space-y-6">
                {/* E-mail */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-[var(--kleur-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--kleur-text)] mb-1">E-mail</h3>
                    <p className="text-[var(--kleur-muted)]">rick@groeirichting.nl</p>
                    <p className="text-sm text-[var(--kleur-muted)] mt-1">
                      We reageren meestal binnen 24 uur
                    </p>
                  </div>
                </div>

                {/* Telefoon */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[var(--kleur-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--kleur-text)] mb-1">Telefoon</h3>
                    <p className="text-[var(--kleur-muted)]">085-060 7424</p>
                    <p className="text-sm text-[var(--kleur-muted)] mt-1">
                      Maandag t/m vrijdag, 9:00 - 17:00
                    </p>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--kleur-primary)] bg-opacity-10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[var(--kleur-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--kleur-text)] mb-1">Kantoor</h3>
                    <p className="text-[var(--kleur-muted)]">
                      GroeiRichting B.V.<br />
                      Amsterdam, Nederland
                    </p>
                    <p className="text-sm text-[var(--kleur-muted)] mt-1">
                      Afspraken op locatie mogelijk
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Openingstijden */}
            <div>
              <h3 className="text-xl font-bold text-[var(--kleur-primary)] mb-4">
                Openingstijden
              </h3>
              <div className="flex items-start gap-4">
                <div className="bg-[var(--kleur-accent)] bg-opacity-10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-[var(--kleur-accent)]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--kleur-text)]">Maandag - Vrijdag</span>
                    <span className="text-[var(--kleur-muted)]">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--kleur-text)]">Weekend</span>
                    <span className="text-[var(--kleur-muted)]">Gesloten</span>
                  </div>
                  <p className="text-sm text-[var(--kleur-muted)] mt-3">
                    Voor spoedgevallen zijn we ook buiten kantoortijden bereikbaar.
                  </p>
                </div>
              </div>
            </div>

            {/* Snelle reactie garantie */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-800">Snelle reactie</h3>
              </div>
              <p className="text-green-700 text-sm">
                We streven ernaar om binnen 24 uur te reageren op alle vragen. 
                Voor urgente zaken kun je ons direct bellen.
              </p>
            </div>
          </div>

          {/* Contactformulier */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--kleur-primary)] mb-6">
              Stuur een bericht
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ sectie */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[var(--kleur-primary)] mb-12">
          Veelgestelde vragen
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">
              Hoe snel kan ik starten met GroeiRichting?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Na een kennismakingsgesprek kunnen we binnen 1-2 weken starten. 
              We helpen je met de setup en training van je team.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">
              Wat zijn de kosten van GroeiRichting?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              De prijzen zijn afhankelijk van het aantal medewerkers en gewenste functionaliteiten. 
              Vraag een offerte aan voor een persoonlijk voorstel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">
              Is er ondersteuning tijdens de implementatie?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Ja, we bieden volledige ondersteuning tijdens de implementatie en daarna. 
              Je krijgt een dedicated contactpersoon en toegang tot onze helpdesk.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">
              Hoe zit het met de privacy van mijn medewerkers?
            </h3>
            <p className="text-[var(--kleur-muted)]">
              Privacy en veiligheid staan voorop. Alle data wordt veilig opgeslagen en 
              we voldoen aan de AVG/GDPR richtlijnen. Lees meer op onze privacy pagina.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-[var(--kleur-text)] mb-2">
              Kan ik een demo of proefperiode aanvragen?
            </h3>
            <p className="text-[var(--kleur-text)]">
              Natuurlijk! We bieden graag een persoonlijke demo aan. 
              <a href="/offerte" className="text-[var(--kleur-primary)] hover:underline ml-1">
                Vraag hier een demo aan
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA sectie */}
      <section className="bg-[var(--kleur-primary)] text-white py-12 px-6 rounded-xl text-center max-w-4xl mx-auto">
        <MessageSquare className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Plan een gratis demo en ontdek hoe GroeiRichting jouw organisatie kan helpen groeien.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/offerte" className="btn btn-secondary">
            Vraag demo aan
          </a>
          <a href="tel:+31850607424" className="btn btn-outline-white">
            Bel direct
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact
