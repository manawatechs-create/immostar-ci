'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'

const meubles = [
  { id: 1, title: 'Studio Meublé Plateau', city: 'Abidjan', price: 25000, type: 'studio' },
  { id: 2, title: 'Appartement Meublé Cocody', city: 'Abidjan', price: 45000, type: 'apartment' },
  { id: 3, title: 'Villa Meublée Bassam', city: 'Grand-Bassam', price: 85000, type: 'villa' },
  { id: 4, title: 'Chambre Meublée Marcory', city: 'Abidjan', price: 15000, type: 'chambre' },
]

export default function MeublesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center py-20"><span className="loader" /></div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-3">🛋️ Résidences Meublées</h1>
            <p className="text-orange-100">Trouvez votre logement meublé idéal en Côte d&apos;Ivoire</p>
          </div>
        </section>
        <section className="container-main py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meubles.map(property => (
              <Link key={property.id} href={`/properties/${property.id}`}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 relative overflow-hidden flex items-center justify-center">
                  <span className="text-5xl">🛋️</span>
                  <span className="absolute top-3 left-3 bg-purple-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">Meublé</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 truncate">{property.title}</h3>
                  <p className="text-sm text-gray-500">📍 {property.city}</p>
                  <p className="text-xl font-black text-orange-600 mt-2">
                    {property.price.toLocaleString('fr-FR')} FCFA
                    <span className="text-sm font-normal text-gray-500">/nuit</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
