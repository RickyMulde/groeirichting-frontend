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
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
    // Hier kun je Google Analytics initialiseren
    // gtag('consent', 'update', { 'analytics_storage': 'granted' })
  }

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
    // Hier kun je Google Analytics uitschakelen
    // gtag('consent', 'update', { 'analytics_storage': 'denied' })
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Weigeren
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
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
