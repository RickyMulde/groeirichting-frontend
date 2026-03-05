import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { MessageSquare, FileText, BarChart3 } from 'lucide-react'

function GroeiCockpit() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: userData, error } = await supabase
          .from('users')
          .select('id, email')
          .eq('id', session.user.id)
          .single()

        if (!error && userData) {
          setUser({ id: userData.id, email: userData.email })
        } else {
          setUser({ id: session.user.id, email: session.user.email ?? 'Onbekend' })
        }
      } catch (err) {
        console.error('GroeiCockpit: error loading user', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4" />
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-2">GroeiCockpit</h1>
        <p className="text-sm text-gray-600">
          Ingelogd als: <strong>{user?.email ?? '—'}</strong>
          <span className="ml-3 text-gray-500">user_id: {user?.id ?? '—'}</span>
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        {/* Linkerkolom: chat */}
        <section className="bg-white shadow-md rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-[var(--kleur-primary)]" />
            <h2 className="text-lg font-semibold text-gray-800">Chat met je agents</h2>
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50/50 flex items-center justify-center text-gray-500 text-sm">
            Chat en agents worden hier getoond (Fase 4).
          </div>
        </section>

        {/* Rechterkolom: bestanden en grafieken */}
        <section className="bg-white shadow-md rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-[var(--kleur-accent)]" />
            <BarChart3 className="w-6 h-6 text-[var(--kleur-accent)]" />
            <h2 className="text-lg font-semibold text-gray-800">Bestanden en grafieken</h2>
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50/50 flex items-center justify-center text-gray-500 text-sm">
            Bestanden en grafieken van de agent worden hier getoond (Fase 3–4).
          </div>
        </section>
      </div>
    </div>
  )
}

export default GroeiCockpit
