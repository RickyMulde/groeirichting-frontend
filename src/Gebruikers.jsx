import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Navigatiebalk from './Navigatiebalk'

function Gebruikers() {
  const [werknemers, setWerknemers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWerknemers = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('users')
        .select('id, email, first_name, middle_name, last_name')
        .eq('employer_id', user.id)
        .eq('role', 'medewerker')

      if (!error) {
        setWerknemers(data)
      }

      setLoading(false)
    }

    fetchWerknemers()
  }, [])

  return (
    <>
      <Navigatiebalk />
      <div className="page-container">
        <h2>Werknemers beheren</h2>
        {loading ? (
          <p>Laden...</p>
        ) : werknemers.length === 0 ? (
          <p>Er zijn nog geen werknemers gekoppeld.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ccc' }}>Naam</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ccc' }}>E-mailadres</th>
              </tr>
            </thead>
            <tbody>
              {werknemers.map((w) => (
                <tr key={w.id}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {[w.first_name, w.middle_name, w.last_name].filter(Boolean).join(' ')}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{w.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Gebruikers
