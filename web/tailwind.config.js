/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F97316',       // Laranja Vibrante (Ação principal)
        'primary-hover': '#C2410C', // Laranja mais escuro (Hover)
        secondary: '#0F172A',     // Azul Marinho Profundo (Texto forte / Fundo escuro)
        tertiary: '#334155',      // Cinza Azulado (Textos secundários)
        background: '#F8FAFC',    // Fundo da página (Branco gelo)
        surface: '#FFFFFF',       // Fundo dos cards (Branco puro)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Troquei a fonte serifada por uma Sans (mais moderna)
      }
    },
  },
  plugins: [],
}