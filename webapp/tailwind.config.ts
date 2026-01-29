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
          DEFAULT: '#3d2817',
          dark: '#2d1f12',
          light: '#5c3d2e',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
        },
        chocolate: {
          dark: '#3D2817',
          medium: '#8B6F47',
          milk: '#C7A882',
          light: '#E6D7C2',
          cream: '#FFF8E7',
          'light-text': '#A08A70',
          'light-border': '#D1C0A8',
        },
        'nougat-gold': '#D4AF37',
        caramel: '#C68642',
        candy: {
          pink: '#ffc0cb',
          purple: '#e9c9ff',
          yellow: '#fffacd',
        },
        secondary: {
          DEFAULT: '#6b5b4e',
          dark: '#4a3f35',
        },
        success: '#10b981',
        error: '#f87171',
        warning: '#fbbf24',
        'status-pending': '#fbbf24',
        'status-completed': '#10b981',
        'status-approved': '#60a5fa',
        'status-rejected': '#f87171',
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
