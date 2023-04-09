import React from "react"
import AppModal from "../common/AppModal";
import { useState } from 'react';
import { auth } from "../../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface IProps {
  closeModal: () => void;
}

const TestApp: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const signUpUser = async (e: any) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user)
    } catch (error) {
        console.log(error)
      }
  }

  return (
    <AppModal closeModal={closeModal}>
      회원가입
      <form onSubmit={signUpUser}>
        <label htmlFor="email">Email : </label>
        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password : </label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">SignUp</button>
      </form>
    </AppModal>
  )
}

export default TestApp;