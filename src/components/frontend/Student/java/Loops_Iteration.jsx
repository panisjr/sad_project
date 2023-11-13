import React from "react";
import "./Java.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import NavigationBar from "./NavigationBar";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Loops_Iteration() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  return (
    <>
      <nav className="navbar">
        <h3>Java Loops/Iterations</h3>
        <ul>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section1"
              smooth={true}
              duration={500}
            >
              The ability
            </Link>
          </li>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section2"
              smooth={true}
              duration={500}
            >
              Risks of Loops
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
                The ability to execute a collection of instructions or functions
                repeatedly while a certain condition holds true is known as
                looping in programming languages. Java offers three options for
                how to run the loops. The core functionality of all the methods
                is the same, although their syntax and the amount of time
                required for condition checking vary. The second sort of
                conditional statement offered by Java is a loop statement.
              </p>

              <ul>
                <li>
                  While loop: Based on a specified Boolean condition, a while
                  loop is a control flow statement that permits code to be
                  executed repeatedly. The while loop can be viewed as an
                  iterative version of the if statement. The while loop begins
                  with a Boolean condition check.
                  <p>
                    The statements in the body of the loop are executed if it
                    evaluated to true; otherwise, the first statement after the
                    loop is executed. It is also known as an entry control loop
                    because of this.
                  </p>
                </li>
                <li>
                  The statements in the body of the loop are carried out once
                  the condition has been evaluated as true. In most cases, the
                  statements include an update value for the variable that will
                  be used in the subsequent iteration.
                </li>
                <li>
                  The loop ends, signaling the completion of its life cycle,
                  when the condition is determined to be false.
                </li>
                <li>
                  For loop: The for loop offers a clear way to express the loop
                  structure. For a shorter, simpler to debug looping structure
                  than a while loop, a for statement consumes the
                  initialization, condition, and increment/decrement on a single
                  line.
                  <ul>
                    <li>
                      Initialization requirement: In this case, we initialize
                      the relevant variable. It signals the beginning of a for
                      loop. You can utilize a variable that has already been
                      declared or declare a variable that will only be used in
                      the loop.
                    </li>
                    <li>
                      Testing Condition: It's used to check whether a loop's
                      exit condition is true. It must provide back a boolean
                      result. Given that the condition is tested before the loop
                      statements are executed, it is also an entry control loop.
                    </li>
                    <li>
                      Statement execution: The statements in the body of the
                      loop are carried out when the condition has been evaluated
                      as true.
                    </li>
                    <li>
                      Increment/Decrement: These operations are used to update a
                      variable for the subsequent iteration.
                    </li>
                    <li>
                      Loop termination: The loop concludes, signaling the end of
                      its life cycle, when the condition is determined to be
                      false.
                    </li>
                  </ul>
                </li>
                <li>
                  Do while: A do while loop is an example of an exit control
                  loop because, unlike a while loop, it checks for conditions
                  after executing the statements.
                  <p>
                    The execution of the statement or statements initiates the
                    do while loop. No condition is ever checked for the first
                    time.
                  </p>
                  <ul>
                    <li>
                      The condition is tested to see if it is true or false
                      after the statements have been executed and the variable
                      value has been updated. If it is determined to be true,
                      the loop's subsequent iteration begins.
                    </li>
                    <li>
                      The loop ends, signaling the completion of its life cycle,
                      when the condition is determined to be false.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </Element>
          <Element name="section2">
            <section>
              <h5>Risks of Loops</h5>
              <p>
                Infinite loop: One of the most frequent errors when using any
                kind of looping is that it may never end, meaning the loop
                continues indefinitely. When the condition fails for some
                reason, this occurs. Examples:
              </p>
              <p>
                Control statements are used in programming languages to regulate
                how a program is executed based on specific criteria. These are
                used to direct the flow of execution to advance and diverge in
                response to changes in a program's state.
              </p>
              <p>
                A further danger is that if you are adding items to your
                collection object in a loop, you risk running out of memory. The
                program below will eventually throw an out of memory exception
                if you attempt to run it.
              </p>
              <h5>Narrow Loop:</h5>
              <p>
                A loop statement nested inside another loop statement is known
                as a nested loop. For loop, while loop, and do-while loop are
                just a few examples of loop combinations.
              </p>
            </section>
          </Element>
          <Element name="section3">
            <section>
              <h2>Pop Quiz</h2>
              <ol>
                <li>
                  What is the fundamental purpose of a loop in programming?
                </li>
                <textarea
                  name="concept"
                  id="concept"
                  cols="30"
                  rows="10"
                ></textarea>
                <li>
                  Differentiate between a "while" loop and a "for" loop in Java.
                </li>
                <textarea
                  name="concept"
                  id="concept"
                  cols="30"
                  rows="10"
                ></textarea>
                <li>
                  What is the key difference between an "entry control loop" and
                  an "exit control loop"?
                </li>
                <textarea
                  name="concept"
                  id="concept"
                  cols="30"
                  rows="10"
                ></textarea>
              </ol>
            </section>
          </Element>
        </div>
      </div>
    </>
  );
}

export default Loops_Iteration;
