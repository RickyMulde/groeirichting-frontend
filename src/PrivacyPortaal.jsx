import SEOHead from './components/SEOHead'

function PrivacyPortaal() {
  return (
    <>
      <SEOHead 
        title="Privacyverklaring GroeiPortaal - GroeiRichting"
        description="Privacyverklaring voor het GroeiPortaal van GroeiRichting B.V. Lees hoe wij omgaan met persoonsgegevens van werkgevers en werknemers."
        keywords="privacy, gegevensbescherming, GroeiPortaal, AVG, GDPR, persoonsgegevens"
        canonical="https://groeirichting.nl/privacy"
      />
      
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Document Header */}
        <div className="border-b-2 border-[var(--kleur-primary)] pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacyverklaring GroeiPortaal
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
            <span><strong>Versie:</strong> 1.1</span>
            <span><strong>Laatst bijgewerkt:</strong> oktober 2025</span>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-gray-50 p-4 rounded border-l-4 border-[var(--kleur-primary)] mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact voor privacyzaken</h2>
          <div className="space-y-1">
            <p><strong>GroeiRichting B.V.</strong></p>
            <p>Schutstraat 145, 7907 CD Hoogeveen, Nederland</p>
            <p>KvK: 98185543</p>
            <p>E-mail: <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline">info@groeirichting.nl</a></p>
            <p className="text-sm text-gray-600 mt-2">
              Aanspreekpunt: Rick Mulderij
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Sectie 1 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              1. Wie wij zijn
            </h2>
            <p className="text-gray-800 mb-4">
              Het GroeiPortaal is een online platform van GroeiRichting B.V., gevestigd aan Schutstraat 145, 7907 CD Hoogeveen, Nederland.
              Ingeschreven bij de Kamer van Koophandel onder nummer 98185543.
            </p>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">2. Toepassingsgebied</h2>
            <p className="text-gray-800 mb-4">
              Deze privacyverklaring is van toepassing op het gebruik van het GroeiPortaal door:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 mb-4">
              <li>Werkgevers die het platform gebruiken om medewerkers uit te nodigen, gesprekken te beheren en resultaten in te zien.</li>
              <li>Werknemers die via hun werkgever deelnemen aan AI-ondersteunde gespreksrondes binnen het platform.</li>
            </ul>
            <p className="text-gray-800">
              Voor informatie over het gebruik van onze publieke website (www.groeirichting.nl) geldt een afzonderlijke privacyverklaring:
              <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacyverklaring GroeiRichting.nl</a>.
            </p>
          </section>

          {/* Sectie 3 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">3. Rol van partijen</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--kleur-primary)]">
                <h3 className="font-semibold text-gray-900 mb-2">Werkgever</h3>
                <p className="text-gray-800">verwerkingsverantwoordelijke voor de persoonsgegevens van werknemers die via het GroeiPortaal worden verwerkt.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--kleur-accent)]">
                <h3 className="font-semibold text-blue-600 mb-2">GroeiRichting B.V.</h3>
                <p className="text-gray-800">verwerker die deze verwerking uitvoert namens de werkgever, conform de verwerkersovereenkomst die onderdeel uitmaakt van de samenwerking.</p>
              </div>
            </div>
            <p className="text-gray-800 mt-4">
              GroeiRichting bepaalt dus niet zelfstandig de doeleinden van de verwerking van werknemersgegevens.
            </p>
          </section>

          {/* Sectie 4 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">4. Welke persoonsgegevens worden verwerkt</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">4.1 Werkgevers</h3>
                <p className="text-gray-800 mb-3">Voor het aanmaken en beheren van accounts:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-800">
                  <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
                  <li>Bedrijfsnaam, factuuradres, KvK- en btw-gegevens</li>
                  <li>Inloggegevens en logbestanden</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">4.2 Werknemers</h3>
                <p className="text-gray-800 mb-3">Voor het gebruik van het portaal:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-800">
                  <li>Voornaam, achternaam, geboortedatum, geslacht</li>
                  <li>Werk-e-mailadres en organisatiekoppeling</li>
                  <li>Antwoorden en voortgang in gespreksrondes</li>
                  <li>Eventuele AI-samenvattingen en reflectieverslagen</li>
                  <li>Technische gegevens zoals IP-adres, browser en inlogtijdstip</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-800">
                <strong>Belangrijk:</strong> Bijzondere persoonsgegevens (zoals gezondheidsinformatie, politieke opvattingen of geloofsovertuigingen) worden niet opgeslagen. 
                Ons systeem detecteert en filtert deze automatisch via een eigen AI-model dat volledig op onze eigen server draait.
              </p>
            </div>
          </section>

          {/* Sectie 5 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">5. Doeleinden van de verwerking</h2>
            <p className="text-gray-800 mb-4">
              De persoonsgegevens worden uitsluitend verwerkt om:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 mb-4">
              <li>Het platform technisch en functioneel te laten werken (authenticatie, sessiebeheer, data-opslag)</li>
              <li>AI-gestuurde gespreksanalyses en samenvattingen te genereren</li>
              <li>Rapportages voor werkgevers mogelijk te maken</li>
              <li>Ondersteuning en klantenservice te bieden</li>
              <li>Beveiliging en foutanalyse te waarborgen</li>
              <li>Facturatie en administratie uit te voeren</li>
            </ul>
            <div className="border border-gray-300 p-4">
              <p className="text-gray-800 font-medium">
                GroeiRichting gebruikt werknemersgegevens uitsluitend binnen opdracht van de werkgever en niet voor eigen doeleinden of marketing.
              </p>
            </div>
          </section>

          {/* Sectie 6 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">6. Rechtsgrond</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--kleur-primary)]">
                <p className="text-gray-800">
                  <strong>Werknemersdata:</strong> verwerking is noodzakelijk voor de uitvoering van de overeenkomst tussen werkgever en werknemer, 
                  waarbij de werkgever verantwoordelijk is voor de rechtmatige grondslag (meestal uitvoering arbeidsovereenkomst of gerechtvaardigd belang).
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--kleur-accent)]">
                <p className="text-gray-800">
                  <strong>Werkgeversdata:</strong> verwerking is noodzakelijk voor de uitvoering van de overeenkomst met GroeiRichting (art. 6 lid 1 sub b AVG).
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--kleur-secondary)]">
                <p className="text-gray-800">
                  <strong>Beveiliging en foutanalyse:</strong> gerechtvaardigd belang van GroeiRichting om het platform veilig en stabiel te houden (art. 6 lid 1 sub f AVG).
                </p>
              </div>
            </div>
          </section>

          {/* Sectie 7 - Tabel */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">7. Bewaartermijnen</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Categorie</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Gespreksantwoorden</td>
                    <td className="border border-gray-300 px-4 py-3">60 dagen (instelbaar per werkgever)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Samenvattingen</td>
                    <td className="border border-gray-300 px-4 py-3">zolang de werkgever klant is, uiterlijk 60 dagen na beëindiging van de klantrelatie</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Account- en loggegevens</td>
                    <td className="border border-gray-300 px-4 py-3">maximaal 12 maanden</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Facturatie- en administratieve gegevens</td>
                    <td className="border border-gray-300 px-4 py-3">7 jaar (wettelijke bewaarplicht)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Back-ups</td>
                    <td className="border border-gray-300 px-4 py-3">dagelijkse rotatie, automatische overschrijving</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-800 mt-4 font-medium">
              Na beëindiging van de klantrelatie worden alle gegevens binnen 60 dagen permanent verwijderd.
            </p>
          </section>

          {/* Sectie 8 - Tabel subverwerkers */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">8. Ontvangers en subverwerkers</h2>
            <p className="text-gray-800 mb-4">
              Om onze dienstverlening mogelijk te maken, maakt GroeiRichting gebruik van zorgvuldig geselecteerde subverwerkers:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Dienst</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Leverancier</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Locatie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Database, authenticatie en opslag</td>
                    <td className="border border-gray-300 px-4 py-3">Supabase</td>
                    <td className="border border-gray-300 px-4 py-3">EU</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Backend-hosting</td>
                    <td className="border border-gray-300 px-4 py-3">Render</td>
                    <td className="border border-gray-300 px-4 py-3">EU (Frankfurt)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">E-mailverzending</td>
                    <td className="border border-gray-300 px-4 py-3">Resend</td>
                    <td className="border border-gray-300 px-4 py-3">Ierland (EU)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">AI-verwerking</td>
                    <td className="border border-gray-300 px-4 py-3">Microsoft Azure OpenAI</td>
                    <td className="border border-gray-300 px-4 py-3">EU-regio</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">CRM</td>
                    <td className="border border-gray-300 px-4 py-3">Zoho CRM</td>
                    <td className="border border-gray-300 px-4 py-3">EU-datacenter</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Boekhouding</td>
                    <td className="border border-gray-300 px-4 py-3">SnelStart</td>
                    <td className="border border-gray-300 px-4 py-3">Nederland</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Domein & mailhosting</td>
                    <td className="border border-gray-300 px-4 py-3">Hostnet</td>
                    <td className="border border-gray-300 px-4 py-3">Nederland</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-800 mt-4">
              De actuele lijst van subverwerkers is op aanvraag beschikbaar via 
              <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline ml-1">info@groeirichting.nl</a>.
            </p>
            <p className="text-gray-800 mt-2">
              Voor zover sprake is van doorgifte aan partijen buiten de EER, worden aanvullende waarborgen toegepast zoals de door de Europese Commissie goedgekeurde standaardcontractbepalingen (SCC's).
            </p>
          </section>

          {/* Sectie 9 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">9. Doorgifte buiten de Europese Economische Ruimte</h2>
            <p className="text-gray-800 mb-4">
              In principe vindt alle verwerking binnen de EU plaats.
            </p>
            <p className="text-gray-800 mb-4">
              Indien verwerking buiten de EER plaatsvindt, gebeurt dat uitsluitend:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              <li>Binnen het kader van het EU–US Data Privacy Framework, of</li>
              <li>Op basis van standaardcontractbepalingen (SCC's) die een passend beschermingsniveau waarborgen.</li>
            </ul>
          </section>

          {/* Sectie 10 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">10. Beveiliging van gegevens</h2>
            <p className="text-gray-800 mb-4">
              GroeiRichting neemt passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.
            </p>
            <p className="text-gray-800 mb-4">
              Deze maatregelen omvatten onder meer:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Versleuteling van data tijdens transport en opslag (SSL/TLS, AES)</li>
                <li>Strikte toegangsrechten volgens het least privilege-principe</li>
                <li>Scheiding tussen ontwikkel-, test- en productieomgevingen</li>
                <li>Logging van toegang en systeemactiviteiten</li>
              </ul>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Beveiligde authenticatie via Supabase Auth</li>
                <li>Dagelijkse versleutelde back-ups</li>
                <li>Dataminimalisatie en pseudonimisering waar mogelijk</li>
              </ul>
            </div>
          </section>

          {/* Sectie 11 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">11. Geautomatiseerde besluitvorming</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-800 mb-4">
                Binnen het GroeiPortaal vindt geen geautomatiseerde besluitvorming plaats die rechtsgevolgen heeft of werknemers significant treft.
              </p>
              <p className="text-gray-800 mb-4">
                De AI-functionaliteit ondersteunt werknemers bij reflectie en dialoog.
                De resultaten zijn niet bedoeld als beoordelingsinstrument en worden niet gebruikt voor personeelsbeslissingen.
              </p>
              <p className="text-gray-800 font-medium">
                GroeiRichting draagt geen verantwoordelijkheid voor HR-besluiten van werkgevers.
              </p>
            </div>
          </section>

          {/* Sectie 12 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">12. Rechten van betrokkenen</h2>
            <p className="text-gray-800 mb-4">
              Werknemers kunnen hun privacyrechten (inzage, correctie, verwijdering, beperking, bezwaar en dataportabiliteit) uitoefenen via hun werkgever, die verwerkingsverantwoordelijke is.
            </p>
            <p className="text-gray-800 mb-4">
              Werkgevers of andere betrokkenen kunnen verzoeken rechtstreeks richten aan:
            </p>
            <p className="text-gray-800 mb-4">
              E-mail: <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline">info@groeirichting.nl</a>
            </p>
            <p className="text-gray-800">
              Wij reageren binnen 30 dagen.
              Bij twijfel over de identiteit van de verzoeker kunnen wij vragen om aanvullende informatie, uitsluitend om te verifiëren dat het verzoek rechtmatig wordt ingediend.
            </p>
          </section>

          {/* Sectie 13 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">13. Klachten</h2>
            <p className="text-gray-800 mb-4">
              Ben je ontevreden over de verwerking van je persoonsgegevens?
              Neem dan eerst contact met ons op via 
              <a href="mailto:info@groeirichting.nl" className="text-blue-600 hover:underline ml-1">info@groeirichting.nl</a>.
            </p>
            <p className="text-gray-800 mb-4">
              Wij proberen klachten altijd eerst samen op te lossen.
            </p>
            <p className="text-gray-800">
              Daarnaast heb je het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens via 
              <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">www.autoriteitpersoonsgegevens.nl</a>.
            </p>
          </section>

          {/* Sectie 14 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">14. Wijzigingen</h2>
            <p className="text-gray-800">
              GroeiRichting kan deze privacyverklaring van tijd tot tijd wijzigen, bijvoorbeeld bij wetswijzigingen of aanpassingen in de dienstverlening.
              De meest actuele versie is altijd beschikbaar in het GroeiPortaal.
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

export default PrivacyPortaal
