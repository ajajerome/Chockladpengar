'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { TaskCard } from '@/components/TaskCard'
import { ChocolateCoin } from '@/components/ChocolateCoin'
import { TreasureChestIcon, BarChartIcon, FactoryIcon, ArrowRightIcon, CheckIcon } from '@/components/icons'

export default function ChildHomePage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const tasks = useStore((state) => state.tasks)
  const balance = useStore((state) =>
    currentUser ? state.getBalance(currentUser.id) : 0
  )
  const completeTask = useStore((state) => state.completeTask)
  const logout = useStore((state) => state.logout)

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'child') {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-secondary">Laddar...</p>
        </div>
      </div>
    )
  }

  const myTasks = tasks.filter(
    (task) =>
      task.assignedTo === currentUser.id &&
      (task.status === 'pending' || task.status === 'rejected')
  )

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">
                Hej {currentUser.name}!
              </h1>
              <p className="text-sm text-secondary">Välkommen tillbaka!</p>
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
          
          <div className="balance-card">
            <p className="text-sm text-secondary mb-3 font-medium">Dina Chokladpengar</p>
            <ChocolateCoin amount={balance} size="large" showLabel={false} />
          </div>
        </div>

        {/* Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Dagens uppgifter</h2>
          {myTasks.length === 0 ? (
            <div className="empty-state">
              <div className="text-6xl mb-4 flex items-center justify-center">
                <CheckIcon size={64} color="#4CAF50" />
              </div>
              <p className="text-lg text-text-primary font-medium">Inga uppgifter just nu!</p>
              <p className="text-sm text-secondary mt-1">Bra jobbat, du är klar för idag!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => {
                    if (task.status === 'pending') {
                      completeTask(task.id)
                    }
                  }}
                  showStatus
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Vad vill du göra?</h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/child/rewards')}
              className="action-card card-gradient-orange w-full"
            >
              <div className="icon-circle icon-circle-orange">
                <TreasureChestIcon size={28} color="#D4AF37" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-primary font-display text-lg">Chokladkassan</h3>
                <p className="text-sm text-secondary">
                  Köp belöningar med dina chokladpengar
                </p>
              </div>
              <ArrowRightIcon size={24} color="#9E8B7B" />
            </button>

            <button
              onClick={() => router.push('/child/investments')}
              className="action-card card-gradient-blue w-full"
            >
              <div className="icon-circle icon-circle-blue">
                <BarChartIcon size={28} color="#2196F3" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-primary font-display text-lg">Chokladfonder</h3>
                <p className="text-sm text-secondary">
                  Investera och öka dina chokladpengar
                </p>
              </div>
              <ArrowRightIcon size={24} color="#9E8B7B" />
            </button>

            <button
              onClick={() => router.push('/child/factory')}
              className="action-card card-gradient-purple w-full"
            >
              <div className="icon-circle icon-circle-purple">
                <FactoryIcon size={28} color="#9C27B0" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-primary font-display text-lg">Chokladfabriken</h3>
                <p className="text-sm text-secondary">
                  Bygg din fabrik och få passiv inkomst
                </p>
              </div>
              <ArrowRightIcon size={24} color="#9E8B7B" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
