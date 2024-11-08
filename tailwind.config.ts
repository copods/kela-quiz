import type { Config } from "tailwindcss"

export default {
  important: true,
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#353988",
        primaryHover: "#141649",
        primaryDisabled: "#A2A4D6",
        primaryOutlined: "#141649",
        questionBackground: "#F0F0F0",
        hover: "#F8FBFF",
        feedbackColor: "#2A3342",
        tableBorder: "#DFE5E9",
        tableBg: "#F9FBFC",
      },
      minWidth: {
        sectionCard: "400px",
        200: "200px",
        260: "260px",
        184: "184px",
        96: "384px",
        4: "16px",
        554: "554px",
        109: "438px",
      },
      height: {
        cooldownSVG: "355px",
        728: "728px",
        3.25: "52px",
      },
      width: {
        sectionCard: `30%`,
        356: "356px",
        coolDownCard: "1046px",
        cooldownSVG: "389px",
        438: "438px",
        358: "358px",
        728: "728px",
      },
      maxWidth: {
        554: "554px",
        454: "454px",
        96: "384px",
        75: "300px",
        32: "128px",
      },
      minHeight: {
        480: "480px",
        16: "64px",
        2.875: "46px",
      },
      maxHeight: {
        352: "352px",
        280: "280px",
      },
      borderRadius: {
        1: "1px",
        52: "52px",
      },
      borderWidth: {
        3: "3px",
      },

      boxShadow: {
        base: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        tableShadow: "0px 10px 20px rgba(0,0,0,0.04)",
        cardShadow: "0px_1px_10px_rgba(0,0,0,0.08)",
      },
      gridTemplateColumns: {
        18: "repeat(18, minmax(0, 1fr))",
      },
      padding: {
        13: "13px",
        18: "18px",
        22: "22px",
        54: "54px",
        86: "86px",
      },
    },
  },
  plugins: [],
} satisfies Config
