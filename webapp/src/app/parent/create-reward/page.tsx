'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRewards } from '@/hooks/useRewards';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';

const ICON_OPTIONS = ['🎁', '🎮', '📱', '🍕', '🍦', '🎬', '🎵', '⚽', '🎨', '📚', '🧸', '🎪'];

export default function CreateRewardPage() {
  const router = useRouter();
  const { createReward, isLoading, error } = useRewards();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState<number>(50);
  const [icon, setIcon] = useState('🎁');
  
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Tillbaka
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Skapa belöning</h1>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Belöningens namn
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="t.ex. Extra TV-tid"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Beskrivning (valfritt)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskriv belöningen..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                Kostnad (chokladpengar)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-2xl">🍫</span>
                <input
                  type="number"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Välj ikon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {ICON_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`p-3 rounded-xl border-2 text-3xl transition-all ${
                      icon === emoji
                        ? 'border-amber-500 bg-amber-50 scale-110'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-4">
              <p className="text-xs font-medium text-purple-800 mb-2">Förhandsvisning</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{title || 'Belöningens namn'}</h3>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                    <span>🍫</span>
                    <span>{cost}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Skapa belöning
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
