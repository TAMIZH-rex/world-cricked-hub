// ================================
// WORLD CRICKET HUB
// Developed by Tamizh 18
// ================================

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light-mode') body.classList.add('light-mode');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode');
    });
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Load Matches
async function loadMatches() {
    const container = document.getElementById("matches-container");
    if (!container) return;
    try {
        const response = await fetch("/api/matches");
        const result = await response.json();
        const matches = result.data || [];
        container.innerHTML = "";
        if (matches.length === 0) {
            container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-info-circle"></i> No cricket matches available right now.</p>';
            return;
        }
        matches.slice(0, 12).forEach(match => {
            const card = document.createElement("div");
            card.className = "match-card";
            card.innerHTML = '<h3><i class="fa-solid fa-cricket-bat-ball"></i> ' + (match.name || "Cricket Match") + '</h3><p><strong><i class="fa-solid fa-trophy"></i> Type:</strong> ' + (match.matchType || "N/A") + '</p><p><strong><i class="fa-solid fa-location-dot"></i> Venue:</strong> ' + (match.venue || "N/A") + '</p><p><strong><i class="fa-solid fa-calendar"></i> Date:</strong> ' + (match.date || "N/A") + '</p><div class="match-status"><i class="fa-solid fa-circle-info"></i> ' + (match.status || "Match details unavailable") + '</div>';
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Match loading error:", error);
        container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Unable to load cricket matches.</p>';
    }
}

// Load Schedule
async function loadSchedule() {
    const container = document.getElementById("schedule-container");
    if (!container) return;
    try {
        const response = await fetch("/api/matches");
        const result = await response.json();
        const matches = result.data || [];
        if (matches.length === 0) {
            container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-calendar-xmark"></i> No upcoming matches...</p>';
            return;
        }
        container.innerHTML = matches.map(match => '<div class="match-card"><h3><i class="fa-solid fa-cricket-bat-ball"></i> ' + (match.name || "Cricket Match") + '</h3><p><strong><i class="fa-solid fa-circle-info"></i> Status:</strong> ' + (match.status || "N/A") + '</p><p><i class="fa-solid fa-calendar"></i> ' + (match.date || "Date not available") + '</p><p><i class="fa-solid fa-location-dot"></i> ' + (match.venue || "Venue not available") + '</p></div>').join("");
    } catch (error) {
        console.error("Schedule error:", error);
        container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Unable to load schedule.</p>';
    }
}

// Load Live Matches
async function loadLiveMatches() {
    const container = document.getElementById("live-container");
    if (!container) return;
    try {
        const response = await fetch("/api/matches");
        const result = await response.json();
        const matches = result.data || [];
        const liveMatches = matches.filter(match => match.status && (match.status.toLowerCase().includes("live") || match.status.toLowerCase().includes("in progress")));
        if (liveMatches.length === 0) {
            container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-satellite-dish"></i> No live matches currently.</p>';
            return;
        }
        container.innerHTML = liveMatches.map(match => '<div class="match-card"><h3><i class="fa-solid fa-cricket-bat-ball"></i> ' + (match.name || "Cricket Match") + '</h3><p><strong><i class="fa-solid fa-circle-info"></i> Status:</strong> ' + (match.status || "N/A") + '</p><p><i class="fa-solid fa-calendar"></i> ' + (match.date || "Date not available") + '</p><p><i class="fa-solid fa-location-dot"></i> ' + (match.venue || "Venue not available") + '</p></div>').join("");
    } catch (error) {
        console.error("Live matches error:", error);
        container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Unable to load live matches.</p>';
    }
}

// Quiz System
const cricketQuizQuestions = [
    { question: "Who is popularly known as King Kohli?", options: ["Virat Kohli", "Rohit Sharma", "MS Dhoni", "Sachin Tendulkar"], answer: 0 },
    { question: "Which country won the 2011 Cricket World Cup?", options: ["Australia", "India", "Sri Lanka", "Pakistan"], answer: 1 },
    { question: "Who scored 100 international centuries?", options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Brian Lara"], answer: 2 },
    { question: "Which format of cricket has 20 overs per team?", options: ["Test", "ODI", "T20", "First Class"], answer: 2 },
    { question: "How many players are there in a cricket team?", options: ["9", "10", "11", "12"], answer: 2 },
    { question: "Which Indian captain led India to victory in the 2011 World Cup?", options: ["Virat Kohli", "MS Dhoni", "Kapil Dev", "Sourav Ganguly"], answer: 1 },
    { question: "What is a score of zero by a batter called?", options: ["Duck", "Dot", "Maiden", "Century"], answer: 0 },
    { question: "Which country won the first Cricket World Cup in 1975?", options: ["India", "Australia", "West Indies", "England"], answer: 2 },
    { question: "Virat Kohli has represented which IPL team?", options: ["Mumbai Indians", "Royal Challengers Bengaluru", "Chennai Super Kings", "Kolkata Knight Riders"], answer: 1 },
    { question: "How many runs for boundary after touching ground?", options: ["2", "4", "5", "6"], answer: 1 },
    { question: "Which cricket format can last up to five days?", options: ["T20", "ODI", "Test Cricket", "The Hundred"], answer: 2 },
    { question: "Who is known as the God of Cricket?", options: ["Virat Kohli", "Sachin Tendulkar", "MS Dhoni", "Kapil Dev"], answer: 1 },
    { question: "Three wickets in three consecutive balls is called?", options: ["Century", "Hat-trick", "Maiden", "Double wicket"], answer: 1 },
    { question: "Who is popularly known as Captain Cool?", options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Rahul Dravid"], answer: 1 },
    { question: "Which trophy is for England vs Australia Test cricket?", options: ["Asia Cup", "Border-Gavaskar Trophy", "The Ashes", "Champions Trophy"], answer: 2 },
    { question: "Most runs in 2023 ODI World Cup?", options: ["Virat Kohli", "Rohit Sharma", "David Warner", "Kane Williamson"], answer: 0 },
    { question: "Virat Kohli ODI debut was against?", options: ["Sri Lanka", "Australia", "England", "Pakistan"], answer: 0 },
    { question: "Most Men's Cricket World Cups won by?", options: ["India", "Australia", "England", "West Indies"], answer: 1 },
    { question: "First T20 World Cup in 2007 won by?", options: ["India", "Pakistan", "Australia", "England"], answer: 0 },
    { question: "Runs for hitting ball over boundary without bounce?", options: ["4", "5", "6", "7"], answer: 2 }
];

let quizCurrentQuestion = 0, quizScore = 0, quizLocked = false;
function showQuiz() { quizCurrentQuestion = 0; quizScore = 0; quizLocked = false; renderQuiz(); }
function renderQuiz() {
    const gameArea = document.getElementById("game-area");
    if (!gameArea) return;
    const quiz = cricketQuizQuestions[quizCurrentQuestion];
    quizLocked = false;
    const progress = (quizCurrentQuestion / cricketQuizQuestions.length) * 100;
    let optionsHTML = "";
    quiz.options.forEach((option, index) => {
        optionsHTML += '<button class="quiz-option" onclick="checkQuizAnswer(' + index + ')"><i class="fa-solid fa-circle"></i> ' + option + '</button>';
    });
    gameArea.innerHTML = '<div class="game-card"><h2><i class="fa-solid fa-brain"></i> Cricket Quiz</h2><div class="progress-bar"><div class="progress-fill" style="width: ' + progress + '%"></div></div><p><i class="fa-solid fa-circle-question"></i> Question ' + (quizCurrentQuestion + 1) + ' of ' + cricketQuizQuestions.length + '</p><p><i class="fa-solid fa-star"></i> Score: ' + quizScore + '</p><h3>' + quiz.question + '</h3>' + optionsHTML + '<p id="quiz-result" class="result-correct"></p><button id="next-quiz-button" class="btn-next" onclick="nextQuizQuestion()" style="display:none;"><i class="fa-solid fa-arrow-right"></i> Next Question</button></div>';
}
function checkQuizAnswer(selectedIndex) {
    if (quizLocked) return;
    quizLocked = true;
    const quiz = cricketQuizQuestions[quizCurrentQuestion];
    const result = document.getElementById("quiz-result");
    const buttons = document.querySelectorAll(".quiz-option");
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === quiz.answer) button.classList.add("correct");
        else if (index === selectedIndex) button.classList.add("wrong");
    });
    if (selectedIndex === quiz.answer) {
        quizScore++;
        result.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correct! Excellent cricket knowledge!";
        result.className = "result-correct";
    } else {
        result.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> Wrong! Correct answer: <strong>" + quiz.options[quiz.answer] + "</strong>";
        result.className = "result-wrong";
    }
    document.getElementById("next-quiz-button").style.display = "inline-flex";
}
function nextQuizQuestion() { quizCurrentQuestion++; if (quizCurrentQuestion < cricketQuizQuestions.length) renderQuiz(); else showQuizFinalResult(); }
function showQuizFinalResult() {
    const gameArea = document.getElementById("game-area");
    const percentage = Math.round((quizScore / cricketQuizQuestions.length) * 100);
    gameArea.innerHTML = '<div class="game-card"><h2><i class="fa-solid fa-trophy"></i> Quiz Completed!</h2><div class="progress-bar"><div class="progress-fill" style="width: ' + percentage + '%"></div></div><h3>Your Score: ' + quizScore + ' / ' + cricketQuizQuestions.length + '</h3><h2><i class="fa-solid fa-percent"></i> ' + percentage + '%</h2><button class="btn-replay" onclick="showQuiz()"><i class="fa-solid fa-rotate-right"></i> Play Quiz Again</button></div>';
}

// Puzzle System
const cricketPuzzleQuestions = [
    { question: "Unscramble this cricket word:", puzzle: "K E C I R C T", answer: "cricket" },
    { question: "Unscramble this Indian cricket superstar:", puzzle: "T A R I V", answer: "virat" },
    { question: "Unscramble this cricket format:", puzzle: "T S E T", answer: "test" },
    { question: "Unscramble this scoring term:", puzzle: "Y R U T N E C", answer: "century" },
    { question: "Unscramble this cricket term:", puzzle: "K C U D", answer: "duck" },
    { question: "Guess King Kohli:", puzzle: "V _ R _ T  K _ H L _", answer: "virat kohli" },
    { question: "Guess Captain Cool:", puzzle: "M _  D H _ N _", answer: "ms dhoni" },
    { question: "Guess the God of Cricket:", puzzle: "S A C H I N", answer: "sachin tendulkar" },
    { question: "Unscramble this famous trophy:", puzzle: "S E H A S", answer: "ashes" },
    { question: "Unscramble this cricket action:", puzzle: "G N I L W O B", answer: "bowling" },
    { question: "Unscramble this cricket action:", puzzle: "G N I T T A B", answer: "batting" },
    { question: "The ball crosses boundary without bouncing?", puzzle: "6 Runs", answer: "six" },
    { question: "A batter scores 100 runs?", puzzle: "100 Runs", answer: "century" },
    { question: "Unscramble this famous tournament:", puzzle: "D L R O W  P U C", answer: "world cup" },
    { question: "Three wickets in three balls?", puzzle: "3 Wickets", answer: "hat trick" }
];

let puzzleCurrentQuestion = 0, puzzleScore = 0, puzzleLocked = false;
function showPuzzle() { puzzleCurrentQuestion = 0; puzzleScore = 0; puzzleLocked = false; renderPuzzle(); }
function renderPuzzle() {
    const gameArea = document.getElementById("game-area");
    if (!gameArea) return;
    const puzzle = cricketPuzzleQuestions[puzzleCurrentQuestion];
    puzzleLocked = false;
    const progress = (puzzleCurrentQuestion / cricketPuzzleQuestions.length) * 100;
    gameArea.innerHTML = '<div class="game-card"><h2><i class="fa-solid fa-puzzle-piece"></i> Cricket Puzzle</h2><div class="progress-bar"><div class="progress-fill" style="width: ' + progress + '%"></div></div><p><i class="fa-solid fa-circle-question"></i> Puzzle ' + (puzzleCurrentQuestion + 1) + ' of ' + cricketPuzzleQuestions.length + '</p><p><i class="fa-solid fa-star"></i> Score: ' + puzzleScore + '</p><h3>' + puzzle.question + '</h3><h2 class="puzzle-text">' + puzzle.puzzle + '</h2><input id="puzzle-answer" type="text" placeholder="Type your answer..."><button id="check-puzzle-button" class="btn-check" onclick="checkPuzzle()"><i class="fa-solid fa-check"></i> Check Answer</button><p id="puzzle-result"></p><button id="next-puzzle-button" class="btn-next" onclick="nextPuzzleQuestion()" style="display:none;"><i class="fa-solid fa-arrow-right"></i> Next Puzzle</button></div>';
}
function checkPuzzle() {
    if (puzzleLocked) return;
    const input = document.getElementById("puzzle-answer");
    const result = document.getElementById("puzzle-result");
    const userAnswer = input.value.trim().toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ");
    const correctAnswer = cricketPuzzleQuestions[puzzleCurrentQuestion].answer.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ");
    if (!userAnswer) { result.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Please type an answer!"; result.className = "result-wrong"; return; }
    puzzleLocked = true;
    input.disabled = true;
    document.getElementById("check-puzzle-button").disabled = true;
    if (userAnswer === correctAnswer) {
        puzzleScore++;
        result.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correct! Excellent!";
        result.className = "result-correct";
    } else {
        result.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> Wrong! Correct answer: <strong>" + cricketPuzzleQuestions[puzzleCurrentQuestion].answer + "</strong>";
        result.className = "result-wrong";
    }
    document.getElementById("next-puzzle-button").style.display = "inline-flex";
}
function nextPuzzleQuestion() { puzzleCurrentQuestion++; if (puzzleCurrentQuestion < cricketPuzzleQuestions.length) renderPuzzle(); else showPuzzleFinalResult(); }
function showPuzzleFinalResult() {
    const gameArea = document.getElementById("game-area");
    const percentage = Math.round((puzzleScore / cricketPuzzleQuestions.length) * 100);
    gameArea.innerHTML = '<div class="game-card"><h2><i class="fa-solid fa-trophy"></i> Puzzle Challenge Completed!</h2><div class="progress-bar"><div class="progress-fill" style="width: ' + percentage + '%"></div></div><h3>Your Score: ' + puzzleScore + ' / ' + cricketPuzzleQuestions.length + '</h3><h2><i class="fa-solid fa-percent"></i> ' + percentage + '%</h2><button class="btn-replay" onclick="showPuzzle()"><i class="fa-solid fa-rotate-right"></i> Play Puzzle Again</button></div>';
}

// Start
loadMatches();
loadSchedule();
loadLiveMatches();