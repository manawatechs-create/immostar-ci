import type { Metadata } from 'next'
import './globals.css'
import { AnalyticsTracker } from '@/components/analytics/Tracker'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { CookieBanner } from '@/components/common/CookieBanner'

export const metadata: Metadata = {
  title: 'ImmoStar | La star de l\'immobilier en Côte d\'Ivoire',
  description: 'Trouvez votre maison de rêve en Côte d\'Ivoire avec ImmoStar.',
  authors: [{ name: 'Manawa Techs' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 text-gray-800 antialiased">
        <AnalyticsTracker />
        {children}
        <ScrollToTop />
        <CookieBanner />
      </body>
    </html>
  )
}
