import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [totalStudent, setTotalStudent] = useState("");
  const [totalTeacher, setTotalTeacher] = useState("");
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch total rows from the server
    axios
      .get("http://localhost:8081/totalStudent")
      .then((response) => {
        // Update state with the total rows
        setTotalStudent(response.data.totalStudent);
      })
      .catch((error) => {
        console.error("Error fetching total rows:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch total rows from the server
    axios
      .get("http://localhost:8081/totalTeacher")
      .then((response) => {
        // Update state with the total rows
        setTotalTeacher(response.data.totalTeacher);
      })
      .catch((error) => {
        console.error("Error fetching total rows:", error);
      });
  }, []);
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
          <div className="col-10 text-center adminContentContainer">
            <div className="col-10 d-flex align-items-center welcome">
              <h1 className="pt-4 ">Welcome to Dashboard!</h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="custom_data col bg-warning rounded p-2">
                <h5>Students</h5>
                <p>
                  Total Registered Accounts:{" "}
                  {totalStudent !== null ? totalStudent : "Loading..."}
                </p>
              </div>
              <div className="custom_data col bg-primary ms-2 rounded p-2">
                <h5>Teachers</h5>
                <p>
                  Total Registered Accounts:{" "}
                  {totalTeacher !== null ? totalTeacher : "Loading..."}
                </p>
              </div>
              <div className="custom_data col bg-success ms-2 rounded p-2">
                <h5>Quizzes</h5>
              </div>
              <div className="custom_data col bg-dark ms-2 rounded p-2">
                <h5>Courses</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
