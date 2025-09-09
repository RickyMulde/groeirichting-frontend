import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import * as teamsApi from '../services/teamsApi'

// Teams context state
const initialState = {
  teams: [],
  selectedTeam: null,
  loading: false,
  error: null,
  members: [] // Leden van geselecteerde team
}

// Teams context actions
const teamsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_TEAMS':
      return { 
        ...state, 
        teams: action.payload, 
        loading: false, 
        error: null 
      }
    
    case 'ADD_TEAM':
      return { 
        ...state, 
        teams: [...state.teams, action.payload],
        loading: false,
        error: null
      }
    
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.map(team => 
          team.id === action.payload.id ? action.payload : team
        ),
        loading: false,
        error: null
      }
    
    case 'ARCHIVE_TEAM':
      return {
        ...state,
        teams: state.teams.filter(team => team.id !== action.payload),
        selectedTeam: state.selectedTeam === action.payload ? null : state.selectedTeam,
        members: state.selectedTeam === action.payload ? [] : state.members,
        loading: false,
        error: null
      }
    
    case 'SELECT_TEAM':
      return {
        ...state,
        selectedTeam: action.payload,
        members: [] // Reset members, wordt opgehaald in useEffect
      }
    
    case 'SET_MEMBERS':
      return {
        ...state,
        members: action.payload
      }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    default:
      return state
  }
}

// Teams context
const TeamsContext = createContext()

// Teams provider component
export const TeamsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamsReducer, initialState)
  const [user, setUser] = React.useState(null)

  // Teams ophalen
  const fetchTeams = useCallback(async (includeArchived = false) => {
    try {
      console.log('🔄 Teams ophalen...')
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const teams = await teamsApi.getTeams(includeArchived)
      console.log('✅ Teams opgehaald:', teams)
      dispatch({ type: 'SET_TEAMS', payload: teams })
    } catch (error) {
      console.error('❌ Fout bij ophalen teams:', error)
      // Alleen error tonen als het niet een sessie probleem is
      if (!error.message.includes('sessie')) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      } else {
        // Bij sessie probleem, teams leegmaken
        dispatch({ type: 'SET_TEAMS', payload: [] })
      }
    }
  }, [])

  // User ophalen bij mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Luister naar auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Teams ophalen bij mount en bij user wijziging
  useEffect(() => {
    if (user && user.role === 'employer') {
      fetchTeams()
    } else if (!user) {
      // Reset teams als user uitlogt
      dispatch({ type: 'SET_TEAMS', payload: [] })
    }
  }, [user, fetchTeams])

  // Team leden ophalen wanneer team wordt geselecteerd
  useEffect(() => {
    if (state.selectedTeam) {
      fetchTeamMembers(state.selectedTeam)
    } else {
      dispatch({ type: 'SET_MEMBERS', payload: [] })
    }
  }, [state.selectedTeam])

  // Team leden ophalen
  const fetchTeamMembers = async (teamId) => {
    try {
      const members = await teamsApi.getTeamMembers(teamId)
      dispatch({ type: 'SET_MEMBERS', payload: members })
    } catch (error) {
      console.error('Fout bij ophalen team leden:', error)
      dispatch({ type: 'SET_MEMBERS', payload: [] })
    }
  }

  // Team selecteren
  const selectTeam = (teamId) => {
    dispatch({ type: 'SELECT_TEAM', payload: teamId })
  }

  // Team aanmaken
  const createTeam = async (naam) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const newTeam = await teamsApi.createTeam(naam)
      dispatch({ type: 'ADD_TEAM', payload: newTeam })
      return newTeam
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  // Team hernoemen
  const updateTeam = async (id, naam) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const updatedTeam = await teamsApi.updateTeam(id, naam)
      dispatch({ type: 'UPDATE_TEAM', payload: updatedTeam })
      return updatedTeam
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  // Team archiveren
  const archiveTeam = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      await teamsApi.archiveTeam(id)
      dispatch({ type: 'ARCHIVE_TEAM', payload: id })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  // Teams verversen
  const refreshTeams = () => {
    fetchTeams()
  }

  // Error wissen
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // Context value
  const value = {
    // State
    teams: state.teams,
    selectedTeam: state.selectedTeam,
    loading: state.loading,
    error: state.error,
    members: state.members,
    
    // Actions
    fetchTeams,
    selectTeam,
    createTeam,
    updateTeam,
    archiveTeam,
    refreshTeams,
    clearError
  }

  return (
    <TeamsContext.Provider value={value}>
      {children}
    </TeamsContext.Provider>
  )
}

// Hook om teams context te gebruiken
export const useTeams = () => {
  const context = useContext(TeamsContext)
  if (!context) {
    throw new Error('useTeams moet gebruikt worden binnen een TeamsProvider')
  }
  return context
}
