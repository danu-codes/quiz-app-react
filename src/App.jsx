import { useEffect, useState } from 'react'
import './App.css'
import QuestionData from "./question.json"

function App() {
  const [currrentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (showScore) return;

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
  }, [showScore]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption == QuestionData[currrentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currrentQuestion < QuestionData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    }
    else {
      setShowScore(true);
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }

  return (
    <div className='quiz-app'>

      {showScore ? (
        <div className='score-section'>
          <h2>Your Score: {score}/{QuestionData.length}</h2>
          <button onClick={handleRestartQuiz}>Restart</button>
        </div>) :
        (<div className="question-section">
          <h2>Question {currrentQuestion + 1}</h2>
          <p>{QuestionData[currrentQuestion].question}</p>
          <div className="options">
            {QuestionData[currrentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>{option}</button>
            ))}
          </div>
          <div className='timer'>Time left: {timer}s </div>
        </div>)
      }
    </div>
  )
}

export default App
