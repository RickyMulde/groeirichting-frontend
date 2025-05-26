import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function SuperadminPortaal() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          navigate('/login')
          return
        }

        const { data: profiel, error: profielError } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profielError) {
          console.error('Fout bij ophalen gebruikersrol:', profielError)
          setError('Er is een fout opgetreden bij het ophalen van je rechten.')
          return
        }

        if (!profiel || profiel.role !== 'superuser') {
          navigate('/login')
          return
        }

        setLoading(false)
      } catch (error) {
        console.error('Fout bij authenticatie:', error)
        setError('Er is een fout opgetreden bij het inloggen.')
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--kleur-primary)]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Superadmin Portaal – Thema's beheren</h1>

      <button
        className="btn btn-primary"
        onClick={() => alert('Thema toevoegen komt hier')}
      >
        + Thema toevoegen
      </button>

      <div className="bg-white shadow-md p-6 rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">Actieve thema's (dummy)</h2>
        <ul className="divide-y">
          <li className="py-2 flex justify-between items-center">
            <span>Werkdruk & Taaklast</span>
            <span className="text-sm text-[var(--kleur-accent)]">Standaard actief</span>
          </li>
          <li className="py-2 flex justify-between items-center">
            <span>Cyberrisico's</span>
            <span className="text-sm text-[var(--kleur-secondary)]">Optioneel (upsell)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SuperadminPortaal
