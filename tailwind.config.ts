import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#06070A',
          soft: '#0A0C12',
          card: '#0E1018',
          line: 'rgba(255,255,255,0.08)',
        },
        violet: {
          glow: '#7C5CFF',
        },
        cyan: {
          glow: '#22D3EE',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(110deg, #7C5CFF 0%, #5B8DEF 45%, #22D3EE 100%)',
        'radial-fade':
          'radial-gradient(60% 60% at 50% 0%, rgba(124,92,255,0.18) 0%, rgba(6,7,10,0) 70%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
