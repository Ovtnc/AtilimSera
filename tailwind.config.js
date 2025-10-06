/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#22c55e", // Yeşil
        "secondary": "#6b7280", // Gri
        "background-light": "#ffffff", // Beyaz
        "background-dark": "#1f2937", // Koyu gri
        "background-section": "#f9fafb", // Açık gri
        "text-primary": "#111827", // Koyu gri/siyah
        "text-secondary": "#6b7280", // Orta gri
        "text-light": "#9ca3af", // Açık gri
      },
      fontFamily: {
        "display": ["Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}