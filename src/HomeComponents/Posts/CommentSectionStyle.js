import styled from 'styled-components';

export const CommentSectionContainer = styled.div`
  margin-top: 10px;
`;

export const AddCommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommentInput = styled.input`
  width: 50%;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;

     @media (max-width: 768px) {
    font-size: 13px; 
}
`;

export const AddCommentButton = styled.button`
  margin-left: 8px;
  padding: 6px 12px;
  background-color: rgb(48, 114, 120);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;

  &:hover {
    background-color: rgba(48, 114, 120, 0.8);
  }

     @media (max-width: 768px) {
    font-size: 12px; 
`;

export const CommentsList = styled.div`
  margin-top: 10px; 
`;
