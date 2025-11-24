import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook voor automatische Google Analytics pageview tracking
 * Trackt automatisch pageviews bij elke routewijziging in de SPA
 * Alleen actief als VITE_GA_ID environment variable is ingesteld
 */
export const usePageTracking = () => {
  const location = useLocation()
  const gaId = import.meta.env.VITE_GA_ID

  useEffect(() => {
    // Alleen tracken als GA_ID is ingesteld en gtag beschikbaar is
    if (gaId && gaId.trim() !== '' && window.gtag) {
      window.gtag('config', gaId, {
        page_path: location.pathname + location.search
      })
    }
  }, [location, gaId])
}

