import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 10px;
`;

export const CommentContent = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
`;

export const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;

   @media (max-width: 768px) {
    font-size: 16px; 

`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentBody = styled.p`
 color: black;
`;

export const CommentText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  font-size: 20px;

   @media (max-width: 768px) {
    font-size: 16px; 

`;

export const ReplyTo = styled.span`
  font-weight: normal;
`;

export const ButtonsInReply = styled.div`
  margin-top: 8px;
  display: flex;
  direction: row;
  gap: 40px;
`;

export const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 13px; 
`;

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ReplyInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const ReplyInputField = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
  }
`;

export const ReplyButton = styled.button`
  background-color: rgb(48, 114, 120);
  color: white;
  padding: 6px 12px;
  margin-left: 8px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 20px;
`;

export const ReplyList = styled.div`
  margin-top: 30px;
`;