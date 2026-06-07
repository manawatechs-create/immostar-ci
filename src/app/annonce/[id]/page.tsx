'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaBed, FaBath, FaShare, FaHeart, FaPrint, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

export default function AnnonceDetailPage() {
  const params = useParams()
  const [annonce, setAnnonce] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchAnnonce()
  }, [params.id])

  const fetchAnnonce = async () => {
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      const found = data.find((l: any) => l.id === parseInt(params.id as string))
      setAnnonce(found || {
        id: params.id,
        title: "Annonce",
        price: 0,
        city: "Abidjan",
        phone: "+225 07 00 00 00",
        description: "Description non disponible",
        images: [],
        type: "sale",
        category: "house",
        isFurnished: false,
        district: "",
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: annonce?.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      alert('✅ Lien copié ! Partagez-le sur WhatsApp ou Facebook.')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const formatPrice = (price: number) => {
    if (!price) return '0 FCFA'
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M FCFA`
    return price.toLocaleString() + ' FCFA'
  }

  const getDefaultImage = () => {
    if (annonce?.isFurnished) return '🛋️'
    if (annonce?.category === 'villa') return '🏡'
    if (annonce?.category === 'apartment') return '🏢'
    if (annonce?.category === 'land') return '🌳'
    return '🏠'
  }

  if (loading) {
    return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>
  }

  if (!annonce) {
    return (
      <div className="min-h-screen"><Navbar />
        <main className="container-main py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">Annonce introuvable</h1>
          <Link href="/properties" className="btn-primary">Voir les annonces</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-main py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-600">Accueil</Link> / 
          <Link href="/properties" className="hover:text-orange-600">Annonces</Link> / 
          <span className="text-gray-800">{annonce.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Galerie */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center cursor-pointer"
                onClick={() => annonce.images?.length > 0 && setShowGallery(true)}>
                {annonce.images?.length > 0 ? (
                  <img src={annonce.images[selectedImage]} alt={annonce.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-8xl">{getDefaultImage()}</span>
                )}
                
                {/* Badges */}
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                  annonce.type === 'sale' ? 'bg-blue-600' : annonce.type === 'vacation' ? 'bg-orange-600' : 'bg-green-600'
                }`}>
                  {annonce.type === 'sale' ? 'À vendre' : annonce.type === 'vacation' ? 'Courte durée' : 'À louer'}
                </span>
                {annonce.isFurnished && (
                  <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-bold">🛋️ Meublé</span>
                )}
                
                {/* Navigation galerie */}
                {annonce.images?.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => prev > 0 ? prev - 1 : annonce.images.length - 1) }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white">
                      <FaChevronLeft />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => prev < annonce.images.length - 1 ? prev + 1 : 0) }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white">
                      <FaChevronRight />
                    </button>
                  </>
                )}
                
                {/* Compteur photos */}
                {annonce.images?.length > 0 && (
                  <span className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                    📷 {selectedImage + 1}/{annonce.images.length}
                  </span>
                )}
              </div>
              
              {/* Miniatures */}
              {annonce.images?.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {annonce.images.map((img: string, i: number) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === i ? 'ring-2 ring-orange-500' : ''}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Infos */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{annonce.title}</h1>
                  <p className="flex items-center gap-1 text-gray-500 mt-1">
                    <FaMapMarkerAlt className="text-orange-500" />
                    {annonce.city}{annonce.district ? `, ${annonce.district}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-orange-600">{formatPrice(annonce.price)}</div>
                  <div className="text-sm text-gray-500">
                    {annonce.type === 'rent' ? 'Loyer mensuel' : annonce.type === 'vacation' ? 'Prix par nuit' : 'Prix de vente'}
                  </div>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b">
                <h2 className="font-bold text-lg mb-2">Description</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{annonce.description || 'Aucune description fournie.'}</p>
              </div>

              {annonce.isFurnished && (
                <div className="mb-6 pb-6 border-b">
                  <h2 className="font-bold text-lg mb-2">🛋️ Équipements du meublé</h2>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {['WiFi', 'Climatisation', 'TV', 'Cuisine équipée', 'Parking', 'Sécurité 24/7'].map(item => (
                      <span key={item} className="flex items-center gap-2">✅ {item}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors">
                  <FaShare /> Partager
                </button>
                <button onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <FaHeart /> {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
                </button>
                <button onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                  <FaPrint /> Imprimer
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Contact */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">📞 Contacter le vendeur</h3>
              
              <div className="space-y-2">
                <a href={`tel:${annonce.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md">
                  <FaPhone /> {annonce.phone || 'Non renseigné'}
                </a>

                <a href={`https://wa.me/${annonce.phone?.replace(/[\s+]/g, '')}`} target="_blank"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>

              <div className="mt-4 pt-4 border-t text-center text-xs text-gray-500">
                <p>Réf: #{annonce.id?.toString().padStart(6, '0')}</p>
                <p>Publié le {new Date(annonce.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>

              <div className="mt-3 p-3 bg-orange-50 rounded-xl text-xs text-orange-800">
                🔒 Ne payez jamais avant d&apos;avoir visité le bien.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Galerie plein écran */}
      {showGallery && annonce.images?.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white text-2xl z-10 p-2 hover:bg-white/10 rounded-full">
            <FaTimes />
          </button>
          <button onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : annonce.images.length - 1)}
            className="absolute left-4 text-white text-3xl p-4 hover:bg-white/10 rounded-full z-10">
            <FaChevronLeft />
          </button>
          <img src={annonce.images[selectedImage]} alt="" className="max-w-full max-h-[90vh] object-contain" />
          <button onClick={() => setSelectedImage(prev => prev < annonce.images.length - 1 ? prev + 1 : 0)}
            className="absolute right-4 text-white text-3xl p-4 hover:bg-white/10 rounded-full z-10">
            <FaChevronRight />
          </button>
          <span className="absolute bottom-4 text-white text-sm">
            {selectedImage + 1} / {annonce.images.length}
          </span>
        </div>
      )}

      <Footer />
    </div>
  )
}
