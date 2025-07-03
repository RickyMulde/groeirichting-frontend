// 📁 Bestand: Superadminportaal.jsx
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Settings, Users, Palette } from 'lucide-react'

function SuperadminPortaal() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return navigate('/login')

      const { data: profiel } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!profiel || profiel.role !== 'superuser') return navigate('/login')
    }

    checkAuth()
  }, [])

  return (
    <div className="page-container">
      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Superadmin Portaal</h1>

      <div className="max-w-4xl mx-auto pt-20 px-4 space-y-8">
        {/* 1. Themabeheer */}
        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Palette className="text-[var(--kleur-primary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Themabeheer</h2>
              <p className="text-sm text-gray-500">Beheer alle thema's, vragen en AI-configuraties voor het platform.</p>
            </div>
          </div>
          <Link to="/superadmin/thema-beheer" className="btn btn-primary">Ga naar themabeheer</Link>
        </section>

        {/* 2. Werkgevers en werknemers instellingen */}
        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users className="text-[var(--kleur-accent)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Werkgevers en werknemers instellingen</h2>
              <p className="text-sm text-gray-500">Beheer alle gebruikersaccounts, rechten en organisatie-instellingen.</p>
            </div>
          </div>
          <Link to="/superadmin/gebruikers-beheer" className="btn btn-accent">Beheer gebruikers</Link>
        </section>

        {/* 3. Blanco - nog in te vullen */}
        <section className="bg-white shadow-md p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Settings className="text-[var(--kleur-secondary)] w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Systeem instellingen</h2>
              <p className="text-sm text-gray-500">Platform-brede instellingen en configuraties (nog in ontwikkeling).</p>
            </div>
          </div>
          <button className="btn btn-secondary" disabled>Binnenkort beschikbaar</button>
        </section>
      </div>
    </div>
  )
}

export default SuperadminPortaal
