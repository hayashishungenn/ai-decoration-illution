/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        accent: '#19C37D',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'breath': 'breath 2s ease-in-out infinite',
        'progress': 'progress 2.5s ease-out forwards',
      },
      keyframes: {
        breath: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '99%' },
        },
      },
    },
  },
  plugins: [],
}
