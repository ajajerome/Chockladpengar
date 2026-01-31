'use client';

import React from 'react';
import Image from 'next/image';

type ChokiMood = 'happy' | 'sad' | 'sleeping';

interface ChokiMascotProps {
  size?: number;
  withCoins?: boolean;
  withWave?: boolean;
  className?: string;
  mood?: ChokiMood;
  balance?: number; // Auto-detect mood from balance
}

export const ChokiMascot: React.FC<ChokiMascotProps> = ({
  size = 120,
  className = '',
  mood,
  balance,
}) => {
  // Auto-detect mood from balance and time
  const getMood = (): ChokiMood => {
    if (mood) return mood;
    
    // Check if it's after 20:00 (8 PM)
    if (typeof window !== 'undefined') {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 20 || hour < 6) {
        return 'sleeping';
      }
    }
    
    // Check balance
    if (balance === undefined) return 'happy';
    if (balance === 0 || balance < 20) return 'sad';
    
    return 'happy';
  };
  
  const currentMood = getMood();
  
  // Get the correct SVG file based on mood
  const getImageSrc = () => {
    switch (currentMood) {
      case 'happy':
        return '/choki-happy.svg';
      case 'sad':
        return '/choki-sad.svg';
      case 'sleeping':
        return '/choki-sleeping.svg';
      default:
        return '/choki-happy.svg';
    }
  };
  
  // Get message based on mood
  const getMessage = () => {
    switch (currentMood) {
      case 'happy':
        return 'Yay! Du har chokladpengar! 🎉';
      case 'sad':
        return 'Åh nej! Pengarna är slut... 😢';
      case 'sleeping':
        return 'Godnatt! 😴 Zzz...';
      default:
        return '';
    }
  };
  
  return (
    <div className={`relative inline-block group ${className}`}>
      <div 
        style={{ 
          width: size, 
          height: size,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={getImageSrc()}
          alt={`Choki mascot - ${currentMood}`}
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            transition: 'opacity 0.3s ease-in-out',
          }}
          priority
        />
      </div>
      
      {/* Optional message that shows on hover */}
      {getMessage() && (
        <div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-extrabold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-lg"
          style={{ color: '#8B5A3C' }}
        >
          {getMessage()}
        </div>
      )}
    </div>
  );
};
