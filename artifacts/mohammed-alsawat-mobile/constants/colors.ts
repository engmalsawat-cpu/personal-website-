/**
 * Design tokens derived from the sibling web artifact (artifacts/mohammed-alsawat/src/index.css)
 * Mapped 1-to-1 from the CSS custom properties in :root.
 */

const colors = {
  light: {
    // Legacy aliases
    text: '#171717',
    tint: '#f4c94d',

    // Core surfaces
    background: '#f7f6f2',     // --paper
    foreground: '#171717',     // --ink

    // Cards / elevated surfaces
    card: '#fffefa',           // --white
    cardForeground: '#171717',

    // Primary action — yellow accent
    primary: '#f4c94d',        // --yellow
    primaryForeground: '#171717',

    // Secondary — soft yellow
    secondary: '#fff3ba',      // --yellow-soft
    secondaryForeground: '#171717',

    // Muted / subdued
    muted: '#d8d5ce',          // --line
    mutedForeground: '#67645f', // --muted

    // Accent
    accent: '#fff3ba',
    accentForeground: '#171717',

    // Destructive
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders
    border: '#d8d5ce',         // --line
    input: '#d8d5ce',

    // Approach / dark section specific tokens
    approachBackground: '#171717',
    approachForeground: '#f7f6f2',
    approachMuted: '#aaa7a0',
    approachKicker: '#a9a69f',
    approachBorder: '#55534e',
  },

  // Web app uses sharp corners throughout — match that aesthetic
  radius: 2,
};

export default colors;
