'use client'

import { useState } from 'react'
import { FaExclamationTriangle, FaSearch, FaPhone, FaWhatsapp, FaEye, FaBan, FaCheck, FaClock, FaEnvelope } from 'react-icons/fa'

export default function FraudDetectionPage() {
  const [filter, setFilter] = useState('suspicious')

  // Biens suspects (inactifs depuis longtemps, prix modifié, etc.)
  const suspiciousProperties = [
    {
      id: 1,
      title: 'Villa Cocody',
      owner: 'M. Kouadio',
      phone: '+225 07 00 00 01',
      price: '85 000 000 FCFA',
      status: 'suspicious',
      lastActivity: '2025-01-05',
      daysInactive: 25,
      alertReason: 'Inactif depuis 25 jours - Possiblement vendu',
      autoCheck: 'failed',
      attempts: 2,
    },
    {
      id: 2,
      title: 'Appartement Plateau',
      owner: 'Mme. Koné',
      phone: '+225 07 00 00 02',
      price: '45 000 000 FCFA',
      status: 'suspicious',
      lastActivity: '2025-01-10',
      daysInactive: 20,
      alertReason: 'Prix modifié 3 fois en 1 semaine - Négociation en cours ?',
      autoCheck: 'pending',
      attempts: 1,
    },
    {
      id: 3,
      title: 'Duplex Bassam',
      owner: 'Agence ImmoPlus',
      phone: '+225 07 00 00 03',
      price: '65 000 000 FCFA',
      status: 'suspicious',
      lastActivity: '2024-12-20',
      daysInactive: 41,
      alertReason: 'Plus de 40 jours sans activité - Probablement vendu',
      autoCheck: 'failed',
      attempts: 3,
    },
    {
      id: 4,
      title: 'Terrain Yamoussoukro',
      owner: 'M. Touré',
      phone: '+225 07 00 00 04',
      price: '15 000 000 FCFA',
      status: 'normal',
      lastActivity: '2025-01-25',
      daysInactive: 5,
      alertReason: '',
      autoCheck: 'passed',
      attempts: 0,
    },
  ]

  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [relanceMessage, setRelanceMessage] = useState('')

  const handleRelance = (property: any) => {
    setSelectedProperty(property)
    setRelanceMessage(
      `Bonjour ${property.owner},\n\nNous avons remarqué que votre bien "${property.title}" n'a pas eu d'activité depuis ${property.daysInactive} jours.\n\nSi ce bien a été vendu via ImmoStar, merci de le déclarer ici : https://immostar.ci/confirm-sale\n\nLa commission de 3% s'applique uniquement si la vente a été réalisée grâce à notre plateforme.\n\nCordialement,\nL'équipe ImmoStar`
    )
    setShowModal(true)
  }

  const sendRelance = (method: 'whatsapp' | 'sms' | 'email') => {
    alert(`📨 Relance envoyée par ${method} à ${selectedProperty?.owner}`)
    setShowModal(false)
  }

  const markAsSold = (id: number) => {
    alert(`⚠️ Bien #${id} marqué comme "vendu hors plateforme". Commission de 3% sera réclamée.`)
  }

  const blockProperty = (id: number) => {
    alert(`🚫 Bien #${id} bloqué. Le propriétaire doit confirmer le statut pour le réactiver.`)
  }

  const stats = [
    { label: 'Biens suspects', value: suspiciousProperties.filter(p => p.status === 'suspicious').length, color: 'text-red-600', icon: FaExclamationTriangle },
    { label: 'Vérifications auto', value: '12/jour', color: 'text-blue-600', icon: FaSearch },
    { label: 'Relances envoyées', value: '8 ce mois', color: 'text-orange-600', icon: FaEnvelope },
    { label: 'Commissions récupérées', value: '3 200 000 FCFA', color: 'text-green-600', icon: FaCheck },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🔍 Détection de fraudes</h1>
          <p className="text-gray-500 text-sm mt-1">Surveillez les biens potentiellement vendus sans déclaration</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
            <stat.icon className={`text-2xl ${stat.color} mb-2`} />
            <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Algorithme de détection */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
        <h2 className="font-bold text-gray-800 mb-3">🤖 Algorithme de détection automatique</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {[
            '⏰ Inactif > 15 jours',
            '💰 Prix modifié > 3 fois',
            '📞 Propriétaire injoignable',
            '🔕 Bien mis en "invisible"',
            '📸 Photos supprimées',
            '📝 Description raccourcie',
            '🚫 Compte inactif',
            '📊 Baisse de vues soudaine',
          ].map((rule, i) => (
            <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-2">
              <span className="text-lg">{rule.split(' ')[0]}</span>
              <span className="text-gray-700">{rule.substring(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Liste des biens suspects */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col sm:flex-row gap-3 justify-between">
          <h2 className="font-bold text-gray-800">Biens sous surveillance</h2>
          <div className="flex gap-2">
            {['all', 'suspicious', 'normal'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                {f === 'all' ? 'Tous' : f === 'suspicious' ? '⚠️ Suspects' : '✅ Normaux'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Bien</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Propriétaire</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Inactif</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Alerte</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Tentatives</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {suspiciousProperties
                .filter(p => filter === 'all' || p.status === filter)
                .map((property) => (
                <tr key={property.id} className={`hover:bg-gray-50 ${property.daysInactive > 30 ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800 text-sm">{property.title}</div>
                    <div className="text-xs text-gray-500">{property.price}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{property.owner}</div>
                    <div className="text-xs text-gray-500">{property.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.daysInactive > 30 ? 'bg-red-100 text-red-700' :
                      property.daysInactive > 15 ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {property.daysInactive} jours
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-red-600">{property.alertReason || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">{property.attempts}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleRelance(property)}
                        className="p-1.5 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200" title="Relancer">
                        <FaPhone className="text-xs" />
                      </button>
                      <a href={`https://wa.me/${property.phone?.replace(/[\s+]/g, '')}`} target="_blank"
                        className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="WhatsApp">
                        <FaWhatsapp className="text-xs" />
                      </a>
                      <button onClick={() => markAsSold(property.id)}
                        className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Marquer comme vendu">
                        <FaBan className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de relance */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📨 Relancer le propriétaire</h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedProperty.owner} - {selectedProperty.title}
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <textarea
                rows={6}
                value={relanceMessage}
                onChange={(e) => setRelanceMessage(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-700 outline-none resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={() => sendRelance('whatsapp')}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
                <FaWhatsapp /> WhatsApp
              </button>
              <button onClick={() => sendRelance('sms')}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                <FaPhone /> SMS
              </button>
              <button onClick={() => sendRelance('email')}
                className="flex-1 py-2.5 bg-gray-600 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 flex items-center justify-center gap-2">
                <FaEnvelope /> Email
              </button>
            </div>

            <button onClick={() => setShowModal(false)}
              className="w-full mt-3 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
