import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: '#FFC300',
        maindark: '#E4AF00',
        mainblue: '#219EBC',
        mainsky: '#8ECAE6',
        highlight: '#003566',
        background: '#F8F8F8',
        arrow: '#E8E8E8',
      },
      keyframes: {
        slowXMovement: {
          '0%, 100%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(20px)' },
        },
        slowYMovement: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fastYMovement: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-122px)' },
        },
      },
      animation: {
        'slowXMovement-6s': 'slowXMovement 6s linear infinite',
        'slowXMovement-8s': 'slowXMovement 8s linear infinite',
        'slowXMovement-10s': 'slowXMovement 10s linear infinite',
        'slowYMovement-4s': 'slowYMovement 4s linear infinite',
        'wiggle-8s': 'wiggle 8s linear infinite',
        'fastYMovement-1s': 'fastYMovement 0.8s forwards',
      },
    },
  },
  plugins: [],
};

export default config;
