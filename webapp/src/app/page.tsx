'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'

export default function Home() {
  const router = useRouter()
  const currentUser = useStore(state => state.currentUser)

  useEffect(() => {
    if (currentUser) {
      // Redirect to appropriate home screen based on role
      if (currentUser.role === 'parent') {
        router.push('/parent')
      } else {
        router.push('/child')
      }
    } else {
      // Redirect to login
      router.push('/login')
    }
  }, [currentUser, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🍫</div>
        <h1 className="text-3xl font-bold text-primary mb-2">Chokladpengar</h1>
        <p className="text-secondary">Laddar...</p>
      </div>
    </div>
  )
}

