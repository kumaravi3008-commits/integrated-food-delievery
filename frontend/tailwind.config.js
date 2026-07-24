import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f97316",
          dark: "#0f0f0f",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#f97316",         // Bright vibrant orange
          "primary-focus": "#ea580c",   // Deeper orange on hover
          secondary: "#fb923c",       // Soft orange accent
          accent: "#fdba74",          // Warm highlight
          neutral: "#1a1a1a",         // Dark panel/card background
          "base-100": "#000000",      // Main background (pure black)
          "base-200": "#0f0f0f",      // Secondary background (off-black)
          "base-300": "#1f1f1f",      // Borders / overlays
          "base-content": "#f3f4f6",  // Default text color (bright light gray)
        },
      },
    ],
    defaultTheme: "dark",
  },
};