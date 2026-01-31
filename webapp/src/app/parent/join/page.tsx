'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ParentIcon, KeyIcon } from '@/components/icons';

export default function ParentJoinPage() {
  const router = useRouter();
  const { joinFamilyAsParent, isLoading, error } = useAuth();
  
  const [familyCode, setFamilyCode] = useState('');
  const [parentName, setParentName] = useState('');
  const [pin, setPin] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      alert('PIN måste vara 4 siffror');
      return;
    }
    
    try {
      await joinFamilyAsParent(familyCode, parentName, pin);
      router.push('/parent');
    } catch (err) {
      console.error('Failed to join family as parent:', err);
    }
  };
  
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center gap-3">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%)' }}>
              <ParentIcon size={48} color="white" />
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg self-end" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)' }}>
              <KeyIcon size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Förälder: Gå med</h1>
          <p style={{ color: '#A67C52' }}>Gå med i en befintlig familj</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="familyCode" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
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
                className="w-full px-4 py-3 rounded-2xl border-2 uppercase text-center text-2xl font-extrabold tracking-wider focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
            </div>
            
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Ditt namn
              </label>
              <input
                type="text"
                id="parentName"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Anna"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
            </div>
            
            <div>
              <label htmlFor="pin" className="block text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>
                Skapa PIN-kod (4 siffror)
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                required
                maxLength={4}
                pattern="\d{4}"
                inputMode="numeric"
                className="w-full px-4 py-3 rounded-2xl border-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#FFE55C', color: '#8B5A3C' }}
              />
              <p className="text-xs mt-1" style={{ color: '#A67C52' }}>
                Denna PIN behövs för att logga in som förälder
              </p>
            </div>
            
            <div className="rounded-2xl p-4 border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#FFD700' }}>
              <p className="text-sm" style={{ color: '#8B5A3C' }}>
                <strong>Viktigt:</strong> Kom ihåg din PIN-kod! Den behövs för att logga in och för att andra föräldrar ska kunna gå med.
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Gå med som förälder
              </Button>
              
              <Button onClick={() => router.push('/')} variant="ghost" size="md" fullWidth disabled={isLoading}>
                Tillbaka
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
