'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/Button';
import { ChocolateCoinIcon, GiftIcon, BarChartIcon, FactoryIcon, KeyIcon, EnvelopeIcon, UsersIcon, CheckCircleIcon, ArrowRightIcon } from '@/components/icons';

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
            <div className="mb-6 flex justify-center animate-bounce-soft">
              <div className="relative">
                <ChocolateCoinIcon size={112} color="#f59e0b" />
                <div className="absolute inset-0 animate-pulse-glow rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-3 tracking-tight">
              Chokladpengar
            </h1>
            <p className="text-base sm:text-lg text-chocolate-milk font-medium px-2">Lär barn ekonomi på ett roligt sätt!</p>
          </div>
          
          {/* Features */}
          <div className="card-glass p-8 mb-8">
            <div className="space-y-5 text-left">
              <div className="flex items-start gap-4">
                <div className="icon-circle-gold shrink-0">
                  <CheckCircleIcon size={28} color="#ffffff" />
                </div>
                <div>
                  <h3 className="font-bold text-chocolate-dark text-lg mb-1">Gör uppgifter</h3>
                  <p className="text-sm text-chocolate-milk">Tjäna chokladpengar genom att hjälpa till hemma</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="icon-circle-purple shrink-0">
                  <GiftIcon size={28} color="#ffffff" />
                </div>
                <div>
                  <h3 className="font-bold text-chocolate-dark text-lg mb-1">Köp belöningar</h3>
                  <p className="text-sm text-chocolate-milk">Spara och köp saker du önskar dig</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="icon-circle-blue shrink-0">
                  <BarChartIcon size={28} color="#ffffff" />
                </div>
                <div>
                  <h3 className="font-bold text-chocolate-dark text-lg mb-1">Investera</h3>
                  <p className="text-sm text-chocolate-milk">Lär dig om sparande och investering</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="icon-circle-orange shrink-0">
                  <FactoryIcon size={28} color="#ffffff" />
                </div>
                <div>
                  <h3 className="font-bold text-chocolate-dark text-lg mb-1">Chokladfabrik</h3>
                  <p className="text-sm text-chocolate-milk">Bygg passiv inkomst genom fabriker</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tre tydliga val - mjuka och lekfulla */}
          <div className="space-y-4">
            <button
              onClick={() => router.push('/login')}
              className="card-interactive w-full p-5 text-left flex items-start gap-4 group"
            >
              <div className="icon-container bg-gradient-to-br from-blue-100 to-sky-100 group-hover:from-blue-200 group-hover:to-sky-200">
                <KeyIcon size={32} color="#0284c7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-chocolate-dark text-base sm:text-lg mb-1 break-words">1. Logga in</h3>
                <p className="text-sm text-chocolate-milk leading-relaxed">Har redan konto? Ange din familjekod och namn.</p>
              </div>
              <div className="shrink-0 flex items-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRightIcon size={24} color="#f59e0b" />
              </div>
            </button>

            <button
              onClick={() => router.push('/login')}
              className="card-interactive w-full p-5 text-left flex items-start gap-4 group"
            >
              <div className="icon-container bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200">
                <EnvelopeIcon size={32} color="#a855f7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-chocolate-dark text-base sm:text-lg mb-1 break-words">2. Har familjekod?</h3>
                <p className="text-sm text-chocolate-milk leading-relaxed">Gå med i familjen med din kod och ditt namn.</p>
              </div>
              <div className="shrink-0 flex items-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRightIcon size={24} color="#f59e0b" />
              </div>
            </button>

            <button
              onClick={() => router.push('/create-family')}
              className="card-interactive w-full p-5 text-left flex items-start gap-4 group border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50"
            >
              <div className="icon-container bg-gradient-to-br from-amber-200 to-orange-200 group-hover:from-amber-300 group-hover:to-orange-300">
                <UsersIcon size={32} color="#d97706" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-chocolate-dark text-base sm:text-lg mb-1 break-words">3. Skapa familj</h3>
                <p className="text-sm text-chocolate-milk leading-relaxed">Starta nytt! Skapa familj och få din kod.</p>
              </div>
              <div className="shrink-0 flex items-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRightIcon size={24} color="#f59e0b" />
              </div>
            </button>
          </div>
          
          <p className="mt-6 text-xs text-gray-500">
            Ett roligt sätt att lära barn om pengar, sparande och ansvar 🍫
          </p>
        </div>
      </div>
    </div>
  );
}
