'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaMapMarkerAlt, FaSearch, FaPhone } from 'react-icons/fa'

export default function PropertiesPage() {
  const [mounted, setMounted] = useState(false)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    setMounted(true)
    fetchListings()
  }, [cityFilter, typeFilter])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (cityFilter) params.append('city', cityFilter)
      if (typeFilter) params.append('type', typeFilter)

      const response = await fetch(`/api/listings?${params.toString()}`)
      const data = await response.json()
      setListings(data)
    } catch (error) {
      console.error('Erreur chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = search
    ? listings.filter(l => 
        l.title?.toLowerCase().includes(search.toLowerCase()) ||
        l.city?.toLowerCase().includes(search.toLowerCase()) ||
        l.district?.toLowerCase().includes(search.toLowerCase())
      )
    : listings

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
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
          <div className="container-main">
            <h1 className="text-2xl sm:text-3xl font-black mb-2">🏠 Annonces immobilières</h1>
            <p className="text-orange-100 text-sm">{listings.length} annonce(s)</p>
          </div>
        </section>

        {/* Filtres */}
        <section className="container-main -mt-6 relative z-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rechercher..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                <option value="">Toutes les villes</option>
                <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option>
                <option>Grand-Bassam</option><option>San Pedro</option>
              </select>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                <option value="">Toutes offres</option>
                <option value="sale">À vendre</option>
                <option value="rent">À louer</option>
              </select>
            </div>
          </div>
        </section>

        {/* Liste des annonces */}
        <section className="container-main mb-12">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune annonce</h3>
              <p className="text-gray-500 mb-4">Soyez le premier à publier !</p>
              <Link href="/publier" className="btn-primary">📝 Publier une annonce</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(listing => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                    {listing.images && listing.images.length > 0 ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">
                        {listing.category === 'villa' ? '🏡' : 
                         listing.category === 'apartment' ? '🏢' : 
                         listing.category === 'land' ? '🌳' : '🏠'}
                      </span>
                    )}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${listing.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                      {listing.type === 'sale' ? 'À vendre' : 'À louer'}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-bold">
                      #{listing.id}
                    </span>
                  </div>
                  
                  {/* Infos */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{listing.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-orange-500 flex-shrink-0" />
                      {listing.city}{listing.district ? `, ${listing.district}` : ''}
                    </p>
                    
                    {listing.description && (
                      <p className="text-xs text-gray-400 mt-1 truncate">{listing.description}</p>
                    )}
                    
                    <div className="flex items-end justify-between mt-3 pt-3 border-t">
                      <div>
                        <span className="text-lg font-black text-orange-600">{formatPrice(listing.price)}</span>
                        {listing.type === 'rent' && <span className="text-xs text-gray-500">/mois</span>}
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
      </main>

      <Footer />
    </div>
  )
}
