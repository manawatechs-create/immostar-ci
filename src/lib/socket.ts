// Simulons un système temps réel sans dépendance externe
// En production, utilisez Pusher ou Socket.io

type Listener = (data: any) => void

class RealTimeSystem {
  private listeners: Map<string, Listener[]> = new Map()
  private visitors: number = 0
  private interval: NodeJS.Timeout | null = null

  constructor() {
    this.startSimulation()
  }

  // S'abonner à un canal
  subscribe(channel: string, callback: Listener) {
    const existing = this.listeners.get(channel) || []
    existing.push(callback)
    this.listeners.set(channel, existing)
    return () => this.unsubscribe(channel, callback)
  }

  // Se désabonner
  unsubscribe(channel: string, callback: Listener) {
    const existing = this.listeners.get(channel) || []
    this.listeners.set(channel, existing.filter(cb => cb !== callback))
  }

  // Émettre un événement
  emit(channel: string, data: any) {
    const callbacks = this.listeners.get(channel) || []
    callbacks.forEach(cb => cb(data))
  }

  // Simulation de visiteurs en temps réel
  private startSimulation() {
    this.interval = setInterval(() => {
      this.visitors = Math.floor(Math.random() * 20) + 5
      this.emit('visitors:update', {
        count: this.visitors,
        timestamp: Date.now(),
      })

      // Simuler des visites aléatoires
      const sources = ['google', 'facebook', 'whatsapp', 'direct', 'instagram']
      const pages = ['/', '/properties', '/meubles', '/calculator', '/properties/1']
      const devices = ['mobile', 'desktop', 'tablet']

      if (Math.random() > 0.7) {
        this.emit('visitor:new', {
          id: Date.now(),
          source: sources[Math.floor(Math.random() * sources.length)],
          page: pages[Math.floor(Math.random() * pages.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          time: 'À l\'instant',
        })
      }
    }, 5000)
  }

  destroy() {
    if (this.interval) clearInterval(this.interval)
  }
}

// Singleton
export const realtime = typeof window !== 'undefined' ? new RealTimeSystem() : null
