const questions = [
    { question: "What is the primary cause of climate change?", choices: ["Deforestation", "Burning fossil fuels", "Solar flares", "Volcanic eruptions"], answer: 1 },
    { question: "Which gas is most responsible for global warming?", choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], answer: 2 },
    { question: "What is the greenhouse effect?", choices: ["Cooling of the Earth", "Heat trapped by gases in the atmosphere", "Melting of ice caps", "Formation of acid rain"], answer: 1 },
    { question: "Which sector contributes the most to global carbon emissions?", choices: ["Agriculture", "Transport", "Energy production", "Construction"], answer: 2 },
    { question: "What renewable energy source is the most widely used?", choices: ["Solar", "Wind", "Hydropower", "Geothermal"], answer: 2 },
    { question: "Which country emits the most CO2 annually?", choices: ["USA", "China", "India", "Russia"], answer: 1 },
    { question: "What percentage of the world’s coral reefs are threatened by climate change?", choices: ["20%", "50%", "75%", "90%"], answer: 2 },
    { question: "Which of these is NOT an effect of climate change?", choices: ["Rising sea levels", "More extreme weather", "Increased biodiversity", "Ocean acidification"], answer: 2 },
    { question: "What can individuals do to help combat climate change?", choices: ["Recycle more", "Drive less", "Use renewable energy", "All of the above"], answer: 3 },
    { question: "Which international agreement aims to limit global temperature rise?", choices: ["Kyoto Protocol", "Montreal Agreement", "Paris Agreement", "Rio Pact"], answer: 2 }
];

const openQuestions = [
    { question: "Name one consequence of global warming.", correctAnswers: ["rising sea levels", "extreme weather", "melting ice caps"] },
    { question: "How does deforestation contribute to climate change?", correctAnswers: ["reduces oxygen", "increases co2", "less carbon absorption"] },
    { question: "What can governments do to reduce carbon emissions?", correctAnswers: ["carbon tax", "invest in renewables", "promote public transport"] },
    { question: "How does climate change impact wildlife?", correctAnswers: ["habitat loss", "migration changes", "species extinction"] },
    { question: "What is one action you can take today to reduce your carbon footprint?", correctAnswers: ["use renewable energy", "drive less", "reduce meat consumption"] }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
const quizContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const answersFeedback = document.getElementById("answers-feedback");
const openAnswerInput = document.getElementById("open-answer");

function showQuestion() {
    quizContainer.innerHTML = "";
    openAnswerInput.value = "";
    openAnswerInput.classList.add("hidden");

    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        const questionElement = document.createElement("h2");
        questionElement.innerText = q.question;
        quizContainer.appendChild(questionElement);

        const choicesContainer = document.createElement("div");
        choicesContainer.id = "choices-container";
        quizContainer.appendChild(choicesContainer);

        q.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.innerText = choice;
            button.classList.add("answer-btn");
            button.onclick = () => selectAnswer(index);
            choicesContainer.appendChild(button);
        });
    } else if (currentQuestion < questions.length + openQuestions.length) {
        const qIndex = currentQuestion - questions.length;
        quizContainer.innerHTML = `<h2>${openQuestions[qIndex].question}</h2>`;
        openAnswerInput.classList.remove("hidden");
        nextButton.onclick = checkOpenAnswer;
    } else {
        showResults();
    }
}

function selectAnswer(index) {
    userAnswers.push({ 
        question: questions[currentQuestion].question, 
        answer: questions[currentQuestion].choices[index], 
        correct: index === questions[currentQuestion].answer 
    });

    if (index === questions[currentQuestion].answer) score++;
    currentQuestion++;
    showQuestion();
}

function checkOpenAnswer() {
    const qIndex = currentQuestion - questions.length;
    const userInput = openAnswerInput.value.trim().toLowerCase();
    const correct = openQuestions[qIndex].correctAnswers.some(ans => userInput.includes(ans));

    userAnswers.push({ question: openQuestions[qIndex].question, answer: userInput, correct });
    if (correct) score++;
    currentQuestion++;
    showQuestion();
}

function showResults() {
    // Hide everything except the score board
    document.getElementById("quiz-container").style.display = "none"; // Hide the quiz
    document.querySelector("h1").style.display = "none"; // Hide the title
    nextButton.style.display = "none"; // Hide the "Next" button

    // Show the score board
    resultContainer.classList.remove("hidden");
    scoreDisplay.innerText = `Your score is ${score}/15`;

    answersFeedback.innerHTML = userAnswers.map((ans, index) =>
        `<div class="answer-box ${ans.correct ? 'correct' : 'incorrect'}">Question ${index + 1}/15</div>`
    ).join('');
}

showQuestion();
