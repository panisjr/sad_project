import React from "react";
import "./Java.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import NavigationBar from "./NavigationBar";

function Meth() {
  return (
    <>
      <NavigationBar />
      <div className="Intro">
        <div className="content">
          <Element name="section1">
            <section>
              <h2>What is Java?</h2>
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
              <h2>Why use Java?</h2>
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
                <li>It is simple to use and straightforward to understand.</li>
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
                  Since Java is close to C++ and C#, programmers can easily move
                  from one to the other.
                </li>
              </ul>
            </section>
          </Element>
          <Element name="section3">
            <section>
              <h2>Pop Quiz</h2>
              <ol>
                <li>When was Java developed</li>
                <div>
                  <input type="radio" id="a" name="develop" value="a" />{" "}
                  <label htmlFor="a">1981</label>
                </div>
                <div>
                  <input type="radio" id="b" name="develop" value="b" />{" "}
                  <label htmlFor="b">1990</label>
                </div>
                <div>
                  <input type="radio" id="c" name="develop" value="c" />{" "}
                  <label htmlFor="c">1995</label>
                </div>
                <li>Who owns it?</li>
                <div>
                  <input type="radio" name="own" id="a" />
                  <label htmlFor="a">Oracle</label>
                </div>
                <div>
                  <input type="radio" name="own" id="b" />
                  <label htmlFor="b">Java</label>
                </div>
                <div>
                  <input type="radio" name="own" id="c" />
                  <label htmlFor="c">Google</label>
                </div>
                <li>
                  Name at least three different applications for which Java is
                  commonly used.
                </li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
                <li>
                  List three advantages of using Java as a programming language.
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

export default Meth;
