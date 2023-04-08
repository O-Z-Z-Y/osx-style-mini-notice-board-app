// src/SignUp.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth } from "./../../../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  color: red;
`;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
};

export default SignUp;
