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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser, setAvatar, restoreOrFetchDefaultGroup } = useContext(UserContext);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      // 登录用户
      const currentUser = await Parse.User.logIn(email, password);
      setUser(currentUser);

      // 更新头像
      const avatarFile = currentUser.get("avatar");
      if (avatarFile instanceof Parse.File) {
        setAvatar(`${avatarFile.url()}?${Date.now()}`);
      } else {
        setAvatar("https://via.placeholder.com/50");
      }

      // 恢复或设置默认分组
      await restoreOrFetchDefaultGroup();
    } catch (error) {
      throw error; // 抛出错误供调用者处理
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止页面刷新

    try {
      // 调用登录逻辑
      await loginUser(email, password);

      // 弹出登录成功提示，并导航到首页
      alert("Login successful!");
      navigate("/");
    } catch (error) {
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
            autoComplete="email"
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
            autoComplete="current-password"
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
