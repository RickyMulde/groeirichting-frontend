import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Login from './Login'
import RegisterEmployer from './RegisterEmployer'
import Home from './Home'
import EmployerPortal from './EmployerPortal'
import Dashboard from './dashboard'
import Werknemerbeheren from './Werknemerbeheren'
import Instellingen from './Instellingen'
import RegisterEmployee from './RegisterEmployee'
import PostLoginRedirect from './PostLoginRedirect'
import RegistratieVerplicht from './RegistratieVerplicht'
import EmployeePortal from './EmployeePortal'
import SuperadminPortaal from './Superadminportaal'


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registreer-werkgever" element={<RegisterEmployer />} />
        <Route path="/registreer-werknemer" element={<RegisterEmployee />} />
        <Route path="/werkgever-portaal" element={<EmployerPortal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/werknemerbeheer" element={<Werknemerbeheren />} />
        <Route path="/instellingen" element={<Instellingen />} />
        <Route path="/redirect" element={<PostLoginRedirect />} />
        <Route path="/registratie-verplicht" element={<RegistratieVerplicht />} />
        <Route path="/werknemer-portaal" element={<EmployeePortal />} />
        <Route path="/superadmin-portaal" element={<SuperadminPortaal />} />
      </Routes>
    </Layout>
  )
}

export default App