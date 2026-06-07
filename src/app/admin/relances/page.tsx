'use client'

import { useState } from 'react'
import { FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaCheck, FaTimes } from 'react-icons/fa'

export default function RelancesPage() {
  const [filter, setFilter] = useState('pending')

  const relances = [
    {
      id: 1,
      property: 'Villa Cocody',
      owner: 'M. Kouadio',
      phone: '+225 07 00 00 01',
      email: 'kouadio@email.com',
      type: 'auto',
      method: 'whatsapp',
      sentDate: '2025-01-25',
      status: 'pending',
      response: null,
      attempts: 1,
    },
    {
      id: 2,
      property: 'Duplex Bassam',
      owner: 'Agence ImmoPlus',
      phone: '+225 07 00 00 03',
      email: 'contact@immoplus.ci',
      type: 'manual',
      method: 'sms',
      sentDate: '2025-01-20',
      status: 'responded',
      response: 'Le bien est toujours disponible',
      attempts: 2,
    },
    {
      id: 3,
      property: 'Appartement Plateau',
      owner: 'Mme. Koné',
      phone: '+225 07 00 00 02',
      email: 'kone@email.com',
      type: 'auto',
      method: 'email',
      sentDate: '2025-01-15',
      status: 'no_response',
      response: null,
      attempts: 3,
    },
  ]

  const stats = {
    total: relances.length,
    pending: relances.filter(r => r.status === 'pending').length,
    responded: relances.filter(r => r.status === 'responded').length,
    noResponse: relances.filter(r => r.status === 'no_response').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">📨 Relances envoyées</h1>
        <p className="text-gray-500 text-sm mt-1">Suivi des relances pour les biens suspects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-500' },
          { label: 'En attente', value: stats.pending, color: 'bg-yellow-500' },
          { label: 'Répondu', value: stats.responded, color: 'bg-green-500' },
          { label: 'Sans réponse', value: stats.noResponse, color: 'bg-red-500' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-2xl shadow-sm p-4 text-white text-center`}>
            <div className="text-2xl font-black">{stat.value}</div>
            <div className="text-xs opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tableau des relances */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Bien</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Propriétaire</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Méthode</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Tentatives</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Statut</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Réponse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {relances.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{r.property}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{r.owner}</div>
                    <div className="text-xs text-gray-500">{r.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs">
                      {r.method === 'whatsapp' ? <FaWhatsapp className="text-green-600" /> :
                       r.method === 'sms' ? <FaPhone className="text-blue-600" /> :
                       <FaEnvelope className="text-gray-600" />}
                      {r.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{r.sentDate}</td>
                  <td className="px-4 py-3 text-sm text-center">{r.attempts}/3</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === 'responded' ? 'bg-green-100 text-green-700' :
                      r.status === 'no_response' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {r.status === 'responded' ? '✅ Répondu' :
                       r.status === 'no_response' ? '❌ Sans réponse' : '⏳ En attente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">
                    {r.response || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automatisation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="font-bold text-gray-800 mb-3">⚙️ Automatisation des relances</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-xl p-4">
            <FaClock className="text-blue-500 mb-2" />
            <p className="font-medium">Relance J+15</p>
            <p className="text-gray-500 text-xs">Message automatique WhatsApp</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <FaClock className="text-orange-500 mb-2" />
            <p className="font-medium">Relance J+30</p>
            <p className="text-gray-500 text-xs">SMS + Email avec lien déclaration</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <FaClock className="text-red-500 mb-2" />
            <p className="font-medium">Relance J+45</p>
            <p className="text-gray-500 text-xs">Appel téléphonique + menace suspension</p>
          </div>
        </div>
      </div>
    </div>
  )
}
