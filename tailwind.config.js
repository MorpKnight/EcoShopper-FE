/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'text-primary': '#222222',
        'text-secondary': '#666666',
        'text-tertiary': '#999999',
        'text-white': '#FFFFFF',
        'secondary-300': '#A1C2CE',
        'secondary-500': '#A17C68',
        'secondary-700': '#826251',
        'tertiary': '#FFE8D1',
        'tertiary-light': '#FFF5EB',
      },
      fontFamily: {
        // inter
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}