import styled from "styled-components";

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
  font-size: 16px;
  gap: 4px;

     @media (max-width: 480px) {
    font-size: 14px; 
`;

export const IconImage = styled.img`
  width: 30px;
  height: 30px;

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

export const LikeCount = styled.span`
  font-size: 16px; 
  color: #333;

     @media (max-width: 480px) {
    font-size: 13px; 
`;
