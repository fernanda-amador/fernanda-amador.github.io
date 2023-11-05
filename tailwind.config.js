/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        val: {
          ...require("daisyui/src/theming/themes")["[data-theme=valentine]"],
          "base-100": "#fff5f6",
        },
      },
    ],
  },
};

