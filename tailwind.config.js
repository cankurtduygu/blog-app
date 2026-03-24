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
        brandPrimary: '#1B4965',
        brandSecondary: '#5FA8D3',
        brandAccent: '#BEE9E8',
        brandBackground: '#F0F4F8',
        brandDark: '#0B2545',
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: false,
  },
};
