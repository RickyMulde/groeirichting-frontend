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
        const session = await supabase.auth.getSession();
        const accessToken = session.data.session?.access_token;
        
        console.log('[ProvisionEmployer] Access token:', accessToken ? 'Present' : 'Missing');
        console.log('[ProvisionEmployer] Employer data:', employerData);
        console.log('[ProvisionEmployer] API URL:', `${import.meta.env.VITE_API_BASE_URL}/api/provision-employer`);
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/provision-employer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            ...employerData,
            user_id: user.id
          })
        });

        console.log('[ProvisionEmployer] Response status:', response.status);
        console.log('[ProvisionEmployer] Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorData = await response.json();
          console.error('[ProvisionEmployer] Error response:', errorData);
          throw new Error(errorData.error || 'Provisioning mislukt');
        }

        const result = await response.json();
        console.log('[ProvisionEmployer] Success response:', result);

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

    // Timeout na 30 seconden
    const timeout = setTimeout(() => {
      console.error('[ProvisionEmployer] Timeout - provisioning duurt te lang');
      setErrorMsg('Provisioning duurt te lang. Probeer het opnieuw.');
      setStatus('error');
    }, 30000);

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
