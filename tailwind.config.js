/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#353988',
        bgcolor: '#EFF6FF',
      },
      minWidth: {
        260: '260px',
        sectionCard: '330px',
      },
      width: {
        sectionCard: `30%`,
      },
      borderRadius: {
        1: '1px',
      },
    },
  },
  plugins: [],
}
