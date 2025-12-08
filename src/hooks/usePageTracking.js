import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Mapping van routes naar korte Analytics-titels
 * Dit zorgt voor duidelijke namen in Analytics terwijl SEO-titels behouden blijven
 */
const getAnalyticsPageTitle = (pathname) => {
  const titleMap = {
    '/': 'Home',
    '/contact': 'Contact',
    '/offerte': 'Offerte',
    '/hoe-werkt-het': 'Hoe werkt het',
    '/privacy-veiligheid': 'Privacy & Veiligheid',
    '/privacy': 'Privacy',
    '/privacy-portaal': 'Privacy Portaal',
    '/login': 'Login',
    '/registreer-werkgever': 'Registreer Werkgever',
    '/registreer-werknemer': 'Registreer Werknemer',
    '/verify-email': 'Verifieer Email',
    '/na-verificatie': 'Na Verificatie',
    '/provision-employer': 'Provision Employer',
    '/werkgever-portaal': 'Werkgever Portaal',
    '/werknemer-portaal': 'Werknemer Portaal',
    '/beheer-teams-werknemers': 'Beheer Teams',
    '/thema-dashboard': 'Thema Dashboard',
    '/thema-overzicht': 'Thema Overzicht',
    '/werknemer-instellingen': 'Werknemer Instellingen',
    '/superadmin-portaal': 'Superadmin Portaal',
    '/dashboard': 'Dashboard',
    '/instellingen': 'Instellingen',
    '/gesprek': 'Gesprek',
    '/gesprek-resultaat': 'Gesprek Resultaat',
    '/gesprek-resultaten': 'Gesprek Resultaten',
    '/uitleg-privacy': 'Uitleg Privacy',
    '/redirect': 'Redirect',
    '/registratie-verplicht': 'Registratie Verplicht'
  }
  
  return titleMap[pathname] || document.title || 'GroeiRichting'
}

/**
 * Hook voor automatische Google Tag Manager pageview tracking
 * Trackt automatisch pageviews bij elke routewijziging in de SPA
 * Alleen actief als gebruiker toestemming heeft gegeven voor cookies
 */
export const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // Check of gebruiker toestemming heeft gegeven voor cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    
    // Alleen tracken als gebruiker cookies heeft geaccepteerd
    if (cookieConsent === 'accepted') {
      // Initialiseer dataLayer als deze nog niet bestaat
      window.dataLayer = window.dataLayer || []
      
      // Gebruik requestAnimationFrame om te wachten tot React de titel heeft geüpdatet
      // Dit zorgt ervoor dat we de juiste paginatitel hebben voor Analytics
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Gebruik korte Analytics-titel in plaats van de volledige SEO-titel
          const analyticsTitle = getAnalyticsPageTitle(location.pathname)
          
          // Stuur pageview event naar GTM dataLayer
          window.dataLayer.push({
            event: 'page_view',
            page_path: location.pathname + location.search,
            page_title: analyticsTitle
          })
        })
      })
    }
  }, [location])
}

