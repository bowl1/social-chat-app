import styled from "styled-components";

export const Logo = styled.img`
  width: 200px;
  height: auto;
`;

export const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: #dceaf6;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px; /* 调整小屏幕上的内边距 */
    width: 90%; /* 使容器宽度适应小屏幕 */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputField = styled.div`
  width: 100%; /* 确保 InputField 的宽度可以适配父级容器 */
  display: flex;

  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    flex: 1; /* 确保 input 占满整个容器宽度 */

    &:focus {
      border-color: #0073e6;
    }
  }
`;

export const Button = styled.button`
  background-color: #0073e6;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

export const Header = styled.h1`
  font-size: 1.8rem;
  color: #333;
  text-align: center;
`;

export const DescriptionText = styled.p`
  font-size: 1rem;
  color: #555;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: gray;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(0, 42, 62);
  background: radial-gradient(
    circle,
    rgba(0, 42, 62, 1) 0%,
    rgba(0, 45, 64, 1) 7%,
    rgba(1, 43, 63, 1) 12%,
    rgba(255, 184, 124, 1) 100%
  );
  font-family: Arial, sans-serif;
`;

export const NavBar = styled.nav`
  margin-bottom: 20px;

  a {
    margin: 0 15px;
    text-decoration: none;
    color: #0073e6;
    font-weight: bold;
    position: relative;

    &:hover {
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
      transform: scale(1.1);
      transition: transform 0.3s ease, text-shadow 0.3s ease;
    }

    /* Active link styling */
    &.active {
      color: #005bb5; /* Darker blue for active link */
      font-weight: bold;

      /* underline or indicator */
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background: #005bb5;
        bottom: -5px; /* Position underline below the link */
        left: 0;
      }
    }
  }
`;
