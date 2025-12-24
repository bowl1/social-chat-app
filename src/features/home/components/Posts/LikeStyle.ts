import styled from "styled-components";
import { media } from "@styles/responsive";

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 18px;
  gap: 4px;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const LikeCount = styled.span`
  font-size: 15px;
  color: #333;

  ${media("md")`
    font-size: 13px;
  `}
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;

  ${media("md")`
    width: 16px;
    height: 16px;
  `}
`;
