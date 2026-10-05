/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#050505',
          card: '#0b0b0c',
          deep: '#020202',
        },
        bone: {
          DEFAULT: '#e8e4dc',
          dim: '#c2beb4',
        },
        ash: {
          DEFAULT: '#6f6f73',
          dark: '#303033',
        },
        blood: {
          DEFAULT: '#8c0a14',
          glow: '#b3121f',
          dark: '#4d050a',
        },
        gold: {
          tarnished: '#a88a4a',
        },
      },
      fontFamily: {
        bootzy: ['"Bootzy"', 'sans-serif'],
        gothic: ['"Bootzy"', 'sans-serif'],
        serif: ['"Bootzy"', 'sans-serif'],
        sans: ['"Bootzy"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.45em',
      },
    },
  },
  plugins: [],
}
