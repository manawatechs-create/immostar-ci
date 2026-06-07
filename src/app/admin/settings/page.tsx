'use client'

import { useState } from 'react'
import { FaSave, FaMoon, FaSun, FaPalette } from 'react-icons/fa'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'ImmoStar',
    darkMode: false,
    commissionRate: '3',
    emailNotifications: true,
    smsNotifications: false,
    language: 'fr',
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">⚙️ Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">Configuration de votre espace</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm animate-fade-in-up">
          ✅ Paramètres sauvegardés avec succès !
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Mode sombre */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              {settings.darkMode ? <FaMoon className="text-indigo-600" /> : <FaSun className="text-yellow-500" />}
            </div>
            <div>
              <div className="font-medium text-gray-800">Mode sombre</div>
              <div className="text-xs text-gray-500">Interface sombre pour l&apos;administration</div>
            </div>
          </div>
          <button
            onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
            className={`w-14 h-7 rounded-full transition-all ${settings.darkMode ? 'bg-indigo-600' : 'bg-gray-300'} relative`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${settings.darkMode ? 'right-1' : 'left-1'}`} />
          </button>
        </div>

        {/* Taux de commission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Taux de commission (%)</label>
          <input type="number" value={settings.commissionRate}
            onChange={e => setSettings({...settings, commissionRate: e.target.value})}
            className="input-field w-32" />
        </div>

        {/* Notifications email */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">Notifications email</div>
            <div className="text-xs text-gray-500">Recevoir les alertes par email</div>
          </div>
          <button
            onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
            className={`w-14 h-7 rounded-full transition-all ${settings.emailNotifications ? 'bg-green-500' : 'bg-gray-300'} relative`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${settings.emailNotifications ? 'right-1' : 'left-1'}`} />
          </button>
        </div>

        {/* Notifications SMS */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">Notifications SMS</div>
            <div className="text-xs text-gray-500">Recevoir les alertes par SMS</div>
          </div>
          <button
            onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})}
            className={`w-14 h-7 rounded-full transition-all ${settings.smsNotifications ? 'bg-green-500' : 'bg-gray-300'} relative`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${settings.smsNotifications ? 'right-1' : 'left-1'}`} />
          </button>
        </div>

        {/* Langue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
          <select value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})}
            className="input-field w-48">
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>

        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <FaSave /> Sauvegarder les paramètres
        </button>
      </div>
    </div>
  )
}
