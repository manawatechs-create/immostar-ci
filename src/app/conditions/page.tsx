'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Conditions d&apos;Utilisation</h1>
          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Janvier 2026</p>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptation des conditions</h2>
              <p>En utilisant ImmoStar, vous acceptez les présentes conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Publication d&apos;annonces</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Les annonces doivent être réelles et correspondre à des biens existants</li>
                <li>Les informations fournies doivent être exactes et véridiques</li>
                <li>Les photos publiées doivent représenter le bien concerné</li>
                <li>Toute annonce frauduleuse sera supprimée sans préavis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Commission</h2>
              <p>En publiant sur ImmoStar, vous acceptez de payer une commission de <strong>3%</strong> du prix de vente si la transaction est réalisée grâce à notre plateforme. Cette commission est due dans les 7 jours suivant la vente.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Responsabilités</h2>
              <p>ImmoStar agit en tant qu&apos;intermédiaire de mise en relation. Nous ne sommes pas responsables :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>De la véracité des annonces (bien que nous les modérions)</li>
                <li>Des transactions financières entre acheteurs et vendeurs</li>
                <li>Des litiges entre les parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Comportement des utilisateurs</h2>
              <p>Les utilisateurs s&apos;engagent à :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ne pas publier de contenu illégal, offensant ou discriminatoire</li>
                <li>Ne pas usurper l&apos;identité d&apos;un tiers</li>
                <li>Ne pas utiliser la plateforme à des fins de spam</li>
                <li>Respecter les autres utilisateurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Propriété intellectuelle</h2>
              <p>Le nom ImmoStar, le logo et le contenu de la plateforme sont la propriété exclusive de Manawa Techs.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Modification des conditions</h2>
              <p>Manawa Techs se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des modifications par email ou via la plateforme.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contact</h2>
              <p>Pour toute question :</p>
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
