'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaCookieBite, FaTimes } from 'react-icons/fa'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted')
    if (!accepted) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookies_accepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-4 animate-slide-up">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FaCookieBite className="text-orange-500 text-2xl flex-shrink-0" />
          <p className="text-sm text-gray-600">
            Nous utilisons des cookies pour améliorer votre expérience. 
            <Link href="/cookies" className="text-orange-600 font-semibold ml-1 hover:underline">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={acceptCookies} className="btn-primary text-sm !py-2">
            Accepter
          </button>
          <button onClick={() => setVisible(false)} className="btn-outline text-sm !py-2">
            Refuser
          </button>
        </div>
      </div>
    </div>
  )
}
