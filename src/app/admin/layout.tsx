'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FaHome, FaBuilding, FaMoneyBill, FaCog, FaSignOutAlt, FaBars, FaTimes, FaPlus,
  FaChartLine, FaUsers, FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaPhone,
  FaRocket, FaCamera, FaUserPlus, FaList, FaEye
} from 'react-icons/fa'

const menuItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: FaHome, color: 'text-orange-500' },
  { href: '/admin/my-properties', label: 'Mes annonces', icon: FaList, color: 'text-blue-500' },
  { href: '/admin/properties/add', label: 'Publier un bien', icon: FaPlus, color: 'text-green-500' },
  { href: '/admin/boost', label: '🚀 Booster une annonce', icon: FaRocket, color: 'text-purple-500' },
  { href: '/admin/photo-service', label: '📸 Service photo', icon: FaCamera, color: 'text-pink-500' },
  { href: '/admin/validations', label: 'Validations ventes', icon: FaCheckCircle, color: 'text-emerald-500' },
  { href: '/admin/users', label: '👥 Utilisateurs', icon: FaUsers, color: 'text-indigo-500' },
  { href: '/admin/commissions', label: '💰 Commissions', icon: FaMoneyBill, color: 'text-yellow-500' },
  { href: '/admin/messages', label: 'Messages', icon: FaEnvelope, color: 'text-cyan-500' },
  { href: '/admin/settings', label: 'Paramètres', icon: FaCog, color: 'text-gray-500' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const adminUser = localStorage.getItem('admin_user')
    if (token === 'immostar_admin_2025' && adminUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(adminUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [loading, isAuthenticated, pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="loader" /></div>
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-100">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xl font-black">⭐</div>
              <div>
                <div className="font-bold text-gray-800 text-sm">ImmoStar</div>
                <div className="text-xs text-gray-400">Administration</div>
              </div>
            </Link>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-400 truncate">{user?.email || 'admin@immostar.ci'}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm group ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-semibold border border-orange-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`text-base ${isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 space-y-1">
            <a href="/" target="_blank" className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl transition-all text-sm">
              <FaEye className="text-base" /> Voir le site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all text-sm">
              <FaSignOutAlt className="text-base" /> Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between h-14 px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <FaBars className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">⭐ ImmoStar Admin</span>
          </div>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg">
            <FaSignOutAlt className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b">
              <span className="font-bold text-gray-800">⭐ ImmoStar</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                    pathname === item.href ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  <item.icon className="text-base" /> {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        <main className="p-4 sm:p-6 lg:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
