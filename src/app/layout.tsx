'use client'

import { useEffect, useState } from 'react'
import './globals.css'
import { AnalyticsTracker } from '@/components/analytics/Tracker'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { CookieBanner } from '@/components/common/CookieBanner'
import { TrialBanner } from '@/components/common/TrialBanner'
import { ChatBot } from '@/components/chatbot/ChatBot'
import { useSync } from '@/hooks/useSync'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled, features } = useSync()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('📱 Site public monté - Features actuelles:', features)
  }, [features])

  // Forcer le re-render quand les features changent
  useEffect(() => {
    if (mounted) {
      console.log('🔄 Features mises à jour:', features)
    }
  }, [features, mounted])

  const showChatbot = mounted && isEnabled('chatbot')
  const showBanner = mounted && isEnabled('showUpgradeBanner')

  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>ImmoStar | La star de l'immobilier en Côte d'Ivoire</title>
      </head>
      <body className="bg-gray-50 text-gray-800 antialiased">
        {showBanner && <TrialBanner />}
        <AnalyticsTracker />
        {children}
        <ScrollToTop />
        {showChatbot && <ChatBot />}
        <CookieBanner />
      </body>
    </html>
  )
}
