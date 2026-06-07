'use client'

import { useState } from 'react'
import { FaMoneyBill, FaArrowUp, FaDownload } from 'react-icons/fa'

export default function RevenuePage() {
  const [period, setPeriod] = useState('month')

  const revenueData = [
    { month: 'Jan', revenue: 3200000 },
    { month: 'Fév', revenue: 3800000 },
    { month: 'Mar', revenue: 4100000 },
    { month: 'Avr', revenue: 4500000 },
    { month: 'Mai', revenue: 5200000 },
    { month: 'Juin', revenue: 4800000 },
  ]

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0)

  const revenueSources = [
    { name: 'Commissions ventes', amount: 2550000, percent: 55, color: 'bg-green-500' },
    { name: 'Abonnements Pro', amount: 500000, percent: 11, color: 'bg-blue-500' },
    { name: 'Boosts annonces', amount: 450000, percent: 10, color: 'bg-orange-500' },
    { name: 'Service photo', amount: 350000, percent: 7, color: 'bg-purple-500' },
    { name: 'Abonnements Agence', amount: 500000, percent: 11, color: 'bg-indigo-500' },
    { name: 'Autres', amount: 300000, percent: 6, color: 'bg-gray-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📊 Revenus</h1>
          <p className="text-gray-500 text-sm mt-1">Suivi détaillé de vos gains</p>
        </div>
        <div className="flex gap-2">
          <select value={period} onChange={e => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm">
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="year">Année</option>
          </select>
          <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 flex items-center gap-2">
            <FaDownload /> Exporter
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
        <p className="text-green-100 text-sm">Revenu total ({period})</p>
        <p className="text-5xl font-black mt-2">{totalRevenue.toLocaleString()} FCFA</p>
        <p className="text-green-100 text-sm mt-2 flex items-center gap-1">
          <FaArrowUp /> +15% vs période précédente
        </p>
      </div>

      {/* Graphique */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-6">📈 Évolution mensuelle</h3>
        <div className="space-y-4">
          {revenueData.map(data => {
            const percent = Math.round((data.revenue / maxRevenue) * 100)
            return (
              <div key={data.month} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                    style={{ width: `${percent}%` }}
                  >
                    <span className="text-xs text-white font-bold">{data.revenue.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Répartition */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">🍰 Répartition des revenus</h3>
        <div className="space-y-3">
          {revenueSources.map(source => (
            <div key={source.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{source.name}</span>
                <span className="text-sm font-bold">{source.amount.toLocaleString()} FCFA ({source.percent}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${source.color}`} style={{ width: `${source.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
