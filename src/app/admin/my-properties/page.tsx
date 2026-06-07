'use client'

import { useState } from 'react'
import { FaSearch, FaEdit, FaEye, FaToggleOn, FaToggleOff, FaTrash, FaDownload, FaPlus } from 'react-icons/fa'
import Link from 'next/link'

export default function MyPropertiesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const [properties, setProperties] = useState([
    { id: 1, title: 'Villa Moderne Cocody', price: '85 000 000 FCFA', city: 'Abidjan', type: 'Vente', status: 'active', views: 234, date: '2025-01-15' },
    { id: 2, title: 'Appartement Plateau', price: '450 000 FCFA/mois', city: 'Abidjan', type: 'Location', status: 'active', views: 156, date: '2025-01-14' },
    { id: 3, title: 'Duplex Grand-Bassam', price: '65 000 000 FCFA', city: 'Grand-Bassam', type: 'Vente', status: 'inactive', views: 89, date: '2025-01-10' },
    { id: 4, title: 'Studio Marcory', price: '250 000 FCFA/mois', city: 'Abidjan', type: 'Location', status: 'sold', views: 312, date: '2025-01-08' },
  ])

  const toggleStatus = (id: number) => {
    setProperties(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ))
  }

  const deleteProperty = (id: number) => {
    if (confirm('Supprimer cette annonce ?')) {
      setProperties(prev => prev.filter(p => p.id !== id))
    }
  }

  const filtered = properties.filter(p => {
    if (filter === 'active') return p.status === 'active'
    if (filter === 'inactive') return p.status === 'inactive'
    if (filter === 'sold') return p.status === 'sold'
    if (search) return p.title.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase())
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📋 Mes annonces</h1>
          <p className="text-gray-500 text-sm mt-1">{properties.length} annonces au total</p>
        </div>
        <div className="flex gap-2">
          <a href="/api/export" className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 flex items-center gap-2">
            <FaDownload /> Exporter CSV
          </a>
          <Link href="/admin/properties/add" className="btn-primary text-sm flex items-center gap-2">
            <FaPlus /> Nouvelle annonce
          </Link>
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher une annonce..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'sold'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {f === 'all' ? 'Tous' : f === 'active' ? '✅ Actifs' : f === 'inactive' ? '⏸️ Inactifs' : '🏠 Vendus'}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Annonce</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Prix</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Ville</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Statut</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Vues</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(property => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800 text-sm">{property.title}</div>
                    <div className="text-xs text-gray-400">{property.date}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{property.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{property.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{property.type}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(property.id)}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        property.status === 'active' ? 'bg-green-100 text-green-700' :
                        property.status === 'inactive' ? 'bg-gray-100 text-gray-600' :
                        'bg-red-100 text-red-700'
                      }`}>
                      {property.status === 'active' ? <FaToggleOn className="text-green-500" /> :
                       property.status === 'inactive' ? <FaToggleOff className="text-gray-500" /> : '🏠'}
                      {property.status === 'active' ? 'Actif' : property.status === 'inactive' ? 'Inactif' : 'Vendu'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{property.views}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/annonce/${property.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="Voir">
                        <FaEye className="text-xs" />
                      </Link>
                      <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg" title="Modifier">
                        <FaEdit className="text-xs" />
                      </button>
                      <button onClick={() => deleteProperty(property.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Supprimer">
                        <FaTrash className="text-xs" />
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
