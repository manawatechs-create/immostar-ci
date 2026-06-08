'use client'

import { useState, useEffect, useCallback } from 'react'

export function useLiveData(type: string = 'all', interval: number = 5000) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/data?type=${type}`)
      const json = await response.json()
      
      // Vérifier si les données ont changé
      if (json.lastUpdate !== lastUpdate) {
        setData(json)
        setLastUpdate(json.lastUpdate || '')
      }
    } catch (err) {
      setError('Erreur de synchronisation')
    } finally {
      setLoading(false)
    }
  }, [type, lastUpdate])

  useEffect(() => {
    fetchData()
    const timer = setInterval(fetchData, interval)
    return () => clearInterval(timer)
  }, [fetchData, interval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  return { data, loading, error, lastUpdate, refresh }
}
