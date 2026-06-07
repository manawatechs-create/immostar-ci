'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaMapMarkerAlt, FaSearch, FaPhone, FaFilter } from 'react-icons/fa'

function PropertiesContent() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [furnishedFilter, setFurnishedFilter] = useState(false)

  // Lire les paramètres d'URL
  useEffect(() => {
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const furnished = searchParams.get('furnished')
    
    if (type === 'sale') setTypeFilter('sale')
    else if (type === 'rent') setTypeFilter('rent')
    else if (type) setTypeFilter(type)
    
    if (city) setCityFilter(city)
    if (furnished === 'true') setFurnishedFilter(true)
    
    setMounted(true)
  }, [searchParams])

  useEffect(() => {
    if (mounted) fetchListings()
  }, [mounted, cityFilter, typeFilter, furnishedFilter])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      
      let filtered = [...data]
      if (cityFilter) filtered = filtered.filter((l: any) => l.city === cityFilter)
      if (typeFilter) filtered = filtered.filter((l: any) => l.type === typeFilter)
      if (furnishedFilter) filtered = filtered.filter((l: any) => l.isFurnished === true)
      
      setListings(filtered)
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

  const getTitle = () => {
    if (typeFilter === 'sale') return '🏠 Biens à vendre'
    if (typeFilter === 'rent') return '🔑 Biens à louer'
    if (typeFilter === 'vacation') return '🏖️ Locations courte durée'
    if (furnishedFilter) return '🛋️ Résidences meublées'
    if (cityFilter) return `📍 Biens à ${cityFilter}`
    return '🏠 Toutes les annonces'
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
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{getTitle()}</h1>
            <p className="text-orange-100 text-sm">{listings.length} annonce(s)</p>
          </div>
        </section>

        {/* Filtres */}
        <section className="container-main -mt-6 relative z-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
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
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTypeFilter('')} 
                className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === '' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Tous
              </button>
              <button onClick={() => setTypeFilter('sale')} 
                className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === 'sale' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                💰 À vendre
              </button>
              <button onClick={() => setTypeFilter('rent')} 
                className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === 'rent' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                🔑 À louer
              </button>
              <button onClick={() => setTypeFilter('vacation')} 
                className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === 'vacation' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                🏖️ Courte durée
              </button>
              <button onClick={() => { setFurnishedFilter(!furnishedFilter); if (!furnishedFilter) setTypeFilter('rent') }}
                className={`px-4 py-2 rounded-full text-xs font-medium ${furnishedFilter ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                🛋️ Meublés
              </button>
            </div>
          </div>
        </section>

        {/* Liste */}
        <section className="container-main mb-12">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Aucune annonce</h3>
              <Link href="/publier" className="btn-primary">📝 Publier une annonce</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {listings
                .filter((l: any) => !search || l.title?.toLowerCase().includes(search.toLowerCase()) || l.city?.toLowerCase().includes(search.toLowerCase()))
                .map((listing: any) => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                    {listing.images?.length > 0 ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">
                        {listing.isFurnished ? '🛋️' : listing.category === 'villa' ? '🏡' : listing.category === 'apartment' ? '🏢' : '🏠'}
                      </span>
                    )}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                      listing.type === 'sale' ? 'bg-blue-600' : listing.type === 'vacation' ? 'bg-orange-600' : 'bg-green-600'
                    }`}>
                      {listing.type === 'sale' ? 'À vendre' : listing.type === 'vacation' ? 'Courte durée' : 'À louer'}
                    </span>
                    {listing.isFurnished && (
                      <span className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🛋️
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
                        <a href={`tel:${listing.phone}`} className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-green-600">
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

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="loader" /></div>}>
      <PropertiesContent />
    </Suspense>
  )
}
