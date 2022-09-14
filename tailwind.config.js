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
        questionBackground: '#F0F0F0',
      },
      minWidth: {
        200: '200px',
        260: '260px',
        184: '184px',
        96: '384px',
        sectionCard: '330px',
        16: '16px',
      },
      width: {
        sectionCard: `30%`,
      },
      maxWidth: {
        554: '554px',
        16: '16px',
      },
      minHeight: {
        480: '480px',
      },
      borderRadius: {
        1: '1px',
        52: '52px',
      },
      borderWidth: {
        3: '3px',
      },

      boxShadow: {
        base: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      },
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
      padding: {
        17: '17px',
        18: '18px',
        22: '22px',
      },
    },
  },
  plugins: [],
}
