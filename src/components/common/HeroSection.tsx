'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [listingType, setListingType] = useState('all')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (listingType !== 'all') params.append('listing_type', listingType)
    router.push(`/properties?${params.toString()}`)
  }

  const filters = [
    { label: '📍 Tout', city: '' },
    { label: '🏙️ Abidjan', city: 'Abidjan' },
    { label: '🏖️ Bassam', city: 'Grand-Bassam' },
    { label: '🏛️ Yamoussoukro', city: 'Yamoussoukro' },
  ]

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[650px] hero-bg flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/30 via-orange-800/40 to-orange-900/70" />
      
      <div className="relative z-10 container-main py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 border border-orange-300/30 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">⭐ ImmoStar - La star de l&apos;immobilier</span>
          </div>

          {/* Title */}
          <h1 className="title-hero text-white mb-4 sm:mb-6 animate-fade-in-up">
            Trouvez votre{' '}
            <span className="text-gradient">
              maison de rêve
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">en Côte d&apos;Ivoire</span>
          </h1>
          
          <p className="text-body !text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Avec ImmoStar, découvrez les meilleures offres immobilières. 
            Vente, location, maisons de luxe et appartements modernes.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl shadow-orange-500/20 p-2.5 sm:p-3 md:p-4 max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Ville, quartier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-orange-50/50 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="px-4 py-3 bg-orange-50/50 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 text-sm sm:text-base"
              >
                <option value="all">Toutes offres</option>
                <option value="sale">À vendre</option>
                <option value="rent">À louer</option>
              </select>
              <button type="submit" className="btn-primary whitespace-nowrap text-sm sm:text-base animate-pulse-orange">
                🔍 Rechercher
              </button>
            </div>
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6">
            {filters.map((f, i) => (
              <button
                key={i}
                onClick={() => router.push(f.city ? `/properties?city=${f.city}` : '/properties')}
                className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-xs sm:text-sm font-medium text-white hover:bg-white/30 transition-all"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="#f9fafb"><path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 55C1200 50 1320 40 1380 35L1440 30V100H0Z" /></svg>
      </div>
    </section>
  )
}
