'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaStar } from 'react-icons/fa'

interface PropertyCardProps {
  property: {
    id: number
    title: string
    city: string
    district?: string
    price: number
    rating: number
    image: string
    type: string
    listing_type?: string
    bedrooms?: number
    bathrooms?: number
    area_sqm?: number
    is_featured?: boolean
    is_furnished?: boolean
  }
}

export function PropertyCardV2({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M FCFA`
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <div className="relative h-48 sm:h-52 md:h-56 img-hover-zoom">
        <Image
          src={property.image}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1.5 sm:gap-2">
          {property.listing_type === 'sale' && <span className="badge-sale">À vendre</span>}
          {property.listing_type === 'rent' && <span className="badge-rent">À louer</span>}
          {property.is_featured && <span className="badge-premium">Premium</span>}
          {property.is_furnished && <span className="badge-meuble">Meublé</span>}
        </div>

        {/* Rating */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 shadow">
          <FaStar className="text-yellow-500 text-xs" />
          <span>{property.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg mb-2 truncate">
          {property.title}
        </h3>
        <p className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm mb-3">
          <FaMapMarkerAlt className="text-orange-500 flex-shrink-0" />
          <span className="truncate">{property.city}{property.district ? `, ${property.district}` : ''}</span>
        </p>

        {/* Features */}
        {(property.bedrooms || property.bathrooms || property.area_sqm) && (
          <div className="flex items-center gap-3 sm:gap-4 mb-4 pb-4 border-b border-gray-100 text-xs sm:text-sm text-gray-600">
            {property.bedrooms && <span className="flex items-center gap-1"><FaBed className="text-orange-500" />{property.bedrooms}</span>}
            {property.bathrooms && <span className="flex items-center gap-1"><FaBath className="text-orange-500" />{property.bathrooms}</span>}
            {property.area_sqm && <span className="flex items-center gap-1"><FaRulerCombined className="text-orange-500" />{property.area_sqm} m²</span>}
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-orange-600">{formatPrice(property.price)}</span>
            {property.listing_type === 'rent' && <span className="text-xs text-gray-500">/mois</span>}
          </div>
          <Link href={`/properties/${property.id}`} className="px-3 sm:px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs sm:text-sm font-semibold hover:bg-orange-600 hover:text-white transition-all">
            Voir →
          </Link>
        </div>
      </div>
    </div>
  )
}
