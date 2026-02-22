'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { GiftIcon, BarChartIcon, FactoryIcon, CheckIcon, ChocolateCoinIcon } from '@/components/icons';
import { ChokiMascot } from '@/components/icons/ChokiMascot';
import { playSuccessSound } from '@/utils/sounds';
import { FUND_BASE_PRICES } from '@/utils/fundPrices';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';
// Updated layout: Choki and balance on same row

export default function ChildHomePage() {
  const router = useRouter();
  const { currentUser, investments, ownedFactories, logout } = useStore();
  const { pendingTasks, submitForReview } = useTasks();
  const previousBalanceRef = useRef<number | null>(null);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Beräkna total förmögenhet
  const totalAssets = useMemo(() => {
    if (!currentUser || currentUser.role !== 'child') return 0;
    const child = currentUser as Child;
    let total = child.balance;
    
    // Lägg till värde av investeringar med aktuella priser
    investments.forEach(inv => {
      const fundPriceData = FUND_BASE_PRICES[inv.fundId];
      if (fundPriceData) {
        total += inv.shares * fundPriceData.currentPrice;
      } else {
        // Fallback till inköpspris om aktuellt pris inte finns
        total += inv.shares * inv.purchasePrice;
      }
    });
    
    // TODO: Lägg till värde av fabriker
    
    return total;
  }, [currentUser, investments]);
  
  const investmentValue = useMemo(() => {
    // Använd fundPrices för att få aktuella priser
    let value = 0;
    investments.forEach(inv => {
      // Hitta motsvarande fond för att få aktuellt pris
      const fundPriceData = FUND_BASE_PRICES[inv.fundId];
      if (fundPriceData) {
        value += inv.shares * fundPriceData.currentPrice;
      } else {
        // Fallback till inköpspris om aktuellt pris inte finns
        value += inv.shares * inv.purchasePrice;
      }
    });
    return value;
  }, [investments]);
  
  // Beräkna värde av fabriker (kommer att implementeras när factory-funktionen är klar)
  const factoryValue = useMemo(() => {
    // TODO: Implementera när factory-funktionen är färdig
    return 0;
  }, []);
  
  // Sätt initial displayBalance
  useEffect(() => {
    if (previousBalanceRef.current === null) {
      setDisplayBalance(totalAssets);
      previousBalanceRef.current = totalAssets;
    }
  }, [totalAssets]);
  
  // Kontrollera om balansen har ökat och spela ljud + animera
  useEffect(() => {
    const currentBalance = totalAssets;
    
    // Om vi har ett tidigare värde och balansen har ökat
    if (previousBalanceRef.current !== null && currentBalance > previousBalanceRef.current) {
      playSuccessSound();
      setIsAnimating(true);
      
      // Animera siffror från gammalt till nytt värde
      const startBalance = previousBalanceRef.current;
      const endBalance = currentBalance;
      const duration = 1000; // 1 sekund
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function för smidig animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newValue = Math.floor(startBalance + (endBalance - startBalance) * easeOut);
        
        setDisplayBalance(newValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      
      animate();
    }
    
    previousBalanceRef.current = currentBalance;
  }, [totalAssets]);
  
  // Early return AFTER all hooks
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  // Type guard - nu är currentUser garanterat Child
  const child = currentUser as Child;
  
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header med logga ut överst */}
      <div className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #FFB84D 0%, #FFA940 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div className="max-w-4xl mx-auto p-4 sm:p-6 relative">
          {/* Logga ut knapp överst */}
          <div className="flex justify-end mb-4">
            <button
              onClick={logout}
              className="bg-white/90 hover:bg-white px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-md"
              style={{ color: '#8B5A3C' }}
            >
              Logga ut
            </button>
          </div>

          {/* Huvudheader med Choki och balans - allt på samma rad, mycket större */}
          <div className="bg-white/95 rounded-3xl px-6 sm:px-8 py-6 sm:py-8 shadow-xl mb-6" style={{ border: '4px solid #FFD700' }}>
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              {/* Vänster: Choki maskot och namn */}
              <div className="flex items-center gap-3 sm:gap-4">
                <ChokiMascot 
                  size={100} 
                  balance={child.balance}
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: '#8B5A3C' }}>
                    Hej {currentUser.name}!
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl font-medium" style={{ color: '#A67C52' }}>
                    Du har samlat ihop
                  </p>
                </div>
              </div>

              {/* Höger: Stor balans display */}
              <div className="text-right">
                <div className="flex items-center gap-2 sm:gap-3 justify-end">
                  <span 
                    className={`text-4xl sm:text-5xl md:text-6xl font-extrabold transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`} 
                    style={{ color: '#FF8C00' }}
                  >
                    {Math.floor(displayBalance)}
                  </span>
                  <ChocolateCoinIcon size={48} className={isAnimating ? 'animate-bounce' : ''} />
                </div>
                <p className="text-sm sm:text-base font-medium mt-1" style={{ color: '#A67C52' }}>chokladpengar</p>
              </div>
            </div>
          </div>

          {/* Uppdelning av tillgångar - kompakt och responsiv */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 text-center shadow-md">
              <ChocolateCoinIcon size={24} className="mx-auto mb-1" />
              <p className="text-xs font-medium mb-1" style={{ color: '#8B5A3C' }}>Plånbok</p>
              <p className="text-lg sm:text-xl font-extrabold" style={{ color: '#FFD700' }}>{child.balance}</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 text-center shadow-md">
              <BarChartIcon size={24} className="mx-auto mb-1" />
              <p className="text-xs font-medium mb-1" style={{ color: '#8B5A3C' }}>Fonder</p>
              <p className="text-lg sm:text-xl font-extrabold" style={{ color: '#64B5F6' }}>{Math.floor(investmentValue)}</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 text-center shadow-md">
              <FactoryIcon size={24} className="mx-auto mb-1" />
              <p className="text-xs font-medium mb-1" style={{ color: '#8B5A3C' }}>Fabriker</p>
              <p className="text-lg sm:text-xl font-extrabold" style={{ color: '#8B5A3C' }}>{Math.floor(factoryValue)}</p>
            </div>
          </div>
        </div>

        {/* Dekorativa stjärnor och mynt */}
        <div className="absolute top-5 right-20 text-3xl opacity-60 animate-pulse">✨</div>
        <div className="absolute top-12 right-40 text-2xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute bottom-8 left-10 opacity-20">
          <ChocolateCoinIcon size={50} />
        </div>
        <div className="absolute top-20 left-20 text-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
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
              <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>Butiken</h3>
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
              <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>Fonder</h3>
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
              <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>Fabrik</h3>
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
              <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>Statistik</h3>
              <p className="text-sm mt-1" style={{ color: '#A67C52' }}>Se din framgång</p>
            </button>
          </div>
        </div>
        
        {/* Mina uppgifter */}
        <div>
          <h2 className="text-xl font-extrabold mb-4" style={{ color: '#8B5A3C' }}>
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
              <h3 className="font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Choki-tips!</h3>
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
