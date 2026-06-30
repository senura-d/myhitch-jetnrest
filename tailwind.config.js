/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        booking: {
          dark: "#001122",       // Ultra dark royal blue background
          navy: "#002244",       // Deep royal blue
          blue: "#003580",       // Official Booking Royal Blue
          accent: "#2563eb",     // Bright royal blue accent
          amber: "#3b82f6",      // Medium royal blue
          slate: "#f8fafc",      // Warm off-white
          border: "#e2e8f0",     // Soft gray border
          text: "#0f172a",       // Dark text
          muted: "#64748b",      // Muted slate gray
        }
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        'premium': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.15)',
        'soft-glow': '0 0 20px rgba(37, 99, 235, 0.25)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
