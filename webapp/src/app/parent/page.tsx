'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ChocolateCoinIcon, GiftIcon, CheckIcon } from '@/components/icons';
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-chocolate-medium to-caramel text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Hej {currentUser.name}!</h1>
              <p className="text-white/80">{family?.name || 'Familjen'}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Logga ut
            </button>
          </div>
          
          {family && (
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
              <p className="text-sm text-white/80 mb-1">Familjekod</p>
              <p className="text-3xl font-bold tracking-wider">{family.code}</p>
              <p className="text-xs text-white/80 mt-1">Dela koden med familjemedlemmar</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Children Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-chocolate-dark">Barn ({children.length})</h2>
            <Button onClick={() => router.push('/add-child')} size="sm">
              + Lägg till barn
            </Button>
          </div>
          
          {children.length === 0 ? (
            <div className="card-glass text-center">
              <p className="text-chocolate-milk mb-4">Inga barn tillagda än</p>
              <Button onClick={() => router.push('/add-child')} variant="primary">
                Lägg till ditt första barn
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {children.map((child) => (
                <div key={child.id} className="card-chocolate">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center text-white font-bold text-xl">
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-chocolate-dark">{child.name}</h3>
                      <div className="flex items-center gap-2 text-nougat-gold font-bold">
                        <ChocolateCoinIcon size={20} color="#D4AF37" />
                        <span>{child.balance || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Tasks to Review */}
        <div>
          <h2 className="text-xl font-bold text-chocolate-dark mb-4">
            Uppgifter att granska ({reviewTasks.length})
          </h2>
          
          {reviewTasks.length === 0 ? (
            <div className="card-glass text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                <CheckIcon size={48} color="white" />
              </div>
              <p className="text-chocolate-milk">Inga uppgifter att granska just nu</p>
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Senaste köpen ({recentPurchases.length})
            </h2>
            
            <div className="space-y-3">
              {recentPurchases.map((purchase) => {
                const child = children.find(c => c.id === purchase.childId);
                const reward = rewards.find(r => r.id === purchase.rewardId);
                
                if (!child || !reward) return null;
                
                return (
                  <div key={purchase.id} className="card-chocolate">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{reward.icon}</div>
                        <div>
                          <h3 className="font-bold text-chocolate-dark">{reward.title}</h3>
                          <p className="text-sm text-chocolate-milk">
                            Köpt av {child.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-nougat-gold font-bold">
                          <ChocolateCoinIcon size={20} color="#D4AF37" />
                          <span>{reward.cost}</span>
                        </div>
                        <p className="text-xs text-chocolate-milk mt-1">
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
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-chocolate-dark mb-4">Snabbåtgärder</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/parent/create-task')}
              className="card-interactive p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                <CheckIcon size={36} color="white" />
              </div>
              <h3 className="font-bold text-chocolate-dark">Skapa uppgift</h3>
              <p className="text-sm text-chocolate-milk mt-1">Lägg till ny uppgift</p>
            </button>
            
            <button
              onClick={() => router.push('/parent/create-reward')}
              className="card-interactive p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center">
                <GiftIcon size={36} color="white" />
              </div>
              <h3 className="font-bold text-chocolate-dark">Lägg till i butiken</h3>
              <p className="text-sm text-chocolate-milk mt-1">Ny belöning</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
