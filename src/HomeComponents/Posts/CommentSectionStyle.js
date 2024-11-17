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
  font-size: 10px;
`;

export const AddCommentButton = styled.button`
  margin-left: 8px;
  padding: 6px 12px;
  background-color: rgb(48, 114, 120);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(48, 114, 120, 0.8);
  }
`;

export const CommentsList = styled.div`
  margin-top: 10px;
`;

export const RepliesContainer = styled.div`
  margin-left: 20px; /* 缩进显示子评论 */
  margin-top: 5px;
`;