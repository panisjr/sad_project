import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faChevronRight,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./icons/program.png";

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
  const [totalJavaCourses, setTotalJavaCourses] = useState("");
  const [totalPythonCourses, setTotalPythonCourses] = useState("");
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  // To get the Total Student Account
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
  // End
  // To get the Total Teacher Account
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
  // End
  // To get the Total Java and Python Course
  // Java
  useEffect(() => {
    // Fetch total rows from the server
    axios
      .get("http://localhost:8081/totalJavaCourses")
      .then((response) => {
        // Update state with the total rows
        setTotalJavaCourses(response.data.totalJavaCourses);
      })
      .catch((error) => {
        console.error("Error fetching total rows:", error);
      });
  }, []);
  // Python
  useEffect(() => {
    // Fetch total rows from the server
    axios
      .get("http://localhost:8081/totalPythonCourses")
      .then((response) => {
        // Update state with the total rows
        setTotalPythonCourses(response.data.totalPythonCourses);
      })
      .catch((error) => {
        console.error("Error fetching total rows:", error);
      });
  }, []);
  // End
  return (
    <>
      {/* Admin Profile Info */}
      <div className="container-fluid adminDashWrapper">
        <div className="row admin_container">
          <div className="col-2 text-center adminInfo">
            <div className="logoContainer">
              <img src={logo} alt="Website Logo" className="adminLogo" />
              <h5 className="adminLogoName">CodePulse</h5>
            </div>
            <h3 className="mt-5">Dashboard</h3>
            <Link className="btn btn-light mt-5 m-2" to="/register">
              Register New Account <FontAwesomeIcon icon={faChevronRight} />
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
          <div className="col-10 text-center adminContent">
            <div className="row adminContentRow">
              <nav className="adminNavbar">
                <div>
                  <label htmlFor="">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      size="xl"
                      style={{ marginRight: "10px" }}
                    />
                    Admin
                  </label>
                </div>
                {/* Logout button */}
                <div>
                  <Link
                    className="btn btn-outline-light"
                    onClick={() => setShowModal(true)}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </Link>
                </div>
              </nav>
              <div className="row dataListDisplay">
                <div className="col-md-2 customColumn rounded">
                  <Link
                    className="btn btn-outline-light customData"
                    to="/studentAdmin"
                  >
                    <h4>Students</h4>
                    <p>
                      Registered Accounts:{" "}
                      {totalStudent !== null ? totalStudent : "Loading..."}
                    </p>
                  </Link>
                </div>
                <div className="col-md-2 customColumn rounded">
                  <Link
                    className="btn btn-outline-light customData"
                    to="/teacherAdmin"
                  >
                    <h4>Instructors</h4>
                    <p>
                      Registered Accounts:{" "}
                      {totalTeacher !== null ? totalTeacher : "Loading..."}
                    </p>
                  </Link>
                </div>
                <div className="col-md-2 customColumn rounded">
                  <Link
                    className="btn btn-outline-light customData"
                    to="/addcourse"
                  >
                    <h4>Courses</h4>
                    <p>
                      Java Course:{" "}
                      {totalJavaCourses !== null
                        ? totalJavaCourses
                        : "Loading..."}
                    </p>
                    <p>
                      Python Course:{" "}
                      {totalPythonCourses !== null
                        ? totalPythonCourses
                        : "Loading..."}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
