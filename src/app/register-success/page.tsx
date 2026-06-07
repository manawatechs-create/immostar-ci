'use client'

import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaCheckCircle, FaUpload, FaShare, FaPhone } from 'react-icons/fa'
import Link from 'next/link'

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-12">
        <div className="max-w-lg mx-auto text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎉 Compte créé !</h1>
          <p className="text-gray-500 mb-8">Bienvenue sur ImmoStar ! Voici vos prochaines étapes :</p>

          <div className="space-y-4 mb-8">
            <Link href="/admin/properties/add" className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all text-left">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaUpload className="text-orange-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Publiez votre premier bien</h3>
                <p className="text-sm text-gray-500">Ajoutez des photos et une description pour attirer les acheteurs</p>
              </div>
            </Link>

            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaShare className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Partagez votre annonce</h3>
                <p className="text-sm text-gray-500">Copiez le lien et partagez-le sur WhatsApp, Facebook...</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-6 text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Recevez des contacts</h3>
                <p className="text-sm text-gray-500">Les acheteurs vous contacteront directement</p>
              </div>
            </div>
          </div>

          <Link href="/admin/properties/add" className="btn-primary text-lg">
            🏠 Publier mon premier bien
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
