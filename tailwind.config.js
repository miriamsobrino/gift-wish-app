/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#8D6E63',
        secondary: '#ffa15c',
        text: '#11181C',
        background: '#fff6de',
        btncolor: '#c9b0ff',
      },
      boxShadow: {
        'hard-black-large': '8px 8px black',
        'hard-black-small': '5px 5px black',
      },
    },
  },
  plugins: [],
};
