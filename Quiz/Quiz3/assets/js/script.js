const questions = [
    {
        question: "Wat betekent 'verantwoordelijk delen van informatie' ?",
        options: [
            "Informatie alleen delen wanneer het persoonlijk voordelig is",
            "Informatie delen zonder rekening te houden met de gevolgen",
            "Informatie delen op een manier die de privacy van anderen respecteert en de wet volgt",
            "Informatie delen zonder enige beperking"
        ],
        answer: 2,
        type: "closed",
    },
    {
        question: "Wat is een belangrijke factor bij het verantwoord delen van informatie?",
        options: [
            "Snelheid van het delen",
            "Het type apparaat dat gebruikt wordt",
            "De bescherming van persoonlijke gegevens",
            "Hoeveel mensen de informatie ontvangen"
        ],
        answer: 2,
        type: "closed",
    },
    {
        question: "Wat moet je altijd doen voordat je persoonlijke informatie van iemand anders deelt?",
        options: [
            "Vragen of het goed is om het te delen",
            "Zorgen dat het op sociale media wordt gedeeld",
            "Het altijd in je agenda noteren",
            "Het zonder toestemming delen als het urgent is"
        ],
        answer: 0,
        type: "closed",
    },
    {
        question: "Wat is een voorbeeld van onethisch informatie delen?",
        options: [
            "Het delen van bedrijfsinformatie met collega's",
            "Het delen van vertrouwelijke gegevens van een klant zonder hun toestemming",
            "Het delen van een algemeen nieuwsbericht op sociale media",
            "Het delen van een artikel over wetenschap"
        ],
        answer: 1,
        type: "closed",
    },
    {
        question: "Welke wet beschermt in Nederland persoonlijke gegevens bij het delen van informatie?",
        options: [
            "De Wet op de Persoonlijke Gegevens",
            "De Algemene Verordening Gegevensbescherming (AVG)",
            "De Wet op de Privacy",
            "De Digitale Veiligheidswet"
        ],
        answer: 1,
        type: "closed",
    },
    {
        question: "Wanneer is het legaal om persoonlijke gegevens van een ander te delen?",
        options: [
            "Alleen met toestemming van de persoon wiens gegevens het betreft",
            "Wanneer je geen toestemming hebt, maar denkt dat het niet schadelijk is",
            "Wanneer de informatie openbaar beschikbaar is",
            "Nooit, persoonlijke gegevens mogen nooit gedeeld worden"
        ],
        answer: 0,
        type: "closed",
    },
    {
        question: "Wat is een belangrijk aspect van verantwoord omgaan met informatie op sociale media?",
        options: [
            "Het delen van zoveel mogelijk privé-informatie om bekend te worden",
            "Het controleren van de privacy-instellingen en ervoor zorgen dat alleen relevante mensen de informatie zien",
            "Het posten van persoonlijke gesprekken en meningen",
            "Het regelmatig taggen van anderen in je berichten"
        ],
        answer: 1,
        type: "closed",
    },
    {
        question: "Waarom is het belangrijk om de bron van de informatie te controleren voordat je deze deelt?",
        options: [
            "Om te zorgen dat de informatie leuk is om te delen",
            "Omdat je anders misschien een straf krijgt",
            "Omdat de meeste mensen je niet zullen geloven zonder bron",
            "Om te voorkomen dat onjuiste of misleidende informatie wordt verspreid",
        ],
        answer: 3,
        type: "closed",
    },
    {
        question: "Wat kan het gevolg zijn van het onzorgvuldig delen van gevoelige informatie?",
        options: [
            "Vertrouwen wordt verloren en juridische problemen kunnen ontstaan",
            "Geen gevolgen, zolang je het maar snel deelt",
            "Je wordt altijd geprezen voor je openheid",
            "Het leidt vaak tot een toename van volgers op sociale media"
        ],
        answer: 0,
        type: "closed",
    },
    {
        question: "Wat is een goede gewoonte bij het delen van informatie op een werkplek?",
        options: [
            "Alle informatie delen met iedereen om transparantie te bevorderen",
            "Alle informatie geheim houden, ongeacht het belang",
            "Alleen de nodige informatie met de juiste personen delen",
            "Informatie delen zonder toestemming om tijd te besparen",
        ],
        answer: 2,
        type: "closed",
    },
    {
        question: "Wat is het percentage van bedrijven wereldwijd dat slachtoffer is geworden van een datalek in de afgelopen vijf jaar?",
        answer: [53, 58],
        type: "open",
    },
    {
        question: "Welk percentage van de AVG-boetes in Europa wordt opgelegd aan organisaties in de technologiesector?",
        answer: [40, 45],
        type: "open",
    },
    {
        question: "Welk percentage van de datalekken wereldwijd wordt veroorzaakt door menselijke fouten, zoals verkeerd verzonden e-mails of zwakke wachtwoorden?",
        answer: [74, 79],
        type: "open",
    },
    {
        question: "Hoeveel procent van de werknemers in Nederland heeft volgens onderzoek weleens per ongeluk gevoelige informatie gedeeld?",
        answer: [45, 50],
        type: "open",
    },
    {
        question: "Wat is het percentage van meldingen van datalekken in Nederland die voortkomen uit hacking of malware-aanvallen?",
        answer: [30, 35],
        type: "open",
    },
    ];

