import { Suspense } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";

import { UserList } from "./components/userList/UserList";
import { SignUp } from "./components/signup/Signup";
import { Login } from "./components/login/Login";
import { WebglCanvas } from "./components/webglCanvas/WebglCanvas";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Navbar />
        <Routes>
          <Route path="/" element={<WebglCanvas />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="userlist" element={<UserList />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
