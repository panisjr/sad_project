import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  return (
    <nav className="navbar">
      <h3>Introduction to Programming with Java</h3>
      <ul>
        <li>
          <Link
            style={{ cursor: "pointer" }}
            to="section1"
            smooth={true}
            duration={500}
          >
            What is Java?
          </Link>
        </li>
        <li>
          <Link
            style={{ cursor: "pointer" }}
            to="section2"
            smooth={true}
            duration={500}
          >
            Why use Java?
          </Link>
        </li>
        <li>
          <Link
            style={{ cursor: "pointer" }}
            to="section3"
            smooth={true}
            duration={500}
          >
            Pop Quiz
          </Link>
        </li>
        <li>
          <Link
            style={{ cursor: "pointer" }}
            onClick={back}
            smooth={true}
            duration={500}
          >
            Back
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
