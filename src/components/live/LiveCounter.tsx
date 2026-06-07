'use client'

import { useState, useEffect } from 'react'
import { FaUsers, FaEye } from 'react-icons/fa'

export function LiveCounter() {
  const [visitors, setVisitors] = useState(12)
  const [todayViews, setTodayViews] = useState(234)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simuler des changements
      const change = Math.floor(Math.random() * 3) - 1
      setVisitors(prev => Math.max(5, Math.min(25, prev + change)))
      setTodayViews(prev => prev + Math.floor(Math.random() * 3))
      
      setAnimating(true)
      setTimeout(() => setAnimating(false), 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-4">
      {/* Visiteurs en ligne */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75" />
        </div>
        <div className="flex items-center gap-1.5">
          <FaUsers className="text-green-500 text-sm" />
          <span className={`font-bold text-sm transition-all duration-300 ${animating ? 'text-green-500 scale-110' : 'text-gray-700'}`}>
            {visitors}
          </span>
          <span className="text-xs text-gray-500 hidden sm:inline">en ligne</span>
        </div>
      </div>

      {/* Vues aujourd'hui */}
      <div className="flex items-center gap-1.5">
        <FaEye className="text-orange-500 text-sm" />
        <span className={`font-bold text-sm transition-all duration-300 ${animating ? 'text-orange-500 scale-110' : 'text-gray-700'}`}>
          {todayViews}
        </span>
        <span className="text-xs text-gray-500 hidden sm:inline">vues</span>
      </div>
    </div>
  )
}
