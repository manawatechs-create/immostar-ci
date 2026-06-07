'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCamera, FaCheckCircle, FaWhatsapp, FaPhone } from 'react-icons/fa'
import Link from 'next/link'

export default function PublierPage() {
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [showSMS, setShowSMS] = useState(false)
  const [smsCode, setSmsCode] = useState('')
  const [verified, setVerified] = useState(false)

  const [form, setForm] = useState({
    title: '',
    price: '',
    city: 'Abidjan',
    phone: '',
    description: '',
    category: 'house',
    type: 'sale',
  })

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImages(prev => [...prev, e.target?.result as string].slice(0, 8))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSendSMS = () => {
    if (form.phone.length < 8) {
      alert('Veuillez entrer un numéro valide')
      return
    }
    setShowSMS(true)
    // Simuler l'envoi SMS
    console.log('📱 Code envoyé au ' + form.phone)
  }

  const handleVerifySMS = () => {
    if (smsCode === '1234') {
      setVerified(true)
      setShowSMS(false)
    } else {
      alert('Code incorrect. Essayez 1234 (démo)')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!verified) {
        alert('Veuillez vérifier votre numéro de téléphone')
        return
      }
      setStep(2)
      window.scrollTo(0, 0)
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
      }, 1500)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-12">
          <div className="max-w-md mx-auto text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">🎉 Annonce publiée !</h1>
            <p className="text-gray-500 mb-6">
              Votre annonce <strong>{form.title}</strong> est en ligne !
            </p>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-left space-y-3 text-sm">
              <p>✅ <strong>Titre :</strong> {form.title}</p>
              <p>✅ <strong>Prix :</strong> {parseInt(form.price).toLocaleString()} FCFA</p>
              <p>✅ <strong>Ville :</strong> {form.city}</p>
              <p>✅ <strong>Contact :</strong> {form.phone}</p>
              <p>✅ <strong>Photos :</strong> {images.length}</p>
              
              <div className="border-t pt-3 mt-3">
                <p className="font-bold text-orange-600">📞 Les acheteurs vous contacteront directement</p>
                <p className="text-xs text-gray-500 mt-1">Votre numéro est visible sur l'annonce</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/publier" className="btn-primary" onClick={() => {
                setSuccess(false); setStep(1); setImages([]); setVerified(false);
                setForm({title:'',price:'',city:'Abidjan',phone:'',description:'',category:'house',type:'sale'})
              }}>
                ➕ Publier une autre annonce
              </Link>
              <Link href="/" className="btn-outline">🏠 Accueil</Link>
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
              {step === 1 ? '📝 Publier une annonce gratuite' : '📸 Ajouter des photos'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  {/* Catégorie et Type */}
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

                  {/* Titre */}
                  <input type="text" required className="input-field" placeholder="Titre de l'annonce *"
                    value={form.title} onChange={e => setForm({...form, title: e.target.value})} />

                  {/* Prix */}
                  <input type="number" required className="input-field" placeholder="Prix en FCFA *"
                    value={form.price} onChange={e => setForm({...form, price: e.target.value})} />

                  {/* Ville */}
                  <select className="input-field" value={form.city} onChange={e => setForm({...form, city: e.target.value})}>
                    <option>Abidjan</option><option>Yamoussoukro</option><option>Bouaké</option>
                    <option>Grand-Bassam</option><option>San Pedro</option><option>Daloa</option>
                  </select>

                  {/* Description */}
                  <textarea rows={3} className="input-field" placeholder="Description (optionnel)"
                    value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

                  {/* Téléphone avec vérification SMS */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre numéro *</label>
                    <div className="flex gap-2">
                      <input type="tel" required className="input-field flex-1" placeholder="+225 07 00 00 00"
                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      <button type="button" onClick={handleSendSMS}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap ${
                          verified ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}>
                        {verified ? '✅ Vérifié' : '📱 Vérifier'}
                      </button>
                    </div>
                    {verified && <p className="text-xs text-green-600 mt-1">✅ Numéro vérifié</p>}
                  </div>

                  {/* Modal SMS */}
                  {showSMS && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="font-bold text-lg mb-2">📱 Vérification SMS</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Un code a été envoyé au <strong>{form.phone}</strong>
                        </p>
                        <input type="text" className="input-field mb-3" placeholder="Code reçu (1234 en démo)"
                          value={smsCode} onChange={e => setSmsCode(e.target.value)} />
                        <button onClick={handleVerifySMS} className="btn-primary w-full">
                          Vérifier le code
                        </button>
                        <p className="text-xs text-gray-400 text-center mt-2">Code démo : 1234</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-800">
                    🆓 <strong>Publication 100% gratuite</strong> • Votre numéro sera visible sur l'annonce
                  </div>
                </>
              ) : (
                <>
                  {/* Upload Photos */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-orange-400 transition-colors">
                    <input type="file" multiple accept="image/*" onChange={handleImageAdd} className="hidden" id="photoUpload" />
                    <label htmlFor="photoUpload" className="cursor-pointer">
                      <FaCamera className="text-4xl text-gray-400 mx-auto mb-2" />
                      <p className="font-medium text-gray-700">Ajouter des photos</p>
                      <p className="text-xs text-gray-400">Jusqu'à 8 photos</p>
                    </label>
                  </div>

                  {/* Prévisualisation */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((img, i) => (
                        <div key={i} className="relative">
                          <img src={img} alt="" className="w-full h-20 object-cover rounded-lg" />
                          <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs">✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">📸 {images.length}/8 photos</p>
                </>
              )}

              {/* Boutons */}
              <div className="flex gap-3 pt-2">
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
                    ← Retour
                  </button>
                )}
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? '⏳...' : step === 1 ? 'Continuer →' : '📝 Publier gratuitement'}
                </button>
              </div>
            </form>
          </div>

          {/* Aide */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">📞 Besoin d'aide ? <a href="tel:+2250700000000" className="text-orange-600 font-semibold">Appelez-nous</a></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
