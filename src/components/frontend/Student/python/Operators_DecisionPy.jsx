import React from "react";
import "./Python.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Operations_DecisionPy() {
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
        <h3>Python Operations and Decision Constructs</h3>
        <ul>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section1"
              smooth={true}
              duration={500}
            >
              Python Operators
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
              <h2>Python Operators</h2>
              <p>
                Operators are used to perform operations on variables and
                values. In the example below, we use the + operator to add
                together two values:
              </p>
              <h5>Example:</h5>
              <p>print(10 + 5)</p>
              <p>Python divides the operators in the following groups:</p>
              <ul>
                <li>Arithmetic Operators</li>
                <li>Assignment operators</li>
                <li>Comparison operators</li>
                <li>Logical operators</li>
                <li>Identity operators</li>
                <li>Membership operators</li>
                <li>Bitwise operators</li>
              </ul>
              <h5>Python Arithmetic Operators</h5>
              <p>
                Arithmetic operators are used with numeric values to perform
                common mathematical operations:
              </p>
              <table className="table table-bordered table-striped" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Name</th>
                  <th>Example</th>
                </tr>
                <tr>
                  <td>+</td>
                  <td>Addition</td>
                  <td>x + y</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>Subtraction</td>
                  <td>x - y</td>
                </tr>
                <tr>
                  <td>*</td>
                  <td>Multiplication</td>
                  <td>x * y</td>
                </tr>
                <tr>
                  <td>/</td>
                  <td>Division</td>
                  <td>x / y</td>
                </tr>
                <tr>
                  <td>%</td>
                  <td>Modulus</td>
                  <td>x % y</td>
                </tr>
                <tr>
                  <td>**</td>
                  <td>Exponentiation</td>
                  <td>x ** y</td>
                </tr>
                <tr>
                  <td>//</td>
                  <td>Floor Division</td>
                  <td>x // y</td>
                </tr>
              </table>
              <h5>Python Assignment Operators</h5>
              <p>
                Assignment operators are used to assign values to variables:
              </p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Example</th>
                  <th>Same As</th>
                </tr>
                <tr>
                  <td>=</td>
                  <td>x = 5</td>
                  <td>x = 5</td>
                </tr>
                <tr>
                  <td>+=</td>
                  <td>x += 3</td>
                  <td>x = x + 3</td>
                </tr>
                <tr>
                  <td>-=</td>
                  <td>x -= 3</td>
                  <td>x = x - 3</td>
                </tr>
                <tr>
                  <td>*=</td>
                  <td>x *= 3</td>
                  <td>x = x * 3</td>
                </tr>
                <tr>
                  <td>/=</td>
                  <td>x /= 3</td>
                  <td>x = x / 3</td>
                </tr>
                <tr>
                  <td>%=</td>
                  <td>x %= 3</td>
                  <td>x %= 3 x = x % 3</td>
                </tr>
                <tr>
                  <td>//=</td>
                  <td>x //= 3</td>
                  <td>x = x // 3</td>
                </tr>
                <tr>
                  <td>**=</td>
                  <td>x **= 3</td>
                  <td>x = x ** 3</td>
                </tr>
                <tr>
                  <td>&=</td>
                  <td>x &= 3</td>
                  <td>x = x & 3</td>
                </tr>
                <tr>
                  <td>|=</td>
                  <td>x |= 3</td>
                  <td>x = x | 3</td>
                </tr>
                <tr>
                  <td>^=</td>
                  <td>x ^= 3</td>
                  <td>x = x ^ 3</td>
                </tr>
                <tr>
                  <td>{">>="}</td>
                  <td>{"x >>= 3"}</td>
                  <td>{"x = x >> 3"}</td>
                </tr>
                <tr>
                  <td>{"<<="}</td>
                  <td>{"x <<= 3"}</td>
                  <td>{"x = x << 3"}</td>
                </tr>
              </table>
              <h5>Python Comparison Operators</h5>
              <p>Comparison operators are used to compare two values:</p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Name</th>
                  <th>Example</th>
                </tr>
                <tr>
                  <td>==</td>
                  <td>Equal</td>
                  <td>x == y</td>
                </tr>
                <tr>
                  <td>!=</td>
                  <td>Not equal</td>
                  <td>x != y</td>
                </tr>
                <tr>
                  <td>{">"}</td>
                  <td>Greater than</td>
                  <td>{"x > y"}</td>
                </tr>
                <tr>
                  <td>{"<"}</td>
                  <td>Less than</td>
                  <td>{"x < y"}</td>
                </tr>
                <tr>
                  <td>{">="}</td>
                  <td>Greater than or equal to</td>
                  <td>{"x >= y"}</td>
                </tr>
                <tr>
                  <td>{"<="}</td>
                  <td>Less than or equal to</td>
                  <td>{"x <= y"}</td>
                </tr>
              </table>
              <h5>Python Logical Operators</h5>
              <p>
                Logical operators are used to combine conditional statements:
              </p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
                <tr>
                  <td>and</td>
                  <td>Returns True if both statements are true</td>
                  <td>{"x < 5 and  x < 10"}</td>
                </tr>
                <tr>
                  <td>or</td>
                  <td>Returns True if one of the statements is true</td>
                  <td>{"x < 5 or x < 4"}</td>
                </tr>
                <tr>
                  <td>not</td>
                  <td>
                    Reverse the result, returns False if the result is true
                  </td>
                  <td>{"not(x < 5 and x < 10)"}</td>
                </tr>
              </table>
              <h5>Python Identity Operators</h5>
              <p>
                Identity operators are used to compare the objects, not if they
                are equal, but if they are actually the same object, with the
                same memory location:
              </p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
                <tr>
                  <td>is</td>
                  <td>Returns True if both variables are the same object</td>
                  <td>x is y</td>
                </tr>
                <tr>
                  <td>is not</td>
                  <td>
                    Returns True if both variables are not the same object
                  </td>
                  <td>x is not y</td>
                </tr>
              </table>
              <h5>Python Membership Operators</h5>
              <p>
                Membership operators are used to test if a sequence is presented
                in an object:
              </p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
                <tr>
                  <td>in</td>
                  <td>
                    Returns True if a sequence with the specified value is
                    present in the object
                  </td>
                  <td>x in y</td>
                </tr>
                <tr>
                  <td>not in</td>
                  <td>
                    Returns True if a sequence with the specified value is not
                    present in the object
                  </td>
                  <td>x not in y</td>
                </tr>
              </table>
              <h5>Python Bitwise Operators</h5>
              <p>Bitwise operators are used to compare (binary) numbers:</p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
                <tr>
                  <td>&</td>
                  <td>AND</td>
                  <td>Sets each bit to 1 if both bits are 1</td>
                  <td>x & y</td>
                </tr>
                <tr>
                  <td>|</td>
                  <td>OR</td>
                  <td>Sets each bit to 1 if one of two bits is 1</td>
                  <td>x | y</td>
                </tr>
                <tr>
                  <td>^</td>
                  <td>XOR</td>
                  <td>Sets each bit to 1 if only one of two bits is 1</td>
                  <td>x ^ y</td>
                </tr>
                <tr>
                  <td>~</td>
                  <td>NOT</td>
                  <td>Inverts all the bits</td>
                  <td>~x</td>
                </tr>
                <tr>
                  <td>{"<<"}</td>
                  <td>Zero fill left shift</td>
                  <td>
                    Shift left by pushing zeros in from the right and let the
                    leftmost bits fall off
                  </td>
                  <td>{"x << 2"}</td>
                </tr>
                <tr>
                  <td>{">>"}</td>
                  <td>Signed right shift</td>
                  <td>
                    Shift right by pushing copies of the leftmost bit in from
                    the left, and let the rightmost bits fall off
                  </td>
                  <td>{"x >> 2"}</td>
                </tr>
              </table>
              <h5>Operator Precedence</h5>
              <p>
                Operator precedence describes the order in which operations are
                performed.
              </p>
              <h5>Example</h5>
              <p>
                Parentheses has the highest precedence, meaning that expressions
                inside parentheses must be evaluated first:
              </p>
              <p>print((6 + 3) - (6 + 3))</p>
              <h5>Example</h5>
              <p>
                Multiplication * has higher precedence than addition +, and
                therefor multiplications are evaluated before additions:
              </p>
              <p>print(100 + 5 * 3)</p>
              <p>
                The precedence order is described in the table below, starting
                with the highest precedence at the top:
              </p>
              <table className="table table-bordered" border="2">
                <tr>
                  <th>Operator</th>
                  <th>Desscription</th>
                </tr>
                <tr>
                  <td>()</td>
                  <td>Parentheses</td>
                </tr>
                <tr>
                  <td>**</td>
                  <td>Exponentiation</td>
                </tr>
                <tr>
                  <td>+x -x ~x</td>
                  <td>Unary plus, unary minus, and bitwise NOT</td>
                </tr>
                <tr>
                  <td>* / // %</td>
                  <td>Multiplication, division, floor division, and modulus</td>
                </tr>
                <tr>
                  <td>+ -</td>
                  <td>Addition and subtraction</td>
                </tr>
                <tr>
                  <td>{"<<  >>"}</td>
                  <td>Bitwise left and right shifts</td>
                </tr>
                <tr>
                  <td>&</td>
                  <td>Bitwise AND</td>
                </tr>
                <tr>
                  <td>^</td>
                  <td>Bitwise XOR</td>
                </tr>
                <tr>
                  <td>|</td>
                  <td>Bitwise OR</td>
                </tr>
                <tr>
                  <td>{"==  !=  >  >=  <  <=  is  is not  in  not in "}</td>
                  <td>Comparisons, identity, and membership operators</td>
                </tr>
                <tr>
                  <td>not</td>
                  <td>Logical NOT</td>
                </tr>
                <tr>
                  <td>and</td>
                  <td>AND</td>
                </tr>
                <tr>
                  <td>or</td>
                  <td>OR</td>
                </tr>
              </table>
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

export default Operations_DecisionPy;
