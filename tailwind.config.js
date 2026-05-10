// Tailwind configuration with custom brand color palette and typography
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#F4A535", // Primary — buttons, active states, highlights
        olive: "#3D5A3E", // Secondary — navbar, footer, dark surfaces
        terracotta: "#C1603A", // Accent — category badges, tags
        parchment: "#FAF7F2", // App background
        charcoal: "#1E1E1E", // Primary text
        muted: "#7A7A72", // Secondary/metadata text
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
