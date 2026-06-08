'use client'

import { useState, useEffect } from 'react'

// Cache global pour éviter trop d'appels API
let cachedFeatures: any = null
let lastFetch = 0

export function useFeature(featureKey: string): boolean {
  const [enabled, setEnabled] = useState(true) // Par défaut activé

  useEffect(() => {
    const checkFeature = async () => {
      try {
        // Utiliser le cache si moins de 5 secondes
        const now = Date.now()
        if (cachedFeatures && (now - lastFetch) < 5000) {
          setEnabled(cachedFeatures[featureKey] === true)
          return
        }

        const res = await fetch('/api/features')
        const data = await res.json()
        cachedFeatures = data
        lastFetch = now
        setEnabled(data[featureKey] === true)
      } catch (error) {
        // Si l'API ne répond pas, garder l'état actuel
        console.log('Feature check failed for:', featureKey)
      }
    }

    checkFeature()
    const interval = setInterval(checkFeature, 10000)
    return () => clearInterval(interval)
  }, [featureKey])

  return enabled
}
