'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaBuilding, FaMoneyBill, FaEye, FaUsers, FaArrowUp, FaPlus, FaRocket, FaChartLine } from 'react-icons/fa'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('today')

  const stats = [
    { label: 'Annonces actives', value: 8, change: '+2', icon: FaBuilding, gradient: 'from-blue-500 to-cyan-500', link: '/admin/my-properties' },
    { label: 'Vues aujourd\'hui', value: '234', change: '+45', icon: FaEye, gradient: 'from-green-500 to-emerald-500', link: '#' },
    { label: 'Commissions', value: '4.5M FCFA', change: '+15%', icon: FaMoneyBill, gradient: 'from-purple-500 to-pink-500', link: '/admin/commissions' },
    { label: 'Utilisateurs', value: '23', change: '+3', icon: FaUsers, gradient: 'from-orange-500 to-rose-500', link: '/admin/users' },
  ]

  const quickActions = [
    { label: 'Publier un bien', icon: FaPlus, link: '/admin/properties/add', gradient: 'from-green-500 to-emerald-500' },
    { label: 'Mes annonces', icon: FaBuilding, link: '/admin/my-properties', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Booster', icon: FaRocket, link: '/admin/boost', gradient: 'from-purple-500 to-pink-500' },
    { label: 'Voir le site', icon: FaEye, link: '/', gradient: 'from-orange-500 to-rose-500', external: true },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
          <p className="text-slate-400 text-sm mt-1">Vue d&apos;ensemble de votre activité</p>
        </div>
        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="today">Aujourd&apos;hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.link}
            target={action.external ? '_blank' : undefined}
            className={`bg-gradient-to-br ${action.gradient} rounded-2xl p-4 text-center text-white hover:shadow-lg hover:-translate-y-1 transition-all`}
          >
            <action.icon className="text-2xl mx-auto mb-2" />
            <span className="text-sm font-semibold">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.link}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-5 hover:border-slate-600 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white text-lg" />
              </div>
              <span className="text-xs font-medium text-green-400 flex items-center gap-1">
                <FaArrowUp className="text-xs" /> {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
              {stat.value}
            </div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Activités récentes */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <h2 className="text-lg font-bold text-white mb-4">Activités récentes</h2>
        <div className="space-y-3">
          {[
            { action: 'Nouvelle annonce publiée', detail: 'Villa Cocody', time: 'Il y a 2h', icon: '🏠' },
            { action: 'Contact reçu', detail: 'Pour Appartement Plateau', time: 'Il y a 5h', icon: '📞' },
            { action: 'Annonce boostée', detail: 'Duplex Bassam', time: 'Il y a 1j', icon: '🚀' },
            { action: 'Nouvel utilisateur inscrit', detail: 'Mme. Koné', time: 'Il y a 2j', icon: '👤' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-xl">
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-white text-sm">{activity.action}</div>
                <div className="text-xs text-slate-400">{activity.detail}</div>
              </div>
              <span className="text-xs text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
