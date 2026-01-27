'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/Button';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, currentUser, isLoading } = useStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (mounted && isAuthenticated && currentUser) {
      if (currentUser.role === 'parent') {
        router.push('/parent');
      } else {
        router.push('/child');
      }
    }
  }, [mounted, isAuthenticated, currentUser, router]);
  
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <LoadingSpinner message="Laddar Chokladpengar..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🍫</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Chokladpengar
            </h1>
            <p className="text-gray-600">Lär barn ekonomi på ett roligt sätt!</p>
          </div>
          
          {/* Features */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-3xl">✅</span>
                <div>
                  <h3 className="font-bold text-gray-800">Gör uppgifter</h3>
                  <p className="text-sm text-gray-600">Tjäna chokladpengar genom att hjälpa till hemma</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎁</span>
                <div>
                  <h3 className="font-bold text-gray-800">Köp belöningar</h3>
                  <p className="text-sm text-gray-600">Spara och köp saker du önskar dig</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-3xl">📈</span>
                <div>
                  <h3 className="font-bold text-gray-800">Investera</h3>
                  <p className="text-sm text-gray-600">Lär dig om sparande och investering</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-3xl">🏭</span>
                <div>
                  <h3 className="font-bold text-gray-800">Chokladfabrik</h3>
                  <p className="text-sm text-gray-600">Bygg passiv inkomst genom fabriker</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button onClick={() => router.push('/create-family')} variant="primary" size="lg" fullWidth>
              Skapa familj
            </Button>
            
            <Button onClick={() => router.push('/login')} variant="secondary" size="lg" fullWidth>
              Logga in
            </Button>
          </div>
          
          <p className="mt-6 text-xs text-gray-500">
            Ett roligt sätt att lära barn om pengar, sparande och ansvar 🍫
          </p>
        </div>
      </div>
    </div>
  );
}
