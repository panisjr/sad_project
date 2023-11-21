import React, { useState } from "react";
import axios from "axios";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function Register() {
  //To navigate the user
  const refresh = () => {
    window.location.reload();
  };
  // UseState to hold our Inputs from users
  const [id_number, setIdnumber] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [data, setData] = useState([]);
  // MODAL SHOW
  // To show the Register Message
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // To show the Email Validation Message
  const [showEmailModal, setModalEmailModal] = useState(false);
  // To show ID number Validation Message
  const [showIdNumberModal, setShowIdNumberModal] = useState(false);
  // To show password Validation Message
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // To show ID number Validation Message
  const [showSuccessfulModal, setShowSuccessful] = useState(false);
  // To hide the Modal Message
  const handleHide = () => {
    console.log("Register is about to be hidden");
    setShowRegisterModal(false);
    setModalEmailModal(false);
    setShowIdNumberModal(false);
    setShowSuccessful(false);
    setShowPasswordModal(false);
  };
  // END mODAL SHOW
  // This is to validate Email
  const validateEmail = (email) => {
    // email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const validateStudentIdnumber = (id_number) => {
    // Regular expression for basic email validation
    const idPattern = /^\d{7}$/;
    return idPattern.test(id_number);
  };
  const validateTeacherIdnumber = (id_number) => {
    // Regular expression for basic email validation
    const idPattern = /^\d{8}$/;
    return idPattern.test(id_number);
  };
  //Onclick to get what the data that the user entered
  const handleRegistration = async (e) => {
    e.preventDefault();
    //Validte based on role
    let isValidIdNumber = true;
    if (role === "student") {
      isValidIdNumber = validateStudentIdnumber(id_number);
    } else if (role === "teacher") {
      isValidIdNumber = validateTeacherIdnumber(id_number);
    }
    // Validate email
    const isValidEmail = validateEmail(email);

    if (!isValidIdNumber) {
      setShowIdNumberModal(true);
    } else if (!isValidEmail) {
      setModalEmailModal(true);
    } else {
      axios
        .post("http://localhost:8081/register", {
          Idnumber: id_number,
          Username: username,
          Email: email,
          Password: password,
          Role: role,
        })
        .then((res) => {
          if (res) {
            // Usage in createUser function
            setShowSuccessful(true);
            // To clear the field after the input
            setIdnumber("");
            setUsername("");
            setEmail("");
            setPassword("");
          }
        })
        .catch((error) => {
          if (error) {
            setShowRegisterModal(true);
          }
        });
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            {/* This is to show the error message and success message */}
            {/* Account Successfully Registered */}
            <Modal show={showSuccessfulModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>Successfully Registered an Account!</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={refresh}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Account Password Registered */}
            <Modal show={showPasswordModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>Create another password!</Modal.Body>
              <Modal.Body>Password is invalid!</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleHide}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Register Message */}
            <Modal show={showRegisterModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>ID number or Email is already taken!</Modal.Body>
              <Modal.Body>Want to register again?</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleHide}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleHide}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Email validation */}
            <Modal show={showEmailModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Email</Modal.Title>
              </Modal.Header>
              <Modal.Body>Email is Invalid! Unable to register</Modal.Body>
              <Modal.Body>Please try again later.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleHide}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            {/* ID number validation */}
            <Modal show={showIdNumberModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>ID Number</Modal.Title>
              </Modal.Header>
              <Modal.Body>ID number is Invalid! Unable to register.</Modal.Body>
              <Modal.Body>Please try again later.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleHide}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            {/* The modal ends here! */}
            <div className="col-md-6 side-image">
              {/* <img src="assets/car-icon.png" alt=""> */}
              <div className="text">
                <p>Welcome Back!</p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <h4 className="pb-5 text-center">Register account</h4>
                <form onSubmit={handleRegistration}>
                  {/* ID Number Input */}
                  <div className="input-field">
                    <input
                      type="number"
                      className="input no-spin"
                      id="id_number"
                      onChange={(event) => {
                        setIdnumber(event.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="id_number">ID Number</label>
                  </div>
                  {/* <!-- Name Input --> */}
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="username">Name</label>
                  </div>
                  {/* <!-- Email Input  --> */}
                  <div className="input-field">
                    <input
                      type="email"
                      className="input"
                      id="email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>

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
                  {/* End for Role Student or Teacher */}
                  {/* <!-- Password Input --> */}
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  {/* <!----------------------Button-----------------------> */}
                  <div className="input-field">
                    <button type="submit" className="submit">
                      Register
                    </button>
                  </div>
                  <div className="signin">
                    <Link to="/admin" className="btn btn-outline-danger">
                      Exit
                    </Link>
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

export default Register;
