import Link from 'next/link'

const categories = [
  { name: 'Villas', icon: '🏡', href: '/properties?type=villa', count: '234', color: 'hover:bg-amber-50 hover:border-amber-200' },
  { name: 'Appartements', icon: '🏢', href: '/properties?type=apartment', count: '567', color: 'hover:bg-blue-50 hover:border-blue-200' },
  { name: 'Meublés', icon: '🛋️', href: '/meubles', count: '156', color: 'hover:bg-purple-50 hover:border-purple-200' },
  { name: 'Terrains', icon: '🌳', href: '/properties?type=land', count: '189', color: 'hover:bg-green-50 hover:border-green-200' },
  { name: 'Commerces', icon: '🏪', href: '/properties?type=commercial', count: '67', color: 'hover:bg-red-50 hover:border-red-200' },
  { name: 'Premium', icon: '⭐', href: '/properties?featured=true', count: '89', color: 'hover:bg-yellow-50 hover:border-yellow-200' },
  { name: 'Studios', icon: '🏘️', href: '/properties?type=studio', count: '45', color: 'hover:bg-pink-50 hover:border-pink-200' },
  { name: 'Immeubles', icon: '🏬', href: '/properties?type=immeuble', count: '23', color: 'hover:bg-indigo-50 hover:border-indigo-200' },
  { name: 'Crédit', icon: '🧮', href: '/calculator', count: 'Simuler', color: 'hover:bg-orange-50 hover:border-orange-200' },
  { name: 'Contact', icon: '📞', href: '/contact', count: 'Aide', color: 'hover:bg-teal-50 hover:border-teal-200' },
]

export function Categories() {
  return (
    <section className="container-main -mt-8 sm:-mt-10 relative z-20 pb-12 sm:pb-16">
      <div className="card bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center flex items-center justify-center gap-2">
          <span>🔍</span> Explorez par catégorie
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 border-transparent ${cat.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="font-semibold text-gray-800 text-xs sm:text-sm text-center">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {cat.count} {typeof cat.count === 'string' ? '' : 'biens'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
