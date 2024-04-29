/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/.vitepress/**/*.{html,js,ts,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        'leaves': "url('/assets/images/leaves.jpg')",
      },
      colors: {
        'grey': '#231f20',
        'pink': '#ef60a2',
        'purple': '#6a4f9e',
        'white': '#f8cde0'
      }
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '16': '50rem',
    },
  },
  plugins: [],
}

