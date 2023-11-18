import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Admin.css";

function EditTopic() {
  const [editTopic, setEditTopic] = useState("");
  const [showSuccessfulModal, setShowSuccessful] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you're passing the topic ID in the URL

  const handleHide = () => {
    console.log("Edit Topic is about to be hidden");
    setShowSuccessful(false);
  };

  const addCoursePage = () => {
    navigate("/addcourse");
  };

  useEffect(() => {
    // Fetch existing topic data based on the ID
    axios
      .get(`http://localhost:8081/getTopic/${id}`)
      .then((res) => {
        setEditTopic(res.data.title); // Assuming the API response has a 'title' property
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEditTopic = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/editTopic/${id}`, {
        title: editTopic,
      })
      .then((res) => {
        if (res) {
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
        {/* Topic Successfully Edited */}
        <Modal show={showSuccessfulModal} onHide={handleHide}>
          <Modal.Header>
            <Modal.Title>Topic</Modal.Title>
          </Modal.Header>
          <Modal.Body>Topic Edited Successfully!</Modal.Body>
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
                  Back
                </Link>
              </li>
            </ul>
          </nav>
          <div className="topicContentContainer">
            <div>
              <h4>Edit Topic</h4>
              <form className="formContainer" onSubmit={handleEditTopic}>
                <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(event) => setEditTopic(event.target.value)}
                  />
                </div>
                <div className="input-field">
                  <button type="submit" className="btn btn-warning mt-3">
                    Save
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

export default EditTopic;
