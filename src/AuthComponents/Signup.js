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
import { UserContext } from "../Context/UserContext";
import Parse from "parse";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setUser } = useContext(UserContext); 
  const navigate = useNavigate();
  const [signupStatus, setSignupStatus] = useState("");

  const handleSignup = async (username, email, password) => {
    try {
      // 创建新用户
      const newUser = new Parse.User();
      newUser.set("username", username);
      newUser.set("email", email);
      newUser.set("password", password);
 
       // 保存用户,后端自动设置ACL
       const savedUser = await newUser.signUp();

      // 更新全局用户状态
      setUser(savedUser);

      return savedUser; // 返回已注册用户
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // 抛出错误供调用者处理
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSignupStatus("Passwords do not match! Please try again.");
      return;
    }

    try {
      // 调用注册方法
      await handleSignup(name, email, password);

      // 注册成功后，分组逻辑由 UserContext 的 `useEffect` 自动处理
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setSignupStatus(`Error: ${error.message}`);
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
        <FooterText>{signupStatus}</FooterText>
        <Button type="submit">Sign Up</Button>
      </Form>
      <FooterText>© 2024 GHOST Team. All rights reserved.</FooterText>
    </div>
  );
}
