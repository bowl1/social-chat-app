"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, InputField, Button, Header, DescriptionText, FooterText } from "./AuthStyle";
import { useUserStore } from "@store/useUserStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@lib/client/firebase";
import { request } from "@client/httpClient";

const fallbackAvatar = "/default-avatar.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setAvatar, restoreOrFetchDefaultGroup } = useUserStore();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState("");

  const loginUser = async (emailAddress, userPassword) => {
    const cred = await signInWithEmailAndPassword(auth, emailAddress, userPassword);
    const token = await cred.user.getIdToken();
    localStorage.setItem("authToken", token);

    const res = await request("/auth/me", {
      method: "POST",
      body: {
        username: cred.user.displayName || emailAddress.split("@")[0],
        email: emailAddress,
        avatar: cred.user.photoURL || fallbackAvatar,
      },
    });

    setUser(res.user);
    setAvatar(res.user.avatar || fallbackAvatar);
    await restoreOrFetchDefaultGroup();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      setLoginStatus("Login successful!");
      router.push("/");
    } catch (error) {
      setLoginStatus(`login failed! ${error.message}`);
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
        <DescriptionText>{loginStatus}</DescriptionText>
        <Button type="submit">Log In</Button>
      </Form>
      <FooterText>© 2024 GHOST Team. All rights reserved。</FooterText>
    </div>
  );
}

export default LoginForm;
