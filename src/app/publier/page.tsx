'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCamera, FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function PublierPage() {
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [publishedListing, setPublishedListing] = useState<any>(null)

  const [form, setForm] = useState({
    title: '',
    price: '',
    city: 'Abidjan',
    district: '',
    category: 'house',
    type: 'sale',
    phone: '',
    description: '',
    images: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (data.success) {
        setPublishedListing(data.listing)
        setSuccess(true)
      } else {
        alert('Erreur lors de la publication')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  if (success && publishedListing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-12">
          <div className="max-w-md mx-auto text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">🎉 Annonce publiée !</h1>
            <p className="text-gray-500 mb-6">
              Votre annonce <strong>{publishedListing.title}</strong> est en ligne !
            </p>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-left space-y-3 text-sm">
              <p>✅ <strong>Référence :</strong> #{publishedListing.id}</p>
              <p>✅ <strong>Titre :</strong> {publishedListing.title}</p>
              <p>✅ <strong>Prix :</strong> {parseInt(publishedListing.price).toLocaleString()} FCFA</p>
              <p>✅ <strong>Ville :</strong> {publishedListing.city}</p>
              <p>✅ <strong>Contact :</strong> {publishedListing.phone}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/properties" className="btn-primary">
                👁️ Voir les annonces
              </Link>
              <Link href="/publier" className="btn-outline" onClick={() => {
                setSuccess(false); setStep(1);
                setForm({title:'',price:'',city:'Abidjan',district:'',category:'house',type:'sale',phone:'',description:'',images:[]})
              }}>
                ➕ Nouvelle annonce
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-6">
        <div className="max-w-lg mx-auto">
          {/* Étapes */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>1</div>
              <span className="text-sm hidden sm:inline">Info</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>2</div>
              <span className="text-sm hidden sm:inline">Photos</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              📝 Publier une annonce gratuite
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <select className="input-field text-sm" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      <option value="house">🏠 Maison</option>
                      <option value="apartment">🏢 Appartement</option>
                      <option value="villa">🏡 Villa</option>
                      <option value="land">🌳 Terrain</option>
                      <option value="commercial">🏪 Commerce</option>
                    </select>
                    <select className="input-field text-sm" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option value="sale">💰 À vendre</option>
                      <option value="rent">🔑 À louer</option>
                    </select>
                  </div>

                  <input type="text" required className="input-field" placeholder="Titre de l'annonce *"
                    value={form.title} onChange={e => setForm({...form, title: e.target.value})} />

                  <input type="number" required className="input-field" placeholder="Prix en FCFA *"
                    value={form.price} onChange={e => setForm({...form, price: e.target.value})} />

                  <div className="grid grid-cols-2 gap-3">
                    <select className="input-field" value={form.city} onChange={e => setForm({...form, city: e.target.value})}>
                      <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option>
                      <option>Grand-Bassam</option><option>San Pedro</option>
                    </select>
                    <input type="text" className="input-field" placeholder="Quartier"
                      value={form.district} onChange={e => setForm({...form, district: e.target.value})} />
                  </div>

                  <textarea rows={3} className="input-field" placeholder="Description (optionnel)"
                    value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

                  <input type="tel" required className="input-field" placeholder="Votre numéro *"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />

                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800">
                    🆓 <strong>Publication 100% gratuite</strong> • Visible immédiatement
                  </div>
                </>
              ) : (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    <input type="file" multiple accept="image/*" className="hidden" id="photoUpload" />
                    <label htmlFor="photoUpload" className="cursor-pointer">
                      <FaCamera className="text-4xl text-gray-400 mx-auto mb-2" />
                      <p className="font-medium text-gray-700">Ajouter des photos</p>
                      <p className="text-xs text-gray-400">Optionnel - Jusqu'à 8 photos</p>
                    </label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
                    📸 Les annonces avec photos reçoivent 5x plus de contacts
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">← Retour</button>
                )}
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? '⏳...' : step === 1 ? 'Continuer →' : '📝 Publier gratuitement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
