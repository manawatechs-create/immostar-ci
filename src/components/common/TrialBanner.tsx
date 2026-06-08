'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaClock, FaTimes } from 'react-icons/fa'
import { useFeature } from '@/hooks/useFeature'

export function TrialBanner() {
  const [visible, setVisible] = useState(false)
  const [daysLeft, setDaysLeft] = useState(90)
  const showBanner = useFeature('showUpgradeBanner')
  const trialActive = useFeature('trialActive')

  useEffect(() => {
    if (!showBanner && !trialActive) return

    const trialStart = localStorage.getItem('trial_start')
    if (!trialStart) {
      localStorage.setItem('trial_start', new Date().toISOString())
      if (trialActive) {
        setVisible(true)
        setDaysLeft(90)
      }
    } else if (showBanner) {
      const start = new Date(trialStart)
      const now = new Date()
      const diff = Math.floor((now.getTime() - start.getTime()) / 86400000)
      const remaining = 90 - diff
      if (remaining <= 10 && remaining > 0) {
        setVisible(true)
        setDaysLeft(remaining)
      }
    }
  }, [showBanner, trialActive])

  if (!visible) return null

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 text-center text-sm relative">
      <p className="flex items-center justify-center gap-2">
        <FaClock />
        {daysLeft > 10 ? 'Periode d\'essai gratuite' : `Plus que ${daysLeft} jours d'essai`}
        {daysLeft <= 10 && <Link href="/upgrade" className="underline font-bold ml-1">Passer Pro</Link>}
      </p>
      <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2"><FaTimes className="text-xs" /></button>
    </div>
  )
}
