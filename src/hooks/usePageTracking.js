import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook voor automatische Google Analytics pageview tracking
 * Trackt automatisch pageviews bij elke routewijziging in de SPA
 * Alleen actief als VITE_GA_ID environment variable is ingesteld EN gebruiker heeft toestemming gegeven
 */
export const usePageTracking = () => {
  const location = useLocation()
  const gaId = import.meta.env.VITE_GA_ID

  useEffect(() => {
    // Check of gebruiker toestemming heeft gegeven voor cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    
    // Alleen tracken als:
    // 1. GA_ID is ingesteld
    // 2. gtag beschikbaar is
    // 3. Gebruiker heeft cookies geaccepteerd
    if (gaId && gaId.trim() !== '' && window.gtag && cookieConsent === 'accepted') {
      window.gtag('config', gaId, {
        page_path: location.pathname + location.search
      })
    }
  }, [location, gaId])
}

