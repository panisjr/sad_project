import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faChevronRight,
  faTrash,
  faChevronLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./icons/program.png";
import "./Admin.css";
import { Table } from "react-bootstrap";
function AddCourse() {
  useEffect(() => {
    document.title = "CodePulse | Courses";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [text, setText] = useState("");
  const [quizQuestion, setQuizQuestion] = useState({
    question: "",
    choices: ["", "", "", ""], // Array to store choices
    correctAnswer: "",
  });
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [addQuizQuestionClicked, setAddQuizQuestionClicked] = useState(false);
  const [selectedQuizQuestion, setSelectedQuizQuestion] = useState(null);
  const [editedQuestionIndex, setEditedQuestionIndex] = useState(null);
  const [editQuizQuestion, setEditQuizQuestion] = useState(null);
  // To show the Update Confirmation
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  // To select a Java or Python Course
  const [chosenCourse, setChosenCourse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addQuizErrorModal, setAddQuizErrorModal] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    setShowModal(false);
  };
  const handleCourseChange = (event) => {
    setChosenCourse(event.target.value);
  };
  // THIS IS TO SHOW THE CONTENT IN CKEDITOR WHEN EDIT BUTTTON IS CLICKED
  const [isEditing, setIsEditing] = useState(false);
  const handleCourseClick = (course) => {
    // Set the selected course and its ID
    setSelectedCourse(course);
    setSelectedCourseId(course.id);
    console.log(selectedCourseId);
    // Set the default operation type to "Update"
    setIsEditing(false); // Set isEditing to false initially
  };
  // This is to handle the Content Edit
  const handleEditClick = () => {
    // Enable editing mode
    setIsEditing(true);
  };
  const handleEditCancel = () => {
    setIsEditing(false);
  };
  const handleHide = () => {
    // Enable editing mode
    setSelectedCourse(false);
    setIsEditing(false);
    setQuizQuestions([]);
  };
  // End of Content Edit
  const handleAddCourse = () => {
    // Add a new course to the database
    axios
      .post("http://localhost:8081/addCourse", {
        title: newCourse,
        chosenCourse: chosenCourse,
      })
      .then((response) => {
        // Refresh courses after adding a new course
        return axios.get("http://localhost:8081/courses");
      })
      .then((response) => {
        // Set courses and clear input fields and CKEditor content
        setCourses(response.data);
        setNewCourse("");
        setText("");
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        // Handle the error or log it, but don't send another response here
      });
  };

  const handleSubmit = (e) => {
    if (selectedCourse && selectedCourseId) {
      // Update existing content
      axios
        .post("http://localhost:8081/updateContent", {
          titleId: selectedCourseId,
          text,
        })
        .then((res) => {
          if (res) {
            console.log("Data updated successfully:", res.data);
            setCourses(res.data);
            setSelectedCourse(res.data);
            setShowUpdateModal(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("Error updating content:", err);
        });
    }
  };
  // this is to delete the courses
  const handleYesClick = async () => {
    console.log(`Deleting file with ID: ${deletedItemId}`);
    try {
      const res = await axios.delete(
        `http://localhost:8081/deleteCourse/${deletedItemId}`
      );
      if (res) {
        console.log("File deleted successfully.");
        setCourses((prevData) =>
          prevData.filter((item) => item.id !== deletedItemId)
        );
        setJavaCourses((prevData) =>
          prevData.filter((item) => item.id !== deletedItemId)
        );
        setPythonCourses((prevData) =>
          prevData.filter((item) => item.id !== deletedItemId)
        );
        // Update your state or UI here instead of reloading the page
        search;
        setDeleteFile(false);
        setDeletedItemId(null);
        window.location.reload();
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

  const handleQuizQuestionChange = (field, value, index) => {
    if (field === "choices") {
      // Update the choices array
      setQuizQuestion((prevQuestion) => {
        const newChoices = [...prevQuestion.choices];
        newChoices[index] = value;
        return { ...prevQuestion, choices: newChoices };
      });
    } else {
      setQuizQuestion((prevQuestion) => ({
        ...prevQuestion,
        [field]: value,
      }));
    }
  };
  const handleAddQuizQuestion = () => {
    // Validate that the required fields are not empty
    const areFieldsValid =
      quizQuestion.question &&
      quizQuestion.choices.some((choice) => choice.trim() !== "") &&
      quizQuestion.correctAnswer;
    if (areFieldsValid) {
      // Check if it's an edit operation
      if (editedQuestionIndex !== null) {
        // Update the existing question in the array
        const updatedQuestions = [...quizQuestions];
        updatedQuestions[editedQuestionIndex] = quizQuestion;
        setQuizQuestions(updatedQuestions);
        // Clear the edited question index
        setEditedQuestionIndex(null);
      } else {
        // Add the new quiz question to the array in the state
        setQuizQuestions((prevQuestions) => [
          ...prevQuestions,
          { ...quizQuestion },
        ]);
      }

      // Clear the form fields
      setQuizQuestion({
        question: "",
        choices: ["", "", "", ""],
        correctAnswer: "",
      });

      // Set the flag to true when the button is clicked
      setAddQuizQuestionClicked(true);
    } else {
      setAddQuizErrorModal(true);
      console.error("Please fill in all fields for the quiz question.");
    }
  };
  const handleSubmitQuiz = () => {
    if (quizQuestions.length > 0) {
      // If in editing mode, update the specific question
      if (editedQuestionIndex !== null) {
        const updatedQuizQuestion = quizQuestions; // Use the state variable holding the edited question
        const titleId = selectedCourseId;
        const quizQuestionIndex = editedQuestionIndex;

        // Call the server endpoint to update the specific quiz question
        axios
          .post("http://localhost:8081/updateQuizQuestion", {
            titleId,
            quizQuestionIndex,
            updatedQuizQuestion,
          })
          .then((res) => {
            if (res) {
              console.log("Quiz question updated successfully:", res.data);
              // Handle any additional logic after the update if needed
            }
          })
          .catch((error) => {
            console.error("Error updating quiz question:", error);
            // Handle the error or log it
          });

        // Clear the editing state
        setEditedQuestionIndex(null);
        setEditQuizQuestion(null);
      } else {
        // If not in editing mode, submit all quiz questions as usual
        axios
          .post("http://localhost:8081/addQuizQuestions", {
            titleId: selectedCourseId,
            quizQuestions: quizQuestions,
          })
          .then((res) => {
            if (res) {
              console.log("Pop Quiz questions added successfully:", res.data);
              setCourses(res.data);
              setSelectedCourse(res.data);
              setShowUpdateModal(false);
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error adding quiz questions:", error);
            // Handle the error or log it
          });
      }
    }
  };

  // THIS IS TO EDIT THE PREVIEW QUIZ QUESTION
  const handleEditQuizQuestion = (index) => {
    // Set the selected quiz question for editing
    setSelectedQuizQuestion(quizQuestions[index]);
    // Set the addQuizQuestionClicked flag to false to hide the add form
    setAddQuizQuestionClicked(false);
    // Populate the quiz question form fields with the selected quiz question data
    setQuizQuestion(quizQuestions[index]);
    // Store the index of the selected question
    setEditedQuestionIndex(index);
  };
  // THIS IS TO EDIT THE EXISTING QUIZ QUESTION
  const handleEditQuizQuestionDisplay = (question) => {
    // Set the selected quiz question for editing
    setSelectedQuizQuestion(question);
    // Set the addQuizQuestionClicked flag to false to hide the add form
    setAddQuizQuestionClicked(false);
    // Populate the quiz question form fields with the selected quiz question data
    setQuizQuestion(question);
    // Clear the edited question index
    setEditedQuestionIndex(question);
  };
  // THIS IS TO DISPLAY THE QUIZ QUESTIONS
  const [quizQuestionsDisplay, setQuizQuestionsDisplay] = useState([]);
  useEffect(() => {
    setQuizQuestionsDisplay([]);
  }, [selectedCourseId]);
  // To get the quiz question based on the selected ID
  useEffect(() => {
    // Fetch quiz questions for the selected course
    if (selectedCourseId) {
      axios
        .get(`http://localhost:8081/getQuizQuestions/${selectedCourseId}`)
        .then((response) => {
          try {
            // Parse the string into an object
            const parsedData = JSON.parse(response.data.quizQuestions);

            // Check if the parsed data is an array or null/undefined
            if (Array.isArray(parsedData)) {
              // If the parsed data is an array, set the state
              setQuizQuestionsDisplay(parsedData);
            } else if (typeof parsedData === "object") {
              // If the parsed data is an object (single question), convert it to an array
              setQuizQuestionsDisplay([parsedData]);
            } else {
              console.error(
                "Invalid data format for quiz questions:",
                parsedData
              );
              setQuizQuestionsDisplay([]);
            }
          } catch (error) {
            console.error("Error parsing quiz questions data:", error);
            setQuizQuestionsDisplay([]);
          }
        })
        .catch((error) =>
          console.error("Error fetching quiz questions:", error)
        );
    } else {
      // Reset quizQuestionsDisplay when no course is selected
      setQuizQuestionsDisplay([]);
    }
  }, [selectedCourseId]);
  // this is to get the courses data
  const [courses, setCourses] = useState([]);
  // To get all the courses data in database
  useEffect(() => {
    // Fetch courses from the server
    axios
      .get("http://localhost:8081/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // This is to get the java courses
  const [javaCourses, setJavaCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the server
    axios
      .get("http://localhost:8081/javaCourses")
      .then((response) => setJavaCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
  // End

  // This is to get the python courses
  const [pythonCourses, setPythonCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the server
    axios
      .get("http://localhost:8081/pythonCourses")
      .then((response) => setPythonCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
  // End
  const [editedSubmit, setEditedSubmit] = useState(false);
  const handleUpdateQuizQuestion = () => {
    // Update the existing quiz question in the array
    const updatedQuestions = [...quizQuestionsDisplay];
    const updatedIndex = updatedQuestions.findIndex(
      (question) => question.id === selectedQuizQuestion.id
    );

    if (updatedIndex !== -1) {
      updatedQuestions[updatedIndex] = quizQuestion;
      setQuizQuestionsDisplay(updatedQuestions);
      setQuizQuestions(updatedQuestions);
      setEditedSubmit(true);
      // Clear the selected quiz question and form fields
      setSelectedQuizQuestion(false);
      setQuizQuestion({
        question: "",
        choices: ["", "", "", ""],
        correctAnswer: "",
      });
      // Set the addQuizQuestionClicked flag to true to show the add form
      setAddQuizQuestionClicked(true);
    }
  };

  return (
    <>
      <div className="container-fluid adminDashWrapper">
        <div className="row admin_container">
          <div className="col-2 text-center adminInfo">
            <div className="logoContainer">
              <img src={logo} alt="Website Logo" className="adminLogo" />
              <h5 className="adminLogoName">CodePulse</h5>
            </div>
            <h3 className="pt-5">Courses</h3>
            <div className=" d-grid align-items-center justify-content-center">
              <Link className="btn btn-light m-2 mt-5" to="/admin">
                <FontAwesomeIcon icon={faChevronLeft} /> Dashboard
              </Link>
            </div>
          </div>
          <div className="col-10 adminContent">
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
              {/* This is to create course title */}
              {!selectedCourse && (
                <div className="courseForm">
                  <form className="form-group " onSubmit={handleAddCourse}>
                    <div className="input-group" style={{ width: "500px" }}>
                      <span class="input-group-text">
                        Select Programming Language:
                      </span>
                      <select
                        className="form-select"
                        id="course"
                        name="course"
                        onChange={handleCourseChange}
                        value={chosenCourse}
                        required
                      >
                        <option value="" disabled hidden>
                          Choose a Language
                        </option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                      </select>
                    </div>
                    <div
                      className="input-group mt-2"
                      style={{ width: "500px" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter new course"
                        value={newCourse}
                        onChange={(e) => setNewCourse(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <button className="btn courseBtn mt-3" type="submit">
                        Add Course
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {/* End */}
              {/* Displaying Java and Python Courses */}
              {!selectedCourse && (
                <div className="row courseTitleRow">
                  <div className="col courseTitleColumn">
                    <table className="table-bordered customBorder">
                      <thead>
                        <tr>
                          <th className="p-2" colSpan="2">
                            <h5 className="text-center">Java Courses</h5>
                          </th>
                        </tr>
                      </thead>
                      {javaCourses.length === 0 ? (
                        <tbody>
                          <tr>
                            <td>
                              <i>Java Courses is empty</i>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        javaCourses.map((course) => (
                          <tbody>
                            <tr key={course.id}>
                              <td
                                className="courseTitle"
                                onClick={() => handleCourseClick(course)}
                              >
                                {course.title}
                              </td>
                              <td className="text-center">
                                <Link
                                  onClick={() => handleDeleteClick(course.id)}
                                >
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
                  <div className="col courseTitleColumn ms-3">
                    <table className="table-bordered customBorder">
                      <thead>
                        <tr>
                          <th className="p-2" colSpan="2">
                            <h5 className="text-center">Python Courses</h5>
                          </th>
                        </tr>
                      </thead>
                      {pythonCourses.length === 0 ? (
                        <tbody>
                          <tr>
                            <td>
                              <i>Python Courses is empty</i>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        pythonCourses.map((course) => (
                          <tbody>
                            <tr key={course.id}>
                              <td
                                className="courseTitle"
                                onClick={() => handleCourseClick(course)}
                              >
                                {course.title}
                              </td>
                              <td className="text-center">
                                <Link
                                  onClick={() => handleDeleteClick(course.id)}
                                >
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
              )}
              {/* End */}
              {/* Content */}
              {selectedCourse && (
                <div>
                  <Link className="btn courseBtn mt-2" onClick={handleHide}>
                    <FontAwesomeIcon className="mt-1" icon={faChevronLeft} />
                    {"  "}
                    back
                  </Link>
                  <form onSubmit={handleSubmit}>
                    <h4 className="text-black mt-3">{selectedCourse.title}</h4>
                    <div className="editor">
                      <CKEditor
                        editor={ClassicEditor}
                        data={isEditing ? selectedCourse.content || "" : ""}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setText(data);
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-black mt-3 ">New Content</h4>
                      <div
                        className="editor parsed-content contentBorder"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                      <h4 className="text-black mt-3">Content</h4>
                      <div
                        className="text-black editor parsed-content contentBorder"
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedCourse.content &&
                            selectedCourse.content.trim() !== ""
                              ? selectedCourse.content
                              : "<i>Your Content is Empty </i>",
                        }}
                      />
                    </div>
                  </form>
                  <button
                    className="btn courseBtn mt-2"
                    onClick={() => setShowUpdateModal(true)}
                  >
                    Update
                  </button>
                  {selectedCourse.content && (
                    <button
                      className="btn courseBtn mt-2 ms-2"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  )}
                  {isEditing && (
                    <button
                      className="btn courseBtn mt-2 ms-2"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  )}
                  {/* Add a form for quiz questions */}
                  <div>
                    <form>
                      <h4 className="text-black border-top border-black mt-4 pt-3">
                        Quiz Questions
                      </h4>
                      {/* Question Input */}
                      <div className="input-group">
                        <span className="input-group-text">Question:</span>
                        <input
                          className="form-control"
                          type="text"
                          value={quizQuestion.question}
                          onChange={(e) =>
                            handleQuizQuestionChange("question", e.target.value)
                          }
                          required
                        />
                      </div>
                      {/* Choices Input */}
                      {quizQuestion.choices.map((choice, index) => (
                        <div
                          className="input-group mt-2"
                          key={`choice-${index}`}
                        >
                          <span className="input-group-text">{`Choice ${
                            index + 1
                          }:`}</span>
                          <input
                            className="form-control"
                            type="text"
                            value={choice}
                            onChange={(e) =>
                              handleQuizQuestionChange(
                                "choices",
                                e.target.value,
                                index
                              )
                            }
                            required
                          />
                        </div>
                      ))}
                      {/* Correct Answer Input */}
                      <div className="input-group mt-2">
                        <span className="input-group-text">
                          Correct Answer:
                        </span>
                        <input
                          className="form-control"
                          type="text"
                          value={quizQuestion.correctAnswer}
                          onChange={(e) =>
                            handleQuizQuestionChange(
                              "correctAnswer",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </form>
                    <button
                      className="btn courseBtn mt-2"
                      onClick={handleAddQuizQuestion}
                    >
                      Add Quiz Question
                    </button>
                  </div>
                  {/* Display added quiz questions */}
                  <div className="contentBorder mt-2">
                    {quizQuestions.length > 0 ? (
                      quizQuestions.map((question, index) => (
                        <div key={index}>
                          <h3>Question {index + 1}:</h3>
                          <p>{question.question}</p>
                          {/* Map through the choices array */}
                          {question.choices.map((choice, choiceIndex) => (
                            <p key={`choice-${choiceIndex}`}>{`Choice ${
                              choiceIndex + 1
                            }: ${choice}`}</p>
                          ))}
                          <p>Correct Answer: {question.correctAnswer}</p>
                          <button
                            className="btn courseBtn"
                            onClick={() => handleEditQuizQuestion(index)}
                          >
                            Edit
                          </button>
                        </div>
                      ))
                    ) : (
                      <i>Add quiz question.</i>
                    )}
                  </div>
                  {/* Button to submit quiz questions */}
                  {quizQuestions.length > 0 && (
                    <button
                      className="btn courseBtn mt-3"
                      onClick={handleSubmitQuiz}
                    >
                      Submit Quiz Questions
                    </button>
                  )}
                  {/* Display added quiz questions */}
                  <div className="contentBorder mt-2">
                    {quizQuestionsDisplay.length > 0 ? (
                      quizQuestionsDisplay.map((question, index) => (
                        <div key={index}>
                          <h3>Question {index + 1}:</h3>
                          <p>{question.question}</p>
                          {/* Map through the choices array */}
                          {question.choices.map((choice, choiceIndex) => (
                            <p key={`choice-${choiceIndex}`}>{`Choice ${
                              choiceIndex + 1
                            }: ${choice}`}</p>
                          ))}
                          <p>Correct Answer: {question.correctAnswer}</p>
                          {/* <button
                            className="btn courseBtn"
                            onClick={() =>
                              handleEditQuizQuestionDisplay(question)
                            }
                          >
                            Edit
                          </button> */}
                          {editedSubmit && (
                            <button
                              className="btn courseBtn ms-2"
                              onClick={handleSubmitQuiz}
                            >
                              Submit Quiz Questions
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="m-3">
                        <i>Quiz is empty.</i>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* End */}
              {/* This is to Update or Add content*/}
              <Modal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to update the content?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={() => handleSubmit()}>
                    Yes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowUpdateModal(false)}
                  >
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
                  Are you sure you want to delete this file? This include the
                  contents and quizzes.
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
              {/* Logout Confirmation Modal */}
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Logout Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Add Quiz Error Modal */}
              <Modal
                show={addQuizErrorModal}
                onHide={() => setAddQuizErrorModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Quiz Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Please fill in all fields for the quiz question.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="success"
                    onClick={() => setAddQuizErrorModal(false)}
                  >
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCourse;
