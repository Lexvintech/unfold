/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
        },
        emerald: {
          DEFAULT: '#059669',
          bright: '#10B981',
        },
        gold: {
          DEFAULT: '#D97706',
          bright: '#F59E0B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
}
