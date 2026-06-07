'use client'

import { useState } from 'react'
import { FaMoneyBill, FaRocket, FaCamera, FaUsers, FaChartLine, FaArrowUp } from 'react-icons/fa'

export default function RevenuePage() {
  const [period, setPeriod] = useState('month')

  const revenueStreams = [
    { name: 'Commissions ventes', amount: 2550000, percent: 58, icon: FaMoneyBill, color: 'bg-green-500' },
    { name: 'Abonnements Pro', amount: 500000, percent: 12, icon: FaUsers, color: 'bg-blue-500' },
    { name: 'Boosts annonces', amount: 450000, percent: 10, icon: FaRocket, color: 'bg-orange-500' },
    { name: 'Service photo', amount: 350000, percent: 8, icon: FaCamera, color: 'bg-purple-500' },
    { name: 'Abonnements Agence', amount: 500000, percent: 12, icon: FaChartLine, color: 'bg-indigo-500' },
  ]

  const totalRevenue = revenueStreams.reduce((sum, r) => sum + r.amount, 0)

  const monthlyData = [
    { month: 'Janvier', revenue: 3200000 },
    { month: 'Février', revenue: 3800000 },
    { month: 'Mars', revenue: 4100000 },
    { month: 'Avril', revenue: 4350000 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">💰 Revenus</h1>
          <p className="text-gray-500 text-sm mt-1">Vue d&apos;ensemble de vos gains</p>
        </div>
        <select value={period} onChange={e => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm">
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
        <p className="text-green-100 text-sm">Revenu total ({period === 'month' ? 'ce mois' : period === 'week' ? 'cette semaine' : 'cette année'})</p>
        <p className="text-5xl font-black mt-2">{totalRevenue.toLocaleString()} FCFA</p>
        <p className="text-green-100 text-sm mt-2 flex items-center gap-1">
          <FaArrowUp /> +15% vs mois dernier
        </p>
      </div>

      {/* Répartition */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">📊 Répartition des revenus</h3>
        <div className="space-y-4">
          {revenueStreams.map(stream => (
            <div key={stream.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stream.color}`} />
                  <span className="text-sm font-medium">{stream.name}</span>
                </div>
                <span className="text-sm font-bold">{stream.amount.toLocaleString()} FCFA ({stream.percent}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${stream.color}`} style={{ width: `${stream.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Évolution */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">📈 Évolution mensuelle</h3>
        <div className="space-y-3">
          {monthlyData.map(data => {
            const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))
            const percent = Math.round((data.revenue / maxRevenue) * 100)
            return (
              <div key={data.month} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-20">{data.month}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
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

      {/* Résumé */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1">🏠</div>
          <div className="font-bold">12</div>
          <div className="text-xs text-gray-500">Biens vendus</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1">⭐</div>
          <div className="font-bold">8</div>
          <div className="text-xs text-gray-500">Abonnés Pro</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1">🚀</div>
          <div className="font-bold">15</div>
          <div className="text-xs text-gray-500">Boosts vendus</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1">📸</div>
          <div className="font-bold">3</div>
          <div className="text-xs text-gray-500">Shooting photo</div>
        </div>
      </div>
    </div>
  )
}
