'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { TaskCard } from '@/components/TaskCard'
import { ChocolateCoin } from '@/components/ChocolateCoin'

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

  if (!currentUser) return null

  const myTasks = tasks.filter(
    (task) =>
      task.assignedTo === currentUser.id &&
      (task.status === 'pending' || task.status === 'rejected')
  )

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">
              Hej {currentUser.name}! 👋
            </h1>
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
          
          <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
            <p className="text-sm text-secondary mb-2">Dina Chokladpengar</p>
            <ChocolateCoin amount={balance} size="large" showLabel={false} />
          </div>
        </div>

        {/* Tasks */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-4">Dagens uppgifter</h2>
          {myTasks.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-6xl mb-3">🎉</div>
              <p className="text-secondary">Inga uppgifter just nu!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={() => completeTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Vad vill du göra?</h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/child/rewards')}
              className="card w-full text-left hover:shadow-xl transition-all flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
                🎁
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary">Chokladkassan</h3>
                <p className="text-sm text-secondary">
                  Köp belöningar med dina chokladpengar
                </p>
              </div>
              <span className="text-2xl">→</span>
            </button>

            <button
              onClick={() => router.push('/child/investments')}
              className="card w-full text-left hover:shadow-xl transition-all flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                📈
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary">Chokladfonder</h3>
                <p className="text-sm text-secondary">
                  Investera och öka dina chokladpengar
                </p>
              </div>
              <span className="text-2xl">→</span>
            </button>

            <button
              onClick={() => router.push('/child/factory')}
              className="card w-full text-left hover:shadow-xl transition-all flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-3xl">
                🏭
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary">Chokladfabriken</h3>
                <p className="text-sm text-secondary">
                  Bygg din fabrik och få passiv inkomst
                </p>
              </div>
              <span className="text-2xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

