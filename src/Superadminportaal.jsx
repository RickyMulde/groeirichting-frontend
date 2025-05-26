import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function SuperadminPortaal() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        navigate('/login')
        return
      }

      const { data: profiel, error: profielError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profielError || !profiel || profiel.role !== 'superuser') {
        navigate('/login')
        return
      }

      setUser(data.user)
    }

    fetchUser()
  }, [navigate])

  if (!user) {
    return <p className="text-center mt-10">Laden...</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Superadmin Portaal – Thema's beheren</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => alert('Thema toevoegen komt hier')}
      >
        + Thema toevoegen
      </button>

      <div className="bg-white shadow rounded-lg p-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Actieve thema's (dummy)</h2>
        <ul className="divide-y">
          <li className="py-2 flex justify-between items-center">
            <span>Werkdruk & Taaklast</span>
            <span className="text-sm text-green-600">Standaard actief</span>
          </li>
          <li className="py-2 flex justify-between items-center">
            <span>Cyberrisico's</span>
            <span className="text-sm text-yellow-600">Optioneel (upsell)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SuperadminPortaal
