'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Récupérer les UTM de l'URL
        const params = new URLSearchParams(window.location.search)
        const utmSource = params.get('utm_source') || ''
        const utmMedium = params.get('utm_medium') || ''
        const utmCampaign = params.get('utm_campaign') || ''
        
        // Détecter la source via le referrer
        const referrer = document.referrer
        let source = utmSource || 'direct'
        
        if (!utmSource && referrer) {
          if (referrer.includes('google')) source = 'google'
          else if (referrer.includes('facebook')) source = 'facebook'
          else if (referrer.includes('instagram')) source = 'instagram'
          else if (referrer.includes('twitter') || referrer.includes('x.com')) source = 'twitter'
          else if (referrer.includes('linkedin')) source = 'linkedin'
          else if (referrer.includes('whatsapp')) source = 'whatsapp'
          else if (referrer.includes('tiktok')) source = 'tiktok'
          else if (referrer.includes('jumia')) source = 'jumia'
          else source = 'other'
        }

        // Envoyer au serveur
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            source,
            medium: utmMedium,
            campaign: utmCampaign,
            referrer: referrer || 'direct',
          }),
        })
      } catch (error) {
        // Silencieux - ne pas bloquer l'utilisateur
      }
    }

    trackVisit()
  }, [pathname])

  return null // Composant invisible
}
