'use client'

import { useState } from 'react'
import { FaCheck, FaTimes, FaEye, FaFileDownload, FaPhone, FaWhatsapp } from 'react-icons/fa'

export default function ValidationsPage() {
  const [filter, setFilter] = useState('all')

  const declarations = [
    {
      id: 1,
      property: 'Villa Moderne Cocody',
      seller: 'M. Kouadio',
      sellerPhone: '+225 07 00 00 01',
      buyer: 'M. Koné',
      price: '82,000,000 FCFA',
      commission: '2,460,000 FCFA',
      date: '2025-01-15',
      status: 'pending',
      proofs: ['contrat.pdf', 'virement.jpg'],
    },
    {
      id: 2,
      property: 'Duplex Grand-Bassam',
      seller: 'Agence ImmoPlus',
      sellerPhone: '+225 07 00 00 02',
      buyer: 'Mme. Bamba',
      price: '63,000,000 FCFA',
      commission: '1,890,000 FCFA',
      date: '2025-01-10',
      status: 'validated',
      proofs: ['attestation.pdf'],
    },
    {
      id: 3,
      property: 'Terrain Yamoussoukro',
      seller: 'M. Touré',
      sellerPhone: '+225 07 00 00 03',
      buyer: 'M. Ouattara',
      price: '14,500,000 FCFA',
      commission: '435,000 FCFA',
      date: '2025-01-08',
      status: 'rejected',
      proofs: [],
      rejectReason: 'Document insuffisant',
    },
  ]

  const [selectedDeclaration, setSelectedDeclaration] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const handleValidate = (id: number) => {
    alert('✅ Déclaration #' + id + ' validée ! Commission de ' + declarations.find(d => d.id === id)?.commission + ' à percevoir.')
  }

  const handleReject = (id: number) => {
    const reason = prompt('Motif du rejet :')
    if (reason) {
      alert('❌ Déclaration #' + id + ' rejetée. Motif : ' + reason)
    }
  }

  const totalPending = declarations.filter(d => d.status === 'pending').length
  const totalCommission = declarations
    .filter(d => d.status === 'validated')
    .reduce((sum, d) => sum + parseInt(d.commission.replace(/[^0-9]/g, '')), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">✅ Validation des ventes</h1>
          <p className="text-gray-500 text-sm mt-1">{totalPending} déclaration(s) en attente</p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-semibold">
            💰 {totalCommission.toLocaleString()} FCFA validés
          </span>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-3">
        {['all', 'pending', 'validated', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {f === 'all' ? 'Toutes' : f === 'pending' ? '⏳ En attente' : f === 'validated' ? '✅ Validées' : '❌ Rejetées'}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Bien</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Vendeur</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Prix</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Commission</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Statut</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {declarations
                .filter(d => filter === 'all' || d.status === filter)
                .map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{d.property}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{d.seller}</div>
                    <div className="text-xs text-gray-500">{d.sellerPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{d.price}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{d.commission}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{d.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      d.status === 'validated' ? 'bg-green-100 text-green-700' :
                      d.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {d.status === 'validated' ? '✅ Validé' : d.status === 'rejected' ? '❌ Rejeté' : '⏳ En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {d.status === 'pending' && (
                        <>
                          <button onClick={() => handleValidate(d.id)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="Valider">
                            <FaCheck className="text-sm" />
                          </button>
                          <button onClick={() => handleReject(d.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Rejeter">
                            <FaTimes className="text-sm" />
                          </button>
                        </>
                      )}
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200" title="Voir détails">
                        <FaEye className="text-sm" />
                      </button>
                      {d.proofs.length > 0 && (
                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" title="Télécharger preuves">
                          <FaFileDownload className="text-sm" />
                        </button>
                      )}
                      <a href={`https://wa.me/${d.sellerPhone?.replace(/[\s+]/g, '')}`} target="_blank"
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="Contacter vendeur">
                        <FaWhatsapp className="text-sm" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Commissions en attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {declarations.filter(d => d.status === 'pending')
              .reduce((sum, d) => sum + parseInt(d.commission.replace(/[^0-9]/g, '')), 0)
              .toLocaleString()} FCFA
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Commissions encaissées</p>
          <p className="text-2xl font-bold text-green-600">{totalCommission.toLocaleString()} FCFA</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Taux de validation</p>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round((declarations.filter(d => d.status === 'validated').length / declarations.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  )
}
