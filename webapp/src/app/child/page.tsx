'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { GiftIcon, BarChartIcon, FactoryIcon, CheckIcon, ChocolateCoinIcon } from '@/components/icons';
import { ChokiMascot } from '@/components/icons/ChokiMascot';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function ChildHomePage() {
  const router = useRouter();
  const { currentUser, investments, ownedFactories, logout } = useStore();
  const { pendingTasks, submitForReview } = useTasks();
  
  // Beräkna total förmögenhet
  const totalAssets = useMemo(() => {
    if (!currentUser || currentUser.role !== 'child') return 0;
    const child = currentUser as Child;
    let total = child.balance;
    
    // Lägg till värde av investeringar (placeholder - ska uppdateras med faktiska priser)
    investments.forEach(inv => {
      total += inv.shares * inv.purchasePrice; // TODO: använd currentPrice
    });
    
    // TODO: Lägg till värde av fabriker
    
    return total;
  }, [currentUser, investments]);
  
  const investmentValue = useMemo(() => {
    let value = 0;
    investments.forEach(inv => {
      value += inv.shares * inv.purchasePrice;
    });
    return value;
  }, [investments]);
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  // Type guard - nu är currentUser garanterat Child
  const child = currentUser as Child;
  
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header med Choki */}
      <div className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #FFE55C 0%, #FFBD7F 50%, #FFB4A2 100%)'
      }}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <ChokiMascot size={80} withCoins={true} withWave={true} className="animate-bounce-soft" />
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#8B5A3C' }}>Hej {currentUser.name}!</h1>
                <p style={{ color: '#6B4423' }}>Välkommen tillbaka! 🍫</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-white/90 hover:bg-white px-4 py-2 rounded-2xl text-sm font-medium transition-all shadow-md"
              style={{ color: '#8B5A3C' }}
            >
              Logga ut
            </button>
          </div>
          
          {/* Saldo-kort */}
          <div className="bg-white rounded-3xl p-6 shadow-lg" style={{ borderLeft: '6px solid #FFD700' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>Du har samlat ihop</p>
                <div className="flex items-center gap-3">
                  <ChocolateCoinIcon size={48} />
                  <span className="text-5xl font-bold" style={{ color: '#8B5A3C' }}>{child.balance}</span>
                  <span className="text-lg" style={{ color: '#A67C52' }}>chokladpengar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dekorativa element */}
        <div className="absolute top-10 right-10 opacity-20">
          <ChocolateCoinIcon size={60} />
        </div>
        <div className="absolute bottom-10 left-10 opacity-15">
          <ChocolateCoinIcon size={40} />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions - Choki-stil */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/child/rewards')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all text-center p-6 border-2"
              style={{ borderColor: '#FFB4A2' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)' }}>
                <GiftIcon size={36} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>Butiken</h3>
              <p className="text-sm mt-1" style={{ color: '#A67C52' }}>Handla belöningar</p>
            </button>
            
            <button
              onClick={() => router.push('/child/investments')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all text-center p-6 border-2"
              style={{ borderColor: '#B4E7CE' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}>
                <BarChartIcon size={36} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>Fonder</h3>
              <p className="text-sm mt-1" style={{ color: '#A67C52' }}>
                {investments.length > 0 ? `${investments.length} aktiva` : 'Investera nu'}
              </p>
            </button>
            
            <button
              onClick={() => router.push('/child/factory')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all text-center p-6 border-2"
              style={{ borderColor: '#A67C52' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%)' }}>
                <FactoryIcon size={36} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>Fabrik</h3>
              <p className="text-sm mt-1" style={{ color: '#A67C52' }}>
                {ownedFactories.length > 0 ? `${ownedFactories.length} fabriker` : 'Passiv inkomst'}
              </p>
            </button>
            
            <button
              onClick={() => alert('Kommande funktion!')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all text-center p-6 border-2"
              style={{ borderColor: '#A8D8FF' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A8D8FF 0%, #64B5F6 100%)' }}>
                <BarChartIcon size={36} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>Statistik</h3>
              <p className="text-sm mt-1" style={{ color: '#A67C52' }}>Se din framgång</p>
            </button>
          </div>
        </div>
        
        {/* Mina uppgifter */}
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#8B5A3C' }}>
            Mina uppgifter
          </h2>
          
          {pendingTasks.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md text-center p-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}>
                <CheckIcon size={48} />
              </div>
              <p className="font-medium" style={{ color: '#8B5A3C' }}>Inga uppgifter just nu!</p>
              <p className="text-sm mt-1" style={{ color: '#A67C52' }}>Fråga dina föräldrar om fler uppgifter</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  userRole="child"
                  onSubmit={() => {
                    if (confirm(`Är du klar med "${task.title}"?`)) {
                      submitForReview(task.id);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Tips-kort */}
        <div className="bg-white rounded-3xl shadow-md p-6 border-l-4" style={{ borderColor: '#FFE55C' }}>
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold mb-2" style={{ color: '#8B5A3C' }}>Choki-tips!</h3>
              <p className="text-sm" style={{ color: '#A67C52' }}>
                {child.balance < 50 
                  ? 'Gör uppgifter och spara ihop chokladpengar. Försök nå 50 chokladpengar!'
                  : child.balance < 100
                  ? 'Bra jobbat! Du kan snart investera i din första fond eller köpa en liten fabrik.'
                  : 'Du har en fin summa! Överväg att investera för att växa dina pengar ännu mer.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
