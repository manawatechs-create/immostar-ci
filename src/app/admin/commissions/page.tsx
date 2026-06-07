'use client'

import { useState } from 'react'
import { FaMoneyBill, FaPercentage, FaChartLine } from 'react-icons/fa'

export default function CommissionsPage() {
  const [period, setPeriod] = useState('month')

  const stats = [
    { label: 'Commissions totales', value: '4 500 000 FCFA', change: '+15%', icon: FaMoneyBill, color: 'from-green-500 to-emerald-600' },
    { label: 'Taux moyen', value: '3.2%', change: 'Stable', icon: FaPercentage, color: 'from-blue-500 to-blue-600' },
    { label: 'Transactions', value: '12', change: '+3', icon: FaChartLine, color: 'from-purple-500 to-purple-600' },
  ]

  const transactions = [
    { id: 1, property: 'Villa Cocody', price: '85,000,000', commission: '2,550,000', rate: '3%', date: '2025-01-15', status: 'Payée' },
    { id: 2, property: 'Duplex Bassam', price: '65,000,000', commission: '1,950,000', rate: '3%', date: '2025-01-10', status: 'En attente' },
    { id: 3, property: 'Appartement Plateau', price: '450,000/mois', commission: '90,000', rate: '20%', date: '2025-01-08', status: 'Payée' },
    { id: 4, property: 'Terrain Yamoussoukro', price: '15,000,000', commission: '750,000', rate: '5%', date: '2025-01-05', status: 'Payée' },
  ]

  const totalCommission = transactions
    .filter(t => t.status === 'Payée')
    .reduce((sum, t) => sum + parseInt(t.commission.replace(/[^0-9]/g, '')), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">💰 Commissions</h1>
          <p className="text-gray-500 text-sm mt-1">Suivi des revenus et commissions</p>
        </div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm">
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <span className="text-xs font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Total encaissé */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
        <p className="text-sm text-green-100">Total commissions encaissées</p>
        <p className="text-4xl font-black mt-2">{totalCommission.toLocaleString()} FCFA</p>
      </div>

      {/* Tableau des transactions */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-bold text-gray-800">Historique des commissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Bien</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Prix de vente</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Commission</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Taux</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{t.property}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.price}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{t.commission} FCFA</td>
                  <td className="px-6 py-4 text-sm">{t.rate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.status === 'Payée' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {t.status}
                    </span>
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
