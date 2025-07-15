import { useEffect, useRef } from 'react'

// Custom hook voor performance monitoring
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0)
  const lastRenderTime = useRef(performance.now())

  useEffect(() => {
    renderCount.current += 1
    const currentTime = performance.now()
    const timeSinceLastRender = currentTime - lastRenderTime.current
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] Render #${renderCount.current} - Time since last render: ${timeSinceLastRender.toFixed(2)}ms`)
    }
    
    lastRenderTime.current = currentTime
  })

  // Return performance metrics
  return {
    renderCount: renderCount.current,
    timeSinceLastRender: performance.now() - lastRenderTime.current
  }
}

// Hook voor het meten van API call performance
export const useApiPerformance = () => {
  const apiCallTimes = useRef({})

  const startApiCall = (callName) => {
    apiCallTimes.current[callName] = performance.now()
  }

  const endApiCall = (callName) => {
    if (apiCallTimes.current[callName]) {
      const duration = performance.now() - apiCallTimes.current[callName]
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] ${callName} took ${duration.toFixed(2)}ms`)
      }
      
      delete apiCallTimes.current[callName]
      return duration
    }
    return 0
  }

  return { startApiCall, endApiCall }
} 