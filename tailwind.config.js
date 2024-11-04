/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#222328',
        secondary: '#969AB0',
        accent: '#3545E9',
        warning: '#FEFD54',
        success: '#63C995',
        error: '#E23D69',
        bright: '#FFFFFF',
        muted: '#7C9CBF',
        shade: '#DBE2EA',
      },
    },
  },
  plugins: [],
};
