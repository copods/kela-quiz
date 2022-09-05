/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#353988',
        primaryHover: '#141649',
        primaryDisabled: '#A2A4D6',
        primaryOutlined: '#141649',
        primaryOutlinedDisabled: '#A2A4D6',
        tableHeader: '#f3f4f6',
      },
      minWidth: {
        260: '260px',
        200: '200px',
        184: '184px',
        sectionCard: '330px',
      },
      borderRadius: {
        1: '1px',
        52: '52px',
      },
      boxShadow: {
        base: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      },
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
      padding: {
        17: '17px',
      },
    },
  },
  plugins: [],
}
