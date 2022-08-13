import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link className="link" to="/">
          Home
        </Link>
      </nav>
    </div>
  );
}
