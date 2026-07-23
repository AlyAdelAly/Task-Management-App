/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4f3',
          100: '#e0e9e7',
          200: '#c5d6d1',
          300: '#a6c0b9',
          400: '#84a89f',
          500: '#659287',
          600: '#53786f',
          700: '#426059',
        }
      }
    }
  }
}
