'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ChocolateCoinIcon, GiftIcon, CheckIcon, SettingsIcon, ChildIcon } from '@/components/icons';
import { ChokiMascot } from '@/components/icons/ChokiMascot';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function ParentHomePage() {
  const router = useRouter();
  const { currentUser, family, familyMembers, purchasedRewards, rewards, logout } = useStore();
  const { reviewTasks, approveTask, rejectTask } = useTasks();
  
  if (!currentUser || currentUser.role !== 'parent') {
    router.push('/');
    return null;
  }
  
  const children = familyMembers.filter(m => m.role === 'child') as Child[];
  
  // Get recent purchases (last 10)
  const recentPurchases = purchasedRewards.slice(0, 10);
  
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="relative overflow-visible" style={{ 
        background: 'linear-gradient(135deg, #A67C52 0%, #8B5A3C 50%, #6B4423 100%)'
      }}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-white">
                <h1 className="text-3xl font-extrabold">Hej {currentUser.name}!</h1>
                <p className="text-white/90">{family?.name || 'Familjen'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/parent/settings')}
                className="bg-white/90 hover:bg-white p-3 rounded-2xl transition-all shadow-md"
                title="Inställningar"
              >
                <SettingsIcon size={20} />
              </button>
              <button
                onClick={logout}
                className="bg-white/90 hover:bg-white px-4 py-2 rounded-2xl text-sm font-medium transition-all shadow-md"
                style={{ color: '#8B5A3C' }}
              >
                Logga ut
              </button>
            </div>
          </div>
          
          {family && (
            <div className="bg-white rounded-3xl p-4 shadow-lg">
              <p className="text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>Familjekod</p>
              <p className="text-3xl font-extrabold tracking-wider" style={{ color: '#FFD700' }}>{family.code}</p>
              <p className="text-xs mt-1" style={{ color: '#A67C52' }}>Dela koden med familjemedlemmar</p>
            </div>
          )}
        </div>
        
        {/* Dekorativ Choki */}
        <div className="absolute top-4 right-4 opacity-30 pointer-events-none" style={{ zIndex: 10 }}>
          <ChokiMascot size={100} mood="happy" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Children Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold" style={{ color: '#8B5A3C' }}>Barn</h2>
            <button
              onClick={() => router.push('/add-child')}
              className="bg-white px-4 py-2 rounded-2xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
              style={{ color: '#8B5A3C', border: '2px solid #FFD700' }}
            >
              + Lägg till barn
            </button>
          </div>
          
          {children.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md text-center p-8">
              <ChildIcon size={60} />
              <p className="font-medium mt-4 mb-4" style={{ color: '#8B5A3C' }}>Inga barn tillagda än</p>
              <button
                onClick={() => router.push('/add-child')}
                className="px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)', color: '#8B5A3C' }}
              >
                Lägg till ditt första barn
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {children.map((child) => (
                <div key={child.id} className="bg-white rounded-3xl shadow-md p-5 border-2" style={{ borderColor: '#FFE55C' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #FFB4A2 0%, #FF9999 100%)' }}>
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>{child.name}</h3>
                      <div className="flex items-center gap-2 font-extrabold" style={{ color: '#FFD700' }}>
                        <ChocolateCoinIcon size={20} />
                        <span>{child.balance || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/parent/create-task')}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all text-center p-6 border-2"
            style={{ borderColor: '#B4E7CE' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2" style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}>
              <CheckIcon size={32} />
            </div>
            <h3 className="font-extrabold" style={{ color: '#8B5A3C' }}>Skapa uppgift</h3>
            <p className="text-sm mt-1" style={{ color: '#A67C52' }}>Lägg till ny uppgift</p>
          </button>
          
          <button
            onClick={() => router.push('/parent/create-reward')}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all text-center p-6 border-2"
            style={{ borderColor: '#FFB4A2' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2" style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)' }}>
              <GiftIcon size={32} />
            </div>
            <h3 className="font-extrabold" style={{ color: '#8B5A3C' }}>Lägg till i Butiken</h3>
            <p className="text-sm mt-1" style={{ color: '#A67C52' }}>Skapa ny belöning</p>
          </button>
          
          <button
            onClick={() => router.push('/parent/settings')}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-6 col-span-2 border-2"
            style={{ borderColor: '#FFD700' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
                <SettingsIcon size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold" style={{ color: '#8B5A3C' }}>Inställningar</h3>
                <p className="text-sm" style={{ color: '#A67C52' }}>Hantera familj, barn, uppgifter och belöningar</p>
              </div>
            </div>
          </button>
        </div>
        
        {/* Tasks to Review */}
        <div>
          <h2 className="text-xl font-extrabold mb-4" style={{ color: '#8B5A3C' }}>
            Uppgifter att granska
          </h2>
          
          {reviewTasks.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md text-center p-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}>
                <CheckIcon size={48} />
              </div>
              <p style={{ color: '#A67C52' }}>Inga uppgifter att granska just nu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reviewTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  userRole="parent"
                  onApprove={() => approveTask(task.id)}
                  onReject={() => rejectTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Recent Purchases */}
        {recentPurchases.length > 0 && (
          <div>
            <h2 className="text-xl font-extrabold mb-4" style={{ color: '#8B5A3C' }}>
              Senaste köpen
            </h2>
            
            <div className="space-y-3">
              {recentPurchases.map((purchase) => {
                const child = children.find(c => c.id === purchase.childId);
                const reward = rewards.find(r => r.id === purchase.rewardId);
                
                if (!child || !reward) return null;
                
                return (
                  <div key={purchase.id} className="bg-white rounded-3xl shadow-md p-5 border-l-4" style={{ borderColor: '#FFD700' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{reward.icon}</div>
                        <div>
                          <h3 className="font-extrabold" style={{ color: '#8B5A3C' }}>{reward.title}</h3>
                          <p className="text-sm" style={{ color: '#A67C52' }}>
                            Köpt av {child.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 font-extrabold" style={{ color: '#FFD700' }}>
                          <ChocolateCoinIcon size={20} />
                          <span>{reward.cost}</span>
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#A67C52' }}>
                          {new Date(purchase.purchasedAt).toLocaleDateString('sv-SE')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
