'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { useFeature } from '@/hooks/useFeature'

const articles = [
  { id: 1, title: 'Comment bien estimer votre bien', date: '2026-06-01', category: 'Conseils', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop', excerpt: 'Les criteres essentiels pour estimer votre bien.' },
  { id: 2, title: 'Quartiers prises d\'Abidjan', date: '2026-05-25', category: 'Tendances', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=250&fit=crop', excerpt: 'Ou investir a Abidjan.' },
  { id: 3, title: 'Acheter ou louer en 2026 ?', date: '2026-05-20', category: 'Guide', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop', excerpt: 'Avantages et inconvenients.' },
]

export default function BlogPage() {
  const blogEnabled = useFeature('blog')

  if (!blogEnabled) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-20 text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Blog bientot disponible</h1>
          <p className="text-gray-500">Cette fonctionnalite sera activee prochainement.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-8">
        <h1 className="text-3xl font-black text-gray-800 mb-8">📰 Blog Immobilier</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(article => (
            <Link key={article.id} href={`/blog/${article.id}`} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all group">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{article.category}</span>
                <h3 className="font-bold text-gray-800 mt-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{article.excerpt}</p>
                <p className="text-xs text-gray-400 mt-3">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
