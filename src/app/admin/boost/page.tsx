'use client'

import { useState } from 'react'
import { FaRocket, FaStar, FaFire, FaCheck } from 'react-icons/fa'

export default function BoostPage() {
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedBoost, setSelectedBoost] = useState('')
  const [success, setSuccess] = useState(false)

  const boostOptions = [
    { id: 'urgent', name: '⚠️ Urgent', price: '3 000 FCFA', duration: '7 jours', icon: FaFire, desc: 'Badge URGENT sur votre annonce', gain: '+30% de vues' },
    { id: 'top-3days', name: '🔝 Top 3 jours', price: '5 000 FCFA', duration: '3 jours', icon: FaRocket, desc: 'En haut des résultats de recherche', gain: '+80% de vues' },
    { id: 'top-7days', name: '🔝 Top 7 jours', price: '10 000 FCFA', duration: '7 jours', icon: FaRocket, desc: 'Une semaine en tête des recherches', gain: '+150% de vues' },
    { id: 'premium', name: '⭐ Premium', price: '15 000 FCFA', duration: '30 jours', icon: FaStar, desc: 'Mise en avant maximale + badge Premium', gain: '+300% de vues' },
  ]

  const handleBoost = () => {
    if (!selectedProperty || !selectedBoost) {
      alert('Sélectionnez un bien et une option')
      return
    }
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">🚀 Booster mes annonces</h1>
        <p className="text-gray-500 text-sm mt-1">Augmentez la visibilité de vos biens et vendez plus vite</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2 text-green-700 animate-fade-in-up">
          <FaCheck /> Boost activé ! Votre annonce est maintenant plus visible.
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionnez un bien</label>
        <select value={selectedProperty} onChange={e => setSelectedProperty(e.target.value)} className="input-field mb-6">
          <option value="">Choisir...</option>
          <option value="1">Villa Moderne Cocody - 85M FCFA</option>
          <option value="2">Appartement Plateau - 450K/mois</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-2">Choisissez un boost</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {boostOptions.map(opt => (
            <button key={opt.id} onClick={() => setSelectedBoost(opt.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedBoost === opt.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm flex items-center gap-2"><opt.icon /> {opt.name}</span>
                <span className="font-bold text-orange-600">{opt.price}</span>
              </div>
              <p className="text-xs text-gray-500">{opt.desc}</p>
              <p className="text-xs text-green-600 mt-1">📈 {opt.gain}</p>
            </button>
          ))}
        </div>

        <button onClick={handleBoost} disabled={!selectedProperty || !selectedBoost}
          className="btn-primary w-full disabled:opacity-50">
          🚀 Activer le boost - {selectedBoost ? boostOptions.find(b => b.id === selectedBoost)?.price : '...'}
        </button>
      </div>
    </div>
  )
}
