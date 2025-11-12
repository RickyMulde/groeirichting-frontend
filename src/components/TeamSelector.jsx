import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Users, Filter } from 'lucide-react'
import { useTeams } from '../contexts/TeamsContext'

const TeamSelector = ({ onTeamSelect, selectedTeamId, className = '' }) => {
  const { teams, selectedTeam, selectTeam } = useTeams()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle team selection
  const handleTeamSelect = (teamId) => {
    selectTeam(teamId)
    onTeamSelect?.(teamId)
    setIsOpen(false)
  }

  // Get selected team info
  const selectedTeamInfo = selectedTeamId 
    ? teams.find(team => team.id === selectedTeamId)
    : null

  // Get display text
  const getDisplayText = () => {
    if (selectedTeamInfo) {
      return selectedTeamInfo.naam
    }
    return 'Totaal'
  }

  // Get badge text
  const getBadgeText = () => {
    if (selectedTeamInfo) {
      return `Team: ${selectedTeamInfo.naam}`
    }
    return 'Alle teams'
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">
            {getDisplayText()}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {/* Totaal optie */}
            <button
              onClick={() => handleTeamSelect(null)}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                !selectedTeamId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <Filter className="w-4 h-4 mr-3 text-gray-400" />
              <span>Totaal</span>
              <span className="ml-auto text-xs text-gray-500">
                Alle medewerkers
              </span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1" />

            {/* Teams */}
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleTeamSelect(team.id)}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedTeamId === team.id ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <Users className="w-4 h-4 mr-3 text-gray-600" />
                <span className="flex-1 text-gray-900">{team.naam}</span>
                <span className="text-xs text-gray-600">
                  {team.aantal_leden || 0} {team.aantal_leden === 1 ? 'lid' : 'leden'}
                </span>
              </button>
            ))}

            {/* Lege state */}
            {teams.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                Geen teams beschikbaar
              </div>
            )}
          </div>
        </div>
      )}

      {/* Badge (optional - to show current selection) */}
      {selectedTeamId && (
        <div className="mt-2 flex items-center space-x-2">
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Filter className="w-3 h-3 mr-1" />
            {getBadgeText()}
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamSelector
