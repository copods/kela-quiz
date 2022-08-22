/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#353988',
        bgcolor: '#EFF6FF',
        whiteShadeOne: '#F0FDF4',
        borderColor: '#E5E7EB',
        tableHeader: '#f3f4f6',
        totalCount: '#4B5563',
      },
      minWidth: {
        260: '260px',
        301: '320px',
        sectionCard: '330px',
      },
      width: {
        sectionCard: `30%`,
      },
      borderRadius: {
        1: '1px',
        52: '52px',
      },
    },
  },
  plugins: [],
}
