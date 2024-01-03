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
        border: "var(--eddies-border)",
        muted: "var(--eddies-muted)",
        hover: "var(--eddies-hover)",
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
  plugins: [],
};
