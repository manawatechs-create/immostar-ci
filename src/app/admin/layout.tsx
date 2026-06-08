'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FaHome, FaBuilding, FaMoneyBill, FaCog, FaSignOutAlt, FaBars, FaTimes, FaPlus,
  FaChartLine, FaUsers, FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaPhone,
  FaRocket, FaCamera, FaList, FaEye, FaUser, FaClock, FaDollarSign
} from 'react-icons/fa'

const menuItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: FaHome },
  { href: '/admin/super-admin', label: '⚡ Super Admin', icon: FaCog },
  { href: '/admin/trial-users', label: '⏰ Essais utilisateurs', icon: FaClock },
  { href: '/admin/my-properties', label: 'Mes annonces', icon: FaList },
  { href: '/admin/properties/add', label: 'Publier un bien', icon: FaPlus },
  { href: '/admin/boost', label: '🚀 Booster', icon: FaRocket },
  { href: '/admin/plans', label: '💰 Plans tarifaires', icon: FaDollarSign },
  { href: '/admin/validations', label: 'Validations ventes', icon: FaCheckCircle },
  { href: '/admin/users', label: '👥 Utilisateurs', icon: FaUsers },
  { href: '/admin/revenue', label: '📊 Revenus', icon: FaChartLine },
  { href: '/admin/commissions', label: '💰 Commissions', icon: FaMoneyBill },
  { href: '/admin/messages', label: 'Messages', icon: FaEnvelope },
  { href: '/admin/settings', label: 'Paramètres', icon: FaCog },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('admin_token')
    const adminUser = localStorage.getItem('admin_user')
    if (token === 'immostar_admin_2025' && adminUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(adminUser))
    }
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [mounted, isAuthenticated, pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  // Page login sans layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Pas encore monté (évite l'erreur SSR)
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="loader" /></div>
  }

  // Pas authentifié
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold text-sm text-gray-800">ImmoStar</div>
                <div className="text-xs text-gray-400">Administration</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm ${
                    isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  <IconComponent className="text-base" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t space-y-1">
            <a href="/" target="_blank" className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl text-sm">
              <FaEye className="text-base" /> Voir le site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl text-sm">
              <FaSignOutAlt className="text-base" /> Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <div className="lg:hidden bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between h-14 px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <FaBars className="text-gray-600" />
          </button>
          <span className="font-bold text-gray-800">⭐ ImmoStar</span>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg">
            <FaSignOutAlt className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl">
            <div className="flex items-center justify-between h-14 px-4 border-b">
              <span className="font-bold">⭐ ImmoStar</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes />
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm ${
                    pathname === item.href ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  <item.icon className="text-base" /> {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6 lg:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
