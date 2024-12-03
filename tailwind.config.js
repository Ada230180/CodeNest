/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7289DA',
          light: '#8EA1E1',
          dark: '#5B73C7',
        },
        gray: {
          850: '#1f2937',
          900: '#111827',
          950: '#0d1117',
        },
        dark: {
          100: '#1E1F22',
          200: '#2B2D31',
          300: '#313338',
          400: '#383A40',
        },
        text: {
          primary: '#F2F3F5',
          secondary: '#B5BAC1',
          muted: '#949BA4',
        }
      },
      fontFamily: {
        code: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
