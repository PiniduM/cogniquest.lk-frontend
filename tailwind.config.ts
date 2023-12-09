import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgba(105, 105, 105, 1)",
          dark: "rgba(255, 255, 255, 1)",
          light: "rgba(105, 105, 105, 1)",
        },
        secondary: {
          DEFAULT: "#f5f5f5",
          dark: "#f5f5f5",
          light: "#f5f5f5",
        },
        tertiary: {
          DEFAULT: "#f5f5f5",
          dark: "#f5f5f5",
          light: "#f5f5f5",
        },
        background: {
          DEFAULT: "back",
          dark: "#f5f5f5",
          light: "#f5f5f5",
        }
      },
    },
  },
  plugins: [],
};

export default config;
