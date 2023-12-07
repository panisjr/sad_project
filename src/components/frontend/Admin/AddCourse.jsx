import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Admin.css";
function AddCourse() {
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
  const handleHide = () => {
    // Enable editing mode
    setSelectedCourse(false);
    setIsEditing(false);
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
        // Update your state or UI here instead of reloading the page
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
      // Handle validation error (e.g., show a message to the user)
      console.error("Please fill in all fields for the quiz question.");
    }
  };
  const handleSubmitQuiz = () => {
    // Submit the array of quiz questions to the server
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
    setEditQuizQuestion(question);
    // Set the addQuizQuestionClicked flag to false to hide the add form
    setAddQuizQuestionClicked(false);
    // Populate the quiz question form fields with the selected quiz question data
    setQuizQuestion(question);
    // Clear the edited question index
    setEditedQuestionIndex(null);
  };
  // THIS IS TO DISPLAY THE QUIZ QUESTIONS
  const [quizQuestionsDisplay, setQuizQuestionsDisplay] = useState([]);
  useEffect(() => {
    setQuizQuestionsDisplay([]);
  }, [selectedCourseId]);
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
  return (
    <>
      <div>
        <h1>Topics</h1>
        <form onSubmit={handleAddCourse}>
          <div>
            <label htmlFor="course">Select a course:</label>
            <select
              id="course"
              name="course"
              onChange={handleCourseChange}
              value={chosenCourse}
              required
            >
              <option value="" disabled hidden>
                Choose a course
              </option>
              <option value="java">Java Course</option>
              <option value="python">Python Course</option>
            </select>
          </div>
          {/* Input for adding a new course */}
          <div>
            <input
              type="text"
              placeholder="Enter new course"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              required
            />
          </div>
          <button type="submit" name="submit">
            Add Course
          </button>
        </form>
        {/* Displaying Java and Python Courses */}
        {!selectedCourse && (
          <div>
            <h5>Java Courses</h5>
            <ul>
              {javaCourses.length === 0 ? (
                <h6>
                  <i>Java Courses is empty</i>
                </h6>
              ) : (
                javaCourses.map((course) => (
                  <li key={course.id} onClick={() => handleCourseClick(course)}>
                    {course.title}
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDeleteClick(course.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))
              )}
            </ul>
            <h5>Python Courses</h5>
            <ul>
              {pythonCourses.length === 0 ? (
                <h6>
                  <i>Python Courses is empty</i>
                </h6>
              ) : (
                pythonCourses.map((course) => (
                  <li key={course.id} onClick={() => handleCourseClick(course)}>
                    {course.title}
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDeleteClick(course.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        {/* End */}
        {selectedCourse && (
          <div>
            <button onClick={handleHide}>back</button>
            <form onSubmit={handleSubmit}>
              <h2 className="text-black">{selectedCourse.title}</h2>
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
                <h2 className="text-black">New Content</h2>
                <div
                  className="editor parsed-content"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
                <h2 className="text-black">Content</h2>
                <div
                  className="text-black editor parsed-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedCourse.content &&
                      selectedCourse.content.trim() !== ""
                        ? selectedCourse.content
                        : "Your Content is Empty",
                  }}
                />
                <div></div>
              </div>
            </form>
            <button onClick={() => setShowUpdateModal(true)}>Update</button>
            <button onClick={handleEditClick}>Edit</button>
            {isEditing && <button onClick={handleHide}>Cancel</button>}
            {/* Add a form for quiz questions */}
            <div>
              <h2 className="text-black">Add Quiz Questions</h2>
              <div>
                <label>Question:</label>
                <input
                  type="text"
                  value={quizQuestion.question}
                  onChange={(e) =>
                    handleQuizQuestionChange("question", e.target.value)
                  }
                />
              </div>
              {/* Render choices dynamically based on the choices array */}
              {quizQuestion.choices.map((choice, index) => (
                <div key={`choice-${index}`}>
                  <label>{`Choice ${index + 1}:`}</label>
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) =>
                      handleQuizQuestionChange("choices", e.target.value, index)
                    }
                  />
                </div>
              ))}
              <div>
                <label>Correct Answer:</label>
                <input
                  type="text"
                  value={quizQuestion.correctAnswer}
                  onChange={(e) =>
                    handleQuizQuestionChange("correctAnswer", e.target.value)
                  }
                />
              </div>
              <button onClick={handleAddQuizQuestion}>Add Quiz Question</button>
            </div>
            {/* Display added quiz questions */}
            <div>
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
                    <button onClick={() => handleEditQuizQuestion(index)}>
                      Edit
                    </button>
                  </div>
                ))
              ) : (
                <p>Add a Quiz Question</p>
              )}
            </div>
            {/* Button to submit quiz questions */}
            {quizQuestions.length > 0 && (
              <button onClick={handleSubmitQuiz}>Submit Quiz Questions</button>
            )}
            {/* Display added quiz questions */}
            <div>
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
                    <button
                      onClick={() => handleEditQuizQuestionDisplay(question)}
                    >
                      Edit
                    </button>
                  </div>
                ))
              ) : (
                <p>There are no stored questions</p>
              )}
            </div>
          </div>
        )}
        {/* This is to Update or Add content */}
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to update the content?</Modal.Body>
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
            Are you sure you want to delete this file? This include the contents
            and quizzes.
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
    </>
  );
}

export default AddCourse;
