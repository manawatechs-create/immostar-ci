'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaSave, FaArrowLeft } from 'react-icons/fa'

export default function AddPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', property_type: 'house', listing_type: 'sale',
    price: '', area_sqm: '', bedrooms: '', bathrooms: '',
    city: 'Abidjan', district: '', address: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/admin/properties')
    }, 1000)
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg">
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ajouter un bien</h1>
          <p className="text-gray-500 text-sm">Remplissez les informations du bien</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-800">Informations générales</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
            <input type="text" required className={inputClass} placeholder="Ex: Villa Moderne Cocody"
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={4} className={inputClass} placeholder="Description détaillée..."
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select className={inputClass} value={form.property_type} onChange={e => setForm({...form, property_type: e.target.value})}>
                <option value="house">Maison</option>
                <option value="apartment">Appartement</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="land">Terrain</option>
                <option value="commercial">Commerce</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Offre *</label>
              <select className={inputClass} value={form.listing_type} onChange={e => setForm({...form, listing_type: e.target.value})}>
                <option value="sale">À vendre</option>
                <option value="rent">À louer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-800">Détails et localisation</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA) *</label>
              <input type="number" required className={inputClass} placeholder="85000000"
                value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
              <input type="number" className={inputClass} placeholder="350"
                value={form.area_sqm} onChange={e => setForm({...form, area_sqm: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
              <input type="number" className={inputClass} placeholder="5"
                value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
              <select className={inputClass} value={form.city} onChange={e => setForm({...form, city: e.target.value})}>
                <option value="Abidjan">Abidjan</option>
                <option value="Yamoussoukro">Yamoussoukro</option>
                <option value="Bouaké">Bouaké</option>
                <option value="Grand-Bassam">Grand-Bassam</option>
                <option value="San Pedro">San Pedro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
              <input type="text" className={inputClass} placeholder="Cocody"
                value={form.district} onChange={e => setForm({...form, district: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading}
            className="btn-primary flex items-center gap-2">
            {loading ? 'Publication...' : <><FaSave /> Publier le bien</>}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
