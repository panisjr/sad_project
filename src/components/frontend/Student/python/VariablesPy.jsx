import React from "react";
import "./Python.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function VariablesPy() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  return (
    <>
      <nav className="navbar">
        <h3>Java Variables</h3>
        <ul>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section1"
              smooth={true}
              duration={500}
            >
              Data Values
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
      <div className="Intro">
        <div className="content">
          <Element name="section1">
            <section>
              <h2>Data values are kept in variables as storage.</h2>
              <p>There are various sorts of variables in Java, including:</p>
              <p>
                Text such as "Hello" is stored in a string. Double quotes are
                used to enclose string values.
              </p>
              <ul>
                <li>
                  int - holds whole numbers (integers) without decimal points,
                  such as 123 or -123.
                </li>
                <li>
                  float: used to hold decimalized floating-point numbers such as
                  19.99 or -19.99.
                </li>
                <li>
                  char - used to hold single characters like "a" or "B." Single
                  quotes are used to enclose char values.
                </li>
                <li>Boolean - saves values in the true or false categories.</li>
              </ul>
            </section>
          </Element>
          <Element name="section3">
            <section>
              <h2>Pop Quiz</h2>
              <ol>
                <li>What is the purpose of a String variable in Java?</li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
                <li>
                  Which data type would you use to store a whole number without
                  a decimal point?
                </li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
                <li>
                  How do you declare a variable to store a single character in
                  Java?
                </li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
              </ol>
            </section>
          </Element>
        </div>
      </div>
    </>
  );
}

export default VariablesPy;
