// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // if you store code in /src
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'float-x': {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        'float-y': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'twinkle': {
          '0%,100%': { opacity: '0.8' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'float-x': 'float-x 10s ease-in-out infinite alternate',
        'float-y': 'float-y 12s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
