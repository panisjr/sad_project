import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function StudentAdmin() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [data, setData] = useState([]);
  const [showStudentDeleteModal, setShowStudentDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
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
  return (
    <>
      {/* Admin Profile Info */}

      <div className="container-fluid adminDashWrapper">
        <div className="row admin_container">
          <div className="col-2 text-center adminInfo">
            <h3 className="pt-5">Admin</h3>

            {/* Logout button */}
            <div className=" d-grid align-items-center justify-content-center">
              <Link className="btn btn-warning m-2 mt-5" to="/admin">
                Dashboard
              </Link>
              <Link className="btn btn-warning m-2" to="/register">
                Register New Account
              </Link>
            </div>
            <Link
              className="btn btn-primary logoutBtnAdmin "
              onClick={() => setShowModal(true)}
            >
              Logout
            </Link>
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
          <div className="col-10 text-center adminContentContainer">
            <div className="col-10 admin_container">
              <h1
                style={{
                  marginLeft: "200px",
                  marginTop: "20px",
                }}
              >
                Student
              </h1>
              <div>
                <table
                  className="table table-bordered studentDataTable"
                  style={{
                    width: "700px",
                    marginLeft: "430px",
                  }}
                >
                  <thead>
                    <tr>
                      <th className="bg-warning">ID Number</th>
                      <th className="bg-warning">Name</th>
                      <th className="bg-warning">Email</th>
                      <th className="bg-warning"></th>
                    </tr>
                  </thead>
                  {data.length === 0 ? (
                    <tbody>
                      <tr>
                        <td>Empty</td>
                        <td>Empty</td>
                        <td>Empty</td>
                      </tr>
                    </tbody>
                  ) : (
                    data.map((item) => (
                      <tbody>
                        <tr key={item.id} className="text-left">
                          <td className="bg-light text-black">
                            {item.id_number}
                          </td>
                          <td className="bg-light text-black">
                            {item.username}
                          </td>
                          <td className="bg-light text-black">{item.email}</td>
                          <td>
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
      </div>
    </>
  );
}

export default StudentAdmin;
