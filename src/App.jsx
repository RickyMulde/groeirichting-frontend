import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { TeamsProvider } from './contexts/TeamsContext'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import RegisterEmployer from './RegisterEmployer'
import Home from './Home'
import HoeWerktHet from './HoeWerktHet'
import PrivacyVeiligheid from './PrivacyVeiligheid'
import Privacy from './Privacy'
import PrivacyPortaal from './PrivacyPortaal'
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
import WerknemerInstellingen from './WerknemerInstellingen'
import UitlegPrivacy from './uitleg-privacy'
import Offerte from './Offerte'
import Contact from './Contact'
import NaVerificatie from './NaVerificatie'
import ProvisionEmployer from './ProvisionEmployer'
import EmailBeheer from './EmailBeheer'
import { usePageTracking } from './hooks/usePageTracking'


function App() {
  // Automatische pageview tracking voor Google Analytics
  usePageTracking()

  return (
    <Layout>
      <Routes>
        {/* Publieke routes - geen authenticatie nodig */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offerte" element={<Offerte />} />
        <Route path="/hoe-werkt-het" element={<HoeWerktHet />} />
        <Route path="/privacy-veiligheid" element={<PrivacyVeiligheid />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy-portaal" element={<PrivacyPortaal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registreer-werkgever" element={<RegisterEmployer />} />
        <Route path="/registreer-werknemer" element={<RegisterEmployee />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/na-verificatie" element={<NaVerificatie />} />
        <Route path="/provision-employer" element={<ProvisionEmployer />} />
        
        {/* Werkgever routes - alleen voor employers */}
        <Route path="/werkgever-portaal" element={
          <ProtectedRoute requiredRole="employer">
            <TeamsProvider>
              <EmployerPortal />
            </TeamsProvider>
          </ProtectedRoute>
        } />
        <Route path="/beheer-teams-werknemers" element={
          <ProtectedRoute requiredRole="employer">
            <TeamsProvider>
              <BeheerTeamsWerknemers />
            </TeamsProvider>
          </ProtectedRoute>
        } />
        <Route path="/thema-dashboard" element={
          <ProtectedRoute requiredRole="employer">
            <TeamsProvider>
              <Themadashboard />
            </TeamsProvider>
          </ProtectedRoute>
        } />
        
        {/* Werknemer routes - alleen voor employees */}
        <Route path="/werknemer-portaal" element={
          <ProtectedRoute requiredRole="employee">
            <EmployeePortal />
          </ProtectedRoute>
        } />
        <Route path="/werknemer-instellingen" element={
          <ProtectedRoute requiredRole="employee">
            <WerknemerInstellingen />
          </ProtectedRoute>
        } />
        
        {/* Superadmin routes - alleen voor superadmins */}
        <Route path="/superadmin-portaal" element={
          <ProtectedRoute requiredRole="superuser">
            <SuperadminPortaal />
          </ProtectedRoute>
        } />
        <Route path="/superadmin/thema/:id" element={
          <ProtectedRoute requiredRole="superuser">
            <ThemaBeheer />
          </ProtectedRoute>
        } />
        <Route path="/superadmin/thema-beheer" element={
          <ProtectedRoute requiredRole="superuser">
            <ThemaBeheerOverzicht />
          </ProtectedRoute>
        } />
        <Route path="/superadmin/gebruikers-beheer" element={
          <ProtectedRoute requiredRole="superuser">
            <GebruikersBeheer />
          </ProtectedRoute>
        } />
        <Route path="/superadmin/email-beheer" element={
          <ProtectedRoute requiredRole="superuser">
            <EmailBeheer />
          </ProtectedRoute>
        } />
        
        {/* Gemengde routes - alle ingelogde gebruikers */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/instellingen" element={
          <ProtectedRoute>
            <Instellingen />
          </ProtectedRoute>
        } />
        <Route path="/redirect" element={
          <ProtectedRoute>
            <PostLoginRedirect />
          </ProtectedRoute>
        } />
        <Route path="/registratie-verplicht" element={
          <ProtectedRoute>
            <RegistratieVerplicht />
          </ProtectedRoute>
        } />
        <Route path="/uitleg-privacy" element={
          <ProtectedRoute>
            <UitlegPrivacy />
          </ProtectedRoute>
        } />
        <Route path="/thema-overzicht" element={
          <ProtectedRoute>
            <ThemaOverzicht />
          </ProtectedRoute>
        } />
        <Route path="/gesprek" element={
          <ProtectedRoute>
            <GesprekPagina />
          </ProtectedRoute>
        } />
        <Route path="/gesprek-resultaat" element={
          <ProtectedRoute>
            <GesprekResultaat />
          </ProtectedRoute>
        } />
        <Route path="/gesprek-resultaten" element={
          <ProtectedRoute>
            <GesprekResultaten />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  )
}

export default App