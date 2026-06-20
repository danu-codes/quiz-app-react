import { useEffect, useState, useRef } from 'react';
import './App.css';
import QuestionData from "./question.json";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [questions, setQuestions] = useState([]);
  const intervalRef = useRef(null); // track interval
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  const shuffleQuestions = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // centralized function to move to next question
  const goToNextQuestion = (current, selectedOption = null) => {
    if (selectedOption === null) {
      setUserAnswers((prev) => [
        ...prev,
        {
          question: questions[current].question,
          selected: "Not Answered",
          correct: questions[current].answer,
        },
      ]);
    }

    if (current < questions.length - 1) {
      setCurrentQuestion(current + 1);
    } else {
      setShowScore(true);
    }

    setTimer(10);
  };

  // Timer logic
  useEffect(() => {
    if (showScore || !startQuiz || questions.length === 0) return;

    // Clear any existing interval before starting new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimer(10); // reset timer on question change

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current); // stop interval
          goToNextQuestion(currentQuestion, null);  // use current value directly
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);

  }, [showScore, startQuiz, questions.length, currentQuestion]);

  useEffect(() => {
    let timerInterval;

    if (startQuiz && !showScore) {
      timerInterval = setInterval(() => {
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [startQuiz, showScore]);

  const handleStartQuiz = () => {
    const shuffled = shuffleQuestions(QuestionData).slice(0, 10);
    setQuestions(shuffled);
    setStartQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setUserAnswers([]);
    setTotalTime(0);
  };

  const handleAnswerClick = (selectedOption) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestion].question,
        selected: selectedOption,
        correct: questions[currentQuestion].answer,
      },
    ]);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    goToNextQuestion(currentQuestion, selectedOption);
  };

  const handleRestartQuiz = () => {
    const shuffled = shuffleQuestions(QuestionData).slice(0, 10);
    setQuestions(shuffled);
    setStartQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setUserAnswers([]);
    setTotalTime(0);
  };

  return (
    <div className="quiz-app">
      {!startQuiz ? (
        <div className="start-section">
          <h1>Quiz App</h1>
          <button className="start-btn" onClick={handleStartQuiz}>Start Now</button>
        </div>

      ) : showScore ? (
        <div className="score-section">
          <h2>Quiz Completed 🎉</h2>

          <h3>
            Score: {score}/{questions.length}
          </h3>

          <p>
            Correct Answers: {score}
          </p>

          <p>
            Wrong Answers: {questions.length - score}
          </p>

          <p>
            Accuracy: {((score / questions.length) * 100).toFixed(0)}%
          </p>

          <p>
            Time Taken: {Math.floor(totalTime / 60)}m {totalTime % 60}s
          </p>

          <div className="review-section">
            <h3>Answer Review</h3>

            {userAnswers.map((item, index) => (
              <div
                key={index}
                className={`review-card ${item.selected === item.correct
                    ? "correct"
                    : "wrong"
                  }`}
              >
                <p>
                  <strong>Q{index + 1}:</strong> {item.question}
                </p>

                <p>
                  <strong>Your Answer:</strong> {item.selected}
                </p>

                <p>
                  <strong>Correct Answer:</strong> {item.correct}
                </p>
              </div>
            ))}
          </div>

          <button onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>

      ) : questions.length > 0 && (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">Time left: {timer}s</div>
        </div>
      )}
    </div>
  );
}

export default App;
