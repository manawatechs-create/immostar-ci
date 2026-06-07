'use client'
import { FaMoneyBill } from 'react-icons/fa'

export default function TransactionsPage() {
  const transactions = [
    { id: 1, property: 'Villa Cocody', buyer: 'M. Kouadio', amount: '85,000,000 FCFA', commission: '4,250,000 FCFA', date: '2025-01-15', status: 'completed' },
    { id: 2, property: 'Duplex Bassam', buyer: 'Mme. Koné', amount: '65,000,000 FCFA', commission: '3,250,000 FCFA', date: '2025-01-10', status: 'pending' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">{transactions.length} transactions</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Bien</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Acheteur</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Montant</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Commission</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{t.property}</td>
                <td className="px-6 py-4 text-sm">{t.buyer}</td>
                <td className="px-6 py-4 text-sm font-medium">{t.amount}</td>
                <td className="px-6 py-4 text-sm text-green-600">{t.commission}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {t.status === 'completed' ? 'Terminé' : 'En cours'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
