'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { TaskCard } from '@/components/TaskCard'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'

export default function ParentHomePage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const family = useStore((state) =>
    state.families.find((f) => f.id === currentUser?.familyId)
  )
  const children = useStore((state) =>
    state.users.filter((u) => family?.childIds.includes(u.id))
  )
  const tasks = useStore((state) =>
    state.tasks.filter((t) => t.familyId === currentUser?.familyId)
  )
  const pendingTasks = tasks.filter((t) => t.status === 'completed')
  const approveTask = useStore((state) => state.approveTask)
  const rejectTask = useStore((state) => state.rejectTask)
  const getBalance = useStore((state) => state.getBalance)
  const logout = useStore((state) => state.logout)

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'parent') {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">Föräldravy</h1>
              <p className="text-secondary">Familj: {family?.name}</p>
            </div>
            <button
              onClick={() => {
                logout()
                router.push('/login')
              }}
              className="text-sm text-secondary hover:text-primary underline"
            >
              Logga ut
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Barn</h2>
            <button
              onClick={() => router.push(`/add-child?familyId=${family?.id}`)}
              className="text-accent hover:text-accent-dark font-bold text-2xl"
            >
              + Lägg till
            </button>
          </div>

          {children.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-6xl mb-3">👶</div>
              <p className="text-secondary">Inga barn tillagda ännu</p>
              <p className="text-sm text-secondary mt-2">
                Lägg till ditt första barn för att börja!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {children.map((child) => {
                const balance = getBalance(child.id)
                return (
                  <div
                    key={child.id}
                    className="card flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={child.name} size="medium" />
                      <div>
                        <p className="font-bold text-primary">{child.name}</p>
                        <p className="text-sm text-secondary">
                          {balance} chokladpengar
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl">→</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Pending Tasks */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Uppgifter att godkänna
          </h2>

          {pendingTasks.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-6xl mb-3">✅</div>
              <p className="text-secondary">Inga uppgifter att godkänna</p>
              <p className="text-sm text-secondary mt-2">
                Bra jobbat, alla uppgifter är hanterade!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  showActions
                  onApprove={() => approveTask(task.id)}
                  onReject={() => rejectTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Management */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Hantera</h2>
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/parent/create-task')}
              variant="primary"
              className="w-full"
            >
              + Skapa uppgift
            </Button>
            <Button
              onClick={() => router.push('/parent/create-reward')}
              variant="secondary"
              className="w-full"
            >
              + Skapa belöning
            </Button>
            <Button
              onClick={() => router.push('/parent/settings')}
              variant="outline"
              className="w-full"
            >
              ⚙️ Familjeinställningar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

