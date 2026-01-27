'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function ParentHomePage() {
  const router = useRouter();
  const { currentUser, family, familyMembers, logout } = useStore();
  const { reviewTasks, approveTask, rejectTask } = useTasks();
  
  if (!currentUser || currentUser.role !== 'parent') {
    router.push('/');
    return null;
  }
  
  const children = familyMembers.filter(m => m.role === 'child') as Child[];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Hej {currentUser.name}!</h1>
              <p className="text-amber-100">{family?.name || 'Familjen'}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logga ut
            </button>
          </div>
          
          {family && (
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-sm text-amber-100 mb-1">Familje kod</p>
              <p className="text-3xl font-bold tracking-wider">{family.code}</p>
              <p className="text-xs text-amber-100 mt-1">Dela koden med familjemedlemmar</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Children Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Barn ({children.length})</h2>
            <Button onClick={() => router.push('/add-child')} size="sm">
              + Lägg till barn
            </Button>
          </div>
          
          {children.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <div className="text-5xl mb-3">👧👦</div>
              <p className="text-gray-600 mb-4">Inga barn tillagda än</p>
              <Button onClick={() => router.push('/add-child')} variant="primary">
                Lägg till ditt första barn
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {children.map((child) => (
                <div key={child.id} className="bg-white rounded-2xl shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">👧</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{child.name}</h3>
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <span>🍫</span>
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Uppgifter att granska ({reviewTasks.length})
          </h2>
          
          {reviewTasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-gray-600">Inga uppgifter att granska just nu</p>
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
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Snabbåtgärder</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/parent/create-task')}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-5xl mb-2">✅</div>
              <h3 className="font-bold text-gray-800">Skapa uppgift</h3>
              <p className="text-sm text-gray-600 mt-1">Lägg till ny uppgift</p>
            </button>
            
            <button
              onClick={() => router.push('/parent/create-reward')}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-5xl mb-2">🎁</div>
              <h3 className="font-bold text-gray-800">Skapa belöning</h3>
              <p className="text-sm text-gray-600 mt-1">Lägg till ny belöning</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
