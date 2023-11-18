import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function AddCourse() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [showModal, setShowModal] = useState(false);
  const [showTopicDeleteModal, setShowTopicDeleteModal] = useState(false);
  const [data, setData] = useState([]);

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  useEffect(() => {
    // Fetch data from the server using Axios
    axios
      .get("http://localhost:8081/courseData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/topicDelete/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Admin Profile Info */}
      <div className="container-fluid bg">
        <div className="row admin_container">
          <div className="col-2 text-center custom-AdminInfo">
            <h3 className="pt-4">Admin</h3>

            {/* Logout button */}
            <div className=" d-grid align-items-center justify-content-center">
              <Link className="btn btn-outline-warning mb-2 mt-5" to="/admin">
                Dashboard
              </Link>
              <Link
                className=" btn btn-outline-warning mb-2"
                to="/studentAdmin"
              >
                Student
              </Link>
              <Link
                className=" btn btn-outline-warning mb-2"
                to="/teacherAdmin"
              >
                Teacher
              </Link>
              {/* To Add Course */}
              <Link className=" btn btn-outline-warning mb-2" to="/quizzes">
                Quizzes
              </Link>
              <Link className=" btn btn-outline-warning" to="/addcourse">
                Courses
              </Link>
            </div>
            <Link
              className="btn btn-primary logoutBtn "
              onClick={() => setShowModal(true)}
            >
              Logout
            </Link>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Logout Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to logout?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Admin Dashboard */}
          <div className="col-10 text-center adminCourseContainer">
            <div className="topicContainer">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <h4 className="text-black">Topic</h4>
                <Link className="btn btn-warning ms-5 mb-1" to="/addTopic">
                  Add
                </Link>
              </div>
              <table className="table table-bordered topicTable">
                <thead>
                  <tr>
                    <th className="bg-warning">Courses</th>
                    <th className="bg-warning"></th>
                  </tr>
                </thead>
                {data.length === 0 ? (
                  <tbody>
                    <tr>
                      <td className="bg-light text-black">Empty</td>
                    </tr>
                  </tbody>
                ) : (
                  data.map((item) => (
                    <tbody>
                      <tr key={item.id}>
                        <td className="bg-light text-black">{item.topic}</td>
                        <td>
                          <Link className="btn btn-success" to="/editTopic">
                            Edit
                          </Link>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => setShowTopicDeleteModal(true)}
                          >
                            <span>delete</span>
                          </button>
                          {/* Delete Modal */}
                          <Modal
                            show={showTopicDeleteModal}
                            onHide={() => setShowTopicDeleteModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete this topic?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="primary"
                                key={item.id}
                                onClick={(e) => handleDelete(item.id)}
                              >
                                Yes
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => setShowTopicDeleteModal(false)}
                              >
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          {/* End Delete Modal */}
                        </td>
                      </tr>
                    </tbody>
                  ))
                )}
              </table>
            </div>
            <div className="topicContainer">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <h4 className="text-black">Quiz</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCourse;
