'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCamera, FaCheckCircle, FaTrash } from 'react-icons/fa'
import Link from 'next/link'

export default function PublierPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [publishedListing, setPublishedListing] = useState<any>(null)
  const [images, setImages] = useState<string[]>([])

  const [form, setForm] = useState({
    title: '',
    price: '',
    city: 'Abidjan',
    district: '',
    category: 'house',
    type: 'sale',
    phone: '',
    description: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string].slice(0, 8))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (!form.title || !form.price || !form.phone) {
        alert('Veuillez remplir tous les champs obligatoires')
        return
      }
      setStep(2)
      window.scrollTo(0, 0)
      return
    }

    setLoading(true)

    try {
      const listingData = {
        ...form,
        price: parseInt(form.price),
        images: images,
        createdAt: new Date().toISOString(),
      }

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingData)
      })

      const data = await response.json()

      if (data.success) {
        setPublishedListing(data.listing)
        setSuccess(true)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  // Éviter l'hydratation mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center py-20"><span className="loader" /></div>
        <Footer />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-8">
          <div className="max-w-md mx-auto text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">🎉 Annonce publiée !</h1>
            <p className="text-gray-500 mb-6">Votre annonce est maintenant visible</p>
            
            <div className="space-y-3">
              <Link href="/properties" className="btn-primary block w-full text-center">
                👁️ Voir les annonces
              </Link>
              <button onClick={() => {
                setSuccess(false); setStep(1); setImages([]);
                setForm({title:'',price:'',city:'Abidjan',district:'',category:'house',type:'sale',phone:'',description:''})
              }} className="btn-outline block w-full">
                ➕ Nouvelle annonce
              </button>
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
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${step === 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
              {step === 1 ? '1. Infos' : '✅ Infos'}
            </div>
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2. Photos
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">📝 Informations du bien</h2>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Type de bien *</label>
                      <select className="input-field text-sm" value={form.category} 
                        onChange={e => setForm({...form, category: e.target.value})}>
                        <option value="house">🏠 Maison</option>
                        <option value="apartment">🏢 Appartement</option>
                        <option value="villa">🏡 Villa</option>
                        <option value="land">🌳 Terrain</option>
                        <option value="commercial">🏪 Commerce</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Offre *</label>
                      <select className="input-field text-sm" value={form.type} 
                        onChange={e => setForm({...form, type: e.target.value})}>
                        <option value="sale">💰 À vendre</option>
                        <option value="rent">🔑 À louer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titre *</label>
                    <input type="text" required className="input-field" 
                      placeholder="Ex: Magnifique Villa Cocody"
                      value={form.title} 
                      onChange={e => setForm({...form, title: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Prix (FCFA) *</label>
                    <input type="number" required className="input-field" 
                      placeholder="Ex: 85000000"
                      value={form.price} 
                      onChange={e => setForm({...form, price: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Ville *</label>
                      <select className="input-field text-sm" value={form.city} 
                        onChange={e => setForm({...form, city: e.target.value})}>
                        <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option>
                        <option>Grand-Bassam</option><option>San Pedro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quartier</label>
                      <input type="text" className="input-field text-sm" placeholder="Ex: Cocody"
                        value={form.district} 
                        onChange={e => setForm({...form, district: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <textarea rows={3} className="input-field text-sm" 
                      placeholder="Décrivez votre bien..."
                      value={form.description} 
                      onChange={e => setForm({...form, description: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Votre numéro *</label>
                    <input type="tel" required className="input-field" 
                      placeholder="+225 07 00 00 00"
                      value={form.phone} 
                      onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">📸 Photos (optionnel)</h2>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="photoUpload" />
                    <label htmlFor="photoUpload" className="cursor-pointer">
                      <FaCamera className="text-4xl text-gray-400 mx-auto mb-2" />
                      <p className="font-medium text-gray-700">Cliquez pour ajouter des photos</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG - Max 8 photos</p>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img src={img} alt={`Photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg border-2 border-gray-200" />
                          <button type="button" onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100">
                            ✕
                          </button>
                        </div>
                      ))}
                      {images.length < 8 && (
                        <label htmlFor="photoUpload" className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-400">
                          <span className="text-2xl text-gray-400">+</span>
                        </label>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 text-center">{images.length}/8 photos</p>
                </>
              )}

              <div className="flex gap-3 pt-3 border-t">
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className="btn-outline">← Retour</button>
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
