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
    fontFamily: {
      sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
    },
    fontSize: {
      'h1-title': ['72px', { lineHeight: '86px', fontWeight: '600' }],
      'h3-title': ['56px', { lineHeight: '68px', fontWeight: '300' }],
    },
  },
  plugins: [],
};
