'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
    }
  }

  const desktopLinks = [
    { href: '/', label: '🏠 Accueil' },
    { href: '/properties?type=sale', label: '💰 Acheter' },
    { href: '/properties?type=rent', label: '🔑 Louer' },
    { href: '/meubles', label: '🛋️ Meublés' },
    { href: '/blog', label: '📰 Blog' },
    { href: '/publier', label: '📝 Publier' },
  ]

  const mobileLinks = [
    { href: '/', label: '🏠 Accueil' },
    { href: '/properties?type=sale', label: '💰 Acheter' },
    { href: '/properties?type=rent', label: '🔑 Louer' },
    { href: '/meubles', label: '🛋️ Meublés' },
    { href: '/blog', label: '📰 Blog' },
    { href: '/publier', label: '📝 Publier' },
    { href: '/calculator', label: '🧮 Crédit' },
    { href: '/compare', label: '📊 Comparer' },
    { href: '/contact', label: '📞 Contact' },
    { href: '/about', label: 'ℹ️ À propos' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="container-main">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl sm:text-2xl font-black text-orange-600">⭐ ImmoStar</span>
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs mx-4">
              <div className="relative w-full">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="text" placeholder="Rechercher..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" />
              </div>
            </form>

            <nav className="hidden md:flex items-center gap-0.5">
              {desktopLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all font-medium">
                  {link.label}
                </Link>
              ))}
              <Link href="/register" className="ml-2 btn-primary text-sm !py-2">S&apos;inscrire</Link>
            </nav>

            <button onClick={() => setIsOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl animate-slide-in-right flex flex-col">
            <div className="p-5 border-b flex justify-between items-center">
              <span className="text-xl font-black text-orange-600">⭐ ImmoStar</span>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
              {mobileLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t">
              <Link href="/register" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center text-lg !py-3.5">
                📝 S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="h-14 sm:h-16 md:h-20" />
    </>
  )
}
