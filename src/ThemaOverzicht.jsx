import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function ThemaOverzicht() {
  const navigate = useNavigate()
  const [themas, setThemas] = useState([])

  useEffect(() => {
    const fetchThemas = async () => {
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel')
        .eq('klaar_voor_gebruik', true)
        .eq('standaard_zichtbaar', true)
        .order('volgorde_index')

      if (error) {
        console.error('Fout bij laden thema’s:', error)
      } else {
        const lijst = data.map((t) => ({
          ...t,
          status: 'nieuw' // voorlopig hardcoded: later vervangen met echte voortgang
        }))
        setThemas(lijst)
      }
    }

    fetchThemas()
  }, [])

  const statusKleur = {
    nieuw: 'bg-gray-100 text-gray-600',
    bezig: 'bg-yellow-100 text-yellow-800',
    afgerond: 'bg-green-100 text-green-800'
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Jouw voortgang</h2>
      {themas.length === 0 ? (
        <p className="text-gray-500">Er zijn nog geen thema’s beschikbaar.</p>
      ) : (
        themas.map((thema) => (
          <div 
            key={thema.id} 
            className="p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => navigate('/gesprek')}
          >
            <span>{thema.titel}</span>
            <span className={`text-xs px-3 py-1 rounded-full ${statusKleur[thema.status]}`}>
              {thema.status === 'nieuw' ? 'Nog niet gestart' : thema.status === 'bezig' ? 'Bezig' : 'Afgerond'}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export default ThemaOverzicht