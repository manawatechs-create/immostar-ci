'use client'

import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa'

export default function MessagesPage() {
  const [conversations] = useState([
    { id: 1, name: 'M. Kouadio', lastMessage: 'Le bien est toujours disponible ?', time: '10:30', unread: 2, phone: '+225 07 00 00 01' },
    { id: 2, name: 'Mme. Koné', lastMessage: 'Merci pour votre réponse', time: 'Hier', unread: 0, phone: '+225 07 00 00 03' },
  ])

  const [activeChat, setActiveChat] = useState<any>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<any>({
    1: [
      { from: 'them', text: 'Bonjour, le bien est toujours disponible ?', time: '10:25' },
      { from: 'me', text: 'Oui, toujours disponible. Voulez-vous le visiter ?', time: '10:28' },
      { from: 'them', text: 'Oui, je suis intéressé. Quel est le prix final ?', time: '10:30' },
    ],
    2: [
      { from: 'them', text: 'Merci pour votre réponse', time: 'Hier' },
    ]
  })

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return
    setChatMessages((prev: any) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), { from: 'me', text: newMessage, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }]
    }))
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-main py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">💬 Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste conversations */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b font-bold text-gray-800">Conversations</div>
            {conversations.map(conv => (
              <button key={conv.id} onClick={() => setActiveChat(conv)}
                className={`w-full text-left p-4 hover:bg-gray-50 border-b flex items-center gap-3 ${activeChat?.id === conv.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">{conv.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm flex items-center justify-between">
                    <span>{conv.name}</span>
                    {conv.unread > 0 && <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{conv.unread}</span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400">{conv.time}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm flex flex-col h-[500px]">
            {activeChat ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">{activeChat.name.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-sm">{activeChat.name}</div>
                      <a href={`tel:${activeChat.phone}`} className="text-xs text-orange-600 flex items-center gap-1"><FaPhone className="text-xs" /> {activeChat.phone}</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {(chatMessages[activeChat.id] || []).map((msg: any, i: number) => (
                    <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.from === 'me' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {msg.text}
                        <div className={`text-xs mt-1 ${msg.from === 'me' ? 'text-orange-100' : 'text-gray-400'}`}>{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t flex gap-2">
                  <input type="text" placeholder="Votre message..." value={newMessage} onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    className="input-field flex-1" />
                  <button onClick={sendMessage} className="btn-primary"><FaPaperPlane /></button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">Sélectionnez une conversation</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
