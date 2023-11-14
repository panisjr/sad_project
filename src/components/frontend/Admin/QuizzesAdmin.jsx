import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function Quizzes() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleStudent = () => {
    // Implement navigation to the Java course dashboard
    navigate("/studentAd"); // Define your route for the Java dashboard
  };

  const handleTeacher = () => {
    // Implement navigation to the Python course dashboard
    navigate("/teacherAd"); // Define your route for the Python dashboard
  };

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);
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
          <div className="col-10 text-center dash_admin">
            <div className="col-10 d-flex align-items-center welcome">
              <h1 className="pt-4 ">Welcome to Dashboard!</h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="custom_data col bg-warning rounded p-2">
                <h5>Students</h5>
                <p>Total Students 20</p>
              </div>
              <div className="custom_data col bg-primary ms-2 rounded p-2">
                {" "}
                <h5>Teachers</h5>
                <p>Total Teachers 23</p>
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

export default Quizzes;
