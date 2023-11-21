import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";
import "./Student.css";

function LNUMaterials() {
  const downloadFileAtUrl = (url) => {
    const filename = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", filename);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  // Define the data
  const handleLNUMaterials = () => {
    navigate("/studentDash"); // Define the route for StudentJavaDash
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
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState([]);

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
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("/");
    } else {
      // Set the username in the component state
      setUsername(username);
    }
  });
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
  // const downloadFile = (filename) => {
  //   axios({
  //     url: `http://localhost:8081/download-data/${filename}`,
  //     method: "GET",
  //     responseType: "blob",
  //   })
  //     .then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", filename);
  //       document.body.appendChild(link);
  //       link.click();
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading file:", error);
  //     });
  // };

  return (
    <>
      <div className="container-fluid studentWrapper">
        <div className="row studentContainer">
          <div className="col-2 text-center studentInfo">
            <h3 className="text-center pt-3">Student Profile</h3>
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
            </button>
            <div className="userName text-center">
              <p>{username}</p>
            </div>
            <button
              className="btn btn-primary back"
              onClick={handleLNUMaterials}
            >
              Back
            </button>
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
          </div>
          <div className="col-10">
            <div className="d-flex align-items-center">
              <h1 className="pt-4">LNU Materials</h1>
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
                <tbody>
                  {data.map((item) => (
                    <tr key={item.filename} className="text-left">
                      <td className="d-flex justify-content-between">
                        <a
                          className="text-black"
                          href={`http://localhost:8081/uploads/${item.filename}`}
                          download={item.filename}
                        >
                          {item.filename}
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            downloadFileAtUrl(
                              `http://localhost:8081/uploads/${item.filename}`
                            )
                          }
                        >
                          Download
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

export default LNUMaterials;
