/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        BrightBlue: "hsl(220, 98%, 61%)",
        VeryLightGray: "hsl(0, 0%, 98%)",
        VeryLightGrayishBlue: "hsl(236, 33%, 92%)",
        LightGrayishBlue: "hsl(233, 11%, 84%)",
        DarkGrayishBlue: "hsl(236, 9%, 61%)",
        VeryDarkGrayishBlue: "hsl(235, 19%, 35%)",
      },
      spacing: {
        floatButton: "540px",
        sizeImg: "40px",
      },
    },
    minHeight: {
      heightMin: "300px",
      screen: "100vh",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
