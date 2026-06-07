'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { HeroSection } from '@/components/common/HeroSection'
import Link from 'next/link'
import { FaMapMarkerAlt, FaPhone, FaSearch } from 'react-icons/fa'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      setListings(data.slice(0, 8)) // 8 derniers biens
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (!price) return '0 FCFA'
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M FCFA`
    return price.toLocaleString() + ' FCFA'
  }

  if (!mounted) {
    return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <HeroSection />

        {/* Tous les biens */}
        <section className="container-main py-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🏠 Annonces récentes</h2>
              <p className="text-gray-500 text-sm mt-1">Découvrez les derniers biens publiés</p>
            </div>
            <Link href="/properties" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
              Voir tout <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Aucune annonce</h3>
              <p className="text-gray-500 mb-4">Soyez le premier à publier !</p>
              <Link href="/publier" className="btn-primary">📝 Publier une annonce</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {listings.map(listing => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                    {listing.images?.length > 0 ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">
                        {listing.isFurnished ? '🛋️' : listing.category === 'villa' ? '🏡' : listing.category === 'apartment' ? '🏢' : listing.category === 'land' ? '🌳' : '🏠'}
                      </span>
                    )}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                      listing.type === 'sale' ? 'bg-blue-600' : listing.type === 'vacation' ? 'bg-orange-600' : 'bg-green-600'
                    }`}>
                      {listing.type === 'sale' ? 'À vendre' : listing.type === 'vacation' ? 'Courte durée' : 'À louer'}
                    </span>
                    {listing.isFurnished && (
                      <span className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🛋️ Meublé
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{listing.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-orange-500 flex-shrink-0" />
                      {listing.city}{listing.district ? `, ${listing.district}` : ''}
                    </p>
                    
                    <div className="flex items-end justify-between mt-3 pt-3 border-t">
                      <div>
                        <span className="text-lg font-black text-orange-600">{formatPrice(listing.price)}</span>
                        {listing.type === 'rent' && <span className="text-xs text-gray-500">/mois</span>}
                        {listing.type === 'vacation' && <span className="text-xs text-gray-500">/nuit</span>}
                      </div>
                      {listing.phone && (
                        <a href={`tel:${listing.phone}`} 
                          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-green-600 transition-colors">
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

        {/* Liens rapides */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-12">
          <div className="container-main text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📱 Publiez votre bien gratuitement</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/publier" className="btn-primary text-lg">
                📝 Publier une annonce
              </Link>
              <Link href="/properties" className="btn-outline text-lg">
                🔍 Voir les annonces
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
