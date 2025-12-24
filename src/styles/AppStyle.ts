import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    font-family: Avenir Next, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: hidden; /* 禁止页面水平滚动 */
    box-sizing: border-box;
    background: linear-gradient(135deg, #f6fbff 0%, #eef5ff 35%, #fdf7ff 100%);
    color: #0f191a;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;
