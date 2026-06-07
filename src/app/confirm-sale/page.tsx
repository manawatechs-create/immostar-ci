'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCheckCircle, FaUpload, FaBuilding, FaUser, FaPhone, FaCalendar } from 'react-icons/fa'

export default function ConfirmSalePage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    propertyId: '',
    propertyTitle: '',
    sellerName: '',
    sellerPhone: '',
    buyerName: '',
    buyerPhone: '',
    salePrice: '',
    saleDate: '',
    commissionRate: '3',
    proofFile: null as File | null,
    termsAccepted: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simuler l'envoi
    setTimeout(() => {
      setLoading(false)
      setStep(3) // Succès
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-orange-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1 : Formulaire */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">📋 Déclarer une vente</h1>
              <p className="text-gray-500 mb-6">Confirmez qu'un bien a été vendu via ImmoStar pour calculer la commission</p>

              <form onSubmit={() => setStep(2)} className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-orange-800">
                    ⚠️ Cette déclaration est soumise à vérification. Une fausse déclaration entraîne la suspension du compte.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bien concerné *</label>
                  <select className="input-field" required
                    value={form.propertyId}
                    onChange={e => setForm({...form, propertyId: e.target.value})}>
                    <option value="">Sélectionnez un bien</option>
                    <option value="1">Villa Moderne Cocody - 85 000 000 FCFA</option>
                    <option value="2">Duplex Grand-Bassam - 65 000 000 FCFA</option>
                    <option value="3">Terrain Yamoussoukro - 15 000 000 FCFA</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix de vente réel (FCFA) *</label>
                    <input type="number" className="input-field" required placeholder="Ex: 82000000"
                      value={form.salePrice} onChange={e => setForm({...form, salePrice: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de la vente *</label>
                    <input type="date" className="input-field" required
                      value={form.saleDate} onChange={e => setForm({...form, saleDate: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre nom *</label>
                    <input type="text" className="input-field" required placeholder="Nom du vendeur"
                      value={form.sellerName} onChange={e => setForm({...form, sellerName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre téléphone *</label>
                    <input type="tel" className="input-field" required placeholder="+225 XX XX XX XX"
                      value={form.sellerPhone} onChange={e => setForm({...form, sellerPhone: e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Continuer →
                </button>
              </form>
            </div>
          )}

          {/* Step 2 : Preuves et validation */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📎 Preuves de la transaction</h2>
              <p className="text-gray-500 mb-6">Fournissez au moins un document pour valider la vente</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
                  <FaUpload className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="font-medium text-gray-700">Déposer un justificatif</p>
                  <p className="text-sm text-gray-500 mt-1">Contrat de vente, attestation, capture d'écran...</p>
                  <input type="file" className="hidden" accept="image/*,.pdf" />
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-gray-700">Types de preuves acceptés :</p>
                  {[
                    '📄 Contrat de vente signé',
                    '📸 Capture du virement bancaire',
                    '📝 Attestation de vente notariée',
                    '📱 Capture WhatsApp de la transaction',
                    '🏦 Relevé bancaire',
                  ].map(proof => (
                    <label key={proof} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span className="text-sm">{proof}</span>
                    </label>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    💡 Commission calculée : <strong>{form.salePrice ? (parseInt(form.salePrice) * 0.03).toLocaleString() : '0'} FCFA</strong> (3%)
                  </p>
                </div>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer">
                  <input type="checkbox" required className="w-5 h-5 text-orange-500 rounded mt-0.5"
                    checked={form.termsAccepted}
                    onChange={e => setForm({...form, termsAccepted: e.target.checked})} />
                  <span className="text-sm text-gray-600">
                    Je certifie que les informations fournies sont exactes et j'accepte de payer la commission de 3% à ImmoStar CI dans un délai de 7 jours ouvrés après validation.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
                    ← Retour
                  </button>
                  <button type="submit" disabled={loading || !form.termsAccepted} className="btn-primary flex-1">
                    {loading ? 'Envoi en cours...' : '✅ Valider la déclaration'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3 : Succès */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Déclaration envoyée !</h2>
              <p className="text-gray-600 mb-6">
                Votre déclaration de vente a été soumise avec succès. Notre équipe va la vérifier dans les 48h.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-bold text-gray-800 mb-3">📋 Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Bien :</strong> {form.propertyTitle || 'Villa Moderne Cocody'}</p>
                  <p><strong>Prix de vente :</strong> {parseInt(form.salePrice || '85000000').toLocaleString()} FCFA</p>
                  <p><strong>Commission (3%) :</strong> {(parseInt(form.salePrice || '85000000') * 0.03).toLocaleString()} FCFA</p>
                  <p><strong>Statut :</strong> <span className="text-orange-600 font-semibold">En attente de validation</span></p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-orange-800">
                  📱 Vous recevrez une confirmation par SMS/WhatsApp au <strong>{form.sellerPhone || '+225 XX XX XX XX'}</strong>
                </p>
              </div>

              <a href="/" className="btn-primary">Retour à l'accueil</a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
