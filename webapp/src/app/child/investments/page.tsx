'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { FundCard } from '@/components/FundCard'
import { ChocolateCoin } from '@/components/ChocolateCoin'
import { Button } from '@/components/Button'
import { FundType, FUNDS } from '@/constants/funds'

export default function InvestmentsPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const investments = useStore((state) =>
    state.investments.filter((i) => i.userId === currentUser?.id)
  )
  const balance = useStore((state) => state.getBalance(currentUser?.id || ''))
  const invest = useStore((state) => state.invest)
  const withdrawInvestment = useStore((state) => state.withdrawInvestment)

  const [selectedFund, setSelectedFund] = useState<FundType | null>(null)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'child') {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const handleInvest = () => {
    if (!selectedFund) {
      alert('Välj en fond att investera i')
      return
    }

    const investAmount = parseInt(amount, 10)
    if (isNaN(investAmount) || investAmount < 10) {
      alert('Minsta investering är 10 chokladpengar')
      return
    }

    if (invest(selectedFund, investAmount)) {
      alert(`Du investerade ${investAmount} chokladpengar! 🎉`)
      setAmount('')
      setSelectedFund(null)
    } else {
      alert('Du har inte tillräckligt med chokladpengar')
    }
  }

  const handleWithdraw = (investmentId: string) => {
    if (window.confirm('Vill du ta ut denna investering?')) {
      withdrawInvestment(investmentId)
      alert('Investering uttagen! 💰')
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

          <h1 className="text-2xl font-bold text-primary mb-2">Chokladfonder</h1>
          <p className="text-secondary mb-4">Investera dina chokladpengar</p>

          <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
            <p className="text-sm text-secondary mb-2">Ditt saldo</p>
            <ChocolateCoin amount={balance} size="large" showLabel={false} />
          </div>
        </div>

        {/* Fund Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-4">Välj fond</h2>
          <div className="space-y-3">
            {(Object.keys(FUNDS) as FundType[]).map((fundType) => (
              <FundCard
                key={fundType}
                fundType={fundType}
                isSelected={selectedFund === fundType}
                onClick={() => setSelectedFund(fundType)}
              />
            ))}
          </div>
        </div>

        {/* Invest Form */}
        {selectedFund && (
          <div className="card mb-6">
            <h3 className="font-bold text-primary mb-4">
              Investera i {FUNDS[selectedFund].name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Belopp (min 10)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Belopp"
                  className="input"
                />
              </div>
              <Button onClick={handleInvest} size="large" className="w-full">
                Investera
              </Button>
            </div>
          </div>
        )}

        {/* My Investments */}
        {investments.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Mina investeringar</h2>
            <div className="space-y-4">
              {investments.map((inv) => (
                <div key={inv.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-primary">
                        {FUNDS[inv.fundType].name}
                      </h3>
                      <p className="text-sm text-secondary">
                        Investerat: {inv.amount} chokladpengar
                      </p>
                      <p className="text-sm text-secondary">
                        Nuvarande värde: {Math.round(inv.currentValue)} chokladpengar
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          inv.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        Avkastning: {inv.totalReturn >= 0 ? '+' : ''}
                        {Math.round(inv.totalReturn)} (
                        {((inv.totalReturn / inv.amount) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleWithdraw(inv.id)}
                    variant="secondary"
                    size="small"
                    className="w-full"
                  >
                    Ta ut
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

