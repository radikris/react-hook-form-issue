/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
  ],
  theme: {
    extend: {
      colors: 
      { 'Brand-Primary': '#e84caa',
        'Brand-Secondary': '#eda3aa',
        'Brand-Tertiary': '#645daa',
        'Text-Primary': '#3e44aa',
        'Text-Secondary': '#7e7eaa',
        'Text-Tertiary': '#cacaaa',
        'Background': '#f8f5aa',
        'White': '#ffffff' },
    },
  },
  plugins: [],
}