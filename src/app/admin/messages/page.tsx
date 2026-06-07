'use client'
import { FaEnvelope, FaSearch } from 'react-icons/fa'

export default function MessagesPage() {
  const messages = [
    { id: 1, name: 'M. Kouadio', email: 'kouadio@email.com', subject: 'Visite Villa Cocody', date: '2025-01-15', status: 'unread' },
    { id: 2, name: 'Mme. Koné', email: 'kone@email.com', subject: 'Prix Appartement', date: '2025-01-14', status: 'read' },
    { id: 3, name: 'M. Touré', email: 'toure@email.com', subject: 'Disponibilité Duplex', date: '2025-01-13', status: 'unread' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">{messages.length} messages reçus</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Expéditeur</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Sujet</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map(msg => (
                <tr key={msg.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800 text-sm">{msg.name}</div>
                    <div className="text-xs text-gray-500">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{msg.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{msg.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${msg.status === 'unread' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                      {msg.status === 'unread' ? 'Non lu' : 'Lu'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
