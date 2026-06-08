'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (email === 'admin@immostar.ci' && password === 'admin123') {
        localStorage.setItem('admin_token', 'immostar_admin_2025')
        localStorage.setItem('admin_user', JSON.stringify({ name: 'Administrateur', email, role: 'admin' }))
        router.push('/admin/dashboard')
      } else {
        setError('Email ou mot de passe incorrect')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg shadow-orange-500/20">⭐</div>
          <h1 className="text-2xl font-bold text-white">ImmoStar Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Espace d&apos;administration</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@immostar.ci" required
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full pl-12 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50">
              {loading ? 'Connexion...' : '🔐 Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">← Retour au site public</a>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">© 2026 Manawa Techs</p>
      </div>
    </div>
  )
}
