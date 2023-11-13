import React from "react";
import "./Java.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import NavigationBar from "./NavigationBar";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Operations_Decision() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  return (
    <>
      <nav className="navbar">
        <h3>Java Operations and Decision Constructs</h3>
        <ul>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section1"
              smooth={true}
              duration={500}
            >
              What do Java
            </Link>
          </li>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section2"
              smooth={true}
              duration={500}
            >
              Decision making
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
              <h2>What Do Java Operators Do?</h2>
              <p>
                The symbols used in Java to carry out particular operations are
                known as operators. Although the implementation of operations
                like addition, multiplication, and other similar operations is
                fairly difficult, operators make them appear simple.
              </p>
              <h5>Java operators' types</h5>
              <p>
                There are several different kinds of operators in Java, all of
                which are listed below:
              </p>
              <ol>
                <li>Arithmetic Operators</li>
                <li>Unary Operators</li>
                <li>Assignment Operator</li>
                <li>Relational Operators</li>
                <li>Logical Operators</li>
                <li>Ternary Operator</li>
                <li>Bitwise Operators</li>
                <li>Shift Operators</li>
                <li>instance of operator</li>
              </ol>
            </section>
          </Element>
          <Element name="section2">
            <section>
              <h2>
                Decision Making in Java (if, if-else, switch, break, continue,
                jump)
              </h2>
              <p>
                Making decisions in programming is analogous to making decisions
                in everyday life. We encounter instances in programming when we
                want a specific block of code to be executed when a certain
                condition is met.
              </p>
              <p>
                Control statements are used in programming languages to regulate
                how a program is executed based on specific criteria. These are
                used to direct the flow of execution to advance and diverge in
                response to changes in a program's state.
              </p>
              <h5>Java’s Selection statements: </h5>
              <ul>
                <li>if</li>
                <li>if-else</li>
                <li>nested-if</li>
                <li>if-else-if</li>
                <li>switch-case</li>
                <li>• jump – break, continue, return</li>
              </ul>
            </section>
          </Element>
          <Element name="section3">
            <section>
              <h2>Pop Quiz</h2>
              <ol>
                <li>
                  List five different types of Java operators and briefly
                  describe their purposes.
                </li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
                <li>
                  What are control statements in Java, and why are they used?
                </li>
                <textarea
                  name="concept"
                  id="concept"
                  cols="30"
                  rows="10"
                ></textarea>
                <li>Name three selection statements in Java.</li>
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

export default Operations_Decision;
