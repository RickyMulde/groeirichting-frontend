import SEOHead from './components/SEOHead'

function Privacy() {
  return (
    <>
      <SEOHead 
        title="Privacyverklaring GroeiRichting.nl - Website Privacy"
        description="Privacyverklaring voor de website van GroeiRichting B.V. Lees hoe wij omgaan met persoonsgegevens op onze publieke website."
        keywords="privacy, gegevensbescherming, website, GroeiRichting, AVG, GDPR, cookies"
        canonical="https://groeirichting.nl/privacy-groeiportaal"
      />
      
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Document Header */}
        <div className="border-b border-gray-300 pb-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Privacyverklaring GroeiRichting.nl
          </h1>
          <div className="text-sm text-gray-600">
            <p><strong>Versie:</strong> 1.0 | <strong>Laatst bijgewerkt:</strong> oktober 2025</p>
          </div>
        </div>

        {/* Document Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Sectie 1 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              1. Wie wij zijn
            </h2>
            <p className="text-gray-800 mb-4">
              Deze privacyverklaring is van toepassing op de website <strong>www.groeirichting.nl</strong>, eigendom van:
            </p>
            <div className="border border-gray-300 p-4 mb-4">
              <p className="font-semibold text-gray-800 mb-2">GroeiRichting B.V.</p>
              <p className="text-gray-800 mb-1">Schutstraat 145, 7907 CD Hoogeveen, Nederland</p>
              <p className="text-gray-800">KvK-nummer: 98185543</p>
            </div>
            <p className="text-gray-800 mb-4">
              Voor vragen over privacy of gegevensbescherming kun je contact opnemen via:
            </p>
            <p className="text-gray-800 mb-4">
              E-mail: <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline">info@groeirichting.nl</a>
            </p>
            <p className="text-gray-800">
              Binnen GroeiRichting is Rick Mulderij het aanspreekpunt voor privacyzaken.
              Er is geen formele Functionaris Gegevensbescherming aangesteld bij de Autoriteit Persoonsgegevens.
            </p>
          </section>

          {/* Sectie 2 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              2. Toepassingsgebied
            </h2>
            <p className="text-gray-800 mb-4">
              Deze verklaring geldt uitsluitend voor het gebruik van onze publieke website en het contact dat via de site plaatsvindt (zoals demo-aanvragen, contactformulieren en nieuwsbrieven).
            </p>
            <div className="border border-gray-300 p-4">
              <p className="text-gray-800 mb-2">
                Voor het gebruik van ons online platform ("GroeiPortaal") geldt een aparte privacyverklaring:
              </p>
              <p className="text-gray-800">
                <a href="/privacy-portaal" className="text-blue-600 hover:underline font-medium">Privacyverklaring GroeiPortaal</a>
              </p>
            </div>
          </section>

          {/* Sectie 3 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              3. Persoonsgegevens die wij verwerken
            </h2>
            <p className="text-gray-800 mb-4">
              Wij verwerken uitsluitend persoonsgegevens die jij zelf aan ons verstrekt of die automatisch worden verzameld bij gebruik van de website.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1. Gegevens die je zelf verstrekt</h3>
            <p className="text-gray-800 mb-3">
              Bijvoorbeeld wanneer je:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-800 mb-4">
              <li>het contactformulier invult;</li>
              <li>een demo aanvraagt of document downloadt;</li>
              <li>je inschrijft voor een nieuwsbrief.</li>
            </ul>
            <p className="text-gray-800 mb-3">
              Wij kunnen dan verwerken:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-800 mb-6">
              <li>Naam</li>
              <li>E-mailadres</li>
              <li>Bedrijfsnaam</li>
              <li>Telefoonnummer</li>
              <li>Bericht of vraag</li>
              <li>IP-adres (technisch noodzakelijk voor verzending)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2. Gegevens die automatisch worden verzameld</h3>
            <p className="text-gray-800 mb-3">
              Bij bezoek aan onze website verzamelen wij beperkte technische gegevens via cookies en analytics-tools, zoals:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-800 mb-4">
              <li>IP-adres (geanonimiseerd)</li>
              <li>Browser- en apparaatgegevens</li>
              <li>Bezochte pagina's en klikgedrag</li>
            </ul>
            <p className="text-gray-800">
              Deze informatie wordt uitsluitend gebruikt om onze website te verbeteren en marketinginspanningen te meten.
            </p>
          </section>

          {/* Sectie 4 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              4. Doeleinden van de verwerking
            </h2>
            <p className="text-gray-800 mb-4">
              Wij gebruiken de verzamelde gegevens uitsluitend voor:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 mb-4">
              <li>Het beantwoorden van contactaanvragen en demo-verzoeken</li>
              <li>Het verzenden van nieuwsbrieven (alleen na aanmelding)</li>
              <li>Het verbeteren van de website via analyse van bezoekersgedrag</li>
              <li>Marketingcampagnes gericht op bedrijven (B2B)</li>
              <li>Naleving van wettelijke verplichtingen, zoals administratie</li>
            </ul>
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="text-gray-800 font-medium">
                Wij gebruiken je gegevens niet voor geautomatiseerde besluitvorming of profilering.
              </p>
            </div>
          </section>

          {/* Sectie 5 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              5. Rechtsgrond
            </h2>
            <p className="text-gray-800 mb-4">
              De verwerking van persoonsgegevens op onze website berust op de volgende grondslagen:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              <li><strong>Toestemming (art. 6 lid 1 sub a AVG)</strong> – bij nieuwsbriefinschrijving en gebruik van niet-noodzakelijke cookies</li>
              <li><strong>Gerechtvaardigd belang (art. 6 lid 1 sub f AVG)</strong> – voor beveiliging, bereikmeting en marketing aan zakelijke contacten</li>
              <li><strong>Overeenkomst (art. 6 lid 1 sub b AVG)</strong> – bij aanvragen of communicatie die gericht is op het sluiten van een overeenkomst</li>
            </ul>
          </section>

          {/* Sectie 6 - Tabel */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              6. Bewaartermijnen
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded">
                <thead>
                  <tr className="bg-[var(--kleur-primary)] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Gegevenscategorie</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Contactaanvragen</td>
                    <td className="border border-gray-300 px-4 py-3">12 maanden na afhandeling</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Nieuwsbriefgegevens</td>
                    <td className="border border-gray-300 px-4 py-3">Tot afmelding</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Analytics- en cookiegegevens</td>
                    <td className="border border-gray-300 px-4 py-3">Volgens cookie-instellingen, maximaal 26 maanden</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Administratieve gegevens</td>
                    <td className="border border-gray-300 px-4 py-3">7 jaar (wettelijke verplichting)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Sectie 7 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              7. Cookies en analytische tools
            </h2>
            <p className="text-gray-800 mb-4">
              Onze website gebruikt cookies en vergelijkbare technieken.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">7.1. Soorten cookies</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 mb-4">
              <li><strong>Strikt noodzakelijke cookies:</strong> voor correcte werking van de site (bijv. beveiliging, sessiebeheer)</li>
              <li><strong>Analytische cookies:</strong> via Google Analytics, ingesteld met geanonimiseerde IP-adressen en zonder gegevensdeling met Google</li>
              <li><strong>Marketingcookies:</strong> worden op dit moment niet gebruikt</li>
            </ul>
            <p className="text-gray-800 mb-4">
              Wij tonen een cookiebanner waarmee bezoekers toestemming kunnen geven of weigeren voor niet-noodzakelijke cookies.
            </p>
            <p className="text-gray-800">
              Meer informatie vind je in onze aparte <a href="#" className="text-blue-600 hover:underline">Cookieverklaring</a>.
            </p>
          </section>

          {/* Sectie 8 - Tabel subverwerkers */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              8. Delen van gegevens met derden
            </h2>
            <p className="text-gray-800 mb-4">
              Wij delen persoonsgegevens alleen met derden voor zover dat noodzakelijk is voor de genoemde doeleinden.
              Wij maken gebruik van de volgende dienstverleners (verwerkers):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded">
                <thead>
                  <tr className="bg-[var(--kleur-accent)] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Dienst</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Leverancier</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Locatie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Websitehosting & e-mail</td>
                    <td className="border border-gray-300 px-4 py-3">Hostnet</td>
                    <td className="border border-gray-300 px-4 py-3">Nederland</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">CRM</td>
                    <td className="border border-gray-300 px-4 py-3">Zoho CRM</td>
                    <td className="border border-gray-300 px-4 py-3">EU</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Analytics</td>
                    <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                    <td className="border border-gray-300 px-4 py-3">EU (data geanonimiseerd)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">E-mailmarketing</td>
                    <td className="border border-gray-300 px-4 py-3">Resend</td>
                    <td className="border border-gray-300 px-4 py-3">Ierland (EU)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-800 mt-4">
              Indien verwerking buiten de EER plaatsvindt, gebeurt dat uitsluitend onder het EU–US Data Privacy Framework of met standaardcontractbepalingen (SCC's).
            </p>
          </section>

          {/* Sectie 9 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              9. Beveiliging
            </h2>
            <p className="text-gray-800 mb-4">
              GroeiRichting neemt passende beveiligingsmaatregelen om jouw gegevens te beschermen tegen verlies, misbruik of onbevoegde toegang, waaronder:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-800">
              <li>HTTPS-verbinding (SSL/TLS)</li>
              <li>Strikte toegangsrechten</li>
              <li>Regelmatige updates en beveiligingspatches</li>
              <li>Versleutelde opslag van back-ups</li>
            </ul>
          </section>

          {/* Sectie 10 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              10. Jouw rechten
            </h2>
            <p className="text-gray-800 mb-4">
              Je hebt het recht om:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-800 mb-4">
              <li>inzage te vragen in jouw persoonsgegevens;</li>
              <li>onjuiste gegevens te laten corrigeren;</li>
              <li>bezwaar te maken tegen verwerking op basis van gerechtvaardigd belang;</li>
              <li>toestemming in te trekken;</li>
              <li>verwijdering te verzoeken, tenzij wettelijke bewaarplicht geldt.</li>
            </ul>
            <p className="text-gray-800 mb-4">
              Verzoeken kun je richten aan:
            </p>
            <p className="text-gray-800 mb-4">
              E-mail: <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline">info@groeirichting.nl</a>
            </p>
            <p className="text-gray-800">
              Wij reageren binnen 30 dagen.
              Bij twijfel over de identiteit kunnen wij aanvullende informatie vragen om het verzoek te verifiëren.
            </p>
          </section>

          {/* Sectie 11 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              11. Klachten
            </h2>
            <p className="text-gray-800 mb-4">
              Ben je ontevreden over de manier waarop wij omgaan met jouw persoonsgegevens?
              Neem dan eerst contact met ons op via 
              <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline ml-1">info@groeirichting.nl</a>.
            </p>
            <p className="text-gray-800">
              Je hebt daarnaast altijd het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens via 
              <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">www.autoriteitpersoonsgegevens.nl</a>.
            </p>
          </section>

          {/* Sectie 12 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              12. Wijzigingen
            </h2>
            <p className="text-gray-800">
              GroeiRichting kan deze privacyverklaring van tijd tot tijd aanpassen.
              De meest actuele versie is altijd beschikbaar op 
              <a href="https://www.groeirichting.nl/privacy" className="text-blue-600 hover:underline ml-1">www.groeirichting.nl/privacy</a>.
            </p>
          </section>

          {/* Document Footer */}
          <div className="border-t border-gray-300 pt-6 mt-8">
            <div className="border border-gray-300 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">GroeiRichting B.V.</h3>
              <p className="text-gray-800 mb-2">Schutstraat 145</p>
              <p className="text-gray-800 mb-4">7907 CD Hoogeveen</p>
              <p>E-mail: <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline">info@groeirichting.nl</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyGroeiportaal
