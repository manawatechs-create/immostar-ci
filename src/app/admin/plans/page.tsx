'use client'

import { useState, useEffect } from 'react'
import { FaSave, FaCheck, FaSync, FaEdit, FaDollarSign } from 'react-icons/fa'

export default function PlansPage() {
  const [plans, setPlans] = useState<any>({})
  const [boostPlans, setBoostPlans] = useState<any>({})
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('subscriptions')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const [plansRes, boostRes] = await Promise.all([
        fetch('/api/data?type=plans'),
        fetch('/api/data?type=boostPlans')
      ])
      setPlans(await plansRes.json())
      setBoostPlans(await boostRes.json())
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const updatePlanPrice = (planKey: string, price: number) => {
    setPlans((prev: any) => ({
      ...prev,
      [planKey]: { ...prev[planKey], price }
    }))
  }

  const updatePlanName = (planKey: string, name: string) => {
    setPlans((prev: any) => ({
      ...prev,
      [planKey]: { ...prev[planKey], name }
    }))
  }

  const updateBoostPrice = (boostKey: string, price: number) => {
    setBoostPlans((prev: any) => ({
      ...prev,
      [boostKey]: { ...prev[boostKey], price }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (activeTab === 'subscriptions') {
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'updatePlans', data: plans })
        })
      } else {
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'updateBoostPlans', data: boostPlans })
        })
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratuit'
    return price.toLocaleString() + ' FCFA'
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">💰 Gestion des plans tarifaires</h1>
        <p className="text-gray-500 text-sm mt-1">Modifiez les prix en direct - Le site public se met à jour automatiquement</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm flex items-center gap-2 animate-fade-in-up">
          <FaCheck /> ✅ Prix mis à jour ! Le site public est synchronisé.
        </div>
      )}

      {/* Onglets */}
      <div className="flex gap-2">
        <button onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${activeTab === 'subscriptions' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
          ⭐ Abonnements
        </button>
        <button onClick={() => setActiveTab('boosts')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${activeTab === 'boosts' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
          🚀 Boosts
        </button>
      </div>

      {/* Abonnements */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h3 className="font-bold text-gray-800 text-lg">⭐ Plans d&apos;abonnement</h3>
          
          {Object.entries(plans).map(([key, plan]: [string, any]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => updatePlanName(key, e.target.value)}
                    className="text-lg font-bold bg-transparent border-b border-dashed border-gray-300 focus:border-orange-500 outline-none w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1 capitalize">{key} • {plan.duration}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={plan.price}
                      onChange={(e) => updatePlanPrice(key, parseInt(e.target.value) || 0)}
                      className="w-32 text-right text-2xl font-black text-orange-600 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <span className="text-sm text-gray-500">FCFA</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{plan.properties === -1 ? 'Biens illimités' : `${plan.properties} biens`}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {plan.features?.map((f: string) => (
                  <span key={f} className="text-xs bg-white px-2 py-1 rounded-full border">✅ {f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Boosts */}
      {activeTab === 'boosts' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h3 className="font-bold text-gray-800 text-lg">🚀 Plans de boost</h3>
          
          {Object.entries(boostPlans).map(([key, plan]: [string, any]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-800">{plan.name}</div>
                  <p className="text-xs text-gray-500 capitalize">{key} • {plan.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updateBoostPrice(key, parseInt(e.target.value) || 0)}
                    className="w-28 text-right text-xl font-black text-orange-600 bg-white border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <span className="text-sm text-gray-500">FCFA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton sauvegarder */}
      <button onClick={handleSave} disabled={loading}
        className="btn-primary flex items-center gap-2 text-lg">
        {loading ? <FaSync className="animate-spin" /> : <FaSave />}
        {loading ? 'Sauvegarde...' : '💾 Sauvegarder et appliquer'}
      </button>

      {/* Aperçu en direct */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p>💡 <strong>Aperçu en direct :</strong></p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {Object.entries(plans).map(([key, plan]: [string, any]) => (
            <div key={key} className="bg-white rounded-lg p-3 text-center">
              <div className="font-bold text-sm">{plan.name}</div>
              <div className="text-lg font-black text-orange-600">{formatPrice(plan.price)}</div>
              <div className="text-xs text-gray-400">{plan.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