const userAnswers = [];

let currentQuestion = 0;
let score = 0;

// Quiz starten functie
function startQuiz() {
    document.querySelector('.quiz-info').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    showQuestion(currentQuestion);
}

// Vraag weergeven functie
function showQuestion(currentQ) {
    let qData = questions[currentQ]
    let qDiv = document.querySelector('.question-area #question');
    let optionscontainer = document.querySelector('.options');
    let openQDiv = document.querySelector('.open-option');
    let openInput = document.querySelector('#openQ');
    
    if (currentQuestion <= 14) {
        qDiv.textContent = qData.question;
        optionscontainer.textContent = '';
        openQDiv.style.display = 'none';
        openInput.style.display = 'none';

        if (qData.type === "closed") {
            qData.options.forEach((qOption, index) => {
                let optionDiv = document.createElement('div');
                let optionDivTxt = document.createTextNode(`${qOption}`);

                optionDiv.append(optionDivTxt);
                optionDiv.classList.add('option')
                optionDiv.addEventListener('click', ()=> {
                    checkAnswer(index);
                    next();   
                });
                optionscontainer.append(optionDiv);
            });
        } else {
            openQDiv.style.display = 'block';
            openInput.style.display = 'block';
            openInput.value = '';
            
        }
    }
}

// Antwoorden controleren functie (gesloten vragen)
function checkAnswer(selectedIndex) {
    let currentQ = questions[currentQuestion];
    if (selectedIndex === currentQ.answer) {
        score++;
        userAnswers.push(true)
    } else {
        userAnswers.push(false)
    }
}
// Antwoorden controleren functie (Open vragen)
function checkOpenAnswer(userAnswer, correctArray) {
    if (+userAnswer >= correctArray[0] && +userAnswer <= correctArray[1] ) {
        score++;
        userAnswers.push(true);
    }
}
// Functie voor de "Volgende"-knop
function next(){
    if (currentQuestion >= 0 && currentQuestion <= 14) {
        let qData = questions[currentQuestion];
        let openInput = document.querySelector('#openQ');

        if (qData.type === 'open') {
            checkOpenAnswer(openInput.value, qData.answer)
        }
        if (userAnswers.length <= currentQuestion) {
            userAnswers.push(false);
        }
        if (currentQuestion === 14) {
            showResult();
        } else {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    }
}
// Functie voor de "Vorige"-knop
function prev(){
    if (currentQuestion > 0) {
        let removedAnswer = userAnswers.pop();
        if (removedAnswer === true) {
            score--;
        }
        currentQuestion--
        showQuestion(currentQuestion)
    }
}
// Functie om het eindresultaat weer te geven
function showResult() {
    document.querySelector('.quiz-info').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.result-container').style.display = 'block';
    document.getElementById('userResult').textContent = score;
    document.querySelector('.repeat-icon-box').style.display = 'flex';

    let  answersBlocks = document.querySelector('.answers-blocks');
    answersBlocks.innerHTML = '';

    userAnswers.forEach(answerIsCorrect => {
        let  span = document.createElement('span');
        if (answerIsCorrect) {
            span.classList.add('correct');
        } else {
            span.classList.add('wrong');
        }
        answersBlocks.appendChild(span);
    });
}
// Functie om de quiz opnieuw te starten
function restatQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.querySelector('.quiz-info').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.result-container').style.display = 'none';
    document.querySelector('.repeat-icon-box').style.display = 'none';
    
}