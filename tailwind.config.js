/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/javascript/**/*.{js,jsx,ts,tsx}",
    "./app/views/**/*.{html.erb}",
    './app/assets/stylesheets/**/*.{scss,css}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};