import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

const CompletionMessage = ({ completedTheme, onClose, onAutoClose, allCompleted = false }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Auto close na 10 seconden
    const autoCloseTimer = setTimeout(() => {
      onAutoClose()
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(autoCloseTimer)
    }
  }, [onAutoClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wacht op fade out animatie
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    } bottom-4 left-4 right-4 sm:top-4 sm:right-4 sm:bottom-auto sm:left-auto`}>
      <div className="bg-green-500 text-white p-4 rounded-xl shadow-lg max-w-sm mx-auto sm:mx-0">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-100 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              🎉 Gefeliciteerd! Je hebt <strong>{completedTheme?.titel}</strong> afgerond.
            </p>
            <p className="text-xs text-green-100 mt-1">
              {allCompleted 
                ? 'Je hebt alle thema\'s afgerond!'
                : 'Start nu direct met het volgende thema.'
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-green-100 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompletionMessage 