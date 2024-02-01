import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      animation: {
        blink: "blink 1s step-end infinite"
      },
      keyframes: {
        blink: {
          "0%, 40%, 100%": {
            opacity: "0"
          },
          "40.1%, 99.9%": {
            opacity: "1"
          }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
export default config
