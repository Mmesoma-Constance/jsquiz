const questions = [
  {
    question: "How do you create a private variable in JavaScript?",
    answers: [
      { text: "Using <i>let</i>", correct: false },
      { text: "Using <i>const</i>", correct: false },
      { text: "Using closures", correct: true },
      { text: "Using <i>var</i>", correct: false },
    ],
  },
  {
    question: "What is the purpose of the <i>bind</i> method in JavaScript?",
    answers: [
      { text: "To combine two arrays", correct: false },
      {
        text: "To change the context of <i>this</i> in a function",
        correct: true,
      },
      { text: "To create a new function", correct: false },
      { text: "To define a class", correct: false },
    ],
  },
  {
    question: "How do you create a new object with properties in JavaScript?",
    answers: [
      { text: "Using the <b>Object.create</b> method", correct: false },
      { text: "Using the <b>new Object()</b> constructor", correct: false },
      { text: "Using Object literal notation <b>{}</b>", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question:
      "Which method is used to add an element at the end of an array in JavaScript?",
    answers: [
      { text: "pop()", correct: false },
      { text: "push()", correct: true },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: "What does the <i>this</i> keyword refer to in JavaScript?",
    answers: [
      { text: "The global object", correct: false },
      { text: "The current object", correct: true },
      { text: "The parent object", correct: false },
      { text: "The previous object", correct: false },
    ],
  },
  {
    question:
      "What is the default method for making HTTP requests in JavaScript?",
    answers: [
      { text: "fetch()", correct: true },
      { text: "axios()", correct: false },
      { text: "httpRequest()", correct: false },
      { text: "ajax()", correct: false },
    ],
  },
  {
    question: "What will <b>console.log(typeof NaN)</b> output?",
    answers: [
      { text: "number", correct: true },
      { text: "NaN", correct: false },
      { text: "undefined", correct: false },
      { text: "object", correct: false },
    ],
  },
  {
    question: "What does the <i>Object.keys()</i> method retun?",
    answers: [
      { text: "An array of the object's values", correct: false },
      { text: "An array of the object's key-value pairs", correct: false },
      { text: "An array of the object's property names", correct: true },
      { text: "An array of the object's prototypes", correct: false },
    ],
  },
  {
    question: "What is the purpose of the <i>super</i> keyword in JavaScript?",
    answers: [
      { text: "To refer to the global object", correct: false },
      { text: "To call a method from a parent class", correct: true },
      { text: "To define a new object", correct: false },
      { text: "To create a new array", correct: false },
    ],
  },
  {
    question: "What will <b>console.log('5' - 3)</b> output?",
    answers: [
      { text: "2", correct: true },
      { text: "'2'", correct: false },
      { text: "53", correct: false },
      { text: "NaN", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const remark = document.getElementById("remark");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  remark.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn", "platypi");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  console.log(score);
  remark.style.display = "block";
  if (score === 0) {
    remark.innerHTML = "Don't get discouraged, give it another shot!";
  } else if (score <= 2) {
    remark.innerHTML = "Low score. You can do better!";
  } else if (score <= 4) {
    remark.innerHTML = "Don't give up, You got this!";
  } else if (score === 5) {
    remark.innerHTML = "Nice try! You are halfway there!";
  } else if (score <= 7) {
    remark.innerHTML = "You are getting there! Keep going";
  } else if (score === 8) {
    remark.innerHTML = "Good job! You can reach the top!";
  } else if (score === 9) {
    remark.innerHTML = "Great work!, You're very close to a perfect score";
  } else if (score === 10) {
    remark.innerHTML = "Outstanding! You're a quiz master!";
  }
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
