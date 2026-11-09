const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Python", "JavaScript", "C++", "Java"],
    correctAnswer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTool Multi Language",
      "HomeText Markup Language"
    ],
    correctAnswer: "HyperText Markup Language"
  },
  {
    question: "Which CSS property changes text color?",
    answers: ["font-style", "background", "color", "text-size"],
    correctAnswer: "color"
  },
  {
    question: "Which symbol is used for an ID selector in CSS?",
    answers: [".", "#", "*", "&"],
    correctAnswer: "#"
  },
  {
    question: "Which HTML tag is used to add JavaScript?",
    answers: ["<js>", "<javascript>", "<script>", "<code>"],
    correctAnswer: "<script>"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionCountElement = document.getElementById("question-count");
const scoreDisplayElement = document.getElementById("score-display");
const progressBarElement = document.getElementById("progress-bar");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
  answerSelected = false;

  const currentQuestion = questions[currentQuestionIndex];

  questionCountElement.textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  scoreDisplayElement.textContent = `Score: ${score}`;
  questionElement.textContent = currentQuestion.question;
  feedbackElement.textContent = "";
  nextButton.classList.add("hidden");

  const progress = (currentQuestionIndex / questions.length) * 100;
  progressBarElement.style.width = `${progress}%`;

  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(button, answer, currentQuestion.correctAnswer);
    });

    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedAnswer, correctAnswer) {
  if (answerSelected) return;

  answerSelected = true;

  const answerButtons = answersElement.querySelectorAll("button");

  answerButtons.forEach((button) => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct! 🎉";
    feedbackElement.style.color = "#168553";
  } else {
    selectedButton.classList.add("incorrect");
    feedbackElement.textContent = `Not quite. The answer is ${correctAnswer}.`;
    feedbackElement.style.color = "#d13f3f";
  }

  scoreDisplayElement.textContent = `Score: ${score}`;

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "See Results"
      : "Next Question";

  nextButton.classList.remove("hidden");
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressBarElement.style.width = "100%";
  finalScoreElement.textContent = `${score} / ${questions.length}`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;

  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
});

showQuestion();