import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";
import "./Teacher.css";
import "material-icons/iconfont/material-icons.css";

function TeacherDashboard() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  // Define the data
  const [data, setData] = useState([]);

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  const downloadPage = () => {
    navigate("/download");
  };
  // To upload file and display profile
  const test = () => {
    navigate("/upload");
  };

  //This is to upload profile
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
  const [userId, setUserId] = useState(""); // Added user ID state
  const [username, setUsername] = useState("");

  const [deleteFile, setDeleteFile] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);

  const onClose = () => {
    setpview(null);
  };

  const onCrop = (view) => {
    setpview(view);
  };

  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setImageCrop(false);
    localStorage.setItem(`pview_${userId}`, JSON.stringify(pview));
  };

  // Delete File
  const handleYesClick = async () => {
    // Perform the delete operation using deletedItemId
    console.log(`Deleting file with ID: ${deletedItemId}`);
    try {
      await axios
        .delete(`http://localhost:8081/delete/${deletedItemId}`)
        .then((res) => {
          if (res) {
            console.log("File deleted successfully.");
            setDeleteFile(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          setDeleteFile(false);
        });
    } catch (error) {
      console.log(error);
    }

    // Reset state after deletion
    setDeleteFile(false);
    setDeletedItemId(null);
  };
  const handleNoClick = () => {
    // Cancel the delete operation
    setDeleteFile(false);
    setDeletedItemId(null);
  };
  const handleDeleteClick = (itemId) => {
    setDeleteFile(true);
    setDeletedItemId(itemId);
  };
  useEffect(() => {
    // Fetch data from the server using Axios
    axios
      .get("http://localhost:8081/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // Uploading Profile Picture
  useEffect(() => {
    // Retrieve profile picture URL from localStorage using user-specific key
    const storedPView = localStorage.getItem(`pview_${userId}`);
    if (storedPView) {
      setpview(JSON.parse(storedPView));
    }
  }, [userId]);
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("/");
    } else {
      // Set the username in the component state
      setUsername(username);
    }
  });
  return (
    <>
      {/* Student Profile Info */}
      <div className="container-fluid teacherWrapper">
        <div className="row teacherContainer">
          <div className="col-2 teacherInfo">
            <h3 className="text-center pt-3">Teacher Profile</h3>

            {/* This is where you upload your profile */}
            <button className="btn">
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  marginTop: "80px",
                  marginLeft: "10px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #0a0064",
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
                      className="text-2xl font-semibold textColor dialog"
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
            <div className="userName text-center">
              <p>{username}</p>
            </div>
            {/* Upload File */}
            <button onClick={test} className="btn btn-primary uploadBtn">
              Upload File
            </button>
            {/* Logout button */}
            <Link
              className="btn btn-primary logoutBtn"
              onClick={() => setShowModal(true)}
            >
              Logout
            </Link>
            {/* Logout Message */}
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
            {/* Delete  Files  */}
            <Modal show={deleteFile} onHide={() => setDeleteFile(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this file?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleYesClick}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleNoClick}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Student Dashboard */}
          <div className="col-10">
            <div className="d-flex align-items-center">
              <h1 className="pt-4">Welcome to Dashboard!</h1>
            </div>
            <h2 className="text-center text-black">Uploaded Files</h2>
            <div className="tableCustom">
              <table
                className="table table-bordered table-striped"
                style={{
                  width: "700px",
                }}
              >
                <thead>
                  <tr>
                    <th className="bg-warning text-center">File Name</th>
                    <th className="bg-warning"></th>
                  </tr>
                </thead>
                {data.length === 0 ? (
                  <tbody>
                    <tr>
                      <td className="text-center">No Uploaded File</td>
                    </tr>
                  </tbody>
                ) : (
                  data.map((item) => (
                    <tbody>
                      <tr className="text-left">
                        <td
                          key={item.filename}
                          className="d-flex justify-content-between"
                        >
                          <a
                            className="text-black"
                            href={`backend/uploads/${item.filename}`}
                            download={item.filename}
                          >
                            {item.filename}
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={downloadPage}
                          >
                            Download
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
