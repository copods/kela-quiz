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
        sectionCard: '330px',
      },
      width: {
        sectionCard: `30%`,
      },
      borderRadius: {
        1: '1px',
        52: '52px',
      },
      boxShadow: {
        table:
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      },
      maxHeight: {
        83: '83.3%',
      },
    },
  },
  plugins: [],
}
