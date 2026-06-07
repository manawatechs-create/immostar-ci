'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  user_type: 'owner' | 'agency' | 'admin'
  agency_name?: string
  profile_image?: string
  is_verified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  full_name: string
  phone?: string
  user_type: 'owner' | 'agency'
  agency_name?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function checkUser() {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        await fetchUserProfile(authUser.id)
      }
    } catch (err) {
      console.error('Erreur checkUser:', err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (data && !error) {
      setUser(data)
    }
  }

  async function login(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      if (data.user) {
        await fetchUserProfile(data.user.id)
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion')
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function register(data: RegisterData) {
    setLoading(true)
    setError(null)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            full_name: data.full_name,
            phone: data.phone,
            user_type: data.user_type,
            agency_name: data.agency_name,
            is_verified: false,
          })

        if (profileError) throw profileError
        
        await fetchUserProfile(authData.user.id)
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erreur d\'inscription')
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
    } catch (err: any) {
      console.error('Erreur logout:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(data: Partial<User>) {
    if (!user) return
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id)

      if (error) throw error
      
      setUser({ ...user, ...data })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
