import { useEffect, useReducer, useRef, useState } from 'react';
import questionsData from './question.json';
import './App.css';

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const initialQuiz = {
  phase: 'welcome', questions: [], index: 0, answers: [],
  remaining: 10, deadline: 0, startedAt: 0, finishedAt: 0,
  secondsPerQuestion: 10,
};

function completeQuestion(state, selected, now) {
  if (state.phase !== 'question') return state;
  const current = state.questions[state.index];
  const finalSelection = now >= state.deadline ? null : selected;
  const answer = {
    id: current.id,
    question: current.question,
    correct: current.answer,
    selected: finalSelection,
    options: current.options,
  };
  return { ...state, phase: 'feedback', remaining: Math.max(0, Math.ceil((state.deadline - now) / 1000)), answers: [...state.answers, answer] };
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...initialQuiz,
        phase: 'question',
        questions: action.questions,
        secondsPerQuestion: action.seconds,
        remaining: action.seconds,
        deadline: action.now + action.seconds * 1000,
        startedAt: action.now,
      };
    case 'TICK': {
      if (state.phase !== 'question') return state;
      if (action.now >= state.deadline) return completeQuestion(state, null, action.now);
      const remaining = Math.ceil((state.deadline - action.now) / 1000);
      return remaining === state.remaining ? state : { ...state, remaining };
    }
    case 'ANSWER':
      return completeQuestion(state, action.selected, action.now);
    case 'NEXT': {
      if (state.phase !== 'feedback') return state;
      if (state.index === state.questions.length - 1) {
        return { ...state, phase: 'results', finishedAt: action.now };
      }
      return {
        ...state,
        phase: 'question',
        index: state.index + 1,
        remaining: state.secondsPerQuestion,
        deadline: action.now + state.secondsPerQuestion * 1000,
      };
    }
    case 'HOME': return initialQuiz;
    default: return state;
  }
}

