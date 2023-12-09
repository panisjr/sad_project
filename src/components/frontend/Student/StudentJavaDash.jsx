import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Student.css";
import Intro_Q from "../Student/java/quiz/Intro/Intro_Q";
import "./Student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faMagnifyingGlass,
  faCircleUser,
  faIdBadge,
  faChevronRight,
  faArrowLeft,
  faXmark,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import javaIcon2 from "./icons/javaIcon2.jpg";

function StudentJavaDash() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const handleCourseClick = (course) => {
    // Set the selected course and its ID
    setSelectedCourse(course);
    setSelectedCourseId(course.id);
    // Reset the quiz display when another title is selected
    setShowQuiz(false);
  };
  const hideCourses = () => {
    setSelectedCourse(false);
    setShowQuiz(true);
  };
  const handleHideShowQuiz = (course) => {
    setShowQuiz(false);
    setSelectedCourse(true);
  };
  const handleShowQuiz = () => {
    setSelectedCourse(false);
    setShowQuiz(true);
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
  const [javaCourses, setJavaCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the server
    axios
      .get("http://localhost:8081/javaCourses")
      .then((response) => setJavaCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
  // End
  return (
    <>
      <div className="container-fluid studentWrapper">
        <div className="row studentContainer">
          <div className="col-3 studentInfo">
            <div className=" d-flex align-items-left">
              <Link className="m-3" to="/studentDash">
                <FontAwesomeIcon icon={faArrowLeft} size="xl" />
              </Link>
            </div>
            <h1 className="javaName">Java</h1>
            <img src={javaIcon2} alt="Java Logo" className="coursePythonLogo" />
            <ul className="courseList">
              {javaCourses.map((course) => (
                <li
                  className="courseTitleList"
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-9 courseContent">
            <div className="row courseContentRow">
              {selectedCourse && (
                <div className="courseDisplay">
                  <h2 className="text-black ">{selectedCourse.title}</h2>
                  <div>
                    <div
                      className="courseDisplay"
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedCourse.content &&
                          selectedCourse.content.trim() !== ""
                            ? selectedCourse.content
                            : "Your Content is Empty",
                      }}
                    />
                  </div>
                  <button className="takeQuizBtn btn" onClick={handleShowQuiz}>
                    Ready to take the Quiz?
                  </button>
                </div>
              )}
              {showQuiz && (
                <div>
                  <Intro_Q
                    selectedCourse={selectedCourse}
                    quizQuestionsDisplay={quizQuestionsDisplay}
                  />
                  <Link className="studentFaXmark" onClick={handleHideShowQuiz}>
                    <FontAwesomeIcon icon={faXmark} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentJavaDash;
