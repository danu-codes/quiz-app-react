# 🧠 QuizMaster — Interactive React Quiz App

A modern, responsive, and interactive quiz application built using **React.js, Vite, and CSS3**.

QuizMaster allows users to test their knowledge through randomized multiple-choice questions, configurable time limits, instant answer feedback, and detailed performance reports.

## 🚀 Features

- 🎯 **Randomized Questions** — Questions are shuffled to provide a different quiz experience each time.
- ⏱️ **Countdown Timer** — Each question has a configurable time limit.
- ⚙️ **Quiz Customization** — Choose the number of questions and time per question.
- ✅ **Instant Answer Feedback** — See whether your selected answer is correct or incorrect.
- 📊 **Performance Analysis** — View your score, accuracy percentage, and total time taken.
- 📝 **Answer Review** — Review your answers alongside the correct answers.
- 📈 **Quiz History** — Recent quiz results are stored locally in the browser.
- 🔄 **Restart Quiz** — Start a new quiz with randomized questions.
- 📱 **Responsive Design** — Optimized for desktops, tablets, and mobile devices.
- 🎨 **Modern UI** — Clean layouts, smooth transitions, and interactive answer cards.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js 19 | Frontend UI and state management |
| Vite 8 | Development server and build tool |
| JavaScript (ES6+) | Quiz logic and functionality |
| CSS3 | Styling, responsive layouts, and animations |
| HTML5 | Application structure |
| LocalStorage | Saving recent quiz results |
| Git & GitHub | Version control and project hosting |

## 📂 Project Structure

```text
quizmaster-react/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── question.json
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/danu-codes/quiz-app-react.git
```

### 2. Navigate to the Project Directory

```bash
cd quiz-app-react
```

### 3. Install Dependencies

Make sure Node.js and npm are installed.

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

Usually:

```text
http://localhost:5173/
```

## 🎮 How to Use

1. Open QuizMaster in your browser.
2. Select the number of questions.
3. Choose the time limit per question.
4. Click **Start Quiz**.
5. Read each question and select the correct answer.
6. Receive instant feedback after selecting an answer.
7. Complete all questions to view your results.
8. Review your correct, incorrect, and unanswered questions.
9. Restart the quiz to try again.

## 📊 Quiz Results

After completing a quiz, users can view:

- **Total Score** — Number of correct answers out of total questions.
- **Accuracy** — Percentage of questions answered correctly.
- **Correct Answers** — Number of correctly answered questions.
- **Incorrect Answers** — Number of incorrectly answered questions.
- **Unanswered Questions** — Questions skipped because the timer expired.
- **Time Taken** — Total duration of the quiz.
- **Answer Review** — Comparison of selected and correct answers.

## 🧩 Question Management

Quiz questions are stored in:

```text
src/question.json
```

Example question:

```json
{
  "question": "Which planet is known as the Red Planet?",
  "options": [
    "Venus",
    "Mars",
    "Jupiter",
    "Mercury"
  ],
  "answer": "Mars"
}
```

You can add, remove, or modify questions by editing the JSON file.

Ensure that each question contains a valid question, an options array, and a matching correct answer.

## 💾 Quiz History

QuizMaster uses browser LocalStorage to save recent quiz results.

This allows users to view their previous performance without creating an account.

**Note:** Quiz history is stored locally on the current browser and device. Clearing browser storage may delete saved results.

## 📱 Responsive Design

QuizMaster is designed to work across different screen sizes, including:

- Desktop computers
- Laptops
- Tablets
- Smartphones

The application includes responsive answer cards, flexible layouts, and mobile-friendly buttons.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint if configured |
| `npm run deploy` | Deploys the production build to GitHub Pages |

## 🌐 Deployment

The application can be deployed using GitHub Pages, Netlify, or Vercel.

### GitHub Pages

Install dependencies:

```bash
npm install
```

Make sure your `vite.config.js` contains the appropriate `base` path:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/quiz-app-react/",
});
```

Build and deploy the project:

```bash
npm run deploy
```

Ensure the repository is configured to publish from the `gh-pages` branch.

## 🔮 Future Improvements

- User authentication and profiles
- Category-based quizzes
- Multiple difficulty levels
- Leaderboards and rankings
- Online multiplayer quiz mode
- Backend integration using Node.js and Express
- MongoDB database integration
- Admin dashboard for managing questions
- User performance analytics
- Dark and light theme switching

## 👨‍💻 Developed By

**Sriranjan Danushan**

Frontend Developer | React.js Enthusiast | Aspiring Full-Stack Developer

**GitHub:** [danu-codes](https://github.com/danu-codes)

**Repository:** [Quiz App React](https://github.com/danu-codes/quiz-app-react)

## 📄 License

This project was developed for educational purposes and React development practice.

---

⭐ If you find this project useful, consider giving the repository a star!

**Made with ❤️ using React.js and Vite.**
