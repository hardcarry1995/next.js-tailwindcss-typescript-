/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'manual-fit-screen': 'calc(100vh - 56px)',
        'manual-loading-fit-screen': 'calc(100vh - 326px)',
      },
    },
  },
  plugins: [],
}
