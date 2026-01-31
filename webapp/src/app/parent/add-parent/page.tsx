'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'
import { ChocolateCoinIcon } from '@/components/icons'

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
      alert('Föräldern har lagts till!')
      router.push('/parent/settings')
    } catch (error) {
      setError('Kunde inte lägga till föräldern')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
              <ChocolateCoinIcon size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#8B5A3C' }}>Lägg till förälder</h1>
          <p style={{ color: '#A67C52' }}>
            Lägg till en annan förälder som kan hantera uppgifter och belöningar
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
              Namn
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="t.ex. Mamma, Pappa, Farmor"
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
              PIN-kod (4 siffror)
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all text-center text-2xl tracking-widest"
              style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
              Bekräfta PIN-kod
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all text-center text-2xl tracking-widest"
              style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
            />
          </div>

          {error && (
            <div className="p-3 rounded-2xl border-2 text-sm" style={{ backgroundColor: '#FFEBEE', borderColor: '#FF6B6B', color: '#C62828' }}>
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Button
              onClick={handleAdd}
              loading={loading}
              disabled={loading}
              size="lg"
              fullWidth
            >
              Lägg till förälder
            </Button>

            <Button
              onClick={() => router.back()}
              variant="ghost"
              fullWidth
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
              <ChocolateCoinIcon size={48} />
            </div>
          </div>
          <p style={{ color: '#A67C52' }}>Laddar...</p>
        </div>
      </div>
    }>
      <AddParentContent />
    </Suspense>
  )
}
