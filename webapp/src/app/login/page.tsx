'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'

export default function LoginPage() {
  const router = useRouter()
  const { users, login } = useStore()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

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

  if (users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4">🍫</div>
          <h1 className="text-3xl font-bold text-primary mb-2">Chokladpengar</h1>
          <p className="text-secondary mb-6">Motivationsapp för familjer</p>
          <p className="text-secondary mb-6">
            Ingen familj hittades. Skapa en ny familj för att komma igång!
          </p>
          <Button onClick={() => router.push('/create-family')} size="large">
            Skapa familj
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🍫</div>
          <h1 className="text-3xl font-bold text-primary mb-2">Chokladpengar</h1>
          <p className="text-secondary">Välj vem du är</p>
        </div>

        <div className="space-y-4">
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
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {user.role === 'parent' ? '👨' : '👶'}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{user.name}</p>
                    <p className="text-sm text-secondary">
                      {user.role === 'parent' ? 'Förälder' : 'Barn'}
                    </p>
                  </div>
                </div>
                {selectedUser === user.id && (
                  <span className="text-2xl text-accent">✓</span>
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
        </div>
      </div>
    </div>
  )
}

