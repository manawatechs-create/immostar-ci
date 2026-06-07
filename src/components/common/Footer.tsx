'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa'

export function Footer() {
  const socialLinks = [
    { Icon: FaFacebook, href: '#' },
    { Icon: FaTwitter, href: '#' },
    { Icon: FaInstagram, href: '#' },
    { Icon: FaLinkedin, href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-main py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <Image src="/images/logo.svg" alt="ImmoStar" width={150} height={38} className="h-9 w-auto brightness-0 invert mb-4" />
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              <FaStar className="inline text-yellow-500 mr-1" />
              La star de l&apos;immobilier en Côte d&apos;Ivoire.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <Icon className="text-white text-xs" />
                </a>
              ))}
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Explorer</h4>
            <ul className="space-y-2 text-sm">
              {['À vendre', 'À louer', 'Meublés', 'Premium', 'Terrains'].map(item => (
                <li key={item}><Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* ImmoStar */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">ImmoStar</h4>
            <ul className="space-y-2 text-sm">
              {['À propos', 'Fonctionnement', 'Partenaires', 'Espace Pro', 'Contact'].map(item => (
                <li key={item}><Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><FaMapMarkerAlt className="text-orange-500 mt-0.5" />Abidjan, Cocody</li>
              <li className="flex items-center gap-2"><FaPhone className="text-orange-500" />+225 07 00 00 00 00</li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-orange-500" />contact@immostar.ci</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-main py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <p className="text-gray-500">© 2025 ImmoStar. Tous droits réservés.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-gray-500 hover:text-orange-500">Confidentialité</Link>
            <Link href="#" className="text-gray-500 hover:text-orange-500">Conditions</Link>
            <Link href="#" className="text-gray-500 hover:text-orange-500">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
