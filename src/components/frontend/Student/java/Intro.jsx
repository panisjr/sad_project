import React from "react";
import "./Java.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  const javaQuiz = () => {
    navigate("/introQuiz");
  };
  return (
    <>
      <div className="courseWrapper">
        <nav className="navbarJavaCourse">
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
        <div className="Intro">
          <div className="content">
            <Element name="section1">
              <section>
                <h2 className="text-black">What is Java?</h2>
                <p>
                  Popular computer language Java was developed in 1995. Java is
                  used by more than 3 billion devices worldwide and is owned by
                  Oracle. It's employed for:
                </p>
                <ul>
                  <li>Mobile applications, especially those for Android</li>
                  <li>Desktop software</li>
                  <li>Web-based programs</li>
                  <li>Application servers and web servers</li>
                  <li>Games</li>
                  <li>Database linkage</li>
                  <li>And a whole lot more!</li>
                </ul>
              </section>
            </Element>
            <Element name="section2">
              <section>
                <h2 className="text-black">Why use Java?</h2>
                <ul>
                  <li>
                    Java runs on a variety of operating systems, including
                    Windows, Mac, Linux, Raspberry Pi, etc.
                  </li>
                  <li>
                    It is among the most widely used programming languages
                    worldwide.
                  </li>
                  <li>
                    There is a high demand for it in the present labor market.
                  </li>
                  <li>
                    It is simple to use and straightforward to understand.
                  </li>
                  <li>It is free and open-source.</li>
                  <li>It is powerful, quick, and secure.</li>
                  <li>
                    It enjoys enormous community support, with millions of
                    developers.
                  </li>
                  <li>
                    Java is an object-oriented language that provides programs
                    with a clear structure and enables code reuse, reducing
                    development expenses.
                  </li>
                  <li>
                    Since Java is close to C++ and C#, programmers can easily
                    move from one to the other.
                  </li>
                </ul>
                <p>
                  Do you want to learn more and enhance your programming skills?
                  <a
                    href="https://www.w3schools.com/java/"
                    className="text-black ms-3 externalLink"
                  >
                    https://www.w3schools.com/java/
                  </a>
                </p>
              </section>
            </Element>
            <Element name="section3">
              <section>
                <h2 className="text-black">Pop Quiz</h2>
                <button className="btn btn-primary" onClick={javaQuiz}>
                  Ready to take the Quiz?
                </button>
              </section>
            </Element>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
