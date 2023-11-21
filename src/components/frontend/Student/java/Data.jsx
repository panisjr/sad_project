import React from "react";
import "./Java.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Data() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  return (
    <>
      <div className="courseWrapper">
        <nav className="navbarJavaCourse">
          <h3>Java Data Types</h3>
          <ul>
            <li>
              <Link
                style={{ cursor: "pointer" }}
                to="section1"
                smooth={true}
                duration={500}
              >
                Two Groups
              </Link>
            </li>
            <li>
              <Link
                style={{ cursor: "pointer" }}
                to="section2"
                smooth={true}
                duration={500}
              >
                Fundamental
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
                <h2>There are two groups of data types:</h2>
                <ul>
                  <li>
                    Basic data types, such as bytes, short ints, long ints,
                    floats, doubles, booleans, and characters.
                  </li>
                  <li>
                    Non-primitive data types, such as String, Arrays, and
                    Classes (more on these will be covered in a later chapter).
                  </li>
                </ul>
              </section>
            </Element>
            <Element name="section2">
              <section>
                <h2>Fundamental Data Types</h2>
                <p>
                  A primitive data type has no extra methods; it only describes
                  the size and type of variable values.
                </p>
                <table>
                  <thead>
                    <th>Data Type</th>
                    <th>Size</th>
                    <th>Description</th>
                  </thead>
                  <tbody>
                    <tb>
                      <tr>byte</tr>
                    </tb>
                    <tb>
                      <tr>short</tr>
                    </tb>
                    <tr>int</tr>
                    <tr>long</tr>
                    <tr>float</tr>
                  </tbody>
                </table>
              </section>
            </Element>
            <Element name="section3">
              <section>
                <h2 className="text-black">Pop Quiz</h2>
                <ol>
                  <li>
                    What is the size of the int data type in Java, and what
                    range of values can it store?
                  </li>
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Enter here..."
                  ></input>
                  <li>
                    How many bytes does the double data type occupy, and how
                    many decimal digits can it store?
                  </li>
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Enter here..."
                  ></input>
                  <li>
                    What is the primary purpose of the boolean data type in
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
      </div>
    </>
  );
}

export default Data;
