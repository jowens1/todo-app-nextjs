/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'weird-gray': '#e0e5ec',
      },
      boxShadow: {
        frame:
          '-7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001',
        shaded:
          '-7px -7px 20px 0px #fff5, -4px -4px 5px 0px #fff5, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001',
        pressed:
          'inset -7px -7px 20px 0px #0002, inset -4px -4px 5px 0px #0001, inset 7px 7px 20px 0px #0002, inset 4px 4px 5px 0px #0001, inset -7px 7px 20px 0px #0002, inset -4px 4px 5px 0px #0001, inset 7px -7px 20px 0px #0002, inset 4px -4px 5px 0px #0001',
        input:
          'inset -7px -7px 20px 0px #fff9, inset -4px -4px 5px 0px #fff9, inset 7px 7px 20px 0px #0002, inset 4px 4px 5px 0px #0001',
      },
    },
  },
  plugins: [],
};
