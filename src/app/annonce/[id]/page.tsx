'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { PropertyMap } from '@/components/map/PropertyMap'
import Link from 'next/link'
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaShare, FaHeart, FaTimes, FaChevronLeft, FaChevronRight, FaEye, FaBed, FaBath, FaRulerCombined, FaCheck } from 'react-icons/fa'

export default function AnnonceDetailPage() {
  const params = useParams()
  const [annonce, setAnnonce] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    fetchAnnonce()
  }, [params.id])

  const fetchAnnonce = async () => {
    try {
      const res = await fetch('/api/listings')
      const data = await res.json()
      const found = data.find((l: any) => l.id === parseInt(params.id as string))
      setAnnonce(found || null)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (!price) return '0 FCFA'
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M FCFA`
    return price.toLocaleString() + ' FCFA'
  }

  if (loading) return <div className="min-h-screen"><Navbar /><div className="flex justify-center py-20"><span className="loader" /></div><Footer /></div>
  if (!annonce) return <div className="min-h-screen"><Navbar /><main className="container-main py-20 text-center"><h1 className="text-2xl font-bold">Annonce introuvable</h1><Link href="/properties" className="btn-primary mt-4">Voir les annonces</Link></main><Footer /></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-6">
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-600">Accueil</Link> / <Link href="/properties" className="hover:text-orange-600">Annonces</Link> / <span className="text-gray-800">{annonce.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Galerie */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-72 sm:h-96 cursor-pointer" onClick={() => annonce.images?.length > 0 && setShowGallery(true)}>
                {annonce.images?.length > 0 ? (
                  <img src={annonce.images[selectedImage]} alt={annonce.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><span className="text-8xl">🏠</span></div>
                )}
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold text-white ${annonce.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
                  {annonce.type === 'sale' ? 'À vendre' : annonce.type === 'vacation' ? 'Courte durée' : 'À louer'}
                </span>
                {annonce.images?.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(p => p > 0 ? p - 1 : annonce.images.length - 1) }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"><FaChevronLeft /></button>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(p => p < annonce.images.length - 1 ? p + 1 : 0) }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"><FaChevronRight /></button>
                  </>
                )}
                {annonce.images?.length > 0 && <span className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">📷 {selectedImage + 1}/{annonce.images.length}</span>}
              </div>
              {annonce.images?.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {annonce.images.map((img: string, i: number) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === i ? 'ring-2 ring-orange-500' : ''}`}>
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
                  <p className="flex items-center gap-1 text-gray-500 mt-1"><FaMapMarkerAlt className="text-orange-500" />{annonce.city}{annonce.district ? `, ${annonce.district}` : ''}</p>
                </div>
                <div className="text-right"><div className="text-3xl font-black text-orange-600">{formatPrice(annonce.price)}</div><div className="text-sm text-gray-500">{annonce.type === 'rent' ? 'Loyer mensuel' : annonce.type === 'vacation' ? 'Prix/nuit' : 'Prix de vente'}</div></div>
              </div>

              {(annonce.bedrooms > 0 || annonce.bathrooms > 0 || annonce.area_sqm > 0) && (
                <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b">
                  {annonce.bedrooms > 0 && <div className="text-center p-3 bg-gray-50 rounded-xl"><FaBed className="text-xl text-orange-500 mx-auto mb-1" /><div className="font-bold">{annonce.bedrooms}</div><div className="text-xs text-gray-500">Chambres</div></div>}
                  {annonce.bathrooms > 0 && <div className="text-center p-3 bg-gray-50 rounded-xl"><FaBath className="text-xl text-orange-500 mx-auto mb-1" /><div className="font-bold">{annonce.bathrooms}</div><div className="text-xs text-gray-500">SDB</div></div>}
                  {annonce.area_sqm > 0 && <div className="text-center p-3 bg-gray-50 rounded-xl"><FaRulerCombined className="text-xl text-orange-500 mx-auto mb-1" /><div className="font-bold">{annonce.area_sqm}m²</div><div className="text-xs text-gray-500">Surface</div></div>}
                </div>
              )}

              <div className="mb-6 pb-6 border-b">
                <h2 className="font-bold text-lg mb-2">Description</h2>
                <p className="text-gray-600 text-sm">{annonce.description}</p>
              </div>

              {annonce.features?.length > 0 && (
                <div>
                  <h2 className="font-bold text-lg mb-2">Équipements</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {annonce.features.map((f: string) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600"><FaCheck className="text-green-500 text-xs" />{f}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <PropertyMap city={annonce.city} district={annonce.district} title={annonce.title} price={annonce.price} />
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">📞 Contacter</h3>
              <a href={`tel:${annonce.phone}`} className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 mb-2"><FaPhone /> {annonce.phone}</a>
              <a href={`https://wa.me/${annonce.phone?.replace(/[\s+]/g, '')}`} target="_blank" className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600"><FaWhatsapp /> WhatsApp</a>
              <div className="mt-4 pt-4 border-t text-xs text-gray-500">Réf: #{annonce.id} • <FaEye className="inline" /> {annonce.views} vues</div>
            </div>
          </div>
        </div>
      </main>

      {showGallery && annonce.images?.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button onClick={() => setShowGallery(false)} className="absolute top-4 right-4 text-white text-3xl z-10 p-3"><FaTimes /></button>
          <button onClick={() => setSelectedImage(p => p > 0 ? p - 1 : annonce.images.length - 1)} className="absolute left-4 text-white text-4xl p-4"><FaChevronLeft /></button>
          <img src={annonce.images[selectedImage]} alt="" className="max-w-full max-h-[90vh] object-contain" />
          <button onClick={() => setSelectedImage(p => p < annonce.images.length - 1 ? p + 1 : 0)} className="absolute right-4 text-white text-4xl p-4"><FaChevronRight /></button>
        </div>
      )}

      <Footer />
    </div>
  )
}
