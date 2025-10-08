import React, { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { useTeams } from '../contexts/TeamsContext'

const QuickTeamModal = ({ isOpen, onClose, onTeamCreated }) => {
  const { createTeam, error, clearError } = useTeams()
  const [teamName, setTeamName] = useState('')
  const [teamDescription, setTeamDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form bij modal open/close
  useEffect(() => {
    if (isOpen) {
      setTeamName('')
      setTeamDescription('')
      setIsSubmitting(false)
      clearError()
    }
  }, [isOpen, clearError])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!teamName.trim()) return

    try {
      setIsSubmitting(true)
      const newTeam = await createTeam(teamName.trim(), teamDescription.trim() || null)
      setTeamName('')
      setTeamDescription('')
      onTeamCreated?.(newTeam)
      onClose()
    } catch (error) {
      // Error wordt al afgehandeld in context
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-blue-600" />
            Nieuw Team
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
                Team naam
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Voer team naam in"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Team naam moet uniek zijn binnen je organisatie
              </p>
            </div>

            <div>
              <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Team omschrijving (optioneel)
              </label>
              <textarea
                id="teamDescription"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Korte omschrijving van het team..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Help je teamleden en AI om het team beter te begrijpen
              </p>
            </div>

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
                disabled={isSubmitting || !teamName.trim()}
                className="btn btn-primary flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Aanmaken...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Aanmaken</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuickTeamModal
