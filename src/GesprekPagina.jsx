import { ArrowLeft, Send } from 'lucide-react'

export function GesprekPagina() {
  const messages = [
    { from: 'ai', text: 'Waar wil je het vandaag over hebben?' },
    { from: 'medewerker', text: 'Ik merk dat ik vaak overwerk.' },
    { from: 'ai', text: 'Wat denk je dat hiervan de oorzaak is?' }
  ]

  return (
    <div className="fixed inset-0 flex flex-col">
      <header className="flex items-center gap-2 p-4 border-b bg-white">
        <ArrowLeft className="text-kleur-muted" />
        <h1 className="text-xl font-semibold">Werkdruk & Taaklast</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              msg.from === 'medewerker'
                ? 'bg-kleur-primary text-white self-end ml-auto'
                : 'bg-kleur-secondary text-white self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form className="p-4 border-t bg-white flex items-center gap-2">
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
