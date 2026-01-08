/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'viola-purple': '#ff1493',      // Deep pink
        'viola-dark': '#c71585',        // Medium violet red
        'viola-light': '#ffb6d9',       // Light pink
        'viola-accent': '#ff69b4',      // Hot pink
      },
      backgroundImage: {
        'fun-pattern': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><defs><pattern id=\"fun\" patternUnits=\"userSpaceOnUse\" width=\"100\" height=\"100\"><circle cx=\"25\" cy=\"25\" r=\"20\" fill=\"rgba(255,105,180,0.1)\"/><path d=\"M50 50 Q60 40 70 50 T90 50\" stroke=\"rgba(255,20,147,0.1)\" fill=\"none\" stroke-width=\"2\"/><polygon points=\"35,75 45,65 55,75\" fill=\"rgba(255,182,193,0.1)\"/></pattern></svg>')",
      },
    },
  },
  plugins: [],
};
