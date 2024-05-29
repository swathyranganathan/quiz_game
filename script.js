const questions =[
    {
        question: "Which of the following is not a programming language?",
        answers:[
            {text:"Python", correct: false},
            {text:"JavaScript", correct: false},
            {text:"HTML", correct: true},
            {text:"Java", correct: false},
        ]
    },
    {
        question: " Which of the following data structures uses the Last In, First Out (LIFO) principle?",
        answers:[
            {text:"Queue", correct: false},
            {text:"Stack", correct: true},
            {text:"Array", correct: false},
            {text:"Linked List", correct: false},
        ]
    },
    {
        question: "Which of the following is used to find the largest or smallest item in a list?",
        answers:[
            {text:"Binary Search", correct: false},
            {text:"Insertion Sort", correct: false},
            {text:"Quick Sort", correct: false},
            {text:"Selection Sort", correct: true},
        ]
    },
    {
        question: "Which of the following is a Python web framework?",
        answers:[
            {text:"Laravel", correct: false},
            {text:"React", correct: false},
            {text:"Django", correct: true},
            {text:"Angular", correct: false},
        ]
    },
    {
        question: "Which keyword is used in Python to create a function?",
        answers:[
            {text:"func", correct: false},
            {text:"define", correct: false},
            {text:"function", correct: false},
            {text:"def", correct: true},
        ]
    },
    {
        question: "Which of the following is not a primitive data type in Java?",
        answers:[
            {text:"int", correct: false},
            {text:"boolean", correct: false},
            {text:"String", correct: true},
            {text:"char", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();