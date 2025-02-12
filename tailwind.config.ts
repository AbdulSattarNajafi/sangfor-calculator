import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pdf/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#04be02",
        blue: "#0d6efd",
        "blue-secondary": "#0053b8",
        "blue-tertiary": "#0b2651",
        "dark-blue": "#000c29",
        "color-gray": "#ededed",
      },
      backgroundImage: {
        "section-bg": "url('/section-bg.webp')",
        "not-found": "url('/not-found-bg.webp')",
      },
      boxShadow: {
        md: "0 0 12px 0px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
