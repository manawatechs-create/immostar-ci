'use client'

import { useState, useEffect, useCallback } from 'react'

let cachedFeatures: Record<string, boolean> = {
  chatbot: true,
  darkMode: true,
  blog: true,
  messaging: true,
  reviews: true,
  pdfExport: true,
  virtualTour: true,
  compareTool: true,
  notifications: true,
  subscriptions: false,
  boosts: false,
  commissions: false,
  showUpgradeBanner: false,
  trialActive: true,
}

export function useSync() {
  const [features, setFeatures] = useState(cachedFeatures)
  const [connected, setConnected] = useState(false)

  const syncNow = useCallback(async () => {
    try {
      const res = await fetch('/api/sync')
      const data = await res.json()
      if (data.features && !data.unchanged) {
        cachedFeatures = data.features
        setFeatures({ ...data.features })
        setConnected(true)
        console.log('✅ Sync OK - Features:', data.features)
      }
    } catch (error) {
      console.log('❌ Sync error:', error)
      setConnected(false)
    }
  }, [])

  useEffect(() => {
    syncNow()
    const interval = setInterval(syncNow, 3000)
    return () => clearInterval(interval)
  }, [syncNow])

  const isEnabled = (feature: string) => {
    return features[feature] === true
  }

  return { features, connected, isEnabled, syncNow }
}
