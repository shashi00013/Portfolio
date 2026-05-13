/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: '#050508',
        carbon: '#0d0d12',
        slate: '#13131a',
        muted: '#8b8b9e',
        ghost: '#c8c8d8',
        pure: '#f0f0f5',
        electric: '#4f9eff',
        neon: '#00d4ff',
        ember: '#ff6b35',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
