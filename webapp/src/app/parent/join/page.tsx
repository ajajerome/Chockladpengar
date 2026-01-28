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
    <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate p-4">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center gap-3">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-chocolate-medium to-chocolate-milk flex items-center justify-center shadow-lg">
              <ParentIcon size={48} color="white" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nougat-gold to-caramel flex items-center justify-center shadow-lg self-end">
              <KeyIcon size={32} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-chocolate-dark mb-2">Förälder: Gå med</h1>
          <p className="text-chocolate-milk">Gå med i en befintlig familj</p>
        </div>
        
        <div className="card-glass">
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
              <label htmlFor="parentName" className="block text-sm font-medium text-chocolate-dark mb-1">
                Ditt namn
              </label>
              <input
                type="text"
                id="parentName"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Anna"
                required
                className="input-chocolate"
              />
            </div>
            
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-chocolate-dark mb-1">
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
                className="input-chocolate text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-chocolate-milk mt-1">
                Denna PIN behövs för att logga in som förälder
              </p>
            </div>
            
            <div className="bg-nougat-light/50 rounded-2xl p-4 border-2 border-nougat-gold/30">
              <p className="text-sm text-chocolate-medium">
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
