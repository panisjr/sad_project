import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faIdBadge,
  faEnvelope,
  faLock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
function Register() {
  useEffect(() => {
    document.title = "CodePulse | Register";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
  //To navigate the user
  const navigate = useNavigate();
  const admin = () => {
    setShowSuccessful(false);
    setIdnumber("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("student");
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
            // To clear the field after the input
            setIdnumber("");
            setUsername("");
            setEmail("");
            setPassword("");
            setRole("student");
            // Usage in createUser function
            setShowSuccessful(true);
          }
        })
        .catch((error) => {
          if (error) {
            setShowRegisterModal(true);
          }
        });
    }
  };

  useEffect(() => {
    // Options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the target is visible
    };

    // Callback function when the target becomes visible
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the 'animate' class when the target is visible
          entry.target.classList.add("animate");
          // Stop observing once the animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };

    // Create an Intersection Observer with the callback and options
    const observer = new IntersectionObserver(callback, options);

    // Target the element with the 'homeContainer' class
    const target1 = document.querySelector(".side-image");
    const target2 = document.querySelector(".right");
    const target3 = document.querySelector(".customLoginRow");

    // Start observing the target
    if (target1) {
      observer.observe(target1);
      observer.observe(target2);
      observer.observe(target3);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (target1) {
        observer.unobserve(target1);
        observer.unobserve(target2);
        observer.unobserve(target3);
      }
    };
  }, []); // Run the effect only once on mount
  return (
    <>
      <div className="wrapper">
        <div className="container main">
          <div className="row customLoginRow">
            {/* This is to show the error message and success message */}
            {/* Account Successfully Registered */}
            <Modal show={showSuccessfulModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>Successfully Registered an Account!</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={admin}>
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
                <form onSubmit={handleRegistration}>
                  <div className="exitBtn">
                    <Link to="/admin">
                      <FontAwesomeIcon
                        className="exitBtn"
                        icon={faXmark}
                        size="lg"
                      />
                    </Link>
                  </div>
                  <h4 className="pb-5 text-center">Register account</h4>
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
                    <label htmlFor="id_number">
                      <FontAwesomeIcon
                        icon={faIdBadge}
                        size="lg"
                        style={{ marginRight: "10px" }}
                      />
                      ID Number
                    </label>
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
                    <label htmlFor="username">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                        style={{ marginRight: "10px" }}
                      />
                      Name
                    </label>
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
                    <label htmlFor="email">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="lg"
                        style={{ marginRight: "10px" }}
                      />
                      Email
                    </label>
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
                      required
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
                      required
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
                    <label htmlFor="password">
                      <FontAwesomeIcon
                        icon={faLock}
                        size="lg"
                        style={{ marginRight: "10px" }}
                      />
                      Password
                    </label>
                  </div>

                  {/* <!----------------------Button-----------------------> */}
                  <div className="input-field">
                    <button type="submit" className="submit">
                      Register
                    </button>
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
