/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: "#3B4971",
        "darkest-blue": "#041D2D",
        "dark-blue": "#281DC4",
        blue: "#0088EC",
        "light-blue": "#75D9FF",
        "lightest-blue": "#94F8FF",
      },
      borderRadius: {
        small: "2px",
      },
      boxShadow: {
        "light-blue": "0px 0px 4px 3px rgba(148, 248, 255, 0.25);",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
