import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from './supabaseClient'
import { MessageSquare, FileText, BarChart3, ChevronLeft, ChevronRight, Upload, Download, Loader2 } from 'lucide-react'

const PANEL_CHAT = 0
const PANEL_FILES = 1
const BUCKET = 'groei-cockpit-uploads'

function sanitizeFilename(name) {
  return name.replace(/[/\\]/g, '').replace(/\.\./g, '').trim() || 'bestand'
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatBytes(n) {
  if (n == null || n === 0) return ''
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function GroeiCockpit() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activePanel, setActivePanel] = useState(PANEL_CHAT)
  const [artifacts, setArtifacts] = useState([])
  const [artifactsLoading, setArtifactsLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const swipeRef = useRef({ x: 0 })
  const fileInputRef = useRef(null)

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

  const fetchArtifacts = useCallback(async () => {
    if (!user?.id) return
    setArtifactsLoading(true)
    try {
      const { data, error } = await supabase
        .from('groei_cockpit_artifacts')
        .select('id, title, type, storage_path, mime_type, size_bytes, created_at')
        .eq('owner_id', user.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
      if (!error) setArtifacts(data ?? [])
    } catch (err) {
      console.error('GroeiCockpit: error loading artifacts', err)
    } finally {
      setArtifactsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchArtifacts()
  }, [fetchArtifacts])

  const handleUploadClick = useCallback(() => {
    setUploadError(null)
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !user?.id) return
    const safeName = sanitizeFilename(file.name)
    const path = `${user.id}/${Date.now()}_${safeName}`
    setUploadLoading(true)
    setUploadError(null)
    try {
      const { error: uploadErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type ?? 'application/octet-stream', upsert: false })
      if (uploadErr) {
        setUploadError(uploadErr.message ?? 'Upload mislukt')
        return
      }
      const { error: insertErr } = await supabase.from('groei_cockpit_artifacts').insert({
        owner_id: user.id,
        conversation_id: null,
        type: 'file',
        title: file.name,
        storage_path: path,
        mime_type: file.type || null,
        size_bytes: file.size,
        metadata: {}
      })
      if (insertErr) {
        setUploadError(insertErr.message ?? 'Opslaan mislukt')
        return
      }
      await fetchArtifacts()
    } catch (err) {
      setUploadError(err.message ?? 'Er ging iets mis')
    } finally {
      setUploadLoading(false)
    }
  }, [user?.id, fetchArtifacts])

  const handleOpenFile = useCallback(async (artifact) => {
    if (artifact.type !== 'file' || !artifact.storage_path) return
    try {
      const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(artifact.storage_path, 60)
      if (error) return
      if (data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error('GroeiCockpit: signed url failed', err)
    }
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

  const filesPanelContent = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-[var(--kleur-accent)]" />
        <BarChart3 className="w-6 h-6 text-[var(--kleur-accent)]" />
        <h2 className="text-lg font-semibold text-gray-800">Bestanden en grafieken</h2>
      </div>
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center gap-2 py-4 text-gray-500 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--kleur-accent)] opacity-70" aria-hidden />
          <p className="text-sm text-center">Upload bestanden om inzichten te halen en te hergebruiken.</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,application/json,image/png,image/jpeg"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUploadClick}
            disabled={uploadLoading}
            aria-label="Upload bestand"
          >
            {uploadLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                Uploaden…
              </>
            ) : (
              'Upload bestand'
            )}
          </button>
          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
        </div>
        {artifactsLoading ? (
          <div className="flex items-center justify-center py-6 text-gray-500 text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Bestanden laden…
          </div>
        ) : artifacts.length > 0 ? (
          <div className="flex-1 min-h-0 overflow-auto">
            <p className="text-xs font-medium text-gray-500 mb-2">Jouw bestanden</p>
            <ul className="space-y-2">
              {artifacts.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate" title={a.title}>{a.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(a.created_at)}
                      {a.size_bytes != null && ` · ${formatBytes(a.size_bytes)}`}
                    </p>
                  </div>
                  {a.type === 'file' && a.storage_path && (
                    <button
                      type="button"
                      onClick={() => handleOpenFile(a)}
                      className="btn btn-outline text-sm shrink-0 flex items-center gap-1"
                      aria-label={`Openen: ${a.title}`}
                    >
                      <Download className="w-4 h-4" />
                      Openen
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  )

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
            className={`absolute inset-0 ml-4 mr-2 bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[280px] transition-opacity duration-200 ${activePanel === PANEL_FILES ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
          >
            {filesPanelContent}
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
          {filesPanelContent}
        </section>
      </div>
    </div>
  )
}

export default GroeiCockpit
