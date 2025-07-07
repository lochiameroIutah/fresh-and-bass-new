/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gold: '#fbbf24', // yellow-400
          blue: '#60a5fa', // blue-400  
          white: '#ffffff',
        },
      },
      animation: {
        glow: "glow 3s ease-in-out infinite alternate",
        fadeInUp: "fadeInUp 1s ease-out",
        slideInLeft: "slideInLeft 1s ease-out",
        slideInRight: "slideInRight 1s ease-out",
        "zoom-in": "zoom-in 1.5s ease-out",
      },
      keyframes: {
        glow: {
          "0%": { textShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #fbbf24" },
          "100%": { textShadow: "0 0 20px #fbbf24, 0 0 30px #fbbf24, 0 0 40px #fbbf24" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
