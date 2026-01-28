'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ChildIcon } from '@/components/icons';

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
    <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate p-4">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center shadow-lg">
              <ChildIcon size={48} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-chocolate-dark mb-2">Lägg till barn</h1>
          <p className="text-chocolate-milk">Skapa ett konto för ditt barn</p>
        </div>
        
        {/* Form */}
        <div className="card-glass">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="childName" className="block text-sm font-medium text-chocolate-dark mb-1">
                Barnets namn
              </label>
              <input
                type="text"
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Emma"
                required
                className="input-chocolate"
              />
            </div>
            
            <div className="bg-nougat-light/50 rounded-2xl p-4 border-2 border-nougat-gold/30">
              <p className="text-sm text-chocolate-medium">
                <strong>Så loggar barnet in:</strong> Barnet öppnar appen → väljer "Logga in" → anger familjekoden och sitt namn. Om du har lagt till barnet här kommer de automatiskt in på sitt konto.
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
