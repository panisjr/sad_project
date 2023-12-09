import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faIdBadge,
  faChevronRight,
  faChevronLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Student.css";

function StudentDashboard() {
  useEffect(() => {
    document.title = "CodePulse | Student";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
  const handleJavaCourse = () => {
    navigate("/studentJava"); // Define the route for StudentJavaDash
  };

  const handlePythonCourse = () => {
    navigate("/studentPython"); // Define the route for StudentJavaDash
  };

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };

  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [pview, setpview] = useState(() => {
    // Initialize with the saved value from localStorage, or use a default value
    const storedPView = localStorage.getItem("pview");
    return storedPView ? JSON.parse(storedPView) : null;
  });
  const [imagecrop, setImageCrop] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setpview(null);
  };

  const onCrop = (view) => {
    setpview(view);
  };

  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setImageCrop(false);
    localStorage.setItem("pview", JSON.stringify(pview));
  };
  // User Info
  const [username, setUsername] = useState("");
  const [idNumber, setIDNumber] = useState("");
  useEffect(() => {
    let cancelRequest = axios.CancelToken.source();

    axios
      .get("http://localhost:8081/userInfo", {
        cancelToken: cancelRequest.token,
      })
      .then((res) => {
        if (res.data.valid) {
          setUsername(res.data.username);
          setIDNumber(res.data.id_number);
        } else {
          // You may want to navigate to the login page only if the response is a 401 (Unauthorized) status
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      cancelRequest.cancel("Component is unmounted");
    };
  }, []);

  return (
    <>
      <div className="container-fluid studentWrapper">
        <div className="row studentContainer">
          <div className="col-2 text-center studentInfo">
            {/* <div>
              <img src={logo} alt="Website Logo" className="adminLogo" />
              <h5 className="adminLogoName">CodePulse</h5>
            </div> */}
            <div>
              <img
                style={{
                  width: "130px",
                  height: "130px",
                  marginTop: "30px",
                  marginLeft: "28px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid white",
                }}
                onClick={() => setImageCrop(true)}
                src={pview || img}
                alt=""
              />

              <div className="upload">
                <Dialog
                  visible={imagecrop}
                  header={() => (
                    <p
                      htmlFor=""
                      className="text-2xl text-center font-semibold dialog"
                    >
                      Update Profile
                    </p>
                  )}
                  onHide={() => setImageCrop(false)}
                >
                  <div className="confirmationContent flex flex-column align-items-center">
                    <Avatar
                      width={500}
                      height={400}
                      onCrop={onCrop}
                      onClose={onClose}
                      src={src}
                      shadingColor={"#474649"}
                      backgroundColor={"#474649"}
                    />
                    <div className="d-flex flex-column align-items-center w-12">
                      <div className="flex justify-content-around w-12 mt-1">
                        <button
                          className="btn btn-success m-3"
                          onClick={saveCropImage}
                          label="Save"
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
            </div>
            <div className="studentName text-center">
              <p>{username}</p>
            </div>
            <label htmlFor="">
              <FontAwesomeIcon
                icon={faIdBadge}
                size="xl"
                style={{ marginRight: "10px" }}
              />
              {idNumber}
            </label>

            {/* Logout Message */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Logout Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to logout?</Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-10 studentContent">
            <div className="row studentContentRow">
              <nav className="adminNavbar">
                <div>
                  <Link className="btn btn-light" to="/lnuMaterials">
                    LNU Materials <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
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
              <div>
                <h3>Welcome Back!</h3>
              </div>
              <div className="row courses">
                <Link
                  className="d-flex col-md-2 javaIcon1"
                  to="/studentJava"
                ></Link>
                <Link
                  className="col-md-2 pythonIcon"
                  to="/studentPython"
                ></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
