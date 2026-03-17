/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brandPrimary: '#3A5A40',
        brandSecondary: '#588157',
        brandAccent: '#A3B18A',
        brandBackground: '#DAD7CD',
        brandDark: '#344E41',
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: false,
  },
};
