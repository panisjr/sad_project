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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrash,
  faDownload,
  faCircleUser,
  faIdBadge,
  faChevronRight,
  faChevronLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
function TeacherDashboard() {
  useEffect(() => {
    document.title = "CodePulse | Instructor";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);
  //This is to upload profile
  const [imagecrop, setImageCrop] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(""); // Added user ID state
  // Delete File
  const [deleteFile, setDeleteFile] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [pview, setpview] = useState(() => {
    // Initialize with the saved value from localStorage, or use a default value
    const storedPView = localStorage.getItem("pview");
    return storedPView ? JSON.parse(storedPView) : null;
  });
  const downloadFileAtUrl = (url) => {
    const filename = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", filename);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  // Define the data
  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
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
    console.log(`Deleting file with ID: ${deletedItemId}`);
    try {
      const res = await axios.delete(
        `http://localhost:8081/delete/${deletedItemId}`
      );
      if (res) {
        console.log("File deleted successfully.");
        setData((prevData) =>
          prevData.filter((item) => item.id !== deletedItemId)
        );
        setSearchResults((prevData) =>
          prevData.filter((item) => item.id !== deletedItemId)
        );
        // Update your state or UI here instead of reloading the page
        setDeleteFile(false);
        setDeletedItemId(null);
      }
    } catch (error) {
      console.log(error);
      setDeleteFile(false);
    }
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
  // Uploaded files
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

  // Search Bar
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios
        .post("http://localhost:8081/search", {
          searchTerm,
        })
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    let timer;

    if (!searchTerm) {
      // If search term is empty, wait for 3 seconds before displaying all files
      timer = setTimeout(() => {
        handleSearch();
      }, 2000);
    } else {
      // Otherwise, perform the search immediately
      handleSearch();
    }

    return () => clearTimeout(timer);
  }, [searchTerm]);
  return (
    <>
      {/* Student Profile Info */}
      <div className="container-fluid teacherWrapper">
        <div className="row teacherContainer">
          <div className="col-2 text-center teacherInfo">
            {/* This is where you upload your profile */}
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
            <div className="userName text-center">
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
          <div className="col-10 teacherContent">
            <div className="row teacherContentRow">
              <nav className="adminNavbar">
                {/* Upload File */}
                <div>
                  <Link className="btn btn-light" to="/upload">
                    Upload File <FontAwesomeIcon icon={faChevronRight} />
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
              {/* Search Bar */}
              <form className="form-group searchBar">
                <div className="input-group ">
                  <input
                    className="form-control"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search file"
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      onClick={handleSearch}
                    />
                  </span>
                </div>
              </form>
              <h2 className="text-center text-black">Uploaded Files</h2>
              <div className="tableCustom">
                <table
                  className="table table-bordered"
                  style={{
                    width: "1035px",
                  }}
                >
                  <thead>
                    <tr>
                      <th className="bg-secondary text-center">Title</th>
                      <th className="bg-secondary text-center">File Name</th>
                      <th className="bg-secondary text-center">Uploaded By:</th>
                      <th className="bg-secondary text-center">Date</th>
                      <th className="bg-secondary"></th>
                    </tr>
                  </thead>
                  {data.length === 0 ? (
                    <tbody>
                      <tr>
                        <td className="text-center" colSpan="5">
                          No Uploaded File
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    searchResults.map((item) => (
                      <tbody>
                        <tr className="text-center fileList">
                          <td>{item.title}</td>
                          <td key={item.filename}>{item.filename}</td>
                          <td>{item.instructors_name}</td>
                          <td>{item.date}</td>
                          <td>
                            <Link
                              className="faDownload"
                              onClick={() =>
                                downloadFileAtUrl(
                                  `http://localhost:8081/uploads/${item.filename}`
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faDownload} size="xl" />
                            </Link>
                            <Link
                              className="faTrash ms-2"
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} size="xl" />
                            </Link>
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
      </div>
    </>
  );
}

export default TeacherDashboard;
