"use strict";

const quizData = [
    {
        question: "Яка мова програмування робить сторінки інтерактивними?",
        a: "HTML",
        b: "CSS",
        c: "JavaScript",
        correct: "c"
    },
    {
        question: "Що означає CSS?",
        a: "Creative Style Sheets",
        b: "Cascading Style Sheets",
        c: "Computer Style Sheets",
        correct: "b"
    },
    {
        question: "Який тег використовується для створення посилання в HTML?",
        a: "link",
        b: "a",
        c: "href",
        correct: "b"
    },
    {
        question: "Яка властивість CSS змінює колір тексту?",
        a: "font-color",
        b: "text-style",
        c: "color",
        correct: "c"
    },
    {
        question: "Як правильно вивести повідомлення в консоль браузера?",
        a: "console.log()",
        b: "print()",
        c: "browser.output()",
        correct: "a"
    }
]; 

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const answerForm = document.getElementById("answer-form");
const scoreEl = document.getElementById("current-score");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    const currentData = quizData[currentQuiz];
    
    questionEl.innerText = currentData.question;
    optionsEl.innerHTML = `
        <label><input type="radio" name="answer" value="a" required> ${currentData.a}</label>
        <label><input type="radio" name="answer" value="b"> ${currentData.b}</label>
        <label><input type="radio" name="answer" value="c"> ${currentData.c}</label>
    `;
    
    nextBtn.classList.add("hidden");
    resultContainer.classList.remove("hidden");
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    answers.forEach((answer) => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}

answerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const answer = getSelected();

    if (answer) {
        const currentData = quizData[currentQuiz];
        const allOptions = optionsEl.querySelectorAll('label');

        allOptions.forEach(label => {
    const input = label.querySelector('input');
    
    if (input.value === currentData.correct) {
        label.classList.add("correct-bg"); // Додаємо посилений клас
    } else if (input.checked) {
        label.classList.add("wrong-bg");   // Додаємо посилений клас
    }
    input.disabled = true;
});

        if (answer === currentData.correct) {
            score++;
        }
        
        scoreEl.innerText = `Ваш результат: ${score} / ${quizData.length}`;
        nextBtn.classList.remove("hidden");
        document.getElementById("submit-btn").disabled = true;
    }
});

// Сучасний обробник події для кнопки "Наступне питання"
nextBtn.addEventListener("click", function() {
    currentQuiz++;
    
    if (currentQuiz < quizData.length) {
        document.getElementById("submit-btn").disabled = false;
        loadQuiz();
    } else {
        document.getElementById("quiz").innerHTML = `<h2>Вікторину закінчено! Ваш фінальний рахунок: ${score}</h2>`;
        nextBtn.classList.add("hidden");
    }
});

loadQuiz();