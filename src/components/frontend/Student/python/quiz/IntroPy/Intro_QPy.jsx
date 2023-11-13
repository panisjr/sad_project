import { useState } from "react";
import { resultInitalState } from "./introPy";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./index.scss";

const Intro_QPy = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnwswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };
  // to quit
  const [quit, setQuit] = useState(false);
  const openQuit = () => {
    setQuit(true);
  };
  const closeQuit = () => {
    setQuit(false);
  };
  const navigate = useNavigate();
  const back = () => {
    navigate("/introPy");
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

    if (currentQuestion !== questions.length - 1) {
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
        {!showResult ? (
          <>
            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="total-question">/{questions.length}</span>
            <h2>{question}</h2>
            <ul>
              {choices.map((choice, index) => (
                <li
                  onClick={() => onAnwswerClick(choice, index)}
                  key={choice}
                  className={answerIdx === index ? "selected-answer" : null}
                >
                  {choice}
                </li>
              ))}
            </ul>
            <div className="footer">
              <button onClick={openQuit}>Quit</button>
              <button onClick={onClickNext} disabled={answerIdx === null}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
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
            <button onClick={back}>Back</button>
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
          <Button variant="primary" onClick={back}>
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

export default Intro_QPy;
