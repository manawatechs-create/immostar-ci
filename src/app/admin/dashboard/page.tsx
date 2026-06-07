'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaBuilding, FaMoneyBill, FaEye, FaUsers, FaArrowUp, FaPlus, FaList, FaRocket, FaChartLine } from 'react-icons/fa'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('today')

  const stats = [
    { label: 'Annonces actives', value: 8, change: '+2', icon: FaBuilding, color: 'from-blue-500 to-blue-600', link: '/admin/my-properties' },
    { label: 'Vues aujourd\'hui', value: '234', change: '+45', icon: FaEye, color: 'from-green-500 to-green-600', link: '#' },
    { label: 'Commissions', value: '4.5M FCFA', change: '+15%', icon: FaMoneyBill, color: 'from-purple-500 to-purple-600', link: '/admin/commissions' },
    { label: 'Utilisateurs', value: '23', change: '+3', icon: FaUsers, color: 'from-orange-500 to-orange-600', link: '/admin/users' },
  ]

  const quickActions = [
    { label: 'Publier un bien', icon: FaPlus, link: '/admin/properties/add', color: 'bg-green-500' },
    { label: 'Mes annonces', icon: FaList, link: '/admin/my-properties', color: 'bg-blue-500' },
    { label: 'Booster une annonce', icon: FaRocket, link: '/admin/boost', color: 'bg-purple-500' },
    { label: 'Voir le site', icon: FaEye, link: '/', color: 'bg-orange-500', external: true },
  ]

  const recentActivities = [
    { action: 'Nouvelle annonce publiée', detail: 'Villa Cocody', time: 'Il y a 2h', icon: '🏠' },
    { action: 'Contact reçu', detail: 'Pour Appartement Plateau', time: 'Il y a 5h', icon: '📞' },
    { action: 'Annonce boostée', detail: 'Duplex Bassam', time: 'Il y a 1j', icon: '🚀' },
    { action: 'Nouvel utilisateur', detail: 'Mme. Koné', time: 'Il y a 2j', icon: '👤' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue, {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('admin_user') || '{}')?.name || 'Admin' : 'Admin'}</p>
        </div>
        <select value={timeRange} onChange={e => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm">
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
            className={`${action.color} text-white rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all`}
          >
            <action.icon className="text-2xl mx-auto mb-2" />
            <span className="text-sm font-semibold">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.link} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white text-lg" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                <FaArrowUp className="text-xs" /> {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Activités récentes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Activités récentes</h2>
        <div className="space-y-3">
          {recentActivities.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">{activity.action}</div>
                <div className="text-xs text-gray-500">{activity.detail}</div>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
