'use client'

import { useParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { useState } from 'react'
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaPhone, FaWhatsapp, FaHeart, FaShare, FaStar, FaCheck } from 'react-icons/fa'
import Link from 'next/link'

const property = {
  id: 1,
  title: "Villa Moderne Cocody",
  description: "Magnifique villa avec piscine et jardin dans le quartier résidentiel de Cocody.",
  price: 85000000,
  listing_type: "sale",
  city: "Abidjan",
  district: "Cocody",
  bedrooms: 5,
  bathrooms: 3,
  area_sqm: 350,
  rating: 4.9,
  views: 1234,
  features: ['Piscine', 'Garage', 'Jardin', 'Sécurité 24/7', 'Climatisation'],
  owner: { name: "M. Kouadio", phone: "+225 07 00 00 01", email: "kouadio@email.com" }
}

export default function PropertyDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-6">
        {/* Fil d'ariane */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-600">Accueil</Link> / 
          <Link href="/properties" className="hover:text-orange-600"> Annonces</Link> / 
          <span className="text-gray-800"> {property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-64 sm:h-80 md:h-96 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                <span className="text-8xl">🏡</span>
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white ${property.listing_type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                  {property.listing_type === 'sale' ? 'À vendre' : 'À louer'}
                </span>
                <button onClick={() => setIsFavorite(!isFavorite)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg ${isFavorite ? 'bg-red-500 text-white' : 'bg-white'}`}>
                  <FaHeart />
                </button>
              </div>
            </div>

            {/* Infos */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <FaMapMarkerAlt className="text-orange-500" />
                {property.district}, {property.city}
              </div>

              <div className="text-3xl font-black text-orange-600 mb-6">
                {property.price.toLocaleString()} FCFA
                <span className="text-sm font-normal text-gray-500"> {property.listing_type === 'sale' ? '(Prix de vente)' : '/mois'}</span>
              </div>

              {/* Caractéristiques */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaBed className="text-xl text-orange-500 mx-auto mb-1" />
                  <div className="font-bold">{property.bedrooms}</div>
                  <div className="text-xs text-gray-500">Chambres</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaBath className="text-xl text-orange-500 mx-auto mb-1" />
                  <div className="font-bold">{property.bathrooms}</div>
                  <div className="text-xs text-gray-500">Salles de bain</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaRulerCombined className="text-xl text-orange-500 mx-auto mb-1" />
                  <div className="font-bold">{property.area_sqm} m²</div>
                  <div className="text-xs text-gray-500">Surface</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 pb-6 border-b">
                <h2 className="font-bold text-lg mb-2">Description</h2>
                <p className="text-gray-600 text-sm">
                  {showFullDescription ? property.description : property.description.substring(0, 150) + '...'}
                  <button onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-orange-600 font-semibold ml-1">
                    {showFullDescription ? 'Voir moins' : 'Voir plus'}
                  </button>
                </p>
              </div>

              {/* Équipements */}
              <div>
                <h2 className="font-bold text-lg mb-2">Équipements</h2>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheck className="text-green-500 text-xs" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Contact - NUMÉRO VISIBLE DIRECTEMENT */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 text-lg">
                  {property.owner.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{property.owner.name}</div>
                  <div className="text-xs text-gray-500">Propriétaire</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                📅 En ligne aujourd'hui • Répond rapidement
              </p>

              {/* NUMÉRO VISIBLE DIRECTEMENT */}
              <div className="space-y-2">
                <a href={`tel:${property.owner.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md">
                  <FaPhone /> {property.owner.phone}
                </a>

                <a href={`https://wa.me/${property.owner.phone?.replace(/[\s+]/g, '')}`} target="_blank"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>

              <p className="text-xs text-gray-400 text-center mt-3">
                👁️ {property.views} vues • ⭐ {property.rating}/5
              </p>

              {/* Sécurité */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Ne payez jamais avant d'avoir visité le bien
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
