const questions = [
  {
    question: "Which was not one of Voldemort's Horcruxes?",
    options: [
      { text: "Harry", correct: false },
      { text: "Nagini", correct: false },
      { text: "Helga's Diadem", correct: true },
      { text: "Tom Riddle's Diary", correct: false },
    ],
  },
  {
    question: "Which of these are not one of Hagrid's many pets?",
    options: [
      { text: "Grawp", correct: true },
      { text: "Fluffy", correct: false },
      { text: "Aragog", correct: false },
      { text: "Noberta", correct: false },
    ],
  },
  {
    question: "Which class did Severus Snape always want to teach?",
    options: [
      { text: "Potions", correct: false },
      { text: "Charms", correct: false },
      { text: "Defense Against Dark Arts", correct: true },
      { text: "Transfiguration", correct: false },
    ],
  },
  {
    question: "Which Hogwarts house did Moaning Myrtle belong in?",
    options: [
      { text: "Gryffindor", correct: false },
      { text: "Slytherin", correct: false },
      { text: "Ravenclaw", correct: true },
      { text: "Hufflepuff", correct: false },
    ],
  },
  {
    question: "What class did Neville end up teaching at Hogwarts?",
    options: [
      { text: "Astronomy", correct: false },
      { text: "Herbology", correct: true },
      { text: "Charms", correct: false },
      { text: "Muggle Studies", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.options.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const iscorrect = selectedBtn.dataset.correct === "true";
  if (iscorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
