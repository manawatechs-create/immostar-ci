'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { useLiveListings } from '@/hooks/useLiveListings'
import Link from 'next/link'
import { FaMapMarkerAlt, FaSearch, FaEye, FaSync } from 'react-icons/fa'

function PropertiesContent() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const { listings, loading, lastUpdate, refresh } = useLiveListings({
    city: cityFilter || undefined,
    type: typeFilter || undefined,
  })

  useEffect(() => {
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    if (type === 'sale') setTypeFilter('sale')
    else if (type === 'rent') setTypeFilter('rent')
    if (city) setCityFilter(city)
    setMounted(true)
  }, [searchParams])

  const formatPrice = (price: number) => {
    if (!price) return '0 FCFA'
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M FCFA`
    return price.toLocaleString() + ' FCFA'
  }

  const filtered = search
    ? listings.filter((l: any) => l.title?.toLowerCase().includes(search.toLowerCase()) || l.city?.toLowerCase().includes(search.toLowerCase()))
    : listings

  const title = typeFilter === 'sale' ? '🏠 Biens à vendre' : typeFilter === 'rent' ? '🔑 Biens à louer' : cityFilter ? `📍 Biens à ${cityFilter}` : '🏠 Toutes les annonces'

  if (!mounted) return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
          <div className="container-main flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black mb-2">{title}</h1>
              <p className="text-orange-100 text-sm">
                {filtered.length} bien(s) • 
                <button onClick={refresh} className="ml-2 underline hover:text-white">
                  <FaSync className={`inline text-xs ${loading ? 'animate-spin' : ''}`} /> Actualiser
                </button>
              </p>
            </div>
          </div>
        </section>

        <section className="container-main -mt-6 relative z-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                <option value="">Toutes les villes</option>
                <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option><option>Grand-Bassam</option><option>San Pedro</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTypeFilter('')} className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === '' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>Tous</button>
              <button onClick={() => setTypeFilter('sale')} className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === 'sale' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>💰 À vendre</button>
              <button onClick={() => setTypeFilter('rent')} className={`px-4 py-2 rounded-full text-xs font-medium ${typeFilter === 'rent' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>🔑 À louer</button>
            </div>
          </div>
        </section>

        <section className="container-main mb-12">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20"><div className="text-6xl mb-4">🏠</div><h3 className="text-xl font-bold">Aucun bien trouvé</h3></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((listing: any) => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    {listing.images && listing.images.length > 0 ? (
                      <img src={typeof listing.images[0] === 'string' ? listing.images[0] : listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><span className="text-5xl">🏠</span></div>
                    )}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${listing.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                      {listing.type === 'sale' ? 'À vendre' : listing.type === 'vacation' ? 'Courte durée' : 'À louer'}
                    </span>
                    {listing.isFurnished && <span className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">🛋️</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{listing.title}</h3>
                    <p className="text-xs text-gray-500 mt-1"><FaMapMarkerAlt className="text-orange-500 inline" /> {listing.city}{listing.district ? `, ${listing.district}` : ''}</p>
                    <div className="flex items-end justify-between mt-3 pt-3 border-t">
                      <span className="text-lg font-black text-orange-600">{formatPrice(listing.price)}</span>
                      <Link href={`/annonce/${listing.id}`} className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-orange-600">
                        <FaEye /> Voir détails
                      </Link>
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
