'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { TaskCard } from '@/components/TaskCard'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'
import { ChocolateCoinIcon, PlusIcon, SettingsIcon, CheckIcon, ArrowRightIcon, GiftIcon } from '@/components/icons'

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
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">Föräldravy</h1>
              <p className="text-secondary font-medium">Familj: {family?.name}</p>
            </div>
            <button
              onClick={() => {
                logout()
                router.push('/login')
              }}
              className="px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-white rounded-lg transition-all"
            >
              Logga ut
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">Barn</h2>
            <button
              onClick={() => router.push(`/add-child?familyId=${family?.id}`)}
              className="flex items-center gap-2 px-4 py-2 text-accent hover:text-accent-dark font-semibold rounded-lg hover:bg-accent/10 transition-all"
            >
              <PlusIcon size={20} />
              <span>Lägg till</span>
            </button>
          </div>

          {children.length === 0 ? (
            <div className="empty-state">
              <div className="text-6xl mb-4 flex items-center justify-center">
                <PlusIcon size={64} color="#9E8B7B" />
              </div>
              <p className="text-lg text-text-primary font-medium">Inga barn tillagda ännu</p>
              <p className="text-sm text-secondary mt-1">
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
                    className="card hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-between"
                    onClick={() => router.push(`/parent/child/${child.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar name={child.name} size="large" />
                      <div>
                        <p className="font-bold text-primary font-display text-lg">{child.name}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <ChocolateCoinIcon size={16} color="#D4AF37" />
                          <span className="text-sm text-secondary font-medium">
                            {balance} chokladpengar
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRightIcon size={24} color="#9E8B7B" />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Pending Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Uppgifter att godkänna
            {pendingTasks.length > 0 && (
              <span className="ml-3 px-3 py-1 text-sm bg-info text-white rounded-full">
                {pendingTasks.length}
              </span>
            )}
          </h2>

          {pendingTasks.length === 0 ? (
            <div className="empty-state">
              <div className="text-6xl mb-4 flex items-center justify-center">
                <CheckIcon size={64} color="#4CAF50" />
              </div>
              <p className="text-lg text-text-primary font-medium">Inga uppgifter att godkänna</p>
              <p className="text-sm text-secondary mt-1">
                Bra jobbat, alla uppgifter är hanterade!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="space-y-3">
                  <TaskCard
                    task={task}
                    showStatus
                  />
                  <div className="flex gap-3 px-4">
                    <Button
                      onClick={() => rejectTask(task.id)}
                      variant="outline"
                      size="medium"
                      className="flex-1 border-error text-error hover:bg-error hover:text-white"
                    >
                      Neka
                    </Button>
                    <Button
                      onClick={() => approveTask(task.id)}
                      className="flex-1 bg-success hover:bg-green-700 text-white"
                      size="medium"
                    >
                      <CheckIcon size={20} color="white" className="inline mr-1" />
                      Godkänn
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Management */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Hantera</h2>
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/parent/create-task')}
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              size="large"
            >
              <PlusIcon size={20} />
              <span>Skapa uppgift</span>
            </Button>
            <Button
              onClick={() => router.push('/parent/create-reward')}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
              size="large"
            >
              <GiftIcon size={20} />
              <span>Skapa belöning</span>
            </Button>
            <Button
              onClick={() => router.push('/parent/settings')}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              size="large"
            >
              <SettingsIcon size={20} />
              <span>Familjeinställningar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
