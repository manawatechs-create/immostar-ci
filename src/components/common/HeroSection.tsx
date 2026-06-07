'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Images du carrousel (immobilier Côte d'Ivoire)
const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=600&fit=crop',
]

export function HeroSection() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [listingType, setListingType] = useState('all')
  const [currentImage, setCurrentImage] = useState(0)

  // Défilement automatique du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (listingType !== 'all') params.append('type', listingType)
    router.push(`/properties?${params.toString()}`)
  }

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % heroImages.length)
  }

  const filters = [
    { label: '📍 Tout voir', city: '' },
    { label: '🏙️ Abidjan', city: 'Abidjan' },
    { label: '🏖️ Bassam', city: 'Grand-Bassam' },
    { label: '🏛️ Yamoussoukro', city: 'Yamoussoukro' },
  ]

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[650px] flex items-center overflow-hidden">
      {/* Carrousel d'images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Overlay sombre pour réduire la luminosité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Contenu */}
      <div className="relative z-10 container-main py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">⭐ ImmoStar - La star de l&apos;immobilier</span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            Trouvez votre{' '}
            <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              maison de rêve
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">en Côte d&apos;Ivoire</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow">
            Avec ImmoStar, découvrez les meilleures offres immobilières. 
            Vente, location, maisons de luxe et appartements modernes.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2.5 sm:p-3 md:p-4 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ville, quartier ou mot-clé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 text-sm sm:text-base"
              >
                <option value="all">Toutes offres</option>
                <option value="sale">À vendre</option>
                <option value="rent">À louer</option>
              </select>
              <button type="submit" className="btn-primary whitespace-nowrap text-sm sm:text-base">
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
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium border border-white/20 transition-all"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flèches de navigation du carrousel */}
      <button
        onClick={prevImage}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <FaChevronRight />
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentImage ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="#f9fafb">
          <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 55C1200 50 1320 40 1380 35L1440 30V100H0Z" />
        </svg>
      </div>
    </section>
  )
}
