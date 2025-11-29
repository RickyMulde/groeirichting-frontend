import { useEffect } from 'react'

/**
 * Zoho SalesIQ Chat Widget Component
 * Laadt alleen na cookie consent (AVG-compliant)
 * Beschikbaar op alle pagina's
 */
function ZohoSalesIQ() {
  // Helper functie om SalesIQ scripts te laden
  const loadSalesIQ = () => {
    // Controleer of SalesIQ al is geladen
    if (document.getElementById('zsiqscript')) {
      return // Al geladen, niet opnieuw laden
    }

    // Initialiseer Zoho SalesIQ object
    window.$zoho = window.$zoho || {}
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function() {} }

    // Laad het eerste script (initialisatie)
    const initScript = document.createElement('script')
    initScript.textContent = 'window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}'
    document.head.appendChild(initScript)

    // Laad het tweede script (widget)
    const widgetScript = document.createElement('script')
    widgetScript.id = 'zsiqscript'
    widgetScript.src = 'https://salesiq.zohopublic.eu/widget?wc=siq6a8c571ecbb02f102e897557868cedd3d3a26f931d9fb61cd3a49f035b3abd72'
    widgetScript.defer = true
    document.head.appendChild(widgetScript)
  }

  // Laad SalesIQ bij mount als cookie consent al is geaccepteerd
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    
    // Alleen laden als gebruiker cookies heeft geaccepteerd
    if (cookieConsent === 'accepted') {
      loadSalesIQ()
    }
  }, [])

  // Luister naar cookie consent wijzigingen
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cookieConsent' && e.newValue === 'accepted') {
        loadSalesIQ()
      }
    }

    const handleCookieAccept = () => {
      const cookieConsent = localStorage.getItem('cookieConsent')
      if (cookieConsent === 'accepted') {
        loadSalesIQ()
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

