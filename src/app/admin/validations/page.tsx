'use client'

import { useState } from 'react'
import { FaCheck, FaTimes, FaEye, FaPhone, FaWhatsapp, FaSearch } from 'react-icons/fa'

export default function ValidationsPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const declarations = [
    { id: 1, property: 'Villa Moderne Cocody', seller: 'M. Kouadio', sellerPhone: '+225 07 00 00 01', buyer: 'M. Koné', price: '82 000 000 FCFA', commission: '2 460 000 FCFA', date: '2025-01-15', status: 'pending', proofs: ['contrat.pdf'] },
    { id: 2, property: 'Duplex Grand-Bassam', seller: 'Agence ImmoPlus', sellerPhone: '+225 07 00 00 02', buyer: 'Mme. Bamba', price: '63 000 000 FCFA', commission: '1 890 000 FCFA', date: '2025-01-10', status: 'validated', proofs: ['attestation.pdf'] },
    { id: 3, property: 'Terrain Yamoussoukro', seller: 'M. Touré', sellerPhone: '+225 07 00 00 03', buyer: 'M. Ouattara', price: '14 500 000 FCFA', commission: '435 000 FCFA', date: '2025-01-08', status: 'rejected', proofs: [], rejectReason: 'Document insuffisant' },
  ]

  const filtered = declarations.filter(d => {
    if (filter === 'pending') return d.status === 'pending'
    if (filter === 'validated') return d.status === 'validated'
    if (filter === 'rejected') return d.status === 'rejected'
    if (search) return d.property.toLowerCase().includes(search.toLowerCase()) || d.seller.toLowerCase().includes(search.toLowerCase())
    return true
  })

  const totalPending = declarations.filter(d => d.status === 'pending').length
  const totalCommission = declarations.filter(d => d.status === 'validated').reduce((sum, d) => sum + parseInt(d.commission.replace(/[^0-9]/g, '')), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">✅ Validation des ventes</h1>
          <p className="text-gray-500 text-sm mt-1">{totalPending} déclaration(s) en attente</p>
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-semibold">
          💰 {totalCommission.toLocaleString()} FCFA validés
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm" />
        </div>
        {['all','pending','validated','rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-xs font-medium ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
            {f === 'all' ? 'Tous' : f === 'pending' ? '⏳ En attente' : f === 'validated' ? '✅ Validés' : '❌ Rejetés'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 text-xs font-semibold">Bien</th>
            <th className="px-4 py-3 text-xs font-semibold">Vendeur</th>
            <th className="px-4 py-3 text-xs font-semibold">Prix</th>
            <th className="px-4 py-3 text-xs font-semibold">Commission</th>
            <th className="px-4 py-3 text-xs font-semibold">Date</th>
            <th className="px-4 py-3 text-xs font-semibold">Statut</th>
            <th className="px-4 py-3 text-xs font-semibold">Actions</th>
          </tr></thead>
          <tbody className="divide-y">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{d.property}</td>
                <td className="px-4 py-3 text-sm">{d.seller}<div className="text-xs text-gray-400">{d.sellerPhone}</div></td>
                <td className="px-4 py-3 text-sm">{d.price}</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">{d.commission}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{d.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    d.status === 'validated' ? 'bg-green-100 text-green-700' : d.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {d.status === 'validated' ? '✅ Validé' : d.status === 'rejected' ? '❌ Rejeté' : '⏳ En attente'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {d.status === 'pending' && (
                      <>
                        <button className="p-1.5 bg-green-100 text-green-600 rounded-lg"><FaCheck className="text-xs" /></button>
                        <button className="p-1.5 bg-red-100 text-red-600 rounded-lg"><FaTimes className="text-xs" /></button>
                      </>
                    )}
                    <a href={`tel:${d.sellerPhone}`} className="p-1.5 bg-orange-100 text-orange-600 rounded-lg"><FaPhone className="text-xs" /></a>
                    <a href={`https://wa.me/${d.sellerPhone?.replace(/[\s+]/g, '')}`} target="_blank" className="p-1.5 bg-green-100 text-green-600 rounded-lg"><FaWhatsapp className="text-xs" /></a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
