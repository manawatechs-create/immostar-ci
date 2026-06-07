'use client'

import { useState } from 'react'
import { FaMapMarkerAlt, FaDirections, FaExpand } from 'react-icons/fa'

interface PropertyMapProps {
  city?: string
  district?: string
  title?: string
  price?: number
}

// Coordonnées des villes ivoiriennes
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'Abidjan': { lat: 5.3600, lng: -4.0083 },
  'Cocody': { lat: 5.3800, lng: -3.9800 },
  'Plateau': { lat: 5.3200, lng: -4.0200 },
  'Marcory': { lat: 5.3000, lng: -3.9800 },
  'Yopougon': { lat: 5.3500, lng: -4.0800 },
  'Yamoussoukro': { lat: 6.8167, lng: -5.2833 },
  'Bouaké': { lat: 7.6833, lng: -5.0333 },
  'San Pedro': { lat: 4.7333, lng: -6.6333 },
  'Grand-Bassam': { lat: 5.2000, lng: -3.7333 },
  'Daloa': { lat: 6.8833, lng: -6.4500 },
  'Korhogo': { lat: 9.4500, lng: -5.6333 },
}

export function PropertyMap({ city = 'Abidjan', district = '', title = '', price = 0 }: PropertyMapProps) {
  const [expanded, setExpanded] = useState(false)

  const getCoordinates = () => {
    if (district && cityCoordinates[district]) return cityCoordinates[district]
    if (cityCoordinates[city]) return cityCoordinates[city]
    return { lat: 5.3600, lng: -4.0083 }
  }

  const coords = getCoordinates()
  const locationName = district ? `${district}, ${city}` : city
  
  // URL pour Google Maps en iframe
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${coords.lat},${coords.lng}&zoom=15&maptype=roadmap`
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`
  const wazeUrl = `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`

  const formatPrice = (p: number) => {
    if (!p) return ''
    if (p >= 1000000) return `${(p / 1000000).toFixed(0)}M FCFA`
    return p.toLocaleString() + ' FCFA'
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500" />
            Localisation
          </h3>
          <button 
            onClick={() => setExpanded(true)}
            className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <FaExpand /> Agrandir
          </button>
        </div>
        
        {/* Carte Google Maps en iframe */}
        <div className="h-64 bg-gray-100">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Carte de ${locationName}`}
          />
        </div>

        {/* Boutons de navigation */}
        <div className="p-4 grid grid-cols-2 gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            <FaDirections /> Google Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-400 text-white rounded-xl text-sm font-semibold hover:bg-sky-500 transition-colors"
          >
            <FaDirections /> Waze
          </a>
        </div>

        {/* Adresse */}
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500" />
            {locationName}, Côte d&apos;Ivoire
          </p>
          {title && (
            <p className="text-xs text-gray-400 mt-1">
              {title} {price > 0 ? `- ${formatPrice(price)}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Version plein écran */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setExpanded(false)}
              className="bg-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:bg-gray-100"
            >
              ✕ Fermer
            </button>
          </div>
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </>
  )
}
