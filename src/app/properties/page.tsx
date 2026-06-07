'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaStar, FaHome } from 'react-icons/fa'

const allProperties = [
  { id: 1, title: "Villa Moderne Cocody", city: "Abidjan", district: "Cocody", price: 85000000, rating: 4.9, type: "villa", listing_type: "sale", bedrooms: 5, bathrooms: 3, area_sqm: 350, is_featured: true, is_furnished: false },
  { id: 2, title: "Appartement Plateau", city: "Abidjan", district: "Plateau", price: 450000, rating: 4.8, type: "apartment", listing_type: "rent", bedrooms: 3, bathrooms: 2, area_sqm: 120, is_featured: false, is_furnished: false },
  { id: 3, title: "Duplex Grand-Bassam", city: "Grand-Bassam", district: "", price: 65000000, rating: 4.7, type: "house", listing_type: "sale", bedrooms: 4, bathrooms: 3, area_sqm: 280, is_featured: true, is_furnished: false },
  { id: 4, title: "Studio Meublé Marcory", city: "Abidjan", district: "Marcory", price: 250000, rating: 4.5, type: "studio", listing_type: "rent", bedrooms: 1, bathrooms: 1, area_sqm: 45, is_featured: false, is_furnished: true },
  { id: 5, title: "Villa Vue Mer Bassam", city: "Grand-Bassam", district: "Bord de mer", price: 120000000, rating: 5.0, type: "villa", listing_type: "sale", bedrooms: 6, bathrooms: 4, area_sqm: 500, is_featured: true, is_furnished: true },
  { id: 6, title: "Terrain Yamoussoukro", city: "Yamoussoukro", district: "Centre", price: 15000000, rating: 4.3, type: "land", listing_type: "sale", bedrooms: 0, bathrooms: 0, area_sqm: 1000, is_featured: false, is_furnished: false },
  { id: 7, title: "Penthouse Deux Plateaux", city: "Abidjan", district: "Deux Plateaux", price: 950000, rating: 4.9, type: "penthouse", listing_type: "rent", bedrooms: 4, bathrooms: 3, area_sqm: 200, is_featured: true, is_furnished: true },
  { id: 8, title: "Bureau Zone 4", city: "Abidjan", district: "Zone 4", price: 750000, rating: 4.6, type: "commercial", listing_type: "rent", bedrooms: 0, bathrooms: 1, area_sqm: 150, is_featured: false, is_furnished: false },
  { id: 9, title: "Loft Cocody", city: "Abidjan", district: "Cocody", price: 55000000, rating: 4.8, type: "loft", listing_type: "sale", bedrooms: 2, bathrooms: 2, area_sqm: 110, is_featured: true, is_furnished: true },
  { id: 10, title: "Maison Bouaké", city: "Bouaké", district: "Résidentiel", price: 25000000, rating: 4.2, type: "house", listing_type: "sale", bedrooms: 3, bathrooms: 2, area_sqm: 180, is_featured: false, is_furnished: false },
  { id: 11, title: "Appartement San Pedro", city: "San Pedro", district: "Centre", price: 350000, rating: 4.4, type: "apartment", listing_type: "rent", bedrooms: 2, bathrooms: 1, area_sqm: 85, is_featured: false, is_furnished: false },
  { id: 12, title: "Immeuble Plateau", city: "Abidjan", district: "Plateau", price: 250000000, rating: 4.9, type: "immeuble", listing_type: "sale", bedrooms: 12, bathrooms: 6, area_sqm: 1200, is_featured: true, is_furnished: false },
]

function PropertiesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  const initialType = searchParams.get('type') || ''
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    type: initialType,
    listingType: initialType === 'sale' ? 'sale' : initialType === 'rent' ? 'rent' : searchParams.get('listing_type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
  })
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState(allProperties)
  const [loading, setLoading] = useState(true)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = [...allProperties]
      const s = filters.search.toLowerCase()
      if (s) filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.city.toLowerCase().includes(s) || p.district?.toLowerCase().includes(s))
      if (filters.city) filtered = filtered.filter(p => p.city === filters.city)
      if (filters.type) filtered = filtered.filter(p => p.type === filters.type)
      if (filters.listingType) filtered = filtered.filter(p => p.listing_type === filters.listingType)
      if (filters.minPrice) filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice))
      if (filters.maxPrice) filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice))
      if (filters.bedrooms) filtered = filtered.filter(p => (p.bedrooms || 0) >= parseInt(filters.bedrooms))
      
      if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price)
      if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price)
      if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)
      
      setProperties(filtered)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [filters, sortBy])

  if (!mounted) {
    return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>
  }

  const formatPrice = (p: number) => {
    if (p >= 1000000) return `${(p / 1000000).toFixed(0)}M FCFA`
    return p.toLocaleString('fr-FR') + ' FCFA'
  }

  const clearFilters = () => {
    setFilters({ search: '', city: '', type: '', listingType: '', minPrice: '', maxPrice: '', bedrooms: '' })
    router.push('/properties')
  }

  const title = filters.listingType === 'sale' ? '🏠 Biens à vendre' : filters.listingType === 'rent' ? '🔑 Biens à louer' : filters.city ? `📍 Biens à ${filters.city}` : '🏠 Tous les biens'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 sm:py-12">
          <div className="container-main">
            <h1 className="text-2xl sm:text-3xl font-black mb-2">{title}</h1>
            <p className="text-orange-100 text-sm">{properties.length} bien(s) trouvé(s)</p>
          </div>
        </section>

        <section className="container-main -mt-6 relative z-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                <input type="text" placeholder="Rechercher..." value={filters.search}
                  onChange={e => setFilters({...filters, search: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 border border-orange-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 border rounded-xl text-sm font-medium flex items-center gap-1 ${showFilters ? 'bg-orange-50 border-orange-500 text-orange-600' : 'border-gray-300'}`}>
                <FaFilter /> Filtres
              </button>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm">
                <option value="newest">Récents</option>
                <option value="price-asc">Prix ↑</option>
                <option value="price-desc">Prix ↓</option>
                <option value="rating">Notes</option>
              </select>
            </div>

            {showFilters && (
              <div className="border-t pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">Ville</option>
                  <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option><option>Grand-Bassam</option><option>San Pedro</option>
                </select>
                <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">Type</option>
                  <option value="house">Maison</option><option value="apartment">Appartement</option><option value="villa">Villa</option>
                  <option value="studio">Studio</option><option value="land">Terrain</option><option value="commercial">Commerce</option>
                </select>
                <select value={filters.listingType} onChange={e => setFilters({...filters, listingType: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">Offre</option>
                  <option value="sale">À vendre</option><option value="rent">À louer</option>
                </select>
                <input type="number" placeholder="Chambres min" value={filters.bedrooms}
                  onChange={e => setFilters({...filters, bedrooms: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                <input type="number" placeholder="Prix min" value={filters.minPrice}
                  onChange={e => setFilters({...filters, minPrice: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                <input type="number" placeholder="Prix max" value={filters.maxPrice}
                  onChange={e => setFilters({...filters, maxPrice: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                <button onClick={clearFilters} className="text-red-500 text-sm">Effacer</button>
              </div>
            )}
          </div>
        </section>

        <section className="container-main mb-12">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold">Aucun bien trouvé</h3>
              <button onClick={clearFilters} className="btn-primary mt-4">Réinitialiser</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {properties.map(p => (
                <Link key={p.id} href={`/properties/${p.id}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                    <span className="text-5xl">{p.type === 'villa' ? '🏡' : p.type === 'apartment' ? '🏢' : p.type === 'land' ? '🌳' : p.type === 'commercial' ? '🏪' : '🏠'}</span>
                    <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${p.listing_type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                      {p.listing_type === 'sale' ? 'À vendre' : 'À louer'}
                    </span>
                    {p.is_featured && <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">⭐</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{p.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><FaMapMarkerAlt className="text-orange-500" />{p.city}{p.district ? `, ${p.district}` : ''}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-2 mb-3">
                      {p.bedrooms > 0 && <span><FaBed className="inline text-orange-500" /> {p.bedrooms}</span>}
                      {p.bathrooms > 0 && <span><FaBath className="inline text-orange-500" /> {p.bathrooms}</span>}
                      {p.area_sqm > 0 && <span><FaRulerCombined className="inline text-orange-500" /> {p.area_sqm}m²</span>}
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-lg font-black text-orange-600">{formatPrice(p.price)}</span>
                      <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-semibold group-hover:bg-orange-600 group-hover:text-white transition-all">Voir →</span>
                    </div>
                  </div>
                </Link>
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
