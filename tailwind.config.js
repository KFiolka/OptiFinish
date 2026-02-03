/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "primary-glow": "#3b82f6", 
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-dark": "#1c2630",
        "surface-darker": "#161e26",
        "surface-light": "#ffffff",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "2xl": "1rem"
      },
      boxShadow: {
        'glow': '0 0 20px rgba(19, 127, 236, 0.5)',
        'glow-intense': '0 0 30px rgba(19, 127, 236, 0.8)',
      }
    },
  },
  plugins: [],
}
