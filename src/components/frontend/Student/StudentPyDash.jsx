import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Student.css";
import Intro_Q from "../Student/java/quiz/Intro/Intro_Q";

function StudentPyDash() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleCourseClick = (course) => {
    // Set the selected course and its ID
    setSelectedCourse(course);
    setSelectedCourseId(course.id);
    // Reset the quiz display when another title is selected
    setShowQuiz(false);
  };
  // THIS IS TO DISPLAY THE QUIZ QUESTIONS
  const [quizQuestionsDisplay, setQuizQuestionsDisplay] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState([]);
  useEffect(() => {
    setQuizQuestionsDisplay([]);
  }, [selectedCourseId]);
  useEffect(() => {
    // Fetch quiz questions for the selected course
    if (selectedCourseId) {
      console.log(selectedCourseId);
      axios
        .get(`http://localhost:8081/getQuizQuestions/${selectedCourseId}`)
        .then((response) => {
          try {
            // Parse the string into an object
            const parsedData = JSON.parse(response.data.quizQuestions);

            // Check if the parsed data is an array or null/undefined
            if (parsedData === null || parsedData === undefined) {
              // If the data is null or undefined, set the state to an empty array
              setQuizQuestionsDisplay([]);
            } else if (Array.isArray(parsedData)) {
              // If the parsed data is an array, set the state
              setQuizQuestionsDisplay(parsedData);
            } else {
              console.error(
                "Invalid data format for quiz questions:",
                parsedData
              );
            }
          } catch (error) {
            console.error("Error parsing quiz questions data:", error);
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
  // To get the java courses
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
      <div className="container-fluid studentWrapper">
        <div className="row studentContainer">
          <div className="col-2 courseList">
            <h1 className="text-black text-center pt-3">Courses</h1>
            <Link to="/studentDash" className="btn btn-primary mt-1 ">
              Back
            </Link>

            <ul>
              {pythonCourses.map((course) => (
                <li key={course.id} onClick={() => handleCourseClick(course)}>
                  {course.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-10 courseContent">
            <h1 className="text-black text-center">Courses View</h1>
            {selectedCourse && (
              <div>
                <h2 className="text-black">{selectedCourse.title}</h2>
                <div>
                  <h2 className="text-black">Content</h2>
                  <div
                    className="editor parsed-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedCourse.content &&
                        selectedCourse.content.trim() !== ""
                          ? selectedCourse.content
                          : "Your Content is Empty",
                    }}
                  />
                </div>
                <button onClick={() => setShowQuiz(true)}>
                  Ready to take the Quiz?
                </button>
                {showQuiz && (
                  <Intro_Q
                    selectedCourse={selectedCourse}
                    quizQuestionsDisplay={quizQuestionsDisplay}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPyDash;
