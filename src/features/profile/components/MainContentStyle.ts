import styled from "styled-components";
import { media } from "@styles/responsive";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 880px;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  padding: 28px;
  border-radius: 18px;
  box-sizing: border-box;
  margin-top: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);

  ${media("md")`
    width: 100%;
    padding: 18px;
    border-radius: 14px;
  `}
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  width: 100%;
  flex-wrap: wrap;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 24px;
  object-fit: cover;

  ${media("md")`
    width: 80px;
    height: 80px;
  `}
`;

export const ChangeButton = styled.button`
  background: #2e8a9e;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 6px;
  box-shadow: 0 6px 14px rgba(46, 138, 158, 0.3);

  ${media("md")`
    font-size: 13px;
    padding: 8px 10px;
  `}
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const UserName = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 0;

  ${media("md")`
    font-size: 24px;
  `}
`;

export const UserEmail = styled.p`
  font-size: 20px;
  color: #555555;
  margin: 0;

  ${media("md")`
    font-size: 16px;
  `}
`;

export const EditButton = styled.button`
  background-color: ${(props) => (props["data-edit-mode"] ? "#FF910A" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);

  ${media("md")`
    font-size: 14px;
    padding: 8px 10px;
  `}
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: #2e8a9e;
  border: 1px solid #2e8a9e;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);

  ${media("md")`
    font-size: 13px;
    padding: 8px 10px;
  `}
`;

export const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;

  ${media("md")`
    gap: 8px;
  `}
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  font-size: 16px;
  width: 100%;

  ${media("md")`
    gap: 8px;
    font-size: 14px;
  `}
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: normal;
  color: #333;
  font-size: 16px;

  ${media("md")`
    font-size: 14px;
  `}
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #dfe7ef;
  font-size: 16px;
  background: #f7fafc;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;
  min-height: 42px;

  &:focus {
    outline: none;
    border-color: #2e8a9e;
    box-shadow: 0 0 0 3px rgba(46, 138, 158, 0.15);
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ReadonlyField = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px dashed #dfe7ef;
  font-size: 15px;
  background: #f9fbfd;
  color: #2b3a40;
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
`;
