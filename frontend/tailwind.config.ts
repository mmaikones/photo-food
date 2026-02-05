import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          DEFAULT: "#6366F1"
        },
        accent: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          DEFAULT: "#8B5CF6"
        },
        bg: {
          page: "var(--color-bg-page)",
          card: "var(--color-bg-card)",
          "card-hover": "var(--color-bg-card-hover)",
          elevated: "var(--color-bg-elevated)",
          input: "var(--color-bg-input)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)"
        },
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
          focus: "var(--border-focus)"
        },
        success: {
          DEFAULT: "#10B981",
          500: "#10B981",
          600: "#059669"
        },
        warning: {
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
          600: "#D97706"
        },
        error: {
          DEFAULT: "#EF4444",
          500: "#EF4444",
          600: "#DC2626"
        }
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"]
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(15, 23, 42, 0.04)",
        sm: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
        md: "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
        lg: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
        xl: "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
        "2xl": "0 25px 50px -12px rgba(15, 23, 42, 0.15)",
        "glow-primary": "0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1)",
        "glow-accent": "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
        card: "0 10px 30px rgba(0, 0, 0, 0.35)",
        "card-hover": "0 18px 40px rgba(0, 0, 0, 0.45)",
        floating: "0 25px 60px rgba(0, 0, 0, 0.45)",
        "button-primary": "0 8px 25px rgba(99, 102, 241, 0.35)",
        "button-primary-hover": "0 12px 35px rgba(99, 102, 241, 0.4)",
        "button-accent": "0 8px 25px rgba(139, 92, 246, 0.35)",
        "button-accent-hover": "0 12px 35px rgba(139, 92, 246, 0.4)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" }
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 18px rgba(99, 102, 241, 0.35)" },
          "50%": { boxShadow: "0 0 32px rgba(99, 102, 241, 0.5)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite"
      },
      backgroundImage: {
        "gradient-mesh": "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)"
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px"
      }
    }
  },
  plugins: []
} satisfies Config;
