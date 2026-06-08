'use client'

import { useState, useEffect } from 'react'
import { FaPhone, FaWhatsapp, FaSearch, FaEye } from 'react-icons/fa'

export default function TrialUsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const defaultUsers = [
      { id: 1, name: 'M. Kouadio', email: 'kouadio@email.com', phone: '+225 07 00 00 01', userType: 'owner', plan: 'trial', trialStart: '2025-01-10', trialEnd: '2025-04-10', daysLeft: 15, totalProperties: 5, status: 'active' },
      { id: 2, name: 'Agence ImmoPlus', email: 'contact@immoplus.ci', phone: '+225 07 00 00 02', userType: 'agency', plan: 'trial', trialStart: '2025-01-05', trialEnd: '2025-04-05', daysLeft: 10, totalProperties: 12, status: 'active' },
      { id: 3, name: 'Mme. Koné', email: 'kone@email.com', phone: '+225 07 00 00 03', userType: 'owner', plan: 'trial', trialStart: '2025-01-18', trialEnd: '2025-04-18', daysLeft: 23, totalProperties: 1, status: 'active' },
      { id: 4, name: 'M. Touré', email: 'toure@email.com', phone: '+225 07 00 00 04', userType: 'owner', plan: 'trial', trialStart: '2024-11-01', trialEnd: '2025-02-01', daysLeft: 0, totalProperties: 8, status: 'expired' },
      { id: 5, name: 'Agence ABC', email: 'abc@email.com', phone: '+225 07 00 00 05', userType: 'agency', plan: 'pro', trialStart: '2024-12-15', trialEnd: '2025-03-15', daysLeft: 0, totalProperties: 15, status: 'subscribed' },
    ]
    setUsers(defaultUsers)
  }, [])

  const filtered = users.filter(u => {
    if (filter === 'expired') return u.status === 'expired'
    if (filter === 'active') return u.status === 'active'
    if (filter === 'expiring') return u.daysLeft <= 10 && u.daysLeft > 0
    if (search) return u.name.toLowerCase().includes(search.toLowerCase())
    return true
  })

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    expired: users.filter(u => u.status === 'expired').length,
    expiringSoon: users.filter(u => u.daysLeft <= 10 && u.daysLeft > 0).length,
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">⏰ Périodes d&apos;essai</h1>
      <p className="text-gray-500 text-sm">{stats.total} utilisateurs</p>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 text-center"><div className="text-2xl font-bold">{stats.total}</div><div className="text-xs text-gray-500">Total</div></div>
        <div className="bg-white rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-600">{stats.active}</div><div className="text-xs text-gray-500">En essai</div></div>
        <div className="bg-white rounded-xl p-4 text-center"><div className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</div><div className="text-xs text-gray-500">Expire bientôt</div></div>
        <div className="bg-white rounded-xl p-4 text-center"><div className="text-2xl font-bold text-red-600">{stats.expired}</div><div className="text-xs text-gray-500">Expirés</div></div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm" />
        </div>
        {['all','active','expiring','expired'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-xs font-medium ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
            {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : f === 'expiring' ? 'Expire' : 'Expirés'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 text-xs font-semibold">Utilisateur</th>
            <th className="px-4 py-3 text-xs font-semibold">Plan</th>
            <th className="px-4 py-3 text-xs font-semibold">Jours restants</th>
            <th className="px-4 py-3 text-xs font-semibold">Biens</th>
            <th className="px-4 py-3 text-xs font-semibold">Statut</th>
            <th className="px-4 py-3 text-xs font-semibold">Actions</th>
          </tr></thead>
          <tbody className="divide-y">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="font-medium text-sm">{user.name}</div><div className="text-xs text-gray-400">{user.email}</div></td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">{user.plan}</span></td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${user.daysLeft <= 0 ? 'bg-red-100 text-red-700' : user.daysLeft <= 10 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{user.daysLeft <= 0 ? 'Expiré' : `${user.daysLeft}j`}</span></td>
                <td className="px-4 py-3 text-sm">{user.totalProperties}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${user.status === 'expired' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{user.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <a href={`tel:${user.phone}`} className="p-1.5 bg-orange-100 text-orange-600 rounded-lg"><FaPhone className="text-xs" /></a>
                    <a href={`https://wa.me/${user.phone?.replace(/[\s+]/g, '')}`} target="_blank" className="p-1.5 bg-green-100 text-green-600 rounded-lg"><FaWhatsapp className="text-xs" /></a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
