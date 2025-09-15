import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function NaVerificatie() {
  const nav = useNavigate();
  const [status, setStatus] = useState('idle'); // 'idle'|'verifying'|'success'|'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setStatus('verifying');
        console.log('[NaVerificatie] Start verificatie...');
        
        const params = new URLSearchParams(window.location.search);
        const token_hash = params.get('token_hash') || '';
        let type = (params.get('type') || 'email').toLowerCase();

        // Normaliseer type: voor e-mailverificatie moet supabase-js v2 'email' krijgen
        if (type !== 'email') type = 'email';

        console.log('[NaVerificatie] Params:', { token_hash: token_hash.substring(0, 10) + '...', type });

        if (!token_hash) {
          throw new Error('Ontbrekende token_hash in de verificatielink.');
        }

        const { data, error } = await supabase.auth.verifyOtp({ token_hash, type: 'email' });
        if (error) throw error;

        console.log('[NaVerificatie] Verificatie succesvol:', data);
        setStatus('success');
        
        // Kleine delay voor UX, dan doorsturen
        setTimeout(() => {
          // Check of er pending employer data is voor provisioning
          const pendingData = localStorage.getItem('pendingEmployerData');
          if (pendingData) {
            console.log('[NaVerificatie] Pending employer data gevonden, doorsturen naar provisioning');
            nav('/provision-employer', { replace: true });
          } else {
            console.log('[NaVerificatie] Geen pending data, doorsturen naar werkgever portaal');
            nav('/werkgever-portaal', { replace: true });
          }
        }, 1500);
        
      } catch (e) {
        console.error('[NaVerificatie] Verificatie mislukt:', e);
        setErrorMsg(e?.message ?? 'Onbekende fout tijdens bevestigen.');
        setStatus('error');
      }
    };
    run();
  }, [nav]);

  if (status === 'verifying' || status === 'idle') {
    return (
      <div className="page-container max-w-md mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Bevestigen…</h1>
          <p className="text-gray-600">Even geduld, je e-mailadres wordt geverifieerd.</p>
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
          <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Gelukt!</h1>
          <p className="text-gray-600">Je e-mailadres is geverifieerd. Je wordt doorgestuurd…</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="text-red-600 text-6xl">❌</div>
        <h1 className="text-2xl font-bold text-[var(--kleur-primary)]">Verificatie mislukt</h1>
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