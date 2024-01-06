import formPlugin from "@tailwindcss/forms"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#ca8544",
        "secondary-color": "#d4ab85",
      },
    },
  },
  plugins: [formPlugin],
}
