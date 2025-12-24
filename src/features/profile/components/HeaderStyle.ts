import styled from "styled-components";
import { media } from "@styles/responsive";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: rgb(48, 114, 120);
  color: #fff;
  height: 80px;
  border-radius: 16px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  margin: 12px 16px 0;

  ${media("md")`
    padding: 12px 16px;
    height: 68px;
    margin: 8px 12px 0;
  `}
`;

export const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;

  ${media("md")`
    font-size: 16px;
  `}
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const LogoutIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;

  ${media("md")`
    font-size: 13px;
  `}
`;
