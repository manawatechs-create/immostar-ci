import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6 animate-bounce">🏠</div>
        <h1 className="text-6xl font-black text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Page introuvable</h2>
        <p className="text-gray-500 mb-8">
          Cette page n&apos;existe pas ou a été déplacée. 
          Mais ne vous inquiétez pas, nous avons plein de biens à vous montrer !
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            🏠 Retour à l&apos;accueil
          </Link>
          <Link href="/properties" className="btn-outline">
            🔍 Voir les annonces
          </Link>
          <Link href="/publier" className="btn-outline">
            📝 Publier une annonce
          </Link>
        </div>
      </div>
    </div>
  )
}
