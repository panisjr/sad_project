import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function AdminDashboard() {
  useEffect(() => {
    document.title = "CodePulse | Admin";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
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
      <div className="container-fluid adminDashWrapper">
        <div className="row admin_container">
          <div className="col-2 text-center adminInfo">
            <h3 className="pt-5">Admin</h3>

            {/* Logout button */}

            <Link
              className="btn btn-primary logoutBtnAdmin "
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
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Admin Dashboard */}
          <div className="col-10 text-center adminContentContainer">
            <div className="row customRow admin_container">
              <h1 className="welcomeAdmin">Welcome to Dashboard!</h1>
              <div className="col-md-5 customColumn rounded">
                <Link
                  className="custom_data btn btn-warning"
                  to="/studentAdmin"
                >
                  <h1 className="text-white">Students</h1>
                  <h5 className="text-white">
                    Total Registered Accounts:{" "}
                    {totalStudent !== null ? totalStudent : "Loading..."}
                  </h5>
                </Link>
              </div>
              <div className="col-md-5 customColumn rounded">
                <Link className="custom_data btn btn-warning" to="/addcourse">
                  <h1 className="text-white">Courses</h1>
                  <h5 className="text-white">
                    Total Registered Accounts:{" "}
                    {totalStudent !== null ? totalStudent : "Loading..."}
                  </h5>
                </Link>
              </div>
              <div className="col-md-5 customColumn rounded">
                <Link
                  className="custom_data btn btn-primary"
                  to="/teacherAdmin"
                >
                  <h1>Teachers</h1>
                  <h5>
                    Total Registered Accounts:{" "}
                    {totalTeacher !== null ? totalTeacher : "Loading..."}
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
