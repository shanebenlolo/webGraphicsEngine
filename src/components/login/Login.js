import React, { useState } from "react";
import { loginUser } from "../../apis/users";
import "./login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitUser = async (email, password) => {
    const loginStatus = await loginUser(email, password);
    console.log("loginStatus");
    console.log(loginStatus);
  };

  return (
    <>
      <main>
        <div className="auth">
          <div className="auth-label">
            <label>Email</label>
            <label>Password</label>
          </div>
          <div className="auth-input">
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
          <button className="button" onClick={() => submitUser(email, password)}>
            Login
          </button>
        </div>
      </main>
    </>
  );
}
