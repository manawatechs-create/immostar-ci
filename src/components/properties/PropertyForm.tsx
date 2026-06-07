'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaPlus, FaTrash, FaBed, FaCalendarCheck, FaWifi, FaTv } from 'react-icons/fa'

const PROPERTY_TYPES = [
  { value: 'house', label: 'Maison', icon: '🏠' },
  { value: 'apartment', label: 'Appartement', icon: '🏢' },
  { value: 'villa', label: 'Villa', icon: '🏡' },
  { value: 'studio', label: 'Studio', icon: '🏘️' },
  { value: 'duplex', label: 'Duplex', icon: '🏗️' },
  { value: 'penthouse', label: 'Penthouse', icon: '🌆' },
  { value: 'loft', label: 'Loft', icon: '🏭' },
  { value: 'meuble', label: 'Résidence meublée', icon: '🛋️' },
  { value: 'chambre', label: 'Chambre', icon: '🛏️' },
  { value: 'land', label: 'Terrain', icon: '🌳' },
  { value: 'commercial', label: 'Local commercial', icon: '🏪' },
  { value: 'immeuble', label: 'Immeuble', icon: '🏬' },
  { value: 'entrepot', label: 'Entrepôt', icon: '📦' },
  { value: 'ferme', label: 'Ferme', icon: '🌾' },
]

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'climatisation', label: 'Climatisation', icon: '❄️' },
  { id: 'television', label: 'Télévision', icon: '📺' },
  { id: 'cuisine_equipee', label: 'Cuisine équipée', icon: '🍳' },
  { id: 'lave_linge', label: 'Lave-linge', icon: '👕' },
  { id: 'parking', label: 'Parking', icon: '🅿️' },
  { id: 'piscine', label: 'Piscine', icon: '🏊' },
  { id: 'salle_sport', label: 'Salle de sport', icon: '💪' },
  { id: 'animaux_acceptes', label: 'Animaux acceptés', icon: '🐕' },
  { id: 'fumeur_accepte', label: 'Fumeur accepté', icon: '🚬' },
  { id: 'accessibilite_pmr', label: 'Accès PMR', icon: '♿' },
  { id: 'securite_24h', label: 'Sécurité 24/7', icon: '🔒' },
  { id: 'menage_inclus', label: 'Ménage inclus', icon: '🧹' },
  { id: 'petit_dejeuner', label: 'Petit déjeuner', icon: '🥐' },
]

const CITIES = ['Abidjan', 'Yamoussoukro', 'Bouaké', 'San Pedro', 'Grand-Bassam', 'Daloa', 'Korhogo']

