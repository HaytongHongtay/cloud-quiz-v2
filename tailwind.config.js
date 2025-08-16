// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx}',       // optional, for safety
    './pages/**/*.{js,ts,jsx,tsx}',     // optional, for safety
    './components/**/*.{js,ts,jsx,tsx}' // optional, for safety
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
