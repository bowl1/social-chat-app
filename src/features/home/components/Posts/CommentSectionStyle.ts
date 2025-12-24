import styled from "styled-components";
import { media } from "@styles/responsive";

export const CommentSectionContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 12px;
`;

export const AddCommentContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;

  ${media("md")`
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const CommentInput = styled.input`
  flex: 1;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 16px;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const AddCommentButton = styled.button`
  padding: 8px 14px;
  background-color: rgb(48, 114, 120);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 15px;
  align-self: flex-start;

  &:hover {
    background-color: rgba(48, 114, 120, 0.85);
  }

  ${media("md")`
    width: 100%;
    text-align: center;
  `}
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
