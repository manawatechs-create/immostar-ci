'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import Link from 'next/link'
import { FaCheck, FaStar, FaBuilding, FaPhone, FaEnvelope, FaUser, FaArrowRight } from 'react-icons/fa'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('trial')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'owner',
    agencyName: '',
  })

  const plans = [
    {
      id: 'trial',
      name: 'Essai Gratuit',
      icon: '🎁',
      price: '0 FCFA',
      duration: '90 jours',
      features: ['Biens illimités', 'Toutes les fonctionnalités', 'Support prioritaire', 'Sans engagement'],
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      badge: 'RECOMMANDÉ',
      badgeColor: 'bg-green-500',
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: '⭐',
      price: '25 000 FCFA/mois',
      duration: 'Après essai',
      features: ['Biens illimités', 'Mise en avant', 'Statistiques', 'Badge Pro', 'Support dédié'],
      color: 'border-orange-500',
      bgColor: 'bg-orange-50',
      badge: 'POPULAIRE',
      badgeColor: 'bg-orange-500',
    },
    {
      id: 'agency',
      name: 'Agence',
      icon: '🏢',
      price: '50 000 FCFA/mois',
      duration: 'Après essai',
      features: ['Tout le plan Pro', '5 utilisateurs', 'API dédiée', 'Gestionnaire dédié', 'Formation'],
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-500',
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
      return
    }

    setLoading(true)
    
    // Simuler l'inscription
    setTimeout(() => {
      // Sauvegarder les infos utilisateur
      localStorage.setItem('user_registered', JSON.stringify({
        ...form,
        plan: selectedPlan,
        registeredAt: new Date().toISOString(),
        trialStart: new Date().toISOString(),
      }))
      
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h1>
            <p className="text-gray-500 mb-6">
              Bienvenue <strong>{form.name}</strong> ! 
              {selectedPlan === 'trial' 
                ? ' Votre période d\'essai de 90 jours commence maintenant.' 
                : ' Votre compte a été créé avec succès.'}
            </p>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-left space-y-2 text-sm">
              <p><strong>📋 Résumé :</strong></p>
              <p>👤 Nom : {form.name}</p>
              <p>📧 Email : {form.email}</p>
              <p>📱 Téléphone : {form.phone}</p>
              <p>🎯 Plan : {plans.find(p => p.id === selectedPlan)?.name}</p>
              {selectedPlan === 'trial' && (
                <div className="mt-3 p-3 bg-green-50 rounded-xl text-green-700 text-xs">
                  🎁 Votre essai gratuit de 90 jours est activé. Vous pouvez publier des biens en illimité.
                </div>
              )}
            </div>

            <Link href="/admin/dashboard" className="btn-primary text-lg">
              Accéder à mon espace <FaArrowRight className="inline ml-2" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-8">
        <div className="max-w-2xl mx-auto">
          {/* Étapes */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${step === 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
              {step === 1 ? '1. Choisir un plan' : '✅ Plan choisi'}
            </div>
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2. Infos personnelles
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">🎯 Choisissez votre plan</h1>
                  <p className="text-gray-500 mt-2">Commencez avec l&apos;essai gratuit, passez Pro quand vous voulez</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`${plan.bgColor} rounded-2xl border-2 ${plan.color} p-6 cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan === plan.id ? 'scale-105 shadow-xl ring-2 ring-orange-400' : ''
                      }`}
                    >
                      {plan.badge && (
                        <div className={`${plan.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3`}>
                          {plan.badge}
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <span className="text-4xl block mb-2">{plan.icon}</span>
                        <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                        <div className="mt-2">
                          <span className="text-2xl font-black text-gray-800">{plan.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{plan.duration}</p>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCheck className="text-green-500 text-xs flex-shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>

                      <div className={`w-full py-2 rounded-full text-sm font-bold text-center border-2 ${
                        selectedPlan === plan.id ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300 text-gray-600'
                      }`}>
                        {selectedPlan === plan.id ? '✅ Sélectionné' : 'Choisir'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
                  <p>🎁 <strong>Offre spéciale :</strong> 90 jours d&apos;essai gratuit, sans engagement. Vous ne paierez que si vous choisissez de continuer après l&apos;essai.</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4 max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Créez votre compte</h2>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center gap-3">
                  <span className="text-2xl">{plans.find(p => p.id === selectedPlan)?.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{plans.find(p => p.id === selectedPlan)?.name}</div>
                    <div className="text-xs text-gray-500">{plans.find(p => p.id === selectedPlan)?.price} • {plans.find(p => p.id === selectedPlan)?.duration}</div>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs text-orange-600 hover:underline">
                    Modifier
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type de compte</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setForm({...form, userType: 'owner'})}
                      className={`p-3 rounded-xl border-2 text-center text-sm ${form.userType === 'owner' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                      🏠 Propriétaire
                    </button>
                    <button type="button" onClick={() => setForm({...form, userType: 'agency'})}
                      className={`p-3 rounded-xl border-2 text-center text-sm ${form.userType === 'agency' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                      🏢 Agence
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nom complet *</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" required className="input-field pl-12" placeholder="Votre nom"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                </div>

                {form.userType === 'agency' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nom de l&apos;agence</label>
                    <div className="relative">
                      <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" className="input-field pl-12" placeholder="Nom de votre agence"
                        value={form.agencyName} onChange={e => setForm({...form, agencyName: e.target.value})} />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" required className="input-field pl-12" placeholder="votre@email.com"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Téléphone *</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" required className="input-field pl-12" placeholder="+225 07 00 00 00"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe *</label>
                  <input type="password" required className="input-field" placeholder="Minimum 6 caractères"
                    value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                </div>
              </div>
            )}

            {/* Boutons */}
            <div className="flex justify-center gap-3 mt-6">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="btn-outline">
                  ← Retour
                </button>
              )}
              <button type="submit" disabled={loading} className="btn-primary text-lg">
                {loading ? '⏳ Création...' : step === 1 ? 'Continuer →' : '✅ Créer mon compte'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Déjà un compte ? <Link href="/login" className="text-orange-600 font-semibold">Se connecter</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
