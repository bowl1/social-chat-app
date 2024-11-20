import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  InputField,
  Button,
  Header,
  DescriptionText,
  FooterText,
} from "./AuthStyle";
import { UserContext } from "../hooks/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signupUser } = useContext(UserContext); // 使用上下文中的注册方法
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    if (password !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }
  
    try {
      // 调用上下文中的注册方法
      await signupUser(name, email, password);
  
      // 弹出注册成功提示并导航到 Home 页面
      alert("Registration successful!");
      navigate("/home");
    } catch (error) {
      console.error("Error signing up:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Header>Ready to get GHOSTed?</Header>
      <DescriptionText> Please sign up to continue.</DescriptionText>
      <Form onSubmit={handleSubmit}>
        <InputField>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputField>
        <InputField>
          <input
            type="email"
            id="email"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputField>
        <InputField>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputField>
        <InputField>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </InputField>
        <Button type="submit">Sign Up</Button>
      </Form>
      <FooterText>© 2024 GHOST Team. All rights reserved.</FooterText>
    </div>
  );
}
