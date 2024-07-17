/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        contessa: {
          50: '#fbf6f5',
          100: '#f6ecea',
          200: '#f0dcd8',
          300: '#e4c3bd',
          400: '#d3a096',
          500: '#ba7264',
          600: '#aa6558',
          700: '#8e5347',
          800: '#77463d',
          900: '#643f38',
          950: '#351e1a',
        },
      },
      screens: {
        xs: '350px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [require('daisyui')],
}

