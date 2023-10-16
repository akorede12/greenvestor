/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}",
    "./public/**/*.html",
    "node_modules/preline/dist/*.js",
  ],
  plugins: [require("preline/plugin"), require("flowbite/plugin")],
  theme: {},
};
