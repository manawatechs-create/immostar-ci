'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'

export function AdvancedSearch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    property_type: '',
    listing_type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    minBathrooms: '',
    minArea: '',
    maxArea: '',
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    router.push(`/properties?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      property_type: '',
      listing_type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      minBathrooms: '',
      minArea: '',
      maxArea: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== '')

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par mot-clé..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2"
          >
            <FaFilter />
            Filtres avancés
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Rechercher
          </button>
        </div>

        {isOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <select
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Toutes les villes</option>
              <option value="Abidjan">Abidjan</option>
              <option value="Yamoussoukro">Yamoussoukro</option>
              <option value="Bouaké">Bouaké</option>
              <option value="San Pedro">San Pedro</option>
              <option value="Grand-Bassam">Grand-Bassam</option>
            </select>

            <select
              value={filters.property_type}
              onChange={(e) => setFilters({...filters, property_type: e.target.value})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Type de bien</option>
              <option value="house">Maison</option>
              <option value="apartment">Appartement</option>
              <option value="villa">Villa</option>
              <option value="land">Terrain</option>
              <option value="commercial">Local commercial</option>
            </select>

            <select
              value={filters.listing_type}
              onChange={(e) => setFilters({...filters, listing_type: e.target.value})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Type d'offre</option>
              <option value="sale">À vendre</option>
              <option value="rent">À louer</option>
            </select>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Prix min (FCFA)</label>
              <input
                type="number"
                placeholder="Ex: 10000000"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Prix max (FCFA)</label>
              <input
                type="number"
                placeholder="Ex: 100000000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Chambres min</label>
              <input
                type="number"
                placeholder="Ex: 3"
                value={filters.minBedrooms}
                onChange={(e) => setFilters({...filters, minBedrooms: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <FaTimes />
              Effacer les filtres
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
