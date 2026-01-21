import React, { useState, useEffect } from 'react'
import { X, Mail, User, CheckCircle } from 'lucide-react'

const BrochureDownloadModal = ({ isOpen, onClose, title, description }) => {
  const [naam, setNaam] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const modalTitle = title || 'Download informatiebrochure'
  const modalDescription = description || 'Vul je gegevens in en we sturen de brochure direct naar je email.'
  const buttonText = title?.includes('voorbeeld') || title?.includes('Voorbeeld') 
    ? 'Download voorbeeld-rapport' 
    : 'Download brochure'

  // Reset form bij modal open/close
  useEffect(() => {
    if (isOpen) {
      setNaam('')
      setEmail('')
      setError('')
      setSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen])

  // ESC key sluit modal
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validatie
    if (!naam.trim()) {
      setError('Naam is verplicht')
      return
    }
    
    if (!email.trim()) {
      setError('E-mailadres is verplicht')
      return
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Ongeldig e-mailadres')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/brochure-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          naam: naam.trim(),
          email: email.trim()
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fout bij verzenden brochure')
      }

      // Success
      setSuccess(true)
      
      // Track event via Google Tag Manager
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const cookieConsent = localStorage.getItem('cookieConsent')
        if (cookieConsent === 'accepted' && window.dataLayer) {
          window.dataLayer.push({
            event: 'brochure_requested',
            event_category: 'Lead Generation',
            event_label: 'Brochure Download',
            value: 1
          })
        }
      }

      // Auto close na 3 seconden
      setTimeout(() => {
        onClose()
      }, 3000)

    } catch (error) {
      setError(error.message || 'Er is iets misgegaan. Probeer het later opnieuw.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={(e) => {
        // Sluit modal bij klik op backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 md:p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Sluiten"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        {success ? (
          // Success state
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto mb-3 md:mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--kleur-primary)] mb-2">
              Brochure verzonden!
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              We hebben de brochure naar <strong>{email}</strong> gestuurd.
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Check je inbox (en spam folder) voor de email met de bijlage.
            </p>
          </div>
        ) : (
          // Form state
          <>
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--kleur-primary)] mb-3 md:mb-4">
              {modalTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              {modalDescription}
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Naam input */}
              <div>
                <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Naam *
                </label>
                <input
                  type="text"
                  id="naam"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                  placeholder="Jouw naam"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-mailadres *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Bezig met verzenden...' : buttonText}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default BrochureDownloadModal

