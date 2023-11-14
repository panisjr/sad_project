import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
function LandingPage() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LandingPage;
