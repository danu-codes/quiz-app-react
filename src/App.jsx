import { useEffect, useState } from 'react';
import './App.css';
import QuestionData from "./question.json";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [questions, setQuestions] = useState([]);

  // Shuffle function
  const shuffleQuestions = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Start quiz
  const handleStartQuiz = () => {
    const shuffledQuestions = shuffleQuestions(QuestionData);

    setQuestions(shuffledQuestions);
    setStartQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  // Timer logic
  useEffect(() => {
    if (showScore || !startQuiz) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowScore(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showScore, startQuiz]);

  // Answer click
  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    const shuffledQuestions = shuffleQuestions(QuestionData);

    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div className="quiz-app">

      {/* START SCREEN */}
      {!startQuiz ? (
        <div className="start-section">
          <h1>Quiz App</h1>
          <button className="start-btn" onClick={handleStartQuiz}>
            Start Now
          </button>
        </div>

      ) : showScore ? (

        /* SCORE SCREEN */
        <div className="score-section">
          <h2>Your Score: {score}/{questions.length}</h2>

          <button onClick={handleRestartQuiz}>
            Restart
          </button>
        </div>

      ) : questions.length > 0 && (

        /* QUESTION SCREEN */
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>

          <p>{questions[currentQuestion].question}</p>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="timer">
            Time left: {timer}s
          </div>
        </div>

      )}

    </div>
  );
}

export default App;
