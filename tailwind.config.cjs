/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fira: ['Fira Sans', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
