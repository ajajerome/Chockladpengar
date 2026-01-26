'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { ChocolateCoinIcon, CheckIcon, BarChartIcon, GiftIcon } from '@/components/icons'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6 inline-block">
            <ChocolateCoinIcon size={96} color="#D4AF37" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-4">
            Chokladpengar
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-2 font-medium">
            Motivationsapp för hela familjen
          </p>
          <p className="text-base md:text-lg text-secondary/80 max-w-2xl mx-auto">
            Lär barn om ansvar, pengar och målsättning genom roliga uppgifter, 
            belöningar och investeringar
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card card-gradient-orange text-center transform transition-all duration-300 hover:scale-105">
            <div className="mb-4 inline-block">
              <CheckIcon size={48} color="#4CAF50" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">
              Uppgifter
            </h3>
            <p className="text-sm text-secondary">
              Barn slutför uppgifter och tjänar chokladpengar
            </p>
          </div>

          <div className="card card-gradient-blue text-center transform transition-all duration-300 hover:scale-105">
            <div className="mb-4 inline-block">
              <BarChartIcon size={48} color="#2196F3" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">
              Fonder
            </h3>
            <p className="text-sm text-secondary">
              Investera och lär dig om sparande och avkastning
            </p>
          </div>

          <div className="card card-gradient-purple text-center transform transition-all duration-300 hover:scale-105">
            <div className="mb-4 inline-block">
              <GiftIcon size={48} color="#9C27B0" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">
              Belöningar
            </h3>
            <p className="text-sm text-secondary">
              Köp belöningar med dina intjänade chokladpengar
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <Button
            onClick={() => router.push('/create-family')}
            size="large"
            className="w-full text-lg py-5"
          >
            Kom igång - Skapa familj
          </Button>

          <Button
            onClick={() => router.push('/login')}
            variant="outline"
            size="large"
            className="w-full text-lg py-5"
          >
            Logga in
          </Button>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-secondary/60 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3z"/>
              </svg>
              Säkert
            </span>
            <span>•</span>
            <span>För hela familjen</span>
            <span>•</span>
            <span>Fungerar på alla enheter</span>
          </p>
        </div>
      </div>
    </div>
  )
}
