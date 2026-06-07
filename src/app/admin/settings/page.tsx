'use client'
import { useState } from 'react'
import { FaSave } from 'react-icons/fa'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'ImmoStar',
    commissionRate: '5',
    emailContact: 'contact@immostar.ci',
    phoneContact: '+225 07 00 00 00 00',
    addressContact: 'Abidjan, Cocody',
  })

  const handleSave = () => {
    alert('Paramètres sauvegardés !')
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">Configuration du site</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du site</label>
          <input type="text" className={inputClass} value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Taux de commission (%)</label>
          <input type="number" className={inputClass} value={settings.commissionRate} onChange={e => setSettings({...settings, commissionRate: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
          <input type="email" className={inputClass} value={settings.emailContact} onChange={e => setSettings({...settings, emailContact: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input type="text" className={inputClass} value={settings.phoneContact} onChange={e => setSettings({...settings, phoneContact: e.target.value})} />
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <FaSave /> Sauvegarder
        </button>
      </div>
    </div>
  )
}
