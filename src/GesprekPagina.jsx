import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from './supabaseClient'
import { containsSensitiveInfo } from './utils/filterInput';

function GesprekPagina() {
  const [params] = useSearchParams()
  const themeId = params.get('theme_id')
  const gesprekIdFromUrl = params.get('gesprek_id')
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const completionButtonRef = useRef(null);

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
  
  // Nieuwe state voor chat berichten
  const [chatBerichten, setChatBerichten] = useState([])

  // Functie om chat berichten toe te voegen
  const voegChatBerichtToe = (type, inhoud, vraagId = null, isActief = false) => {
    const nieuwBericht = {
      id: Date.now() + Math.random(),
      type, // 'vraag', 'antwoord', 'toelichting', 'reactie'
      inhoud,
      vraagId,
      timestamp: new Date(),
      isActief
    }
    setChatBerichten(prev => [...prev, nieuwBericht])
  }

  // Auto-scroll naar beneden bij nieuwe berichten
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
    
    // Cleanup functie
    return () => {
      // Cleanup code hier indien nodig
    }
  }, [chatBerichten])

  // Auto-focus op input veld wanneer gesprek start
  useEffect(() => {
    if (currentIndex >= 0 && !done && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, done])

  // Auto-scroll naar de knop wanneer gesprek is afgerond
  useEffect(() => {
    if (done && completionButtonRef.current) {
      setTimeout(() => {
        completionButtonRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 500); // Iets langer wachten zodat alle content geladen is
    }
  }, [done]);

  // Automatische navigatie naar gesprek resultaten na afronding
  useEffect(() => {
    if (done && themeId && gesprekId) {
      // Wacht 3 seconden voordat we navigeren
      const timer = setTimeout(() => {
        navigate(`/gesprek-resultaat?theme_id=${themeId}&gesprek_id=${gesprekId}`);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [done, themeId, gesprekId, navigate]);

  // Functie om samenvatting te genereren
  const genereerSamenvatting = async () => {
    console.log('🔍 Start genereren samenvatting...');
    console.log('Theme geeft_samenvatting:', theme?.geeft_samenvatting);
    console.log('Theme ID:', themeId);
    console.log('Gesprek ID:', gesprekId);
    
    // Alleen samenvatting genereren als het thema dit ondersteunt
    if (!theme?.geeft_samenvatting) {
      console.log('❌ Geen samenvatting gegenereerd: geeft_samenvatting is false voor dit thema');
      return;
    }

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData || !userData.user) {
        console.error('❌ Gebruiker niet gevonden');
        return;
      }

      console.log('👤 Gebruiker gevonden:', userData.user.id);

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

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Fout bij genereren samenvatting:', response.status, errorText);
      } else {
        const result = await response.json();
        console.log('✅ Samenvatting succesvol gegenereerd:', result);
      }
    } catch (error) {
      console.error('❌ Fout bij genereren samenvatting:', error);
    }
  };

  // useEffect: alleen thema en vragen ophalen
  useEffect(() => {
    if (!themeId) return;
    const fetchThemaEnVragen = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('themes')
        .select('id, titel, intro_prompt, doel_vraag, gebruik_gpt_vragen, gpt_doelstelling, prompt_style, ai_behavior, gpt_beperkingen, geeft_samenvatting')
        .eq('id', themeId)
        .single();
      if (!error && data) {
        setTheme(data);
        const { data: vragenData, error: vragenError } = await supabase
          .from('theme_questions')
          .select('id, tekst, verplicht, type, doel_vraag, volgorde_index')
          .eq('theme_id', themeId)
          .order('volgorde_index');
        if (!vragenError) {
          setVragen(vragenData || []);
        } else {
          setVragen([]);
        }
      } else {
        setTheme(null);
        setVragen([]);
        setFoutmelding('Fout bij ophalen thema. Probeer het later opnieuw.');
      }
      setLoading(false);
    };
    fetchThemaEnVragen();
  }, [themeId]);

  // startGesprek: nieuw of bestaand gesprek
  const startGesprek = async () => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;
    if (authError || !user) {
      setFoutmelding('Gebruiker niet gevonden of niet ingelogd');
      return;
    }

    if (gesprekIdFromUrl) {
      // Bestaand gesprek ophalen
      const { data: existingGesprek, error } = await supabase
        .from('gesprek')
        .select('id, status, werknemer_id')
        .eq('id', gesprekIdFromUrl)
        .single();
      if (!existingGesprek || existingGesprek.werknemer_id !== user.id) {
        setFoutmelding('Dit gesprek bestaat niet (meer) of je hebt geen toegang.');
        return;
      }
      setGesprekId(existingGesprek.id);
      if (existingGesprek.status === 'Afgerond') {
        setDone(true);
        return;
      }
      // Antwoorden ophalen
      try {
        const response = await fetch('https://groeirichting-backend.onrender.com/api/get-conversation-answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({ gesprek_id: existingGesprek.id })
        });
        if (response.ok) {
          const { antwoorden } = await response.json();
          setAntwoorden(antwoorden);
          
          // Reset chat berichten en voeg alles opnieuw toe in chronologische volgorde
          setChatBerichten([]);
          
          // Voeg intro bericht toe als het bestaat
          if (theme?.intro_prompt) {
            voegChatBerichtToe('toelichting', theme.intro_prompt, null, false);
          }
          
          // Voeg alle bestaande antwoorden toe aan chat berichten
          antwoorden.forEach(antwoord => {
            if (antwoord.vraag) {
              voegChatBerichtToe('vraag', antwoord.vraag, antwoord.vraag_id, false);
            }
            if (antwoord.antwoord) {
              voegChatBerichtToe('antwoord', antwoord.antwoord, antwoord.vraag_id, false);
            }
            // Voeg toelichtingen en reacties toe
            if (antwoord.toelichting_type && antwoord.toelichting_inhoud) {
              voegChatBerichtToe(antwoord.toelichting_type, antwoord.toelichting_inhoud, antwoord.vraag_id, false);
            }
          });
          
          if (antwoorden.length === 0) {
            setCurrentIndex(0);
            // Voeg eerste vraag toe
            if (vragen.length > 0) {
              voegChatBerichtToe('vraag', vragen[0].tekst, vragen[0].id, true);
            }
          } else {
            const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
            const beantwoordeVasteVragen = antwoorden.filter(a => a.type === 'vaste_vraag').length;
            
            if (beantwoordeVasteVragen >= vasteVragen.length) {
              setDone(true);
            } else {
              const volgendeVasteVraag = vasteVragen[beantwoordeVasteVragen];
              const nieuweIndex = vragen.indexOf(volgendeVasteVraag);
              setCurrentIndex(nieuweIndex);
              
              // Voeg volgende vraag toe aan chat
              voegChatBerichtToe('vraag', volgendeVasteVraag.tekst, volgendeVasteVraag.id, true);
            }
          }
        } else if (response.status === 404) {
          setAntwoorden([]);
          setCurrentIndex(0);
          setChatBerichten([]);
          
          // Voeg intro bericht toe
          if (theme?.intro_prompt) {
            voegChatBerichtToe('toelichting', theme.intro_prompt, null, false);
          }
          // Voeg eerste vraag toe
          if (vragen.length > 0) {
            voegChatBerichtToe('vraag', vragen[0].tekst, vragen[0].id, true);
          }
        } else {
          setFoutmelding('Fout bij ophalen antwoorden. Probeer het later opnieuw.');
        }
      } catch (error) {
        setFoutmelding('Fout bij ophalen antwoorden. Probeer het later opnieuw.');
      }
      return;
    }

    // Nieuw gesprek aanmaken
    const res = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        werknemer_id: user.id,
        theme_id: themeId,
        status: 'Nog niet afgerond'
      })
    });
    const result = await res.json();
    if (res.ok && result.gesprek_id) {
      setGesprekId(result.gesprek_id);
      setAntwoorden([]);
      setCurrentIndex(0);
      
      // Voeg intro bericht toe
      if (theme?.intro_prompt) {
        voegChatBerichtToe('toelichting', theme.intro_prompt, null, false);
      }
      // Voeg eerste vraag toe
      if (vragen.length > 0) {
        voegChatBerichtToe('vraag', vragen[0].tekst, vragen[0].id, true);
      }
    } else {
      setFoutmelding('Er is een fout opgetreden bij het starten van het gesprek. Probeer het later opnieuw.');
    }
  };

  // herstartGesprek: oud gesprek afronden, state resetten, nieuw gesprek starten
  const herstartGesprek = async () => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;
    if (authError || !user) {
      setFoutmelding('Gebruiker niet gevonden of niet ingelogd');
      return;
    }
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
        // geen blocking error
      }
    }
    setGesprekId(null);
    setAntwoorden([]);
    setVervolgvragenPerVasteVraag({});
    setToelichting(null);
    setReactie(null);
    setDone(false);
    setCurrentIndex(-1);
    setInput('');
    setFoutmelding(null);
    setChatBerichten([]); // Reset chat berichten
    await startGesprek();
  };

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

  // Nieuwe functie om toelichtingen en reacties op te slaan
  const slaToelichtingOp = async (type, inhoud, vraagId = null) => {
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user;

    if (authError || !user || !gesprekId) {
      console.error('Gebruiker niet gevonden of geen gesprek_id beschikbaar')
      return false
    }

    try {
      const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: user.id,
          theme_id: themeId,
          gesprek_id: gesprekId,
          toelichting_type: type, // 'toelichting' of 'reactie'
          toelichting_inhoud: inhoud,
          vraag_id: vraagId
        })
      });

      if (!response.ok) {
        console.error('Opslaan toelichting mislukt:', await response.text());
        return false;
      }
      return true;
    } catch (error) {
      console.error('Fout bij opslaan toelichting:', error);
      return false;
    }
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
      
      // Voeg antwoord toe aan chat berichten
      voegChatBerichtToe('antwoord', input, huidigeVraag.id, false);
      
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
          voegChatBerichtToe('toelichting', decide.toelichting, huidigeVraag.id, false);
          // Sla toelichting op in backend
          slaToelichtingOp('toelichting', decide.toelichting, huidigeVraag.id);
        }

        if (decide.reactie) {
          setReactie(decide.reactie);
          voegChatBerichtToe('reactie', decide.reactie, huidigeVraag.id, false);
          // Sla reactie op in backend
          slaToelichtingOp('reactie', decide.reactie, huidigeVraag.id);
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
          
          // Voeg vervolgvraag toe aan chat
          voegChatBerichtToe('vraag', decide.vervolgvraag, gptVraag.id, true);
        } else {
          // Ga naar volgende vaste vraag met de nieuwe antwoorden
          await gaNaarVolgendeVasteVraag(nieuweAntwoorden);
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
            await gaNaarVolgendeVasteVraag(nieuweAntwoorden);
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
            voegChatBerichtToe('toelichting', decide.toelichting, huidigeVraag.id, false);
            // Sla toelichting op in backend
            slaToelichtingOp('toelichting', decide.toelichting, huidigeVraag.id);
          }

          if (decide.reactie) {
            setReactie(decide.reactie);
            voegChatBerichtToe('reactie', decide.reactie, huidigeVraag.id, false);
            // Sla reactie op in backend
            slaToelichtingOp('reactie', decide.reactie, huidigeVraag.id);
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
            
            // Voeg vervolgvraag toe aan chat
            voegChatBerichtToe('vraag', decide.vervolgvraag, gptVraag.id, true);
          } else {
            // Ga naar volgende vaste vraag met de nieuwe antwoorden
            await gaNaarVolgendeVasteVraag(nieuweAntwoorden);
          }
        }
      }
    } finally {
      setIsVerzenden(false);
    }
  }

  // Helper functie om naar de volgende vaste vraag te gaan
  const gaNaarVolgendeVasteVraag = async (specifiekeAntwoorden = null) => {
    const vasteVragen = vragen.filter(v => !v.id.toString().startsWith('gpt-'));
    
    // Gebruik de meegegeven antwoorden of de huidige antwoorden
    const antwoordenTeGebruiken = specifiekeAntwoorden || antwoorden;
    
    // Gebruik consistente logica: tel beantwoorde vaste vragen op basis van type
    const beantwoordeVasteVragen = antwoordenTeGebruiken.filter(a => a.type === 'vaste_vraag').length;
    
    console.log(`gaNaarVolgendeVasteVraag: ${antwoordenTeGebruiken.length} antwoorden, ${beantwoordeVasteVragen}/${vasteVragen.length} vaste vragen beantwoord`);
    
    if (beantwoordeVasteVragen >= vasteVragen.length) {
      // Alle vaste vragen zijn beantwoord, rond het gesprek af
      console.log('🎯 Alle vaste vragen beantwoord, rond gesprek af');
      console.log(`📊 ${beantwoordeVasteVragen}/${vasteVragen.length} vaste vragen beantwoord`);
      setDone(true);
      
      console.log('💾 Gesprek afronden...');
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
      
      // Wacht even zodat alle data correct is opgeslagen
      console.log('⏳ Wacht 2 seconden voordat samenvatting wordt gegenereerd...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('📝 Start genereren samenvatting...');
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
        
        // Voeg nieuwe vraag toe aan chat
        voegChatBerichtToe('vraag', volgendeVasteVraag.tekst, volgendeVasteVraag.id, true);
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
        
        // Wacht even zodat alle data correct is opgeslagen
        console.log('⏳ Wacht 2 seconden voordat samenvatting wordt gegenereerd...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await genereerSamenvatting();
      }
    }
  }

  // Chat bericht component
  const ChatBericht = ({ bericht }) => {
    const getBerichtStyling = () => {
      switch (bericht.type) {
        case 'vraag':
          return 'bg-[var(--kleur-secondary)] text-gray-800 max-w-[80%]';
        case 'antwoord':
          return 'bg-blue-500 text-white max-w-[80%] ml-auto';
        case 'toelichting':
          return 'bg-blue-50 text-blue-800 max-w-[80%]';
        case 'reactie':
          return 'bg-blue-50 text-blue-800 max-w-[80%] ml-auto';
        default:
          return 'bg-gray-100 text-gray-800 max-w-[80%]';
      }
    };

    return (
      <div className={`flex ${bericht.type === 'antwoord' || bericht.type === 'reactie' ? 'justify-end' : 'justify-start'} mb-3`}>
        <div className={`p-3 rounded-lg text-sm ${getBerichtStyling()} ${bericht.isActief ? 'ring-2 ring-blue-400' : ''}`}>
          {bericht.inhoud}
        </div>
      </div>
    );
  };

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

        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto"></div>
              <p className="text-[var(--kleur-muted)]">Laden...</p>
            </div>
          </div>
        )}

        {!loading && foutmelding && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl max-w-md">
              <h3 className="font-medium mb-2">Er is een fout opgetreden</h3>
              <p className="text-sm mb-4">{foutmelding}</p>
              <button 
                onClick={() => navigate('/thema-overzicht')} 
                className="btn btn-primary text-sm"
              >
                Terug naar thema overzicht
              </button>
            </div>
          </div>
        )}

        {!loading && !foutmelding && currentIndex === -1 && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="space-y-4 max-w-md">
              <p className="bg-[var(--kleur-secondary)] p-4 rounded-2xl text-sm">
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
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={startGesprek}
                  className="btn btn-primary px-4 py-2 rounded-full"
                >
                  {antwoorden.some(a => a.antwoord !== null) ? 'Ga verder' : 'Start gesprek'}
                </button>
                {antwoorden.some(a => a.antwoord !== null) && (
                  <button
                    onClick={herstartGesprek}
                    className="btn btn-secondary px-4 py-2 rounded-full"
                  >
                    Herstart gesprek
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {!loading && !foutmelding && currentIndex >= 0 && !done && (
          <>
            {/* Chat berichten container */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-2"
            >
              {chatBerichten.map((bericht) => (
                <ChatBericht key={bericht.id} bericht={bericht} />
              ))}
              
              {isVerzenden && (
                <div className="flex justify-end mb-3">
                  <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                      Verwerken...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <div className="sticky bottom-0 bg-white border-t">
              <form
                onSubmit={verstuurAntwoord}
                className="p-4 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
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

        {!loading && !foutmelding && done && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Chat berichten tonen */}
            {chatBerichten.map((bericht) => (
              <ChatBericht key={bericht.id} bericht={bericht} />
            ))}
            
            {/* Afronding bericht */}
            <div className="bg-green-100 text-green-800 p-4 rounded-xl">
              Bedankt voor je antwoorden. Je gesprek is opgeslagen.
            </div>

            <div className="bg-white p-4 rounded-xl border space-y-4">
              <h3 className="font-semibold text-[var(--kleur-primary)]">Je gesprek is afgerond!</h3>
              <p className="text-sm text-[var(--kleur-muted)]">
                Je wordt automatisch doorgestuurd naar je gesprek resultaten.
              </p>
              
              <button
                ref={completionButtonRef}
                onClick={() => navigate(`/gesprek-resultaat?theme_id=${themeId}&gesprek_id=${gesprekId}`)}
                className="btn btn-primary w-full"
              >
                Bekijk gesprek resultaten
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GesprekPagina