'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'
import { SettingsIcon, ChocolateCoinIcon } from '@/components/icons'

export default function FamilySettingsPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const family = useStore((state) => state.family)
  const tasks = useStore((state) => state.tasks)
  const rewards = useStore((state) => state.rewards)
  const deleteTask = useStore((state) => state.deleteTask)
  const deleteReward = useStore((state) => state.deleteReward)
  const deleteChild = useStore((state) => state.deleteChild)
  const parents = useStore((state) =>
    state.familyMembers.filter((u) => u.role === 'parent')
  )
  const children = useStore((state) =>
    state.familyMembers.filter((u) => u.role === 'child')
  )
  const [inviteLink, setInviteLink] = useState('')

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'parent') {
      router.push('/login')
    }
  }, [currentUser, router])

  useEffect(() => {
    // Always use production URL for invite links to avoid preview deployment issues
    if (family) {
      const productionUrl = 'https://chockladpengar.vercel.app';
      setInviteLink(`${productionUrl}/parent/join?familyId=${family.id}`)
    }
  }, [family])

  if (!currentUser || !family) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center animate-pulse">
            <ChocolateCoinIcon size={48} color="white" />
          </div>
          <p className="text-chocolate-milk">Laddar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4">
            <Button onClick={() => router.back()} variant="ghost" type="button">
              ← Tillbaka
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-chocolate-medium to-chocolate-milk flex items-center justify-center shadow-lg">
              <SettingsIcon size={48} color="white" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Familjeinställningar
            </h1>
            <p className="text-secondary">{family.name}</p>
          </div>
        </div>

        {/* Parents */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Föräldrar</h2>
          </div>

          {/* Invite Link Card */}
          <div className="card bg-gradient-to-br from-accent/10 to-accent/5 mb-4">
            <h3 className="font-bold text-primary mb-2">Bjud in annan förälder</h3>
            <p className="text-sm text-secondary mb-3">
              Dela denna länk via mail, SMS eller WhatsApp:
            </p>
            <div className="bg-white p-3 rounded-xl mb-3 break-all text-sm font-mono border border-accent/20">
              {inviteLink || 'Laddar länk...'}
            </div>
            <button
              onClick={() => {
                if (inviteLink) {
                  navigator.clipboard.writeText(inviteLink);
                  alert('Länken kopierad! Dela den med den andra föräldern.');
                }
              }}
              className="w-full btn-primary text-sm"
              disabled={!inviteLink}
            >
              Kopiera länk
            </button>
            <p className="text-xs text-secondary mt-2 text-center">
              Den andra föräldern klickar på länken och skapar sitt konto
            </p>
          </div>

          <div className="space-y-3">
            {parents.map((parent) => (
              <div key={parent.id} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={parent.name} size="medium" color="bg-primary" />
                  <div>
                    <p className="font-bold text-primary">{parent.name}</p>
                    <p className="text-sm text-secondary">Förälder</p>
                  </div>
                </div>
                {parent.id === currentUser.id && (
                  <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
                    Du
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Children */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Barn</h2>
            <button
              onClick={() => router.push(`/add-child?familyId=${family.id}`)}
              className="text-accent hover:text-accent-dark font-bold text-2xl"
            >
              + Lägg till
            </button>
          </div>

          <div className="space-y-3">
            {children.length === 0 ? (
              <div className="card text-center">
                <p className="text-secondary">Inga barn ännu</p>
              </div>
            ) : (
              children.map((child) => (
                <div key={child.id} className="card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={child.name} size="medium" />
                    <div>
                      <p className="font-bold text-primary">{child.name}</p>
                      <p className="text-sm text-secondary">Barn</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Är du säker på att du vill ta bort ${child.name}? Detta tar bort ALLA barnets data (uppgifter, investeringar, transaktioner etc).`)) {
                        deleteChild(child.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 text-2xl p-2 font-bold leading-none"
                    title="Ta bort barn"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Manage Tasks */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Hantera uppgifter</h2>
            <button
              onClick={() => router.push('/parent/create-task')}
              className="text-accent hover:text-accent-dark font-bold text-2xl"
            >
              + Skapa
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="card text-center">
              <p className="text-secondary">Inga uppgifter ännu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => {
                const assignedChild = children.find(c => c.id === task.assignedTo);
                return (
                  <div key={task.id} className="card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-primary mb-1">{task.title}</h3>
                        <p className="text-sm text-secondary mb-2">{task.description}</p>
                        <div className="flex items-center gap-3 text-xs text-secondary">
                          <span>Tilldelad: {assignedChild?.name || 'Okänd'}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-nougat-gold font-bold">
                            <ChocolateCoinIcon size={14} color="#D4AF37" />
                            <span>{task.reward}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Vill du ta bort uppgiften "${task.title}"?`)) {
                            deleteTask(task.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-2xl p-2 font-bold leading-none"
                        title="Ta bort uppgift"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Manage Rewards */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Hantera belöningar</h2>
            <button
              onClick={() => router.push('/parent/create-reward')}
              className="text-accent hover:text-accent-dark font-bold text-2xl"
            >
              + Skapa
            </button>
          </div>

          {rewards.length === 0 ? (
            <div className="card text-center">
              <p className="text-secondary">Inga belöningar ännu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className="card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-3xl">{reward.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-primary mb-1">{reward.title}</h3>
                        <p className="text-sm text-secondary mb-2">{reward.description}</p>
                        <div className="flex items-center gap-1 text-nougat-gold font-bold text-xs">
                          <ChocolateCoinIcon size={14} color="#D4AF37" />
                          <span>{reward.cost}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Vill du ta bort belöningen "${reward.title}"?`)) {
                          deleteReward(reward.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-2xl p-2 font-bold leading-none"
                      title="Ta bort belöning"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Economic Settings Link */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/parent/settings/economy')}
            className="card-interactive w-full p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center">
                  <ChocolateCoinIcon size={24} color="white" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">Ekonomiska inställningar</h3>
                  <p className="text-sm text-secondary">
                    {family.settings ? 
                      `1 chokladpeng = ${family.settings.chokladpengValue} kr` : 
                      'Sätt priser och värden'}
                  </p>
                </div>
              </div>
              <span className="text-accent text-2xl">→</span>
            </div>
          </button>
        </div>

        {/* Family Info */}
        <div className="card bg-background-dark">
          <h3 className="font-bold text-primary mb-3">Familjeinformation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">Familjenamn:</span>
              <span className="font-semibold text-primary">{family.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Antal föräldrar:</span>
              <span className="font-semibold text-primary">{parents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Antal barn:</span>
              <span className="font-semibold text-primary">{children.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Skapad:</span>
              <span className="font-semibold text-primary">
                {new Date(family.createdAt).toLocaleDateString('sv-SE')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

