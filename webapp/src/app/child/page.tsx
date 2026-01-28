'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { GiftIcon, BarChartIcon, FactoryIcon, CheckIcon, ChocolateCoinIcon } from '@/components/icons';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function ChildHomePage() {
  const router = useRouter();
  const { currentUser, investments, ownedFactories, logout } = useStore();
  const { pendingTasks, submitForReview } = useTasks();
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  // Beräkna total förmögenhet
  const totalAssets = useMemo(() => {
    let total = child.balance;
    
    // Lägg till värde av investeringar (placeholder - ska uppdateras med faktiska priser)
    investments.forEach(inv => {
      total += inv.shares * inv.purchasePrice; // TODO: använd currentPrice
    });
    
    // TODO: Lägg till värde av fabriker
    
    return total;
  }, [child.balance, investments]);
  
  const investmentValue = useMemo(() => {
    let value = 0;
    investments.forEach(inv => {
      value += inv.shares * inv.purchasePrice;
    });
    return value;
  }, [investments]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-chocolate-medium to-caramel text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Hej {currentUser.name}!</h1>
              <p className="text-white/80">Din Chokladekonomi</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Logga ut
            </button>
          </div>
          
          {/* Total förmögenhet */}
          <div className="bg-white/10 rounded-3xl p-6 backdrop-blur mb-4">
            <p className="text-sm text-white/80 mb-2">Total förmögenhet</p>
            <div className="flex items-center gap-3 mb-4">
              <ChocolateCoinIcon size={40} color="#FFF" />
              <span className="text-4xl font-bold">{Math.floor(totalAssets)}</span>
            </div>
            
            {/* Uppdelning */}
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/70 text-xs mb-1">I plånbok</p>
                <div className="flex items-center gap-1">
                  <ChocolateCoinIcon size={16} color="#FFF" />
                  <span className="font-bold">{child.balance}</span>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/70 text-xs mb-1">I fonder</p>
                <div className="flex items-center gap-1">
                  <ChocolateCoinIcon size={16} color="#FFF" />
                  <span className="font-bold">{Math.floor(investmentValue)}</span>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/70 text-xs mb-1">Fabriker</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{ownedFactories.length}</span>
                  <span className="text-xs">st</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-chocolate-dark mb-3">Vad vill du göra?</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/child/rewards')}
              className="bg-gradient-to-br from-nougat-gold to-caramel text-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center">
                <GiftIcon size={36} color="white" />
              </div>
              <h3 className="font-bold text-lg">Butiken</h3>
              <p className="text-sm text-white/80 mt-1">Handla belöningar</p>
            </button>
            
            <button
              onClick={() => router.push('/child/investments')}
              className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center">
                <BarChartIcon size={36} color="white" />
              </div>
              <h3 className="font-bold text-lg">Fonder</h3>
              <p className="text-sm text-white/80 mt-1">
                {investments.length > 0 ? `${investments.length} aktiva` : 'Investera nu'}
              </p>
            </button>
            
            <button
              onClick={() => router.push('/child/factory')}
              className="bg-gradient-to-br from-chocolate-medium to-chocolate-milk text-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center">
                <FactoryIcon size={36} color="white" />
              </div>
              <h3 className="font-bold text-lg">Fabrik</h3>
              <p className="text-sm text-white/80 mt-1">
                {ownedFactories.length > 0 ? `${ownedFactories.length} fabriker` : 'Passiv inkomst'}
              </p>
            </button>
            
            <button
              onClick={() => alert('Kommande funktion!')}
              className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center">
                <BarChartIcon size={36} color="white" />
              </div>
              <h3 className="font-bold text-lg">Statistik</h3>
              <p className="text-sm text-white/80 mt-1">Se din framgång</p>
            </button>
          </div>
        </div>
        
        {/* Pending Tasks */}
        <div>
          <h2 className="text-xl font-bold text-chocolate-dark mb-4">
            Mina uppgifter ({pendingTasks.length})
          </h2>
          
          {pendingTasks.length === 0 ? (
            <div className="card-glass text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center">
                <CheckIcon size={48} color="white" />
              </div>
              <p className="text-chocolate-medium font-medium">Inga uppgifter just nu!</p>
              <p className="text-sm text-chocolate-milk mt-1">Fråga dina föräldrar om fler uppgifter</p>
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
        
        {/* Tips */}
        <div className="bg-gradient-to-r from-nougat-light to-cream rounded-3xl border-2 border-nougat-gold/30 p-6">
          <h3 className="font-bold text-chocolate-dark mb-2">Spara smartare!</h3>
          <p className="text-chocolate-medium text-sm">
            {child.balance < 50 
              ? 'Gör uppgifter och spara ihop chokladpengar. Försök nå 50 chokladpengar!'
              : child.balance < 100
              ? 'Bra jobbat! Du kan snart investera i din första fond eller köpa en liten fabrik.'
              : 'Du har en fin summa! Överväg att investera för att växa dina pengar ännu mer.'}
          </p>
        </div>
      </div>
    </div>
  );
}
