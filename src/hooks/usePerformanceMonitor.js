import { useEffect, useRef } from 'react'

// Custom hook voor performance monitoring
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0)
  const lastRenderTime = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now())

  useEffect(() => {
    renderCount.current += 1
    const currentTime = typeof performance !== 'undefined' ? performance.now() : Date.now()
    const timeSinceLastRender = currentTime - lastRenderTime.current
    
    // Log performance metrics in development
    if (import.meta.env.DEV) {
      console.log(`[${componentName}] Render #${renderCount.current} - Time since last render: ${timeSinceLastRender.toFixed(2)}ms`)
    }
    
    lastRenderTime.current = currentTime
  })

  // Return performance metrics
  return {
    renderCount: renderCount.current,
    timeSinceLastRender: typeof performance !== 'undefined' ? performance.now() - lastRenderTime.current : 0
  }
}

// Hook voor het meten van API call performance
export const useApiPerformance = () => {
  const apiCallTimes = useRef({})

  const startApiCall = (callName) => {
    apiCallTimes.current[callName] = typeof performance !== 'undefined' ? performance.now() : Date.now()
  }

  const endApiCall = (callName) => {
    if (apiCallTimes.current[callName]) {
      const duration = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - apiCallTimes.current[callName]
      
      if (import.meta.env.DEV) {
        console.log(`[API] ${callName} took ${duration.toFixed(2)}ms`)
      }
      
      delete apiCallTimes.current[callName]
      return duration
    }
    return 0
  }

  return { startApiCall, endApiCall }
} 