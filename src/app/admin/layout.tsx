'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FaHome, FaBuilding, FaMoneyBill, FaCog, FaSignOutAlt, FaBars, FaTimes, FaPlus,
  FaChartLine, FaUsers, FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaPhone,
  FaRocket, FaCamera, FaList, FaEye, FaUser, FaClock, FaDollarSign, FaBell
} from 'react-icons/fa'

const menuItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: FaHome, color: 'text-blue-400' },
  { href: '/admin/super-admin', label: 'Super Admin', icon: FaCog, color: 'text-yellow-400' },
  { href: '/admin/trial-users', label: 'Essais utilisateurs', icon: FaClock, color: 'text-green-400' },
  { href: '/admin/my-properties', label: 'Mes annonces', icon: FaList, color: 'text-purple-400' },
  { href: '/admin/properties/add', label: 'Publier un bien', icon: FaPlus, color: 'text-emerald-400' },
  { href: '/admin/boost', label: 'Booster une annonce', icon: FaRocket, color: 'text-pink-400' },
  { href: '/admin/plans', label: 'Plans tarifaires', icon: FaDollarSign, color: 'text-amber-400' },
  { href: '/admin/validations', label: 'Validations ventes', icon: FaCheckCircle, color: 'text-teal-400' },
  { href: '/admin/users', label: 'Utilisateurs', icon: FaUsers, color: 'text-indigo-400' },
  { href: '/admin/revenue', label: 'Revenus', icon: FaChartLine, color: 'text-rose-400' },
  { href: '/admin/commissions', label: 'Commissions', icon: FaMoneyBill, color: 'text-orange-400' },
  { href: '/admin/messages', label: 'Messages', icon: FaEnvelope, color: 'text-cyan-400' },
  { href: '/admin/settings', label: 'Paramètres', icon: FaCog, color: 'text-gray-400' },
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

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">{children}</div>
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-col bg-slate-800 border-r border-slate-700">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-700 bg-slate-800/50">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-500/20">⭐</div>
            <div>
              <div className="font-bold text-white text-sm">ImmoStar</div>
              <div className="text-xs text-slate-400">Administration</div>
            </div>
          </div>

          {/* User Card */}
          <div className="mx-4 my-3 p-3 bg-slate-700/50 rounded-xl border border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-slate-400 truncate">{user?.email || 'admin@immostar.ci'}</div>
              </div>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm group ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-white font-semibold border border-orange-500/30 shadow-lg shadow-orange-500/10'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <IconComponent className={`text-base ${isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-slate-700 space-y-1">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-xl transition-all text-sm"
            >
              <FaEye className="text-base" /> Voir le site public
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all text-sm"
            >
              <FaSignOutAlt className="text-base" /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 h-14 flex items-center px-4 lg:px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700">
              <FaBars />
            </button>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-all">
                <FaBell className="text-lg" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
              </button>

              {/* User */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{user?.name || 'Admin'}</div>
                  <div className="text-xs text-slate-400">Administrateur</div>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {user?.name?.charAt(0) || 'A'}
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-slate-800 shadow-2xl border-r border-slate-700">
            <div className="flex items-center justify-between h-14 px-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="font-bold text-white">ImmoStar</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg">
                <FaTimes />
              </button>
            </div>
            <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100%-56px)]">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm ${
                      isActive ? 'bg-orange-500/20 text-white' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <item.icon className="text-base" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
