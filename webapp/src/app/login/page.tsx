'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'
import { ChocolateCoinIcon } from '@/components/icons'

export default function LoginPage() {
  const router = useRouter()
  const store = useStore()
  const { users, login, loadData, syncWithFirebase } = store
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      // Manually rehydrate the store from localStorage
      await (useStore.persist as any).rehydrate()
      await loadData()
      syncWithFirebase()
      setIsReady(true)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = () => {
    if (!selectedUser) {
      setError('Välj en användare')
      return
    }

    const user = users.find((u) => u.id === selectedUser)
    if (user?.pin && pin.length !== 4) {
      setError('PIN-koden måste vara 4 siffror')
      return
    }

    const success = login(selectedUser, pin || undefined)
    if (!success) {
      setError('Fel PIN-kod')
      setPin('')
      return
    }

    // Redirect based on role
    if (user?.role === 'parent') {
      router.push('/parent')
    } else {
      router.push('/child')
    }
  }

  // Konsekvent struktur - alltid samma DOM
  const showNoUsers = isReady && users.length === 0
  const showUsers = isReady && users.length > 0

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <ChocolateCoinIcon size={64} color="#D4AF37" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Chokladpengar</h1>
          <p className="text-secondary">
            {!isReady && 'Laddar data...'}
            {showNoUsers && 'Motivationsapp för familjer'}
            {showUsers && 'Välj vem du är'}
          </p>
        </div>

        <div className="space-y-4">
          {/* Loading state */}
          {!isReady && (
            <div className="text-center py-8">
              <div className="animate-pulse text-secondary">
                Hämtar information...
              </div>
            </div>
          )}

          {/* No users state */}
          {showNoUsers && (
            <>
              <p className="text-secondary text-center mb-6">
                Ingen familj hittades. Skapa en ny familj för att komma igång!
              </p>
              <Button onClick={() => router.push('/create-family')} size="large" className="w-full">
                Skapa familj
              </Button>
            </>
          )}

          {/* Users list */}
          {showUsers && (
            <>
              <label className="block text-sm font-medium text-primary mb-2">
                Användare:
              </label>
              
              {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user.id)
                      setError('')
                      setPin('')
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedUser === user.id
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="medium" />
                        <div>
                          <p className="font-bold text-primary">{user.name}</p>
                          <p className="text-sm text-secondary">
                            {user.role === 'parent' ? 'Förälder' : 'Barn'}
                          </p>
                        </div>
                      </div>
                      {selectedUser === user.id && (
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
              ))}

              {selectedUser && users.find((u) => u.id === selectedUser)?.pin && (
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    PIN-kod:
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
              )}

              {error && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleLogin}
                disabled={!selectedUser}
                size="large"
                className="w-full"
              >
                Logga in
              </Button>

              <button
                onClick={() => router.push('/create-family')}
                className="w-full text-center text-secondary hover:text-primary underline text-sm"
              >
                Skapa ny familj
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

