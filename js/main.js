// Question array
const questions = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Second Name" },
  { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create A Password", type: "password" }
];

//Transition Times
const shakeTime = 100; // shake Time Transition
const switchTime = 200; // Transition Between Questions

// Initilize at the first question
let position = 0;

// Init DOM Elemnets
const formBox = document.querySelector("#form-box"),
  nextBtn = document.querySelector("#next-btn"),
  prevBtn = document.querySelector("#prev-btn"),
  inputGroup = document.querySelector("#input-group"),
  inputField = document.querySelector("#input-field"),
  inputLabel = document.querySelector("#input-label"),
  inputProgress = document.querySelector("#input-Progress");
progress = document.querySelector("#progress-bar");

//Events

// Get question on dom load
document.addEventListener("DOMContentLoaded", getQuestion);

// next button click
nextBtn.addEventListener("click", validate);

//input field enter click
inputField.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    validate();
  }
});

//Function
//Get question from array and it to the markup
function getQuestion() {
  // get the current gestion
  inputLabel.innerHTML = questions[position].question;
  // type
  inputField.type = questions[position].type || "text";
  //answer
  inputField.value = questions[position].answer || "";
  // focus
  inputField.focus();

  // progress width
  progress.style.width = (position * 100) / questions.length + "%";

  // add user icon or arrow
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

//Show Questions To the User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// hiding question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.margLeft = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.boder = "none";
}

// transforn function
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

//validate funcvtion
function validate() {
  // patten match
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// fail function
function inputFail() {
  formBox.className = "error";
  //repeat shacke motion, set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // store answer 
  questions[position].answer = inputField.value;
  // increment position
  position++;

  // if new question
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";

    formComplete();
  }
}

// all feilds are compelet
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
      questions[0].answer
      } You are registered and will get an email shortly`
    )
  );

  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
