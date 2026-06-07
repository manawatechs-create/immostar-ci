'use client'

import { useState } from 'react'
import { FaEye, FaPhone, FaWhatsapp, FaChartLine, FaEdit, FaTrash, FaPlus, FaHome, FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function MyPropertiesPage() {
  const [activeTab, setActiveTab] = useState('active')

  const myProperties = [
    {
      id: 1,
      title: 'Villa Moderne Cocody',
      price: '85 000 000 FCFA',
      status: 'active',
      views: 1234,
      calls: 45,
      whatsapp: 23,
      favorites: 12,
      publishedDate: '2025-01-15',
      expiresIn: 45,
    },
    {
      id: 2,
      title: 'Appartement Plateau',
      price: '450 000 FCFA/mois',
      status: 'active',
      views: 567,
      calls: 18,
      whatsapp: 9,
      favorites: 5,
      publishedDate: '2025-01-10',
      expiresIn: 40,
    },
    {
      id: 3,
      title: 'Studio Marcory',
      price: '250 000 FCFA/mois',
      status: 'sold',
      views: 890,
      calls: 34,
      whatsapp: 15,
      favorites: 8,
      publishedDate: '2024-12-01',
      expiresIn: 0,
    },
  ]

  const activeProperties = myProperties.filter(p => p.status === 'active')
  const soldProperties = myProperties.filter(p => p.status === 'sold')

  const totalStats = {
    views: activeProperties.reduce((sum, p) => sum + p.views, 0),
    calls: activeProperties.reduce((sum, p) => sum + p.calls, 0),
    whatsapp: activeProperties.reduce((sum, p) => sum + p.whatsapp, 0),
    favorites: activeProperties.reduce((sum, p) => sum + p.favorites, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📊 Mes annonces</h1>
          <p className="text-gray-500 text-sm mt-1">{activeProperties.length} annonce(s) active(s) • {soldProperties.length} vendue(s)</p>
        </div>
        <Link href="/admin/properties/add" className="btn-primary text-sm flex items-center gap-2">
          <FaPlus /> Nouvelle annonce
        </Link>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <FaEye className="text-2xl text-blue-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{totalStats.views.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Vues totales</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <FaPhone className="text-2xl text-orange-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{totalStats.calls}</div>
          <div className="text-xs text-gray-500">Appels reçus</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <FaWhatsapp className="text-2xl text-green-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{totalStats.whatsapp}</div>
          <div className="text-xs text-gray-500">WhatsApp</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <FaChartLine className="text-2xl text-purple-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{totalStats.favorites}</div>
          <div className="text-xs text-gray-500">Favoris</div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-2">
        <button onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'active' 
              ? 'bg-orange-500 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}>
          ✅ Actives ({activeProperties.length})
        </button>
        <button onClick={() => setActiveTab('sold')}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'sold' 
              ? 'bg-orange-500 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}>
          🏠 Vendues/Louées ({soldProperties.length})
        </button>
      </div>

      {/* Liste des annonces */}
      <div className="space-y-3">
        {(activeTab === 'active' ? activeProperties : soldProperties).map(property => (
          <div key={property.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800">{property.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    property.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {property.status === 'active' ? 'Active' : 'Vendue'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{property.price}</p>
                
                {/* Mini stats */}
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><FaEye className="text-blue-500" /> {property.views.toLocaleString()} vues</span>
                  <span className="flex items-center gap-1"><FaPhone className="text-orange-500" /> {property.calls} appels</span>
                  <span className="flex items-center gap-1"><FaWhatsapp className="text-green-500" /> {property.whatsapp} WhatsApp</span>
                  <span className="flex items-center gap-1">❤️ {property.favorites} favoris</span>
                  {property.status === 'active' && (
                    <span className="flex items-center gap-1">⏰ Expire dans {property.expiresIn} jours</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {property.status === 'active' ? (
                  <>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Modifier">
                      <FaEdit />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Marquer comme vendu">
                      <FaCheckCircle />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                    Archivée
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lien rapide */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-gray-800 mb-2">🚀 Prêt à publier un nouveau bien ?</h3>
        <p className="text-sm text-gray-500 mb-4">Ajoutez une nouvelle annonce en quelques minutes</p>
        <Link href="/admin/properties/add" className="btn-primary inline-flex items-center gap-2">
          <FaPlus /> Publier un bien
        </Link>
      </div>
    </div>
  )
}
