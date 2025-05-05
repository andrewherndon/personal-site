import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "#8B2323", // Deeper crimson background
        foreground: "#FFFFFF", // White text
        gold: "#D4AF37",      // Rich gold accent color
        text: "#FFFFFF",      // White text
        "text-alt": "#000000", // Alternative black text for contrast
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "#D4AF37", // Set primary to gold color
          foreground: "#8B2323", // Set primary foreground to background color
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#171717",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#D4AF37",  // Match gold for accent
          foreground: "#171717",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#171717",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
        xl: "1rem",
      },
      boxShadow: {
        "gold-drop": "2px 2px 4px rgba(0, 0, 0, 0.6)",
        "card": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
              fontFamily: 'var(--font-roboto), system-ui, sans-serif',
            },
            h2: {
              color: '#D4AF37',
              fontFamily: 'var(--font-roboto), system-ui, sans-serif',
            },
            a: {
              color: '#D4AF37',
              '&:hover': {
                color: '#8B2323',
              },
            },
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;