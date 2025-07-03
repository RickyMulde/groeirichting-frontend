import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from './supabaseClient'
import { containsSensitiveInfo } from './utils/filterInput';

function GesprekPagina() {
  const [params] = useSearchParams()
  const themeId = params.get('theme_id')
  const gesprekIdFromUrl = params.get('gesprek_id')
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
  const [gesprekId, setGesprekId] = useState(gesprekIdFromUrl)
  const [toelichting, setToelichting] = useState(null)
  const [reactie, setReactie] = useState(null)
  const [vervolgvragenPerVasteVraag, setVervolgvragenPerVasteVraag] = useState({})
  const [isVerzenden, setIsVerzenden] = useState(false);
  const [loading, setLoading] = useState(true);

  // Functie om samenvatting te genereren
  const genereerSamenvatting = async () => {
    // Alleen samenvatting genereren als het thema dit ondersteunt
    if (!theme?.geeft_samenvatting) {
      console.log('Geen samenvatting gegenereerd: geeft_samenvatting is false voor dit thema');
      return;
    }

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
          werknemer_id: userData.user.id,
          gesprek_id: gesprekId
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
    if (!themeId) return;

    // Haal alleen antwoorden op als er een gesprekId is
    if (!gesprekIdFromUrl && !gesprekId) {
      setLoading(false);
      setCurrentIndex(-1); // Zorg dat de introprompt getoond wordt
      return;
    }

    const fetchThema = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel, intro_prompt, doel_vraag, gebruik_gpt_vragen, gpt_doelstelling, prompt_style, ai_behavior, gpt_beperkingen, geeft_samenvatting')
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
          let gesprekData = null;
          
          if (gesprekIdFromUrl) {
            // Als er een specifieke gesprek_id is opgegeven, haal die op
            const { data: existingGesprek, error: gesprekError } = await supabase
              .from('gesprek')
              .select('id, status, werknemer_id')
              .eq('id', gesprekIdFromUrl)
              .single();

            if (!gesprekError && existingGesprek && existingGesprek.werknemer_id === user.id) {
              gesprekData = existingGesprek;
              setGesprekId(existingGesprek.id);
            } else {
              console.error('Gesprek niet gevonden of geen toegang');
              setFoutmelding('Gesprek niet gevonden of geen toegang tot dit gesprek.');
              setLoading(false);
              return;
            }
          } else {
            // Zoek naar bestaand gesprek voor dit thema (oude gedrag)
            const { data: existingGesprek, error: gesprekError } = await supabase
              .from('gesprek')
              .select('id, status')
              .eq('werknemer_id', user.id)
              .eq('theme_id', themeId)
              .maybeSingle();

            if (!gesprekError && existingGesprek) {
              gesprekData = existingGesprek;
              setGesprekId(existingGesprek.id);
            }
          }

          if (gesprekData) {
            // Alleen het gesprek als afgerond markeren als de status 'Afgerond' is
            if (gesprekData.status === 'Afgerond') {
              setDone(true);
            }
            
            // Haal de antwoorden op via de API
            try {
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
                
                // De antwoorden komen nu direct in het juiste formaat
                setAntwoorden(antwoorden);
                
                // Zet de currentIndex naar de eerste vraag zonder antwoord
                // Of naar de eerste vaste vraag als er nog geen antwoorden zijn
                if (antwoorden.length === 0) {
                  console.log('Geen bestaande antwoorden gevonden, start bij eerste vaste vraag');
                  setCurrentIndex(0); // Start bij eerste vaste vraag
                } else {
                  // Zoek naar de eerste vaste vraag die nog niet beantwoord is
                  const vasteVragen = vragenData.filter(v => !v.id.toString().startsWith('gpt-'));
                  const beantwoordeVasteVragen = antwoorden.filter(a => a.type === 'vaste_vraag').length;
                  
                  console.log(`Geladen antwoorden: ${antwoorden.length}, beantwoorde vaste vragen: ${beantwoordeVasteVragen}/${vasteVragen.length}`);
                  
                  if (beantwoordeVasteVragen >= vasteVragen.length) {
                    // Alle vaste vragen zijn beantwoord
                    console.log('Alle vaste vragen beantwoord, markeer als afgerond');
                    setDone(true);
                  } else {
                    // Ga naar de volgende vaste vraag (rekening houdend met vervolgvragen)
                    const volgendeVasteVraag = vasteVragen[beantwoordeVasteVragen];
                    const nieuweIndex = vragenData.indexOf(volgendeVasteVraag);
                    console.log(`Volgende vaste vraag: ${volgendeVasteVraag.tekst} (index: ${nieuweIndex})`);
                    setCurrentIndex(nieuweIndex);
                  }
                }
              } else {
                console.error('Fout bij ophalen antwoorden:', response.status);
                // Bij fout, start bij eerste vraag
                setCurrentIndex(0);
              }
            } catch (error) {
              console.error('Fout bij ophalen antwoorden:', error);
              // Bij fout, start bij eerste vraag
              setCurrentIndex(0);
            }
          }
        }
      } else {
        console.error('Fout bij ophalen thema:', error)
        setFoutmelding('Fout bij ophalen thema. Probeer het later opnieuw.');
      }
      
      setLoading(false);
    }

    if (themeId) fetchThema()
  }, [themeId, gesprekIdFromUrl, gesprekId])

  const startGesprek = async () => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    // Als er al een gesprek bestaat, ga direct naar de eerste vraag zonder antwoord
    if (gesprekId) {
      if (antwoorden.length === 0) {
        console.log('Geen antwoorden, start bij eerste vaste vraag');
        setCurrentIndex(0); // Start bij eerste vaste vraag
      } else {
        // Zoek naar de eerste vaste vraag die nog niet beantwoord is
        const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
        const beantwoordeVasteVragen = antwoorden.filter(a => a.type === 'vaste_vraag').length;
        
        console.log(`StartGesprek: ${antwoorden.length} antwoorden, ${beantwoordeVasteVragen}/${vasteVragen.length} vaste vragen beantwoord`);
        
        if (beantwoordeVasteVragen >= vasteVragen.length) {
          // Alle vaste vragen zijn beantwoord
          console.log('Alle vaste vragen beantwoord, markeer als afgerond');
          setDone(true);
        } else {
          // Ga naar de volgende vaste vraag (rekening houdend met vervolgvragen)
          const volgendeVasteVraag = vasteVragen[beantwoordeVasteVragen];
          const nieuweIndex = vragen.indexOf(volgendeVasteVraag);
          console.log(`Volgende vaste vraag: ${volgendeVasteVraag.tekst} (index: ${nieuweIndex})`);
          setCurrentIndex(nieuweIndex);
        }
      }
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

  // Nieuwe functie om een gesprek te herstarten
  const herstartGesprek = async () => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user) {
      console.error('Gebruiker niet gevonden of niet ingelogd')
      return
    }

    // Verwijder oude gesprek data als die bestaat
    if (gesprekId) {
      try {
        await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            werknemer_id: user.id,
            theme_id: themeId,
            gesprek_id: gesprekId,
            status: 'Afgerond',
            afrondingsreden: 'VOLDENDE_DUIDELIJK'
          })
        });
      } catch (error) {
        console.error('Fout bij afronden oude gesprek:', error);
      }
    }

    // Reset state
    setGesprekId(null);
    setAntwoorden([]);
    setVragen(vragen.filter(v => !v.id.toString().startsWith('gpt-')));
    setVervolgvragenPerVasteVraag({});
    setToelichting(null);
    setReactie(null);
    setCurrentIndex(0); // Start bij eerste vaste vraag

    // Start nieuw gesprek
    await startGesprek();
  }

  const slaGesprekOp = async (theme_question_id, antwoord, vraag_tekst = null) => {
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

    // Sla het antwoord op in de nieuwe structuur
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
        hoort_bij_question_id: hoortBijQuestionId,
        vraag_tekst: vraag_tekst || (isVasteVraag ? 'Vaste vraag' : 'Vervolgvraag')
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
    if (!input.trim() || isVerzenden) return;

    setIsVerzenden(true);
    try {
      const check = containsSensitiveInfo(input);
      if (check.flagged) {
        setFoutmelding(check.reason);
        return;
      }

      const huidigeVraag = vragen[currentIndex];
      const isVasteVraag = !huidigeVraag.id.toString().startsWith('gpt-');
      const nieuwAntwoord = {
        vraag: huidigeVraag?.tekst,
        antwoord: input,
        type: isVasteVraag ? 'vaste_vraag' : 'vervolgvraag'
      };
      const nieuweAntwoorden = [...antwoorden, nieuwAntwoord];
      
      console.log(`Antwoord toegevoegd: ${nieuwAntwoord.type} - "${nieuwAntwoord.vraag}"`);
      console.log(`Totaal antwoorden: ${nieuweAntwoorden.length}`);
      
      setAntwoorden(nieuweAntwoorden);
      setInput('');
      setFoutmelding(null);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData || !userData.user) {
        console.error('Gebruiker niet gevonden');
        return;
      }

      // Sla het antwoord op in Supabase
      const result = await slaGesprekOp(huidigeVraag.id, input, huidigeVraag?.tekst);
      if (!result) return;

      if (isVasteVraag) {
        // We hebben een vaste vraag beantwoord
        console.log('Vaste vraag beantwoord:', huidigeVraag.tekst);
        
        // Vraag GPT of er een vervolgvraag moet komen
        const decideRes = await fetch('https://groeirichting-backend.onrender.com/api/decide-followup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            thema: theme?.titel || 'Thema',
            gespreksgeschiedenis: nieuweAntwoorden,
            doel_vraag: huidigeVraag?.doel_vraag || '',
            gpt_doelstelling: theme?.gpt_doelstelling || '',
            prompt_style: theme?.prompt_style || '',
            ai_behavior: theme?.ai_behavior || '',
            gpt_beperkingen: theme?.gpt_beperkingen || ''
          })
        });

        const decide = await decideRes.json();
        
        if (decide.toelichting) {
          setToelichting(decide.toelichting);
        }

        if (decide.reactie) {
          setReactie(decide.reactie);
        }

        if (decide.doorgaan && decide.vervolgvraag) {
          // Voeg vervolgvraag toe
          const gptVraag = {
            id: `gpt-${Date.now()}`,
            tekst: decide.vervolgvraag
          };
          const nieuweVragen = [...vragen, gptVraag];
          setVragen(nieuweVragen);
          setCurrentIndex(nieuweVragen.length - 1);
        } else {
          // Ga naar volgende vaste vraag met de nieuwe antwoorden
          await gaNaarVolgendeVasteVraagMetAntwoorden(nieuweAntwoorden);
        }
        
      } else {
        // We hebben een vervolgvraag beantwoord
        console.log('Vervolgvraag beantwoord:', huidigeVraag.tekst);
        
        // Vind bij welke vaste vraag deze vervolgvraag hoort
        const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
        const huidigeVasteVraagIndex = vasteVragen.findIndex(v => 
          antwoorden.some(a => a.vraag === v.tekst && a.antwoord)
        );
        
        if (huidigeVasteVraagIndex >= 0) {
          const huidigeVasteVraagId = vasteVragen[huidigeVasteVraagIndex].id;
          const huidigeVervolgvragen = vervolgvragenPerVasteVraag[huidigeVasteVraagId] || 0;
          const nieuweTeller = huidigeVervolgvragen + 1;
          
          console.log(`Vervolgvraag ${nieuweTeller} voor vaste vraag ${huidigeVasteVraagIndex + 1}`);
          
          setVervolgvragenPerVasteVraag(prev => ({ 
            ...prev, 
            [huidigeVasteVraagId]: nieuweTeller 
          }));
          
          // Check of we 4 vervolgvragen hebben bereikt
          if (nieuweTeller >= 4) {
            console.log('4 vervolgvragen bereikt, ga naar volgende vaste vraag');
            await gaNaarVolgendeVasteVraagMetAntwoorden(nieuweAntwoorden);
            return;
          }
          
          // Vraag GPT of er nog een vervolgvraag moet komen (alleen als we nog niet 4 hebben)
          const decideRes = await fetch('https://groeirichting-backend.onrender.com/api/decide-followup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              thema: theme?.titel || 'Thema',
              gespreksgeschiedenis: nieuweAntwoorden,
              doel_vraag: vasteVragen[huidigeVasteVraagIndex]?.doel_vraag || '',
              gpt_doelstelling: theme?.gpt_doelstelling || '',
              prompt_style: theme?.prompt_style || '',
              ai_behavior: theme?.ai_behavior || '',
              gpt_beperkingen: theme?.gpt_beperkingen || ''
            })
          });

          const decide = await decideRes.json();
          
          if (decide.toelichting) {
            setToelichting(decide.toelichting);
          }

          if (decide.reactie) {
            setReactie(decide.reactie);
          }

          if (decide.doorgaan && decide.vervolgvraag) {
            // Voeg vervolgvraag toe
            const gptVraag = {
              id: `gpt-${Date.now()}`,
              tekst: decide.vervolgvraag
            };
            const nieuweVragen = [...vragen, gptVraag];
            setVragen(nieuweVragen);
            setCurrentIndex(nieuweVragen.length - 1);
          } else {
            // Ga naar volgende vaste vraag met de nieuwe antwoorden
            await gaNaarVolgendeVasteVraagMetAntwoorden(nieuweAntwoorden);
          }
        }
      }
    } finally {
      setIsVerzenden(false);
    }
  }

  // Helper functie om naar de volgende vaste vraag te gaan
  const gaNaarVolgendeVasteVraag = async () => {
    const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
    
    // Gebruik consistente logica: tel beantwoorde vaste vragen op basis van type
    const beantwoordeVasteVragen = antwoorden.filter(a => a.type === 'vaste_vraag').length;
    
    console.log(`gaNaarVolgendeVasteVraag: ${antwoorden.length} antwoorden, ${beantwoordeVasteVragen}/${vasteVragen.length} vaste vragen beantwoord`);
    
    if (beantwoordeVasteVragen >= vasteVragen.length) {
      // Alle vaste vragen zijn beantwoord, rond het gesprek af
      console.log('Alle vaste vragen beantwoord, rond gesprek af');
      setDone(true);
      await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: (await supabase.auth.getUser()).data.user.id,
          theme_id: themeId,
          status: 'Afgerond',
          gesprek_id: gesprekId,
          afrondingsreden: 'VOLDENDE_DUIDELIJK'
        })
      });
      await genereerSamenvatting();
    } else {
      // Zoek de volgende onbeantwoorde vaste vraag
      const volgendeVasteVraag = vasteVragen[beantwoordeVasteVragen];
      
      if (volgendeVasteVraag) {
        console.log(`Volgende vaste vraag: ${volgendeVasteVraag.tekst} (index: ${vragen.indexOf(volgendeVasteVraag)})`);
        const nieuweIndex = vragen.indexOf(volgendeVasteVraag);
        setCurrentIndex(nieuweIndex);
        setVervolgvragenPerVasteVraag({});
        setToelichting(null);
        setReactie(null);
      } else {
        console.log('Geen volgende vaste vraag gevonden, rond gesprek af');
        setDone(true);
        await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            werknemer_id: (await supabase.auth.getUser()).data.user.id,
            theme_id: themeId,
            status: 'Afgerond',
            gesprek_id: gesprekId,
            afrondingsreden: 'VOLDENDE_DUIDELIJK'
          })
        });
        await genereerSamenvatting();
      }
    }
  }

  // Helper functie om naar de volgende vaste vraag te gaan met specifieke antwoorden
  const gaNaarVolgendeVasteVraagMetAntwoorden = async (specifiekeAntwoorden) => {
    const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
    
    // Gebruik consistente logica: tel beantwoorde vaste vragen op basis van type
    const beantwoordeVasteVragen = specifiekeAntwoorden.filter(a => a.type === 'vaste_vraag').length;
    
    console.log(`gaNaarVolgendeVasteVraagMetAntwoorden: ${specifiekeAntwoorden.length} antwoorden, ${beantwoordeVasteVragen}/${vasteVragen.length} vaste vragen beantwoord`);
    
    if (beantwoordeVasteVragen >= vasteVragen.length) {
      // Alle vaste vragen zijn beantwoord, rond het gesprek af
      console.log('Alle vaste vragen beantwoord, rond gesprek af');
      setDone(true);
      await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: (await supabase.auth.getUser()).data.user.id,
          theme_id: themeId,
          status: 'Afgerond',
          gesprek_id: gesprekId,
          afrondingsreden: 'VOLDENDE_DUIDELIJK'
        })
      });
      await genereerSamenvatting();
    } else {
      // Zoek de volgende onbeantwoorde vaste vraag
      const volgendeVasteVraag = vasteVragen[beantwoordeVasteVragen];
      
      if (volgendeVasteVraag) {
        console.log(`Volgende vaste vraag: ${volgendeVasteVraag.tekst} (index: ${vragen.indexOf(volgendeVasteVraag)})`);
        const nieuweIndex = vragen.indexOf(volgendeVasteVraag);
        setCurrentIndex(nieuweIndex);
        setVervolgvragenPerVasteVraag({});
        setToelichting(null);
        setReactie(null);
      } else {
        console.log('Geen volgende vaste vraag gevonden, rond gesprek af');
        setDone(true);
        await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            werknemer_id: (await supabase.auth.getUser()).data.user.id,
            theme_id: themeId,
            status: 'Afgerond',
            gesprek_id: gesprekId,
            afrondingsreden: 'VOLDENDE_DUIDELIJK'
          })
        });
        await genereerSamenvatting();
      }
    }
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
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)]"></div>
            </div>
          )}

          {!loading && foutmelding && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              <h3 className="font-medium mb-2">Er is een fout opgetreden</h3>
              <p className="text-sm">{foutmelding}</p>
              <button 
                onClick={() => navigate('/thema-overzicht')} 
                className="mt-3 btn btn-primary text-sm"
              >
                Terug naar thema overzicht
              </button>
            </div>
          )}

          {!loading && !foutmelding && currentIndex === -1 && (
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
              {antwoorden.some(a => a.antwoord !== null) && (
                <button
                  onClick={herstartGesprek}
                  className="btn btn-secondary px-4 py-2 rounded-full ml-2"
                >
                  Herstart gesprek
                </button>
              )}
            </div>
          )}

          {!loading && !foutmelding && currentIndex >= 0 && !done && (
            <div className="space-y-4">
              <div className="bg-[var(--kleur-secondary)] p-4 rounded-2xl text-sm max-w-[80%]">
                {vragen[currentIndex]?.tekst}
              </div>
              {reactie && (
                <div className="bg-blue-50 p-4 rounded-xl text-sm max-w-[80%] ml-auto">
                  <p className="text-blue-800">{reactie}</p>
                </div>
              )}
              {toelichting && (
                <div className="bg-blue-50 p-4 rounded-xl text-sm max-w-[80%]">
                  <p className="text-blue-800">{toelichting}</p>
                </div>
              )}
            </div>
          )}

          {!loading && !foutmelding && done && (
            <div className="space-y-4">
              <p className="bg-green-100 text-green-800 p-4 rounded-xl">
                Bedankt voor je antwoorden. Je gesprek is opgeslagen.
                {theme?.geeft_samenvatting ? ' Hieronder kun je de samenvatting bekijken.' : ' Dit thema geeft geen samenvatting.'}
              </p>

              {toelichting && (
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-blue-800">{toelichting}</p>
                </div>
              )}

              <div className="bg-white p-4 rounded-xl border space-y-4">
                <h3 className="font-semibold text-[var(--kleur-primary)]">Je gesprek is afgerond!</h3>
                <p className="text-sm text-[var(--kleur-muted)]">
                  {theme?.geeft_samenvatting 
                    ? 'Bekijk hieronder je antwoorden en ga naar de samenvatting om je resultaten te delen.'
                    : 'Bekijk hieronder je antwoorden. Dit thema geeft geen samenvatting.'
                  }
                </p>
                
                {theme?.geeft_samenvatting && (
                  <button
                    onClick={() => navigate(`/gesprek-resultaat?gesprek_id=${gesprekId}&theme_id=${themeId}`)}
                    className="btn btn-primary w-full"
                  >
                    Bekijk samenvatting en deel resultaten
                  </button>
                )}
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

        {!loading && !foutmelding && !done && currentIndex >= 0 && (
          <>
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
                  disabled={isVerzenden}
                />
                <button type="submit" className="btn btn-primary rounded-full px-3 w-12 h-10 flex items-center justify-center" disabled={isVerzenden}>
                  {isVerzenden ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    '→'
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GesprekPagina