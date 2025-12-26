import styled from "styled-components";
import { media } from "@styles/responsive";

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 15px;
  font-weight: 700;
  gap: 6px;
  color: #2f7c84;
  padding: 8px 10px;
  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  ${media("md")`
    font-size: 13px;
  `}

  &:hover {
    background-color: rgba(47, 124, 132, 0.08);
    transform: translateY(-1px);
  }
`;

export const LikeCount = styled.span`
  font-size: 14px;
  color: #183034;
  font-weight: 600;

  ${media("md")`
    font-size: 13px;
  `}
`;

export const IconImage = styled.img`
  width: 18px;
  height: 18px;

  ${media("md")`
    width: 16px;
    height: 16px;
  `}
`;
