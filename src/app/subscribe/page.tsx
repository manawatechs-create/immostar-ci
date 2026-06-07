'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCheck, FaStar, FaBuilding, FaRocket, FaClock } from 'react-icons/fa'
import Link from 'next/link'

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState('')
  const [phone, setPhone] = useState('')
  const [activated, setActivated] = useState(false)
  const [isTrial, setIsTrial] = useState(false)
  const [loading, setLoading] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Gratuit',
      icon: '🏠',
      price: '0 FCFA',
      period: '',
      features: ['3 biens maximum', 'Annonces standards', 'Support par email'],
      notIncluded: ['Mise en avant', 'Statistiques', 'Badge Pro'],
      color: 'border-gray-200',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: '⭐',
      price: '25 000 FCFA',
      period: '/mois',
      trialText: '7 jours d\'essai GRATUIT',
      features: ['Biens illimités', 'Mise en avant', 'Statistiques détaillées', 'Badge Pro', 'Support prioritaire'],
      color: 'border-orange-500',
      popular: true,
      bgColor: 'bg-gradient-to-b from-orange-50 to-white',
    },
    {
      id: 'agency',
      name: 'Agence',
      icon: '🏢',
      price: '50 000 FCFA',
      period: '/mois',
      trialText: '7 jours d\'essai GRATUIT',
      features: ['Tout le plan Pro', '5 utilisateurs', 'API dédiée', 'Gestionnaire de compte', 'Formation offerte'],
      color: 'border-purple-500',
      popular: false,
      bgColor: 'bg-gradient-to-b from-purple-50 to-white',
    },
  ]

  const handleActivate = async () => {
    if (!selectedPlan || !phone) {
      alert('Veuillez choisir un plan et entrer votre numéro')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (selectedPlan === 'free') {
        setActivated(true)
        setIsTrial(false)
      } else {
        setActivated(true)
        setIsTrial(true)
      }
    }, 1000)
  }

  if (activated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">{isTrial ? '🎉' : '✅'}</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isTrial ? 'Essai gratuit activé !' : 'Compte activé !'}
            </h1>
            <p className="text-gray-500 mb-6">
              {isTrial 
                ? 'Vous avez 7 jours pour tester toutes les fonctionnalités Pro gratuitement.' 
                : 'Votre compte gratuit est prêt. Publiez jusqu\'à 3 biens.'}
            </p>
            <Link href="/admin/dashboard" className="btn-primary">
              Accéder à mon espace
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
      
      <main>
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-3">⭐ Choisissez votre plan</h1>
            <p className="text-orange-100 text-lg">Commencez gratuitement, passez Pro quand vous voulez</p>
          </div>
        </section>

        <section className="container-main -mt-8 relative z-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`${plan.bgColor || 'bg-white'} rounded-2xl shadow-sm border-2 ${plan.color} p-6 relative cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === plan.id ? 'scale-105 shadow-xl' : ''
                } ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    LE PLUS POPULAIRE
                  </div>
                )}

                <div className="text-center mb-4">
                  <span className="text-4xl block mb-2">{plan.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-gray-800">{plan.price}</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  {plan.trialText && (
                    <div className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <FaClock className="text-xs" /> {plan.trialText}
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheck className="text-green-500 text-xs flex-shrink-0" /> {f}
                    </li>
                  ))}
                  {plan.notIncluded?.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                      <span className="text-xs">✕</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Activation */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">📱 Activez votre compte</h3>
              <div className="space-y-3">
                <input
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-field"
                />
                <button
                  onClick={handleActivate}
                  disabled={!selectedPlan || loading}
                  className="btn-primary w-full"
                >
                  {loading ? '⏳ Activation...' : selectedPlan === 'free' 
                    ? '✅ Commencer gratuitement' 
                    : '🎉 Activer l\'essai gratuit'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  {selectedPlan === 'pro' || selectedPlan === 'agency' 
                    ? '7 jours gratuits, puis 25 000 ou 50 000 FCFA/mois. Annulez à tout moment.'
                    : 'Gratuit pour toujours. 3 biens maximum.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
