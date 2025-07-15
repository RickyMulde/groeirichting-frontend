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
import ThemaBeheer from './ThemaBeheer'
import ThemaBeheerOverzicht from './ThemaBeheerOverzicht'
import GebruikersBeheer from './GebruikersBeheer'
import GesprekPagina from './GesprekPagina'
import GesprekResultaat from './GesprekResultaat'
import ThemaOverzicht from './ThemaOverzicht'
import OrganisationDashboard from './OrganisationDashboard'
import EmployerProtectedRoute from './EmployerProtectedRoute'


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
        <Route path="/superadmin/thema/:id" element={<ThemaBeheer />} />
        <Route path="/superadmin/thema-beheer" element={<ThemaBeheerOverzicht />} />
        <Route path="/superadmin/gebruikers-beheer" element={<GebruikersBeheer />} />
        <Route path="/thema-overzicht" element={<ThemaOverzicht />} />
        <Route path="/gesprek" element={<GesprekPagina />} />
        <Route path="/gesprek-resultaat" element={<GesprekResultaat />} />
        <Route path="/organisatie-dashboard" element={
          <EmployerProtectedRoute>
            <OrganisationDashboard />
          </EmployerProtectedRoute>
        } />
      </Routes>
    </Layout>
  )
}

export default App