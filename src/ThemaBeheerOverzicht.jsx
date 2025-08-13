import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { ArrowLeft, Settings, Plus } from 'lucide-react'

function ThemaBeheerOverzicht() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [themas, setThemas] = useState([])
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

    const fetchThemas = async () => {
      const { data: themaData, error: themaError } = await supabase
        .from('themes')
        .select('id, titel, beschrijving_werknemer, klaar_voor_gebruik, standaard_zichtbaar, alleen_premium, alleen_concept, volgorde_index')
        .order('volgorde_index', { ascending: true })
      if (!themaError) setThemas(themaData)
    }

    checkAuth()
    fetchThemas()
    setLoading(false)
  }, [])

  if (loading) return <div className="page-container">Laden...</div>
  if (error) return <div className="page-container text-red-600">{error}</div>

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                onClick={() => navigate('/superadmin-portaal')}
                className="btn btn-secondary flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar portaal
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--kleur-primary)]">Thema's beheren</h1>
                <p className="text-gray-600 text-sm sm:text-base">Beheer alle thema's en hun configuratie voor de AI-gesprekken.</p>
              </div>
            </div>
            <Settings className="text-[var(--kleur-primary)] w-6 h-6 sm:w-8 sm:h-8 self-start sm:self-center" />
          </div>
        </div>

        <Link to="/superadmin/thema/nieuw" className="btn btn-primary flex items-center gap-2 w-fit mb-6">
          <Plus className="w-4 h-4" />
          Thema toevoegen
        </Link>

      <div className="bg-white shadow-md p-6 rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">Bestaande thema's</h2>
        <ul className="divide-y">
          {themas.map((thema) => (
            <li key={thema.id} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-medium">{thema.titel}</span>
                <p className="text-sm text-gray-600 mt-1">{thema.beschrijving_werknemer}</p>
              </div>
              <Link to={`/superadmin/thema/${thema.id}`} className="btn btn-accent text-sm">Bewerk</Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default ThemaBeheerOverzicht 