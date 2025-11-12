import React, { useState, useEffect } from 'react'
import { X, Mail, Plus, Users } from 'lucide-react'
import { useTeams } from '../contexts/TeamsContext'
import { supabase } from '../supabaseClient'
import QuickTeamModal from './QuickTeamModal'

const InviteModal = ({ isOpen, onClose, onInviteSent }) => {
  const { teams, selectedTeam, selectTeam } = useTeams()
  const [email, setEmail] = useState('')
  const [teamId, setTeamId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showQuickTeamModal, setShowQuickTeamModal] = useState(false)

  // Reset form bij modal open/close
  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setTeamId(selectedTeam || '')
      setError('')
      setIsSubmitting(false)
    }
  }, [isOpen, selectedTeam])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('E-mail adres is verplicht')
      return
    }
    
    if (!teamId) {
      setError('Team selectie is verplicht')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          email: email.trim(),
          team_id: teamId
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fout bij versturen uitnodiging')
      }

      // Success
      setEmail('')
      setTeamId('')
      onInviteSent?.(result)
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle team creation
  const handleTeamCreated = (newTeam) => {
    setTeamId(newTeam.id)
    setShowQuickTeamModal(false)
  }

  // Get selected team name
  const selectedTeamName = teams.find(team => team.id === teamId)?.naam || ''

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              Medewerker Uitnodigen
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* E-mail input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail adres
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="medewerker@bedrijf.nl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Team selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team
                </label>
                <div className="space-y-2">
                  {/* Team dropdown */}
                  <select
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Selecteer een team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.naam} ({team.members_count || 0} leden)
                      </option>
                    ))}
                  </select>

                  {/* Quick team creation button */}
                  <button
                    type="button"
                    onClick={() => setShowQuickTeamModal(true)}
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nieuw team aanmaken</span>
                  </button>
                </div>
              </div>

              {/* Confirmation message */}
              {teamId && email && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Bevestiging:</strong> Medewerker <strong>{email}</strong> wordt uitgenodigd en toegevoegd aan team <strong>"{selectedTeamName}"</strong>.
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn"
                  disabled={isSubmitting}
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim() || !teamId}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Versturen...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Uitnodigen</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Team Modal */}
      <QuickTeamModal
        isOpen={showQuickTeamModal}
        onClose={() => setShowQuickTeamModal(false)}
        onTeamCreated={handleTeamCreated}
      />
    </>
  )
}

export default InviteModal