function loadHistory() {
  try {
    const value = JSON.parse(localStorage.getItem('quizmaster-history') || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [quiz, dispatch] = useReducer(quizReducer, initialQuiz);
  const [count, setCount] = useState(10);
  const [seconds, setSeconds] = useState(10);
  const [history, setHistory] = useState(loadHistory);
  const savedRun = useRef(null);

  useEffect(() => {
    if (quiz.phase !== 'question') return undefined;
    const id = window.setInterval(() => dispatch({ type: 'TICK', now: Date.now() }), 100);
    return () => window.clearInterval(id);
  }, [quiz.phase, quiz.index]);

  useEffect(() => {
    if (quiz.phase !== 'feedback') return undefined;
    const id = window.setTimeout(() => dispatch({ type: 'NEXT', now: Date.now() }), 950);
    return () => window.clearTimeout(id);
  }, [quiz.phase, quiz.index]);

  const correctCount = quiz.answers.filter((item) => item.selected === item.correct).length;
  const unansweredCount = quiz.answers.filter((item) => item.selected === null).length;
  const incorrectCount = quiz.answers.length - correctCount - unansweredCount;
  const percentage = quiz.questions.length ? Math.round((correctCount / quiz.questions.length) * 100) : 0;
  const elapsedSeconds = Math.max(0, Math.round((quiz.finishedAt - quiz.startedAt) / 1000));

  useEffect(() => {
    if (quiz.phase !== 'results' || savedRun.current === quiz.startedAt) return;
    savedRun.current = quiz.startedAt;
    const record = {
      id: quiz.startedAt,
      date: new Date(quiz.startedAt).toISOString(),
      correct: correctCount,
      total: quiz.questions.length,
      percentage,
    };
    const next = [record, ...loadHistory()].slice(0, 8);
    try { localStorage.setItem('quizmaster-history', JSON.stringify(next)); } catch { /* storage disabled */ }
    setHistory(next);
  }, [quiz.phase, quiz.startedAt, quiz.questions.length, correctCount, percentage]);

  function startQuiz() {
    const selected = shuffle(questionsData).slice(0, Math.min(count, questionsData.length));
    savedRun.current = null;
    dispatch({ type: 'START', questions: selected, seconds, now: Date.now() });
  }

  const question = quiz.questions[quiz.index];
  const latestAnswer = quiz.answers[quiz.answers.length - 1];
  const progress = quiz.questions.length ? ((quiz.index + (quiz.phase === 'feedback' ? 1 : 0)) / quiz.questions.length) * 100 : 0;

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" type="button" onClick={() => dispatch({ type: 'HOME' })} aria-label="Go to home">✦ <span>QuizMaster</span></button>
        <span className="header-pill">Think • Learn • Grow</span>
      </header>

      <main className="main-content">
        {quiz.phase === 'welcome' && (
          <section className="panel welcome-panel" aria-labelledby="welcome-title">
            <span className="eyebrow">YOUR DAILY BRAIN BOOST</span>
            <div className="hero-icon" aria-hidden="true">🧠</div>
            <h1 id="welcome-title">Ready to challenge your mind?</h1>
            <p className="muted hero-copy">Answer fun general knowledge questions, race against the clock, and see how much you know.</p>
            <div className="settings-grid">
              <label className="field">Questions
                <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
                  {[5, 10, 15, 20].filter((n) => n <= questionsData.length).map((n) => <option key={n} value={n}>{n} questions</option>)}
                </select>
              </label>
              <label className="field">Time per question
                <select value={seconds} onChange={(e) => setSeconds(Number(e.target.value))}>
                  {[10, 15, 20, 30].map((n) => <option key={n} value={n}>{n} seconds</option>)}
                </select>
              </label>
            </div>
            <button className="primary-btn" onClick={startQuiz}>Start Quiz <span aria-hidden="true">→</span></button>
            {history.length > 0 && (
              <div className="history-section">
                <h2>Recent attempts</h2>
                {history.slice(0, 3).map((item) => (
                  <div className="history-item" key={item.id}>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <strong>{item.correct}/{item.total} • {item.percentage}%</strong>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {(quiz.phase === 'question' || quiz.phase === 'feedback') && question && (
          <section className="panel question-panel" aria-labelledby="question-title">
            <div className="question-header">
              <span className="eyebrow">QUESTION {quiz.index + 1} OF {quiz.questions.length}</span>
              <span className={`timer-pill ${quiz.remaining <= 3 ? 'timer-urgent' : ''}`} role="timer" aria-label={`${quiz.remaining} seconds remaining`}>◷ {quiz.remaining}s</span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100" aria-label="Quiz progress"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <h1 id="question-title">{question.question}</h1>
            <div className="answers-grid">
              {question.options.map((option, index) => {
                const isCorrect = quiz.phase === 'feedback' && option === question.answer;
                const isWrong = quiz.phase === 'feedback' && option === latestAnswer?.selected && option !== question.answer;
                return (
                  <button
                    key={`${question.id}-${index}`}
                    type="button"
                    className={`answer-option ${isCorrect ? 'answer-correct' : ''} ${isWrong ? 'answer-wrong' : ''}`}
                    onClick={() => dispatch({ type: 'ANSWER', selected: option, now: Date.now() })}
                    disabled={quiz.phase !== 'question'}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                    {isCorrect && <span className="answer-mark" aria-label="Correct">✓</span>}
                    {isWrong && <span className="answer-mark" aria-label="Incorrect">✕</span>}
                  </button>
                );
              })}
            </div>
            <p className="question-footer" aria-live="polite">
              {quiz.phase === 'feedback' ? (latestAnswer?.selected === null ? 'Time is up! Moving to the next question…' : latestAnswer?.selected === latestAnswer?.correct ? 'Correct! Great job.' : 'Not quite! Check the correct answer.') : 'Choose the best answer before time runs out.'}
            </p>
          </section>
        )}

        {quiz.phase === 'results' && (
          <section className="panel results-panel" aria-labelledby="results-title">
            <span className="eyebrow">QUIZ COMPLETE</span>
            <h1 id="results-title">{percentage >= 80 ? 'Amazing work! 🎉' : percentage >= 50 ? 'Nice effort! 🌟' : 'Keep practicing! 💪'}</h1>
            <p className="muted">Here is how you performed this round.</p>
            <div className="score-ring" style={{ '--score': `${percentage}%` }} role="img" aria-label={`Score ${percentage} percent`}><div><strong>{percentage}%</strong><span>Accuracy</span></div></div>
            <div className="stats-grid">
              <div className="stat correct-stat"><strong>{correctCount}</strong><span>Correct</span></div>
              <div className="stat wrong-stat"><strong>{incorrectCount}</strong><span>Incorrect</span></div>
              <div className="stat skipped-stat"><strong>{unansweredCount}</strong><span>Timed out</span></div>
            </div>
            <p className="time-summary">Completed {quiz.questions.length} questions in {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s</p>
            <div className="results-actions"><button className="primary-btn" onClick={startQuiz}>Try Again ↻</button><button className="secondary-btn" onClick={() => dispatch({ type: 'HOME' })}>Home</button></div>
            <section className="review-section" aria-labelledby="review-title">
              <h2 id="review-title">Answer review</h2>
              {quiz.answers.map((answer, index) => {
                const correct = answer.selected === answer.correct;
                return (
                  <article className={`review-card ${correct ? 'review-correct' : 'review-wrong'}`} key={`${answer.id}-${index}`}>
                    <div className="review-heading"><span>Question {index + 1}</span><strong>{correct ? '✓ Correct' : answer.selected === null ? '◷ Timed out' : '✕ Incorrect'}</strong></div>
                    <h3>{answer.question}</h3>
                    <p>Your answer: <strong>{answer.selected ?? 'Not answered'}</strong></p>
                    {!correct && <p>Correct answer: <strong>{answer.correct}</strong></p>}
                  </article>
                );
              })}
            </section>
          </section>
        )}
      </main>
      <footer className="site-footer">Made for curious minds ✨</footer>
    </div>
  );
}
