/**
 * Sound utilities for the app
 */

export function playCashSound() {
  if (typeof window === 'undefined') return;
  
  try {
    const audio = new Audio('/sounds/cash-register.mp3');
    audio.volume = 0.5;
    audio.play().catch((err) => {
      console.log('Failed to play sound:', err);
    });
  } catch (err) {
    console.log('Sound not available:', err);
  }
}

export function playSuccessSound() {
  if (typeof window === 'undefined') return;
  
  // Fallback: use Web Audio API for a simple "cha-ching" sound
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a simple two-tone "cha-ching" sound
    const playTone = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      // Envelope
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    playTone(800, now, 0.1); // First "cha"
    playTone(1200, now + 0.1, 0.15); // Second "ching"
  } catch (err) {
    console.log('Web Audio not available:', err);
  }
}




