'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaSearch, FaUpload, FaHandshake, FaMoneyBill, FaUserPlus, FaBuilding, FaPhone } from 'react-icons/fa'
import Link from 'next/link'

const stepsForOwners = [
  { icon: FaUserPlus, title: '1. Créez votre compte', desc: 'Inscrivez-vous gratuitement en 2 minutes comme propriétaire ou agence.', color: 'bg-blue-500' },
  { icon: FaUpload, title: '2. Publiez vos biens', desc: 'Ajoutez vos biens avec photos, description et prix en quelques clics.', color: 'bg-green-500' },
  { icon: FaSearch, title: '3. Recevez des contacts', desc: 'Les acheteurs intéressés vous contactent directement par téléphone ou WhatsApp.', color: 'bg-orange-500' },
  { icon: FaHandshake, title: '4. Vendez votre bien', desc: 'Finalisez la vente directement avec l\'acheteur, sans intermédiaire.', color: 'bg-purple-500' },
  { icon: FaMoneyBill, title: '5. Déclarez la vente', desc: 'Déclarez la vente sur ImmoStar et payez uniquement 3% de commission.', color: 'bg-red-500' },
]

const stepsForBuyers = [
  { icon: FaSearch, title: '1. Recherchez', desc: 'Parcourez des centaines de biens avec filtres avancés.', color: 'bg-orange-500' },
  { icon: FaPhone, title: '2. Contactez', desc: 'Appelez ou envoyez un WhatsApp directement au propriétaire.', color: 'bg-green-500' },
  { icon: FaBuilding, title: '3. Visitez', desc: 'Organisez une visite du bien qui vous intéresse.', color: 'bg-blue-500' },
  { icon: FaHandshake, title: '4. Achetez/Louez', desc: 'Négociez et finalisez directement avec le propriétaire.', color: 'bg-purple-500' },
]

const advantages = [
  { title: '🎯 Gratuit pour commencer', desc: 'Publiez jusqu\'à 3 biens gratuitement' },
  { title: '📱 Contact direct', desc: 'Pas d\'intermédiaire, vous traitez directement' },
  { title: '🔒 Sécurisé', desc: 'Vendeurs vérifiés, système anti-fraude' },
  { title: '💡 Simple', desc: 'Interface intuitive, pas de formation nécessaire' },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl font-black mb-4">Comment ça marche ?</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              ImmoStar connecte directement propriétaires et acheteurs en Côte d'Ivoire
            </p>
          </div>
        </section>

        {/* Pour les propriétaires */}
        <section className="container-main py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">🏠 Pour les propriétaires & agences</h2>
          <p className="text-gray-500 text-center mb-8">Publiez vos biens et vendez plus rapidement</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {stepsForOwners.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-all relative">
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <step.icon className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.desc}</p>
                {i < 4 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 text-gray-300 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/register?type=owner" className="btn-primary text-lg">
              🏠 Je suis propriétaire, je m'inscris
            </Link>
          </div>
        </section>

        {/* Pour les acheteurs */}
        <section className="bg-white py-12">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">🔍 Pour les acheteurs & locataires</h2>
            <p className="text-gray-500 text-center mb-8">Trouvez le bien de vos rêves en quelques clics</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stepsForBuyers.map((step, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <step.icon className="text-white text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/properties" className="btn-primary text-lg">
                🔍 Voir tous les biens disponibles
              </Link>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="container-main py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">✅ Pourquoi choisir ImmoStar ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((adv, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6 text-center">
                <h3 className="font-bold text-gray-800 mb-2">{adv.title}</h3>
                <p className="text-sm text-gray-500">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-12">
          <div className="container-main text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Prêt à commencer ?</h2>
            <p className="text-gray-600 mb-6">Rejoignez des milliers d'Ivoiriens qui utilisent ImmoStar</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=owner" className="btn-primary">
                🏠 Publier mes biens
              </Link>
              <Link href="/properties" className="btn-outline">
                🔍 Chercher un bien
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
