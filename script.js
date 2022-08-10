const startbtn = document.getElementById("start");
const nextbtn = document.getElementById("next");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById('question');
const answerbtn = document.getElementById('answer');
let shuffle, currentQuestion;

startbtn.addEventListener('click', startGame);
nextbtn.addEventListener('click', () => {
  currentQuestion++
  nextQuestion();
});

function startGame() {
  startbtn.classList.add('hide');
  shuffle = questions.sort(() => Math.random() - .5)
  currentQuestion = 0;
  questionContainer.classList.remove('hide');
  nextQuestion();
}
function nextQuestion(){
  reset();
  showQuestion(shuffle[currentQuestion]);
}
function showQuestion(question){
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerbtn.appendChild(button);
  })
}
function reset() {
  clearStatus(document.body);
  nextbtn.classList.add('hide');
  while(answerbtn.firstChild) {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}
function selectAnswer(e){
  const selectedbtn = e.target;
  const correct = selectedbtn.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerbtn.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if(shuffle.length > currentQuestion + 1) {
    nextbtn.classList.remove('hide');
  }else{
    startbtn.innerText = "Restart";
    startbtn.classList.remove('hide');
  }
}
function setStatusClass(element, correct){
  clearStatus(element)
  if(correct) {
    element.classList.add('correct');    
  }else{
    element.classList.add('wrong');    
  }
}
function clearStatus(element){
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
const questions = [
  {
    question: 'Who is the best?',
    answers: [
      {text: 'IShowspeed', correct: true},
      {text: 'Ben', correct: false},
      {text: 'quandale dingle', correct: false},
      {text: 'KSI', correct: true}
    ]
  },
  {
    question: 'Messi or Ronaldo?',
    answers: [
      {text: 'Messi', correct: true},
      {text: 'Ronaldo', correct: false}
    ]
  },
  {
    question: 'Yamato is the best character ever?',
    answers: [
      {text: 'YES', correct: true},
      {text: 'NO', correct: false}
    ]
  },
  {
    question: 'IShowspeed is gay?',
    answers: [
      {text: 'YES', correct: true},
      {text: 'NO', correct: false}
    ]
  }
]
