'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaMapMarkerAlt, FaPhone, FaWifi, FaWind } from 'react-icons/fa'

export default function MeublesPage() {
  const [mounted, setMounted] = useState(false)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    fetchMeubles()
  }, [])

  const fetchMeubles = async () => {
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      // Filtrer uniquement les meublés
      const meubles = data.filter((l: any) => l.isFurnished === true)
      setListings(meubles)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <section className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-3">🛋️ Résidences Meublées</h1>
            <p className="text-purple-100 text-lg">Trouvez votre logement meublé idéal en Côte d&apos;Ivoire</p>
            <Link href="/publier" className="inline-block mt-4 bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              ➕ Publier un meublé
            </Link>
          </div>
        </section>

        <section className="container-main py-8">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛋️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun meublé disponible</h3>
              <p className="text-gray-500 mb-4">Soyez le premier à publier une résidence meublée !</p>
              <Link href="/publier" className="btn-primary">📝 Publier un meublé</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {listings.map(listing => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all group border-2 border-purple-100">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative">
                    {listing.images?.length > 0 ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">🛋️</span>
                    )}
                    <span className="absolute top-3 left-3 bg-purple-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                      Meublé
                    </span>
                    {listing.type === 'vacation' && (
                      <span className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🏖️ Courte durée
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{listing.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-purple-500" />
                      {listing.city}{listing.district ? `, ${listing.district}` : ''}
                    </p>
                    
                    {listing.furnishedType && (
                      <p className="text-xs text-purple-600 mt-1">📍 {listing.furnishedType}</p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      {listing.maxGuests && <span>👤 {listing.maxGuests} voyageurs</span>}
                      <span>🛋️ Meublé</span>
                    </div>
                    
                    <div className="flex items-end justify-between mt-3 pt-3 border-t">
                      <div>
                        <span className="text-lg font-black text-purple-600">
                          {listing.price ? parseInt(listing.price).toLocaleString() : '0'} FCFA
                        </span>
                        {listing.type === 'rent' && <span className="text-xs text-gray-500">/mois</span>}
                      </div>
                      {listing.phone && (
                        <a href={`tel:${listing.phone}`} 
                          className="flex items-center gap-1 bg-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-purple-600 transition-colors">
                          <FaPhone className="text-xs" /> Appeler
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
