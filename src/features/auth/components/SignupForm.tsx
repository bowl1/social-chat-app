"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, InputField, Button, Header, DescriptionText, FooterText } from "./AuthStyle";
import { useUserStore } from "@store/useUserStore";
import { auth } from "@lib/client/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { request } from "@client/httpClient";

const fallbackAvatar = "/default-avatar.png";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser, setAvatar, restoreOrFetchDefaultGroup } = useUserStore();
  const router = useRouter();
  const [signupStatus, setSignupStatus] = useState("");

  const handleSignup = async (username, emailAddress, userPassword) => {
    const cred = await createUserWithEmailAndPassword(auth, emailAddress, userPassword);
    if (username) {
      await updateProfile(cred.user, { displayName: username });
    }
    const token = await cred.user.getIdToken();
    localStorage.setItem("authToken", token);

    const res = await request("/auth/me", {
      method: "POST",
      body: {
        username: username || emailAddress.split("@")[0],
        email: emailAddress,
        avatar: cred.user.photoURL || fallbackAvatar,
      },
    });

    setUser(res.user);
    setAvatar(res.user.avatar || fallbackAvatar);
    await restoreOrFetchDefaultGroup();
    return res.user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSignupStatus("Passwords do not match! Please try again.");
      return;
    }

    try {
      await handleSignup(name, email, password);
      alert("Registration successful!");
      router.push("/");
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
