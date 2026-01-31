'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/Button';
import { GiftIcon, BarChartIcon, FactoryIcon, KeyIcon, EnvelopeIcon, UsersIcon, CheckCircleIcon, ArrowRightIcon } from '@/components/icons';
import { ChokiMascot } from '@/components/icons/ChokiMascot';

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF8F0' }}>
        <LoadingSpinner message="Laddar Chokladpengar..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          {/* Logo med Choki */}
          <div className="mb-8">
            <div className="mb-6 flex justify-center">
              <ChokiMascot size={160} mood="happy" className="animate-bounce-soft" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight" style={{ 
              background: 'linear-gradient(to right, #8B5A3C, #FFD700, #8B5A3C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Chokladpengar
            </h1>
            <p className="text-base sm:text-lg font-medium px-2" style={{ color: '#A67C52' }}>Lär barn ekonomi på ett roligt sätt 🍫</p>
          </div>
          
          {/* Features */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="space-y-5 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' }}>
                  <CheckCircleIcon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#8B5A3C' }}>Gör uppgifter</h3>
                  <p className="text-sm" style={{ color: '#A67C52' }}>Tjäna chokladpengar genom att hjälpa till hemma</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)' }}>
                  <GiftIcon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#8B5A3C' }}>Butiken</h3>
                  <p className="text-sm" style={{ color: '#A67C52' }}>Handla belöningar med dina chokladpengar</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #A8D8FF 0%, #64B5F6 100%)' }}>
                  <BarChartIcon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#8B5A3C' }}>Investera</h3>
                  <p className="text-sm" style={{ color: '#A67C52' }}>Lär dig om sparande och investering</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%)' }}>
                  <FactoryIcon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#8B5A3C' }}>Chokladfabrik</h3>
                  <p className="text-sm" style={{ color: '#A67C52' }}>Bygg passiv inkomst genom fabriker</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tre tydliga val */}
          <div className="space-y-4">
            <button
              onClick={() => router.push('/login')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all w-full p-5 text-left flex items-start gap-4 group border-2" style={{ borderColor: '#A8D8FF' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A8D8FF 0%, #64B5F6 100%)' }}>
                <KeyIcon size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 break-words" style={{ color: '#8B5A3C' }}>1. Logga in</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#A67C52' }}>Har redan konto? Ange din familjekod och namn.</p>
              </div>
              <div className="shrink-0 flex items-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRightIcon size={24} />
              </div>
            </button>

            <button
              onClick={() => router.push('/login')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all w-full p-5 text-left flex items-start gap-4 group border-2" style={{ borderColor: '#FFE55C' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFE55C 0%, #FFD700 100())' }}>
                <EnvelopeIcon size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 break-words" style={{ color: '#8B5A3C' }}>2. Har familjekod?</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#A67C52' }}>Gå med i familjen med din kod och ditt namn.</p>
              </div>
              <div className="shrink-0 flex items-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRightIcon size={24} />
              </div>
            </button>

            <button
              onClick={() => router.push('/create-family')}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all w-full p-5 text-left flex items-start gap-4 group border-2" style={{ borderColor: '#FFB4A2' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)' }}>
                <UsersIcon size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 break-words" style={{ color: '#8B5A3C' }}>3. Skapa familj</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#A67C52' }}>Starta nytt! Skapa familj och få din kod.</p>
              </div>
              <div className="shrink-0 flex items-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRightIcon size={24} />
              </div>
            </button>
          </div>
          
          <p className="mt-6 text-xs" style={{ color: '#A67C52' }}>
            Ett roligt sätt att lära barn om pengar, sparande och ansvar ✨
          </p>
        </div>
      </div>
    </div>
  );
}
