/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'bounce': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'from-blue-500',
    'to-purple-600',
    'from-emerald-500',
    'to-teal-600',
    'from-purple-500',
    'to-pink-600',
    'backdrop-blur-sm',
    'bg-white/80',
    'bg-white/70',
    'border-gray-200/50',
    'transform',
    'hover:scale-105',
    'hover:-translate-y-1',
    'hover:-translate-y-2',
    'transition-all',
    'duration-200',
    'duration-300',
    'shadow-xl',
    'hover:shadow-xl',
    'hover:shadow-2xl',
  ]
}