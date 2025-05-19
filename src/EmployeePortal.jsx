import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'

function EmployeePortal() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        navigate('/login')
      } else {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <h1 className="text-xl font-semibold">GroeiRichting</h1>
        <button onClick={handleLogout} className="btn btn-primary">Uitloggen</button>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Welkom terug</h2>
          <p className="text-gray-600">Wat wil je vandaag doen?</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Start een gesprek</h3>
              <p className="text-gray-500">Beantwoord vragen om je situatie en gevoel in kaart te brengen.</p>
            </div>
            <button className="btn btn-primary">Start het gesprek</button>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Eerdere gesprekken</h3>
              <p className="text-gray-500">Bekijk samenvattingen van je vorige gesprekken.</p>
            </div>
            <button className="btn btn-secondary">Bekijk samenvattingen</button>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Instellingen</h3>
              <p className="text-gray-500">Beheer je profiel en voorkeuren.</p>
            </div>
            <button className="btn btn-orange">Ga naar instellingen</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EmployeePortal
