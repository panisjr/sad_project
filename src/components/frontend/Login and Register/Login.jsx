import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faLock, faXmark } from "@fortawesome/free-solid-svg-icons";
function Login() {
  useEffect(() => {
    document.title = "CodePulse | Login";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
  // To show the message to the users
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginIdnumber, setLoginIdnumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  //On click to get what the user entered
  axios.defaults.withCredentials = true;
  const loginUser = (e) => {
    e.preventDefault();
    if (loginIdnumber === "" || loginPassword === "") {
      setShowLoginModal(true);
    } else {
      // Rest of the logic remains the same
      axios
        .post("http://localhost:8081/login", {
          LoginIdnumber: loginIdnumber,
          LoginPassword: loginPassword,
        })
        .then((res) => {
          if (res.data.role) {
            switch (res.data.role) {
              case "student":
                navigate("/studentDash");
                break;
              case "teacher":
                navigate("/teacherDash");
                break;
              case "admin":
                navigate("/admin");
                break;
              default:
                setShowLoginModal(true);
            }
          } else {
            console.log("error logging in", res.data.id_number);
            console.log(loginIdnumber);
            setShowLoginModal(true);
          }
        })
        .catch((err) => {
          setShowLoginModal(true);
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
            {/* Account dont exist */}
            <Modal show={showLoginModal} onHide={refresh}>
              <Modal.Header>
                <Modal.Title>Account Invalid</Modal.Title>
              </Modal.Header>
              <Modal.Body>Account don't exist! Unable to login.</Modal.Body>
              <Modal.Body>
                Make sure you entered a correct Password or ID number
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={refresh}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="col-md-6 side-image">
              {/* Image icon */}
              {/* <img src="assets/car-icon.png" alt=""/> */}
              <div className="text">
                <h3 className="text-black ">Welcome Back!</h3>
              </div>
              <div className="qoute">
                <h3 className="text-black">
                  <i>Unlock the possibilities that await behind every login.</i>
                </h3>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <form>
                  <div className="exitBtn">
                    <Link to="/">
                      <FontAwesomeIcon
                        className="exitBtn"
                        icon={faXmark}
                        size="lg"
                      />
                    </Link>
                  </div>
                  <h1 className="pb-5 text-center">Login</h1>
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
                    <label htmlFor="id_number">
                      <FontAwesomeIcon
                        icon={faIdBadge}
                        size="lg"
                        style={{ marginRight: "10px" }}
                      />
                      ID Number
                    </label>
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
                    <label htmlFor="password">
                      <FontAwesomeIcon
                        icon={faLock}
                        size="lg"
                        style={{ marginRight: "10px" }}
                      />
                      Password
                    </label>
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
