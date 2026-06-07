'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCalculator, FaMoneyBill, FaPercentage, FaCalendar } from 'react-icons/fa'

export default function CalculatorPage() {
  const [amount, setAmount] = useState(50000000)
  const [rate, setRate] = useState(7.5)
  const [duration, setDuration] = useState(15)
  const [contribution, setContribution] = useState(5000000)

  const monthlyPayment = () => {
    const principal = amount - contribution
    const monthlyRate = rate / 100 / 12
    const numPayments = duration * 12
    if (monthlyRate === 0) return Math.round(principal / numPayments)
    return Math.round(principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1))
  }

  const monthly = monthlyPayment()
  const totalCost = monthly * duration * 12
  const totalInterest = totalCost - (amount - contribution)
  const formatPrice = (p: number) => new Intl.NumberFormat('fr-FR').format(p) + ' FCFA'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-2"><FaCalculator className="inline mr-2" />Simulateur de Crédit</h1>
            <p className="text-orange-100">Calculez vos mensualités facilement</p>
          </div>
        </section>

        <section className="container-main -mt-6 relative z-20 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold">Paramètres</h2>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2"><FaMoneyBill className="text-orange-500" />Prix du bien</label>
                <input type="range" min="5000000" max="500000000" step="1000000" value={amount} onChange={e => setAmount(+e.target.value)}
                  className="w-full accent-orange-500" />
                <div className="text-right text-sm font-bold text-orange-600">{formatPrice(amount)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2"><FaMoneyBill className="text-green-500" />Apport</label>
                <input type="range" min="0" max={amount * 0.5} step="500000" value={contribution} onChange={e => setContribution(+e.target.value)}
                  className="w-full accent-green-500" />
                <div className="text-right text-sm font-bold text-green-600">{formatPrice(contribution)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2"><FaPercentage className="text-blue-500" />Taux : {rate}%</label>
                <input type="range" min="3" max="15" step="0.25" value={rate} onChange={e => setRate(+e.target.value)}
                  className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2"><FaCalendar className="text-purple-500" />Durée : {duration} ans</label>
                <input type="range" min="5" max="30" step="1" value={duration} onChange={e => setDuration(+e.target.value)}
                  className="w-full accent-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold">Résultats</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500">Mensualité estimée</div>
                <div className="text-3xl font-black text-orange-600">{formatPrice(monthly)}</div>
                <div className="text-xs text-gray-500">par mois</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-500">Emprunt</div><div className="font-bold text-sm">{formatPrice(amount - contribution)}</div></div>
                <div className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-500">Coût total</div><div className="font-bold text-sm">{formatPrice(totalCost)}</div></div>
                <div className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-500">Intérêts</div><div className="font-bold text-sm text-red-600">{formatPrice(totalInterest)}</div></div>
                <div className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-500">Durée</div><div className="font-bold text-sm">{duration * 12} mois</div></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
