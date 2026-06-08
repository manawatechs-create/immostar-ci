'use client'

import { useState } from 'react'
import { FaToggleOn, FaToggleOff, FaSave, FaUsers, FaClock, FaCheck, FaTimes } from 'react-icons/fa'

// Simuler les features (en production, viendrait de la BDD)
const initialFeatures = {
  SUBSCRIPTIONS_ENABLED: false,
  BOOSTS_ENABLED: false,
  COMMISSIONS_ENABLED: false,
  MOBILE_MONEY_ENABLED: false,
  PHOTO_SERVICE_ENABLED: false,
  SHOW_UPGRADE_BANNER: false,
  TRIAL_ACTIVE: true,
}

export default function SuperAdminPage() {
  const [features, setFeatures] = useState(initialFeatures)
  const [saved, setSaved] = useState(false)
  const [commissionRate, setCommissionRate] = useState('3')
  const [freeLimit, setFreeLimit] = useState('3')
  const [trialDays, setTrialDays] = useState('90')

  const toggleFeature = (key: string) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    // En production : sauvegarder en BDD
  }

  const featureList = [
    { key: 'SUBSCRIPTIONS_ENABLED', label: '💰 Abonnements', desc: 'Activer les abonnements Pro/Agence', icon: '💰' },
    { key: 'BOOSTS_ENABLED', label: '🚀 Boosts d\'annonces', desc: 'Activer la vente de boosts', icon: '🚀' },
    { key: 'COMMISSIONS_ENABLED', label: '💸 Commissions', desc: 'Activer les commissions sur ventes', icon: '💸' },
    { key: 'MOBILE_MONEY_ENABLED', label: '📱 Mobile Money', desc: 'Activer le paiement Mobile Money', icon: '📱' },
    { key: 'PHOTO_SERVICE_ENABLED', label: '📸 Service photo', desc: 'Activer le service photo pro', icon: '📸' },
    { key: 'SHOW_UPGRADE_BANNER', label: '📢 Bannière upgrade', desc: 'Afficher la bannière de fin d\'essai', icon: '📢' },
    { key: 'TRIAL_ACTIVE', label: '🎁 Période d\'essai', desc: 'Période d\'essai gratuite active', icon: '🎁' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">⚡ Super Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Contrôle des fonctionnalités et abonnements</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm animate-fade-in-up flex items-center gap-2">
          <FaCheck /> Configuration sauvegardée avec succès !
        </div>
      )}

      {/* Configuration */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">⚙️ Paramètres généraux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Taux de commission (%)</label>
            <input type="number" value={commissionRate} onChange={e => setCommissionRate(e.target.value)}
              className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Biens gratuits max</label>
            <input type="number" value={freeLimit} onChange={e => setFreeLimit(e.target.value)}
              className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Jours d'essai</label>
            <input type="number" value={trialDays} onChange={e => setTrialDays(e.target.value)}
              className="input-field text-sm" />
          </div>
        </div>
      </div>

      {/* Features Toggles */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">🎯 Activer/Désactiver les fonctionnalités</h2>
        <div className="space-y-3">
          {featureList.map(feature => (
            <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <div className="font-medium text-gray-800 text-sm">{feature.label}</div>
                  <div className="text-xs text-gray-500">{feature.desc}</div>
                </div>
              </div>
              <button
                onClick={() => toggleFeature(feature.key)}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  features[feature.key as keyof typeof features] ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                  features[feature.key as keyof typeof features] ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary flex items-center gap-2">
        <FaSave /> Sauvegarder la configuration
      </button>
    </div>
  )
}
