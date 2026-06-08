'use client'

import { useState, useEffect, useCallback } from 'react'

export function useLiveListings(filters: any = {}) {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchListings = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (filters.city) params.append('city', filters.city)
      if (filters.type) params.append('type', filters.type)
      
      const res = await fetch(`/api/listings?${params.toString()}`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setListings(data)
      }
    } catch (error) {
      console.error('Erreur chargement:', error)
    } finally {
      setLoading(false)
    }
  }, [filters.city, filters.type])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const refresh = () => fetchListings()

  return { listings, loading, refresh }
}
