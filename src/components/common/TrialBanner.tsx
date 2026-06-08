'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaClock, FaTimes } from 'react-icons/fa'
import { FEATURES, getTrialDaysLeft } from '@/lib/features'

export function TrialBanner() {
  const [visible, setVisible] = useState(false)
  const [daysLeft, setDaysLeft] = useState(90)

  useEffect(() => {
    if (!FEATURES.SHOW_UPGRADE_BANNER && !FEATURES.TRIAL_ACTIVE) return

    const trialStart = localStorage.getItem('trial_start')
    if (!trialStart) {
      localStorage.setItem('trial_start', new Date().toISOString())
      if (FEATURES.TRIAL_ACTIVE) {
        setVisible(true)
        setDaysLeft(FEATURES.TRIAL_PERIOD_DAYS)
      }
    } else if (FEATURES.SHOW_UPGRADE_BANNER) {
      const remaining = getTrialDaysLeft(trialStart)
      if (remaining <= 10) {
        setVisible(true)
        setDaysLeft(remaining)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 text-center text-sm relative">
      <p className="flex items-center justify-center gap-2">
        <FaClock />
        {daysLeft > 10 ? (
          <>🎉 Période d&apos;essai gratuite • Profitez-en !</>
        ) : (
          <>⚠️ Plus que <strong>{daysLeft} jours</strong> d&apos;essai gratuit • 
            <Link href="/upgrade" className="underline font-bold ml-1">Passer Pro maintenant</Link>
          </>
        )}
      </p>
      <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2">
        <FaTimes className="text-xs" />
      </button>
    </div>
  )
}
