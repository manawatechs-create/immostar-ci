'use client'

import { useState, useEffect } from 'react'
import { FaSync, FaCheck } from 'react-icons/fa'

export function LiveDataIndicator() {
  const [status, setStatus] = useState<'synced' | 'syncing'>('synced')
  const [lastSync, setLastSync] = useState<string>('')

  useEffect(() => {
    const checkSync = async () => {
      setStatus('syncing')
      try {
        const res = await fetch('/api/data?type=settings')
        const data = await res.json()
        setLastSync(new Date().toLocaleTimeString('fr-FR'))
        setStatus('synced')
      } catch {
        setStatus('synced')
      }
    }

    checkSync()
    const interval = setInterval(checkSync, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs">
      {status === 'synced' ? (
        <span className="flex items-center gap-1 text-green-600">
          <FaCheck className="text-xs" /> Synchronisé {lastSync}
        </span>
      ) : (
        <span className="flex items-center gap-1 text-orange-600 animate-pulse">
          <FaSync className="text-xs animate-spin" /> Synchro...
        </span>
      )}
    </div>
  )
}
