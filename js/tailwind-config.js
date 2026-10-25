/*
 * Tailwind CSS (Play CDN) configuration for the VeryCare website.
 * Loaded immediately after https://cdn.tailwindcss.com on every page.
 *
 * Brand colours are sampled from the VeryCare logo
 * (assets/images/source/verycare-logo-original.jpg); see docs/DESIGN_SYSTEM.md.
 * Keep these values in sync with the CSS custom properties at the top of
 * assets/css/styles.css.
 */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: "#EEF5FC",
            100: "#D8E8F8",
            200: "#B5D2F1",
            500: "#3D92E5",
            600: "#2D73BB",
            700: "#21568C",
            800: "#1A4570",
            900: "#12314F"
          },
          green: {
            50: "#EDF8EC",
            100: "#D3EED0",
            500: "#2EA026",
            600: "#23801D",
            700: "#1F7419"
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
