import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Dark Chocolate
        primary: {
          DEFAULT: '#4A2C2A',
          light: '#6B4C4A',
          dark: '#331F1D',
        },
        // Secondary - Milk Chocolate
        secondary: {
          DEFAULT: '#8B6F47',
          light: '#A68968',
          dark: '#6B5537',
        },
        // Accent - Gold
        accent: {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
          dark: '#B8941D',
        },
        // Backgrounds
        background: {
          DEFAULT: '#FFF9F0',
          light: '#FFFFFF',
          dark: '#F5E6D3',
        },
        // Status
        status: {
          pending: '#FFD700',
          completed: '#2196F3',
          approved: '#4CAF50',
          rejected: '#F44336',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

