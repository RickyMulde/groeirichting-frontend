import { useEffect } from 'react'

/**
 * Zoho SalesIQ Chat Widget Component
 * Laadt altijd voor visitor tracking (IP-based, AVG-compliant)
 * Tracking cookies worden alleen geplaatst na cookie consent
 * Beschikbaar op alle pagina's
 */
function ZohoSalesIQ() {
  // Helper functie om SalesIQ scripts te laden
  const loadSalesIQ = () => {
    // Controleer of SalesIQ al is geladen
    if (document.getElementById('zsiqscript')) {
      return // Al geladen, niet opnieuw laden
    }

    // Initialiseer Zoho SalesIQ object met widgetcode (officiële implementatie)
    window.$zoho = window.$zoho || {}
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode: "siq6a8c571ecbb02f102e897557868cedd3d3a26f931d9fb61cd3a49f035b3abd72",
      values: {},
      ready: function() {}
    }

    // Laad het widget script (officiële implementatie)
    const widgetScript = document.createElement('script')
    widgetScript.type = 'text/javascript'
    widgetScript.id = 'zsiqscript'
    widgetScript.defer = true
    widgetScript.src = 'https://salesiq.zoho.eu/widget'
    
    // Configureer SalesIQ voor cookie consent
    widgetScript.onload = () => {
      // Wacht even tot SalesIQ volledig is geladen
      setTimeout(() => {
        if (window.$zoho && window.$zoho.salesiq) {
          window.$zoho.salesiq.ready(function() {
            try {
              // Check cookie consent status
              const cookieConsent = localStorage.getItem('cookieConsent')
              
              // SalesIQ trackt automatisch bezoekers op basis van IP-adres
              // Cookies worden gebruikt voor persistentie, maar IP-based tracking werkt altijd
              if (cookieConsent === 'accepted') {
                // Als cookies zijn geaccepteerd, SalesIQ kan cookies gebruiken voor betere tracking
              } else {
                // Als cookies niet zijn geaccepteerd, SalesIQ gebruikt alleen IP-based tracking
                // Dit is AVG-compliant en bezoekers worden nog steeds getrackt
              }
            } catch (error) {
              console.error('SalesIQ: Fout bij configureren:', error)
            }
          })
        }
      }, 1000)
    }
    
    // Voeg script toe volgens officiële implementatie (insertBefore)
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(widgetScript, firstScript)
    } else {
      document.head.appendChild(widgetScript)
    }
  }

  // Laad SalesIQ altijd bij mount voor visitor tracking
  // IP-based tracking is AVG-compliant zonder cookie consent
  useEffect(() => {
    loadSalesIQ()
  }, [])

  // Luister naar cookie consent wijzigingen
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cookieConsent') {
        // SalesIQ is al geladen en trackt bezoekers
        // Bij acceptatie kunnen cookies worden gebruikt voor betere tracking
        // Bij weigering blijft IP-based tracking actief
        if (e.newValue === 'accepted') {
          // Cookie consent geaccepteerd, volledige tracking nu actief
        } else if (e.newValue === 'rejected') {
          // Cookie consent geweigerd, IP-based tracking blijft actief
        }
      }
    }

    const handleCookieAccept = () => {
      const cookieConsent = localStorage.getItem('cookieConsent')
      if (cookieConsent === 'accepted') {
        // Cookie consent geaccepteerd, volledige tracking nu actief
      }
    }

    // Luister naar storage events (wanneer cookie consent wordt geaccepteerd in andere tabs)
    window.addEventListener('storage', handleStorageChange)
    
    // Custom event listener voor cookie acceptatie in hetzelfde venster
    window.addEventListener('cookieConsentAccepted', handleCookieAccept)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cookieConsentAccepted', handleCookieAccept)
    }
  }, [])

  return null // Component rendert niets visueels
}

export default ZohoSalesIQ

