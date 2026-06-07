'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaHeart, FaMapMarkerAlt, FaStar } from 'react-icons/fa'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setFavorites([
        { id: 1, title: "Villa Moderne Cocody", city: "Abidjan", price: 85000000, rating: 4.9, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop", listing_type: "sale" },
        { id: 3, title: "Duplex Grand-Bassam", city: "Grand-Bassam", price: 65000000, rating: 4.7, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", listing_type: "sale" },
        { id: 7, title: "Penthouse Deux Plateaux", city: "Abidjan", price: 950000, rating: 4.9, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", listing_type: "rent" },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const removeFavorite = (id: number) => setFavorites(favorites.filter(f => f.id !== id))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
          <div className="container-main">
            <h1 className="text-3xl sm:text-4xl font-black"><FaHeart className="inline text-red-300 mr-2" />Mes Favoris</h1>
            <p className="text-orange-100 mt-1">{favorites.length} bien(s) sauvegardé(s)</p>
          </div>
        </section>

        <section className="container-main -mt-6 relative z-20 mb-12">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : favorites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-xl font-bold mb-2">Aucun favori</h3>
              <p className="text-gray-500 mb-4">Ajoutez des biens à vos favoris</p>
              <Link href="/properties" className="btn-primary">Explorer</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map(p => (
                <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group relative">
                  <button onClick={() => removeFavorite(p.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                    <FaHeart className="text-red-500" />
                  </button>
                  <Link href={`/properties/${p.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm truncate">{p.title}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><FaMapMarkerAlt className="text-orange-500" />{p.city}</p>
                      <p className="text-lg font-black text-orange-600 mt-2">{p.price.toLocaleString()} FCFA</p>
                    </div>
                  </Link>
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
