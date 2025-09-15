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
        
        // Supabase handelt verificatie af en stuurt gebruiker door met hash fragment
        const hash = window.location.hash;
        const search = window.location.search;
        
        console.log('[NaVerificatie] Hash:', hash);
        console.log('[NaVerificatie] Search:', search);
        
        // Controleer of er een actieve sessie is (verificatie is al afgehandeld door Supabase)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('[NaVerificatie] Session error:', sessionError);
          throw new Error('Fout bij ophalen sessie: ' + sessionError.message);
        }
        
        if (session && session.user) {
          console.log('[NaVerificatie] Actieve sessie gevonden:', session.user.email);
          console.log('[NaVerificatie] Email confirmed:', session.user.email_confirmed_at);
          
          // Controleer of email daadwerkelijk geverifieerd is
          if (session.user.email_confirmed_at) {
            console.log('[NaVerificatie] Email is geverifieerd, verificatie succesvol');
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
          } else {
            throw new Error('E-mailadres is nog niet geverifieerd. Controleer je inbox voor de verificatielink.');
          }
        } else {
          throw new Error('Geen actieve sessie gevonden. Klik op de verificatielink in je e-mail.');
        }
        
      } catch (e) {
        console.error('[NaVerificatie] Verificatie mislukt:', e);
        setErrorMsg(e?.message ?? 'Onbekende fout tijdens bevestigen.');
        setStatus('error');
      }
    };

    // Luister naar auth state changes (voor als verificatie asynchroon gebeurt)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[NaVerificatie] Auth state change:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        console.log('[NaVerificatie] User signed in and email confirmed via auth state change');
        setStatus('success');
        
        setTimeout(() => {
          const pendingData = localStorage.getItem('pendingEmployerData');
          if (pendingData) {
            console.log('[NaVerificatie] Pending employer data gevonden, doorsturen naar provisioning');
            nav('/provision-employer', { replace: true });
          } else {
            console.log('[NaVerificatie] Geen pending data, doorsturen naar werkgever portaal');
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