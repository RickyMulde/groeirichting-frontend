import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from './supabaseClient'
import {
  MessageSquare,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  Loader2,
  Plus,
  Send,
  X
} from 'lucide-react'

const PANEL_CHAT = 0
const PANEL_FILES = 1
const BUCKET = 'groei-cockpit-uploads'

/** Beschikbare agents (handmatig bijhouden; niet via API). */
const GROEI_COCKPIT_AGENTS = [
  { id: 'main', label: 'Main' },
  { id: 'nieuwe-technieken', label: 'Nieuwe technieken' },
  { id: 'prive', label: 'Privé' }
]

function sanitizeFilename(name) {
  return name.replace(/[/\\]/g, '').replace(/\.\./g, '').trim() || 'bestand'
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatDateShort(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
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
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [panels, setPanels] = useState([])
  const [panelsLoading, setPanelsLoading] = useState(false)
  const [artifacts, setArtifacts] = useState([])
  const [artifactsLoading, setArtifactsLoading] = useState(false)
  const [artifactsFilterConversation, setArtifactsFilterConversation] = useState(false)
  const [referencedArtifactId, setReferencedArtifactId] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [conversationsLoading, setConversationsLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const [selectedAgentForNew, setSelectedAgentForNew] = useState(GROEI_COCKPIT_AGENTS[0]?.id || 'main')
  const swipeRef = useRef({ x: 0 })
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const conversationListRef = useRef(null)

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

  const fetchConversations = useCallback(async () => {
    if (!user?.id) return
    setConversationsLoading(true)
    try {
      const { data, error } = await supabase
        .from('groei_cockpit_conversations')
        .select('id, title, last_message_at, updated_at, status, metadata')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('last_message_at', { ascending: false, nullsFirst: false })
      if (!error) {
        const list = data ?? []
        setConversations(list)
        if (list.length > 0 && !currentConversationId) setCurrentConversationId(list[0].id)
        else if (list.length === 0) setCurrentConversationId(null)
      }
    } catch (err) {
      console.error('GroeiCockpit: error loading conversations', err)
    } finally {
      setConversationsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const fetchMessages = useCallback(async () => {
    if (!currentConversationId) {
      setMessages([])
      return
    }
    setMessagesLoading(true)
    try {
      const { data, error } = await supabase
        .from('groei_cockpit_messages')
        .select('id, seq, role, content, content_type, created_at')
        .eq('conversation_id', currentConversationId)
        .is('deleted_at', null)
        .order('seq', { ascending: true })
      if (!error) setMessages(data ?? [])
    } catch (err) {
      console.error('GroeiCockpit: error loading messages', err)
    } finally {
      setMessagesLoading(false)
    }
  }, [currentConversationId])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const fetchPanels = useCallback(async () => {
    if (!currentConversationId) {
      setPanels([])
      return
    }
    setPanelsLoading(true)
    try {
      const { data, error } = await supabase
        .from('groei_cockpit_panels')
        .select('id, panel_key, content, content_format, updated_at')
        .eq('conversation_id', currentConversationId)
        .is('deleted_at', null)
      if (!error) setPanels(data ?? [])
    } catch (err) {
      console.error('GroeiCockpit: error loading panels', err)
    } finally {
      setPanelsLoading(false)
    }
  }, [currentConversationId])

  useEffect(() => {
    fetchPanels()
  }, [fetchPanels])

  const fetchArtifacts = useCallback(async () => {
    if (!user?.id) return
    setArtifactsLoading(true)
    try {
      let q = supabase
        .from('groei_cockpit_artifacts')
        .select('id, title, type, storage_path, chart_config, mime_type, size_bytes, conversation_id, created_at')
        .eq('owner_id', user.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
      if (artifactsFilterConversation && currentConversationId) {
        q = q.eq('conversation_id', currentConversationId)
      }
      const { data, error } = await q
      if (!error) setArtifacts(data ?? [])
    } catch (err) {
      console.error('GroeiCockpit: error loading artifacts', err)
    } finally {
      setArtifactsLoading(false)
    }
  }, [user?.id, artifactsFilterConversation, currentConversationId])

  useEffect(() => {
    fetchArtifacts()
  }, [fetchArtifacts])

  const handleNewConversation = useCallback(() => {
    setSelectedAgentForNew(GROEI_COCKPIT_AGENTS[0]?.id || 'main')
    setShowNewConversationModal(true)
  }, [])

  const handleCreateConversation = useCallback(async () => {
    if (!user?.id) return
    const agentId = selectedAgentForNew || 'main'
    setSending(true)
    setSendError(null)
    try {
      const { data, error } = await supabase
        .from('groei_cockpit_conversations')
        .insert({
          user_id: user.id,
          status: 'active',
          title: 'Nieuw gesprek',
          metadata: { openclaw_agent_id: agentId }
        })
        .select('id')
        .single()
      if (error) {
        setSendError(error.message)
        return
      }
      setShowNewConversationModal(false)
      setReferencedArtifactId(null)
      await fetchConversations()
      if (data?.id) setCurrentConversationId(data.id)
    } catch (err) {
      setSendError(err.message ?? 'Mislukt')
    } finally {
      setSending(false)
    }
  }, [user?.id, selectedAgentForNew, fetchConversations])

  const getNextSeq = useCallback(async (convId) => {
    const { data } = await supabase
      .from('groei_cockpit_messages')
      .select('seq')
      .eq('conversation_id', convId)
      .order('seq', { ascending: false })
      .limit(1)
      .maybeSingle()
    return (data?.seq ?? 0) + 1
  }, [])

  const handleSendMessage = useCallback(async () => {
    const text = newMessage.trim()
    if (!text || !currentConversationId || !user?.id) return
    setSending(true)
    setSendError(null)
    try {
      const seq = await getNextSeq(currentConversationId)
      const { data: msg, error } = await supabase
        .from('groei_cockpit_messages')
        .insert({
          conversation_id: currentConversationId,
          seq,
          role: 'user',
          content: text,
          content_type: 'plain',
          created_by: user.id
        })
        .select('id')
        .single()
      if (error) {
        setSendError(error.message)
        return
      }
      setNewMessage('')
      await fetchMessages()
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      if (baseUrl) {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          const headers = { 'Content-Type': 'application/json' }
          if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`
          const res = await fetch(`${baseUrl}/api/groei-cockpit/process`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              conversation_id: currentConversationId,
              message_id: msg?.id,
              referenced_artifact_ids: referencedArtifactId ? [referencedArtifactId] : []
            })
          })
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}))
            setSendError(errData?.error || res.statusText || 'Versturen mislukt')
          }
        } catch (_) {}
      }
      await fetchMessages()
    } catch (err) {
      setSendError(err.message ?? 'Versturen mislukt')
    } finally {
      setSending(false)
    }
  }, [newMessage, currentConversationId, user?.id, getNextSeq, fetchMessages, referencedArtifactId])

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
      await supabase.from('groei_cockpit_artifacts').insert({
        owner_id: user.id,
        conversation_id: null,
        type: 'file',
        title: file.name,
        storage_path: path,
        mime_type: file.type || null,
        size_bytes: file.size,
        metadata: {}
      })
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setReferencedArtifactId(null)
  }, [currentConversationId])

  const currentConversation = conversations.find((c) => c.id === currentConversationId)
  const referencedArtifact = referencedArtifactId ? artifacts.find((a) => a.id === referencedArtifactId) : null

  const chatPanelContent = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6 text-[var(--kleur-primary)]" />
        <h2 className="text-lg font-semibold text-gray-800">Chat met je agents</h2>
      </div>
      <div className="flex flex-col flex-1 min-h-0 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={currentConversationId ?? ''}
            onChange={(e) => setCurrentConversationId(e.target.value || null)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm min-w-[180px] bg-white"
            ref={conversationListRef}
          >
            <option value="">— Kies gesprek —</option>
            {conversations.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title || 'Gesprek'} {formatDateShort(c.last_message_at || c.updated_at) && `(${formatDateShort(c.last_message_at || c.updated_at)})`}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleNewConversation}
            disabled={sending}
            className="btn btn-outline text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Nieuw gesprek
          </button>
        </div>

        {!currentConversationId ? (
          <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50/50 flex items-center justify-center text-gray-500 text-sm min-h-[200px]">
            Kies een gesprek of start een nieuw gesprek.
          </div>
        ) : (
          <>
            <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50/30 overflow-y-auto min-h-[200px] max-h-[320px] p-3 space-y-3">
              {messagesLoading ? (
                <div className="flex items-center justify-center py-8 text-gray-500 text-sm">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Berichten laden…
                </div>
              ) : messages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">Nog geen berichten. Stuur er een.</p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : m.role === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        m.role === 'user'
                          ? 'bg-[var(--kleur-primary)] text-white'
                          : m.role === 'system'
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.content}</p>
                      <p className={`text-xs mt-1 ${m.role === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                        {formatDate(m.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Typ je bericht..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                disabled={sending}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={sending || !newMessage.trim()}
                className="btn btn-primary flex items-center gap-1"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Verstuur
              </button>
            </div>
            {sendError && <p className="text-sm text-red-600">{sendError}</p>}
          </>
        )}
      </div>
    </>
  )

  const filesPanelContent = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-[var(--kleur-accent)]" />
        <BarChart3 className="w-6 h-6 text-[var(--kleur-accent)]" />
        <h2 className="text-lg font-semibold text-gray-800">Bestanden en grafieken</h2>
      </div>
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-auto">
        {referencedArtifact && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-medium text-blue-800 mb-1">In gesprek: {referencedArtifact.title}</p>
            <button
              type="button"
              onClick={() => handleOpenFile(referencedArtifact)}
              className="btn btn-outline text-xs"
            >
              Openen
            </button>
            <button
              type="button"
              onClick={() => setReferencedArtifactId(null)}
              className="ml-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Loskoppelen
            </button>
          </div>
        )}

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

        {currentConversationId && (
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={artifactsFilterConversation}
              onChange={(e) => setArtifactsFilterConversation(e.target.checked)}
            />
            Alleen van dit gesprek
          </label>
        )}

        {panels.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Panels</p>
            <ul className="space-y-2">
              {panels.map((p) => (
                <li key={p.id} className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">{p.panel_key}</p>
                  <div className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                    {p.content_format === 'json' ? JSON.stringify(p.content) : p.content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {artifactsLoading ? (
          <div className="flex items-center justify-center py-6 text-gray-500 text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Bestanden laden…
          </div>
        ) : artifacts.length > 0 ? (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Jouw bestanden en grafieken</p>
            <ul className="space-y-2">
              {artifacts.map((a) => (
                <li
                  key={a.id}
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate" title={a.title}>
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(a.created_at)}
                        {a.size_bytes != null && ` · ${formatBytes(a.size_bytes)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {currentConversationId && (
                        <button
                          type="button"
                          onClick={() => setReferencedArtifactId(referencedArtifactId === a.id ? null : a.id)}
                          className={`btn btn-outline text-xs ${referencedArtifactId === a.id ? 'btn-primary' : ''}`}
                        >
                          {referencedArtifactId === a.id ? 'Gekoppeld' : 'Koppel'}
                        </button>
                      )}
                      {a.type === 'file' && a.storage_path && (
                        <button
                          type="button"
                          onClick={() => handleOpenFile(a)}
                          className="btn btn-outline text-sm flex items-center gap-1"
                          aria-label={`Openen: ${a.title}`}
                        >
                          <Download className="w-4 h-4" />
                          Openen
                        </button>
                      )}
                    </div>
                  </div>
                  {a.type === 'chart' && a.chart_config && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 font-mono overflow-x-auto">
                      Grafiek (data: {typeof a.chart_config === 'object' ? JSON.stringify(a.chart_config).slice(0, 80) + '…' : String(a.chart_config)})
                    </div>
                  )}
                  {a.type === 'snapshot' && a.storage_path && (
                    <SnapshotImage storagePath={a.storage_path} />
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

      <div className="lg:hidden overflow-hidden touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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
            className={`absolute inset-0 ml-4 mr-2 bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[280px] transition-opacity duration-200 ${activePanel === PANEL_CHAT ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
          >
            {chatPanelContent}
          </section>
          <section
            className={`absolute inset-0 ml-4 mr-2 bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[280px] transition-opacity duration-200 ${activePanel === PANEL_FILES ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
          >
            {filesPanelContent}
          </section>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2 pl-4 pr-2">Swipe of gebruik de pijltjes om te wisselen</p>
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:pl-6 lg:pr-2 lg:min-h-[500px]">
        <section className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[400px]">{chatPanelContent}</section>
        <section className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[400px]">{filesPanelContent}</section>
      </div>

      {showNewConversationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="new-conversation-title">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 id="new-conversation-title" className="text-lg font-semibold text-gray-800">Nieuw gesprek</h2>
              <button type="button" onClick={() => setShowNewConversationModal(false)} className="p-1 rounded hover:bg-gray-100" aria-label="Sluiten">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">Kies de agent voor dit gesprek.</p>
            <select
              value={selectedAgentForNew}
              onChange={(e) => setSelectedAgentForNew(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-4 bg-white"
            >
              {GROEI_COCKPIT_AGENTS.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
            {sendError && <p className="text-sm text-red-600 mb-2">{sendError}</p>}
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowNewConversationModal(false)} className="btn btn-outline">Annuleren</button>
              <button type="button" onClick={handleCreateConversation} disabled={sending} className="btn btn-primary">
                {sending ? <Loader2 className="w-4 h-4 animate-spin inline" /> : null} Start gesprek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SnapshotImage({ storagePath }) {
  const [src, setSrc] = useState(null)
  const [err, setErr] = useState(false)
  useEffect(() => {
    if (!storagePath) return
    supabase.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, 60)
      .then(({ data, error }) => {
        if (!error && data?.signedUrl) setSrc(data.signedUrl)
        else setErr(true)
      })
  }, [storagePath])
  if (err) return <p className="text-xs text-gray-500">Afbeelding niet beschikbaar</p>
  if (!src) return <div className="h-20 bg-gray-100 rounded animate-pulse" />
  return <img src={src} alt="Snapshot" className="max-w-full max-h-40 object-contain rounded border border-gray-200" />
}

export default GroeiCockpit
