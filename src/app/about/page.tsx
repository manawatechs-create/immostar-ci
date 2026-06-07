'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaStar, FaUsers, FaBuilding, FaHandshake, FaShieldAlt, FaChartLine, FaCheckCircle } from 'react-icons/fa'

export default function AboutPage() {
  const stats = [
    { icon: FaBuilding, value: '1 234', label: 'Biens publiés' },
    { icon: FaUsers, value: '5 678', label: 'Clients satisfaits' },
    { icon: FaHandshake, value: '89', label: 'Partenaires' },
    { icon: FaChartLine, value: '98%', label: 'Satisfaction' },
  ]

  const values = [
    { icon: FaStar, title: 'Excellence', desc: 'Les meilleurs biens sélectionnés pour vous.' },
    { icon: FaShieldAlt, title: 'Confiance', desc: 'Transactions 100% sécurisées.' },
    { icon: FaHandshake, title: 'Proximité', desc: 'Présents dans toute la Côte d\'Ivoire.' },
    { icon: FaChartLine, title: 'Innovation', desc: 'Technologie au service de l\'immobilier.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-2">⭐ À propos d&apos;ImmoStar</h1>
            <p className="text-orange-100">La star de l&apos;immobilier en Côte d&apos;Ivoire</p>
          </div>
        </section>

        <section className="container-main -mt-6 relative z-20 mb-12 space-y-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="text-2xl mx-auto mb-2 text-orange-200" />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-orange-100 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Notre Histoire</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fondée en 2020 à Abidjan, <strong className="text-orange-600">ImmoStar</strong> est née d&apos;une vision simple : 
              révolutionner le marché immobilier ivoirien en le rendant plus accessible et transparent.
              Aujourd&apos;hui, nous sommes la référence avec plus de 1 200 biens et des milliers de clients satisfaits.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-4 text-center hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <v.icon className="text-xl text-orange-600" />
                </div>
                <h3 className="font-bold text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">✅ Pourquoi nous choisir ?</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['+1200 biens vérifiés', 'Partenaires certifiés', 'Support 7j/7', 'Paiements sécurisés', 'Visites virtuelles', 'App mobile bientôt'].map((item, i) => (
                <div key={i} className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs" />{item}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
