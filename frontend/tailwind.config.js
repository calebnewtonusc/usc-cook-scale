/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cook-red': '#DC2626',
        'cook-yellow': '#FBBF24',
      },
    },
  },
  plugins: [],
}
