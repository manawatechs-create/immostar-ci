'use client'

import { useState } from 'react'
import { FaCamera, FaCheck } from 'react-icons/fa'

export default function PhotoServicePage() {
  const [selected, setSelected] = useState('')
  const [ordered, setOrdered] = useState(false)

  const services = [
    { id: 'basic', name: '📸 Reportage Basique', price: '25 000 FCFA', photos: '10 photos', desc: 'Photos standards de votre bien' },
    { id: 'pro', name: '📸 Reportage Pro', price: '50 000 FCFA', photos: '20 photos HD', desc: 'Photos professionnelles retouchées' },
    { id: 'premium', name: '🎥 Visite Virtuelle 360°', price: '100 000 FCFA', photos: 'Visite interactive', desc: 'Visite virtuelle immersive' },
  ]

  const totalRevenue = 50000 * 3 // 3 commandes/semaine

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">📸 Service Photo Professionnel</h1>
        <p className="text-gray-500 text-sm mt-1">Proposez des photos pro à vos clients</p>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
        <p className="text-sm text-purple-100">💰 Revenu potentiel photos</p>
        <p className="text-3xl font-black mt-1">{totalRevenue.toLocaleString()} FCFA/semaine</p>
        <p className="text-xs text-purple-100 mt-1">En sous-traitant à un photographe local (50% de marge)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className={`bg-white rounded-2xl shadow-sm p-6 text-center cursor-pointer transition-all hover:shadow-md ${
            selected === service.id ? 'ring-2 ring-orange-500' : ''
          }`} onClick={() => setSelected(service.id)}>
            <FaCamera className="text-4xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800">{service.name}</h3>
            <p className="text-2xl font-black text-orange-600 my-2">{service.price}</p>
            <p className="text-sm text-gray-500">{service.photos}</p>
            <p className="text-xs text-gray-400 mt-1">{service.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => setOrdered(true)} disabled={!selected}
          className="btn-primary text-lg disabled:opacity-50">
          📸 Commander ce service
        </button>
      </div>

      {ordered && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 animate-fade-in-up">
          ✅ Commande envoyée ! Un photographe vous contactera sous 24h.
        </div>
      )}
    </div>
  )
}
