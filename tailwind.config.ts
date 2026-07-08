import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Extra-small breakpoint for fine control on small phones (≥480px),
        // complementing the default sm=640/md=768/lg=1024/xl=1280/2xl=1536.
        xs: "480px",
      },
      colors: {
        ivory: "#FFFBF3",
        beige: "#F3F0EB",
        sand: "#E9E4DB",
        navy: {
          DEFAULT: "#043460",
          muted: "#3D6081",
        },
        lime: {
          DEFAULT: "#E1FCAD",
          btn: "#D9F58C",
        },
        ink: "#043460",
        body: "#5B7088",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter-tight)", "Inter Tight", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      maxWidth: {
        container: "1560px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        spinslow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        spinslow: "spinslow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
