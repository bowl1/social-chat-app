import { css, DefaultTheme } from "styled-components";

type BreakpointKey = keyof DefaultTheme["breakpoints"];

export const media =
  (key: BreakpointKey) =>
  (strings: TemplateStringsArray, ...interpolations: any[]) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints[key]}px) {
      ${css(strings, ...interpolations)}
    }
  `;
