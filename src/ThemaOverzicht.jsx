import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function ThemaOverzicht() {
  const navigate = useNavigate()
  const [themas, setThemas] = useState([])

  useEffect(() => {
    const fetchThemas = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('Gebruiker niet ingelogd');
        return;
      }

      // Haal eerst de thema's op
      const { data: themaData, error: themaError } = await supabase
        .from('themes')
        .select('id, titel')
        .eq('klaar_voor_gebruik', true)
        .eq('standaard_zichtbaar', true)
        .order('volgorde_index');

      if (themaError) {
        console.error("Fout bij laden thema's:", themaError);
        return;
      }

      // Haal de gesprekken op voor deze gebruiker
      const { data: gesprekData, error: gesprekError } = await supabase
        .from('gesprek')
        .select('theme_id, status')
        .eq('werknemer_id', user.id);

      if (gesprekError) {
        console.error("Fout bij laden gesprekken:", gesprekError);
        return;
      }

      // Maak een map van theme_id naar status
      const gesprekStatusMap = {};
      gesprekData?.forEach(gesprek => {
        gesprekStatusMap[gesprek.theme_id] = gesprek.status;
      });

      // Combineer de data
      const lijst = themaData.map((t) => ({
        ...t,
        status: gesprekStatusMap[t.id] || 'nieuw'
      }));
      
      setThemas(lijst);
    };

    fetchThemas();
  }, []);

  const statusKleur = {
    nieuw: 'bg-gray-100 text-gray-600',
    'Nog niet afgerond': 'bg-orange-100 text-orange-800',
    'Afgerond': 'bg-green-100 text-green-800'
  }

  const statusTekst = {
    nieuw: 'Nog niet gestart',
    'Nog niet afgerond': 'Bezig',
    'Afgerond': 'Afgerond'
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Jouw voortgang</h2>
      {themas.length === 0 ? (
        <p className="text-gray-500">Er zijn nog geen thema's beschikbaar.</p>
      ) : (
        themas.map((thema) => (
          <div 
            key={thema.id} 
            className="p-4 border rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => navigate('/gesprek?theme_id=' + thema.id)}
          >
            <span>{thema.titel}</span>
            <span className={`text-xs px-3 py-1 rounded-full ${statusKleur[thema.status]}`}>
              {statusTekst[thema.status]}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export default ThemaOverzicht