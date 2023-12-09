import React, { useState, useEffect } from "react";
import axios from "axios";
import { resultInitalState } from "./intro";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./index.scss";

const Intro_Q = ({ quizQuestionsDisplay }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);

  const {
    question,
    choices = [],
    correctAnswer,
  } = quizQuestionsDisplay[currentQuestion] || {};
  const navigate = useNavigate();
  // to quit
  const [quit, setQuit] = useState(false);
  const openQuit = () => {
    setQuit(true);
  };
  const closeQuit = () => {
    setQuit(false);
  };
  const handleQuit = () => {
    window.location.reload();
  };
  const onAnwswerClick = (answer, choiceIndex) => {
    setAnswerIdx(choiceIndex);
    console.log(answer);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };
  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== quizQuestionsDisplay.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };
  return (
    <>
      <div className="quiz-container">
        {quizQuestionsDisplay.length === 0 ? (
          <h6 className="quizBorder">
            The quiz is not available. Please try again later.
          </h6>
        ) : !showResult ? (
          <>
            <p>Instruction: Read the questions carefully.</p>
            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="total-question">
              /{quizQuestionsDisplay.length}
            </span>
            <h2 className="text-black">{question}</h2>
            {/* Display added quiz quizQuestionsDisplay */}
            <ul>
              {choices.map((choice, choiceIndex) => (
                <li
                  key={choice}
                  onClick={() => onAnwswerClick(choice, choiceIndex)}
                  className={
                    answerIdx === choiceIndex ? "selected-answer" : null
                  }
                >
                  {choice}
                </li>
              ))}
            </ul>
            <div className="footer">
              <button onClick={onClickNext} disabled={answerIdx === null}>
                {currentQuestion === quizQuestionsDisplay.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Questions: <span>{quizQuestionsDisplay.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={onTryAgain}>Try again</button>
          </div>
        )}
      </div>
      {/*Quit */}
      <Modal show={quit} onHide={closeQuit}>
        <Modal.Header>
          <Modal.Title>Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to quit?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleQuit}>
            Yes
          </Button>
          <Button variant="secondary" onClick={closeQuit}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Intro_Q;
