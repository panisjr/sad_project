import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Login() {
  // To show the message to the users
  const [role, setRole] = useState("student");
  const [data, setData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleHide = () => {
    setShowLoginModal(false);
  };
  // To navigate from other pages
  //UseState to store the inputs
  const [loginIdnumber, setLoginIdnumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //On click to get what the user enteredf
  const loginUser = async (e) => {
    e.preventDefault();
    if (loginIdnumber === "" || loginPassword === "") {
      setShowLoginModal(true);
    } else {
      try {
        // Rest of the logic remains the same
        const res = await axios.post("http://localhost:8081/login", {
          LoginIdnumber: loginIdnumber,
          LoginPassword: loginPassword,
          LoginRole: role,
        });
        setData(res);
        if (res.data.role) {
          switch (res.data.role) {
            case "student":
              navigate("/studentDash");
              break;
            case "teacher":
              navigate("/teacherDash");
              break;
            default:
              setShowLoginModal(true);
          }
        } else if (
          res.data.password === storedPassword &&
          loginIdnumber === "2100880"
        ) {
          navigate("/admin");
        } else {
          console.log("Error: Passwords don't match");
        }
      } catch (error) {
        setShowLoginModal(true);
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            {/* Account dont exist */}
            <Modal show={showLoginModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Account Invalid</Modal.Title>
              </Modal.Header>
              <Modal.Body>Account don't exist! Unable to login.</Modal.Body>
              <Modal.Body>
                Make sure you entered a correct Password or ID number
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleHide}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="col-md-6 side-image">
              {/* Image icon */}
              {/* <img src="assets/car-icon.png" alt=""/> */}
              <div className="text">
                <p>
                  Welcome Back!
                  <i />
                </p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <form>
                  <h4 className="pb-5 text-center">Login account</h4>
                  {/* Role choose Student or Teacher */}
                  {/* Student */}
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="student"
                      name="role"
                      value="student"
                      className="form-check-input"
                      checked={role === "student"}
                      style={{ cursor: "pointer" }}
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    />
                    <label
                      htmlFor="student"
                      className="form-check-label"
                      style={{ cursor: "pointer" }}
                    >
                      Student
                    </label>
                  </div>
                  {/* Teacher */}
                  <div className="form-check form-check-inline mb-2">
                    <input
                      type="radio"
                      id="teacher"
                      name="role"
                      value="teacher"
                      className="form-check-input"
                      checked={role === "teacher"}
                      style={{ cursor: "pointer" }}
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    />
                    <label
                      htmlFor="teacher"
                      className="form-check-label"
                      style={{ cursor: "pointer" }}
                    >
                      Teacher
                    </label>
                  </div>
                  {/* ID Number Input */}
                  <div className="input-field">
                    <input
                      type="number"
                      className="input no-spin"
                      id="id_number"
                      required
                      autoComplete="off"
                      onChange={(event) => {
                        setLoginIdnumber(event.target.value);
                      }}
                    />
                    <label htmlFor="id_number">ID Number</label>
                  </div>

                  {/* <!-- Password Input --> */}
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password"
                      name="password"
                      required
                      onChange={(event) => {
                        setLoginPassword(event.target.value);
                      }}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field">
                    <button
                      type="submit"
                      onClick={loginUser}
                      className="submit"
                    >
                      Login
                    </button>
                  </div>
                  <div className="signin">
                    <span>
                      Don't have an account?{" "}
                      <Link to="/register">Register in here</Link>
                    </span>
                  </div>
                  <div className="signin">
                    <span>
                      <Link to="/">exit</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
