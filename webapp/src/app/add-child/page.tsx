'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function AddChildPage() {
  const router = useRouter();
  const { addChild, isLoading, error } = useAuth();
  
  const [childName, setChildName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addChild(childName);
      router.push('/parent');
    } catch (err) {
      console.error('Failed to add child:', err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👧👦</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lägg till barn</h1>
          <p className="text-gray-600">Skapa ett konto för ditt barn</p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                Barnets namn
              </label>
              <input
                type="text"
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="t.ex. Emma"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>💡 Tips:</strong> Barnet kan sedan logga in med familje koden och sitt namn!
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Lägg till barn
              </Button>
              
              <Button onClick={() => router.back()} variant="ghost" size="md" fullWidth disabled={isLoading}>
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
