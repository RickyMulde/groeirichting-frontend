import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, ArrowRight } from 'lucide-react'
import { supabase } from '../supabaseClient'

const ThemaVoortgangBanner = ({ gesprekDatum, userId }) => {
  const navigate = useNavigate()
  const [themaVoortgang, setThemaVoortgang] = useState([])
  const [loading, setLoading] = useState(true)
  const [werkgeverConfig, setWerkgeverConfig] = useState(null)

  useEffect(() => {
    if (gesprekDatum && userId) {
      haalThemaVoortgangOp()
    }
  }, [gesprekDatum, userId])

  const haalThemaVoortgangOp = async () => {
    try {
      setLoading(true)
      console.log('ThemaVoortgangBanner: Start ophalen voortgang voor:', { gesprekDatum, userId })

      // Haal eerst werknemer en werkgever op
      const { data: werknemer, error: werknemerError } = await supabase
        .from('users')
        .select('employer_id')
        .eq('id', userId)
        .single()

      if (werknemerError) throw werknemerError
      console.log('ThemaVoortgangBanner: Werknemer opgehaald:', werknemer)

      // Haal werkgever configuratie op voor actieve maanden
      let config = { actieve_maanden: [3, 6, 9] } // Default fallback
      try {
        const werkgeverResponse = await fetch(`https://groeirichting-backend.onrender.com/api/werkgever-gesprek-instellingen/${werknemer.employer_id}`)
        if (werkgeverResponse.ok) {
          config = await werkgeverResponse.json()
        }
      } catch (error) {
        console.error('Fout bij ophalen werkgever configuratie:', error)
      }

      setWerkgeverConfig(config)
      console.log('ThemaVoortgangBanner: Werkgever config:', config)

      // Bepaal de actieve periode van het afgeronde gesprek
      const gesprekDatumObj = new Date(gesprekDatum)
      const gesprekJaar = gesprekDatumObj.getFullYear()
      const gesprekMaand = gesprekDatumObj.getMonth() + 1
      const gesprekPeriode = `${gesprekJaar}-${String(gesprekMaand).padStart(2, '0')}`

      console.log('ThemaVoortgangBanner: Gesprek periode:', { gesprekJaar, gesprekMaand, gesprekPeriode })

      // Check of de maand van het gesprek een actieve maand was
      const isGesprekMaandActief = config.actieve_maanden.includes(gesprekMaand)
      console.log('ThemaVoortgangBanner: Is gesprek maand actief:', isGesprekMaandActief)

      if (!isGesprekMaandActief) {
        // Gesprek was niet in een actieve maand, toon geen voortgang
        console.log('ThemaVoortgangBanner: Gesprek was niet in actieve maand, toon geen voortgang')
        setThemaVoortgang([])
        setLoading(false)
        return
      }

      // Haal alle actieve thema's op
      const { data: themas, error: themaError } = await supabase
        .from('themes')
        .select('id, titel, beschrijving')
        .eq('klaar_voor_gebruik', true)
        .eq('standaard_zichtbaar', true)
        .order('volgorde_index', { ascending: true })

      if (themaError) throw themaError
      console.log('ThemaVoortgangBanner: Thema\'s opgehaald:', themas)

      // Haal gesprekken op voor deze gebruiker in dezelfde periode
      const { data: gesprekken, error: gesprekError } = await supabase
        .from('gesprek')
        .select('theme_id, status, gestart_op')
        .eq('werknemer_id', userId)
        .is('geanonimiseerd_op', null)
        .gte('gestart_op', `${gesprekPeriode}-01`)
        .lt('gestart_op', `${gesprekPeriode + 1}-01`) // Volgende maand
        .order('gestart_op', { ascending: false })

      if (gesprekError) throw gesprekError
      console.log('ThemaVoortgangBanner: Gesprekken opgehaald:', gesprekken)

      // Combineer data voor voortgang
      const voortgang = themas.map(thema => {
        const themaGesprekken = gesprekken?.filter(g => g.theme_id === thema.id) || []
        
        // Bepaal status op basis van gesprekken in deze periode
        let status = 'nieuw'
        let gesprek_id = null
        
        if (themaGesprekken.length > 0) {
          // Sorteer op startdatum (nieuwste eerst)
          const gesorteerdeGesprekken = themaGesprekken.sort((a, b) => 
            new Date(b.gestart_op) - new Date(a.gestart_op)
          )
          
          const laatsteGesprek = gesorteerdeGesprekken[0]
          gesprek_id = laatsteGesprek.id
          
          if (laatsteGesprek.status === 'Afgerond') {
            status = 'afgerond'
          } else if (laatsteGesprek.status === 'Nog niet afgerond') {
            status = 'bezig'
          }
        }
        
        return {
          ...thema,
          status,
          gesprek_id
        }
      })

      console.log('ThemaVoortgangBanner: Voortgang berekend:', voortgang)
      setThemaVoortgang(voortgang)
    } catch (error) {
      console.error('Fout bij ophalen thema voortgang:', error)
    } finally {
      setLoading(false)
    }
  }

  // Bereken voortgang statistieken
  const afgerondeThemas = themaVoortgang.filter(t => t.status === 'afgerond').length
  const totaleThemas = themaVoortgang.length
  const voortgangPercentage = totaleThemas > 0 ? Math.round((afgerondeThemas / totaleThemas) * 100) : 0
  const openstaandeThemas = themaVoortgang.filter(t => t.status !== 'afgerond')

  // Functie om naar het volgende thema te gaan
  const startVolgendThema = async (themaId) => {
    try {
      // Maak een nieuw gesprek aan
      const response = await fetch('https://groeirichting-backend.onrender.com/api/save-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          werknemer_id: userId,
          theme_id: themaId,
          status: 'Nog niet afgerond'
        })
      });
      
      const result = await response.json();
      if (response.ok && result.gesprek_id) {
        navigate(`/gesprek?theme_id=${themaId}&gesprek_id=${result.gesprek_id}`);
      }
    } catch (error) {
      console.error('Fout bij starten volgend thema:', error);
    }
  }

  // Als er geen thema's zijn of geen actieve periode, toon niets
  if (loading) {
    return (
      <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4"></div>
          <p className="text-gray-500">Voortgang wordt geladen...</p>
        </div>
      </section>
    )
  }

  // Als er geen thema's zijn, toon een bericht
  if (themaVoortgang.length === 0) {
    return (
      <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">Jouw voortgang deze periode</h2>
          <p className="text-sm text-[var(--kleur-muted)]">
            Geen thema's beschikbaar voor deze periode
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-500">Er zijn momenteel geen actieve thema's voor deze periode.</p>
          <p className="text-xs text-gray-400 mt-2">
            Debug: Gesprek datum: {gesprekDatum} | User ID: {userId} | Thema's: {themaVoortgang.length}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[var(--kleur-primary)]">Jouw voortgang deze periode</h2>
        <p className="text-sm text-[var(--kleur-muted)]">
          Bekijk je voortgang en start direct met het volgende thema
        </p>
      </div>

      {/* Voortgangsbalk */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Algemene voortgang</span>
          <span className="text-sm font-medium text-[var(--kleur-primary)]">{afgerondeThemas}/{totaleThemas} thema's afgerond</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-[var(--kleur-primary)] to-[var(--kleur-accent)] h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${voortgangPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 text-center">{voortgangPercentage}% voltooid</p>
      </div>

      {/* Call-to-action voor openstaande thema's */}
      {openstaandeThemas.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-1">Je hebt nog {openstaandeThemas.length} thema{openstaandeThemas.length > 1 ? 's' : ''} open staan</h4>
              <p className="text-sm text-blue-700 mb-3">
                Klik op een thema hieronder om direct door te gaan.
              </p>
              <div className="flex flex-wrap gap-2">
                {openstaandeThemas.slice(0, 3).map((thema) => (
                  <button
                    key={thema.id}
                    onClick={() => startVolgendThema(thema.id)}
                    className="btn btn-primary text-xs px-3 py-1.5"
                  >
                    Start {thema.titel}
                  </button>
                ))}
                {openstaandeThemas.length > 3 && (
                  <span className="text-xs text-blue-600 self-center">
                    +{openstaandeThemas.length - 3} meer
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Link naar volledig overzicht */}
      <div className="text-center">
        <button
          onClick={() => navigate('/thema-overzicht')}
          className="btn btn-outline text-sm px-4 py-2 inline-flex items-center gap-2"
        >
          Bekijk volledig thema overzicht
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}

export default ThemaVoortgangBanner
