import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopBarContainer = styled.header`
  display: flex;
  height: 150px;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  padding-bottom: 70px;
`;

export const LeftBarContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    flex: ${(props) => (props.$isLeftBarExpanded ? "1" : "0")};
    display: ${(props) => (props.$isLeftBarExpanded ? "block" : "none")};
    transition: all 0.3s ease;
  }
`;

export const PostContainer = styled.div`
  flex: 8;

  @media (max-width: 768px) {
    flex: ${(props) => (props.$isLeftBarExpanded ? "0" : "1")};
    display: ${(props) => (props.$isLeftBarExpanded ? "none" : "block")};
    transition: all 0.3s ease;
  }
`;

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
`;
