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
    isFurnished: false,
    furnishedType: '',
    pricePerNight: '',
    maxGuests: '',
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
      // Si meublé, aller à l'étape 2 (détails meublé), sinon étape 3 (photos)
      if (form.isFurnished) {
        setStep(2)
      } else {
        setStep(3)
      }
      window.scrollTo(0, 0)
      return
    }

    if (step === 2 && form.isFurnished) {
      setStep(3)
      window.scrollTo(0, 0)
      return
    }

    setLoading(true)

    try {
      const listingData = {
        ...form,
        price: parseInt(form.price),
        pricePerNight: form.pricePerNight ? parseInt(form.pricePerNight) : null,
        maxGuests: form.maxGuests ? parseInt(form.maxGuests) : null,
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
              <Link href="/meubles" className="btn-outline block w-full text-center">
                🛋️ Voir les meublés
              </Link>
              <button onClick={() => {
                setSuccess(false); setStep(1); setImages([]);
                setForm({title:'',price:'',city:'Abidjan',district:'',category:'house',type:'sale',phone:'',description:'',isFurnished:false,furnishedType:'',pricePerNight:'',maxGuests:''})
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
              {step === 1 ? '1. Infos' : '✅'}
            </div>
            {form.isFurnished && (
              <>
                <div className="w-8 h-0.5 bg-gray-300" />
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${step === 2 ? 'bg-orange-500 text-white' : step > 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? '✅' : '2. Meublé'}
                </div>
              </>
            )}
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${step === 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
              3. Photos
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">📝 Informations du bien</h2>
                  
                  {/* Type de bien */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Type *</label>
                      <select className="input-field text-sm" value={form.category} 
                        onChange={e => setForm({...form, category: e.target.value})}>
                        <option value="house">🏠 Maison</option>
                        <option value="apartment">🏢 Appartement</option>
                        <option value="villa">🏡 Villa</option>
                        <option value="studio">🏘️ Studio</option>
                        <option value="chambre">🛏️ Chambre</option>
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
                        <option value="vacation">🏖️ Courte durée</option>
                      </select>
                    </div>
                  </div>

                  {/* Option Meublé */}
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.isFurnished}
                        onChange={e => setForm({...form, isFurnished: e.target.checked})}
                        className="w-5 h-5 text-purple-600 rounded" 
                      />
                      <div>
                        <span className="font-semibold text-purple-800">🛋️ Ce bien est meublé</span>
                        <p className="text-xs text-purple-600 mt-0.5">Apparaîtra dans la section "Résidences meublées"</p>
                      </div>
                    </label>

                    {form.isFurnished && (
                      <div className="mt-3 pt-3 border-t border-purple-200 grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-purple-700 mb-1">Type de meublé</label>
                          <select className="input-field text-sm" value={form.furnishedType}
                            onChange={e => setForm({...form, furnishedType: e.target.value})}>
                            <option value="">Sélectionner...</option>
                            <option value="studio">Studio meublé</option>
                            <option value="appartement">Appartement meublé</option>
                            <option value="villa">Villa meublée</option>
                            <option value="chambre">Chambre meublée</option>
                            <option value="colocation">Colocation</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-purple-700 mb-1">Voyageurs max</label>
                          <input type="number" className="input-field text-sm" placeholder="Ex: 4"
                            value={form.maxGuests} onChange={e => setForm({...form, maxGuests: e.target.value})} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titre *</label>
                    <input type="text" required className="input-field" 
                      placeholder={form.isFurnished ? "Ex: Studio meublé Cocody avec WiFi" : "Ex: Magnifique Villa Cocody"}
                      value={form.title} 
                      onChange={e => setForm({...form, title: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Prix (FCFA) * {form.isFurnished && <span className="text-purple-600">- Loyer mensuel</span>}
                    </label>
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
                      placeholder={form.isFurnished ? "Décrivez les équipements (WiFi, clim, cuisine...)" : "Décrivez votre bien..."}
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
              ) : step === 2 && form.isFurnished ? (
                <>
                  <h2 className="text-lg font-bold text-purple-800 mb-2">🛋️ Détails du meublé</h2>
                  <p className="text-sm text-gray-500 mb-4">Ajoutez les informations spécifiques pour la location meublée</p>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Prix par nuit (FCFA)</label>
                    <input type="number" className="input-field" placeholder="Ex: 25000"
                      value={form.pricePerNight} onChange={e => setForm({...form, pricePerNight: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Équipements inclus</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['WiFi', 'Climatisation', 'TV', 'Cuisine équipée', 'Parking', 'Sécurité 24/7', 'Ménage inclus', 'Petit déjeuner'].map(item => (
                        <label key={item} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
                    <p>💡 <strong>Conseil :</strong> Les meublés avec photos et équipements détaillés reçoivent 3x plus de réservations.</p>
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
                  
                  {/* Résumé */}
                  <div className="bg-gray-50 rounded-xl p-4 text-sm">
                    <p className="font-bold mb-2">📋 Résumé :</p>
                    <p>🏠 {form.title}</p>
                    <p>💰 {form.price ? parseInt(form.price).toLocaleString() : '0'} FCFA</p>
                    <p>📍 {form.city} {form.district}</p>
                    <p>📞 {form.phone}</p>
                    {form.isFurnished && <p>🛋️ Meublé - {form.furnishedType || 'Oui'}</p>}
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-3 border-t">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn-outline">← Retour</button>
                )}
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? '⏳...' : step === 3 || (!form.isFurnished && step === 1) ? '📝 Publier gratuitement' : 'Continuer →'}
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
