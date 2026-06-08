'use client'

import { useState, useEffect } from 'react'

let cachedFeatures: any = null

export function useFeatures() {
  const [features, setFeatures] = useState<any>(cachedFeatures || {})
  const [loading, setLoading] = useState(!cachedFeatures)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch('/api/features')
        const data = await res.json()
        cachedFeatures = data
        setFeatures(data)
      } catch (error) {
        console.error('Erreur features:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
    // Rafraîchir toutes les 5 secondes
    const interval = setInterval(fetchFeatures, 5000)
    return () => clearInterval(interval)
  }, [])

  const isEnabled = (key: string) => features[key] === true

  return { features, loading, isEnabled }
}
