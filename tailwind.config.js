module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      "6xl": "3.75rem",
      "5.5xl": "3.35rem",
      "5xl": "3rem",
      "4.5xl": "2.67rem",
      "4xl": "2.26rem",
      "3.5xl": "2rem",
      "3xl": "1.875rem",
      "2.5xl": "1.67rem",
      "2xl": "1.335rem",
      xl: "1.25rem",
      lg: "1.125rem",
      base: "1rem",
      sm: ".890rem",
      xs: ".7778rem",
    },

    maxWidth: {
      default: "1440px",
      tablet: "768px",
      medium: "16rem",
      xl: "47rem",
      "1.8xl": "56rem",
      "2xl": "75rem",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    extend: {
      spacing: {
        buttonY: "16px",
        buttonX: "40px",
        3: ".75rem",
        3.5: ".88rem",
        4: "1rem",
        7: "1.77rem",
        5.5: "1.45rem",
        2.9: "13px",
        2.8: "12px",
        2.5: ".65rem",
        2: ".5rem",
        1.2: ".32rem",
        xs: "2px",
      },
      width: {
        imageW: "250px",
        medium: "15rem",
        large: "20rem",
        Xlarge: "30rem",
        twoThirds: "66%",
      },
      height: {
        imageH: "332px",
        imageH_sm: "22rem",
      },
    },
  },
  plugins: [],
};
