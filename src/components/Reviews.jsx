import { Quote } from 'lucide-react'

function Reviews() {
  const reviews = [
    {
      company: "Henk Mulderij Financieel Advieskantoor",
      text: "Deze tool geeft je een laagdrempelige manier om periodiek feedback op te halen bij je medewerkers. Niet ter vervanging van het gesprek, maar juist als slimme voorbereiding daarop. Je krijgt inzicht in wat er speelt, wat goed gaat en waar aandacht nodig is. Medewerkers krijgen de ruimte om eerlijk input te geven en ontvangen zelf ook praktische tips. Jij krijgt als leidinggevende handvatten om het gesprek gerichter en waardevoller te voeren. Het is geen eindpunt, maar een krachtige eerste stap naar betere gesprekken en meer wederzijds begrip.",
      author: "Irene Fieten",
      role: "Algemeen directeur",
      logo: "/logos/henk-mulderij.svg"
    },
    {
      company: "Innosend",
      text: "Eenvoudig, snel en direct diepgaand inzicht. Als snelgroeiend bedrijf willen we weten hoe elk team ervoor staat. Wij hebben GroeiRichting inmiddels vast opgenomen in onze halfjaarlijkse cyclus.",
      author: "Virgil Swagemakers",
      role: "Founder",
      logo: "/logos/innosend.webp"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Company logo - bovenaan */}
              <div className="mb-6">
                <img 
                  src={review.logo} 
                  alt={`${review.company} logo`}
                  className="h-16 w-auto object-contain opacity-80"
                />
              </div>

              {/* Quote icon en review text - midden met flex-grow */}
              <div className="flex-grow">
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[var(--kleur-accent)] opacity-60" />
                </div>
                <p className="text-[var(--kleur-muted)] text-lg leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author info - onderaan uitgelijnd */}
              <div className="border-t border-gray-100 pt-4 mt-6">
                <p className="font-semibold text-[var(--kleur-text)]">
                  {review.author}
                </p>
                <p className="text-sm text-[var(--kleur-muted)]">
                  {review.role}
                </p>
                <p className="text-sm text-[var(--kleur-muted)] mt-1">
                  {review.company}
                </p>
              </div>
            </div>
          ))}
    </div>
  )
}

export default Reviews
