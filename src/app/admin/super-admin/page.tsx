'use client'

import { useState, useEffect } from 'react'
import { FaSave, FaCheck, FaRobot, FaMoon, FaComments, FaStar, FaFilePdf, FaVrCardboard, FaNewspaper, FaBell, FaChartBar, FaSync, FaPlug } from 'react-icons/fa'

export default function SuperAdminPage() {
  const [features, setFeatures] = useState<any>({})
  const [saved, setSaved] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [connected, setConnected] = useState(false)
  const [lastSync, setLastSync] = useState('')

  useEffect(() => {
    loadState()
    // Vérifier la connexion
    const interval = setInterval(checkConnection, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadState = async () => {
    try {
      const res = await fetch('/api/sync')
      const data = await res.json()
      setFeatures(data.features || {})
      setLastSync(new Date().toLocaleTimeString('fr-FR'))
      setConnected(true)
    } catch (error) {
      setConnected(false)
    }
  }

  const checkConnection = async () => {
    try {
      await fetch('/api/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ping' }) })
      setConnected(true)
    } catch {
      setConnected(false)
    }
  }

  const toggleFeature = async (key: string) => {
    const newValue = !features[key]
    
    // Optimiste : mise à jour immédiate
    setFeatures((prev: any) => ({ ...prev, [key]: newValue }))
    setSyncing(true)

    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggleFeature', data: { key, value: newValue } })
      })
      setLastSync(new Date().toLocaleTimeString('fr-FR'))
    } catch (error) {
      // Revenir en arrière si erreur
      setFeatures((prev: any) => ({ ...prev, [key]: !newValue }))
    } finally {
      setSyncing(false)
    }
  }

  const featureGroups = [
    {
      title: '🤖 Fonctionnalités site',
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
    {
      title: '💰 Monétisation',
      items: [
        { key: 'subscriptions', label: 'Abonnements Pro/Agence', icon: FaChartBar },
        { key: 'boosts', label: 'Boosts d\'annonces', icon: FaChartBar },
        { key: 'commissions', label: 'Commissions sur ventes', icon: FaChartBar },
        { key: 'showUpgradeBanner', label: 'Bannière upgrade', icon: FaChartBar },
      ]
    },
  ]

  const activeCount = Object.values(features).filter(Boolean).length
  const totalCount = Object.values(features).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Super Admin</h1>
          <p className="text-slate-400 text-sm mt-1">
            Modifications en temps réel • 
            <span className={`ml-2 flex items-center gap-1 ${connected ? 'text-green-400' : 'text-red-400'}`}>
              <FaPlug className={`text-xs ${connected ? '' : 'animate-pulse'}`} />
              {connected ? 'Connecté' : 'Déconnecté'}
            </span>
            {lastSync && <span className="text-slate-500 ml-2">• Dernière sync : {lastSync}</span>}
          </p>
        </div>
      </div>

      {/* Alerte sync */}
      {syncing && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-blue-400 text-sm flex items-center gap-2 animate-pulse">
          <FaSync className="animate-spin" /> Synchronisation en cours...
        </div>
      )}

      {saved && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-sm flex items-center gap-2">
          <FaCheck /> Configuration sauvegardée ! Le site public est à jour.
        </div>
      )}

      {/* Barre de progression */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Fonctionnalités activées</span>
          <span className="text-sm font-bold text-orange-400">{activeCount}/{totalCount}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${(activeCount / totalCount) * 100}%` }} />
        </div>
      </div>

      {/* Groupes */}
      {featureGroups.map(group => (
        <div key={group.title} className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-lg font-bold text-white mb-4">{group.title}</h2>
          <div className="space-y-3">
            {group.items.map(feature => {
              const isActive = features[feature.key]
              return (
                <div key={feature.key} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/50 text-slate-500'}`}>
                      <feature.icon className="text-lg" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{feature.label}</div>
                      <div className="text-xs text-slate-400">
                        {isActive ? '✅ Activé - Visible sur le site' : '❌ Désactivé - Non visible'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.key)}
                    disabled={syncing}
                    className={`relative w-14 h-7 rounded-full transition-all ${isActive ? 'bg-green-500' : 'bg-slate-600'} disabled:opacity-50`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-md ${isActive ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="text-center pb-8">
        <p className="text-slate-500 text-xs">
          ⚡ Les modifications sont appliquées en temps réel sur le site public (délai max : 3 secondes)
        </p>
      </div>
    </div>
  )
}
