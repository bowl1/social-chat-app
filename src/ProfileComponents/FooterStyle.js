import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #306c71;
  padding: 20px 0;
  display: flex;
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
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
  width: 70px;
  filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5));
`;

export const FooterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FooterText = styled.p`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
`;

export const FooterCopyright = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin-top: 0px;
  text-align: center;
`;
