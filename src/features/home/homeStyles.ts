import styled from "styled-components";
import { media } from "@styles/responsive";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopBarContainer = styled.header`
  display: flex;
  height: 96px;
  margin: 12px 16px 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  ${media("md")`
    height: 72px;
    margin: 8px 12px 0;
  `}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  padding: 12px 16px 80px; /* extra bottom padding so footer won't cover content */
  width: 100%;
  align-items: flex-start;
  gap: 16px;
`;

type LeftBarProps = {
  $isLeftBarExpanded?: boolean;
};

export const LeftBarContainer = styled.div<LeftBarProps>`
  flex: 0 0 240px;
  max-width: 240px;
  min-width: 200px;
  align-self: flex-start;

  ${media("md")`
    flex: ${(props: LeftBarProps) => (props.$isLeftBarExpanded ? "1" : "0")};
    display: ${(props: LeftBarProps) => (props.$isLeftBarExpanded ? "block" : "none")};
    transition: all 0.3s ease;
  `}
`;

export const PostContainer = styled.div<LeftBarProps>`
  flex: 1;
  max-width: 840px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media("md")`
    flex: ${(props: LeftBarProps) => (props.$isLeftBarExpanded ? "0" : "1")};
    display: ${(props: LeftBarProps) => (props.$isLeftBarExpanded ? "none" : "block")};
    transition: all 0.3s ease;
  `}
`;

export const FooterContainer = styled.footer`
  position: static;
  width: 100%;
  height: 64px;
  margin-top: 12px;
`;
