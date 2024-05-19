// Initialize scores for each category
let scores = {
    chill: 0,
    cozy: 0,
    adventurous: 0,
    chaotic: 0
};

// History stack to keep track of previous states
let history = [];

// Array of questions and answers
const questions = [
    {
        text: "You are a game show contestant on everyone's favorite show 'I was a math nerd in high school'. Before you are three doors. Behind two doors are goats. Behind the third door are more goats. We're talking TONS of goats. And you can keep as many as you want! All remaining goats will live the rest of their happy lives on a farm run by my soon-to-be sister-in-law. How many goats do you bring home?",
        number: 1,
        answers: [
            { text: "No goats", scores: { chill: 5, cozy: 3 }, nextQuestionIndex: 1},
            { text: "1-5 goats", scores: { cozy: 5, adventurous: 3 }, nextQuestionIndex: 2 },
            { text: "5-10 goats", scores: { adventurous: 5, chaotic: 3 }, nextQuestionIndex: 3 },
            { text: "More than 10 goats", scores: { chaotic: 5, adventurous: 3 }, nextQuestionIndex: 4 }
        ]
    },
    {
        text: "No goats this time I see. Moving on, you are now a Gentoo penguin kicking it on the Antarctic peninsula with all your penguin pals. You recently got invited to your boy Humboldt's wedding IN SOUTH AFRICA. Quite the commute! To make matters worse, its BLACK TIE. You have to choose an outfit, and it has to travel well. What outfit do you choose?",
        number: 2,
        answers: [
            { text: "Rent a tux when I get there", scores: { chill: 5, cozy: 1 }, nextQuestionIndex: 5 },
            { text: "My favorite tailored black suit (it steams out well)", scores: { chill: 2, cozy:5, adventurous: 2 }, nextQuestionIndex: 6 },
            { text: "Buy a tux, you're entering wedding season so its an investment", scores: { chill: 1, cozy: 2, adventurous: 5 }, nextQuestionIndex: 7 },
            { text: "No clothes needed (you were born in a tux!)", scores: { adventurous: 2, chaotic: 5 }, nextQuestionIndex: 8 }
        ]
    },
    {
        text: "Just a few goats sounds good for now. Moving on, you are now a Gentoo penguin kicking it on the Antarctic peninsula with all your penguin pals. You recently got invited to your boy Humboldt's wedding IN SOUTH AFRICA. Quite the commute! To make matters worse, its BLACK TIE. You have to choose an outfit, and it has to travel well. What outfit do you choose?",
        number: 2,
        answers: [
            { text: "Rent a tux when I get there", scores: { chill: 5, cozy: 1 }, nextQuestionIndex: 5 },
            { text: "My favorite tailored black suit (it steams out well)", scores: { chill: 2, cozy:5, adventurous: 2 }, nextQuestionIndex: 6 },
            { text: "Buy a tux, you're entering wedding season so its an investment", scores: { chill: 1, cozy: 2, adventurous: 5 }, nextQuestionIndex: 7 },
            { text: "No clothes needed (you were born in a tux!)", scores: { adventurous: 2, chaotic: 5 }, nextQuestionIndex: 8 }
        ]
    },
    {
        text: "Quite a few goats! Moving on, you are now a Gentoo penguin kicking it on the Antarctic peninsula with all your penguin pals. You recently got invited to your boy Humboldt's wedding IN SOUTH AFRICA. Quite the commute! To make matters worse, its BLACK TIE. You have to choose an outfit, and it has to travel well. What outfit do you choose?",
        number: 2,
        answers: [
            { text: "Rent a tux when I get there", scores: { chill: 5, cozy: 1 }, nextQuestionIndex: 5 },
            { text: "My favorite tailored black suit (it steams out well)", scores: { chill: 2, cozy:5, adventurous: 2 }, nextQuestionIndex: 6 },
            { text: "Buy a tux, you're entering wedding season so its an investment", scores: { chill: 1, cozy: 2, adventurous: 5 }, nextQuestionIndex: 7 },
            { text: "No clothes needed (you were born in a tux!)", scores: { adventurous: 2, chaotic: 5 }, nextQuestionIndex: 8 }
        ]
    },
    {
        text: "SO MANY GOATS! Moving on, you are now a Gentoo penguin kicking it on the Antarctic peninsula with all your penguin pals. You recently got invited to your boy Humboldt's wedding IN SOUTH AFRICA. Quite the commute! To make matters worse, its BLACK TIE. You have to choose an outfit, and it has to travel well. What outfit do you choose?",
        number: 2,
        answers: [
            { text: "Rent a tux when I get there", scores: { chill: 5, cozy: 1 }, nextQuestionIndex: 5 },
            { text: "My favorite tailored black suit (it steams out well)", scores: { chill: 2, cozy:5, adventurous: 2 }, nextQuestionIndex: 6 },
            { text: "Buy a tux, you're entering wedding season so its an investment", scores: { chill: 1, cozy: 2, adventurous: 5 }, nextQuestionIndex: 7 },
            { text: "No clothes needed (you were born in a tux!)", scores: { adventurous: 2, chaotic: 5 }, nextQuestionIndex: 8 }
        ]
    },
    {
        text: "An excellent no-fuss option. <p></p>",
        number: 3,
        answers: [
            { text: "Baking Cookies", scores: { cozy: 5, chill: 2 } },
            { text: "Cozy Café", scores: { cozy: 3, adventurous: 2 } }
        ]
    },
    {
        text: "Cafe",
        number: 3,
        answers: [
            { text: "Baking Cookies", scores: { cozy: 5, chill: 2 } },
            { text: "Cozy Café", scores: { cozy: 3, adventurous: 2 } }
        ]
    },
    {
        text: "Cookies",
        number: 3,
        answers: [
            { text: "Baking Cookies", scores: { cozy: 5, chill: 2 } },
            { text: "Cozy Café", scores: { cozy: 3, adventurous: 2 } }
        ]
    },
    {
        text: "Cafe",
        number: 3,
        answers: [
            { text: "Baking Cookies", scores: { cozy: 5, chill: 2 } },
            { text: "Cozy Café", scores: { cozy: 3, adventurous: 2 } }
        ]
    },
    // Add more questions here following the same structure
];

