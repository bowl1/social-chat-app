import styled from "styled-components";
import { media } from "@styles/responsive";

export const CommentSectionContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #f3f7f8;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e4edef;
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
  padding: 10px 16px;
  background: linear-gradient(135deg, #2f7c84, #3ea7b0);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  align-self: flex-start;
  box-shadow: 0 10px 24px rgba(47, 124, 132, 0.2);
  transition:
    transform 0.1s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(47, 124, 132, 0.3);
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
