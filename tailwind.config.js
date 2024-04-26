/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif'],
        baloo: ['"Baloo 2"', 'sans-serif'],
      },
      bg: {
        mainBackground: '#FAFAFA',
      },
    },
  },
  plugins: [],
}
