// 📁 Bestand: Superadminportaal.jsx
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

function SuperadminPortaal() {
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
      const { data, error } = await supabase.from('themes').select('*')
      if (!error) setThemas(data)
    }

    checkAuth()
    fetchThemas()
    setLoading(false)
  }, [])

  if (loading) return <div className="page-container">Laden...</div>
  if (error) return <div className="page-container text-red-600">{error}</div>

  return (
    <div className="page-container">
      <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-6">Superadmin Portaal – Thema's beheren</h1>

      <Link to="/superadmin/thema/nieuw" className="btn btn-primary">+ Thema toevoegen</Link>

      <div className="bg-white shadow-md p-6 rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">Bestaande thema's</h2>
        <ul className="divide-y">
          {themas.map((thema) => (
            <li key={thema.id} className="py-2 flex justify-between items-center">
              <span>{thema.titel}</span>
              <Link to={`/superadmin/thema/${thema.id}`} className="btn btn-accent text-sm">Bewerk</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SuperadminPortaal
