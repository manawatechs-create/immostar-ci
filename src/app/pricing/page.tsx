'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCheck, FaStar, FaBuilding, FaCamera, FaVideo, FaChartLine } from 'react-icons/fa'
import Link from 'next/link'

const plans = [
  {
    name: 'Basic',
    icon: '🏠',
    price: '0',
    period: 'gratuit',
    color: 'border-gray-200',
    bgColor: 'bg-white',
    buttonColor: 'btn-outline',
    popular: false,
    features: [
      '3 biens maximum',
      'Annonces standards',
      'Photos (5 par bien)',
      'Contact par email',
      'Support standard',
    ],
    notIncluded: [
      'Mise en avant',
      'Statistiques',
      'Visites virtuelles',
      'Multi-utilisateurs',
    ]
  },
  {
    name: 'Pro',
    icon: '⭐',
    price: '25 000',
    period: '/mois',
    color: 'border-orange-500',
    bgColor: 'bg-gradient-to-b from-orange-50 to-white',
    buttonColor: 'btn-primary',
    popular: true,
    features: [
      'Biens illimités',
      'Mise en avant prioritaire',
      'Photos illimitées',
      'Statistiques détaillées',
      'Support prioritaire',
      'Badge "Pro" sur le profil',
      'Contact WhatsApp direct',
    ],
    notIncluded: [
      'Visites virtuelles',
    ]
  },
  {
    name: 'Agence',
    icon: '🏢',
    price: '50 000',
    period: '/mois',
    color: 'border-purple-500',
    bgColor: 'bg-gradient-to-b from-purple-50 to-white',
    buttonColor: 'btn-primary bg-purple-600 hover:bg-purple-700',
    popular: false,
    features: [
      'Tout le plan Pro',
      '5 utilisateurs',
      'Visites virtuelles',
      'Rapports analytiques',
      'API dédiée',
      'Formation incluse',
      'Gestionnaire de compte',
    ],
    notIncluded: []
  }
]

const additionalServices = [
  { icon: FaCamera, name: 'Reportage photo pro', price: '50 000', desc: 'Photos professionnelles de votre bien' },
  { icon: FaVideo, name: 'Visite virtuelle 360°', price: '100 000', desc: 'Visite immersive pour vos annonces' },
  { icon: FaChartLine, name: 'Rapport d\'estimation', price: '25 000', desc: 'Évaluation détaillée du marché' },
  { icon: FaStar, name: 'Rédaction premium', price: '15 000', desc: 'Annonce rédigée par des experts' },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Header */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl font-black mb-4">💰 Plans & Tarifs</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Choisissez le plan qui correspond à vos besoins et commencez à vendre plus rapidement
            </p>
          </div>
        </section>

        {/* Commission Banner */}
        <section className="container-main -mt-8 relative z-20 mb-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white text-center">
            <p className="text-lg font-semibold">💵 Commission unique de 3% sur chaque vente réussie</p>
            <p className="text-sm text-green-100 mt-1">Vous ne payez que lorsque vous vendez !</p>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="container-main mb-8 text-center">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === 'monthly' ? 'bg-orange-500 text-white' : 'text-gray-600'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === 'yearly' ? 'bg-orange-500 text-white' : 'text-gray-600'
              }`}
            >
              Annuel (-20%)
            </button>
          </div>
        </section>

        {/* Plans */}
        <section className="container-main mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`${plan.bgColor} rounded-2xl shadow-sm border-2 ${plan.color} p-6 relative ${plan.popular ? 'scale-105 md:-mt-4' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    LE PLUS POPULAIRE
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <span className="text-4xl mb-3 block">{plan.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="text-4xl font-black text-gray-800">
                      {billing === 'yearly' && plan.price !== '0' 
                        ? Math.round(parseInt(plan.price.replace(' ', '')) * 0.8).toLocaleString() 
                        : plan.price}
                    </span>
                    <span className="text-gray-500"> FCFA{plan.period}</span>
                  </div>
                  {billing === 'yearly' && plan.price !== '0' && (
                    <p className="text-xs text-green-600 mt-1">Économisez 20%</p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                      <span className="w-4 text-center">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.price === '0' ? '/register' : '/register?plan=' + plan.name.toLowerCase()}
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.buttonColor === 'btn-primary' 
                      ? 'btn-primary w-full' 
                      : plan.buttonColor.includes('purple')
                        ? 'w-full bg-purple-600 text-white rounded-xl py-3 font-semibold hover:bg-purple-700'
                        : 'btn-outline w-full'
                  }`}
                >
                  {plan.price === '0' ? 'Commencer gratuitement' : 'Choisir ' + plan.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="container-main mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">🚀 Services additionnels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalServices.map((service) => (
              <div key={service.name} className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-all">
                <service.icon className="text-4xl text-orange-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-1">{service.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
                <p className="text-2xl font-black text-orange-600">{service.price} FCFA</p>
                <button className="btn-outline w-full mt-3 text-sm">Commander</button>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Calculator */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-12">
          <div className="container-main text-center max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🧮 Simulez vos revenus</h2>
            <p className="text-gray-600 mb-6">Estimez combien vous pouvez gagner avec ImmoStar</p>
            
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Biens vendus/mois</label>
                  <input type="number" defaultValue="3" className="input-field" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Prix moyen (FCFA)</label>
                  <input type="number" defaultValue="50000000" className="input-field" />
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600">Revenu estimé</p>
                <p className="text-3xl font-black text-green-600">4 500 000 FCFA/mois</p>
                <p className="text-xs text-gray-500">Basé sur une commission de 3%</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
