'use client'

import { useState } from 'react'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'
import { useFeature } from '@/hooks/useFeature'

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const enabled = useFeature('chatbot')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! Je suis l\'assistant ImmoStar.' }
  ])
  const [input, setInput] = useState('')

  const quickReplies = ['Voir les annonces', 'Publier un bien', 'Prix', 'Contact']

  const sendMessage = (text?: string) => {
    const msg = text || input
    if (!msg.trim()) return
    setMessages(prev => [...prev, { from: 'user', text: msg }])
    setInput('')
    setTimeout(() => {
      const responses: Record<string, string> = {
        'prix': 'Nos prix commencent a 25 000 FCFA/mois.',
        'annonces': 'Allez sur /properties',
        'publier': 'Allez sur /publier',
        'contact': '+225 07 08 43 21 72',
      }
      const found = Object.entries(responses).find(([key]) => msg.toLowerCase().includes(key))
      setMessages(prev => [...prev, { from: 'bot', text: found ? found[1] : 'Je peux vous aider !' }])
    }, 500)
  }

  if (!enabled) return null

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center text-2xl">
        {open ? <FaTimes /> : <FaRobot />}
      </button>
      {open && (
        <div className="fixed bottom-24 left-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-96 animate-fade-in-up">
          <div className="p-4 border-b bg-orange-500 text-white rounded-t-2xl font-bold flex items-center gap-2"><FaRobot /> Assistant</div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${msg.from === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex flex-wrap gap-1">
            {quickReplies.map(q => <button key={q} onClick={() => sendMessage(q)} className="text-xs bg-gray-100 hover:bg-orange-100 px-2 py-1 rounded-full">{q}</button>)}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input type="text" placeholder="Votre question..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm" />
            <button onClick={() => sendMessage()} className="px-4 py-2 bg-orange-500 text-white rounded-xl"><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </>
  )
}
