'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaPlus, FaTimes, FaCheck } from 'react-icons/fa'

const demoProperties = [
  { id: 1, title: 'Villa Cocody', price: 85000000, city: 'Abidjan', bedrooms: 5, bathrooms: 3, area_sqm: 350, type: 'sale', features: ['Piscine', 'Garage', 'Jardin'] },
  { id: 2, title: 'Appartement Plateau', price: 450000, city: 'Abidjan', bedrooms: 3, bathrooms: 2, area_sqm: 120, type: 'rent', features: ['Climatisation', 'Parking', 'Ascenseur'] },
  { id: 3, title: 'Duplex Bassam', price: 65000000, city: 'Grand-Bassam', bedrooms: 4, bathrooms: 3, area_sqm: 280, type: 'sale', features: ['Terrasse', 'Jardin', 'Parking'] },
]

export default function ComparePage() {
  const [selected, setSelected] = useState<any[]>([])

  const addProperty = (prop: any) => {
    if (selected.length < 3 && !selected.find(p => p.id === prop.id)) {
      setSelected([...selected, prop])
    }
  }

  const removeProperty = (id: number) => {
    setSelected(selected.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">📊 Comparateur de biens</h1>
        <p className="text-gray-500 mb-6">Sélectionnez jusqu'à 3 biens à comparer</p>

        {/* Sélection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {demoProperties.map(prop => (
            <button key={prop.id} onClick={() => addProperty(prop)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${selected.find(p => p.id === prop.id) ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="font-bold text-sm">{prop.title}</div>
              <div className="text-xs text-gray-500">{prop.city} • {prop.price.toLocaleString()} FCFA</div>
            </button>
          ))}
        </div>

        {/* Tableau comparatif */}
        {selected.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Critère</th>
                  {selected.map(prop => (
                    <th key={prop.id} className="p-4 text-center">
                      <div className="font-bold">{prop.title}</div>
                      <button onClick={() => removeProperty(prop.id)} className="text-red-500 text-xs mt-1"><FaTimes className="inline" /> Retirer</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="p-4 font-medium">Prix</td>{selected.map(p => <td key={p.id} className="p-4 text-center font-bold text-orange-600">{p.price.toLocaleString()} FCFA</td>)}</tr>
                <tr><td className="p-4 font-medium">Ville</td>{selected.map(p => <td key={p.id} className="p-4 text-center">{p.city}</td>)}</tr>
                <tr><td className="p-4 font-medium">Chambres</td>{selected.map(p => <td key={p.id} className="p-4 text-center">{p.bedrooms}</td>)}</tr>
                <tr><td className="p-4 font-medium">Salles de bain</td>{selected.map(p => <td key={p.id} className="p-4 text-center">{p.bathrooms}</td>)}</tr>
                <tr><td className="p-4 font-medium">Surface</td>{selected.map(p => <td key={p.id} className="p-4 text-center">{p.area_sqm} m²</td>)}</tr>
                <tr><td className="p-4 font-medium">Équipements</td>{selected.map(p => <td key={p.id} className="p-4 text-center">{p.features.map((f: string) => <span key={f} className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs m-0.5">{f}</span>)}</td>)}</tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
