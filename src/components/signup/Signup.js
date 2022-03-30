import React, { useState } from "react";
import { createUser } from "../../apis/users";
import "./signup.css";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submitNewUser = async (email, password, name) => {
    const loginStatus = await createUser(email, password, name);
    console.log("loginStatus");
    console.log(loginStatus);
  };

  return (
    <>
      <main>
        <div className="auth">
          <div className="auth-label">
            <label>Name</label>
            <label>Email</label>
            <label>Password</label>
          </div>
          <div className="auth-input">
            <input
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              name="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <button className="button" onClick={() => submitNewUser(email, password, name)}>
            Sign Up
          </button>
        </div>
      </main>
    </>
  );
}
