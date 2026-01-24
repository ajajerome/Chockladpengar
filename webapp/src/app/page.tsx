'use client'

import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const currentUser = useStore(state => state.currentUser)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Om användaren redan är inloggad, skicka till rätt vy
    if (isClient && currentUser) {
      if (currentUser.role === 'parent') {
        router.push('/parent')
      } else {
        router.push('/child')
      }
    }
  }, [currentUser, router, isClient])

  // Visa loading tills vi är på klienten
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-secondary">Laddar...</p>
        </div>
      </div>
    )
  }

  // Om användaren är inloggad, visa inte startsidan
  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-secondary">Laddar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-bounce">🍫</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-4">
            Chokladpengar
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-2">
            Motivationsapp för hela familjen
          </p>
          <p className="text-base md:text-lg text-secondary/80 max-w-2xl mx-auto">
            Lär barn om ansvar, pengar och målsättning genom roliga uppgifter, 
            belöningar och investeringar
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">
              Uppgifter
            </h3>
            <p className="text-sm text-secondary">
              Barn slutför uppgifter och tjänar chokladpengar
            </p>
          </div>

          <div className="card text-center bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">
              Fonder
            </h3>
            <p className="text-sm text-secondary">
              Investera och lär dig om sparande och avkastning
            </p>
          </div>

          <div className="card text-center bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">
              Belöningar
            </h3>
            <p className="text-sm text-secondary">
              Köp belöningar med dina intjänade chokladpengar
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <Button
            onClick={() => router.push('/create-family')}
            size="large"
            className="w-full text-lg py-5"
          >
            🚀 Kom igång - Skapa familj
          </Button>

          <Button
            onClick={() => router.push('/login')}
            variant="outline"
            size="large"
            className="w-full text-lg py-5"
          >
            Logga in
          </Button>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-secondary/60">
            🔒 Säkert • 👨‍👩‍👧‍👦 För hela familjen • 📱 Fungerar på alla enheter
          </p>
        </div>
      </div>
    </div>
  )
}

