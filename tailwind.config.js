/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['monospace'],
      },
      colors: {
        'pixel-gold': '#ffd700',
        'pixel-orange': '#ff8c00',
        'pixel-green': '#00ff00',
        'pixel-blue': '#646cff',
        'pixel-dark': '#1a1a1a',
        'pixel-darker': '#000000',
      },
      boxShadow: {
        'pixel': '4px 4px 0px rgba(0, 0, 0, 0.3)',
        'pixel-glow': '0 0 10px rgba(255, 215, 0, 0.5)',
        'pixel-green-glow': '0 0 10px rgba(0, 255, 0, 0.5)',
      },
      animation: {
        'pixel-pulse': 'pixel-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pixel-glow': 'pixel-glow 2s ease-in-out infinite alternate',
        'scanlines': 'scanlines 0.1s linear infinite',
      },
      keyframes: {
        'pixel-pulse': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        'pixel-glow': {
          'from': {
            textShadow: '0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700',
          },
          'to': {
            textShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700',
          },
        },
        'scanlines': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 2px' },
        },
      },
    },
  },
  plugins: [],
}