import React from "react";
import "./Python.css";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function ExpressionPy() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/studentJava");
  };
  return (
    <>
      <nav className="navbar">
        <h3>Java Data Types</h3>
        <ul>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section1"
              smooth={true}
              duration={500}
            >
              Expressions
            </Link>
          </li>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section2"
              smooth={true}
              duration={500}
            >
              The second
            </Link>
          </li>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section3"
              smooth={true}
              duration={500}
            >
              Operator Precedence
            </Link>
          </li>
          <li>
            <Link
              style={{ cursor: "pointer" }}
              to="section4"
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
              <h2>Expressions accomplish what a Java application would do.</h2>
              <p>
                Expressions are used, among other things, to compute and assign
                values to variables and to help manage the program's execution
                flow. An expression has two tasks: it must carry out the
                computation specified by its constituents and return a value.
              </p>
              <p>
                An expression is a collection of variables, operators, and
                method calls that all evaluate to the same value and is built
                using the syntax of the language.
              </p>
              <p>
                The use of an operator is an expression because, as you
                discovered on the previous page, operators return a value. For
                instance, the claim
              </p>
              <p>count++;</p>
              <p>
                The term comes from the character-counting program. This
                specific expression is evaluated to count's value prior to the
                operation.
              </p>
              <p>
                An expression's return value's data type is determined by the
                elements it contains. Because count is an integer and ++ gives a
                value of the same data type as its operand, the expression
                count++ produces an integer. Various other expressions return
                Strings, boolean values, and so forth.
              </p>
              <p>
                The character-counting software also has a few more expressions
                in addition to count++, like:
              </p>
              <p>System in read mode!= -1</p>
              <p>
                This expression is unique because it combines elements from two
                different expressions. A method call appears in the first
                expression:
              </p>
              <p>
                The data type of a method call expression is the same as the
                data type of the method's return value because a method call
                expression evaluates to that value. System.in.read() evaluates
                to an integer because the method's return type is specified as
                an integer.
              </p>
              <p></p>
            </section>
          </Element>
          <Element name="section2">
            <section>
              <h2>
                The second statement's second expression was System.in.read()!
              </h2>
              <p>
                The use of the is = -1.operator =. Remember that!For inequality,
                = compares its two operands. System.in.read() and -1 are the
                operands in the questioned statement. As an operand for,
                System.in.read() is acceptable.= as a result of the expression
                that evaluates to an integer in System.in.read().
                System.in.read(), then.= -1 compares two integers, -1 and the
                result of using System.in.read(). The result of the!
                command.Depending on the result of the comparison, the statement
                = is either true or false.
              </p>
              <p>
                As you can see, Java enables you to build compound expressions
                and statements out of a number of simpler expressions as long as
                the data types needed for each part of the expression match. The
                manner in which a compound expression is evaluated matters as
                well, as you may have inferred from the preceding example!
              </p>
              <p>Consider the following compound word:</p>
              <p>x * y * z</p>
              <p>
                The order in which the phrase is evaluated in this particular
                case is irrelevant since multiplication produces consistent
                results regardless of the order in which the operations are
                applied.
              </p>
              <p>
                Not every expression falls under this category, though. For
                instance, using this phrase with either the addition or division
                operation first yields different results:
              </p>
              <p>x + y / 100</p>
              <p>
                When using balanced parentheses (and), you can directly tell the
                Java compiler how you want an expression to be evaluated. To
                make the preceding sentence clear, you could, for instance,
                write (x + y)/100.
              </p>
              <p>
                The compiler makes its decision based on the priority given to
                the operators and other elements used in the expression if you
                don't expressly tell it how you want operations to be carried
                out. Higher precedence operators are evaluated first. For
                instance, the compiler would evaluate y / 100 first in the
                compound phrase x + y / 100 since the division operator has a
                greater precedence than the addition operator. Thus
              </p>
              <p>x + y / 100</p>
              <p>is comparable to</p>
              <p>x + (y / 100)</p>
              <p>
                You should be explicit and use parentheses to denote which
                operators should be evaluated first in order to make your code
                simpler to read and maintain.
              </p>
              <p>
                The order in which Java's operators are listed in the following
                chart. The precedence of the operators in this table is arranged
                from highest to lowest; the higher an operator appears in the
                table, the higher its precedence. Before operators with a
                substantially lower precedence, those with a higher precedence
                are evaluated. Operators on the same line are evaluated in left
                to right order and with equal priority.
              </p>
            </section>
          </Element>
          <Element name="section3">
            <section>
              <h2>Operator Precedence in Java</h2>
              <p>postfix operators [] . (params) expr++ expr--</p>
              <p>unary operators ++expr --expr +expr -expr ~ !</p>
              <p>creation or cast new (type)expr</p>
              <p>multiplicative * / %</p>
              <p>additive + -</p>
              {/* <p>shift <<>>>>></p> */}
              {/* <p>relational                < > <= >= instanceof</p> */}
              <p>equality == !=</p>
              <p>bitwise AND &</p>
              <p>bitwise exclusive OR ^</p>
              <p>bitwise inclusive OR |</p>
              <p>logical AND &&</p>
              <p>logical OR ||</p>
              <p>conditional ? :</p>
              {/* <p>assignment                = += -= *= /= %= ^= &= |= <<= >>= >>>=</p> */}
            </section>
          </Element>
          <Element name="section4">
            <section>
              <h2>Pop Quiz</h2>
              <ol>
                <li>What is the purpose of an expression in Java?</li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
                <li>
                  Give an example of a Java expression that increments a
                  variable by 1.
                </li>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter here..."
                ></input>
                <li>Explain the concept of operator precedence in Java.</li>
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

export default ExpressionPy;
