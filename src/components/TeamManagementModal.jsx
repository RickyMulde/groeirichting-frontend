import React, { useState } from 'react'
import { X, Plus, Edit2, Trash2, Users } from 'lucide-react'
import { useTeams } from '../contexts/TeamsContext'

const TeamManagementModal = ({ isOpen, onClose }) => {
  const { 
    teams, 
    loading, 
    error, 
    createTeam, 
    updateTeam, 
    archiveTeam, 
    clearError 
  } = useTeams()
  
  const [editingTeam, setEditingTeam] = useState(null)
  const [teamName, setTeamName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form bij modal open/close
  React.useEffect(() => {
    if (isOpen) {
      setEditingTeam(null)
      setTeamName('')
      setShowCreateForm(false)
      clearError()
    }
  }, [isOpen])

  // Team aanmaken
  const handleCreateTeam = async (e) => {
    e.preventDefault()
    console.log('🔄 Team aanmaken gestart:', teamName.trim())
    
    if (!teamName.trim()) {
      console.log('❌ Geen team naam ingevuld')
      return
    }

    try {
      setIsSubmitting(true)
      console.log('🔄 createTeam functie aangeroepen...')
      const result = await createTeam(teamName.trim())
      console.log('✅ Team succesvol aangemaakt:', result)
      setTeamName('')
      setShowCreateForm(false)
    } catch (error) {
      console.error('❌ Fout bij aanmaken team:', error)
      // Error wordt al afgehandeld in context
    } finally {
      setIsSubmitting(false)
    }
  }

  // Team hernoemen
  const handleUpdateTeam = async (e) => {
    e.preventDefault()
    if (!teamName.trim() || !editingTeam) return

    try {
      setIsSubmitting(true)
      await updateTeam(editingTeam.id, teamName.trim())
      setEditingTeam(null)
      setTeamName('')
    } catch (error) {
      // Error wordt al afgehandeld in context
    } finally {
      setIsSubmitting(false)
    }
  }

  // Team archiveren
  const handleArchiveTeam = async (team) => {
    if (!confirm(`Weet je zeker dat je team "${team.naam}" wilt archiveren?`)) {
      return
    }

    try {
      await archiveTeam(team.id)
    } catch (error) {
      // Error wordt al afgehandeld in context
    }
  }

  // Bewerk modus starten
  const startEditing = (team) => {
    setEditingTeam(team)
    setTeamName(team.naam)
    setShowCreateForm(false)
  }

  // Bewerk modus annuleren
  const cancelEditing = () => {
    setEditingTeam(null)
    setTeamName('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Beheer Teams</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Teams lijst */}
          <div className="space-y-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    {editingTeam?.id === team.id ? (
                      <form onSubmit={handleUpdateTeam} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting || !teamName.trim()}
                          className="btn btn-primary btn-sm"
                        >
                          {isSubmitting ? 'Opslaan...' : 'Opslaan'}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="btn btn-sm"
                        >
                          Annuleren
                        </button>
                      </form>
                    ) : (
                      <div>
                        <h3 className="font-medium text-gray-900">{team.naam}</h3>
                        <p className="text-sm text-gray-500">
                          {team.members_count || 0} {team.members_count === 1 ? 'lid' : 'leden'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {editingTeam?.id !== team.id && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEditing(team)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Team hernoemen"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleArchiveTeam(team)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Team archiveren"
                      disabled={team.members_count > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Lege state */}
            {teams.length === 0 && !loading && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nog geen teams aangemaakt</p>
                <p className="text-sm text-gray-400">Maak je eerste team aan om te beginnen</p>
              </div>
            )}
          </div>

          {/* Nieuwe team form */}
          {showCreateForm && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-3">Nieuw Team Aanmaken</h3>
              <form onSubmit={handleCreateTeam} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team naam"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !teamName.trim()}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Aanmaken...' : 'Aanmaken'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setTeamName('')
                  }}
                  className="btn"
                >
                  Annuleren
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            {teams.length} {teams.length === 1 ? 'team' : 'teams'}
          </div>
          <div className="flex space-x-3">
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-accent flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nieuw Team</span>
              </button>
            )}
            <button onClick={onClose} className="btn">
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamManagementModal
