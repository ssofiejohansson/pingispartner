/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,vue,css}", "!./node_modules/**/*"],
  theme: {
    extend: {
      screens: {
        "to-md": { max: "768px" },
        "to-lg": { max: "1023px" },
        "to-xl": { max: "1279px" },
      },
      container: {
        padding: "20px",
        center: true,
      },
      maxWidth: {
        "wide-container": "1920px",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.95rem",
        base: "1rem",
        lg: "1.4rem",
        xl: "1.75rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
        "5xl": "5rem",
        "6xl": "6rem",
        "7xl": "7rem",
        "m-xs": "0.5rem",
        "m-sm": "0.75rem",
        "m-base": "0.85rem",
        "m-lg": "1rem",
        "m-xl": "1.25rem",
        "m-2xl": "1.5rem",
        "m-3xl": "2.5rem",
        "m-4xl": "3rem",
        "m-5xl": "4rem",
        "m-6xl": "5rem",
        "m-7xl": "6rem",
      },

      /* Brand colors */
      colors: {
        primary:  "#008650", //  main green
        primaryDark: "#02693f", // 02693f dark green
        light: "#f8f2f1", // light
        dark: "#242424", // dark
        accent: "#ed6b44", // accent red
      },

       fontFamily: {
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
