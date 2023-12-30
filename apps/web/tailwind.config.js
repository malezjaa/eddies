/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    `src/**/*.{js,ts,jsx,tsx}`,
    "../../packages/eddies/src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eddies: {
          bg: "#00ff00",

          dark: {
            bg: "#00ff00",
          },
        },
      },
    },
  },
  plugins: [],
};
