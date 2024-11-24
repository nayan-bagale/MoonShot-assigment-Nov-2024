/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "Accent":"#E54065",
        "Background": "#F4F5F9",
        "Border":"#CFD2DC",
        "Text":"#636363",
        "Filter-Button":"#E1E4EA",
        "Read-Background":"#F2F2F2"
      }
    },
  },
  plugins: [],
};

