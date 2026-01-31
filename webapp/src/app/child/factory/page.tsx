'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { FactoryIcon, ChocolateCoinIcon } from '@/components/icons';
import { FACTORY_ITEMS } from '@/constants/factory';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function FactoryPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #A67C52 0%, #8B5A3C 50%, #6B4423 100%)'
      }}>
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 font-medium bg-white/90 hover:bg-white px-4 py-2 rounded-2xl shadow-md transition-all"
            style={{ color: '#8B5A3C' }}
          >
            ← Tillbaka
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
              <FactoryIcon size={36} />
            </div>
            <h1 className="text-3xl font-bold text-white">Chokladfabrik</h1>
          </div>
          
          {/* Saldo */}
          <div className="bg-white rounded-3xl p-4 shadow-lg">
            <p className="text-xs font-medium mb-1" style={{ color: '#8B5A3C' }}>Ditt saldo</p>
            <div className="flex items-center gap-2">
              <ChocolateCoinIcon size={32} />
              <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>{child.balance}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info */}
        <div className="bg-white rounded-3xl shadow-md p-4 border-l-4" style={{ borderColor: '#FFD700' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
              <FactoryIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#8B5A3C' }}>Vad är fabriken?</h3>
              <p className="text-sm" style={{ color: '#A67C52' }}>
                Köp maskiner som producerar chokladpengar automatiskt varje vecka! Ju dyrare maskin, desto mer tjänar du. Det kallas passiv inkomst!
              </p>
            </div>
          </div>
        </div>
        
        {/* Coming Soon */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center border-2" style={{ borderColor: '#FFE55C' }}>
          <div className="mb-4 mx-auto w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A67C52 0%, #8B5A3C 100%)' }}>
            <FactoryIcon size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#8B5A3C' }}>Kommer snart!</h2>
          <p className="mb-6" style={{ color: '#A67C52' }}>
            Fabriksfunktionen är under utveckling. Snart kan du börja tjäna passiv inkomst!
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="font-bold text-left mb-3" style={{ color: '#8B5A3C' }}>Kommande maskiner:</h3>
            {FACTORY_ITEMS.map((item) => {
              const canAfford = child.balance >= item.cost;
              
              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-5 shadow-md border-2 transition-all"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: canAfford ? '#4CAF50' : '#F5E6D3',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ 
                      background: canAfford 
                        ? 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' 
                        : 'linear-gradient(135deg, #F5E6D3 0%, #E0D4C0 100%)'
                    }}>
                      <FactoryIcon size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1" style={{ color: '#8B5A3C' }}>{item.name}</h3>
                      <p className="text-sm mb-3" style={{ color: '#A67C52' }}>{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 font-bold" style={{ color: '#FFD700' }}>
                            <ChocolateCoinIcon size={20} />
                            <span>{item.cost}</span>
                          </div>
                          <span className="text-xs" style={{ color: '#A67C52' }}>kostnad</span>
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: canAfford ? '#C8E6C9' : '#F5E6D3',
                            color: canAfford ? '#2E7D32' : '#8B5A3C',
                          }}
                        >
                          {canAfford ? 'Har råd' : 'Spara mer'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Tips */}
        <div className="bg-white rounded-3xl shadow-md p-5 border-l-4" style={{ borderColor: '#FFE55C' }}>
          <h3 className="font-bold mb-2" style={{ color: '#8B5A3C' }}>Choki-tips!</h3>
          <p className="text-sm" style={{ color: '#A67C52' }}>
            {child.balance < 50 
              ? 'Spara ihop 50 chokladpengar för att köpa din första maskin!'
              : child.balance < 100
              ? 'Du har nästan råd med en Medelstor Fabrik som producerar mer!'
              : 'Bra jobbat! Du kan köpa en maskin som tjänar pengar åt dig varje vecka.'}
          </p>
        </div>
      </div>
    </div>
  );
}
