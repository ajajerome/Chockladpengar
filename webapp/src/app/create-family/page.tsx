'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { UsersIcon, ChocolateCoinIcon } from '@/components/icons';

export default function CreateFamilyPage() {
  const router = useRouter();
  const { createFamily, isLoading, error } = useAuth();
  
  const [familyName, setFamilyName] = useState('');
  const [parentName, setParentName] = useState('');
  const [pin, setPin] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      alert('PIN måste vara 4 siffror');
      return;
    }
    
    try {
      const result = await createFamily(familyName, parentName, pin);
      
      // Show family code
      alert(`Familj skapad! Familjekod: ${result.family.code}\n\nSpara denna kod så andra kan gå med senare!`);
      
      router.push('/parent');
    } catch (err) {
      console.error('Failed to create family:', err);
    }
  };
  
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center gap-3">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg animate-float" style={{ background: 'linear-gradient(135deg, #FFE55C 0%, #FFD700 100%)' }}>
              <ChocolateCoinIcon size={48} />
            </div>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.2s', background: 'linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%)' }}>
              <UsersIcon size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Skapa familj</h1>
          <p style={{ color: '#A67C52' }}>Börja er chokladpengar-resa</p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          {error && <ErrorMessage message={error} />}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="familyName" className="block text-sm font-medium text-chocolate-dark mb-1">
                Familjens namn
              </label>
              <input
                type="text"
                id="familyName"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Familjen Andersson"
                required
                className="input-chocolate"
              />
            </div>
            
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-chocolate-dark mb-1">
                Ditt namn (förälder)
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
                Denna PIN behövs för förälder-inloggning
              </p>
            </div>
            
            <div className="bg-nougat-light/50 rounded-2xl p-4 border-2 border-nougat-gold/30">
              <p className="text-sm text-chocolate-medium">
                <strong>Tips:</strong> Du får en familjekod som andra kan använda för att gå med i familjen!
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
                Skapa familj
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
