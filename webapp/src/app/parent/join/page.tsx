'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'

function JoinFamilyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const familyId = searchParams.get('familyId')
  const { addParent, families } = useStore()
  const family = families.find(f => f.id === familyId)
  
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!familyId || !family) {
      setError('Ogiltig inbjudningslänk')
    }
  }, [familyId, family])

  const handleJoin = () => {
    if (!name.trim()) {
      setError('Ange ditt namn')
      return
    }

    if (pin.length !== 4) {
      setError('PIN-koden måste vara 4 siffror')
      return
    }

    if (pin !== confirmPin) {
      setError('PIN-koderna matchar inte')
      return
    }

    setLoading(true)
    try {
      addParent(familyId!, name.trim(), pin)
      alert('Välkommen till familjen! Du kan nu logga in. 🎉')
      router.push('/login')
    } catch (error) {
      setError('Kunde inte gå med i familjen')
    } finally {
      setLoading(false)
    }
  }

  if (!family) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-primary mb-2">Ogiltig länk</h1>
          <p className="text-secondary mb-6">
            Denna inbjudningslänk fungerar inte. Be den som bjöd in dig att skicka en ny länk.
          </p>
          <Button onClick={() => router.push('/login')} variant="outline" className="w-full">
            Gå till login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Gå med i {family.name}
          </h1>
          <p className="text-secondary">
            Du har blivit inbjuden att bli förälder i denna familj!
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Ditt namn
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="t.ex. Mamma, Pappa"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Skapa PIN-kod (4 siffror)
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Bekräfta PIN-kod
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="input"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Button
              onClick={handleJoin}
              loading={loading}
              disabled={loading || !family}
              size="large"
              className="w-full"
            >
              Gå med i familjen
            </Button>

            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="w-full"
            >
              Avbryt
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JoinFamilyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-secondary">Laddar...</p>
        </div>
      </div>
    }>
      <JoinFamilyContent />
    </Suspense>
  )
}

