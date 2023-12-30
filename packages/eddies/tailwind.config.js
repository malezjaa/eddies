/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark-theme"],
  content: [
    "../../packages/eddies/src/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    `src/**/*.{js,ts,jsx,tsx}`,
  ],
  prefix: "eddies-",
  theme: {
    extend: {
      colors: {
        stone: {
          50: "var(--stone-50)",
          100: "var(--stone-100)",
          200: "var(--stone-200)",
          300: "var(--stone-300)",
          400: "var(--stone-400)",
          500: "var(--stone-500)",
          600: "var(--stone-600)",
          700: "var(--stone-700)",
          800: "var(--stone-800)",
          900: "var(--stone-900)",
        },
        border: "var(--border)",
        color: {
          bg: {
            DEFAULT: "var(--eddies-bg-color)",
            secondary: "var(--eddies-bg-secondary-color)",
          },
          text: {
            DEFAULT: "var(--eddies-text-color)",
            secondary: "var(--eddies-text-secondary-color)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
