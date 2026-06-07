'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaEnvelope, FaLock } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Connexion</h1>
            <p className="text-gray-500 mt-2">Accédez à votre espace ImmoStar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required className="input-field pl-12" placeholder="votre@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" required className="input-field pl-12" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <p className="text-center text-sm text-gray-500">
              Pas de compte ? <Link href="/register" className="text-orange-600 font-semibold">S&apos;inscrire</Link>
            </p>
          </form>

          <div className="text-center mt-4">
            <Link href="/admin/login" className="text-sm text-gray-400 hover:text-orange-500">
              🔐 Accès administrateur
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
