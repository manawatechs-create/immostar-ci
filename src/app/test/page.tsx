export default function TestPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">
          🎉 <span className="text-blue-600">ImmoStar CI</span>
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Votre plateforme est prête !
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <a href="/" className="p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Accueil
          </a>
          <a href="/properties" className="p-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
            Propriétés
          </a>
          <a href="/login" className="p-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            Connexion
          </a>
          <a href="/register" className="p-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
            Inscription
          </a>
        </div>
        <p className="text-gray-500">
          Next.js | TypeScript | Tailwind CSS | Supabase Ready
        </p>
      </div>
    </main>
  )
}
