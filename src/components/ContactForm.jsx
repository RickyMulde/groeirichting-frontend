import { useState } from 'react'
import { Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'

function ContactForm() {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    vraag: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ naam: '', email: '', telefoon: '', vraag: '' })
      } else {
        setError(result.error || 'Er is iets misgegaan. Probeer het later opnieuw.')
      }
    } catch (error) {
      console.error('Fout bij verzenden contactformulier:', error)
      setError('Er is iets misgegaan. Controleer je internetverbinding en probeer het opnieuw.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Bericht verzonden!</h3>
          <p className="text-green-700">
            We nemen zo snel mogelijk contact met je op.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
          >
            Nieuw bericht versturen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Naam */}
          <div>
            <label htmlFor="naam" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
              Naam *
            </label>
            <input
              type="text"
              id="naam"
              name="naam"
              value={formData.naam}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
              placeholder="Jouw naam"
            />
          </div>

          {/* E-mailadres */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              E-mailadres *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
              placeholder="jouw@email.nl"
            />
          </div>
        </div>

        {/* Telefoonnummer */}
        <div>
          <label htmlFor="telefoon" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Telefoonnummer
          </label>
          <input
            type="tel"
            id="telefoon"
            name="telefoon"
            value={formData.telefoon}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200"
            placeholder="06-12345678"
          />
        </div>

        {/* Vraag */}
        <div>
          <label htmlFor="vraag" className="block text-sm font-medium text-[var(--kleur-text)] mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Je vraag *
          </label>
          <textarea
            id="vraag"
            name="vraag"
            value={formData.vraag}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--kleur-primary)] focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Stel je vraag hier..."
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Bezig met versturen...' : 'Verstuur bericht'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
