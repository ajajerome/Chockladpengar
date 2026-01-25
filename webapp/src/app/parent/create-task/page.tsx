'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'

export default function CreateTaskPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const family = useStore((state) =>
    state.families.find((f) => f.id === currentUser?.familyId)
  )
  const children = useStore((state) =>
    state.users.filter((u) => family?.childIds.includes(u.id))
  )
  const createTask = useStore((state) => state.createTask)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState('')
  const [assignedTo, setAssignedTo] = useState(children[0]?.id || '')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'parent') {
      router.push('/login')
    }
    if (children.length > 0 && !assignedTo) {
      setAssignedTo(children[0].id)
    }
  }, [currentUser, router, children, assignedTo])

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

    const pointsValue = parseInt(points, 10)
    if (isNaN(pointsValue) || pointsValue <= 0) {
      setError('Ange giltiga poäng')
      return
    }

    if (!assignedTo) {
      setError('Välj ett barn')
      return
    }

    createTask(title, description, pointsValue, assignedTo)
    alert('Uppgiften har skapats! 🎉')
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
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Skapa ny uppgift
            </h1>
            <p className="text-secondary">
              Definiera en uppgift och tilldela den till ett barn
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
                placeholder="T.ex. Diska"
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
                placeholder="Beskriv uppgiften i detalj"
                className="input min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Poäng (chokladpengar)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="T.ex. 10"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Tilldela till
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="input"
              >
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button onClick={handleCreate} size="large" className="w-full">
              Skapa uppgift
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


