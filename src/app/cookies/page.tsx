'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🍪 Politique de Cookies</h1>
          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Janvier 2026</p>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p>Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un site web. Il permet de stocker des informations sur votre navigation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Cookies que nous utilisons</h2>
              
              <div className="space-y-4 mt-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold">🍪 Cookies essentiels</h3>
                  <p className="mt-1">Nécessaires au fonctionnement du site. Ils permettent la navigation et l&apos;accès aux fonctionnalités de base.</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold">📊 Cookies analytiques</h3>
                  <p className="mt-1">Nous aident à comprendre comment les visiteurs utilisent le site (pages visitées, temps passé, source de trafic).</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold">🔗 Cookies de traçage</h3>
                  <p className="mt-1">Permettent de savoir d&apos;où viennent nos visiteurs (Google, Facebook, WhatsApp, etc.).</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Gestion des cookies</h2>
              <p>Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Chrome : Paramètres → Confidentialité → Cookies</li>
                <li>Firefox : Options → Vie privée → Cookies</li>
                <li>Safari : Préférences → Confidentialité → Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Durée de conservation</h2>
              <p>Les cookies sont conservés pour une durée maximale de 13 mois à compter de leur dépôt sur votre appareil.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Contact</h2>
              <p>Pour toute question sur notre utilisation des cookies :</p>
              <ul className="mt-2 space-y-1">
                <li>📧 Email : manawatechs@gmail.com</li>
                <li>📞 Téléphone : +225 07 08 43 21 72</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
