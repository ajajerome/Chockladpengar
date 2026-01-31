'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { SettingsIcon, ChocolateCoinIcon, ChildIcon, CheckIcon, GiftIcon } from '@/components/icons'
import type { Child } from '@/types'

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
  ) as Child[]
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center animate-pulse" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
            <ChocolateCoinIcon size={48} />
          </div>
          <p style={{ color: '#8B5A3C' }}>Laddar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #A67C52 0%, #8B5A3C 50%, #6B4423 100%)'
      }}>
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 bg-white/90 hover:bg-white px-4 py-2 rounded-2xl shadow-md transition-all font-medium"
            style={{ color: '#8B5A3C' }}
          >
            ← Tillbaka
          </button>

          <div className="text-center mb-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-lg text-white" style={{ background: 'linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%)' }}>
              <SettingsIcon size={48} />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Familjeinställningar
            </h1>
            <p className="text-white/90">{family.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Föräldrar */}
        <div>
          <h2 className="text-xl font-extrabold mb-4" style={{ color: '#8B5A3C' }}>Föräldrar</h2>

          {/* Invite Link Card */}
          <div className="bg-white rounded-3xl shadow-md p-5 mb-4 border-l-4" style={{ borderColor: '#FFD700' }}>
            <h3 className="font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Bjud in annan förälder</h3>
            <p className="text-sm mb-3" style={{ color: '#A67C52' }}>
              Dela denna länk via mail, SMS eller WhatsApp:
            </p>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-3 rounded-2xl mb-3 break-all text-sm font-mono border-2" style={{ borderColor: '#FFE55C' }}>
              {inviteLink || 'Laddar länk...'}
            </div>
            <button
              onClick={() => {
                if (inviteLink) {
                  navigator.clipboard.writeText(inviteLink);
                  alert('Länken kopierad! Dela den med den andra föräldern.');
                }
              }}
              className="w-full py-3 rounded-2xl text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}
              disabled={!inviteLink}
            >
              Kopiera länk
            </button>
            <p className="text-xs mt-2 text-center" style={{ color: '#A67C52' }}>
              Den andra föräldern klickar på länken och skapar sitt konto
            </p>
          </div>

          <div className="space-y-3">
            {parents.map((parent) => (
              <div key={parent.id} className="bg-white rounded-3xl shadow-md p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%)' }}>
                    {parent.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: '#8B5A3C' }}>{parent.name}</p>
                    <p className="text-sm" style={{ color: '#A67C52' }}>Förälder</p>
                  </div>
                </div>
                {parent.id === currentUser.id && (
                  <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#FFE55C', color: '#8B5A3C' }}>
                    Du
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Barn */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold" style={{ color: '#8B5A3C' }}>Barn</h2>
            <button
              onClick={() => router.push(`/add-child?familyId=${family.id}`)}
              className="px-4 py-2 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)', color: '#8B5A3C' }}
            >
              + Lägg till
            </button>
          </div>

          <div className="space-y-3">
            {children.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md text-center p-8">
                <ChildIcon size={48} />
                <p className="mt-3" style={{ color: '#A67C52' }}>Inga barn ännu</p>
              </div>
            ) : (
              children.map((child) => (
                <div key={child.id} className="bg-white rounded-3xl shadow-md p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #FFB4A2 0%, #FF9999 100%)' }}>
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: '#8B5A3C' }}>{child.name}</p>
                      <div className="flex items-center gap-1 text-sm font-extrabold" style={{ color: '#FFD700' }}>
                        <ChocolateCoinIcon size={16} />
                        <span>{child.balance || 0}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Är du säker på att du vill ta bort ${child.name}? Detta tar bort ALLA barnets data (uppgifter, investeringar, transaktioner etc).`)) {
                        deleteChild(child.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 text-3xl font-extrabold leading-none w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition-all"
                    title="Ta bort barn"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hantera uppgifter */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold" style={{ color: '#8B5A3C' }}>Hantera uppgifter</h2>
            <button
              onClick={() => router.push('/parent/create-task')}
              className="px-4 py-2 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)', color: '#FFFFFF' }}
            >
              + Skapa
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md text-center p-8">
              <CheckIcon size={48} />
              <p className="mt-3" style={{ color: '#A67C52' }}>Inga uppgifter ännu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => {
                const assignedChild = children.find(c => c.id === task.assignedTo);
                return (
                  <div key={task.id} className="bg-white rounded-3xl shadow-md p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-extrabold mb-1" style={{ color: '#8B5A3C' }}>{task.title}</h3>
                        <p className="text-sm mb-2" style={{ color: '#A67C52' }}>{task.description}</p>
                        <div className="flex items-center gap-3 text-xs" style={{ color: '#A67C52' }}>
                          <span>Tilldelad: {assignedChild?.name || 'Okänd'}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1 font-extrabold" style={{ color: '#FFD700' }}>
                            <ChocolateCoinIcon size={14} />
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
                        className="text-red-500 hover:text-red-700 text-3xl font-extrabold leading-none w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition-all"
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

        {/* Hantera belöningar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold" style={{ color: '#8B5A3C' }}>Hantera belöningar</h2>
            <button
              onClick={() => router.push('/parent/create-reward')}
              className="px-4 py-2 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)', color: '#8B5A3C' }}
            >
              + Skapa
            </button>
          </div>

          {rewards.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md text-center p-8">
              <GiftIcon size={48} />
              <p className="mt-3" style={{ color: '#A67C52' }}>Inga belöningar ännu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-3xl shadow-md p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-3xl">{reward.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-extrabold mb-1" style={{ color: '#8B5A3C' }}>{reward.title}</h3>
                        <p className="text-sm mb-2" style={{ color: '#A67C52' }}>{reward.description}</p>
                        <div className="flex items-center gap-1 font-extrabold text-xs" style={{ color: '#FFD700' }}>
                          <ChocolateCoinIcon size={14} />
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
                      className="text-red-500 hover:text-red-700 text-3xl font-extrabold leading-none w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition-all"
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

        {/* Ekonomiska inställningar */}
        <button
          onClick={() => router.push('/parent/settings/economy')}
          className="w-full bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-5 text-left border-2"
          style={{ borderColor: '#FFD700' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
                <ChocolateCoinIcon size={24} />
              </div>
              <div>
                <h3 className="font-extrabold" style={{ color: '#8B5A3C' }}>Ekonomiska inställningar</h3>
                <p className="text-sm" style={{ color: '#A67C52' }}>
                  {family.settings ? 
                    `1 chokladpeng = ${family.settings.chokladpengValue} kr` : 
                    'Sätt priser och värden'}
                </p>
              </div>
            </div>
            <span className="text-2xl" style={{ color: '#FFD700' }}>→</span>
          </div>
        </button>

        {/* Familjeinformation */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl shadow-md p-5 border-2" style={{ borderColor: '#FFE55C' }}>
          <h3 className="font-extrabold mb-3" style={{ color: '#8B5A3C' }}>Familjeinformation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: '#A67C52' }}>Familjenamn:</span>
              <span className="font-semibold" style={{ color: '#8B5A3C' }}>{family.name}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#A67C52' }}>Antal föräldrar:</span>
              <span className="font-semibold" style={{ color: '#8B5A3C' }}>{parents.length}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#A67C52' }}>Antal barn:</span>
              <span className="font-semibold" style={{ color: '#8B5A3C' }}>{children.length}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#A67C52' }}>Skapad:</span>
              <span className="font-semibold" style={{ color: '#8B5A3C' }}>
                {new Date(family.createdAt).toLocaleDateString('sv-SE')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
