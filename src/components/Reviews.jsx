import { Quote } from 'lucide-react'

function Reviews() {
  const reviews = [
    {
      company: "Henk Mulderij Financieel Advieskantoor",
      text: "In een hectische periode zochten wij naar scherpte. GroeiRichting was daarin een mooie tool: het wist onze onderbuikgevoelens feilloos te bevestigen met concrete inzichten. Voor ons de perfecte, feitelijke onderbouwing naast onze persoonlijke gesprekken.",
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
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-[var(--kleur-accent)] opacity-60" />
              </div>

              {/* Review text */}
              <p className="text-[var(--kleur-muted)] text-lg leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              {/* Company logo */}
              <div className="mb-4">
                <img 
                  src={review.logo} 
                  alt={`${review.company} logo`}
                  className="h-12 w-auto object-contain opacity-80"
                />
              </div>

              {/* Author info */}
              <div className="border-t border-gray-100 pt-4">
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
