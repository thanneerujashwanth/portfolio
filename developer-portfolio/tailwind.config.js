/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        b: {
          900: '#030306',
          800: '#060609',
          700: '#0A0A10',
          600: '#111118',
          500: '#1A1A24',
        },
        burg: {
          950: '#0F0005',
          900: '#1A0008',
          800: '#2D0012',
          700: '#4A0E20',
          600: '#6B1A2A',
          500: '#8B2040',
          400: '#A0304E',
          300: '#C04060',
          200: '#D96080',
          100: '#F090A8',
        },
        w: {
          DEFAULT: '#FFFFFF',
          90:  'rgba(255,255,255,0.9)',
          70:  'rgba(255,255,255,0.7)',
          50:  'rgba(255,255,255,0.5)',
          30:  'rgba(255,255,255,0.3)',
          10:  'rgba(255,255,255,0.1)',
          5:   'rgba(255,255,255,0.05)',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow':     'spin 20s linear infinite',
        'pulse-slow':    'pulse 4s ease-in-out infinite',
        'float':         'float 5s ease-in-out infinite',
        'scan':          'scan 3s linear infinite',
        'burg-pulse':    'burgPulse 3s ease-in-out infinite',
        'border-flow':   'borderFlow 4s linear infinite',
        'fade-up':       'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float:      { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-14px)'} },
        scan:       { '0%': {top:'-5%'}, '100%': {top:'105%'} },
        burgPulse:  {
          '0%,100%': { boxShadow:'0 0 15px rgba(139,32,64,0.3)' },
          '50%':     { boxShadow:'0 0 50px rgba(139,32,64,0.7), 0 0 100px rgba(139,32,64,0.2)' },
        },
        borderFlow: {
          '0%':   { backgroundPosition:'0% 50%' },
          '50%':  { backgroundPosition:'100% 50%' },
          '100%': { backgroundPosition:'0% 50%' },
        },
        fadeUp: {
          '0%':   { opacity:0, transform:'translateY(20px)' },
          '100%': { opacity:1, transform:'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
