const { nextui, colors } = require('@nextui-org/theme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 10s ease-in-out infinite",
      },
      colors: {
        "primary": "#fb791f",
        "secondary": "#4fd1c5",
        "bgColor": "#242424"
      }
    },


  },
  plugins: [nextui(), require('flowbite/plugin')],
};
