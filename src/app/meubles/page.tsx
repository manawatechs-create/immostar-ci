'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaMapMarkerAlt, FaSearch, FaEye, FaPhone, FaBed } from 'react-icons/fa'

export default function MeublesPage() {
  const [mounted, setMounted] = useState(false)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    setMounted(true)
    fetchMeubles()
  }, [cityFilter])

  const fetchMeubles = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/listings')
      const data = await res.json()
      // Filtrer uniquement les meublés
      let meubles = data.filter((l: any) => l.isFurnished === true)
      if (cityFilter) meubles = meubles.filter((l: any) => l.city === cityFilter)
      setListings(meubles)
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

  const filtered = search
    ? listings.filter(l => l.title?.toLowerCase().includes(search.toLowerCase()) || l.city?.toLowerCase().includes(search.toLowerCase()))
    : listings

  if (!mounted) return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <section className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-3">🛋️ Résidences Meublées</h1>
            <p className="text-purple-100 text-lg">Trouvez votre logement meublé idéal</p>
            <Link href="/publier" className="inline-block mt-4 bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50">
              ➕ Publier un meublé
            </Link>
          </div>
        </section>

        {/* Filtres */}
        <section className="container-main -mt-6 relative z-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rechercher un meublé..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-purple-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-2.5 border border-purple-200 rounded-xl text-sm">
                <option value="">Toutes les villes</option>
                <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option><option>Grand-Bassam</option><option>San Pedro</option>
              </select>
            </div>
          </div>
        </section>

        {/* Liste */}
        <section className="container-main mb-12">
          {loading ? (
            <div className="flex justify-center py-20"><span className="loader" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛋️</div>
              <h3 className="text-xl font-bold mb-2">Aucun meublé trouvé</h3>
              <p className="text-gray-500 mb-4">Soyez le premier à publier !</p>
              <Link href="/publier" className="btn-primary">📝 Publier un meublé</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(listing => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group border-2 border-purple-100">
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    {listing.images && listing.images.length > 0 ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                        <span className="text-5xl">🛋️</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-purple-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">Meublé</span>
                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${listing.type === 'vacation' ? 'bg-orange-600' : 'bg-green-600'}`}>
                      {listing.type === 'vacation' ? '🏖️ Courte durée' : '🔑 À louer'}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{listing.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      <FaMapMarkerAlt className="text-purple-500 inline" /> {listing.city}{listing.district ? `, ${listing.district}` : ''}
                    </p>
                    {listing.bedrooms > 0 && (
                      <p className="text-xs text-gray-400 mt-1"><FaBed className="inline" /> {listing.bedrooms} ch • 📐 {listing.area_sqm}m²</p>
                    )}
                    
                    <div className="flex items-end justify-between mt-3 pt-3 border-t">
                      <div>
                        <span className="text-lg font-black text-purple-600">{formatPrice(listing.price)}</span>
                        <span className="text-xs text-gray-500">/{listing.type === 'vacation' ? 'nuit' : 'mois'}</span>
                      </div>
                      <Link href={`/annonce/${listing.id}`} className="flex items-center gap-1 bg-purple-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-purple-600 transition-all">
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
