import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from './supabaseClient'
import { MessageSquare, FileText, BarChart3, ChevronLeft, ChevronRight, Upload } from 'lucide-react'

const PANEL_CHAT = 0
const PANEL_FILES = 1

function GroeiCockpit() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activePanel, setActivePanel] = useState(PANEL_CHAT)
  const swipeRef = useRef({ x: 0 })

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

  const goToPanel = useCallback((panel) => {
    setActivePanel(panel)
  }, [])

  const handleTouchStart = useCallback((e) => {
    swipeRef.current.x = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const diff = swipeRef.current.x - e.changedTouches[0].clientX
    const threshold = 50
    if (diff > threshold) goToPanel(PANEL_FILES)
    else if (diff < -threshold) goToPanel(PANEL_CHAT)
  }, [goToPanel])

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--kleur-primary)] mx-auto mb-4" />
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full -mx-6 overflow-x-hidden">
      <header className="pl-6 pr-2 mb-4">
        <h1 className="text-2xl font-semibold text-[var(--kleur-primary)] mb-2">GroeiCockpit</h1>
        <p className="text-sm text-gray-600">
          Ingelogd als: <strong>{user?.email ?? '—'}</strong>
          <span className="ml-3 text-gray-500">user_id: {user?.id ?? '—'}</span>
        </p>
      </header>

      {/* Mobiel: één paneel, swipe + pijltjes */}
      <div
        className="lg:hidden overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between gap-2 pl-4 pr-2 mb-3">
          <button
            type="button"
            onClick={() => goToPanel(PANEL_CHAT)}
            className={`p-2 rounded-lg transition-colors ${activePanel === PANEL_CHAT ? 'bg-[var(--kleur-primary)] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            aria-label="Chat tonen"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-600">
            {activePanel === PANEL_CHAT ? 'Chat met agents' : 'Bestanden en grafieken'}
          </span>
          <button
            type="button"
            onClick={() => goToPanel(PANEL_FILES)}
            className={`p-2 rounded-lg transition-colors ${activePanel === PANEL_FILES ? 'bg-[var(--kleur-primary)] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            aria-label="Bestanden tonen"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full" style={{ minHeight: 'calc(100vh - 220px)' }}>
          <section
            className={`absolute inset-0 ml-4 mr-2 bg-white shadow-md rounded-xl p-6 flex flex-col transition-opacity duration-200 ${activePanel === PANEL_CHAT ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-[var(--kleur-primary)]" />
              <h2 className="text-lg font-semibold text-gray-800">Chat met je agents</h2>
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50/50 flex items-center justify-center text-gray-500 text-sm min-h-[280px]">
              Chat en agents worden hier getoond (Fase 4).
            </div>
          </section>

          <section
            className={`absolute inset-0 ml-4 mr-2 bg-white shadow-md rounded-xl p-6 flex flex-col transition-opacity duration-200 ${activePanel === PANEL_FILES ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-[var(--kleur-accent)]" />
              <BarChart3 className="w-6 h-6 text-[var(--kleur-accent)]" />
              <h2 className="text-lg font-semibold text-gray-800">Bestanden en grafieken</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[280px] text-gray-500">
              <Upload className="w-16 h-16 text-[var(--kleur-accent)] opacity-70" aria-hidden />
              <p className="text-sm text-center">Upload bestanden om inzichten te halen en te hergebruiken.</p>
              <button type="button" className="btn btn-primary" disabled aria-label="Upload bestand (komt in een latere fase)">
                Upload bestand
              </button>
            </div>
          </section>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2 pl-4 pr-2">Swipe of gebruik de pijltjes om te wisselen</p>
      </div>

      {/* Desktop: twee kolommen, volle breedte */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:pl-6 lg:pr-2 lg:min-h-[500px]">
        <section className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-[var(--kleur-primary)]" />
            <h2 className="text-lg font-semibold text-gray-800">Chat met je agents</h2>
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50/50 flex items-center justify-center text-gray-500 text-sm">
            Chat en agents worden hier getoond (Fase 4).
          </div>
        </section>

        <section className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-[var(--kleur-accent)]" />
            <BarChart3 className="w-6 h-6 text-[var(--kleur-accent)]" />
            <h2 className="text-lg font-semibold text-gray-800">Bestanden en grafieken</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-500">
            <Upload className="w-20 h-20 text-[var(--kleur-accent)] opacity-70" aria-hidden />
            <p className="text-sm text-center">Upload bestanden om inzichten te halen en te hergebruiken.</p>
            <button type="button" className="btn btn-primary" disabled aria-label="Upload bestand (komt in een latere fase)">
              Upload bestand
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default GroeiCockpit
