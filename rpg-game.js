// Initialize scores for each category
let scores = {
    chill: 0,
    cozy: 0,
    adventurous: 0,
    chaotic: 0
};

// History stack to keep track of previous states
let history = [];

// Save original content to restore later
let originalContent = {
    scores: '',
    restart: '',
    dateListLink: ''
};
// Array of questions and answers
const questions = [
    {
        text: "You are a game show contestant on everyone's favorite show 'So you think you were a math nerd in high school'. Before you are three doors. Behind two doors are goats. Behind the third door are more goats. We're talking TONS of goats. And you can keep as many as you want! All remaining goats will live the rest of their happy lives lovingly cared for by my soon-to-be sister-in-law. How many goats do you bring home?",
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
        text: "An excellent no-fuss option. <p>You know podcasts. Everyone knows podcasts, but you're a podcast connoisseur. You find the diamonds in the ruff, sifting through hours and hours of audio content to find sweet diamond nuggets of glory, and you've been doing this for years. You don't hoard these gems to yourself like some parasocial relationship reveling wyvern. You share your finds with your friends, your family and your partner.<\p><p>Its a Saturday when your partner texts you. They've found a new podcast they like! And they're asking if you like it! You listen with excitement and your partner goes on to describe a podcast you not only already know about, but that you have actively recommended to them on multiple occasions. Your excitement rapidly wanes. In response you:<\p>",
        number: 3,
        answers: [
            { text: "Say it sounds interesting and let them feel an undeserved sense of satisfaction", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 9 },
            { text: "Say you know about that podcast and recommend a few of your personal favorite episodes", scores: { cozy: 5, chill: 2, adventurous: 1}, nextQuestionIndex : 10 },
            { text: "Remind them that you recommended that podcast to them and recommend a few adjacently related podcasts you suspect they'll enjoy", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 11 },
            {text: "Tell them you recommended that podcast and insist they tap to pay the price of failing to remember. You launch into a weeks long instructional period in which you teach them tap dance. You both quit your jobs and become professional tap dancers.", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 12 }
        ]
    },
    {
        text: "A classic choice. <p>You know podcasts. Everyone knows podcasts, but you're a podcast connoisseur. You find the diamonds in the ruff, sifting through hours and hours of audio content to find sweet diamond nuggets of glory, and you've been doing this for years. You don't hoard these gems to yourself like some parasocial relationship reveling wyvern. You share your finds with your friends, your family and your partner.<\p><p>Its a Saturday when your partner texts you. They've found a new podcast they like! And they're asking if you like it! You listen with excitement and your partner goes on to describe a podcast you not only already know about, but that you have actively recommended to them on multiple occasions. Your excitement rapidly wanes. In response you:<\p>",
        number: 3,
        answers: [
            { text: "Say it sounds interesting and let them feel an undeserved sense of satisfaction", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 9 },
            { text: "Say you know about that podcast and recommend a few of your personal favorite episodes", scores: { cozy: 5, chill: 2, adventurous: 1}, nextQuestionIndex : 10 },
            { text: "Remind them that you recommended that podcast to them and recommend a few adjacently related podcasts you suspect they'll enjoy", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 11 },
            {text: "Tell them you recommended that podcast and insist they tap to pay the price of failing to remember. You launch into a weeks long instructional period in which you teach them tap dance. You both quit your jobs and become professional tap dancers.", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 12 }
        ]
    },
    {
        text: "Practical and stylish! <p>You know podcasts. Everyone knows podcasts, but you're a podcast connoisseur. You find the diamonds in the ruff, sifting through hours and hours of audio content to find sweet diamond nuggets of glory, and you've been doing this for years. You don't hoard these gems to yourself like some parasocial relationship reveling wyvern. You share your finds with your friends, your family and your partner.<\p><p>Its a Saturday when your partner texts you. They've found a new podcast they like! And they're asking if you like it! You listen with excitement and your partner goes on to describe a podcast you not only already know about, but that you have actively recommended to them on multiple occasions. Your excitement rapidly wanes. In response you:<\p>",
        number: 3,
        answers: [
            { text: "Say it sounds interesting and let them feel an undeserved sense of satisfaction", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 9 },
            { text: "Say you know about that podcast and recommend a few of your personal favorite episodes", scores: { cozy: 5, chill: 2, adventurous: 1}, nextQuestionIndex : 10 },
            { text: "Remind them that you recommended that podcast to them and recommend a few adjacently related podcasts you suspect they'll enjoy", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 11 },
            {text: "Tell them you recommended that podcast and insist they tap to pay the price of failing to remember. You launch into a weeks long instructional period in which you teach them tap dance. You both quit your jobs and become professional tap dancers.", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 12 }
        ]
    },
    {
        text: "Who needs clothes when you have confidence? <p>You know podcasts. Everyone knows podcasts, but you're a podcast connoisseur. You find the diamonds in the ruff, sifting through hours and hours of audio content to find sweet diamond nuggets of glory, and you've been doing this for years. You don't hoard these gems to yourself like some parasocial relationship reveling wyvern. You share your finds with your friends, your family and your partner.<\p><p>Its a Saturday when your partner texts you. They've found a new podcast they like! And they're asking if you like it! You listen with excitement and your partner goes on to describe a podcast you not only already know about, but that you have actively recommended to them on multiple occasions. Your excitement rapidly wanes. In response you:<\p>",
        number: 3,
        answers: [
            { text: "Say it sounds interesting and let them feel an undeserved sense of satisfaction", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 9 },
            { text: "Say you know about that podcast and recommend a few of your personal favorite episodes", scores: { cozy: 5, chill: 2, adventurous: 1}, nextQuestionIndex : 10 },
            { text: "Remind them that you recommended that podcast to them and recommend a few adjacently related podcasts you suspect they'll enjoy", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 11 },
            {text: "Tell them you recommended that podcast and insist they tap to pay the price of failing to remember. You launch into a weeks long instructional period in which you teach them tap dance. You both quit your jobs and become professional tap dancers.", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 12 }
        ]
    },
    {
        text: "That is very kind. <p> You're walking around Central Park and decide to stop by the sea lion exhibit. You rest your hands on the hand rail of the fence standing between you and your loving sea lion friends, wishing you could break down the barriers that stand between you. A mysterious figure appears behind you and whispers in your ear, 'I can make you a sea lion.'<\p> <p>You turn around to see a wizard in a trench coat. You ask the wizard what he means and he explains that he can turn you into a sea lion for 24 hours. You will be able to swim and play with the other sea lions. You will be able to return to your human form at any time by saying the word 'mango' (the only english word known to be regularly spoken by sea lions). But he wants something in return.<\p> <p>It's not much, just a token really, a trifle. What he wants from you is a performance of a musical theater number of your choice. On the spot. Right now. You:<\p>",
        number: 4,
        answers: [
            { text: "Sing On My Own (you probably remember it)", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 17 },
            {text: "Sing By the Sea (bad cockney accent and all, very thematically appropriate)", scores: { cozy: 5, chill: 2,}, nextQuestionIndex : 17 },
            {text: "Sing Defying Gravity (anyone can belt if they believe)", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 17 },
            {text: "Sing all parts in Your Fault (wait a minute...)", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 17 },
            {text: "Politely decline", scores: {chill: 0, cozy: 0}, nextQuestionIndex : 'breakup' }
        ]
    },
    {
        text: "What generous recommendations! <p> You're walking around Central Park and decide to stop by the sea lion exhibit. You rest your hands on the hand rail of the fence standing between you and your loving sea lion friends, wishing you could break down the barriers that stand between you. A mysterious figure appears behind you and whispers in your ear, 'I can make you a sea lion.'<\p> <p>You turn around to see a wizard in a trench coat. You ask the wizard what he means and he explains that he can turn you into a sea lion for 24 hours. You will be able to swim and play with the other sea lions. You will be able to return to your human form at any time by saying the word 'mango' (the only english word known to be regularly spoken by sea lions). But he wants something in return.<\p> <p>It's not much, just a token really, a trifle. What he wants from you is a performance of a musical theater number of your choice. On the spot. Right now. You:<\p>",
        number: 4,
        answers: [
            { text: "Sing On My Own (you probably remember it)", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 17 },
            {text: "Sing By the Sea (bad cockney accent and all, very thematically appropriate)", scores: { cozy: 5, chill: 2,}, nextQuestionIndex : 17 },
            {text: "Sing Defying Gravity (anyone can belt if they believe)", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 17 },
            {text: "Sing all parts in Your Fault (wait a minute...)", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 17 },
            {text: "Politely decline", scores: {chill: 0, cozy: 0}, nextQuestionIndex : 'breakup' }
        ]
    },
    {
        text: "What excellent recommendations! <p> You're walking around Central Park and decide to stop by the sea lion exhibit. You rest your hands on the hand rail of the fence standing between you and your loving sea lion friends, wishing you could break down the barriers that stand between you. A mysterious figure appears behind you and whispers in your ear, 'I can make you a sea lion.'<\p> <p>You turn around to see a wizard in a trench coat. You ask the wizard what he means and he explains that he can turn you into a sea lion for 24 hours. You will be able to swim and play with the other sea lions. You will be able to return to your human form at any time by saying the word 'mango' (the only english word known to be regularly spoken by sea lions). But he wants something in return.<\p> <p>It's not much, just a token really, a trifle. What he wants from you is a performance of a musical theater number of your choice. On the spot. Right now. You:<\p>",
        number: 4,
        answers: [
            { text: "Sing On My Own (you probably remember it)", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 17 },
            {text: "Sing By the Sea (bad cockney accent and all, very thematically appropriate)", scores: { cozy: 5, chill: 2,}, nextQuestionIndex : 17 },
            {text: "Sing Defying Gravity (anyone can belt if they believe)", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 17 },
            {text: "Sing all parts in Your Fault (wait a minute...)", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 17 },
            {text: "Politely decline", scores: {chill: 0, cozy: 0}, nextQuestionIndex : 'breakup' }
        ]
    },
    {
        text: "The tap life is the life for me. <p> You're walking around Central Park and decide to stop by the sea lion exhibit. You rest your hands on the hand rail of the fence standing between you and your loving sea lion friends, wishing you could break down the barriers that stand between you. A mysterious figure appears behind you and whispers in your ear, 'I can make you a sea lion.'<\p> <p>You turn around to see a wizard in a trench coat. You ask the wizard what he means and he explains that he can turn you into a sea lion for 24 hours. You will be able to swim and play with the other sea lions. You will be able to return to your human form at any time by saying the word 'mango' (the only english word known to be regularly spoken by sea lions). But he wants something in return.<\p> <p>It's not much, just a token really, a trifle. What he wants from you is a performance of a musical theater number of your choice. On the spot. Right now. You:<\p>",
        number: 4,
        answers: [
            { text: "Sing On My Own (you probably remember it)", scores: { cozy: 2, chill: 5 }, nextQuestionIndex : 17 },
            {text: "Sing By the Sea (bad cockney accent and all, very thematically appropriate)", scores: { cozy: 5, chill: 2,}, nextQuestionIndex : 17 },
            {text: "Sing Defying Gravity (anyone can belt if they believe)", scores: { adventurous: 5, chaotic: 2 }, nextQuestionIndex : 17 },
            {text: "Sing all parts in Your Fault (wait a minute...)", scores: {chaotic: 5, adventurous: 2}, nextQuestionIndex : 17 },
            {text: "Politely decline", scores: {chill: 0, cozy: 0}, nextQuestionIndex : 'breakup' }
        ]
    },
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
    let backButtonDiv = document.getElementById('back-button');

    let currentQuestion = questions[currentQuestionIndex];
    gameText.innerHTML = currentQuestion.text;
    questionText.innerHTML = `Question ${currentQuestion.number}`;
    choices.innerHTML = currentQuestion.answers.map((answer, index) =>
        `<button onclick="chooseAnswer(${index})">${answer.text}</button>`
    ).join('');
    updateScores();
    // Add the Back button if not on the first question
    if (currentQuestionIndex > 0) {
        backButtonDiv.innerHTML = `<button onclick="goBack()">Back</button>`;
    } else {
        backButtonDiv.innerHTML = '';
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

    // Move to next question or show special result
    if (selectedAnswer.nextQuestionIndex === 'breakup') {
        showBreakup();
    } else {
        currentQuestionIndex = selectedAnswer.nextQuestionIndex;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
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

function showBreakup() {
    let gameText = document.getElementById('game-description');
    let choices = document.getElementById('choices');
    let questionText = document.getElementById('question-text');

    // Save original content
    originalContent.scores = document.getElementById('scores').innerHTML;
    originalContent.restart = document.getElementById('restart').outerHTML;
    originalContent.dateListLink = document.getElementById('date-list-link').outerHTML;

    // Clear the content
    document.getElementById('scores').innerHTML = '';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('date-list-link').style.display = 'none';
    document.getElementById('back-button').innerHTML = '';
    document.getElementById('hl').style.display = 'none';

    questionText.innerHTML = `Goodbye.`;
    gameText.innerHTML = "We are breaking up.";
    choices.innerHTML = `<button onclick="reconsiderChoice()">Reconsider Choice</button>`;
}

function reconsiderChoice() {
    let questionText = document.getElementById('question-text');
    let gameText = document.getElementById('game-description');
    let choices = document.getElementById('choices');

    // Restore the original content
    document.getElementById('scores').innerHTML = originalContent.scores;
    document.getElementById('restart').style.display = 'inline';
    document.getElementById('date-list-link').style.display = 'block';
    document.getElementById('hl').style.display = 'block';

    // Go back to the previous state
    if (history.length > 0) {
        let previousState = history.pop();
        currentQuestionIndex = previousState.index;
        scores = previousState.scores;
        showQuestion();
    } else {
        restartGame();
    }
}

function findMaxCategory(scores) {
    let maxCategories = [];
    let maxScore = -Infinity;

    // Find the maximum score and the categories that have this score
    for (let category in scores) {
        if (scores[category] > maxScore) {
            maxScore = scores[category];
            maxCategories = [category];
        } else if (scores[category] === maxScore) {
            maxCategories.push(category);
        }
    }

    // If there is a tie, we'll just return the first one. 
    return maxCategories[0];
}

function showResult() {
    let gameText = document.getElementById('game-description');
    let choices = document.getElementById('choices');
    let maxCategory = findMaxCategory(scores);

    let resultText;
    let linkHref;
    switch(maxCategory) {
        case 'chill':
            resultText = "Want to go on a chill walk with me?";
            linkHref = 'dates/walk.html';
            break;
        case 'cozy':
            resultText = "Want to take a cooking class with me?";
            linkHref = 'dates/cooking-class.html';
            break;
        case 'adventurous':
            resultText = "Want to walk around Brooklyn on a brewery tour with me?";
            linkHref = 'dates/brewery-tour.html';
            break;
        case 'chaotic':
            resultText = "Want to go to a magic speakeasy with me?";
            linkHref = 'dates/magic-speakeasy.html';
            break;
        default:
            resultText = "Explore different activities to find your ideal date!";
            linkHref = '#'; // Default link in case of an error
    }

    gameText.innerHTML = resultText;
    choices.innerHTML = `<button onclick="window.location.href='${linkHref}'">Learn more here!</button>`; // Add a button with a link to the date page
}


// Initial setup
showQuestion();