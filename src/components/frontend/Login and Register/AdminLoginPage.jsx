import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLoginPage.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AdminLoginPage() {
  // To show the message to the users
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  const adminLoginPage = () => {
    navigate("/adminLoginPage");
  };
  const handleHide = () => {
    setShowLoginModal(false);
  };
  // To navigate from other pages
  //UseState to store the inputs

  //On click to get what the user enteredf
  const loginUser = async (e) => {
    e.preventDefault();
    if (adminPassword === "") {
      setShowLoginModal(true);
    } else {
      try {
        // Rest of the logic remains the same
        const res = await axios
          .post("http://localhost:8081/adminLogin", {
            AdminUsername: adminUsername,
            AdminPassword: adminPassword,
          })
          .then((res) => {
            if (res.data.username === adminUsername) {
              navigate("/admin");
            } else {
              setShowPasswordModal(true);
            }
          })
          .catch((error) => {
            setShowLoginModal(true);
            console.log(error);
          });
      } catch (error) {
        setShowLoginModal(true);
        console.log("Error Logging in", error);
      }
    }
  };

  return (
    <>
      <div className="adminWrapper">
        <div className="container main">
          <div className="row">
            {/* Password Incorrect */}
            <Modal show={showPasswordModal} onHide={handleHide}>
              <Modal.Header>
                <Modal.Title>Password Invalid</Modal.Title>
              </Modal.Header>
              <Modal.Body>Password is incorrect!</Modal.Body>
              <Modal.Body>Make sure you enter a correct password.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={adminLoginPage}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
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
                <p>Welcome Back!</p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <form>
                  <h4 className="pb-5 text-center">Admin Login</h4>

                  {/* <!-- Password Input --> */}
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="username"
                      name="username"
                      required
                      autoComplete="off"
                      onChange={(event) => {
                        setAdminUsername(event.target.value);
                      }}
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password"
                      name="password"
                      required
                      autoComplete="off"
                      onChange={(event) => {
                        setAdminPassword(event.target.value);
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

export default AdminLoginPage;
