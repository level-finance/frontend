const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: [
        /^shadow/,
        /^bg/,
        /^text/,
        /^border/,
        /^from/,
        /^to/,
        /^dark:/,
        /^hover:/,
        'dark',
        /^dark:/,
        /^mr/,
        /^w/
      ]
    }
  },
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    fontFamily: {
      body: [
        'courier-std',
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"'
      ],
      secondary: [
        'Bord Demo',
        'sans-serif',
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"'
      ]
    },
    boxShadow: {
      sm: 'none',
      DEFAULT: '0px 4px 10px rgba(254, 153, 0, 0.4)',
      lg: 'none',
      xl: 'none',
      inner: 'none',
      none: 'none'
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.100', 'currentColor')
    }),
    screens: {
      xs: '440px',
      ...defaultTheme.screens
    },
    extend: {
      height: {
        '112': '28rem'
      },
      borderRadius: {
        '20px': '20px'
      },
      borderWidth: {
        '3': '3px'
      },
      colors: {
        black: {
          DEFAULT: '#323232'
        },
        gray: {
          DEFAULT: '#868686',
          50: '#F8FAFC',
          100: '#EFEFF1',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          850: '#162031',
          900: '#323232',
          dark: '#323232',
          light: '#D8D8D8'
        },
        green: {
          DEFAULT: '#60D09A',
          400: '#bfecd7',
          500: '#60D09A',
          600: '#00BF63',
          dark: '#2EB67D'
        },
        zimablue: {
          DEFAULT: '#00FFFF'
        },
        orange: {
          DEFAULT: '#FE9900',
          600: '#FE9900'
        },
        primary: {
          50: '#53555e',
          100: '#494b54',
          200: '#3f414a',
          300: '#353740',
          400: '#2b2d36',
          500: '#21232c',
          600: '#171922',
          700: '#0d0f18',
          800: '#03050e',
          900: '#000004'
        },
        'primary-dark': {
          50: '#6a7cff',
          100: '#6072ff',
          200: '#5668ff',
          300: '#4c5eff',
          400: '#4254ff',
          500: '#384aff',
          600: '#2e40f5',
          700: '#2436eb',
          800: '#1a2ce1',
          900: '#1022d7'
        },
        blue: {
          50: '#6a7cff',
          100: '#6072ff',
          200: '#5668ff',
          300: '#4c5eff',
          400: '#4254ff',
          500: '#384aff',
          600: '#2e40f5',
          700: '#2436eb',
          800: '#1a2ce1',
          900: '#1022d7'
        },
        pink: {
          50: '#ff4dff',
          100: '#ff43ff',
          200: '#ff39ff',
          300: '#ff2fff',
          400: '#fc25ff',
          500: '#f21bf6',
          600: '#e811ec',
          700: '#de07e2',
          800: '#d400d8',
          900: '#ca00ce'
        },
        red: {
          500: '#ef4444'
        }
      }
    }
  },
  variants: {
    extend: {
      margin: ['first'],
      borderRadius: ['first', 'last'],
      zIndex: ['hover'],
      borderWidth: ['dark', 'last'],
      textColor: ['group-hover', 'hover']
    }
  },
  plugins: []
};
