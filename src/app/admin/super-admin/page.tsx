'use client'

import { useState, useEffect } from 'react'
import { FaSave, FaCheck, FaRobot, FaMoon, FaComments, FaStar, FaFilePdf, FaVrCardboard, FaNewspaper, FaBell, FaChartBar } from 'react-icons/fa'

export default function SuperAdminPage() {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [features, setFeatures] = useState<any>({})

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const res = await fetch('/api/features')
      const data = await res.json()
      setFeatures(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const toggleFeature = async (key: string) => {
    const newValue = !features[key]
    
    // Mise à jour optimiste
    setFeatures((prev: any) => ({ ...prev, [key]: newValue }))

    // Sauvegarder via l'API
    await fetch('/api/features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle', key, value: newValue })
    })
  }

  const handleSaveAll = async () => {
    setLoading(true)
    await fetch('/api/features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'saveAll', features })
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const featureGroups = [
    {
      title: '💰 Monétisation',
      items: [
        { key: 'subscriptions', label: 'Abonnements Pro/Agence', icon: FaChartBar },
        { key: 'boosts', label: 'Boosts d\'annonces', icon: FaChartBar },
        { key: 'commissions', label: 'Commissions sur ventes', icon: FaChartBar },
        { key: 'mobileMoney', label: 'Paiement Mobile Money', icon: FaChartBar },
        { key: 'photoService', label: 'Service photo pro', icon: FaChartBar },
      ]
    },
    {
      title: '🎁 Période d\'essai',
      items: [
        { key: 'trialActive', label: 'Période d\'essai active', icon: FaChartBar },
        { key: 'showUpgradeBanner', label: 'Bannière upgrade', icon: FaChartBar },
      ]
    },
    {
      title: '🚀 Fonctionnalités',
      items: [
        { key: 'chatbot', label: 'ChatBot assistant', icon: FaRobot },
        { key: 'darkMode', label: 'Mode sombre', icon: FaMoon },
        { key: 'messaging', label: 'Messagerie interne', icon: FaComments },
        { key: 'reviews', label: 'Avis et notations', icon: FaStar },
        { key: 'pdfExport', label: 'Export PDF', icon: FaFilePdf },
        { key: 'virtualTour', label: 'Visite virtuelle 360°', icon: FaVrCardboard },
        { key: 'blog', label: 'Blog immobilier', icon: FaNewspaper },
        { key: 'notifications', label: 'Notifications', icon: FaBell },
        { key: 'compareTool', label: 'Comparateur de biens', icon: FaChartBar },
      ]
    },
  ]

  const activeCount = Object.values(features).filter(Boolean).length
  const totalCount = Object.values(features).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">⚡ Super Admin</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeCount}/{totalCount} fonctionnalités activées • Impact immédiat sur le site
          </p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm flex items-center gap-2 animate-fade-in-up">
          <FaCheck /> ✅ Configuration sauvegardée ! Le site public est à jour.
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progression</span>
          <span className="text-sm font-bold text-orange-600">{activeCount}/{totalCount}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
            style={{ width: `${(activeCount / totalCount) * 100}%` }} />
        </div>
      </div>

      {featureGroups.map(group => (
        <div key={group.title} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{group.title}</h2>
          <div className="space-y-3">
            {group.items.map(feature => {
              const isActive = features[feature.key]
              return (
                <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                      <feature.icon className="text-lg" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{feature.label}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.key)}
                    className={`relative w-14 h-7 rounded-full transition-all ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-md ${isActive ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
