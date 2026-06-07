'use client'

import { useState, useEffect } from 'react'
import { FaGoogle, FaFacebook, FaWhatsapp, FaTimes, FaBell } from 'react-icons/fa'

interface Notification {
  id: number
  type: 'visit' | 'message' | 'sale' | 'alert'
  message: string
  source?: string
  time: string
}

export function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showAll, setShowAll] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simuler des notifications en temps réel
    const messages = [
      { type: 'visit' as const, message: 'Visiteur depuis Google', source: 'google' },
      { type: 'message' as const, message: 'Nouveau message de M. Kouadio' },
      { type: 'visit' as const, message: 'Visiteur depuis WhatsApp', source: 'whatsapp' },
      { type: 'sale' as const, message: 'Villa Cocody - Vente confirmée' },
      { type: 'visit' as const, message: 'Visiteur depuis Facebook', source: 'facebook' },
      { type: 'alert' as const, message: 'Bien inactif depuis 30 jours' },
    ]

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      const newNotif: Notification = {
        id: Date.now(),
        ...randomMsg,
        time: 'À l\'instant',
      }
      
      setNotifications(prev => [newNotif, ...prev].slice(0, 20))
      setUnreadCount(prev => prev + 1)
    }, 15000)

    // Première notification
    setNotifications([
      { id: 1, type: 'visit', message: 'Visiteur depuis Google', source: 'google', time: 'Il y a 2min' },
      { id: 2, type: 'message', message: 'Nouveau message contact', time: 'Il y a 5min' },
      { id: 3, type: 'sale', message: 'Vente validée - 2.5M FCFA', time: 'Il y a 15min' },
    ])

    return () => clearInterval(interval)
  }, [])

  const getIcon = (notif: Notification) => {
    if (notif.source === 'google') return <FaGoogle className="text-blue-500" />
    if (notif.source === 'facebook') return <FaFacebook className="text-indigo-500" />
    if (notif.source === 'whatsapp') return <FaWhatsapp className="text-green-500" />
    if (notif.type === 'message') return <span>📩</span>
    if (notif.type === 'sale') return <span>💰</span>
    if (notif.type === 'alert') return <span>⚠️</span>
    return <span>👤</span>
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'visit': return 'border-l-blue-500'
      case 'message': return 'border-l-purple-500'
      case 'sale': return 'border-l-green-500'
      case 'alert': return 'border-l-red-500'
      default: return 'border-l-gray-500'
    }
  }

  return (
    <div className="relative">
      {/* Cloche */}
      <button 
        onClick={() => {
          setShowAll(!showAll)
          if (!showAll) setUnreadCount(0)
        }}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FaBell className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panneau de notifications */}
      {showAll && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-fade-in-up">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-gray-800">Notifications en direct</h3>
            <button onClick={() => setShowAll(false)} className="p-1 hover:bg-gray-100 rounded-lg">
              <FaTimes className="text-gray-400 text-sm" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className={`flex items-start gap-3 p-3 border-l-2 ${getColor(notif.type)} hover:bg-gray-50 transition-colors`}>
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {getIcon(notif)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
