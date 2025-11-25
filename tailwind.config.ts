import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black Mirror Color System
        "black-mirror": "#000000",
        "dark-panel": "#0a0a0a",
        darker: "#050505",

        // Neon Accents
        "neon-cyan": "#00d9ff",
        "neon-blue": "#0ea5e9",
        "neon-red": "#ff0033",
        "neon-green": "#00ff88",
        "neon-yellow": "#ffb300",

        // Grays
        "cold-gray": "#8b8b8b",
        "ice-white": "#e0e0e0",
      },
      fontFamily: {
        mono: ["Space Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 217, 255, 0.3)",
        "glow-cyan-strong":
          "0 0 30px rgba(0, 217, 255, 0.6), 0 0 60px rgba(0, 217, 255, 0.3)",
        "glow-red": "0 0 20px rgba(255, 0, 51, 0.4)",
        "glow-green": "0 0 20px rgba(0, 255, 136, 0.4)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        glitch: "glitch 0.3s",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 217, 255, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.6)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
