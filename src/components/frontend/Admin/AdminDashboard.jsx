import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function AdminDashboard() {
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
            <h3 className="pt-4">Admin Profile</h3>

            {/* Logout button */}
            <div className=" d-grid align-items-center justify-content-center">
              <button
                className="courseButton btn btn-outline-warning mb-2"
                onClick={handleStudent}
              >
                Student Users
              </button>
              <button
                className="courseButton btn btn-outline-warning"
                onClick={handleTeacher}
              >
                Teacher Users
              </button>
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
            <div className="col-5 bg-primary">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Topics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="d-flex justify-content-between">
                      Topic 1<button className="btn btn-success">Edit</button>
                      <button className="btn btn-warning">add</button>
                      <button className="btn btn-danger">delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
