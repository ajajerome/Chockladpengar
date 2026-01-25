'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'
import { ChocolateCoinIcon } from '@/components/icons'

export default function CreateFamilyPage() {
  const router = useRouter()
  const { createFamily } = useStore()
  const [familyName, setFamilyName] = useState('')
  const [parentName, setParentName] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = () => {
    if (!familyName.trim()) {
      setError('Ange ett familjenamn')
      return
    }

    if (!parentName.trim()) {
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
      const familyId = createFamily(familyName.trim(), parentName.trim(), pin)
      // Gå direkt till add-child utan att logga ut
      router.push(`/add-child?familyId=${familyId}`)
    } catch (error) {
      setError('Kunde inte skapa familjen. Försök igen.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <ChocolateCoinIcon size={64} color="#D4AF37" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Skapa ny familj</h1>
          <p className="text-secondary">
            Börja med att skapa en familj och lägg dig själv som första föräldern
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Familjenamn
            </label>
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="t.ex. Familjen Andersson"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Ditt namn (Förälder)
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="t.ex. Mamma, Pappa"
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
              onClick={handleCreate}
              loading={loading}
              disabled={loading}
              size="large"
              className="w-full"
            >
              Skapa familj
            </Button>

            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="w-full"
            >
              Tillbaka
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

