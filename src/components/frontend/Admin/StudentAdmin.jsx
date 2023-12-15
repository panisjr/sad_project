import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faChevronLeft,
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./icons/program.png";
import "./Admin.css";

function StudentAdmin() {
  useEffect(() => {
    document.title = "CodePulse | Student Accounts";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  useEffect(() => {
    // Fetch data from the server using Axios
    axios
      .get("http://localhost:8081/studentData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Delete File
  const handleYesClick = async () => {
    // Perform the delete operation using deletedItemId
    console.log(`Deleting file with ID: ${deletedItemId}`);
    try {
      await axios
        .delete(`http://localhost:8081/studentDelete/${deletedItemId}`)
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
  // Search Bar
  const [searchCriteria, setSearchCriteria] = useState("filename");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios
        .post("http://localhost:8081/studentSearchAccount", {
          searchCriteria,
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
      {/* Admin Profile Info */}

      <div className="container-fluid adminDashWrapper">
        <div className="row admin_container">
          <div className="col-2 text-center adminInfo">
            <div>
              <img src={logo} alt="Website Logo" className="adminLogo" />
              <h5 className="adminLogoName">CodePulse</h5>
            </div>
            <h3 className="pt-5">Students</h3>
            <div className=" d-grid align-items-center justify-content-center">
              <Link className="btn btn-light m-2 mt-5" to="/admin">
                <FontAwesomeIcon icon={faChevronLeft} /> Dashboard
              </Link>
            </div>
            {/* Logout Modal */}
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
            {/* End Logout Modal */}
            {/* Delete  Files  */}
            <Modal show={deleteFile} onHide={() => setDeleteFile(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this account?
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
              {/* Search Bar */}
              <form className="form-group searchBar">
                <div className="input-group ">
                  <input
                    className="form-control"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Account"
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
              <div className="studentAccountTable">
                <table className="table table-bordered ">
                  <thead>
                    <tr>
                      <th className="bg-secondary">ID Number</th>
                      <th className="bg-secondary">Name</th>
                      <th className="bg-secondary">Email</th>
                      <th className="bg-secondary"></th>
                    </tr>
                  </thead>
                  {loading ? (
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          <i className="text-black">Loading</i>
                        </td>
                      </tr>
                    </tbody>
                  ) : data.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          <i>No registered account</i>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    searchResults.map((item) => (
                      <tbody>
                        <tr key={item.id} className="text-left">
                          <td className=" text-black">{item.id_number}</td>
                          <td className=" text-black">{item.username}</td>
                          <td className=" text-black">{item.email}</td>
                          <td>
                            <Link onClick={() => handleDeleteClick(item.id)}>
                              <FontAwesomeIcon
                                className="faTrash"
                                icon={faTrash}
                              />
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

export default StudentAdmin;
