/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Arial"],
        serif: ["Fraunces", "ui-serif", "Georgia"]
      },
      colors: {
        ink: "#111111"
      }
    },
  },
  plugins: [],
}
