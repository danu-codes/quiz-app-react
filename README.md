🧠 QuizMaster — React Quiz App
A modern, responsive multiple-choice quiz application built with React 19 and Vite 8. Challenge yourself with general-knowledge questions, race against the clock, review your answers, and track your recent scores.
✨ Features
70 questions included in the question bank; a random selection is used for each quiz.
Flexible quiz length: choose 5, 10, 15, or 20 questions.
Custom time limits: choose 10, 15, 20, or 30 seconds per question.
Fair question randomization using the Fisher–Yates shuffle algorithm.
Countdown timer based on wall-clock deadlines rather than relying only on interval counts.
Instant answer feedback showing correct and incorrect choices before moving on.
Detailed results with accuracy, correct, incorrect, timed-out counts, and elapsed time.
Answer review after each quiz.
Recent attempt history saved in the browser using `localStorage` (up to eight results stored; the latest three shown on the welcome screen).
Responsive layout for desktop, tablet, and mobile screens.
Basic accessibility enhancements including labeled controls and quiz progress announcements.
🛠️ Tech Stack
React 19
JavaScript (ES modules and JSX)
Vite 8
CSS3
Browser `localStorage`
This is a frontend-only application. No backend, login, or database server is required.
🚀 Getting Started
Prerequisites
Node.js and npm installed; use a Node.js version compatible with Vite 8 (Node.js 20.19+ or 22.12+).
A modern web browser.
Installation
```bash
# Clone your repository
 git clone https://github.com/danu-codes/quiz-app-react.git

# Open the project directory
cd quiz-app-react

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open the local URL printed in your terminal (typically `http://localhost:5173`).
If you downloaded the project ZIP instead of cloning, extract it and run `npm install` and `npm run dev` inside the extracted `quizmaster-react` directory.
🎮 How to Play
On the welcome screen, choose the number of questions and time limit.
Click Start Quiz.
Select one of the four answers before the timer expires.
See brief feedback; the next question loads automatically.
After the final question, view your score, accuracy, time, and answer review.
Choose Try Again to begin a new randomized quiz or Home to change settings and see recent attempts.
Timed-out questions are tracked separately from incorrect answers.
📁 Project Structure
```text
quizmaster-react/
├── index.html           # HTML entry point
├── package.json         # Scripts and dependencies
├── vite.config.js       # Vite settings and GitHub Pages base path
├── README.md            # Documentation
└── src/
    ├── main.jsx         # React application entry point
    ├── App.jsx          # Quiz logic and UI screens
    ├── App.css          # Responsive styles
    └── question.json    # Multiple-choice question bank
```
📜 Available Commands
Command	Description
`npm run dev`	Start the local development server
`npm run build`	Create a production build in `dist/`
`npm run preview`	Preview the production build locally
`npm run deploy`	Build for GitHub Pages and publish `dist/` to the `gh-pages` branch
🌐 Deploying to GitHub Pages
The provided `vite.config.js` sets the base URL to `/quiz-app-react/` when running the deployment build. That path must match your GitHub repository name.
Push this project to a GitHub repository named `quiz-app-react`.
Ensure the repository remote and GitHub authentication are configured.
Run:
```bash
   npm install
   npm run deploy
   ```
In GitHub, open Settings → Pages and configure Deploy from a branch, selecting the `gh-pages` branch and `/ (root)` if necessary.
Once GitHub Pages publishes the site, it should be available at:
`https://danu-codes.github.io/quiz-app-react/`
> **Using a different repository name?** Update the `/quiz-app-react/` path in `vite.config.js` before deploying. `npm run build` still uses `/` for ordinary hosting; `npm run deploy` enables the GitHub Pages-specific path.
🧩 Customizing Questions
Edit `src/question.json` to add or modify the question bank. Each entry should include a unique `id`, a `question`, four `options`, and an `answer` matching one of the options.
Example:
```json
{
  "id": 101,
  "question": "Which planet is known as the Red Planet?",
  "options": ["Venus", "Mars", "Jupiter", "Mercury"],
  "answer": "Mars"
}
```
Keep the JSON valid and ensure every `answer` is exactly equal to one of its `options` values.
💾 Score History & Privacy
The application stores recent scores in your own browser's `localStorage` under the key `quizmaster-history`. There is no account sync or server-side storage. Browser data clearing or using a different device/browser will remove or hide that history.
🔮 Possible Future Improvements
Filter questions by category or difficulty.
Add a dark/light theme toggle.
Add keyboard shortcuts and expanded accessibility support.
Add automated unit and UI tests.
Refactor quiz screens into reusable components and custom hooks.
Add a backend for user accounts, leaderboards, and synchronized results.
👨‍💻 Author
Developed by Danushan as a React learning and portfolio project.
---
If you find the project helpful, consider giving the repository a ⭐ on GitHub.
