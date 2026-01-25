'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'

function AddParentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const familyId = searchParams.get('familyId')
  const { addParent } = useStore()
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!familyId) {
      router.push('/login')
    }
  }, [familyId, router])

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Ange förälderns namn')
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
      alert('Föräldern har lagts till! ✅')
      router.push('/parent/settings')
    } catch (error) {
      setError('Kunde inte lägga till föräldern')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👨‍👩</div>
          <h1 className="text-3xl font-bold text-primary mb-2">Lägg till förälder</h1>
          <p className="text-secondary">
            Lägg till en annan förälder som kan hantera uppgifter och belöningar
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Namn
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="t.ex. Mamma, Pappa, Farmor"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              PIN-kod (4 siffror)
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
              onClick={handleAdd}
              loading={loading}
              disabled={loading}
              size="large"
              className="w-full"
            >
              Lägg till förälder
            </Button>

            <Button
              onClick={() => router.back()}
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

export default function AddParentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-secondary">Laddar...</p>
        </div>
      </div>
    }>
      <AddParentContent />
    </Suspense>
  )
}


