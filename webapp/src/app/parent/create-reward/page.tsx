'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useRewards } from '@/hooks/useRewards';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ChocolateCoinIcon } from '@/components/icons';

const ICON_OPTIONS = ['🎁', '🎮', '📱', '🍕', '🍦', '🎬', '🎵', '⚽', '🎨', '📚', '🧸', '🎪'];

export default function CreateRewardPage() {
  const router = useRouter();
  const { family } = useStore();
  const { createReward, isLoading, error } = useRewards();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState<number>(50);
  const [icon, setIcon] = useState('🎁');
  
  const chokladpengValue = family?.settings?.chokladpengValue || 1;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createReward(title, description, cost, icon);
      router.push('/parent');
    } catch (err) {
      console.error('Failed to create reward:', err);
    }
  };
  
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 font-medium"
            style={{ color: '#A67C52' }}
          >
            ← Tillbaka
          </button>
          <h1 className="text-3xl font-extrabold" style={{ color: '#8B5A3C' }}>Lägg till i butiken</h1>
          <p className="mt-1" style={{ color: '#A67C52' }}>Skapa en ny belöning som barn kan köpa</p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Belöningens namn
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Extra TV-tid"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Beskrivning (valfritt)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv belöningen..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all resize-none"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
            </div>
            
            <div>
              <label htmlFor="cost" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Pris (chokladpengar)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3">
                  <ChocolateCoinIcon size={24} />
                </div>
                <input
                  type="number"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all pl-14"
                  style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
                />
              </div>
              <p className="text-xs font-medium mt-1" style={{ color: '#FFD700' }}>
                ≈ {(cost * chokladpengValue).toFixed(2)} kr
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
                Välj ikon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {ICON_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className="p-3 rounded-2xl border-2 text-3xl transition-all"
                    style={{
                      borderColor: icon === emoji ? '#FFD700' : 'rgba(139, 90, 60, 0.2)',
                      backgroundColor: icon === emoji ? '#FFF8F0' : '#FFFFFF',
                      transform: icon === emoji ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Preview */}
            <div className="rounded-2xl border-2 p-4" style={{ background: 'linear-gradient(to bottom right, #FFFBF0, #FFF8F0)', borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#A67C52' }}>Förhandsvisning</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{icon}</div>
                <div className="flex-1">
                  <h3 className="font-extrabold" style={{ color: '#8B5A3C' }}>{title || 'Belöningens namn'}</h3>
                  <div className="flex items-center gap-2 font-extrabold text-sm" style={{ color: '#FFD700' }}>
                    <ChocolateCoinIcon size={16} />
                    <span>{cost}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Lägg till belöning
              </Button>
              
              <Button onClick={() => router.back()} variant="ghost" size="md" fullWidth disabled={isLoading}>
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
