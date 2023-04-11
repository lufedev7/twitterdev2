/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        fontG: ['Noto Serif', 'serif'],
        fontBebas: ['Bebas Neue', 'cursiv'],
        fontConfort: ['Comfortaa', 'cursive']
      },
      screens: {
        mobileg: '520px',
        mdmobile: '818px'
        // => @media (min-width: 450px) { ... }
      }
    }
  },
  plugins: []
}
