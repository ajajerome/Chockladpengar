'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ChocolateCoinIcon, KeyIcon, ChildIcon, ParentIcon } from '@/components/icons';

export default function LoginPage() {
  const router = useRouter();
  const { joinFamily, isLoading, error } = useAuth();
  const familyMembers = useStore((state) => state.familyMembers);
  
  const [step, setStep] = useState<'code' | 'select-user'>('code');
  const [familyCode, setFamilyCode] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'parent' | 'child'>('child');
  
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await joinFamily(familyCode, userName, userRole);
      
      if (userRole === 'parent') {
        router.push('/parent');
      } else {
        router.push('/child');
      }
    } catch (err) {
      console.error('Failed to join family:', err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center gap-2">
            <ChocolateCoinIcon size={64} color="#D97706" />
            <KeyIcon size={64} color="#D97706" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Logga in eller gå med</h1>
          <p className="text-gray-600">Ange familjekod och ditt namn – har du redan ett konto loggar du in, annars går du med i familjen</p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="familyCode" className="block text-sm font-medium text-gray-700 mb-1">
                Familje kod
              </label>
              <input
                type="text"
                id="familyCode"
                value={familyCode}
                onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                placeholder="t.ex. ABC123"
                required
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors uppercase text-center text-2xl font-bold tracking-wider"
              />
              <p className="text-xs text-gray-500 mt-1">Fråga föräldern efter koden. Har föräldern lagt till dig som barn: skriv ditt namn som föräldern la in.</p>
            </div>
            
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                Ditt namn
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="t.ex. Emma"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jag är en...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserRole('child')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userRole === 'child'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <ChildIcon size={40} color={userRole === 'child' ? '#D97706' : '#9CA3AF'} />
                  </div>
                  <div className="font-medium text-sm">Barn</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setUserRole('parent')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userRole === 'parent'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <ParentIcon size={40} color={userRole === 'parent' ? '#D97706' : '#9CA3AF'} />
                  </div>
                  <div className="font-medium text-sm">Förälder</div>
                </button>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Logga in / Gå med
              </Button>
              
              <Button onClick={() => router.push('/')} variant="ghost" size="md" fullWidth disabled={isLoading}>
                Tillbaka
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Har ingen familjekod?{' '}
            <button
              onClick={() => router.push('/create-family')}
              className="text-amber-600 font-medium hover:text-amber-700 underline"
            >
              Skapa familj
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
