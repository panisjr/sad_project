import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";
import "./Admin.css";

function Student() {
  const navigate = useNavigate(); // Define the navigate function here
  // Define the data
  const [data, setData] = useState([]);
  const handleLNUMaterials = () => {
    navigate("/lnuMaterialsAdmin"); // Define the route for StudentJavaDash
  };
  const handleJavaCourse = () => {
    navigate("/javaDashAdmin"); // Define the route for StudentJavaDash
  };

  const handlePythonCourse = () => {
    navigate("/pythonDashAdmin"); // Define the route for StudentJavaDash
  };
  const back = () => {
    navigate("/admin");
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
    // Fetch data from the server using Axios
    axios
      .get("http://localhost:8081/studentinfo")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      {/* Student Profile Info */}
      <div className="container-fluid studentWrapper">
        <div className="row studentContainer">
          <div className="col-2 text-center custom-studentInfo">
            <h3 className="pt-4">Student Profile</h3>
            {/* This is where you upload your profile */}
            <button className="btn">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  marginTop: "7%",
                  marginLeft: "15px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #0a0064",
                }}
                onClick={() => setImageCrop(true)}
                src={profileFinal.length ? profileFinal : img}
                alt=""
              />
              {data.map((item) => (
                <label
                  htmlFor=""
                  key={item.username}
                  className="mt-3 font-semibold text-5xl "
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
              className="btn btn-primary logoutBtn"
              onClick={() => setShowModal(true)}
            >
              Logout
            </Link>
            {/* Back Button */}
            <button className="btn btn-warning mt-2" onClick={back}>
              back
            </button>
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
          <div className="col-10 text-center dash-bg">
            <div className="col-12 d-flex align-items-center welcome">
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
export default Student;
