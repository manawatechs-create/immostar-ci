'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'

export default function AdminPropertiesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const properties = [
    { id: 1, title: 'Villa Moderne Cocody', type: 'Villa', price: '85,000,000 FCFA', status: 'available', views: 234, date: '2025-01-15' },
    { id: 2, title: 'Appartement Plateau', type: 'Appartement', price: '450,000 FCFA/mois', status: 'available', views: 156, date: '2025-01-14' },
    { id: 3, title: 'Duplex Grand-Bassam', type: 'Maison', price: '65,000,000 FCFA', status: 'pending', views: 89, date: '2025-01-13' },
    { id: 4, title: 'Studio Marcory', type: 'Studio', price: '250,000 FCFA/mois', status: 'sold', views: 312, date: '2025-01-12' },
    { id: 5, title: 'Terrain Yamoussoukro', type: 'Terrain', price: '15,000,000 FCFA', status: 'available', views: 45, date: '2025-01-10' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Biens immobiliers</h1>
          <p className="text-gray-500 text-sm mt-1">{properties.length} biens au total</p>
        </div>
        <Link href="/admin/properties/add" className="btn-primary flex items-center gap-2 text-sm">
          <FaPlus /> Ajouter un bien
        </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher un bien..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm">
          <option value="all">Tous les statuts</option>
          <option value="available">Disponible</option>
          <option value="pending">En cours</option>
          <option value="sold">Vendu</option>
        </select>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Bien</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Prix</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Vues</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800 text-sm">{property.title}</div>
                    <div className="text-xs text-gray-500">{property.date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{property.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{property.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      property.status === 'available' ? 'bg-green-100 text-green-700' :
                      property.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {property.status === 'available' ? 'Disponible' : property.status === 'pending' ? 'En cours' : 'Vendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{property.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir">
                        <FaEye className="text-sm" />
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Modifier">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
