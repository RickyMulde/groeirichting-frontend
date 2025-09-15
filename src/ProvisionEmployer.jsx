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
        console.log('[ProvisionEmployer] Start provisioning...');

        // Haal pending employer data op
        const pendingData = localStorage.getItem('pendingEmployerData');
        if (!pendingData) {
          throw new Error('Geen pending employer data gevonden');
        }

        const employerData = JSON.parse(pendingData);
        console.log('[ProvisionEmployer] Pending data:', employerData);

        // Haal huidige gebruiker op
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error('Gebruiker niet gevonden');
        }

        console.log('[ProvisionEmployer] User ID:', user.id);

        // Roep backend provisioning endpoint aan
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/provision-employer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            ...employerData,
            user_id: user.id
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Provisioning mislukt');
        }

        console.log('[ProvisionEmployer] Provisioning succesvol');
        
        // Verwijder pending data
        localStorage.removeItem('pendingEmployerData');
        
        setStatus('success');
        
        // Doorsturen naar werkgever portaal
        setTimeout(() => {
          nav('/werkgever-portaal', { replace: true });
        }, 1500);
        
      } catch (e) {
        console.error('[ProvisionEmployer] Provisioning mislukt:', e);
        setErrorMsg(e?.message ?? 'Onbekende fout tijdens provisioning.');
        setStatus('error');
      }
    };
    run();
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
