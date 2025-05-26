import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function SuperadminPortaal() {
  const session = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) return
    const role = session.user?.user_metadata?.role
    if (role !== 'superuser') {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [session, router])

  if (loading) return <p>Bezig met laden...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Superadmin Portaal – Thema’s beheren</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert('Thema toevoegen logica komt hier')}
        >
          + Thema toevoegen
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Actieve thema’s (dummy)</h2>
        <ul className="divide-y">
          <li className="py-2 flex justify-between items-center">
            <span>Werkdruk & Taaklast</span>
            <span className="text-sm text-green-600">Standaard actief</span>
          </li>
          <li className="py-2 flex justify-between items-center">
            <span>Cyberrisico’s</span>
            <span className="text-sm text-yellow-600">Optioneel (upsell)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
