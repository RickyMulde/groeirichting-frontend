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
        .select('id, titel, beschrijving_werknemer, beschrijving_werkgever, klaar_voor_gebruik, standaard_zichtbaar, alleen_premium, alleen_concept, volgorde_index')
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
            <li key={thema.id} className="py-4 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">{thema.titel}</span>
                  {thema.standaard_zichtbaar ? (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded font-medium">
                      Generiek
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded font-medium">
                      Exclusief
                    </span>
                  )}
                  {!thema.klaar_voor_gebruik && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      Concept
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{thema.beschrijving_werkgever || thema.beschrijving_werknemer}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {thema.standaard_zichtbaar 
                    ? "Dit thema is standaard zichtbaar voor alle werkgevers. Werkgevers kunnen het uitzetten."
                    : "Dit thema is exclusief en moet per werkgever/team gekoppeld worden door een beheerder."
                  }
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Link 
                  to={`/superadmin/thema/${thema.id}/koppelingen`} 
                  className="btn btn-secondary text-sm"
                  title="Beheer werkgever-koppelingen"
                >
                  Koppelingen
                </Link>
                <Link to={`/superadmin/thema/${thema.id}`} className="btn btn-accent text-sm">Bewerk</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default ThemaBeheerOverzicht 