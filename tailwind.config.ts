import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial-light":
          "radial-gradient(var(--tw-gradient-stops-light))",
        "gradient-conic-light":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops-light))",
        "gradient-radial-dark":
          "radial-gradient(var(--tw-gradient-stops-dark))",
        "gradient-conic-dark":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops-dark))",
      },
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
          darker: "#f5f5f5",
          lighter: "#f5f5f5",
        },
        tertiary: {
          DEFAULT: "#f5f5f5",
          dark: "#f5f5f5",
          light: "#f5f5f5",
          darker: "#f5f5f5",
          lighter: "#f5f5f5",
        },

        // Define your color scheme for light and dark themes
        // homeBackground: {
        //   light: [
        //     'rgba(255, 255, 255, 1)',
        //     'rgba(181, 180, 255, 1)',
        //     'rgba(116, 116, 255, 1)',
        //   ],
        //   DEFAULT: [
        //     'rgba(255, 255, 255, 1)',
        //     'rgba(181, 180, 255, 1)',
        //     'rgba(116, 116, 255, 1)',
        //   ],
        //   dark: [
        //     'rgba(112, 69, 163, 1)',
        //     'rgba(80, 47, 114, 1)',
        //     'rgba(37, 19, 47, 1)',
        //   ],
        // },
      },
    },
  },
  plugins: [],
};

export default config;
