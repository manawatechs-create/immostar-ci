'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCheck } from 'react-icons/fa'

export default function UpgradePage() {
  const [plans, setPlans] = useState<any>({})
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlans()
    // Rafraîchir toutes les 10 secondes
    const interval = setInterval(fetchPlans, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/data?type=plans')
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratuit'
    return price.toLocaleString() + ' FCFA/mois'
  }

  if (loading) {
    return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>
  }

  const planList = [
    { id: 'trial', icon: '🎁', color: 'border-green-500', bg: 'bg-green-50' },
    { id: 'pro', icon: '⭐', color: 'border-orange-500', bg: 'bg-orange-50', popular: true },
    { id: 'agency', icon: '🏢', color: 'border-purple-500', bg: 'bg-purple-50' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl font-black mb-4">⭐ Choisissez votre plan</h1>
            <p className="text-xl text-orange-100">Les prix sont mis à jour en temps réel</p>
          </div>
        </section>

        <section className="container-main -mt-8 relative z-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planList.map(p => {
              const plan = plans[p.id]
              if (!plan) return null
              return (
                <div key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`${p.bg} rounded-2xl border-2 ${p.color} p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlan === p.id ? 'scale-105 shadow-xl ring-2 ring-orange-400' : ''
                  } ${p.popular ? 'md:-mt-4' : ''}`}>
                  
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      RECOMMANDÉ
                    </div>
                  )}

                  <div className="text-center">
                    <span className="text-4xl block mb-2">{p.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                    <div className="mt-3">
                      <span className="text-3xl font-black text-orange-600">{formatPrice(plan.price)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plan.duration}</p>
                  </div>

                  <ul className="space-y-2 my-4">
                    {plan.features?.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheck className="text-green-500 text-xs" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    p.id === 'trial' ? 'border-2 border-green-500 text-green-700 hover:bg-green-100' :
                    'btn-primary'
                  }`}>
                    {p.id === 'trial' ? 'Essai gratuit' : `Choisir ${plan.name}`}
                  </button>
                </div>
              )
            })}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Prix mis à jour automatiquement • Dernière synchronisation : {new Date().toLocaleTimeString('fr-FR')}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
