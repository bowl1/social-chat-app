
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const LeftBarContainer = styled.div`
  flex: 1; /* 左侧栏宽度 */
`;

export const PostContainer = styled.div`
  flex: 4; /* 主内容区域宽度 */
`;

export const FooterContainer = styled.footer`
  z-index: 100;
`;
