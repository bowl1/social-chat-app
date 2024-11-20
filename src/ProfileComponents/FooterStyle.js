import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #306c71;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 70px;
  align-items: center;
  margin-left: 20px;
  filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5));
`;

export const FooterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const FooterText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
`;

export const FooterCopyright = styled.p`
  font-size: 12px;
  color: #ffffff;
  margin: 0;
`;