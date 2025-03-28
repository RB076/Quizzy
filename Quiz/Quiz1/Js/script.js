const questions = [
    { question: "Wat is een hashtag?", choices: ["Foto", "Video", "Symbool", "Woord"], answer: 2 },
    { question: "Wat is phishing?", choices: ["E-mailfraude", "Foto's delen", "Social media", "Video's uploaden"], answer: 0 },
    { question: "Wat betekent DM op sociale media?", choices: ["Document", "Direct Message", "Download", "Discussie"], answer: 1 },
    { question: "Wat is een 'emoji'?", choices: ["Afbeelding", "Tekst", "Symbool", "Bestand"], answer: 2 },
    { question: "Wat betekent 'viral' op het internet?", choices: ["Populair", "Onbekend", "Verwijderd", "Verouderd"], answer: 0 },
    { question: "Wat is een 'meme'?", choices: ["Afbeelding", "Tekst", "Grappige afbeelding", "Video"], answer: 2 },
    { question: "Wat is een 'browser'?", choices: ["App", "Zoeken", "Webpagina", "Website"], answer: 0 },
    { question: "Wat betekent 'cookies' in de online wereld?", choices: ["Eten", "Data", "Afbeeldingen", "Links"], answer: 1 },
    { question: "Wat is 'uploaden'?", choices: ["Delen", "Verwijderen", "Versturen", "Gegevens plaatsen"], answer: 3 },
    { question: "Wat is een 'filter' op sociale media?", choices: ["Afbeelding", "Foto-effect", "Tekst", "Reactie"], answer: 1 }
];

const openQuestions = [
    { 
        question: "Wat is een voorbeeld van een wachtwoordbeheer?", 
        correctAnswers: ["wachtwoord", "password"], 
        exampleAnswers: ["wachtwoord", "paswoord", "password"]
    },
    { 
        question: "Wat noem je het proces van het delen van nep informatie?", 
        correctAnswers: ["nepnieuws", "fake news"], 
        exampleAnswers: ["nepnieuws", "fake news", "misinformatie"]
    },
    { 
        question: "Wat gebruik je om je online veiligheid te beschermen?", 
        correctAnswers: ["wachtwoord", "antivirus", "firewall"], 
        exampleAnswers: ["wachtwoord", "virusscanner", "firewall"]
    },
    { 
        question: "Wat moet je doen als je wordt gepest online?", 
        correctAnswers: ["blokkeren", "melden"], 
        exampleAnswers: ["Blokkeren", "rapporteren", "Melden"]
    },
    { 
        question: "Wat is een betrouwbare bron voor informatie?", 
        correctAnswers: ["nieuws", "overheid", "journalist"], 
        exampleAnswers: ["nieuws", "website van de overheid", "bekende krant"]
    }
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
