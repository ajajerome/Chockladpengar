import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5A3C',
          dark: '#6B4423',
          light: '#A67C52',
        },
        accent: {
          DEFAULT: '#FFD700',
          dark: '#D4AF37',
          light: '#FFE55C',
        },
        chocolate: {
          dark: '#6B4423',
          medium: '#8B5A3C',
          milk: '#A67C52',
          light: '#C7A882',
          cream: '#FFF8F0',
        },
        choki: {
          bg: '#FFF8F0',
          card: '#FFFFFF',
          brown: '#8B5A3C',
          'brown-dark': '#6B4423',
          gold: '#FFD700',
          'gold-dark': '#D4AF37',
          pink: '#FF9999',
          'pink-light': '#FFE4E4',
          coral: '#FFB4A2',
          yellow: '#FFE55C',
          cream: '#FFFBF0',
          beige: '#F5E6D3',
          blue: '#A8D8FF',
          green: '#B4E7CE',
          purple: '#E5CCFF',
          orange: '#FFBD7F',
        },
        'nougat-gold': '#FFD700',
        caramel: '#C68642',
        secondary: {
          DEFAULT: '#A67C52',
          dark: '#8B5A3C',
        },
        success: '#4CAF50',
        error: '#FF6B6B',
        warning: '#FFB74D',
        'status-pending': '#FFB74D',
        'status-completed': '#4CAF50',
        'status-approved': '#64B5F6',
        'status-rejected': '#FF6B6B',
      },
      fontFamily: {
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 30px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
