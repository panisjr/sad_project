import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Admin.css";
// import myImage from "./images/happy-student-posing-with-hands-up.jpg";
function AddTopic() {
  const [addTopic, setAddTopic] = useState("");
  const [showSuccessfulModal, setShowSuccessful] = useState(false);
  const navigate = useNavigate();
  const handleHide = () => {
    console.log("Register is about to be hidden");
    setShowSuccessful(false);
  };
  const addCoursePage = () => {
    navigate("/addcourse");
  };
  const handleAddTopic = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/addTopic", {
        AddTopic: addTopic,
      })
      .then((res) => {
        if (res) {
          // Usage in createUser function
          setShowSuccessful(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container-fluid bg">
        {/* Account Successfully Registered */}
        <Modal show={showSuccessfulModal} onHide={handleHide}>
          <Modal.Header>
            <Modal.Title>Topic</Modal.Title>
          </Modal.Header>
          <Modal.Body>Topic Added Successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={addCoursePage}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="addtopicContainer">
          <nav className="landingNavbar">
            <ul>
              <li>
                <Link to="/addcourse" className="landingNavButton">
                  back
                </Link>
              </li>
            </ul>
          </nav>
          <div className="topicContentContainer">
            <div>
              <h4>Add Topic</h4>
              <form className="formContainer" onSubmit={handleAddTopic}>
                <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    onChange={(event) => {
                      setAddTopic(event.target.value);
                      autoComplete = "off";
                      required;
                    }}
                  />
                </div>
                <div className="input-field">
                  <button type="submit" className="btn btn-warning mt-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTopic;
