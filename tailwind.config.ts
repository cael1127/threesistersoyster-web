import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#b385dc",
        input: "#d0b6eb",
        ring: "#c7effb",
        background: "#a8e2dc",
        foreground: "#9cd1d0",
        primary: {
          DEFAULT: "#b385dc",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#d0b6eb",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#c7effb",
          foreground: "#ffffff",
        },
        mintBrand: {
          DEFAULT: "#a8e2dc",
        },
        seafoamBrand: {
          DEFAULT: "#9cd1d0",
        },
        lavenderBrand: {
          DEFAULT: "#d0b6eb",
        },
        blueBrand: {
          DEFAULT: "#c7effb",
        },
        purpleBrand: {
          DEFAULT: "#b385dc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
