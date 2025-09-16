import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { TeamsProvider } from './contexts/TeamsContext'
import Login from './Login'
import RegisterEmployer from './RegisterEmployer'
import Home from './Home'
import HoeWerktHet from './HoeWerktHet'
import PrivacyVeiligheid from './PrivacyVeiligheid'
import EmployerPortal from './EmployerPortal'
import Dashboard from './dashboard'
import BeheerTeamsWerknemers from './BeheerTeamsWerknemers'
import Instellingen from './Instellingen'
import RegisterEmployee from './RegisterEmployee'
import VerifyEmail from './VerifyEmail'
import PostLoginRedirect from './PostLoginRedirect'
import RegistratieVerplicht from './RegistratieVerplicht'
import EmployeePortal from './EmployeePortal'
import SuperadminPortaal from './Superadminportaal'
import ThemaBeheer from './ThemaBeheer'
import ThemaBeheerOverzicht from './ThemaBeheerOverzicht'
import GebruikersBeheer from './GebruikersBeheer'
import GesprekPagina from './GesprekPagina'
import GesprekResultaat from './GesprekResultaat'
import GesprekResultaten from './GesprekResultaten'
import ThemaOverzicht from './ThemaOverzicht'
import Themadashboard from './Themadashboard'
import EmployerProtectedRoute from './EmployerProtectedRoute'
import WerknemerInstellingen from './WerknemerInstellingen'
import UitlegPrivacy from './uitleg-privacy'
import Offerte from './Offerte'
import Contact from './Contact'
import NaVerificatie from './NaVerificatie'
import ProvisionEmployer from './ProvisionEmployer'
import EmailBeheer from './EmailBeheer'


function App() {
  return (
    <TeamsProvider>
      <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offerte" element={<Offerte />} />
        <Route path="/hoe-werkt-het" element={<HoeWerktHet />} />
        <Route path="/privacy-veiligheid" element={<PrivacyVeiligheid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registreer-werkgever" element={<RegisterEmployer />} />
        <Route path="/registreer-werknemer" element={<RegisterEmployee />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/na-verificatie" element={<NaVerificatie />} />
        <Route path="/provision-employer" element={<ProvisionEmployer />} />
        <Route path="/werkgever-portaal" element={<EmployerPortal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/beheer-teams-werknemers" element={<BeheerTeamsWerknemers />} />
        <Route path="/instellingen" element={<Instellingen />} />
        <Route path="/redirect" element={<PostLoginRedirect />} />
        <Route path="/registratie-verplicht" element={<RegistratieVerplicht />} />
        <Route path="/werknemer-portaal" element={<EmployeePortal />} />
        <Route path="/werknemer-instellingen" element={<WerknemerInstellingen />} />
        <Route path="/uitleg-privacy" element={<UitlegPrivacy />} />
        <Route path="/superadmin-portaal" element={<SuperadminPortaal />} />
        <Route path="/superadmin/thema/:id" element={<ThemaBeheer />} />
        <Route path="/superadmin/thema-beheer" element={<ThemaBeheerOverzicht />} />
        <Route path="/superadmin/gebruikers-beheer" element={<GebruikersBeheer />} />
        <Route path="/superadmin/email-beheer" element={<EmailBeheer />} />
        <Route path="/thema-overzicht" element={<ThemaOverzicht />} />
        <Route path="/gesprek" element={<GesprekPagina />} />
        <Route path="/gesprek-resultaat" element={<GesprekResultaat />} />
        <Route path="/gesprek-resultaten" element={<GesprekResultaten />} />
        <Route path="/thema-dashboard" element={
          <EmployerProtectedRoute>
            <Themadashboard />
          </EmployerProtectedRoute>
        } />
      </Routes>
      </Layout>
    </TeamsProvider>
  )
}

export default App