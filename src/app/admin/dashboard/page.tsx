'use client'

import { useState, useEffect } from 'react'
import { 
  FaBuilding, FaMoneyBill, FaEye, FaUsers, FaArrowUp, FaArrowDown, 
  FaCalendarCheck, FaEnvelope, FaChartLine, FaGoogle, FaFacebook, 
  FaWhatsapp, FaMobile, FaDesktop, FaTablet, FaGlobe, FaExclamationTriangle,
  FaCheckCircle, FaClock, FaPhone
} from 'react-icons/fa'
import Link from 'next/link'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('today')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  // Stats principales
  const stats = [
    { label: 'Biens actifs', value: 12, change: '+2', icon: FaBuilding, color: 'from-blue-500 to-blue-600', link: '/admin/properties' },
    { label: 'Visites aujourd\'hui', value: '234', change: '+45', icon: FaEye, color: 'from-green-500 to-green-600', link: '/admin/analytics' },
    { label: 'Commissions du mois', value: '4.5M FCFA', change: '+15%', icon: FaMoneyBill, color: 'from-purple-500 to-purple-600', link: '/admin/commissions' },
    { label: 'En ligne', value: '12', change: 'Maintenant', icon: FaUsers, color: 'from-orange-500 to-orange-600', link: '/admin/analytics' },
  ]

  // Sources de trafic
  const trafficSources = [
    { name: 'Google', count: 89, percent: 38, icon: FaGoogle, color: 'bg-blue-100 text-blue-600', barColor: 'bg-blue-500' },
    { name: 'Facebook', count: 45, percent: 19, icon: FaFacebook, color: 'bg-indigo-100 text-indigo-600', barColor: 'bg-indigo-500' },
    { name: 'WhatsApp', count: 38, percent: 16, icon: FaWhatsapp, color: 'bg-green-100 text-green-600', barColor: 'bg-green-500' },
    { name: 'Direct', count: 34, percent: 15, icon: FaGlobe, color: 'bg-gray-100 text-gray-600', barColor: 'bg-gray-500' },
    { name: 'Autres', count: 28, percent: 12, icon: FaChartLine, color: 'bg-orange-100 text-orange-600', barColor: 'bg-orange-500' },
  ]

  // Appareils
  const devices = [
    { name: 'Mobile', count: 142, percent: 61, icon: FaMobile, color: 'text-orange-500' },
    { name: 'Desktop', count: 68, percent: 29, icon: FaDesktop, color: 'text-blue-500' },
    { name: 'Tablette', count: 24, percent: 10, icon: FaTablet, color: 'text-purple-500' },
  ]

  // Activités récentes
  const recentActivities = [
    { action: 'Nouveau visiteur', detail: 'Depuis Google → /properties', time: 'À l\'instant', type: 'visit', icon: FaGoogle },
    { action: 'Visite programmée', detail: 'Appartement Plateau', time: 'Il y a 5min', type: 'visit_scheduled', icon: FaCalendarCheck },
    { action: 'Nouveau message', detail: 'M. Kouadio - Demande visite', time: 'Il y a 12min', type: 'message', icon: FaEnvelope },
    { action: 'Visiteur WhatsApp', detail: 'Depuis lien partagé → /meubles', time: 'Il y a 18min', type: 'visit', icon: FaWhatsapp },
    { action: 'Alerte fraude', detail: 'Duplex Bassam - 41 jours inactif', time: 'Il y a 25min', type: 'alert', icon: FaExclamationTriangle },
    { action: 'Vente validée', detail: 'Villa Cocody - 2.5M FCFA', time: 'Il y a 1h', type: 'sale', icon: FaCheckCircle },
    { action: 'Relance envoyée', detail: 'Mme. Koné - Appartement', time: 'Il y a 2h', type: 'relance', icon: FaPhone },
  ]

  // Biens populaires aujourd'hui
  const topProperties = [
    { title: 'Villa Moderne Cocody', views: 45, contacts: 3, trend: 'up' },
    { title: 'Appartement Plateau', views: 32, contacts: 2, trend: 'up' },
    { title: 'Studio Meublé Marcory', views: 28, contacts: 1, trend: 'down' },
    { title: 'Duplex Grand-Bassam', views: 21, contacts: 0, trend: 'down' },
  ]

  // Alertes
  const alerts = [
    { message: '3 biens inactifs depuis +30 jours', type: 'warning', link: '/admin/fraud-detection' },
    { message: '2 déclarations de vente en attente', type: 'info', link: '/admin/validations' },
    { message: '1 relance sans réponse depuis 7 jours', type: 'danger', link: '/admin/relances' },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loader" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">
            Bienvenue, Administrateur • <span className="text-green-600">12 visiteurs en ligne</span>
          </p>
        </div>
        <div className="flex gap-2">
          {['today', 'week', 'month'].map(p => (
            <button key={p} onClick={() => setTimeRange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeRange === p ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {p === 'today' ? "Aujourd'hui" : p === 'week' ? 'Semaine' : 'Mois'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Alertes */}
      {alerts.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {alerts.map((alert, i) => (
            <Link key={i} href={alert.link}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-md ${
                alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                alert.type === 'danger' ? 'bg-red-50 text-red-800 border border-red-200' :
                'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
              <span>{alert.type === 'warning' ? '⚠️' : alert.type === 'danger' ? '🚨' : 'ℹ️'}</span>
              {alert.message}
            </Link>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sources de trafic */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FaChartLine className="text-orange-500" /> Sources de trafic
            </h3>
            <Link href="/admin/analytics" className="text-xs text-orange-600 hover:underline">Détails →</Link>
          </div>
          <div className="space-y-3">
            {trafficSources.map((source, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 ${source.color} rounded-lg flex items-center justify-center`}>
                      <source.icon className="text-xs" />
                    </div>
                    <span className="text-xs font-medium">{source.name}</span>
                  </div>
                  <span className="text-xs text-gray-600">{source.count} ({source.percent}%)</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${source.barColor}`} style={{ width: `${source.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appareils */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaMobile className="text-orange-500" /> Appareils
          </h3>
          <div className="space-y-4">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center gap-3">
                <device.icon className={`text-xl ${device.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{device.name}</span>
                    <span className="text-gray-500">{device.count} ({device.percent}%)</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${device.name === 'Mobile' ? 'bg-orange-500' : device.name === 'Desktop' ? 'bg-blue-500' : 'bg-purple-500'}`} style={{ width: `${device.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              📱 {devices[0].percent}% des visites sont sur mobile
            </p>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FaClock className="text-orange-500" /> Activité en direct
            </h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600">Live</span>
            </div>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'visit' ? 'bg-blue-100' :
                  activity.type === 'sale' ? 'bg-green-100' :
                  activity.type === 'alert' ? 'bg-red-100' :
                  activity.type === 'message' ? 'bg-purple-100' :
                  activity.type === 'relance' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  <activity.icon className={`text-xs ${
                    activity.type === 'visit' ? 'text-blue-600' :
                    activity.type === 'sale' ? 'text-green-600' :
                    activity.type === 'alert' ? 'text-red-600' :
                    activity.type === 'message' ? 'text-purple-600' :
                    activity.type === 'relance' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{activity.action}</div>
                  <div className="text-xs text-gray-500 truncate">{activity.detail}</div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biens populaires */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">🏠 Biens les plus consultés aujourd'hui</h3>
          <Link href="/admin/properties" className="text-xs text-orange-600 hover:underline">Voir tout →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProperties.map((property, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800 truncate">{property.title}</span>
                {property.trend === 'up' ? 
                  <FaArrowUp className="text-green-500 text-xs" /> : 
                  <FaArrowDown className="text-red-500 text-xs" />
                }
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>👁️ {property.views} vues</span>
                <span>📞 {property.contacts} contacts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liens rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Ajouter un bien', icon: '➕', link: '/admin/properties/add', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
          { label: 'Validations', icon: '✅', link: '/admin/validations', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
          { label: 'Détection fraude', icon: '🔍', link: '/admin/fraud-detection', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
          { label: 'Analytics complet', icon: '📊', link: '/admin/analytics', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
        ].map((link, i) => (
          <Link key={i} href={link.link}
            className={`${link.color} rounded-xl p-4 text-center font-medium text-sm transition-all`}>
            <span className="text-2xl block mb-1">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
// (Le fichier complet est déjà créé plus haut)
// Ajoutons juste les imports manquants si nécessaire
