/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      // "Marigold Noir": dark theatrical base + festival accents
      colors: {
        night: "#0D0A09",
        ember: "#171210",
        coal: "#221A16",
        marigold: "#FFA928",
        saffron: "#F26B1D",
        rani: "#E11D5C",
        cream: "#FFF3DE",
        sand: "#CDB9A3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(3rem,10.5vw,9.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        display: ["clamp(2.6rem,6.2vw,5.5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        title: ["clamp(2rem,4.2vw,3.6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(255,169,40,0.45)",
        rani: "0 0 60px -10px rgba(225,29,92,0.45)",
      },
    },
  },
  plugins: [],
};
