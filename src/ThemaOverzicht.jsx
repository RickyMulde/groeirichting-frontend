import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ThemaOverzicht() {
  const navigate = useNavigate()
  const themaList = [
    { titel: 'Werkdruk & Taaklast', status: 'bezig' },
    { titel: 'Werk-privé balans', status: 'nieuw' },
    { titel: 'Financiële rust', status: 'afgerond' }
  ]

  const statusKleur = {
    nieuw: 'bg-gray-100 text-gray-600',
    bezig: 'bg-yellow-100 text-yellow-800',
    afgerond: 'bg-green-100 text-green-800'
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Jouw voortgang</h2>
      {themaList.map((thema, i) => (
        <div 
          key={i} 
          className="p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => navigate('/gesprek')}
        >
          <span>{thema.titel}</span>
          <span className={`text-xs px-3 py-1 rounded-full ${statusKleur[thema.status]}`}>
            {thema.status === 'nieuw' ? 'Nog niet gestart' : thema.status === 'bezig' ? 'Bezig' : 'Afgerond'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ThemaOverzicht
