'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaTimes } from 'react-icons/fa'
import { useFeature } from '@/hooks/useFeature'

const demoProperties = [
  { id: 1, title: 'Villa Cocody', price: 85000000, city: 'Abidjan', bedrooms: 5, bathrooms: 3, area_sqm: 350, type: 'sale', features: ['Piscine', 'Garage'] },
  { id: 2, title: 'Appartement Plateau', price: 450000, city: 'Abidjan', bedrooms: 3, bathrooms: 2, area_sqm: 120, type: 'rent', features: ['Clim', 'Parking'] },
  { id: 3, title: 'Duplex Bassam', price: 65000000, city: 'Grand-Bassam', bedrooms: 4, bathrooms: 3, area_sqm: 280, type: 'sale', features: ['Terrasse', 'Jardin'] },
]

export default function ComparePage() {
  const [selected, setSelected] = useState<any[]>([])
  const compareEnabled = useFeature('compareTool')

  if (!compareEnabled) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-main py-20 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold">Comparateur bientot disponible</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-8">
        <h1 className="text-3xl font-black text-gray-800 mb-6">📊 Comparateur de biens</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {demoProperties.map(prop => (
            <button key={prop.id} onClick={() => selected.length < 3 && !selected.find(p => p.id === prop.id) && setSelected([...selected, prop])}
              className={`p-4 rounded-2xl border-2 text-left ${selected.find(p => p.id === prop.id) ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
              <div className="font-bold text-sm">{prop.title}</div>
              <div className="text-xs text-gray-500">{prop.price.toLocaleString()} FCFA</div>
            </button>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50">{['Critère', ...selected.map(p => p.title)].map(h => <th key={h} className="p-4">{h}</th>)}</tr></thead>
              <tbody>
                {['price','city','bedrooms','bathrooms','area_sqm'].map(key => (
                  <tr key={key}><td className="p-4 font-medium capitalize">{key}</td>{selected.map(p => <td key={p.id} className="p-4 text-center">{key === 'price' ? p[key].toLocaleString()+' FCFA' : p[key]}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
