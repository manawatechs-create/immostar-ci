'use client'

import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa'

export function Footer() {
  const socialLinks = [
    { Icon: FaFacebook, href: '#', label: 'Facebook' },
    { Icon: FaTwitter, href: '#', label: 'Twitter' },
    { Icon: FaInstagram, href: '#', label: 'Instagram' },
    { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-main py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black text-orange-500">⭐ ImmoStar</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              <FaStar className="inline text-yellow-500 mr-1" />
              La star de l&apos;immobilier en Côte d&apos;Ivoire.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Trouvez la maison parfaite pour vos projets immobiliers.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Icon className="text-white text-xs" />
                </a>
              ))}
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🔍</span> Explorer
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/properties?type=sale" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">💰</span>À vendre</Link></li>
              <li><Link href="/properties?type=rent" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">🔑</span>À louer</Link></li>
              <li><Link href="/meubles" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">🛋️</span>Meublés</Link></li>
              <li><Link href="/properties?type=sale" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">⭐</span>Premium</Link></li>
              <li><Link href="/properties?type=land" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">🌳</span>Terrains</Link></li>
            </ul>
          </div>

          {/* ImmoStar */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>⭐</span> ImmoStar
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">ℹ️</span>À propos</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">❓</span>Comment ça marche</Link></li>
              <li><Link href="/publier" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">📝</span>Publier un bien</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"><span className="w-5 text-center">📞</span>Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📞</span> Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Abidjan, Cocody, Côte d&apos;Ivoire</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-orange-500 flex-shrink-0" />
                <a href="tel:+2250708432172" className="text-gray-400 hover:text-orange-500 transition-colors">+225 07 08 43 21 72</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-500 flex-shrink-0" />
                <a href="mailto:manawatechs@gmail.com" className="text-gray-400 hover:text-orange-500 transition-colors">manawatechs@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500 flex-shrink-0">🕐</span>
                <span className="text-gray-400">Lun-Sam : 8h-18h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-main py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <p className="text-gray-500 flex items-center gap-1">
            <FaHeart className="text-red-500" /> © 2026 Manawa Techs. Tous droits réservés.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              🔒 Confidentialité
            </Link>
            <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              📋 Conditions
            </Link>
            <Link href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              🍪 Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
