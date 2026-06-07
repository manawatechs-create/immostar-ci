'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔧</div>
        <h1 className="text-5xl font-black text-gray-800 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Erreur serveur</h2>
        <p className="text-gray-500 mb-8">
          Une erreur inattendue s&apos;est produite. Veuillez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            🔄 Réessayer
          </button>
          <Link href="/" className="btn-outline">
            🏠 Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
