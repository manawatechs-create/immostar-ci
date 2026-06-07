'use client'

import { useState, useEffect } from 'react'
import { FaGoogle, FaFacebook, FaWhatsapp, FaMobile, FaDesktop } from 'react-icons/fa'

interface Activity {
  id: number
  page: string
  source: string
  device: string
  time: string
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, page: '/properties', source: 'google', device: 'mobile', time: 'À l\'instant' },
    { id: 2, page: '/meubles', source: 'whatsapp', device: 'mobile', time: 'Il y a 10s' },
    { id: 3, page: '/', source: 'facebook', device: 'desktop', time: 'Il y a 30s' },
    { id: 4, page: '/calculator', source: 'direct', device: 'mobile', time: 'Il y a 1min' },
    { id: 5, page: '/properties/1', source: 'google', device: 'desktop', time: 'Il y a 2min' },
  ])

  useEffect(() => {
    const sources = ['google', 'facebook', 'whatsapp', 'direct', 'instagram']
    const pages = ['/', '/properties', '/meubles', '/calculator', '/properties/1']
    const devices = ['mobile', 'desktop']

    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        page: pages[Math.floor(Math.random() * pages.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        time: 'À l\'instant',
      }
      
      setActivities(prev => {
        // Mettre à jour les temps
        const updated = prev.map(a => ({
          ...a,
          time: a.time === 'À l\'instant' ? 'Il y a 5s' :
                a.time === 'Il y a 5s' ? 'Il y a 10s' :
                a.time === 'Il y a 10s' ? 'Il y a 30s' :
                a.time === 'Il y a 30s' ? 'Il y a 1min' :
                a.time === 'Il y a 1min' ? 'Il y a 2min' :
                a.time === 'Il y a 2min' ? 'Il y a 5min' : a.time
        }))
        return [newActivity, ...updated].slice(0, 10)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google': return <FaGoogle className="text-blue-500" />
      case 'facebook': return <FaFacebook className="text-indigo-500" />
      case 'whatsapp': return <FaWhatsapp className="text-green-500" />
      default: return <span>🌐</span>
    }
  }

  const getDeviceIcon = (device: string) => {
    return device === 'mobile' ? 
      <FaMobile className="text-orange-500" /> : 
      <FaDesktop className="text-blue-500" />
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <h3 className="font-bold text-gray-800 text-sm">Activité en direct</h3>
      </div>
      
      <div className="space-y-1 max-h-[250px] overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-all animate-fade-in-up text-xs">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              {getSourceIcon(activity.source)}
              <span className="text-gray-600 truncate">{activity.page}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {getDeviceIcon(activity.device)}
              <span className="text-gray-400 w-16 text-right">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
