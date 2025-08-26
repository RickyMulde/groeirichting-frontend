import { Link } from 'react-router-dom'
import { Shield, Lock, Users, Eye, CheckCircle, AlertTriangle } from 'lucide-react'

function UitlegPrivacy() {
  return (
    <div className="min-h-screen bg-[var(--kleur-background)] text-[var(--kleur-text)]">
      <div className="max-w-4xl mx-auto pt-20 px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="text-[var(--kleur-primary)] w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--kleur-primary)]">
            Hoe gaan wij om met jouw gegevens?
          </h1>
          <p className="text-lg text-[var(--kleur-muted)] max-w-2xl mx-auto">
            Jouw privacy en vertrouwen zijn voor ons van het grootste belang. Hier leggen we precies uit hoe GroeiRichting werkt en hoe we jouw gegevens beschermen.
          </p>
        </div>

        {/* Hoe werkt GroeiRichting */}
        <section className="bg-white shadow-md p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--kleur-primary)] flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            Hoe werkt GroeiRichting?
          </h2>
          
          <div className="space-y-4 text-[var(--kleur-muted)]">
            <div className="flex items-start gap-3">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">1</div>
              <p>Je ontvangt een uitnodiging van je werkgever.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">2</div>
              <p>Je verifieert je account en vult deze aan met je gegevens.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">3</div>
              <p>Vervolgens kun je bij mijn instellingen je account beheren.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[var(--kleur-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">4</div>
              <p>Daarna start je de gesprekken met AI.</p>
            </div>
          </div>
        </section>

        {/* Hoe werkt het gesprek */}
        <section className="bg-white shadow-md p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--kleur-accent)] flex items-center gap-3">
            <Users className="w-6 h-6" />
            Hoe werkt het gesprek?
          </h2>
          
          <div className="space-y-6 text-[var(--kleur-muted)]">
            <p>
              Er zijn 4 thema's. Elk thema heeft zijn eigen vragen. Jij geeft antwoord op de vragen die gesteld worden. 
              Vervolgens reageert AI daar weer op om jou te helpen een goed antwoord te formuleren en te helpen om na te denken 
              hoe de organisatie kan groeien of jijzelf.
            </p>
            
            <p>
              Van dit gesprek wordt een samenvatting gemaakt, zodat jij later eenvoudig terug kunt zien hoe dat gesprek is verlopen. 
              Daarbij krijg je ook vervolgacties. Dit kunnen acties zijn, zoals:
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 space-y-2">
              <p className="font-medium text-blue-800">Voorbeelden van vervolgacties:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Plan een afspraak om ... te bespreken</li>
                <li>Informeer naar een cursus om ... te verbeteren</li>
                <li>Neem contact op met ... voor ondersteuning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Samenvatting voor werkgever */}
        <section className="bg-white shadow-md p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--kleur-secondary)] flex items-center gap-3">
            <Eye className="w-6 h-6" />
            Wat ziet jouw werkgever?
          </h2>
          
          <div className="space-y-6 text-[var(--kleur-muted)]">
            <p>
              Jouw collega's doen hetzelfde. Als al jouw collega's alle gesprekken per thema hebben afgerond, 
              dan wordt er op basis van die gesprekken een samenvatting gemaakt voor jouw werkgever.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-medium text-green-800">
                Hierbij wordt er zeer streng op gelet dat dit nooit terug mag leiden naar een persoon. 
                Jouw werkgever ziet dus nooit individuele informatie die is terug te leiden naar jou persoonlijk.
              </p>
            </div>
            
            <p>
              En dat maakt het een sterke tool. Jij kunt open en eerlijk zijn. Jouw werkgever krijgt de input 
              om hier ook echt iets mee te gaan doen. Want, naast deze samenvatting ontvangt ook jouw werkgever verbeteradviezen.
            </p>
          </div>
        </section>

        {/* Persoonsgegevens */}
        <section className="bg-white shadow-md p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--kleur-primary)] flex items-center gap-3">
            <Lock className="w-6 h-6" />
            (Bijzondere) Persoonsgegevens
          </h2>
          
          <div className="space-y-6 text-[var(--kleur-muted)]">
            <p>
              De AI tool die achter GroeiRichting zit is OpenAI via Microsoft Azure. Dit is volledig AVG compliant 
              en dat is het niet zonder reden. Er wordt actief gefilterd op gevoelige gegevens, zodat er niet onnodig 
              gegevens worden bewaard over jou.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-medium text-yellow-800">
                Voorbeeld: Stel dat jij zou zeggen: "Ik kan niet hard werken, want ik heb de ziekte van Lyme." 
                Dan wordt dit tegengehouden, zodat dit niet in onze database beland en dus ook niet onnodig wordt bewaard.
              </p>
            </div>
            
            <p>
              We gebruiken geavanceerde technologie om gevoelige informatie te detecteren en te filteren, 
              zodat jouw privacy altijd gewaarborgd blijft.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-white shadow-md p-8 rounded-xl border-2 border-orange-200">
          <h2 className="text-2xl font-semibold mb-6 text-orange-600 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            Belangrijke informatie
          </h2>
          
          <div className="space-y-4 text-[var(--kleur-muted)]">
            <p>
              <strong>Disclaimer:</strong> AI genereert samenvattingen voor de werkgever op basis van alle gesprekken 
              van alle werknemers. Ook al krijgt de AI instructies dat informatie in deze samenvatting nooit terug 
              mag leiden naar 1 persoon, blijft het AI. Het kan dus mogelijk zijn dat de werkgever een vermoeden 
              heeft wie iets gezegd zou kunnen hebben.
            </p>
            
            <p className="text-sm italic">
              We doen er alles aan om dit te voorkomen, maar het is belangrijk om te weten dat dit een mogelijkheid blijft 
              bij het gebruik van AI-technologie.
            </p>
          </div>
        </section>

        {/* Vertrouwen */}
        <section className="bg-gradient-to-r from-[var(--kleur-primary)] to-[var(--kleur-accent)] text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Jouw vertrouwen is onze prioriteit</h2>
          <p className="text-lg mb-6 opacity-90">
            We geloven dat open communicatie alleen mogelijk is in een omgeving van vertrouwen en veiligheid. 
            Daarom investeren we continu in de beste beveiliging en privacy-bescherming.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>AVG Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>End-to-end beveiligd</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Microsoft Azure</span>
            </div>
          </div>
        </section>

        {/* Terug naar portaal */}
        <div className="text-center">
          <Link to="/werknemersportaal" className="btn btn-primary">
            Terug naar werknemersportaal
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UitlegPrivacy
