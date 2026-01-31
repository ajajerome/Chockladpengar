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
  
  // Calculate which part of the sprite to show
  // The image has 3 characters: happy (left), sad (middle), sleeping (right)
  const getTransform = () => {
    switch (currentMood) {
      case 'happy':
        return 'translateX(0%)'; // Show left third
      case 'sad':
        return 'translateX(-33.33%)'; // Show middle third
      case 'sleeping':
        return 'translateX(-66.66%)'; // Show right third
      default:
        return 'translateX(0%)';
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
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: size * 3, // The image contains 3 characters
            height: size,
            position: 'absolute',
            left: 0,
            top: 0,
            transform: getTransform(),
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <Image
            src="/choki-mascot.png"
            alt="Choki mascot"
            width={size * 3}
            height={size}
            style={{
              width: size * 3,
              height: size,
              objectFit: 'cover',
              display: 'block',
            }}
            priority
          />
        </div>
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
