/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c1100',
          dark: '#1a0a00',
          light: '#4a2510',
        },
        secondary: {
          DEFAULT: '#735847',
          dark: '#5a4538',
          light: '#a68674',
        },
        accent: {
          DEFAULT: '#d4a574',
          light: '#e8c9a8',
        },
        neutral: {
          lightest: '#faf8f6',
          light: '#f5f0eb',
          DEFAULT: '#e8e0d8',
          dark: '#d4ccc4',
        },
        govt: {
          saffron: '#ff9933',
          green: '#138808',
          blue: '#000080',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
