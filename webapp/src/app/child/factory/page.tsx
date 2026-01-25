'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { ChocolateCoin } from '@/components/ChocolateCoin'
import { Button } from '@/components/Button'
import { FACTORY_STEPS } from '@/constants/factory'

export default function FactoryPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const factory = useStore((state) =>
    state.factories.find((f) => f.userId === currentUser?.id)
  )
  const balance = useStore((state) => state.getBalance(currentUser?.id || ''))
  const buildFactoryStep = useStore((state) => state.buildFactoryStep)

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'child') {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser || !factory) return null

  const handleBuildStep = () => {
    const currentStepCost = FACTORY_STEPS[factory.currentStep].cost

    if (balance < currentStepCost) {
      alert(`Du behöver ${currentStepCost} chokladpengar för nästa steg`)
      return
    }

    if (window.confirm(`Bygg nästa steg för ${currentStepCost} chokladpengar?`)) {
      if (buildFactoryStep()) {
        if (factory.currentStep + 1 >= FACTORY_STEPS.length) {
          alert('Grattis! Din chokladfabrik är klar! Du får nu 1 chokladpeng per vecka! 🎉')
        }
      }
    }
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={() => router.back()} variant="outline" className="mb-4">
            ← Tillbaka
          </Button>

          <h1 className="text-2xl font-bold text-primary mb-2">
            Min Chokladfabrik
          </h1>
          <p className="text-secondary mb-4">
            Steg {factory.currentStep} av {FACTORY_STEPS.length}
          </p>

          <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
            <p className="text-sm text-secondary mb-2">Ditt saldo</p>
            <ChocolateCoin amount={balance} size="large" showLabel={false} />
          </div>
        </div>

        {/* Factory Icon */}
        <div className="text-center mb-6">
          <div
            className={`text-9xl ${
              factory.isComplete ? 'animate-pulse' : 'opacity-50'
            }`}
          >
            🏭
          </div>
        </div>

        {/* Complete Status */}
        {factory.isComplete && (
          <div className="card bg-gradient-to-br from-green-100 to-green-50 border-green-300 mb-6">
            <h3 className="font-bold text-green-800 mb-2 text-xl">
              Fabrik klar! 🎉
            </h3>
            <p className="text-green-700">
              Din fabrik producerar {factory.weeklyIncome} chokladpeng/vecka
            </p>
          </div>
        )}

        {/* Build Steps */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-4">Byggsteg</h2>
          <div className="space-y-3">
            {FACTORY_STEPS.map((step, index) => {
              const isComplete = index < factory.currentStep
              const isCurrent = index === factory.currentStep
              const isLocked = index > factory.currentStep

              return (
                <div
                  key={index}
                  className={`card ${
                    isCurrent
                      ? 'ring-2 ring-accent'
                      : isComplete
                      ? 'bg-green-50'
                      : 'opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isComplete
                            ? 'bg-green-500'
                            : isLocked
                            ? 'bg-gray-300'
                            : 'bg-accent'
                        }`}
                      >
                        {isComplete ? (
                          <span className="text-white text-xl">✓</span>
                        ) : isLocked ? (
                          <span className="text-white">🔒</span>
                        ) : (
                          <span className="text-white font-bold">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-bold ${
                            isComplete
                              ? 'text-green-700'
                              : isLocked
                              ? 'text-gray-500'
                              : 'text-primary'
                          }`}
                        >
                          {step.name}
                        </p>
                        <p className="text-sm text-secondary">
                          {step.cost} chokladpengar
                        </p>
                      </div>
                    </div>

                    {isCurrent && !factory.isComplete && (
                      <Button
                        onClick={handleBuildStep}
                        variant="primary"
                        size="small"
                        disabled={balance < step.cost}
                      >
                        Bygg
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Statistics */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Statistik</h2>
          <div className="card">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
              <span className="text-secondary">Totalt investerat:</span>
              <span className="font-bold text-primary">
                {factory.totalInvested} chokladpengar
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Veckovinst:</span>
              <span className="font-bold text-primary">
                {factory.weeklyIncome} chokladpengar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


