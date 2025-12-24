export const theme = {
  colors: {
    primary: "#307278",
    secondary: "#A9DEF9",
    text: "#0F191A",
    background: "#FFFFFF",
    muted: "#5B6C7B",
  },
  spacing: (factor: number) => `${factor * 8}px`,
  breakpoints: {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  radii: {
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
};

export type AppTheme = typeof theme;
