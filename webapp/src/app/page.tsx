'use client'

import dynamic from 'next/dynamic'

const HomeContent = dynamic(() => import('@/components/HomeContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🍫</div>
        <p className="text-secondary">Laddar...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return <HomeContent />
}
