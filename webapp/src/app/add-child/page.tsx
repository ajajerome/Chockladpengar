'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'

export default function AddChildPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const familyId = searchParams.get('familyId')
  const { addChild } = useStore()
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!familyId) {
      router.push('/login')
    }
  }, [familyId, router])

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Ange barnets namn')
      return
    }

    if (pin && pin.length !== 4) {
      setError('PIN-koden måste vara 4 siffror eller lämnas tom')
      return
    }

    setLoading(true)
    try {
      addChild(familyId!, name.trim(), pin || '')
      // Reset form
      setName('')
      setPin('')
      setError('')
      alert('Barnet har lagts till! Du kan lägga till fler eller gå till login.')
    } catch (error) {
      setError('Kunde inte lägga till barnet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👶</div>
          <h1 className="text-3xl font-bold text-primary mb-2">Lägg till barn</h1>
          <p className="text-secondary">
            Lägg till dina barn i familjen. De kan välja att ha en PIN-kod eller inte.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Barnets namn
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="t.ex. Lisa, Emil"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              PIN-kod (valfritt)
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
            <p className="text-xs text-secondary mt-1">
              Lämna tom om barnet inte ska ha PIN-kod
            </p>
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
              Lägg till barn
            </Button>

            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="w-full"
            >
              Klar, gå till login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

