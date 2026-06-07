'use client'

import { useState, useEffect } from 'react'
import { FaBell } from 'react-icons/fa'

export function NotificationsBell() {
  const [count, setCount] = useState(3)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setCount(prev => prev + 1)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const notifications = [
    { id: 1, text: 'Nouvelle annonce publiée', time: 'Il y a 2min', type: 'info' },
    { id: 2, text: 'Commission de 2.5M FCFA reçue', time: 'Il y a 1h', type: 'success' },
    { id: 3, text: '3 annonces expirent bientôt', time: 'Il y a 3h', type: 'warning' },
  ]

  return (
    <div className="relative">
      <button onClick={() => { setShow(!show); setCount(0) }} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <FaBell className="text-gray-600 text-lg" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {count}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-fade-in-up">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Notifications</h3>
            <span className="text-xs text-gray-400">{count} nouvelle(s)</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(n => (
              <div key={n.id} className="p-4 hover:bg-gray-50 border-b last:border-0 cursor-pointer">
                <p className="text-sm text-gray-800">{n.text}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
