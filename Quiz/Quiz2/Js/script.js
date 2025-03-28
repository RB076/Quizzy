const questions = [
    { question: "Wat is online identiteit?", choices: ["Je echte naam", "Hoe je jezelf online presenteert", "Een online wachtwoord", "Een social media account"], answer: 1 },
    { question: "Wat is online imago?", choices: ["Hoe anderen jou online zien", "Je profielfoto", "Je wachtwoord", "Je gebruikersnaam"], answer: 0 },
    { question: "Wat is een veelvoorkomende manier om je online imago te verbeteren?", choices: ["Negatieve berichten plaatsen", "Privacy-instellingen negeren", "Positieve content delen", "Geen account hebben"], answer: 2 },
    { question: "Wat kan je online imago schaden?", choices: ["Respectvolle reacties", "Nepnieuws verspreiden", "Goede profielfoto", "Veilige wachtwoorden gebruiken"], answer: 1 },
    { question: "Wat is een digitale voetafdruk?", choices: ["Je online activiteiten en sporen", "Een digitale handtekening", "Een social media account", "Een screenshot van je profiel"], answer: 0 },
    { question: "Waarom is privacy belangrijk voor je online identiteit?", choices: ["Om je account populair te maken", "Om jezelf te beschermen tegen misbruik", "Omdat het verplicht is", "Omdat je anders geen likes krijgt"], answer: 1 },
    { question: "Wat betekent ‘catfishing’?", choices: ["Een online vriendschap", "Een nep online identiteit gebruiken", "Een online game spelen", "Een profiel zonder foto hebben"], answer: 1 },
    { question: "Wat is een goede manier om je online identiteit te beschermen?", choices: ["Sterke wachtwoorden gebruiken", "Alles openbaar delen", "Je wachtwoorden opschrijven in je bio", "Geen profiel hebben"], answer: 0 },
    { question: "Wat moet je doen als iemand je online lastigvalt?", choices: ["Negeren en doorgaan", "Terug schelden", "Blokkeren en melden", "Je account verwijderen"], answer: 2 },
    { question: "Hoe kun je controleren wat er online over jou te vinden is?", choices: ["Je naam googelen", "Wachten tot iemand je tagt", "Een nieuw account aanmaken", "Je wachtwoord veranderen"], answer: 0 }
];


const openQuestions = [
    { 
        question: "Wat is een voorbeeld van een wachtwoordbeheer?", 
        correctAnswers: ["wachtwoordbeheer", "password manager"], 
        exampleAnswers: ["wachtwoord", "paswoord", "password", "password manager", "wachtwoordbeheerder"]
    },
    { 
        question: "Wat noem je het proces van het delen van nep informatie?", 
        correctAnswers: ["nepnieuws", "fake news", "desinformatie"], 
        exampleAnswers: ["nepnieuws", "fake news", "misinformatie", "desinformatie"]
    },
    { 
        question: "Wat gebruik je om je online veiligheid te beschermen?", 
        correctAnswers: ["wachtwoord", "antivirus", "firewall", "tweefactorauthenticatie"], 
        exampleAnswers: ["wachtwoord", "virusscanner", "firewall", "tweefactorauthenticatie", "antivirussoftware"]
    },
    { 
        question: "Wat moet je doen als je wordt gepest online?", 
        correctAnswers: ["blokkeren", "melden", "rapporteren"], 
        exampleAnswers: ["blokkeren", "rapporteren", "melden", "contact opnemen met een volwassene", "in gesprek gaan met de pestkop"]
    },
    { 
        question: "Wat is een betrouwbare bron voor informatie?", 
        correctAnswers: ["nieuws", "overheid", "journalist", "wetenschappelijke publicaties", "betrouwbare websites"], 
        exampleAnswers: ["nieuws", "website van de overheid", "bekende krant", "wetenschappelijke artikelen", "officiële documenten"]
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
    document.getElementById("quiz-container").style.display = "none"; 
    document.querySelector("h1").style.display = "none";
    nextButton.style.display = "none";

    resultContainer.classList.remove("hidden");
    scoreDisplay.innerText = `Your score is ${score}/15`;

    answersFeedback.innerHTML = userAnswers.map((ans, index) =>
        `<div class="answer-box ${ans.correct ? 'correct' : 'incorrect'}">Question ${index + 1}/15</div>`
    ).join('');
}

showQuestion();
