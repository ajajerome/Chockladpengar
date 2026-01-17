import {Vibration, Platform} from 'react-native';

// Play ca-ching sound effect with vibration
// TODO: Replace with actual sound file when available
export const playCoinSound = () => {
  // Use a pleasant vibration pattern that mimics "ca-ching"
  // Pattern: [delay, vibrate, delay, vibrate]
  // First short buzz (ca-), pause, then longer buzz (ching!)
  const pattern = Platform.select({
    ios: [0, 50, 30, 100], // iOS pattern
    android: [0, 50, 30, 100], // Android pattern
    default: [0, 50, 30, 100],
  }) as number[];
  
  try {
    Vibration.vibrate(pattern);
  } catch (error) {
    console.log('Vibration error:', error);
  }
};

// Initialize sound (placeholder for future sound file implementation)
export const initSound = () => {
  // Placeholder: When you add a real coin.mp3 file to android/app/src/main/res/raw/
  // and ios sound folder, you can uncomment and use react-native-sound here
  console.log('Sound system ready (using vibration for now)');
};

// Clean up (placeholder for future implementation)
export const releaseSound = () => {
  // Placeholder for cleanup when using actual sound files
};

