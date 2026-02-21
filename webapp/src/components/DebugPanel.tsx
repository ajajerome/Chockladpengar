'use client';

import { useStore } from '@/store/useStore';
import { useState } from 'react';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    mode,
    currentUser,
    family,
    familyMembers,
    tasks,
    rewards,
    isAuthenticated,
  } = useStore();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        🐛 Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-purple-600 rounded-lg shadow-xl z-50 max-w-md max-h-96 overflow-auto">
      <div className="bg-purple-600 text-white px-4 py-2 flex justify-between items-center">
        <span className="font-bold">Debug Info</span>
        <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
      </div>
      
      <div className="p-4 space-y-3 text-xs">
        <div>
          <strong>Mode:</strong> <span className={mode === 'firebase' ? 'text-green-600' : 'text-orange-600'}>{mode}</span>
        </div>
        
        <div>
          <strong>Authenticated:</strong> {isAuthenticated ? '✅' : '❌'}
        </div>
        
        <div>
          <strong>User:</strong> {currentUser ? `${currentUser.name} (${currentUser.role})` : 'None'}
        </div>
        
        <div>
          <strong>Family:</strong> {family ? `${family.name} (${family.code})` : 'None'}
        </div>
        
        <div>
          <strong>Family Members:</strong> {familyMembers.length}
          <ul className="ml-4 mt-1">
            {familyMembers.map(m => (
              <li key={m.id}>• {m.name} ({m.role})</li>
            ))}
          </ul>
        </div>
        
        <div>
          <strong>Tasks:</strong> {tasks.length}
        </div>
        
        <div>
          <strong>Rewards:</strong> {rewards.length}
        </div>
        
        <div className="pt-2 border-t">
          <button
            onClick={() => {
              console.log('=== DEBUG INFO ===');
              console.log('Mode:', mode);
              console.log('User:', currentUser);
              console.log('Family:', family);
              console.log('Members:', familyMembers);
              console.log('Tasks:', tasks);
              console.log('Rewards:', rewards);
            }}
            className="bg-purple-600 text-white px-3 py-1 rounded text-xs"
          >
            Log to Console
          </button>
        </div>
      </div>
    </div>
  );
}

