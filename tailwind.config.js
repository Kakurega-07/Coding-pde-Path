/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./constants.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        p5: {
          blue: '#006699',      // Processing Blue
          text: '#111827',      // Almost Black
          subtext: '#4B5563',   // Dark Gray
          border: '#E5E7EB',    // Light Gray Border
          bg: '#FFFFFF',        // Pure White
          codeBg: '#F3F4F6',    // Code block background
        }
      },
    },
  },
  plugins: [],
}