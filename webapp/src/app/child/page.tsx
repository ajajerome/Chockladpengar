'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function ChildHomePage() {
  const router = useRouter();
  const { currentUser, logout } = useStore();
  const { pendingTasks, submitForReview } = useTasks();
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Hej {currentUser.name}!</h1>
              <p className="text-amber-100">Dina chokladpengar</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logga ut
            </button>
          </div>
          
          <BalanceDisplay balance={child.balance} label="Mitt saldo" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/child/rewards')}
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-5xl mb-2">🎁</div>
            <h3 className="font-bold text-lg">Belöningar</h3>
            <p className="text-sm text-purple-100 mt-1">Köp belöningar</p>
          </button>
          
          <button
            onClick={() => router.push('/child/investments')}
            className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-5xl mb-2">📈</div>
            <h3 className="font-bold text-lg">Investeringar</h3>
            <p className="text-sm text-green-100 mt-1">Väx dina pengar</p>
          </button>
          
          <button
            onClick={() => router.push('/child/factory')}
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-5xl mb-2">🏭</div>
            <h3 className="font-bold text-lg">Fabrik</h3>
            <p className="text-sm text-orange-100 mt-1">Passiv inkomst</p>
          </button>
          
          <button
            onClick={() => alert('Kommande funktion!')}
            className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-5xl mb-2">📊</div>
            <h3 className="font-bold text-lg">Statistik</h3>
            <p className="text-sm text-blue-100 mt-1">Se din framgång</p>
          </button>
        </div>
        
        {/* Pending Tasks */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Mina uppgifter ({pendingTasks.length})
          </h2>
          
          {pendingTasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-gray-600">Inga uppgifter just nu!</p>
              <p className="text-sm text-gray-500 mt-1">Fråga dina föräldrar om fler uppgifter</p>
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
        
        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border-2 border-amber-200 p-6 text-center">
          <div className="text-4xl mb-2">💪</div>
          <p className="text-gray-800 font-medium">
            {child.balance >= 100 
              ? 'Wow! Du har mycket chokladpengar! 🎉'
              : 'Gör uppgifter för att tjäna mer chokladpengar! 🍫'}
          </p>
        </div>
      </div>
    </div>
  );
}
