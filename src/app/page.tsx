'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { HeroSection } from '@/components/common/HeroSection'
import { Categories } from '@/components/common/Categories'
import { PropertyCardV2 } from '@/components/properties/PropertyCardV2'
import Link from 'next/link'

const mockProperties = [
  { id: 1, title: "Villa Moderne Cocody", city: "Abidjan", district: "Cocody", price: 85000000, rating: 4.9, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", type: "villa", listing_type: "sale", bedrooms: 5, bathrooms: 3, area_sqm: 350, is_featured: true },
  { id: 2, title: "Appartement Plateau", city: "Abidjan", district: "Plateau", price: 450000, rating: 4.8, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop", type: "apartment", listing_type: "rent", bedrooms: 3, bathrooms: 2, area_sqm: 120 },
  { id: 3, title: "Duplex Grand-Bassam", city: "Grand-Bassam", price: 65000000, rating: 4.7, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop", type: "house", listing_type: "sale", bedrooms: 4, bathrooms: 3, area_sqm: 280, is_featured: true },
  { id: 4, title: "Studio Meublé Marcory", city: "Abidjan", district: "Marcory", price: 250000, rating: 4.5, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop", type: "studio", listing_type: "rent", bedrooms: 1, bathrooms: 1, area_sqm: 45, is_furnished: true },
]

const stats = [
  { value: '1 234', label: 'Biens disponibles', icon: '🏠' },
  { value: '5 678', label: 'Clients satisfaits', icon: '😊' },
  { value: '15', label: 'Villes couvertes', icon: '🏙️' },
  { value: '89', label: 'Agences partenaires', icon: '🤝' },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [featured, setFeatured] = useState<any[]>([])
  const [recent, setRecent] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    setTimeout(() => {
      setFeatured(mockProperties.filter(p => p.is_featured))
      setRecent(mockProperties)
    }, 300)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="loader" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <Categories />

        {/* Stats - Orange Gradient */}
        <section className="container-main -mt-6 relative z-20 mb-12 sm:mb-16">
          <div className="section-orange rounded-2xl shadow-xl shadow-orange-500/30 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
                  <div className="stat-value">{stat.value}+</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biens Premium */}
        <section className="container-main mb-12 sm:mb-16">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div>
              <h2 className="title-section">⭐ Biens Premium</h2>
              <p className="text-small mt-1">Les meilleures offres pour vous</p>
            </div>
            <Link href="/properties?featured=true" className="text-orange-600 font-semibold hover:text-orange-700 text-sm sm:text-base flex items-center gap-1">
              Voir tout <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="property-grid">
            {featured.map(p => <PropertyCardV2 key={p.id} property={p} />)}
          </div>
        </section>

        {/* Nouveautés */}
        <section className="container-main mb-12 sm:mb-16">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div>
              <h2 className="title-section">🆕 Nouveautés</h2>
              <p className="text-small mt-1">Derniers biens ajoutés</p>
            </div>
            <Link href="/properties" className="text-orange-600 font-semibold hover:text-orange-700 text-sm sm:text-base flex items-center gap-1">
              Voir tout <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="property-grid">
            {recent.map(p => <PropertyCardV2 key={p.id} property={p} />)}
          </div>
        </section>

        {/* CTA Newsletter */}
        <section className="section-light section-padding">
          <div className="container-main">
            <div className="card-padded text-center max-w-2xl mx-auto border-orange-200">
              <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wider uppercase bg-orange-50 px-4 py-1.5 rounded-full">
                ⭐ Rejoignez ImmoStar
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-3">
                Ne manquez aucune opportunité
              </h3>
              <p className="text-body mb-6 sm:mb-8">
                Recevez en avant-première les meilleures offres immobilières.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Votre adresse email" className="input-field rounded-full border-orange-200 focus:ring-orange-500" required />
                <button type="submit" className="btn-primary rounded-full whitespace-nowrap">
                  S&apos;abonner
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Bannière de conversion ajoutée dans le return
