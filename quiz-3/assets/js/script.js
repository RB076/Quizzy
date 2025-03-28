const questions = [
{
    question: "Vraag 1 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 2 ?",
    options: ["A", "B", "C"],
    answer: 2,
    type: "closed",
},
{
    question: "Vraag 3 ?",
    options: ["A", "B", "C", "D"],
    answer: 3,
    type: "closed",
},
{
    question: "Vraag 4 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 5 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 6 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 7 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 8 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 9 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 10 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 11 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 12 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 13 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 14 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
{
    question: "Vraag 15 ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    type: "closed",
},
];

const userAnswers = [];

let currentQuestion = 0;
let score = 0;


function startQuiz() {
    document.querySelector('.quiz-info').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    showQuestion(currentQuestion);
}


function showQuestion(currentQ) {
    console.log('showq functie')
    let qData = questions[currentQ]
    let qDiv = document.querySelector('.question-area #question');
    let optionscontainer = document.querySelector('.options')

    if (currentQuestion <= 14) {
        qDiv.textContent = qData.question;
        optionscontainer.textContent = '';

        qData.options.forEach((qOption) => {
            let optionDiv = document.createElement('div');
            let optionDivTxt = document.createTextNode(`${qOption}`);

            optionDiv.append(optionDivTxt);
            optionDiv.classList.add('option')
            optionDiv.addEventListener('click', ()=> {
                console.log(optionDiv.textContent);
                next();
                
            });

            optionscontainer.append(optionDiv);
        });

    }
}




function next(){
    if (currentQuestion >= 0 && currentQuestion <= 13) {
        console.log('clicked')
        currentQuestion++
        console.log('current q = ', currentQuestion)
        showQuestion(currentQuestion);
    } else {
        console.log('no more q')
    }
}
function prev(){
    if (currentQuestion > 0) {
        console.log('clicked')
        // console.log(currentQuestion--)
        currentQuestion--
        showQuestion(currentQuestion)

    }
}

// document.querySelector('.options').textContent = '';;