'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { RewardCard } from '@/components/RewardCard'
import { ChocolateCoin } from '@/components/ChocolateCoin'
import { Button } from '@/components/Button'

export default function RewardsPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const rewards = useStore((state) => state.rewards)
  const balance = useStore((state) =>
    currentUser ? state.getBalance(currentUser.id) : 0
  )
  const purchaseReward = useStore((state) => state.purchaseReward)

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'child') {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const availableRewards = rewards.filter((r) => r.familyId === currentUser.familyId)

  const handlePurchase = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId)
    if (!reward) return

    if (window.confirm(`Vill du köpa "${reward.title}" för ${reward.cost} chokladpengar?`)) {
      const success = purchaseReward(rewardId)
      if (success) {
        alert('Belöningen har köpts! 🎉')
      } else {
        alert('Du har inte tillräckligt med chokladpengar')
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

          <h1 className="text-2xl font-bold text-primary mb-2">Chokladkassan</h1>
          <p className="text-secondary mb-4">Köp belöningar med dina chokladpengar</p>

          <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
            <p className="text-sm text-secondary mb-2">Ditt saldo</p>
            <ChocolateCoin amount={balance} size="large" showLabel={false} />
          </div>
        </div>

        {/* Rewards */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Tillgängliga belöningar</h2>
          {availableRewards.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-6xl mb-3">🎁</div>
              <p className="text-secondary">Inga belöningar ännu</p>
              <p className="text-sm text-secondary mt-2">
                Dina föräldrar kan skapa belöningar åt dig
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  canAfford={balance >= reward.cost}
                  onPurchase={() => handlePurchase(reward.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

