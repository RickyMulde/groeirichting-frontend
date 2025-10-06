import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function ProvisionEmployer() {
  const nav = useNavigate();
  const [status, setStatus] = useState('idle'); // 'idle'|'provisioning'|'success'|'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setStatus('provisioning');

        // Pending employer data wordt nu uit database gehaald door backend
        // Geen localStorage check meer nodig

        // Haal huidige gebruiker op met retry logica
        let user = null;
        let userError = null;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries && !user) {
          const { data: userData, error: error } = await supabase.auth.getUser();
          user = userData?.user;
          userError = error;

          if (userError || !user) {
            retryCount++;
            
            if (retryCount < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        }

        if (userError || !user) {
          throw new Error(`Gebruiker niet gevonden na ${maxRetries} pogingen: ${userError?.message || 'Onbekende fout'}`);
        }

        // Roep backend provisioning endpoint aan
        const session = await supabase.auth.getSession();
        const accessToken = session.data.session?.access_token;
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/provision-employer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({}) // Lege body, data wordt uit database gehaald
        });

        if (!response.ok) {
          const errorData = await response.json();
          
          // Als er geen pending data is, stuur door naar registratie
          if (errorData.error && errorData.error.includes('Geen pending employer data')) {
            navigate('/registreer-werkgever');
            return;
          }
          
          throw new Error(errorData.error || 'Provisioning mislukt');
        }

        const result = await response.json();
        
        // Pending data wordt automatisch opgeruimd door backend
        
        setStatus('success');
        
        // Doorsturen naar werkgever portaal
        setTimeout(() => {
          nav('/werkgever-portaal', { replace: true });
        }, 1500);
        
      } catch (e) {
        // Als er geen pending data is, stuur door naar registratie
        if (e?.message && e.message.includes('Geen pending employer data')) {
          navigate('/registreer-werkgever');
          return;
        }
        
        setErrorMsg(e?.message ?? 'Onbekende fout tijdens provisioning.');
        setStatus('error');
      }
    };

    // Timeout na 60 seconden (verhoogd voor retry logica)
    const timeout = setTimeout(() => {
      setErrorMsg('Provisioning duurt te lang. Dit kan komen doordat de verificatie nog niet volledig is verwerkt. Probeer de pagina te verversen of probeer het opnieuw.');
      setStatus('error');
    }, 60000);

    run();

    // Cleanup timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [nav]);

  if (status === 'provisioning' || status === 'idle') {
    return (
      <div className="page-container max-w-md mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Account instellen…</h1>
          <p className="text-gray-600">Je account wordt geconfigureerd.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (status === 'success') {
    return (
      <div className="page-container max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="text-green-600 text-6xl">✅</div>
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Klaar!</h1>
          <p className="text-gray-600">Je account is succesvol ingesteld. Je wordt doorgestuurd…</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="text-red-600 text-6xl">❌</div>
        <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Setup mislukt</h1>
        <p className="text-gray-600">{errorMsg}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Opnieuw proberen
        </button>
        <div className="mt-4">
          <a href="/registreer-werkgever" className="text-[var(--kleur-accent)] hover:underline">
            Terug naar registratie
          </a>
        </div>
      </div>
    </div>
  );
}
