import styled from "styled-components";
import { media } from "@styles/responsive";

export const TopBarContainer = styled.div`
  background-color: rgb(48, 114, 120);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const WelcomeSection = styled.section`
  display: flex;
  gap: 24px;
  color: #fff;
  flex-wrap: wrap;
  flex: 3;
  align-items: center;
`;

export const WelcomeHeading = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.2px;

  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }

  ${media("md")`
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    .desktop { display: none; }
    .mobile { display: block; }
  `}
`;

export const UploadSection = styled.section`
  display: flex;
  gap: 32px;
  flex: 3;
  ${media("md")`flex: 3; gap: 24px;`}
`;

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  color: #e9fbff;
  text-align: center;

  img {
    width: 32px;
    height: 32px;
    margin-bottom: 5px;

    ${media("md")`
      width: 30px;
      height: 30px;
    `}
  }

  span {
    font-size: 16px;

    ${media("md")`
      font-size: 12px;
    `}
  }
`;

export const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  text-align: center;
  width: 10%;

  img {
    width: 32px;
    height: 32px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }
  }

  span {
    font-size: 14px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  text-align: center;
  width: 10%;

  img {
    width: 32px;
    height: 32px;
    margin-bottom: 5px;
    background-color: #fff;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }
  }

  span {
    font-size: 14px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
