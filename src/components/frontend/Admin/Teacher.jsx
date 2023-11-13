import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";
import "./Admin.css";
import "material-icons/iconfont/material-icons.css";

function Teacher() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const [files, setFiles] = useState([]);
  // Define the data
  const [data, setData] = useState([]);

  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  const back = () => {
    navigate("/admin");
  };
  // To upload file and display profile
  const test = () => {
    navigate("/uploadAd");
  };

  const [showModal, setShowModal] = useState(false);

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
      .get("http://localhost:8081/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDownload = (fileId) => {
    // Make a request to your back-end API to download the selected file.
  };
  // Delete File
  const [deleteFile, setDeleteFile] = useState(false);
  const reloadPage = () => {
    window.location.reload();
  };
  const handleDelete = async (id) => {
    try {
      setDeleteFile(true);
      await axios.delete("http://localhost:8081/delete/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Student Profile Info */}
      <div className="container-fluid teacherWrapper">
        <div className="row teacherContainer">
          <div className="col-2 text-center custom-TeacherInfo">
            <h3 className="pt-4">Teacher Profile</h3>

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
            {/* Upload File */}
            <button onClick={test} className="btn btn-primary uploadbtn">
              Upload File
            </button>
            {/* Logout button */}
            <Link
              className="btn btn-primary logoutBtnAdmin"
              onClick={() => setShowModal(true)}
            >
              Logout
            </Link>
            {/* Back Button */}
            <button className="btn btn-warning mt-2" onClick={back}>
              back
            </button>
            {/* Logout Message */}
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
            {/* Delete  Files  */}
            <Modal show={deleteFile}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this file?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteFile(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={reloadPage}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Student Dashboard */}
          <div className="col-10 teacherDash-bg">
            <div className="d-flex align-items-center welcome">
              <h1 className="pt-4">Welcome to Dashboard!</h1>
            </div>
            <h2 className="text-center">Uploaded Files</h2>
            <div>
              <table
                className="table table-bordered table-striped"
                style={{
                  width: "700px",
                  marginLeft: "21%",
                }}
              >
                <thead>
                  <tr>
                    <th>File Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="text-left">
                      <td
                        key={item.filename}
                        className="d-flex justify-content-between"
                      >
                        <a
                          href={`backend/uploads/${item.filename}`}
                          download={item.filename}
                        >
                          {item.filename}
                        </a>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleDownload(item.id)}
                        >
                          Download
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={(e) => handleDelete(item.id)}
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
