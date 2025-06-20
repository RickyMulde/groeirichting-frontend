import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from './supabaseClient'
import { containsSensitiveInfo } from './utils/filterInput';

function GesprekPagina() {
  const [params] = useSearchParams()
  const themeId = params.get('theme_id')
  const navigate = useNavigate();

  if (!themeId) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-semibold text-kleur-primary">Gesprek</h1>
        <p className="text-red-600 bg-red-50 p-4 rounded-xl">Er is geen thema geselecteerd. Je kunt geen gesprek starten.</p>
        <a href="/thema-overzicht" className="inline-block text-blue-600 underline">← Terug naar thema-overzicht</a>
      </div>
    )
  }

  const [theme, setTheme] = useState(null)
  const [vragen, setVragen] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [antwoorden, setAntwoorden] = useState([])
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)
  const [saved, setSaved] = useState(false)
  const [foutmelding, setFoutmelding] = useState(null)
  const [gesprekId, setGesprekId] = useState(null)
  const [toelichting, setToelichting] = useState(null)
  const [vervolgvragenPerVasteVraag, setVervolgvragenPerVasteVraag] = useState({})

  // Functie om samenvatting te genereren
  const genereerSamenvatting = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData || !userData.user) {
        console.error('Gebruiker niet gevonden');
        return;
      }

      const response = await fetch('https://groeirichting-backend.onrender.com/api/genereer-samenvatting', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          theme_id: themeId,
          werknemer_id: userData.user.id
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fout bij genereren samenvatting:', response.status, errorText);
      } else {
        console.log('Samenvatting succesvol gegenereerd');
      }
    } catch (error) {
      console.error('Fout bij genereren samenvatting:', error);
    }
  };

  useEffect(() => {
    const fetchThema = async () => {
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel, intro_prompt, doel_vraag, gebruik_gpt_vragen')
        .eq('id', themeId)
        .single()

      if (!error && data) {
        setTheme(data)
        const { data: vragenData, error: vragenError } = await supabase
          .from('theme_questions')
          .select('id, tekst, verplicht, type, doel_vraag, volgorde_index')
          .eq('theme_id', themeId)
          .order('volgorde_index');
          
          if (!vragenError) {
            // Laad alle vaste vragen, ongeacht of we GPT gebruiken
            setVragen(vragenData || []);
          } else {
            setVragen([]);
          }

        // Haal bestaande antwoorden op als het gesprek al bestaat
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: gesprekData, error: gesprekError } = await supabase
            .from('gesprek')
            .select('id, status')
            .eq('werknemer_id', user.id)
            .eq('theme_id', themeId)
            .maybeSingle();

          if (!gesprekError && gesprekData) {
            setGesprekId(gesprekData.id);
            
            // Alleen het gesprek als afgerond markeren als de status 'Afgerond' is
            if (gesprekData.status === 'Afgerond') {
              setDone(true);
            }
            
            // Haal de antwoorden op via de API
            const response = await fetch('https://groeirichting-backend.onrender.com/api/get-conversation-answers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
              },
              body: JSON.stringify({
                gesprek_id: gesprekData.id
              })
            });

            if (response.ok) {
              const { antwoorden } = await response.json();
              
              // Sorteer de antwoorden op basis van de volgorde van de vragen
              const gesorteerdeAntwoorden = vragenData.map(vraag => {
                const antwoord = antwoorden.find(a => a.theme_question_id === vraag.id);
                return {
                  vraag: vraag.tekst,
                  antwoord: antwoord?.antwoord || null
                };
              });

              setAntwoorden(gesorteerdeAntwoorden);
              
              // Zet de currentIndex naar de eerste vraag zonder antwoord
              const eersteLegeIndex = gesorteerdeAntwoorden.findIndex(a => a.antwoord === null);
              setCurrentIndex(eersteLegeIndex === -1 ? vragenData.length : eersteLegeIndex);
            }
          }
        }
      } else {
        console.error('Fout bij ophalen thema:', error)
      }
    }

    if (themeId) fetchThema()
  }, [themeId])

  const startGesprek = async () => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    // Als er al een gesprek bestaat, ga direct naar de eerste vraag zonder antwoord
    if (gesprekId) {
      const eersteLegeIndex = antwoorden.findIndex(a => a.antwoord === null);
      setCurrentIndex(eersteLegeIndex === -1 ? vragen.length : eersteLegeIndex);
      return;
    }

    // Maak het gesprek aan voordat we beginnen
    const res = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        werknemer_id: user.id,
        theme_id: themeId,
        status: 'Nog niet afgerond'
      })
    })
    
    const result = await res.json()
    if (res.ok && result.gesprek_id) {
      setGesprekId(result.gesprek_id)
      setCurrentIndex(0)
    } else {
      console.error('Gesprek aanmaken mislukt:', result.error)
      setFoutmelding('Er is een fout opgetreden bij het starten van het gesprek. Probeer het later opnieuw.')
    }
  }

  const slaGesprekOp = async (theme_question_id, antwoord) => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    if (!gesprekId) {
      console.error('Geen gesprek_id beschikbaar')
      return
    }

    // Bepaal of dit een vaste vraag is of een AI-vraag
    const isVasteVraag = !theme_question_id.toString().startsWith('gpt-');
    
    // Voor een vervolgvraag, gebruik de theme_question_id van de huidige vaste vraag
    let hoortBijQuestionId = null;
    if (!isVasteVraag) {
      // Vind de laatste beantwoorde vaste vraag
      const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
      const huidigeVasteVraagIndex = vasteVragen.findIndex(v => 
        antwoorden.some(a => a.vraag === v.tekst && a.antwoord)
      );
      if (huidigeVasteVraagIndex >= 0) {
        hoortBijQuestionId = vasteVragen[huidigeVasteVraagIndex].id;
      }
    }

    // Sla het antwoord op in antwoordpervraag tabel
    const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        werknemer_id: user.id,
        theme_id: themeId,
        gesprek_id: gesprekId,
        theme_question_id: isVasteVraag ? theme_question_id : null,
        antwoord: antwoord,
        is_vaste_vraag: isVasteVraag,
        hoort_bij_question_id: hoortBijQuestionId
      })
    })

    const result = await response.json()
    if (!response.ok) {
      console.error('Opslaan antwoord mislukt:', result.error)
      setFoutmelding(result.error)
      return false;
    }
    return result;
  }

  const verstuurAntwoord = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const check = containsSensitiveInfo(input);
    if (check.flagged) {
      setFoutmelding(check.reason);
      return;
    }

    const huidigeVraag = vragen[currentIndex];
    const nieuweAntwoorden = [...antwoorden, { vraag: huidigeVraag?.tekst, antwoord: input }];
    setAntwoorden(nieuweAntwoorden);
    setInput('');
    setFoutmelding(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData || !userData.user) {
      console.error('Gebruiker niet gevonden');
      return;
    }

    // Sla het antwoord op in Supabase
    const result = await slaGesprekOp(huidigeVraag.id, input);
    if (!result) return;

    // Bepaal of dit een vaste vraag is
    const isVasteVraag = !huidigeVraag.id.toString().startsWith('gpt-');
    
    if (isVasteVraag) {
      // Voor vaste vragen: verhoog de teller voor vervolgvragen van deze vaste vraag
      const huidigeVasteVraagId = huidigeVraag.id;
      const huidigeVervolgvragen = vervolgvragenPerVasteVraag[huidigeVasteVraagId] || 0;
      
      // Check of we al 4 vervolgvragen hebben voor deze vaste vraag
      if (huidigeVervolgvragen >= 4) {
        // Ga naar de volgende vaste vraag
        const volgendeVasteVraag = vragen.find((v, i) => 
          i > currentIndex && 
          !v.id.toString().startsWith('gpt-') &&
          !antwoorden.some(a => a.vraag === v.tekst && a.antwoord)
        );
        
        if (volgendeVasteVraag) {
          setCurrentIndex(vragen.indexOf(volgendeVasteVraag));
          setVervolgvragenPerVasteVraag({});
          return;
        } else {
          // Geen vaste vragen meer, rond het gesprek af
          setDone(true);
          await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              werknemer_id: userData.user.id,
              theme_id: themeId,
              status: 'Afgerond',
              gesprek_id: gesprekId,
              afrondingsreden: 'MAX_ANTWOORDEN'
            })
          });
          await genereerSamenvatting();
          return;
        }
      }
    } else {
      // Voor vervolgvragen: vind de bijbehorende vaste vraag en verhoog de teller
      const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
      const huidigeVasteVraagIndex = vasteVragen.findIndex(v => 
        antwoorden.some(a => a.vraag === v.tekst && a.antwoord)
      );
      
      if (huidigeVasteVraagIndex >= 0) {
        const huidigeVasteVraagId = vasteVragen[huidigeVasteVraagIndex].id;
        const nieuweTeller = (vervolgvragenPerVasteVraag[huidigeVasteVraagId] || 0) + 1;
        setVervolgvragenPerVasteVraag(prev => ({ 
          ...prev, 
          [huidigeVasteVraagId]: nieuweTeller 
        }));
        
        // Check of we nu 4 vervolgvragen hebben voor deze vaste vraag
        if (nieuweTeller >= 4) {
          // Ga naar de volgende vaste vraag
          const volgendeVasteVraag = vragen.find((v, i) => 
            i > currentIndex && 
            !v.id.toString().startsWith('gpt-') &&
            !antwoorden.some(a => a.vraag === v.tekst && a.antwoord)
          );
          
          if (volgendeVasteVraag) {
            setCurrentIndex(vragen.indexOf(volgendeVasteVraag));
            setVervolgvragenPerVasteVraag({});
            return;
          } else {
            // Geen vaste vragen meer, rond het gesprek af
            setDone(true);
            await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                werknemer_id: userData.user.id,
                theme_id: themeId,
                status: 'Afgerond',
                gesprek_id: gesprekId,
                afrondingsreden: 'MAX_ANTWOORDEN'
              })
            });
            await genereerSamenvatting();
            return;
          }
        }
      }
    }

    // Vraag GPT om een beslissing over een vervolgvraag (alleen als we nog niet 4 vervolgvragen hebben)
    const decideRes = await fetch('https://groeirichting-backend.onrender.com/api/decide-followup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        thema: theme?.titel || 'Thema',
        eerdereAntwoorden: nieuweAntwoorden.map(a => a.antwoord),
        laatsteAntwoord: input,
        doel_vraag: huidigeVraag?.doel_vraag || ''
      })
    });

    const decide = await decideRes.json();
    
    // Toon de toelichting direct na het antwoord
    if (decide.toelichting) {
      setFoutmelding(null);
      setToelichting(decide.toelichting);
    }

    // Als er geen vervolgvraag is of AI wil stoppen, check dan eerst of er nog vaste vragen zijn
    if (!decide.doorgaan || !decide.vervolgvraag) {
      const volgendeVasteVraag = vragen.find((v, i) => 
        i > currentIndex && 
        !v.id.toString().startsWith('gpt-') &&
        !antwoorden.some(a => a.vraag === v.tekst && a.antwoord)
      );
      
      if (volgendeVasteVraag) {
        // Er zijn nog onbeantwoorde vaste vragen, ga door naar de volgende
        setCurrentIndex(vragen.indexOf(volgendeVasteVraag));
        setVervolgvragenPerVasteVraag({});
        return;
      }

      // Geen vaste vragen meer en AI wil stoppen, rond het gesprek af
      setDone(true);
      await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: userData.user.id,
          theme_id: themeId,
          status: 'Afgerond',
          gesprek_id: gesprekId,
          afrondingsreden: 'VOLDENDE_DUIDELIJK'
        })
      });
      await genereerSamenvatting();
      return;
    }

    // Voeg GPT-vraag toe als volgende stap
    const gptVraag = {
      id: `gpt-${Date.now()}`,
      tekst: decide.vervolgvraag
    };

    setVragen([...vragen, gptVraag]);
    setCurrentIndex(vragen.length);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--kleur-background)]">
      <div
        className="w-full h-screen md:h-[600px] fixed inset-0 md:static md:w-[500px] md:max-w-xl md:rounded-3xl md:shadow-2xl md:bg-white flex flex-col"
      >
        <header className="flex items-center gap-2 p-2 border-b bg-white md:rounded-t-3xl md:min-h-[56px]">
          <button onClick={() => navigate('/thema-overzicht')} className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <ArrowLeft className="text-[var(--kleur-muted)]" />
          </button>
          <h1 className="text-xl font-semibold text-[var(--kleur-primary)]">
            {theme?.titel || 'Gesprek'}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentIndex === -1 && (
            <div className="space-y-4">
              <p className="bg-[var(--kleur-secondary)] p-4 rounded-2xl text-sm max-w-[80%]">
                {theme?.intro_prompt || 'Welkom bij dit thema.'}
              </p>
              {antwoorden.some(a => a.antwoord !== null) && (
                <div className="space-y-4">
                  <h3 className="font-medium">Je eerdere antwoorden:</h3>
                  {antwoorden.map((antwoord, index) => (
                    antwoord.antwoord && (
                      <div key={index} className="bg-white p-4 rounded-xl border">
                        <p className="text-sm font-medium mb-2">{antwoord.vraag}</p>
                        <p className="text-sm text-gray-600">{antwoord.antwoord}</p>
                      </div>
                    )
                  ))}
                </div>
              )}
              <button
                onClick={startGesprek}
                className="btn btn-primary px-4 py-2 rounded-full"
              >
                {antwoorden.some(a => a.antwoord !== null) ? 'Ga verder' : 'Start gesprek'}
              </button>
            </div>
          )}

          {currentIndex >= 0 && !done && (
            <div className="space-y-4">
              <div className="bg-[var(--kleur-secondary)] p-4 rounded-2xl text-sm max-w-[80%]">
                {vragen[currentIndex]?.tekst}
              </div>
              {toelichting && (
                <div className="bg-blue-50 p-4 rounded-xl text-sm max-w-[80%]">
                  <p className="text-blue-800">{toelichting}</p>
                </div>
              )}
            </div>
          )}

          {done && (
            <div className="space-y-4">
              <p className="bg-green-100 text-green-800 p-4 rounded-xl">
                Bedankt voor je antwoorden. Je gesprek is opgeslagen. Hieronder komt de samenvatting + cijfer + anoniem of niet naar werkgever. 
              </p>

              {toelichting && (
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-blue-800">{toelichting}</p>
                </div>
              )}

              <div className="bg-white p-4 rounded-xl border space-y-4">
                <h3 className="font-semibold text-[var(--kleur-primary)]">Je gesprek is afgerond!</h3>
                <p className="text-sm text-[var(--kleur-muted)]">
                  Bekijk hieronder je antwoorden en ga naar de samenvatting om je resultaten te delen.
                </p>
                
                <button
                  onClick={() => navigate(`/gesprek-resultaat?gesprek_id=${gesprekId}&theme_id=${themeId}`)}
                  className="btn btn-primary w-full"
                >
                  Bekijk samenvatting en deel resultaten
                </button>
              </div>

              <details className="bg-gray-50 p-4 rounded-xl">
                <summary className="cursor-pointer font-medium text-[var(--kleur-muted)]">
                  Bekijk je antwoorden (klik om uit te klappen)
                </summary>
                <pre className="mt-2 text-xs border bg-white p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(antwoorden, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {!done && currentIndex >= 0 && (
          <>
            {foutmelding && (
              <div className="mb-2 flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{foutmelding}</span>
              </div>
            )}
            <div className="sticky bottom-0 bg-white border-t">
              <form
                onSubmit={verstuurAntwoord}
                className="p-4 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Typ je antwoord..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (foutmelding) setFoutmelding(null);
                  }}
                  className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm"
                />
                <button type="submit" className="btn btn-primary rounded-full px-3">→</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GesprekPagina