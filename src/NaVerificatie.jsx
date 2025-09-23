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
        
        // Supabase handelt verificatie af en stuurt gebruiker door met hash fragment
        const hash = window.location.hash;
        const search = window.location.search;
        
        // Controleer of er een actieve sessie is (verificatie is al afgehandeld door Supabase)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw new Error('Fout bij ophalen sessie: ' + sessionError.message);
        }
        
        if (session && session.user) {
          
          // Controleer of email daadwerkelijk geverifieerd is
          if (session.user.email_confirmed_at) {
            setStatus('success');
            
            // Wacht langer om zeker te zijn dat verificatie volledig is verwerkt
            setTimeout(() => {
              // Check of er pending employer data is voor provisioning
              const pendingData = localStorage.getItem('pendingEmployerData');
              
              if (pendingData) {
                nav('/provision-employer', { replace: true });
              } else {
                nav('/werkgever-portaal', { replace: true });
              }
            }, 3000); // Verhoogd van 1500 naar 3000ms
          } else {
            // Wacht en probeer opnieuw
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } else {
          throw new Error('Geen actieve sessie gevonden. Klik op de verificatielink in je e-mail.');
        }
        
      } catch (e) {
        setErrorMsg(e?.message ?? 'Onbekende fout tijdens bevestigen.');
        setStatus('error');
      }
    };

    // Luister naar auth state changes (voor als verificatie asynchroon gebeurt)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        setStatus('success');
        
        setTimeout(() => {
          const pendingData = localStorage.getItem('pendingEmployerData');
          if (pendingData) {
            nav('/provision-employer', { replace: true });
          } else {
            nav('/werkgever-portaal', { replace: true });
          }
        }, 1500);
      }
    });

    run();

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
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