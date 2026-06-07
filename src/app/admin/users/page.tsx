'use client'

import { useState } from 'react'
import { FaSearch, FaPhone, FaEnvelope, FaMoneyBill, FaCheck, FaTimes, FaEye, FaFilter } from 'react-icons/fa'
import Link from 'next/link'

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const users = [
    {
      id: 1,
      name: 'M. Kouadio',
      email: 'kouadio@email.com',
      phone: '+225 07 00 00 01',
      type: 'owner',
      registeredAt: '2025-01-10',
      totalProperties: 3,
      soldProperties: 1,
      totalCommissionDue: 2550000,
      commissionPaid: 2550000,
      commissionPending: 0,
      properties: [
        { id: 1, title: 'Villa Moderne Cocody', status: 'sold', price: 85000000, commission: 2550000, paid: true },
        { id: 4, title: 'Appartement Cocody', status: 'active', price: 35000000, commission: 0, paid: false },
      ]
    },
    {
      id: 2,
      name: 'Agence ImmoPlus',
      email: 'contact@immoplus.ci',
      phone: '+225 07 00 00 02',
      type: 'agency',
      registeredAt: '2025-01-05',
      totalProperties: 5,
      soldProperties: 2,
      totalCommissionDue: 4450000,
      commissionPaid: 1950000,
      commissionPending: 2500000,
      properties: [
        { id: 2, title: 'Duplex Bassam', status: 'sold', price: 65000000, commission: 1950000, paid: true },
        { id: 6, title: 'Immeuble Plateau', status: 'sold', price: 250000000, commission: 2500000, paid: false },
      ]
    },
    {
      id: 3,
      name: 'Mme. Koné',
      email: 'kone@email.com',
      phone: '+225 07 00 00 03',
      type: 'owner',
      registeredAt: '2025-01-18',
      totalProperties: 1,
      soldProperties: 0,
      totalCommissionDue: 0,
      commissionPaid: 0,
      commissionPending: 0,
      properties: [
        { id: 3, title: 'Studio Marcory', status: 'active', price: 250000, commission: 0, paid: false },
      ]
    },
  ]

  const filteredUsers = users.filter(u => {
    if (filter === 'owner') return u.type === 'owner'
    if (filter === 'agency') return u.type === 'agency'
    if (filter === 'debt') return u.commissionPending > 0
    if (search) return u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    return true
  })

  const totalCommissionPending = users.reduce((sum, u) => sum + u.commissionPending, 0)
  const totalCommissionCollected = users.reduce((sum, u) => sum + u.commissionPaid, 0)

  const handleViewDetails = (user: any) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">👥 Utilisateurs & Commissions</h1>
          <p className="text-gray-500 text-sm mt-1">
            {users.length} utilisateurs inscrits • {users.filter(u => u.type === 'agency').length} agences
          </p>
        </div>
      </div>

      {/* Stats commissions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">Commissions en attente</div>
          <div className="text-2xl font-bold text-red-600">{totalCommissionPending.toLocaleString()} FCFA</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">Commissions encaissées</div>
          <div className="text-2xl font-bold text-green-600">{totalCommissionCollected.toLocaleString()} FCFA</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">Propriétaires</div>
          <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.type === 'owner').length}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">Agences</div>
          <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.type === 'agency').length}</div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'owner', label: '🏠 Propriétaires' },
            { value: 'agency', label: '🏢 Agences' },
            { value: 'debt', label: '💰 Doit de l\'argent' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === f.value ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Utilisateur</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Biens</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Vendus</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Commission due</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Payé</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Inscription</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 ${user.commissionPending > 0 ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800 text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="flex items-center gap-1"><FaEnvelope className="text-xs" /> {user.email}</span>
                      <span className="flex items-center gap-1"><FaPhone className="text-xs" /> {user.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.type === 'agency' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.type === 'agency' ? 'Agence' : 'Propriétaire'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">{user.totalProperties}</td>
                  <td className="px-4 py-3 text-sm text-center">{user.soldProperties}</td>
                  <td className="px-4 py-3">
                    {user.commissionPending > 0 ? (
                      <span className="text-sm font-bold text-red-600">{user.commissionPending.toLocaleString()} FCFA</span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-green-600">{user.commissionPaid.toLocaleString()} FCFA</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{user.registeredAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        title="Voir détails"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      {user.commissionPending > 0 && (
                        <>
                          <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="Marquer payé">
                            <FaCheck className="text-xs" />
                          </button>
                          <a href={`tel:${user.phone}`} className="p-1.5 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200" title="Appeler">
                            <FaPhone className="text-xs" />
                          </a>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal détails utilisateur */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                👤 {selectedUser.name}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-medium">{selectedUser.email}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-500">Téléphone</div>
                <div className="font-medium">{selectedUser.phone}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-500">Type</div>
                <div className="font-medium">{selectedUser.type === 'agency' ? 'Agence' : 'Propriétaire'}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-500">Inscrit le</div>
                <div className="font-medium">{selectedUser.registeredAt}</div>
              </div>
            </div>

            <h4 className="font-bold text-gray-800 mb-3">🏠 Biens publiés</h4>
            <div className="space-y-2">
              {selectedUser.properties.map((property: any) => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-sm">{property.title}</div>
                    <div className="text-xs text-gray-500">{property.price.toLocaleString()} FCFA</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      property.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {property.status === 'sold' ? 'Vendu' : 'Actif'}
                    </span>
                    {property.status === 'sold' && (
                      <div className={`text-xs mt-1 ${property.paid ? 'text-green-600' : 'text-red-600'}`}>
                        Commission: {property.commission.toLocaleString()} FCFA
                        {property.paid ? ' ✅ Payé' : ' ❌ En attente'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-orange-50 rounded-xl">
              <div className="flex justify-between text-sm">
                <span>Total commissions dues :</span>
                <span className="font-bold text-red-600">{selectedUser.commissionPending.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Total commissions payées :</span>
                <span className="font-bold text-green-600">{selectedUser.commissionPaid.toLocaleString()} FCFA</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {selectedUser.commissionPending > 0 && (
                <button className="flex-1 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600">
                  ✅ Marquer tout comme payé
                </button>
              )}
              <a href={`tel:${selectedUser.phone}`} className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 text-center">
                📞 Appeler
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
