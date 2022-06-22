/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary:"#353988"
      },
      minWidth: {
        260: '260px',
      },
    },
  },
  plugins: [],
};
