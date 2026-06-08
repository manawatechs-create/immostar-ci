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
  { href: '/admin/trial-users', label: '⏰ Essais', icon: FaClock },
  { href: '/admin/my-properties', label: 'Mes annonces', icon: FaList },
  { href: '/admin/properties/add', label: 'Publier un bien', icon: FaPlus },
  { href: '/admin/boost', label: '🚀 Booster', icon: FaRocket },
  { href: '/admin/plans', label: '💰 Plans', icon: FaDollarSign },
  { href: '/admin/validations', label: 'Validations', icon: FaCheckCircle },
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

  // Page login : pas de sidebar
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-900">
        {children}
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="loader-white" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background admin complètement différent du site public */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-gray-800 border-r border-gray-700">
          <div className="flex items-center h-16 px-6 border-b border-gray-700">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold text-sm text-white">ImmoStar</div>
                <div className="text-xs text-gray-400">Administration</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm ${
                    isActive 
                      ? 'bg-orange-600 text-white font-semibold' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}>
                  <item.icon className="text-base" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t border-gray-700 space-y-1">
            <a href="/" target="_blank" className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-xl text-sm">
              <FaEye className="text-base" /> Voir le site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 rounded-xl text-sm">
              <FaSignOutAlt className="text-base" /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-gray-800 border-b border-gray-700 h-14 flex items-center px-4 lg:px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white">
              <FaBars />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">{user?.name || 'Admin'}</span>
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-900">
            <div className="text-white">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 shadow-2xl">
            <div className="flex items-center justify-between h-14 px-4 border-b border-gray-700">
              <span className="font-bold text-white">⭐ ImmoStar</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm ${
                    pathname === item.href ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}>
                  <item.icon className="text-base" /> {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
