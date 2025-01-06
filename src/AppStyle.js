import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    font-family: Avenir Next;
    overflow-x: hidden; /* 禁止页面水平滚动 */
    box-sizing: border-box;
  }
`;