'use client'
import { useState } from 'react'
import { FaUser, FaSave, FaCamera } from 'react-icons/fa'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Administrateur',
    email: 'admin@immostar.ci',
    phone: '+225 07 08 43 21 72',
    avatar: '',
  })
  const [saved, setSaved] = useState(false)

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">👤 Profil</h1>
      
      {saved && <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm">✅ Profil mis à jour !</div>}
      
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl font-bold text-orange-600">
              {profile.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-orange-600">
              <FaCamera />
            </button>
          </div>
        </div>
        <input type="text" className="input-field" placeholder="Nom" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
        <input type="email" className="input-field" placeholder="Email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
        <input type="tel" className="input-field" placeholder="Téléphone" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
        <button onClick={() => setSaved(true)} className="btn-primary w-full flex items-center justify-center gap-2">
          <FaSave /> Sauvegarder
        </button>
      </div>
    </div>
  )
}
