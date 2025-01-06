import styled from "styled-components";

export const TopBarContainer = styled.div`
  background-color: rgb(48, 114, 120);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
  width: 100%;

`;

export const WelcomeSection = styled.section`
  display: flex;
  gap: 40px;
  color: #fff;
  flex-wrap: wrap;
  flex: 3;
 
`;

export const WelcomeHeading = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.2px;

   @media (max-width: 768px) {
    font-size: 16px; 
    font-weight: 500;
  }
`;

export const UploadSection = styled.section`
display: flex;
 gap: 20%;
 flex: 3;
 
   @media (max-width: 768px) {
    flex:3;
  }
 
`;

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  text-align: center;


  img {
    width: 40px; 
    height: 40px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      width: 30px; 
      height: 30px; 
    }
  }

  span {
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 10px; 
    }
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
    width: 40px; 
    height: 40px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      width: 30px; 
      height: 30px; 
    }
  }

  span {
    font-size: 20px; 

    @media (max-width: 768px) {
      font-size: 10px; 
    }
  }
`;
