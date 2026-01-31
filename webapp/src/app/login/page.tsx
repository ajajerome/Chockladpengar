'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ChocolateCoinIcon, KeyIcon, ChildIcon } from '@/components/icons';

export default function LoginPage() {
  const router = useRouter();
  const { joinFamilyAsChild, isLoading, error } = useAuth();
  
  const [familyCode, setFamilyCode] = useState('');
  const [childName, setChildName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await joinFamilyAsChild(familyCode, childName);
        router.push('/child');
    } catch (err) {
      console.error('Failed to join family:', err);
    }
  };
  
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FFB4A2 0%, #FF9999 100%)' }}>
              <ChildIcon size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#8B5A3C' }}>Barn: Logga in</h1>
          <p style={{ color: '#A67C52' }}>Ange din familjekod och ditt namn</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="familyCode" className="block text-sm font-medium text-chocolate-dark mb-1">
                Familjekod
              </label>
              <input
                type="text"
                id="familyCode"
                value={familyCode}
                onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                required
                maxLength={6}
                className="input-chocolate uppercase text-center text-2xl font-bold tracking-wider"
              />
            </div>
            
            <div>
              <label htmlFor="childName" className="block text-sm font-medium text-chocolate-dark mb-1">
                Ditt namn
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
              <p className="text-xs text-chocolate-milk mt-1">
                Skriv ditt namn exakt som föräldern la in det
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Logga in
              </Button>
              
              <Button onClick={() => router.push('/')} variant="ghost" size="md" fullWidth disabled={isLoading}>
                Tillbaka
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-chocolate-milk">
            Är du förälder?{' '}
            <button
              onClick={() => router.push('/parent/join')}
              className="text-nougat-gold font-medium hover:text-caramel underline"
            >
              Förälder-inloggning
            </button>
          </p>
          <p className="text-sm text-chocolate-milk">
            Har ingen familj än?{' '}
            <button
              onClick={() => router.push('/create-family')}
              className="text-nougat-gold font-medium hover:text-caramel underline"
            >
              Skapa familj
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
