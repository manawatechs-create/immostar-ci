'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'owner' | 'agency'>('owner')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', agencyName: '', agencyLicense: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/register-success')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Créer un compte</h1>
            <p className="text-gray-500 mt-2">Rejoignez ImmoStar et commencez à vendre</p>
          </div>

          {/* Type de compte */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Type de compte</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('owner')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  userType === 'owner' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-3xl block mb-2">🏠</span>
                <span className="font-semibold text-sm">Propriétaire</span>
                <p className="text-xs text-gray-500 mt-1">Je vends ou loue mes biens</p>
              </button>
              <button
                type="button"
                onClick={() => setUserType('agency')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  userType === 'agency' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-3xl block mb-2">🏢</span>
                <span className="font-semibold text-sm">Agence</span>
                <p className="text-xs text-gray-500 mt-1">Je gère plusieurs biens</p>
              </button>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required className="input-field pl-12" placeholder="Votre nom complet"
                  value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required className="input-field pl-12" placeholder="votre@email.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" required className="input-field pl-12" placeholder="+225 XX XX XX XX"
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
            </div>

            {userType === 'agency' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'agence *</label>
                  <input type="text" required className="input-field" placeholder="Nom de votre agence"
                    value={form.agencyName} onChange={e => setForm({...form, agencyName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de licence</label>
                  <input type="text" className="input-field" placeholder="N° licence professionnelle"
                    value={form.agencyLicense} onChange={e => setForm({...form, agencyLicense: e.target.value})} />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" required className="input-field pl-12" placeholder="Minimum 6 caractères"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
              <p>💰 <strong>Commission de 3%</strong> uniquement si vous vendez grâce à ImmoStar.</p>
              <p>🆓 <strong>3 biens gratuits</strong>, puis abonnement Pro à 25 000 FCFA/mois.</p>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full text-lg">
              {loading ? 'Création en cours...' : '✅ Créer mon compte gratuit'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Déjà un compte ? <Link href="/login" className="text-orange-600 font-semibold">Se connecter</Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
