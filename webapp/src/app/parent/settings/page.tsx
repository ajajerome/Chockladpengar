'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'

export default function FamilySettingsPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const family = useStore((state) => state.family)
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
    // Set invite link on client side only
    if (family) {
      setInviteLink(`${window.location.origin}/parent/join?familyId=${family.id}`)
    }
  }, [family])

  if (!currentUser || !family) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-secondary">Laddar...</p>
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
            <div className="text-6xl mb-4">⚙️</div>
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
                  alert('Länken kopierad! Dela den med den andra föräldern. 📋');
                }
              }}
              className="w-full btn-primary text-sm"
              disabled={!inviteLink}
            >
              📋 Kopiera länk
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
            {children.map((child) => (
              <div key={child.id} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={child.name} size="medium" />
                  <div>
                    <p className="font-bold text-primary">{child.name}</p>
                    <p className="text-sm text-secondary">Barn</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

