'use client'

import { useState, useEffect, useCallback } from 'react'

// Données de secours
const fallbackData = [
  { id: 101, title: "Villa Moderne Cocody - Piscine & Jardin", price: 85000000, city: "Abidjan", district: "Cocody", category: "villa", type: "sale", phone: "+225 07 08 43 21 72", description: "Magnifique villa moderne avec piscine et jardin.", bedrooms: 5, bathrooms: 3, area_sqm: 350, isFurnished: false, isFeatured: true, rating: 4.8, views: 1234, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"], features: ["Piscine", "Garage", "Jardin"], status: "active" },
  { id: 102, title: "Appartement Luxueux Plateau", price: 450000, city: "Abidjan", district: "Plateau", category: "apartment", type: "rent", phone: "+225 07 08 43 21 72", description: "Bel appartement rénové au Plateau.", bedrooms: 3, bathrooms: 2, area_sqm: 120, isFurnished: true, isFeatured: true, rating: 4.6, views: 856, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"], features: ["Climatisation", "Parking"], status: "active" },
  { id: 103, title: "Duplex Grand-Bassam - Bord de Mer", price: 65000000, city: "Grand-Bassam", district: "Quartier France", category: "house", type: "sale", phone: "+225 07 08 43 21 72", description: "Superbe duplex proche plage.", bedrooms: 4, bathrooms: 3, area_sqm: 280, isFurnished: false, isFeatured: true, rating: 4.7, views: 678, images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"], features: ["Terrasse", "Jardin"], status: "active" },
  { id: 104, title: "Studio Meublé Marcory - WiFi & Clim", price: 250000, city: "Abidjan", district: "Marcory", category: "studio", type: "rent", phone: "+225 07 08 43 21 72", description: "Studio moderne meublé.", bedrooms: 1, bathrooms: 1, area_sqm: 45, isFurnished: true, isFeatured: false, rating: 4.5, views: 445, images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"], features: ["WiFi", "Climatisation"], status: "active" },
  { id: 105, title: "Penthouse Deux Plateaux - Luxe", price: 950000, city: "Abidjan", district: "Deux Plateaux", category: "penthouse", type: "rent", phone: "+225 07 08 43 21 72", description: "Penthouse d'exception.", bedrooms: 4, bathrooms: 3, area_sqm: 200, isFurnished: true, isFeatured: true, rating: 4.9, views: 1567, images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"], features: ["Terrasse", "Ascenseur"], status: "active" },
  { id: 106, title: "Terrain Yamoussoukro", price: 15000000, city: "Yamoussoukro", district: "Centre", category: "land", type: "sale", phone: "+225 07 08 43 21 72", description: "Terrain constructible 1000m².", bedrooms: 0, bathrooms: 0, area_sqm: 1000, isFurnished: false, isFeatured: false, rating: 4.2, views: 234, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"], features: ["Viabilisé"], status: "active" },
  { id: 107, title: "Local Commercial Zone 4", price: 750000, city: "Abidjan", district: "Zone 4", category: "commercial", type: "rent", phone: "+225 07 08 43 21 72", description: "Local commercial moderne.", bedrooms: 0, bathrooms: 1, area_sqm: 150, isFurnished: false, isFeatured: false, rating: 4.4, views: 567, images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"], features: ["Vitrine", "Parking"], status: "active" },
  { id: 108, title: "Villa Vacances Bassam", price: 85000, city: "Grand-Bassam", district: "Bord de mer", category: "villa", type: "vacation", phone: "+225 07 08 43 21 72", description: "Villa de vacances avec piscine.", bedrooms: 6, bathrooms: 4, area_sqm: 500, isFurnished: true, isFeatured: true, rating: 5.0, views: 2345, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"], features: ["Piscine", "WiFi"], status: "active" },
]

export function useLiveListings(filters: any = {}) {
  const [listings, setListings] = useState<any[]>(fallbackData)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  const fetchListings = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.city) params.append('city', filters.city)
      if (filters.type) params.append('type', filters.type)
      
      const res = await fetch(`/api/listings?${params.toString()}`)
      const data = await res.json()
      
      // Si l'API retourne des données, les utiliser
      if (Array.isArray(data) && data.length > 0) {
        setListings(data)
      }
      setLastUpdate(Date.now())
    } catch (error) {
      console.log('Utilisation des données de démo')
      // Garder les données fallback
    } finally {
      setLoading(false)
    }
  }, [filters.city, filters.type])

  useEffect(() => {
    fetchListings()
    const interval = setInterval(fetchListings, 15000)
    return () => clearInterval(interval)
  }, [fetchListings])

  const refresh = () => fetchListings()

  return { listings, loading, lastUpdate, refresh }
}
