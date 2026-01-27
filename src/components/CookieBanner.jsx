import { useState, useEffect } from 'react'

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Controleer of gebruiker al een keuze heeft gemaakt
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
    
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
    // Update Google Tag Manager consent via dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: 'granted'
      })
    }
    // Trigger custom event voor Zoho SalesIQ
    window.dispatchEvent(new Event('cookieConsentAccepted'))
  }

  const rejectCookies = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
    
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
    // Update Google Tag Manager consent via dataLayer - weigeren
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_update',
        analytics_storage: 'denied'
      })
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Cookies en privacy
            </h3>
            <p className="text-sm text-gray-600">
              Wij gebruiken cookies om onze website te verbeteren en te analyseren. 
              Door op "Accepteren" te klikken, stemt u in met het gebruik van alle cookies. 
              <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                Lees meer in onze privacyverklaring
              </a>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm border border-gray-300 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Weigeren
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-[var(--kleur-secondary)] text-white rounded hover:brightness-110 transition-colors"
            >
              Accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
