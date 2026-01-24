'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'

export default function CreateRewardPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const createReward = useStore((state) => state.createReward)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'parent') {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const handleCreate = () => {
    if (!title.trim()) {
      setError('Ange en titel')
      return
    }

    if (!description.trim()) {
      setError('Ange en beskrivning')
      return
    }

    const costValue = parseInt(cost, 10)
    if (isNaN(costValue) || costValue <= 0) {
      setError('Ange giltigt pris')
      return
    }

    if (!category.trim()) {
      setError('Ange en kategori')
      return
    }

    createReward(title, description, costValue, category)
    alert('Belöningen har skapats! 🎁')
    router.push('/parent')
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => router.back()} variant="outline" className="mb-4">
            ← Tillbaka
          </Button>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎁</div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Skapa ny belöning
            </h1>
            <p className="text-secondary">
              Definiera en belöning som barnen kan köpa med sina chokladpengar
            </p>
          </div>
        </div>

        <div className="card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Titel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="T.ex. Extra datortid"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Beskrivning
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv belöningen i detalj"
                className="input min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Pris (chokladpengar)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="T.ex. 50"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Kategori
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="T.ex. Privilegium, Sak, Upplevelse"
                className="input"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button onClick={handleCreate} size="large" className="w-full">
              Skapa belöning
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

