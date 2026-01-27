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
          DEFAULT: '#1f2937',
          dark: '#111827',
        },
        accent: {
          DEFAULT: '#d97706',
          dark: '#b45309',
        },
        secondary: {
          DEFAULT: '#4b5563',
          dark: '#374151',
        },
        success: '#22c55e',
        error: '#ef4444',
        'status-pending': '#f59e0b',
        'status-completed': '#22c55e',
        'status-approved': '#3b82f6',
        'status-rejected': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
