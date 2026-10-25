/*
 * Tailwind CSS (Play CDN) configuration for the VeryCare website.
 * Loaded immediately after https://cdn.tailwindcss.com on every page.
 *
 * Brand colours are PROVISIONAL until they are sampled from the official
 * VeryCare logo file (see docs/DESIGN_SYSTEM.md). Keep these values in sync
 * with the CSS custom properties at the top of assets/css/styles.css.
 */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: "#EEF4FA",
            100: "#D9E7F4",
            200: "#B3CEE9",
            500: "#2B74C2",
            600: "#1F66B0",
            700: "#17589C",
            800: "#114676",
            900: "#0C3357"
          },
          green: {
            50: "#EDF7F0",
            100: "#D6EEDD",
            500: "#3AA35F",
            600: "#2B8C4E",
            700: "#1E7444"
          }
        },
        ink: "#0F2A44",
        body: "#3A4A5C",
        muted: "#55667A",
        line: "#E2E8EF",
        canvas: "#F6F8FA"
      },
      fontFamily: {
        sans: ["Figtree", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]
      },
      maxWidth: {
        prose: "68ch"
      }
    }
  }
};
