
import { ArrowLeft, Send } from 'lucide-react'

export function GesprekPagina() {
  const messages = [
    { from: 'ai', text: 'Waar wil je het vandaag over hebben?' },
    { from: 'medewerker', text: 'Ik merk dat ik vaak overwerk.' },
    { from: 'ai', text: 'Wat denk je dat hiervan de oorzaak is?' }
  ]

  return (
    <div className="max-w-md mx-auto px-4 py-6 flex flex-col h-screen">
      <header className="flex items-center gap-2 mb-4">
        <ArrowLeft className="text-kleur-muted" />
        <h1 className="text-xl font-semibold">Werkdruk & Taaklast</h1>
      </header>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              msg.from === 'medewerker'
                ? 'bg-kleur-primary text-white self-end ml-auto'
                : 'bg-gray-100 text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Typ je antwoord..."
          className="flex-1 rounded-full border px-4 py-2 text-sm"
        />
        <button type="submit" className="btn btn-primary rounded-full px-3">
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}

export default GesprekPagina
