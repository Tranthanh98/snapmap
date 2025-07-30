/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode support
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#fab300", // Yellow
        secondary: "#005248", // Green
        // Custom semantic colors that follow our design system
        background: "#333333",
        "primary-text": "white",
        "label-text": "#687076",
        "primary-icon": "#687076",
        "app-tint": "#fab300",
      },
    },
  },
  plugins: [],
};
