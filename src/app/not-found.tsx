import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🏠</div>
        <h1 className="text-5xl font-black text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Page introuvable</h2>
        <p className="text-gray-500 mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            🏠 Retour à l&apos;accueil
          </Link>
          <Link href="/properties" className="btn-outline">
            🔍 Voir les biens
          </Link>
        </div>
      </div>
    </div>
  )
}
