/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/frontend/components/**/*.{jsx,tsx,js,ts}',
    './app/javascript/entrypoint/**/*.{jsx,tsx,js,ts}',
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

