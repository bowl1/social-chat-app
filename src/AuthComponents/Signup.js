import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper,FormContainer,Heading,Form,InputField,Button,LinkText,} from "./AuthStyle";
import { UserContext } from "../hooks/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupUser } = useContext(UserContext); // 使用上下文中的注册方法
  const navigate = useNavigate(); // 用于导航到其他页面

  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表单刷新

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
    <Wrapper>
      <FormContainer>
        <Heading>CREATE AN ACCOUNT</Heading>
        <Form onSubmit={handleSubmit}>
          <InputField>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputField>
          <InputField>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your mail"
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
          Have an account? <Link to="/">Login</Link>
        </LinkText>
      </FormContainer>
    </Wrapper>
  );
}