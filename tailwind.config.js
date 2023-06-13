/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        GRAY_900: '#212529',
        GRAY_800: '#343A40',
        GRAY_700: '#495057',
        GRAY_600: '#6C757D',
        GRAY_500: '#ADB5BD',
        GRAY_400: '#CED4DA',
        GRAY_300: '#DEE2E6',
        GRAY_200: '#E9ECEF',
        GRAY_100: '#F5F5F5',
        GRAY_50: '#F8F9FA',
        BLUE_900: '#0D141F',
        BLUE_800: '#18273C',
        BLUE_700: '#223C5E',
        BLUE_600: '#2C4F81',
        BLUE_500: '#3763A4',
        BLUE_400: '#6B8CC9',
        BLUE_300: '#8C9ECB',
        BLUE_200: '#A6B9DB',
        BLUE_100: '#C1D1EA',
        SUCCESS: '#3DD54C',
        ERROR: '#EF4444',
        WARNING: '#FFD015',
      },
    },
  },
  plugins: [],
  safelist: [{ pattern: /ERROR/ }],
};
