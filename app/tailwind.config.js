/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
    extend: {
      colors: {
        "pink-main": "#ED5380",
        "pink-medium": '#BD4568',
        "pink-light": "#FFE3EB",
        "grey-light": "#EDEDED"
      }
    }
  },
  plugins: [],
}
