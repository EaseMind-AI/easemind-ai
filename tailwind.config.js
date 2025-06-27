module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#7C3AED", // Purple
          light: "#E9D8FD",
        },
        accent: {
          mint: "#A7F3D0", // Mint
          yellow: "#FDE68A", // Yellow
        },
      },
    },
  },
  plugins: [],
}
