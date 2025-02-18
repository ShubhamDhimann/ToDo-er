/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "770": "770px",
        'tab': '500px',
        '1100': '1100px',     
      },
    },
  },
  plugins: [],
}