'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { PropertyMap } from '@/components/map/PropertyMap'
import Link from 'next/link'
import { 
  FaPhone, FaWhatsapp, FaMapMarkerAlt, FaShare, FaHeart, FaTimes, 
  FaChevronLeft, FaChevronRight, FaEye, FaShieldAlt, FaStar,
  FaBed, FaBath, FaRulerCombined, FaCalendar, FaCheck, FaArrowLeft
} from 'react-icons/fa'

export default function AnnonceDetailPage() {
  const params = useParams()
  const [annonce, setAnnonce] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [views, setViews] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    fetchAnnonce()
    const randomViews = Math.floor(Math.random() * 500) + 50
    setViews(randomViews)
    const interval = setInterval(() => setViews(prev => prev + 1), 30000)
    return () => clearInterval(interval)
  }, [params.id])

  const fetchAnnonce = async () => {
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      const found = data.find((l: any) => l.id === parseInt(params.id as string))
      setAnnonce(found || getDefaultAnnonce())
    } catch (error) {
      setAnnonce(getDefaultAnnonce())
    } finally {
      setLoading(false)
    }
  }

  const getDefaultAnnonce = () => ({
    id: params.id,
    title: "Magnifique Villa à Cocody",
    price: 85000000,
    city: "Abidjan",
    district: "Cocody",
    phone: "+225 07 08 43 21 72",
    description: "Magnifique villa moderne située dans le quartier résidentiel de Cocody. Cette propriété d'exception offre un cadre de vie luxueux avec piscine, jardin paysager et finitions haut de gamme. La villa dispose de 5 chambres spacieuses, 3 salles de bain, un grand salon lumineux, une cuisine entièrement équipée et un garage pour 2 véhicules. Sécurité 24/7, groupe électrogène, climatisation centrale. Idéale pour une famille recherchant confort et prestige dans l'un des quartiers les plus prisés d'Abidjan.",
    images: [],
    type: "sale",
    category: "villa",
    isFurnished: false,
    isVerified: true,
    rating: 4.8,
    bedrooms: 5,
    bathrooms: 3,
    area_sqm: 350,
    createdAt: new Date().toISOString(),
    features: ['Piscine', 'Garage', 'Jardin', 'Sécurité 24/7', 'Groupe électrogène', 'Climatisation'],
  })

  const handleShare = async () => {
    const text = `🏠 ${annonce?.title} - ${formatPrice(annonce?.price)} à ${annonce?.city}\n📞 ${annonce?.phone}\n🔗 ${window.location.href}`
    if (navigator.share) {
      await navigator.share({ title: annonce?.title, text, url: window.location.href })
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  const formatPrice = (price: number) => {
    if (!price) return '0 FCFA'
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M FCFA`
    return price.toLocaleString() + ' FCFA'
  }

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const days = Math.floor(diff / 86400000)
    if (days > 30) return new Date(date).toLocaleDateString('fr-FR')
    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`
    const hours = Math.floor(diff / 3600000)
    if (hours > 0) return `Il y a ${hours}h`
    return "Aujourd'hui"
  }

  const getIcon = () => {
    if (annonce?.isFurnished) return '🛋️'
    const icons: Record<string, string> = { villa: '🏡', apartment: '🏢', house: '🏠', land: '🌳', commercial: '🏪', studio: '🏘️', chambre: '🛏️' }
    return icons[annonce?.category] || '🏠'
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <span className="loader mb-4" />
            <p className="text-gray-500 animate-pulse">Chargement de l&apos;annonce...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
          <Link href="/" className="hover:text-orange-600 flex items-center gap-1"><FaArrowLeft className="text-xs" /> Accueil</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-orange-600">Annonces</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{annonce.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galerie photos */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-72 sm:h-96 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center cursor-pointer"
                onClick={() => annonce.images?.length > 0 && setShowGallery(true)}>
                {annonce.images?.length > 0 ? (
                  <img src={annonce.images[selectedImage]} alt={annonce.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-8xl">{getIcon()}</span>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${
                    annonce.type === 'sale' ? 'bg-blue-600' : annonce.type === 'vacation' ? 'bg-orange-600' : 'bg-green-600'
                  }`}>
                    {annonce.type === 'sale' ? 'À vendre' : annonce.type === 'vacation' ? 'Courte durée' : 'À louer'}
                  </span>
                  {annonce.isFurnished && (
                    <span className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">🛋️ Meublé</span>
                  )}
                  {annonce.isVerified && (
                    <span className="bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <FaShieldAlt /> Vérifié
                    </span>
                  )}
                </div>

                {/* Vues */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
                  <FaEye className="text-green-400" /> {views.toLocaleString()} vues
                </div>

                {/* Navigation images */}
                {annonce.images?.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(p => p > 0 ? p - 1 : annonce.images.length - 1) }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full shadow-lg hover:bg-white transition-all">
                      <FaChevronLeft />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(p => p < annonce.images.length - 1 ? p + 1 : 0) }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full shadow-lg hover:bg-white transition-all">
                      <FaChevronRight />
                    </button>
                  </>
                )}
                
                {annonce.images?.length > 0 && (
                  <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs shadow-lg">
                    📷 {selectedImage + 1}/{annonce.images.length}
                  </span>
                )}
              </div>
              
              {/* Miniatures */}
              {annonce.images?.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-gray-50">
                  {annonce.images.map((img: string, i: number) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImage === i ? 'border-orange-500 ring-2 ring-orange-300' : 'border-gray-200 hover:border-orange-300'
                      }`}>
                      <img src={img} alt={`Vue ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Détails du bien */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* En-tête */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{annonce.title}</h1>
                    {annonce.rating && (
                      <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full text-sm font-bold">
                        <FaStar className="text-yellow-500" /> {annonce.rating}
                      </span>
                    )}
                  </div>
                  <p className="flex items-center gap-2 text-gray-500 text-lg">
                    <FaMapMarkerAlt className="text-orange-500" />
                    {annonce.district ? `${annonce.district}, ` : ''}{annonce.city}, Côte d&apos;Ivoire
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span>📅 {getTimeAgo(annonce.createdAt)}</span>
                    <span>👁️ {views.toLocaleString()} vues</span>
                    <span>📋 Réf: #{annonce.id?.toString().padStart(6, '0')}</span>
                  </div>
                </div>
                <div className="text-right bg-orange-50 rounded-2xl p-4">
                  <div className="text-3xl font-black text-orange-600">{formatPrice(annonce.price)}</div>
                  <div className="text-sm text-gray-600 font-medium">
                    {annonce.type === 'rent' ? 'Loyer mensuel' : annonce.type === 'vacation' ? 'Par nuit' : 'Prix de vente'}
                  </div>
                </div>
              </div>

              {/* Caractéristiques */}
              {(annonce.bedrooms || annonce.bathrooms || annonce.area_sqm) && (
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                  {annonce.bedrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <FaBed className="text-2xl text-orange-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">{annonce.bedrooms}</div>
                      <div className="text-xs text-gray-500">Chambres</div>
                    </div>
                  )}
                  {annonce.bathrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <FaBath className="text-2xl text-orange-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">{annonce.bathrooms}</div>
                      <div className="text-xs text-gray-500">Salles de bain</div>
                    </div>
                  )}
                  {annonce.area_sqm > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <FaRulerCombined className="text-2xl text-orange-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">{annonce.area_sqm} m²</div>
                      <div className="text-xs text-gray-500">Surface</div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-6 pb-6 border-b">
                <h2 className="text-xl font-bold text-gray-800 mb-3">📝 Description</h2>
                <div className="relative">
                  <p className="text-gray-600 leading-relaxed">
                    {showFullDescription || (annonce.description || '').length < 300
                      ? annonce.description
                      : (annonce.description || '').substring(0, 300) + '...'
                    }
                  </p>
                  {(annonce.description || '').length > 300 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-orange-600 font-semibold hover:underline mt-2"
                    >
                      {showFullDescription ? 'Voir moins' : 'Lire la suite →'}
                    </button>
                  )}
                </div>
              </div>

              {/* Équipements */}
              {annonce.features && annonce.features.length > 0 && (
                <div className="mb-6 pb-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">✅ Équipements</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {annonce.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
                        <FaCheck className="text-green-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meublé */}
              {annonce.isFurnished && (
                <div className="mb-6 pb-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">🛋️ Équipements du meublé</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['WiFi haut débit', 'Climatisation', 'TV écran plat', 'Cuisine équipée', 'Parking sécurisé', 'Sécurité 24/7', 'Ménage inclus', 'Draps et serviettes'].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-700 bg-purple-50 rounded-xl p-3">
                        <FaCheck className="text-purple-500 flex-shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all">
                  <FaShare /> Partager l&apos;annonce
                </button>
                <button onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  <FaHeart /> {isFavorite ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                </button>
              </div>
            </div>

            {/* Carte */}
            <PropertyMap 
              city={annonce.city} 
              district={annonce.district}
              title={annonce.title}
              price={annonce.price}
            />
          </div>

          {/* Sidebar Contact - Sticky */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border-2 border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📞 Contacter le propriétaire
              </h3>
              
              {/* Vendeur vérifié */}
              {annonce.isVerified && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <FaShieldAlt className="text-green-600 text-lg" />
                  <div>
                    <div className="text-green-700 font-bold text-sm">Vendeur vérifié</div>
                    <div className="text-green-600 text-xs">Identité confirmée par ImmoStar</div>
                  </div>
                </div>
              )}

              {/* Note */}
              {annonce.rating && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <FaStar className="text-yellow-500 text-lg" />
                  <div>
                    <div className="text-yellow-700 font-bold text-sm">{annonce.rating}/5</div>
                    <div className="text-yellow-600 text-xs">Note du vendeur</div>
                  </div>
                </div>
              )}
              
              {/* Boutons de contact */}
              <div className="space-y-3">
                {showPhone ? (
                  <a href={`tel:${annonce.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md animate-fade-in-up">
                    <FaPhone className="text-xl" /> {annonce.phone}
                  </a>
                ) : (
                  <button onClick={() => setShowPhone(true)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md">
                    <FaPhone className="text-xl" /> Afficher le numéro
                  </button>
                )}

                <a href={`https://wa.me/${annonce.phone?.replace(/[\s+]/g, '')}`} target="_blank"
                  className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-md">
                  <FaWhatsapp className="text-xl" /> Contacter par WhatsApp
                </a>
              </div>

              {/* Infos supplémentaires */}
              <div className="mt-6 pt-4 border-t space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-orange-500" />
                  <span>Publié {getTimeAgo(annonce.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-orange-500" />
                  <span>{views.toLocaleString()} personnes ont vu cette annonce</span>
                </div>
              </div>

              {/* Sécurité */}
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-800 font-bold mb-1">⚠️ Conseils de sécurité</p>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>• Ne payez jamais avant d&apos;avoir visité</li>
                  <li>• Vérifiez les documents du bien</li>
                  <li>• Privilégiez les visites accompagnées</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Galerie plein écran */}
      {showGallery && annonce.images?.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white text-3xl z-10 p-3 hover:bg-white/10 rounded-full transition-all">
            <FaTimes />
          </button>
          <button onClick={() => setSelectedImage(p => p > 0 ? p - 1 : annonce.images.length - 1)}
            className="absolute left-4 text-white text-4xl p-4 hover:bg-white/10 rounded-full z-10 transition-all">
            <FaChevronLeft />
          </button>
          <img src={annonce.images[selectedImage]} alt={annonce.title} className="max-w-full max-h-[90vh] object-contain" />
          <button onClick={() => setSelectedImage(p => p < annonce.images.length - 1 ? p + 1 : 0)}
            className="absolute right-4 text-white text-4xl p-4 hover:bg-white/10 rounded-full z-10 transition-all">
            <FaChevronRight />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
            {selectedImage + 1} / {annonce.images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
