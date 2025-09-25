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
      console.log('🔄 TeamsContext: fetchTeams aangeroepen, includeArchived:', includeArchived)
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const teams = await teamsApi.getTeams(includeArchived)
      console.log('✅ TeamsContext: Teams opgehaald:', teams)
      dispatch({ type: 'SET_TEAMS', payload: teams })
    } catch (error) {
      console.error('❌ TeamsContext: Error in fetchTeams:', error)
      // Alleen error tonen als het niet een sessie probleem is
      if (!error.message.includes('sessie')) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      } else {
        // Bij sessie probleem, teams leegmaken
        dispatch({ type: 'SET_TEAMS', payload: [] })
      }
    }
  }, [])

  // User ophalen bij mount en luister naar auth state changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔄 TeamsContext: initializeAuth aangeroepen')
        const { data: { session }, error } = await supabase.auth.getSession()
        console.log('📡 TeamsContext: Session data:', session ? 'Aanwezig' : 'Niet aanwezig')
        
        if (error) {
          console.error('❌ TeamsContext: Session error:', error)
        }
        
        if (session?.user) {
          console.log('📡 TeamsContext: User uit session:', session.user)
          
          // Haal user data op uit database (inclusief role) - alleen voor teams
          const { data: userDataArray, error: userError } = await supabase
            .from('users')
            .select('id, email, role, employer_id')
            .eq('id', session.user.id)
            .limit(1)
          
          console.log('📡 TeamsContext: User data query result:', { userDataArray, userError })
          
          const userData = userDataArray?.[0] || null
          console.log('📡 TeamsContext: User data:', userData)
          
          if (userError) {
            console.error('Error fetching user data:', userError)
          }
          setUser(userData)
        } else {
          console.log('📡 TeamsContext: Geen session of user gevonden')
          setUser(null)
        }
      } catch (error) {
        console.error('❌ TeamsContext: Error in initializeAuth:', error)
        setUser(null)
      }
    }

    initializeAuth()

    // Luister naar auth state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 TeamsContext: Auth state change:', event, session ? 'Session aanwezig' : 'Geen session')
      
      if (session?.user) {
        console.log('📡 TeamsContext: User uit auth state change:', session.user)
        
        // Haal user data op uit database
        const { data: userDataArray, error: userError } = await supabase
          .from('users')
          .select('id, email, role, employer_id')
          .eq('id', session.user.id)
          .limit(1)
        
        const userData = userDataArray?.[0] || null
        console.log('📡 TeamsContext: User data from auth change:', userData)
        setUser(userData)
      } else {
        console.log('📡 TeamsContext: No session in auth state change, setting user to null')
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Teams ophalen bij mount en bij user wijziging
  useEffect(() => {
    console.log('🔄 TeamsContext: useEffect [user] triggered, user:', user)
    if (user && user.role === 'employer') {
      console.log('✅ TeamsContext: User is employer, calling fetchTeams')
      fetchTeams()
    } else {
      console.log('❌ TeamsContext: User is not employer or no user, resetting teams')
      // Reset teams als user geen employer is of geen user
      dispatch({ type: 'SET_TEAMS', payload: [] })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [user]) // Verwijder fetchTeams uit dependencies om hoisting probleem te voorkomen

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
    user: user,
    
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
