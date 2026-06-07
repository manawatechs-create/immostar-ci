'use client'

import { useState, useEffect } from 'react'
import { FaUsers, FaEye, FaClock, FaMobile, FaDesktop, FaTablet, FaGoogle, FaFacebook, FaWhatsapp, FaChartLine, FaGlobe } from 'react-icons/fa'

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('24h')

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Rafraîchir toutes les 30s
    return () => clearInterval(interval)
  }, [period])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/analytics/track')
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error('Erreur analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  // Données mockées pour la démo
  const mockData = {
    totalVisits: 12580,
    todayVisits: 234,
    currentVisitors: 12,
    avgTimeOnSite: '4m 32s',
    sources: [
      { name: 'google', count: 4230, icon: FaGoogle, color: 'text-blue-600', bg: 'bg-blue-100' },
      { name: 'facebook', count: 2150, icon: FaFacebook, color: 'text-indigo-600', bg: 'bg-indigo-100' },
      { name: 'whatsapp', count: 1890, icon: FaWhatsapp, color: 'text-green-600', bg: 'bg-green-100' },
      { name: 'direct', count: 1560, icon: FaGlobe, color: 'text-gray-600', bg: 'bg-gray-100' },
      { name: 'instagram', count: 890, icon: FaUsers, color: 'text-pink-600', bg: 'bg-pink-100' },
      { name: 'twitter', count: 450, icon: FaChartLine, color: 'text-sky-600', bg: 'bg-sky-100' },
      { name: 'tiktok', count: 320, icon: FaEye, color: 'text-black', bg: 'bg-gray-100' },
      { name: 'other', count: 1090, icon: FaGlobe, color: 'text-purple-600', bg: 'bg-purple-100' },
    ],
    devices: [
      { name: 'mobile', count: 6780, icon: FaMobile, color: 'text-orange-600' },
      { name: 'desktop', count: 4120, icon: FaDesktop, color: 'text-blue-600' },
      { name: 'tablet', count: 1680, icon: FaTablet, color: 'text-purple-600' },
    ],
    topPages: [
      { page: '/properties', views: 3450 },
      { page: '/', views: 2890 },
      { page: '/meubles', views: 1560 },
      { page: '/calculator', views: 890 },
      { page: '/contact', views: 670 },
    ],
    recentVisitors: [
      { id: 1, page: '/properties?city=Abidjan', source: 'google', device: 'mobile', time: 'À l\'instant' },
      { id: 2, page: '/meubles', source: 'whatsapp', device: 'mobile', time: 'Il y a 30s' },
      { id: 3, page: '/', source: 'facebook', device: 'desktop', time: 'Il y a 1min' },
      { id: 4, page: '/properties/1', source: 'direct', device: 'mobile', time: 'Il y a 2min' },
      { id: 5, page: '/calculator', source: 'google', device: 'desktop', time: 'Il y a 3min' },
    ]
  }

  const displayData = mockData

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📊 Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Suivi des visites en temps réel</p>
        </div>
        <div className="flex gap-2">
          {['1h', '24h', '7j', '30j'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${period === p ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <FaUsers className="text-2xl text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{displayData.totalVisits.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Visites totales</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <FaEye className="text-2xl text-green-500 mb-2" />
          <div className="text-2xl font-bold">{displayData.todayVisits}</div>
          <div className="text-xs text-gray-500">Aujourd'hui</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <FaClock className="text-2xl text-orange-500 mb-2" />
          <div className="text-2xl font-bold">{displayData.currentVisitors}</div>
          <div className="text-xs text-gray-500">En ligne maintenant</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <FaChartLine className="text-2xl text-purple-500 mb-2" />
          <div className="text-2xl font-bold">{displayData.avgTimeOnSite}</div>
          <div className="text-xs text-gray-500">Temps moyen</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources de trafic */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">📱 Sources de trafic</h3>
          <div className="space-y-3">
            {displayData.sources.map((source) => {
              const total = displayData.sources.reduce((s: number, src: any) => s + src.count, 0)
              const percent = Math.round((source.count / total) * 100)
              return (
                <div key={source.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${source.bg} rounded-lg flex items-center justify-center`}>
                        <source.icon className={`${source.color} text-sm`} />
                      </div>
                      <span className="text-sm font-medium capitalize">{source.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{source.count.toLocaleString()} ({percent}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${source.name === 'google' ? 'bg-blue-500' : 
                      source.name === 'facebook' ? 'bg-indigo-500' :
                      source.name === 'whatsapp' ? 'bg-green-500' :
                      source.name === 'direct' ? 'bg-gray-500' :
                      source.name === 'instagram' ? 'bg-pink-500' : 'bg-orange-500'}`}
                      style={{ width: `${percent}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">📱 Appareils utilisés</h3>
          <div className="space-y-4">
            {displayData.devices.map((device) => {
              const total = displayData.devices.reduce((s: number, d: any) => s + d.count, 0)
              const percent = Math.round((device.count / total) * 100)
              return (
                <div key={device.name} className="flex items-center gap-4">
                  <device.icon className={`text-2xl ${device.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium capitalize">{device.name}</span>
                      <span>{device.count.toLocaleString()} ({percent}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pages populaires */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">📄 Pages les plus visitées</h3>
        <div className="space-y-2">
          {displayData.topPages.map((page, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-400 w-6">#{i + 1}</span>
                <span className="text-sm font-medium">{page.page}</span>
              </div>
              <span className="text-sm text-gray-600">{page.views.toLocaleString()} vues</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visiteurs en direct */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h3 className="font-bold text-gray-800">Visiteurs en direct</h3>
          <span className="text-xs text-gray-500">({displayData.recentVisitors.length} récents)</span>
        </div>
        <div className="space-y-2">
          {displayData.recentVisitors.map((visitor) => (
            <div key={visitor.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs">{visitor.page}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="capitalize">{visitor.source}</span>
                <span>{visitor.device}</span>
                <span>{visitor.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
