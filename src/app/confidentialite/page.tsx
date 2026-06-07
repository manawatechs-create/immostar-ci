'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🔒 Politique de Confidentialité</h1>
          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Janvier 2026</p>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Collecte des informations</h2>
              <p>Nous collectons les informations que vous nous fournissez directement :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Nom et prénom</li>
                <li>Numéro de téléphone</li>
                <li>Adresse email</li>
                <li>Photos et descriptions de biens</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Utilisation des informations</h2>
              <p>Vos informations sont utilisées pour :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Publier et gérer vos annonces immobilières</li>
                <li>Vous mettre en relation avec des acheteurs potentiels</li>
                <li>Vous contacter concernant vos annonces</li>
                <li>Améliorer nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Protection des données</h2>
              <p>Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles contre tout accès non autorisé, modification, divulgation ou destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Partage des informations</h2>
              <p>Votre numéro de téléphone est visible sur les annonces que vous publiez afin de permettre aux acheteurs de vous contacter. Aucune autre information personnelle n&apos;est partagée sans votre consentement.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Vos droits</h2>
              <p>Conformément à la loi ivoirienne sur la protection des données, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à <strong>manawatechs@gmail.com</strong>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Cookies</h2>
              <p>Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser le trafic sur notre site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact</h2>
              <p>Pour toute question :</p>
              <ul className="mt-2 space-y-1">
                <li>📧 Email : manawatechs@gmail.com</li>
                <li>📞 Téléphone : +225 07 08 43 21 72</li>
                <li>📍 Abidjan, Cocody, Côte d&apos;Ivoire</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
