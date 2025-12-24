import styled from "styled-components";
import { media } from "@styles/responsive";

export const FooterSection = styled.footer`
  background-color: rgb(48, 114, 120);
  display: flex;
  padding: 6px 14px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
`;

export const LogoContainer = styled.div`
  display: flex;
`;

export const Logo = styled.img`
  width: 46px;
  filter: drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.35));
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media("md")`
    display: none;
  `}
`;

export const BrandName = styled.h2`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
`;

export const Copyright = styled.p`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin-top: 0px;
`;

export const BackToTopButton = styled.button`
  align-self: center;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0.5) 16.09%,
    rgba(255, 255, 255, 0.1) 105.27%
  );
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  padding: 8px 10px;
  cursor: pointer;
`;

export const MenuIcon = styled.img`
  height: 25px;
  cursor: pointer;
  background-color: #ffef94;
  border-radius: 30%;

  /* 在小屏幕下显示图标 */
  @media (max-width: 768px) {
    display: flex;
  }
`;
export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;

  /* 默认隐藏图标 */
  display: none;

  /* 在小屏幕下显示图标 */
  @media (max-width: 768px) {
    display: flex;
    align-self: center;
    gap: 3px;
    margin-bottom: -8px;
  }

  span {
    font-size: 13px;
    color: #fff;
  }
`;
