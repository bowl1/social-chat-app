import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Wrapper,FormContainer,Heading,Form,InputField,Button,LinkText,} from "./AuthStyle";
import { UserContext } from "../hooks/UserContext";

export default function Login() {
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
    <Wrapper>
      <FormContainer>
        <Heading>LOGIN</Heading>
        <Form onSubmit={handleSubmit}>
          <InputField>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputField>
          <InputField>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputField>
          <Button type="submit">Submit</Button>
        </Form>
        <LinkText>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </LinkText>
      </FormContainer>
    </Wrapper>
  );
}