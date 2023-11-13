import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";
import "./Student.css";

function StudentDashboard() {
  const navigate = useNavigate(); // Define the navigate function here
  // Define the data
  const [data, setData] = useState([]);
  const handleLNUMaterials = () => {
    navigate("/lnuMaterials"); // Define the route for StudentJavaDash
  };
  const handleJavaCourse = () => {
    navigate("/studentJava"); // Define the route for StudentJavaDash
  };

  const handlePythonCourse = () => {
    navigate("/studentPython"); // Define the route for StudentJavaDash
  };

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };

  //This is to upload profile
  const [imagecrop, setImageCrop] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setpview] = useState(false);

  const profileFinal = profile.map((item) => item.pview);

  const onClose = () => {
    setpview(null);
  };

  const onCrop = (view) => {
    setpview(view);
  };

  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setImageCrop(false);
  };

  useEffect(() => {
    // Fetch student data when the component mounts
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/studentinfo");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);
  return (
    <>
      {/* Student Profile Info */}
      <div className="container-fluid studentWrapper">
        <div className="studentContainer">
          <div className="text-center custom_studentInfo">
            <h3 className="pt-4">Student Profile</h3>

            {/* This is where you upload your profile */}
            <button className="btn">
              <img
                className="profile_picture"
                onClick={() => setImageCrop(true)}
                src={profileFinal.length ? profileFinal : img}
                alt=""
              />
              {data.map((item) => (
                <label
                  className="student_name font-semibold text-5xl "
                  key={item.username}
                >
                  {item.username}
                </label>
              ))}

              <div className="upload">
                <Dialog
                  visible={imagecrop}
                  header={() => (
                    <p
                      htmlFor=""
                      className="text-2xl font-semibold textColor dialog"
                    >
                      Update Profile
                    </p>
                  )}
                  onHide={() => setImageCrop(false)}
                >
                  <div className="confirmation-content flex flex-column align-items-center">
                    <Avatar
                      width={500}
                      height={400}
                      onCrop={onCrop}
                      onClose={onClose}
                      src={src}
                      shadingColor={"#474649"}
                      backgroundColor={"#474649"}
                    />
                    <div className="d-flex flex-column align-items-center mt-5 w-12">
                      <div className="flex justify-content-around w-12 mt-1">
                        <button
                          className="btn btn-light"
                          onClick={saveCropImage}
                          label="Save"
                          icon="pi pi-check"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog>
                <InputText
                  type="file"
                  accept="/image/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                      setImage(file);
                    } else {
                      setImage(null);
                    }
                  }}
                />
              </div>
            </button>

            {/* Logout button */}
            <Link
              className="btn btn-primary logout_student"
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

          {/* Student Dashboard */}
          <div className="text-center dash_student">
            <div className="welcome">
              <h1 className="pt-4 ">Welcome to Dashboard!</h1>
              <button
                className="btn btn-primary top-left-button"
                onClick={handleLNUMaterials}
              >
                LNU Materials
              </button>
            </div>

            <div className=" d-grid align-items-center justify-content-center mt-5 p-5">
              <button
                className="courseButton btn btn-primary mb-2 p-5"
                onClick={handleJavaCourse}
              >
                JAVA - Computer Programming I
              </button>
              <button
                className="courseButton btn btn-primary p-5"
                onClick={handlePythonCourse}
              >
                PYTHON - Computer Programming II
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default StudentDashboard;
