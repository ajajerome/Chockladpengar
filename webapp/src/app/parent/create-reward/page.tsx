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
          <h1 className="text-3xl font-bold" style={{ color: '#8B5A3C' }}>Lägg till i butiken</h1>
          <p className="mt-1" style={{ color: '#A67C52' }}>Skapa en ny belöning som barn kan köpa</p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-chocolate-dark mb-1">
                Belöningens namn
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Extra TV-tid"
                required
                className="input-chocolate"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-chocolate-dark mb-1">
                Beskrivning (valfritt)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv belöningen..."
                rows={3}
                className="input-chocolate resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-chocolate-dark mb-1">
                Pris (chokladpengar)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3">
                  <ChocolateCoinIcon size={24} color="#D4AF37" />
                </div>
                <input
                  type="number"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  min={1}
                  required
                  className="input-chocolate pl-14"
                />
              </div>
              <p className="text-xs text-nougat-gold font-medium mt-1">
                ≈ {(cost * chokladpengValue).toFixed(2)} kr
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-chocolate-dark mb-2">
                Välj ikon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {ICON_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`p-3 rounded-2xl border-2 text-3xl transition-all ${
                      icon === emoji
                        ? 'border-nougat-gold bg-nougat-light/50 scale-110'
                        : 'border-chocolate-light/30 hover:border-chocolate-light/50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Preview */}
            <div className="bg-gradient-to-br from-nougat-light/50 to-cream rounded-2xl border-2 border-nougat-gold/30 p-4">
              <p className="text-xs font-medium text-chocolate-medium mb-2">Förhandsvisning</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-chocolate-dark">{title || 'Belöningens namn'}</h3>
                  <div className="flex items-center gap-2 text-nougat-gold font-bold text-sm">
                    <ChocolateCoinIcon size={16} color="#D4AF37" />
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
