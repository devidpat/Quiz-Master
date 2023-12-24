const questions = [
	{
		question: 'Captain of Indian Cricket Team?',
		answers: [
			{ text: 'Rohit Sharma', correct: true },
			{ text: 'Virat Kohli', correct: false },
			{ text: 'MS Dhoni', correct: false },
			{ text: 'Hardik Pandya', correct: false },
		],
	},
	{
		question: 'Who was the highest run scorer in ICC men cricket world cup?',
		answers: [
			{ text: 'Virat Kohli', correct: true },
			{ text: 'Rohit Sharma', correct: false },
			{ text: 'David Warner', correct: false },
			{ text: 'Rachin Ravindra', correct: false },
		],
	},
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

var currentQuestionIndex = 0;
var score = 0;

function startQuiz() {
	// Inital Values
	currentQuestionIndex = 0;
	score = 0;
	// When we start the quiz the button will be Next at the end of the quiz the button will be Restart
	nextButton.innerHTML = 'Next';
	showQuestions();
}

function showQuestions() {
	// Need to reset the state before displaying the ques
	resetState();

	var currQues = questions[currentQuestionIndex];
	var quesNo = currentQuestionIndex + 1;

	questionElement.innerHTML = quesNo + '. ' + currQues.question;

	currQues.answers.forEach((ans) => {
		const button = document.createElement('button');
		button.innerHTML = ans.text;
		button.classList.add('btn');
		answerButtons.appendChild(button);
		if (ans.correct) {
			button.dataset.correct = ans.correct;
		}
		button.addEventListener('click', selectAns);
	});
}

function resetState() {
	nextButton.style.display = 'none';
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAns(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === 'true';
	if (isCorrect) {
		selectedBtn.classList.add('correct');
		score++;
	} else selectedBtn.classList.add('incorrect');

	Array.from(answerButtons.children).forEach((btn) => {
		if (btn.dataset.correct === 'true') btn.classList.add('correct');
		btn.disabled = true;
	});
	nextButton.style.display = 'block';
}

function showScore() {
	resetState();
	questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!`;
	nextButton.innerHTML = 'Play Again';
	nextButton.style.display = 'block';
}

function handleNextBtn() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) showQuestions();
	else showScore();
}

nextButton.addEventListener('click', () => {
	if (currentQuestionIndex < questions.length) handleNextBtn();
	else startQuiz();
});

startQuiz();
