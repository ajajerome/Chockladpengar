'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { ChocolateCoinIcon, BarChartIcon } from '@/components/icons';
import type { Child, Fund } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

// Demo funds med simulerade priser
const AVAILABLE_FUNDS: Fund[] = [
  {
    id: 'fund_1',
    name: 'Mjölkchokladfonden',
    description: 'Låg risk, stabil tillväxt',
    riskLevel: 'low',
    currentPrice: 10,
    priceHistory: [],
    icon: '🥛',
    color: '#8B6F47',
  },
  {
    id: 'fund_2',
    name: 'Nougat Mix',
    description: 'Medel risk, bra balans',
    riskLevel: 'medium',
    currentPrice: 15,
    priceHistory: [],
    icon: '🍯',
    color: '#C68642',
  },
  {
    id: 'fund_3',
    name: 'Guldchokladgruvan',
    description: 'Hög risk, stor potential',
    riskLevel: 'high',
    currentPrice: 20,
    priceHistory: [],
    icon: '✨',
    color: '#D4AF37',
  },
];

export default function InvestmentsPage() {
  const router = useRouter();
  const { currentUser, investments, addInvestment, removeInvestment, updateUserBalance } = useStore();
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [amount, setAmount] = useState(1);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  // Beräkna totalt värde i fonder
  const totalInvestedValue = useMemo(() => {
    let total = 0;
    investments.forEach(inv => {
      const fund = AVAILABLE_FUNDS.find(f => f.id === inv.fundId);
      if (fund) {
        total += inv.shares * fund.currentPrice;
      }
    });
    return total;
  }, [investments]);
  
  // Hitta befintlig investering för vald fond
  const existingInvestment = selectedFund 
    ? investments.find(inv => inv.fundId === selectedFund.id)
    : null;
  
  const handleBuy = () => {
    if (!selectedFund || amount <= 0) return;
    
    const cost = selectedFund.currentPrice * amount;
    
    if (child.balance < cost) {
      alert('Du har inte tillräckligt med chokladpengar!');
      return;
    }
    
    // Dra av pengar från plånbok
    updateUserBalance(child.id, -cost);
    
    // Lägg till investering
    addInvestment({
      id: `inv_${Date.now()}`,
      childId: child.id,
      fundId: selectedFund.id,
      shares: amount,
      purchasePrice: selectedFund.currentPrice,
      purchaseDate: new Date().toISOString(),
    });
    
    alert(`Du köpte ${amount} andelar i ${selectedFund.name}!`);
    setSelectedFund(null);
    setAmount(1);
  };
  
  const handleSell = () => {
    if (!selectedFund || !existingInvestment || amount <= 0) return;
    
    if (amount > existingInvestment.shares) {
      alert('Du har inte så många andelar!');
      return;
    }
    
    const sellValue = selectedFund.currentPrice * amount;
    
    // Lägg tillbaka pengar till plånbok
    updateUserBalance(child.id, sellValue);
    
    // Ta bort/uppdatera investering
    if (amount === existingInvestment.shares) {
      removeInvestment(existingInvestment.id);
    } else {
      // Uppdatera antal andelar (behöver ny metod i store)
      // För nu: ta bort och lägg till ny
      removeInvestment(existingInvestment.id);
      addInvestment({
        ...existingInvestment,
        shares: existingInvestment.shares - amount,
      });
    }
    
    alert(`Du sålde ${amount} andelar i ${selectedFund.name} för ${Math.floor(sellValue)} chokladpengar!`);
    setSelectedFund(null);
    setAmount(1);
  };
  
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #A8D8FF 0%, #64B5F6 50%, #B4E7CE 100%)'
      }}>
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 font-medium bg-white/90 hover:bg-white px-4 py-2 rounded-2xl shadow-md transition-all"
            style={{ color: '#8B5A3C' }}
          >
            ← Tillbaka
          </button>
          
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#8B5A3C' }}>Fonder 📈</h1>
          <p className="text-sm mb-4" style={{ color: '#6B4423' }}>Investera dina chokladpengar</p>
          
          {/* Saldo-kort */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-3xl p-4 shadow-lg">
              <p className="text-xs font-medium mb-1" style={{ color: '#8B5A3C' }}>Plånbok</p>
              <div className="flex items-center gap-2">
                <ChocolateCoinIcon size={32} />
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>{child.balance}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-4 shadow-lg">
              <p className="text-xs font-medium mb-1" style={{ color: '#8B5A3C' }}>I fonder</p>
              <div className="flex items-center gap-2">
                <BarChartIcon size={32} />
                <span className="text-2xl font-bold" style={{ color: '#64B5F6' }}>{Math.floor(totalInvestedValue)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info */}
        <div className="bg-white rounded-3xl shadow-md p-4 border-l-4" style={{ borderColor: '#A8D8FF' }}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#8B5A3C' }}>Choki-tips!</h3>
              <p className="text-sm" style={{ color: '#A67C52' }}>
                Köp andelar i fonder! Priset kan gå upp eller ner. Sälj när priset är högt för att tjäna pengar!
              </p>
            </div>
          </div>
        </div>
        
        {/* Mina investeringar */}
        {investments.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#8B5A3C' }}>Mina investeringar</h2>
            <div className="space-y-3">
              {investments.map((inv) => {
                const fund = AVAILABLE_FUNDS.find(f => f.id === inv.fundId);
                if (!fund) return null;
                
                const currentValue = inv.shares * fund.currentPrice;
                const purchaseValue = inv.shares * inv.purchasePrice;
                const profit = currentValue - purchaseValue;
                const profitPercent = ((profit / purchaseValue) * 100).toFixed(1);
                
                return (
                  <div key={inv.id} className="bg-white rounded-3xl shadow-md p-5 border-2" style={{ borderColor: '#A8D8FF' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{fund.icon}</div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>{fund.name}</h3>
                          <p className="text-sm" style={{ color: '#A67C52' }}>{inv.shares} andelar</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedFund(fund);
                          setAction('sell');
                          setAmount(1);
                        }}
                        className="px-4 py-2 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                        style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)', color: '#8B5A3C' }}
                      >
                        Sälj
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#F5E6D3' }}>
                      <div>
                        <p className="text-xs" style={{ color: '#A67C52' }}>Nuvarande värde</p>
                        <p className="font-bold" style={{ color: '#8B5A3C' }}>{Math.floor(currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: '#A67C52' }}>Inköpsvärde</p>
                        <p className="font-bold" style={{ color: '#8B5A3C' }}>{Math.floor(purchaseValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: '#A67C52' }}>Vinst/Förlust</p>
                        <p className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {profit >= 0 ? '+' : ''}{Math.floor(profit)} ({profitPercent}%)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Tillgängliga fonder */}
        <div>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#8B5A3C' }}>Tillgängliga fonder</h2>
          <div className="grid grid-cols-1 gap-4">
            {AVAILABLE_FUNDS.map((fund) => {
              const riskColors = {
                low: { bg: '#B4E7CE', border: '#4CAF50' },
                medium: { bg: '#FFE55C', border: '#FFD700' },
                high: { bg: '#FFB4A2', border: '#FF6B6B' },
              };
              
              const riskLabels = {
                low: 'Låg risk 🛡️',
                medium: 'Medel risk ⚖️',
                high: 'Hög risk 🎲',
              };
              
              const colors = riskColors[fund.riskLevel];
              
              return (
                <div key={fund.id} className="bg-white rounded-3xl shadow-md p-5 border-2" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{fund.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>{fund.name}</h3>
                        <p className="text-sm" style={{ color: '#A67C52' }}>{fund.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: '#F5E6D3' }}>
                    <div>
                      <p className="text-xs mb-1" style={{ color: '#A67C52' }}>{riskLabels[fund.riskLevel]}</p>
                      <div className="flex items-center gap-2">
                        <ChocolateCoinIcon size={24} />
                        <span className="text-xl font-bold" style={{ color: '#FFD700' }}>{fund.currentPrice}</span>
                        <span className="text-sm" style={{ color: '#A67C52' }}>per andel</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFund(fund);
                        setAction('buy');
                        setAmount(1);
                      }}
                      className="px-6 py-2 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                      style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)', color: '#FFFFFF' }}
                    >
                      Köp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Modal för köp/sälj */}
      {selectedFund && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedFund(null)}>
          <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#8B5A3C' }}>
              {action === 'buy' ? 'Köp' : 'Sälj'} {selectedFund.name}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
                  Antal andelar
                </label>
                <input
                  type="number"
                  min="1"
                  max={action === 'sell' ? existingInvestment?.shares : Math.floor(child.balance / selectedFund.currentPrice)}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-2xl border-2 text-center text-2xl font-bold"
                  style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
                />
                {action === 'sell' && existingInvestment && (
                  <p className="text-xs mt-1" style={{ color: '#A67C52' }}>
                    Du har {existingInvestment.shares} andelar
                  </p>
                )}
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 border-2" style={{ borderColor: '#FFE55C' }}>
                <p className="text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>
                  {action === 'buy' ? 'Totalkostnad' : 'Du får'}
                </p>
                <div className="flex items-center gap-2">
                  <ChocolateCoinIcon size={32} />
                  <span className="text-3xl font-bold" style={{ color: '#FFD700' }}>
                    {Math.floor(selectedFund.currentPrice * amount)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedFund(null)}
                  className="flex-1 px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#F5E6D3', color: '#8B5A3C' }}
                >
                  Avbryt
                </button>
                <button
                  onClick={action === 'buy' ? handleBuy : handleSell}
                  className="flex-1 px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all text-white"
                  style={{ background: action === 'buy' 
                    ? 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' 
                    : 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)'
                  }}
                >
                  {action === 'buy' ? 'Köp' : 'Sälj'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