export function PropertyForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'house',
    listing_type: 'sale',
    price: '',
    area_sqm: '',
    bedrooms: '',
    bathrooms: '',
    max_guests: '1',
    city: 'Abidjan',
    district: '',
    address: '',
    is_furnished: false,
    check_in_time: '14:00',
    check_out_time: '12:00',
    cancellation_policy: 'flexible',
    features: {
      pool: false, garage: false, garden: false,
      security: false, generator: false, air_conditioning: false,
    },
    amenities: {} as Record<string, boolean>,
    seasonalRates: [] as Array<{
      seasonName: string
      startDate: string
      endDate: string
      nightlyRate: string
      weeklyRate: string
      monthlyRate: string
    }>,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages([...images, ...files].slice(0, 15))
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addSeasonalRate = () => {
    setFormData({
      ...formData,
      seasonalRates: [
        ...formData.seasonalRates,
        { seasonName: '', startDate: '', endDate: '', nightlyRate: '', weeklyRate: '', monthlyRate: '' }
      ]
    })
  }

  const removeSeasonalRate = (index: number) => {
    setFormData({
      ...formData,
      seasonalRates: formData.seasonalRates.filter((_, i) => i !== index)
    })
  }

  const updateSeasonalRate = (index: number, field: string, value: string) => {
    const newRates = [...formData.seasonalRates]
    newRates[index] = { ...newRates[index], [field]: value }
    setFormData({ ...formData, seasonalRates: newRates })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push('/dashboard/properties')
      }, 2000)
    }, 1500)
  }

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const showFurnishedOptions = ['meuble', 'studio', 'chambre', 'apartment', 'villa', 'loft', 'penthouse'].includes(formData.property_type) ||
    formData.is_furnished

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Publier un bien</h1>
        <p className="text-sm text-gray-500 mt-1">Étape {step} sur {totalSteps}</p>
        
        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1 : Type et infos de base */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-bold">Type de bien</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, property_type: type.value })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.property_type === type.value
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{type.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type d'offre</label>
                <select
                  value={formData.listing_type}
                  onChange={(e) => setFormData({ ...formData, listing_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                >
                  <option value="sale">À vendre</option>
                  <option value="rent">À louer</option>
                  <option value="vacation">Location courte durée</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Prix (FCFA)</label>
                <input
                  type="number"
                  placeholder="Ex: 85000000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Option meublé */}
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
              <input
                type="checkbox"
                checked={formData.is_furnished}
                onChange={(e) => setFormData({ ...formData, is_furnished: e.target.checked })}
                className="w-5 h-5 text-orange-600 rounded"
              />
              <div>
                <div className="font-semibold text-gray-800">🏠 Bien meublé</div>
                <div className="text-sm text-gray-600">Activez si le bien est entièrement meublé et équipé</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 : Détails et caractéristiques */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-bold">Détails du bien</h2>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Titre *</label>
              <input
                type="text"
                placeholder="Ex: Magnifique Villa Meublée Cocody"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Décrivez votre bien en détail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Surface (m²)</label>
                <input type="number" placeholder="250" value={formData.area_sqm}
                  onChange={(e) => setFormData({ ...formData, area_sqm: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chambres</label>
                <input type="number" placeholder="4" value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Salles de bain</label>
                <input type="number" placeholder="2" value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            {showFurnishedOptions && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaBed className="text-orange-500" />
                  Options hébergement
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Voyageurs max</label>
                    <input type="number" placeholder="1" value={formData.max_guests}
                      onChange={(e) => setFormData({ ...formData, max_guests: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in</label>
                    <input type="time" value={formData.check_in_time}
                      onChange={(e) => setFormData({ ...formData, check_in_time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out</label>
                    <input type="time" value={formData.check_out_time}
                      onChange={(e) => setFormData({ ...formData, check_out_time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Politique d'annulation</label>
                  <select
                    value={formData.cancellation_policy}
                    onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="flexible">Flexible - Remboursement intégral 24h avant</option>
                    <option value="moderate">Modéré - Remboursement 50% 5 jours avant</option>
                    <option value="strict">Strict - Remboursement 50% 15 jours avant</option>
                    <option value="non_refundable">Non remboursable</option>
                  </select>
                </div>

                {/* Équipements */}
                <div className="mt-6">
                  <h4 className="font-bold mb-3">Équipements</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {AMENITIES.map((amenity) => (
                      <label key={amenity.id} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={formData.amenities[amenity.id] || false}
                          onChange={(e) => setFormData({
                            ...formData,
                            amenities: { ...formData.amenities, [amenity.id]: e.target.checked }
                          })}
                          className="w-4 h-4 text-orange-600 rounded"
                        />
                        <span>{amenity.icon} {amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 : Localisation & Photos */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-bold">Localisation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ville *</label>
                <select value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" required>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Quartier</label>
                <input type="text" placeholder="Cocody" value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Adresse complète</label>
                <input type="text" placeholder="Rue des Jardins, Lot 123" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`}
                      className="w-full h-28 sm:h-32 object-cover rounded-xl" />
                    <button type="button" onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      <FaTrash />
                    </button>
                  </div>
                ))}
                {images.length < 15 && (
                  <label className="h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <FaUpload className="text-xl text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Ajouter</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 : Tarifs saisonniers */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaCalendarCheck className="text-orange-500" />
                Tarifs saisonniers
              </h2>
              <button type="button" onClick={addSeasonalRate}
                className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 flex items-center gap-1">
                <FaPlus /> Ajouter
              </button>
            </div>

            {formData.seasonalRates.map((rate, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Saison {index + 1}</h4>
                  <button type="button" onClick={() => removeSeasonalRate(index)}
                    className="text-red-500 hover:text-red-700 text-sm">
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <input type="text" placeholder="Nom (ex: Haute saison)"
                    value={rate.seasonName}
                    onChange={(e) => updateSeasonalRate(index, 'seasonName', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
                  <input type="date" value={rate.startDate}
                    onChange={(e) => updateSeasonalRate(index, 'startDate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
                  <input type="date" value={rate.endDate}
                    onChange={(e) => updateSeasonalRate(index, 'endDate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
                  <input type="number" placeholder="Prix/nuit"
                    value={rate.nightlyRate}
                    onChange={(e) => updateSeasonalRate(index, 'nightlyRate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
                  <input type="number" placeholder="Prix/semaine"
                    value={rate.weeklyRate}
                    onChange={(e) => updateSeasonalRate(index, 'weeklyRate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
                  <input type="number" placeholder="Prix/mois"
                    value={rate.monthlyRate}
                    onChange={(e) => updateSeasonalRate(index, 'monthlyRate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
            ))}

            <p className="text-sm text-gray-500 text-center">
              💡 Les tarifs saisonniers permettent d&apos;ajuster vos prix selon la période
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
              ← Précédent
            </button>
          )}
          <div className="flex-1"></div>
          {step < totalSteps ? (
            <button type="button" onClick={() => setStep(step + 1)}
              className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
              Suivant →
            </button>
          ) : (
            <button type="submit" disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2">
              {loading ? 'Publication...' : '✅ Publier le bien'}
            </button>
          )}
        </div>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Bien publié !</h3>
            <p className="text-gray-600">Votre bien est maintenant visible sur ImmoStar</p>
          </div>
        </div>
      )}
    </div>
  )
}
