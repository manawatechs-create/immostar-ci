'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FaHome, FaBuilding, FaMoneyBill, FaCog, 
  FaSignOutAlt, FaBars, FaTimes, FaPlus,
  FaChartLine, FaUsers, FaEnvelope,
  FaCheckCircle, FaExclamationTriangle, FaPhone,
  FaRocket, FaCamera, FaUserPlus
} from 'react-icons/fa'

const menuItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: FaHome },
  { href: '/admin/properties', label: 'Biens immobiliers', icon: FaBuilding },
  { href: '/admin/properties/add', label: 'Ajouter un bien', icon: FaPlus },
  { href: '/admin/my-properties', label: 'Mes annonces', icon: FaHome },
  { href: '/admin/boost', label: '🚀 Booster une annonce', icon: FaRocket },
  { href: '/admin/photo-service', label: '📸 Service photo', icon: FaCamera },
  { href: '/admin/validations', label: 'Validations ventes', icon: FaCheckCircle },
  { href: '/admin/fraud-detection', label: 'Détection fraude', icon: FaExclamationTriangle },
  { href: '/admin/relances', label: 'Relances', icon: FaPhone },
    { href: '/admin/revenue', label: '💰 Revenus', icon: FaMoneyBill },
  { href: '/admin/commissions', label: 'Commissions', icon: FaMoneyBill },
  { href: '/admin/users', label: '👥 Utilisateurs', icon: FaUsers },
  { href: '/admin/transactions', label: 'Transactions', icon: FaChartLine },
  { href: '/admin/messages', label: 'Messages', icon: FaEnvelope },
  { href: '/admin/settings', label: 'Paramètres', icon: FaCog },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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
  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="loader"></div></div>
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gray-900 text-white overflow-y-auto">
          <div className="flex items-center h-16 px-6 border-b border-gray-800">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div><div className="font-bold text-sm">ImmoStar</div><div className="text-xs text-gray-400">Administration</div></div>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${isActive ? 'bg-orange-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                  <IconComponent className="text-base" />{item.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <a href="/" target="_blank" className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl transition-all text-sm">
              <FaHome className="text-base" /> Voir le site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-300 hover:bg-red-600/20 hover:text-red-400 rounded-xl transition-all text-sm">
              <FaSignOutAlt className="text-base" /> Déconnexion
            </button>
          </div>
        </div>
      </aside>
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6 lg:p-8 min-h-screen">{children}</main>
      </div>
    </div>
  )
}
