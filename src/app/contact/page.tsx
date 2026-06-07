'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 800)
  }

  const contacts = [
    { icon: FaPhone, title: 'Téléphone', info: '+225 07 08 43 21 72', sub: 'Lun-Sam 8h-18h', color: 'bg-orange-100 text-orange-600', href: 'tel:+2250708432172' },
    { icon: FaWhatsapp, title: 'WhatsApp', info: '+225 07 08 43 21 72', sub: 'Réponse rapide', color: 'bg-green-100 text-green-600', href: 'https://wa.me/2250708432172' },
    { icon: FaEnvelope, title: 'Email', info: 'manawatechs@gmail.com', sub: 'Sous 24h', color: 'bg-blue-100 text-blue-600', href: 'mailto:manawatechs@gmail.com' },
    { icon: FaMapMarkerAlt, title: 'Adresse', info: 'Cocody, Abidjan', sub: 'Côte d\'Ivoire', color: 'bg-red-100 text-red-600', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-2">📞 Contactez-nous</h1>
            <p className="text-orange-100">L&apos;équipe Manawa Techs est à votre écoute</p>
          </div>
        </section>

        <section className="container-main -mt-6 relative z-20 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              {contacts.map((item, i) => (
                <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                  className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="text-lg" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.info}</div>
                    <div className="text-xs text-gray-400">{item.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Envoyez-nous un message</h2>
                {sent && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-4 text-sm flex items-center gap-2 animate-fade-in-up">
                    <FaPaperPlane /> Message envoyé avec succès !
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" required placeholder="Votre nom" className="input-field"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input type="email" required placeholder="votre@email.com" className="input-field"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <input type="tel" placeholder="+225 XX XX XX XX" className="input-field"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    <select className="input-field" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                      <option value="">Sujet</option>
                      <option value="info">Demande d&apos;information</option>
                      <option value="visit">Visite</option>
                      <option value="partner">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <textarea rows={4} required placeholder="Votre message..." className="input-field"
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  <button type="submit" disabled={loading}
                    className="btn-primary flex items-center gap-2">
                    {loading ? 'Envoi...' : <><FaPaperPlane /> Envoyer</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
