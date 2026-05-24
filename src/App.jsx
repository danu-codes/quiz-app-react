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
  const intervalRef = useRef(null); // 👈 track interval

  const shuffleQuestions = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // 👇 centralized function to move to next question
  const goToNextQuestion = (current) => {
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
          goToNextQuestion(currentQuestion);  // use current value directly
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);

  }, [showScore, startQuiz, questions.length, currentQuestion]); // ✅ currentQuestion here

  const handleStartQuiz = () => {
    const shuffled = shuffleQuestions(QuestionData).slice(0, 10);
    setQuestions(shuffled);
    setStartQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  const handleAnswerClick = (selectedOption) => {
    if (intervalRef.current) clearInterval(intervalRef.current); // 👈 stop timer immediately
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
    goToNextQuestion(currentQuestion);
  };

  const handleRestartQuiz = () => {
    const shuffled = shuffleQuestions(QuestionData).slice(0, 10);
    setQuestions(shuffled);
    setStartQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
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
          <h2>Your Score: {score}/{questions.length}</h2>
          <button onClick={handleRestartQuiz}>Restart</button>
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
