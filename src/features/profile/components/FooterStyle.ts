import styled from "styled-components";
import { media } from "@styles/responsive";

export const FooterContainer = styled.footer`
  background-color: rgb(48, 114, 120);
  padding: 12px 16px;
  display: flex;
  width: 100%;
  height: 56px;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  margin-top: 16px;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

export const LogoImage = styled.img`
  width: 56px;
  filter: drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.35));
`;

export const FooterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FooterText = styled.p`
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
`;

export const FooterCopyright = styled.p`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin-top: 0px;
  text-align: center;
`;
