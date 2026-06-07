'use client'

import { useState } from 'react'
import { FaLink, FaCopy, FaQrcode, FaChartLine, FaCheck, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

export default function TrackingPage() {
  const [activeTab, setActiveTab] = useState('links')

  const trackingLinks = [
    {
      id: 1,
      property: 'Villa Moderne Cocody',
      owner: 'M. Kouadio',
      uniqueCode: 'IMMO-VC-001',
      trackingUrl: 'https://immostar.ci/p/IMMO-VC-001',
      views: 234,
      contacts: 12,
      salesDeclared: 1,
      platformSold: 'ImmoStar',
      commission: '2 550 000 FCFA',
      status: 'sold_here',
    },
    {
      id: 2,
      property: 'Appartement Plateau',
      owner: 'Mme. Koné',
      uniqueCode: 'IMMO-AP-002',
      trackingUrl: 'https://immostar.ci/p/IMMO-AP-002',
      views: 156,
      contacts: 8,
      salesDeclared: 1,
      platformSold: 'Autre (Jumia)',
      commission: '0 FCFA',
      status: 'sold_elsewhere',
      proof: 'Lien Jumia: jumia.ci/annonce-123',
    },
    {
      id: 3,
      property: 'Duplex Grand-Bassam',
      owner: 'Agence ImmoPlus',
      uniqueCode: 'IMMO-DB-003',
      trackingUrl: 'https://immostar.ci/p/IMMO-DB-003',
      views: 312,
      contacts: 25,
      salesDeclared: 1,
      platformSold: 'ImmoStar',
      commission: '1 950 000 FCFA',
      status: 'sold_here',
    },
    {
      id: 4,
      property: 'Studio Marcory',
      owner: 'M. Touré',
      uniqueCode: 'IMMO-SM-004',
      trackingUrl: 'https://immostar.ci/p/IMMO-SM-004',
      views: 89,
      contacts: 3,
      salesDeclared: 0,
      platformSold: 'En attente',
      commission: '—',
      status: 'active',
    },
  ]

  const stats = [
    { label: 'Ventes via ImmoStar', value: 2, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Ventes ailleurs', value: 1, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'En cours', value: 1, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Commissions dues', value: '4 400 000 FCFA', color: 'text-purple-600', bg: 'bg-purple-100' },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('✅ Lien copié !')
  }

  const generateQRCode = (code: string) => {
    alert(`📱 QR Code généré pour ${code}\nURL: https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://immostar.ci/p/${code}`)
  }

  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)

  const handleVerify = (property: any) => {
    setSelectedProperty(property)
    setShowVerificationModal(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">🔗 Traçage des ventes</h1>
        <p className="text-gray-500 text-sm mt-1">Suivez l'origine de chaque vente avec des codes uniques</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Comment ça marche */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="font-bold text-gray-800 mb-4">🔍 Comment tracer une vente ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="font-bold text-sm mb-1">1. Lien unique</h3>
            <p className="text-xs text-gray-500">Chaque bien a un lien traçant unique partagé au propriétaire</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-bold text-sm mb-1">2. QR Code</h3>
            <p className="text-xs text-gray-500">QR Code sur l'annonce pour tracer les visites physiques</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold text-sm mb-1">3. Vérification</h3>
            <p className="text-xs text-gray-500">L'acheteur confirme avoir trouvé le bien via ImmoStar</p>
          </div>
        </div>
      </div>

      {/* Tableau de tracking */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-bold text-gray-800">Suivi des biens</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Code unique</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Bien</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Vues</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Contacts</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Vendu via</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Commission</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trackingLinks.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 ${
                  item.status === 'sold_elsewhere' ? 'bg-orange-50/30' :
                  item.status === 'sold_here' ? 'bg-green-50/30' : ''
                }`}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{item.uniqueCode}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{item.property}</td>
                  <td className="px-4 py-3 text-sm">{item.views}</td>
                  <td className="px-4 py-3 text-sm">{item.contacts}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'sold_here' ? 'bg-green-100 text-green-700' :
                      item.status === 'sold_elsewhere' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.platformSold}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    <span className={item.status === 'sold_elsewhere' ? 'text-gray-400' : 'text-green-600'}>
                      {item.commission}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => copyToClipboard(item.trackingUrl)}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200" title="Copier lien">
                        <FaCopy className="text-xs" />
                      </button>
                      <button onClick={() => generateQRCode(item.uniqueCode)}
                        className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200" title="QR Code">
                        <FaQrcode className="text-xs" />
                      </button>
                      <button onClick={() => handleVerify(item)}
                        className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="Vérifier vente">
                        <FaCheck className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de vérification */}
      {showVerificationModal && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Vérifier l'origine de la vente</h3>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium">{selectedProperty.property}</p>
              <p className="text-xs text-gray-500 mt-1">Code : {selectedProperty.uniqueCode}</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-gray-700">Comment le bien a-t-il été vendu ?</p>
              
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-green-50">
                <input type="radio" name="origin" className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium">✅ Via ImmoStar</span>
                  <p className="text-xs text-gray-500">L'acheteur a trouvé le bien sur notre plateforme</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50">
                <input type="radio" name="origin" className="w-4 h-4 text-orange-600" />
                <div>
                  <span className="text-sm font-medium">🔄 Via une autre plateforme</span>
                  <p className="text-xs text-gray-500">Précisez laquelle :</p>
                  <input type="text" placeholder="Ex: Jumia, Facebook Marketplace..." 
                    className="input-field mt-2 text-sm" />
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50">
                <input type="radio" name="origin" className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium">🤝 Bouche-à-oreille / Connaissance</span>
                  <p className="text-xs text-gray-500">Vente hors plateforme</p>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowVerificationModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={() => {
                alert('✅ Vérification enregistrée !')
                setShowVerificationModal(false)
              }} className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clause CGU */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h2 className="font-bold text-gray-800 mb-2">⚖️ Clause dans les CGU</h2>
        <p className="text-sm text-gray-600 mb-3">
          Chaque propriétaire accepte que :
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">📌</span>
            Le lien de tracking ImmoStar est la propriété de la plateforme
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">📌</span>
            Toute vente où l'acheteur a utilisé le lien ImmoStar est soumise à commission
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">📌</span>
            En cas de litige, les logs de traçage font foi
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">📌</span>
            Le propriétaire doit notifier ImmoStar sous 7 jours en cas de vente
          </li>
        </ul>
      </div>
    </div>
  )
}