let currentQuestionIndex = 0;

function restartGame() {
    scores = {
        chill: 0,
        cozy: 0,
        adventurous: 0,
        chaotic: 0
    };
    history = [];
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    let gameText = document.getElementById('game-description');
    let questionText = document.getElementById('question-text');
    let choices = document.getElementById('choices');
    let scoresDiv = document.getElementById('scores');

    let currentQuestion = questions[currentQuestionIndex];
    gameText.innerHTML = currentQuestion.text;
    questionText.innerHTML = `Question ${currentQuestion.number}`;
    choices.innerHTML = currentQuestion.answers.map((answer, index) =>
        `<button onclick="chooseAnswer(${index})">${answer.text}</button>`
    ).join('');
    updateScores();
    // Add the Back button if not on the first question
    if (currentQuestionIndex > 0) {
        scoresDiv.innerHTML += `<button onclick="goBack()">Back</button>`;
    }
}

function chooseAnswer(answerIndex) {
    let selectedAnswer = questions[currentQuestionIndex].answers[answerIndex];
    // Save the current state to the history stack
    history.push({
        index: currentQuestionIndex,
        scores: { ...scores },
        answerIndex: answerIndex
    });

    // Update scores
    for (let category in selectedAnswer.scores) {
        scores[category] += selectedAnswer.scores[category];
    }

    // Move to next question
    currentQuestionIndex = selectedAnswer.nextQuestionIndex;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function goBack() {
    if (history.length > 0) {
        // Restore the previous state from the history stack
        let previousState = history.pop();
        currentQuestionIndex = previousState.index;
        scores = previousState.scores;
        showQuestion();
    }
}

function updateScores() {
    document.getElementById('scores').innerHTML = `
        <p>Chill: ${scores.chill} | Cozy: ${scores.cozy} | Adventurous: ${scores.adventurous} | Chaotic: ${scores.chaotic}</p>
    `;
}

function showResult() {
    let gameText = document.getElementById('game-description');
    let maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    let resultText;
    switch(maxCategory) {
        case 'chill':
            resultText = "Your ideal date is a peaceful day at a quiet park!";
            break;
        case 'cozy':
            resultText = "Your ideal date is a cozy evening baking cookies at home!";
            break;
        case 'adventurous':
            resultText = "Your ideal date is an exciting hiking trip!";
            break;
        case 'chaotic':
            resultText = "Your ideal date is a wild adventure at an amusement park!";
            break;
        default:
            resultText = "Explore different activities to find your ideal date!";
    }

    gameText.innerHTML = resultText;
    document.getElementById('choices').innerHTML = ''; // Remove choices after showing the result
}

// Initial setup
showQuestion();
