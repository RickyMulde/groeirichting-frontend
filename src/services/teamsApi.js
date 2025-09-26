// Teams API service voor alle teams gerelateerde backend communicatie
import { supabase } from '../supabaseClient'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Helper functie om authorization header op te halen
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.access_token) {
    throw new Error('Geen geldige sessie gevonden')
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`
  }
  return headers
}

// Teams ophalen
export const getTeams = async (includeArchived = false) => {
  try {
    const headers = await getAuthHeaders()
    const url = includeArchived 
      ? `${API_BASE_URL}/api/teams?include_archived=true`
      : `${API_BASE_URL}/api/teams`
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}: Fout bij ophalen teams`)
    }

    const data = await response.json()
    return data.teams || []
  } catch (error) {
    console.error('Fout bij ophalen teams:', error)
    throw error
  }
}

// Team aanmaken
export const createTeam = async (naam) => {
  try {
    console.log('🔄 teamsApi.createTeam aangeroepen met naam:', naam)
    const headers = await getAuthHeaders()
    console.log('✅ Auth headers opgehaald:', headers)
    
    const url = `${API_BASE_URL}/api/teams`
    console.log('🔄 API call naar:', url)
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ naam })
    })

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', response.headers)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ API error response:', errorData)
      
      if (response.status === 409) {
        throw new Error('Een team met deze naam bestaat al')
      }
      if (response.status === 422) {
        throw new Error('Maximum aantal teams bereikt (50)')
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}: Fout bij aanmaken team`)
    }

    const data = await response.json()
    console.log('✅ Team data ontvangen:', data)
    return data.team
  } catch (error) {
    console.error('❌ Fout bij aanmaken team:', error)
    throw error
  }
}

// Team hernoemen
export const updateTeam = async (id, naam) => {
  try {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ naam })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      if (response.status === 409) {
        throw new Error('Een team met deze naam bestaat al')
      }
      if (response.status === 404) {
        throw new Error('Team niet gevonden')
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}: Fout bij bijwerken team`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fout bij bijwerken team:', error)
    throw error
  }
}

// Team archiveren (soft delete)
export const archiveTeam = async (id) => {
  try {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
      method: 'DELETE',
      headers
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      if (response.status === 422) {
        throw new Error('Kan team niet archiveren omdat het nog leden heeft')
      }
      if (response.status === 404) {
        throw new Error('Team niet gevonden')
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}: Fout bij archiveren team`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fout bij archiveren team:', error)
    throw error
  }
}

// Team leden ophalen (via bestaande users API met team filter)
export const getTeamMembers = async (teamId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, team_id')
      .eq('team_id', teamId)
      .eq('role', 'employee')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Fout bij ophalen team leden:', error)
    throw error
  }
}
