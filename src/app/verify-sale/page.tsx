'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCheckCircle, FaSearch } from 'react-icons/fa'

export default function VerifySalePage() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  
  const [form, setForm] = useState({
    code: code,
    buyerName: '',
    buyerPhone: '',
    foundVia: 'immostar',
    otherPlatform: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-12">
          <div className="max-w-md mx-auto text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">✅ Vérification envoyée !</h1>
            <p className="text-gray-500">Merci d'avoir confirmé. Votre réponse aide à garantir des transactions équitables.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <FaSearch className="text-4xl text-orange-500 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-800">Vérification d'achat</h1>
            <p className="text-gray-500 text-sm mt-2">
              Aidez-nous à savoir comment vous avez trouvé ce bien
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code du bien</label>
              <input type="text" className="input-field font-mono" value={form.code}
                onChange={e => setForm({...form, code: e.target.value})}
                placeholder="IMMO-XX-000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
              <input type="text" className="input-field" placeholder="Nom de l'acheteur"
                value={form.buyerName} onChange={e => setForm({...form, buyerName: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment avez-vous trouvé ce bien ?</label>
              <div className="space-y-2">
                {[
                  { value: 'immostar', label: '⭐ Via ImmoStar (site ou app)' },
                  { value: 'whatsapp', label: '📱 Via WhatsApp (lien ImmoStar)' },
                  { value: 'facebook', label: '📘 Via Facebook' },
                  { value: 'jumia', label: '🛒 Via Jumia' },
                  { value: 'other', label: '🔄 Autre plateforme' },
                  { value: 'friend', label: '🤝 Bouche-à-oreille' },
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="foundVia" value={option.value}
                      checked={form.foundVia === option.value}
                      onChange={e => setForm({...form, foundVia: e.target.value})}
                      className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {form.foundVia === 'other' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quelle plateforme ?</label>
                <input type="text" className="input-field" placeholder="Nom de la plateforme"
                  value={form.otherPlatform} onChange={e => setForm({...form, otherPlatform: e.target.value})} />
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              ✅ Confirmer
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
