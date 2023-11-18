import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./Admin.css";

function TeacherAdmin() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [data, setData] = useState([]);
  const [showTeacherDeleteModal, setShowTeacherModal] = useState(false);
  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  useEffect(() => {
    // Fetch data from the server using Axios
    axios
      .get("http://localhost:8081/teacherData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // Delete File
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/teacherDelete/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* Admin Profile Info */}

      <div className="container-fluid bg">
        <div className="row admin_container">
          <div className="col-2 text-center custom-AdminInfo">
            <h3 className="pt-4">Admin</h3>

            {/* Logout button */}
            <div className=" d-grid align-items-center justify-content-center">
              <Link className="btn btn-outline-warning mb-2 mt-5" to="/admin">
                Dashboard
              </Link>
              <Link
                className=" btn btn-outline-warning mb-2"
                to="/studentAdmin"
              >
                Student
              </Link>
              <Link
                className=" btn btn-outline-warning mb-2"
                to="/teacherAdmin"
              >
                Teacher
              </Link>
              <Link className=" btn btn-outline-warning mb-2" to="/quizzes">
                Quizzes
              </Link>
              {/* To Add Course */}
              <Link className=" btn btn-outline-warning" to="/addcourse">
                Courses
              </Link>
            </div>
            <Link
              className="btn btn-primary logoutBtn "
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
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </Modal.Footer>
            </Modal>
            {/* End Logout Modal */}
          </div>

          {/* Admin Dashboard */}
          <div className="col-10 text-center adminContentContainer">
            <div className="col-10 welcome">
              <h1 className="pt-4 ">Teacher</h1>
              <div>
                <table
                  className="table table-bordered studentDataTable"
                  style={{
                    width: "700px",
                    marginLeft: "21%",
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
                              className="btn btn-outline-danger"
                              onClick={() => setShowTeacherModal(true)}
                            >
                              <span>delete</span>
                            </button>
                            {/* Delete Modal */}
                            <Modal
                              show={showTeacherDeleteModal}
                              onHide={() => setShowTeacherModal(false)}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Delete Confirmation</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Are you sure you want to delete this student
                                account?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="primary"
                                  key={item.id}
                                  onClick={(e) => handleDelete(item.id)}
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => setShowTeacherModal(false)}
                                >
                                  Cancel
                                </Button>
                              </Modal.Footer>
                            </Modal>
                            {/* End Delete Modal */}
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

export default TeacherAdmin;
