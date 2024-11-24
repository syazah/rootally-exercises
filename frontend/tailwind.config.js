/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFF6E9",
        primary: "#4335A7",
        tertiary: "#FF7F3E",
      },
    },
  },
  plugins: [],
};
