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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext); // 从上下文中获取登录方法
  const navigate = useNavigate(); // 导航功能

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止页面刷新

    try {
      // 调用上下文中的登录方法
      await loginUser(email, password);

      // 弹出登录成功提示，并导航到首页
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Header>👋 Hello again, GHOST</Header>
      <DescriptionText> Please log in to continue.</DescriptionText>
      <Form onSubmit={handleSubmit}>
        <InputField>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputField>
        <Button type="submit">Log In</Button>
      </Form>
      <FooterText>© 2024 GHOST Team. All rights reserved.</FooterText>
    </div>
  );
}

export default Login;
