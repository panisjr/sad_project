import React from "react";
import "./Python.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function IntroPy() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentPython");
  };
  const javaQuiz = () => {
    navigate("/introQuizPy");
  };
  return (
    <>
      <nav className="navbar">
        <h3>Introduction to Programming with Python</h3>
        <ul>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section1"
              smooth={true}
              duration={500}
            >
              What is Python?
            </Link>
          </li>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section2"
              smooth={true}
              duration={500}
            >
              Python Print function
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
              <h2>What is Python?</h2>
              <p>
                Python is a popular programming language. It was created by
                Guido van Rossum, and released in 1991.
              </p>
              <p>It is used for:</p>
              <ul>
                <li>web development (server-side),</li>
                <li>software development,</li>
                <li>mathematics,</li>
                <li>system scripting.</li>
                <li>
                  Python can be used on a server to create web applications.
                </li>
                <li>
                  Python can be used alongside software to create workflows.
                </li>
                <li>
                  Python can connect to database systems. It can also read and
                  modify files.
                </li>
                <li>
                  Python can be used to handle big data and perform complex
                  mathematics.
                </li>
                <li>
                  Python can be used for rapid prototyping, or for
                  production-ready software development.
                </li>
              </ul>
              <h2>Why use Python?</h2>
              <ul>
                <li>
                  Python works on different platforms (Windows, Mac, Linux,
                  Raspberry Pi, etc).
                </li>
                <li>
                  Python has a simple syntax similar to the English language.
                </li>
                <li>
                  Python has syntax that allows developers to write programs
                  with fewer lines than some other programming languages.
                </li>
                <li>
                  Python runs on an interpreter system, meaning that code can be
                  executed as soon as it is written. This means that prototyping
                  can be very quick.
                </li>
                <li>
                  Python can be treated in a procedural way, an object-oriented
                  way or a functional way.
                </li>
                <li>It is powerful, quick, and secure.</li>
              </ul>
            </section>
          </Element>
          <Element name="section2">
            <section>
              <h2>Python Print function</h2>
              <p>
                The "print()" function prints the specified message to the
                screen, or other standard output device.
              </p>
              <p>
                The message can be a string, or any other object, the object
                will be converted into a string before written to the screen.
              </p>
              <h5>Example:</h5>
              <p> print("Hello World")</p>
              <h5>Syntax</h5>
              <p>
                print(object(s), sep=separator, end=end, file=file, flush=flush)
              </p>
              <h5>Parameter Values</h5>
              <table className="table table-bordered table-striped" border="2">
                <tr>
                  <th>Parameter</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>object(s)</td>
                  <td>
                    Any object, and as many as you like. Will be converted to
                    string before printed
                  </td>
                </tr>
                <tr>
                  <td>sep='separator'</td>
                  <td>
                    Optional. Specify how to separate the objects, if there is
                    more than one. Default is ' '
                  </td>
                </tr>
                <tr>
                  <td>end='end'</td>
                  <td>
                    Optional. Specify what to print at the end. Default is '\n'
                    (line feed)
                  </td>
                </tr>
                <tr>
                  <td>file</td>
                  <td>
                    Optional. An object with a write method. Default is
                    sys.stdout
                  </td>
                </tr>
                <tr>
                  <td>flush</td>
                  <td>
                    Optional. A Boolean, specifying if the output is flushed
                    (True) or buffered (False). Default is False
                  </td>
                </tr>
              </table>
              <h5>Python String Literals</h5>
              <p>
                String literals in python are surrounded by either single
                quotation marks, or double quotation marks.
              </p>
              <p>'hello' is the same as "hello".</p>
              <h5>Example:</h5>
              <p>print("Hello")</p>
              <p>print('Hello')</p>
              <p>
                Do you want to learn more and enhance your programming skills?
                <a
                  href="https://www.w3schools.com/python/"
                  className="text-black ms-3 externalLink"
                >
                  https://www.w3schools.com/python/
                </a>
              </p>
            </section>
          </Element>
          <Element name="section3">
            <section>
              <h2>Pop Quiz</h2>
              <button className="btn btn-primary" onClick={javaQuiz}>
                Ready to take the Quiz?
              </button>
            </section>
          </Element>
        </div>
      </div>
    </>
  );
}

export default IntroPy;
