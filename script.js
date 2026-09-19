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

// ========================================
// 🧠 WORLD CRICKET HUB - ADVANCED QUIZ
// ========================================

const cricketQuizBank = [

    {
        question: "Who is popularly known as King Kohli?",
        options: [
            "Virat Kohli",
            "Rohit Sharma",
            "MS Dhoni",
            "Sachin Tendulkar"
        ],
        answer: "Virat Kohli"
    },

    {
        question: "Which country won the 2011 Cricket World Cup?",
        options: [
            "Australia",
            "India",
            "Sri Lanka",
            "Pakistan"
        ],
        answer: "India"
    },

    {
        question: "Who has scored 100 international centuries?",
        options: [
            "Virat Kohli",
            "Ricky Ponting",
            "Sachin Tendulkar",
            "Brian Lara"
        ],
        answer: "Sachin Tendulkar"
    },

    {
        question: "How many overs are played by each team in T20 cricket?",
        options: [
            "10",
            "20",
            "25",
            "50"
        ],
        answer: "20"
    },

    {
        question: "How many players are there in a cricket team?",
        options: [
            "9",
            "10",
            "11",
            "12"
        ],
        answer: "11"
    },

    {
        question: "Who captained India to victory in the 2011 World Cup?",
        options: [
            "Virat Kohli",
            "MS Dhoni",
            "Kapil Dev",
            "Sourav Ganguly"
        ],
        answer: "MS Dhoni"
    },

    {
        question: "What is a score of zero by a batter called?",
        options: [
            "Duck",
            "Dot",
            "Maiden",
            "Golden"
        ],
        answer: "Duck"
    },

    {
        question: "Which country won the first Men's Cricket World Cup in 1975?",
        options: [
            "India",
            "Australia",
            "West Indies",
            "England"
        ],
        answer: "West Indies"
    },

    {
        question: "Which IPL team has Virat Kohli represented throughout his IPL career?",
        options: [
            "Mumbai Indians",
            "Royal Challengers Bengaluru",
            "Chennai Super Kings",
            "Kolkata Knight Riders"
        ],
        answer: "Royal Challengers Bengaluru"
    },

    {
        question: "How many runs are awarded for a boundary when the ball touches the ground before crossing the rope?",
        options: [
            "2",
            "4",
            "5",
            "6"
        ],
        answer: "4"
    },

    {
        question: "Which format can last up to five days?",
        options: [
            "T20",
            "ODI",
            "Test Cricket",
            "The Hundred"
        ],
        answer: "Test Cricket"
    },

    {
        question: "Who is widely known as the 'God of Cricket'?",
        options: [
            "Virat Kohli",
            "Sachin Tendulkar",
            "MS Dhoni",
            "Kapil Dev"
        ],
        answer: "Sachin Tendulkar"
    },

    {
        question: "What is three wickets in three consecutive balls called?",
        options: [
            "Century",
            "Hat-trick",
            "Maiden",
            "Triple wicket"
        ],
        answer: "Hat-trick"
    },

    {
        question: "Who is popularly known as Captain Cool?",
        options: [
            "Virat Kohli",
            "MS Dhoni",
            "Rohit Sharma",
            "Rahul Dravid"
        ],
        answer: "MS Dhoni"
    },

    {
        question: "Which trophy is contested between England and Australia in Test cricket?",
        options: [
            "Asia Cup",
            "Border-Gavaskar Trophy",
            "The Ashes",
            "Champions Trophy"
        ],
        answer: "The Ashes"
    },

    {
        question: "Who scored the most runs in the 2023 ODI World Cup?",
        options: [
            "Virat Kohli",
            "Rohit Sharma",
            "David Warner",
            "Kane Williamson"
        ],
        answer: "Virat Kohli"
    },

    {
        question: "Against which country did Virat Kohli make his ODI debut?",
        options: [
            "Sri Lanka",
            "Australia",
            "England",
            "Pakistan"
        ],
        answer: "Sri Lanka"
    },

    {
        question: "Which country has won the most Men's Cricket World Cups?",
        options: [
            "India",
            "Australia",
            "England",
            "West Indies"
        ],
        answer: "Australia"
    },

    {
        question: "Who won the first Men's T20 World Cup in 2007?",
        options: [
            "India",
            "Pakistan",
            "Australia",
            "England"
        ],
        answer: "India"
    },

    {
        question: "How many runs are awarded when the batter hits the ball over the boundary without bouncing?",
        options: [
            "4",
            "5",
            "6",
            "7"
        ],
        answer: "6"
    },

    {
        question: "What does LBW stand for?",
        options: [
            "Leg Before Wicket",
            "Leg Bat Wicket",
            "Left Ball Wicket",
            "Leg Boundary Wicket"
        ],
        answer: "Leg Before Wicket"
    },

    {
        question: "How many balls are there in a standard over?",
        options: [
            "4",
            "5",
            "6",
            "8"
        ],
        answer: "6"
    },

    {
        question: "Which country hosted the first Cricket World Cup in 1975?",
        options: [
            "India",
            "England",
            "Australia",
            "West Indies"
        ],
        answer: "England"
    },

    {
        question: "Who was the first Indian to score a triple century in Test cricket?",
        options: [
            "Virender Sehwag",
            "Sachin Tendulkar",
            "Rahul Dravid",
            "Sunil Gavaskar"
        ],
        answer: "Virender Sehwag"
    },

    {
        question: "Which team won the 1983 Cricket World Cup?",
        options: [
            "India",
            "West Indies",
            "Australia",
            "England"
        ],
        answer: "India"
    },

    {
        question: "What is a maiden over?",
        options: [
            "An over with no runs conceded",
            "An over with six wickets",
            "An over with six boundaries",
            "An over with a six"
        ],
        answer: "An over with no runs conceded"
    },

    {
        question: "How many runs does a batter get for a six?",
        options: [
            "4",
            "5",
            "6",
            "7"
        ],
        answer: "6"
    },

    {
        question: "Which Indian player is known as the 'Hitman'?",
        options: [
            "Rohit Sharma",
            "Virat Kohli",
            "KL Rahul",
            "Hardik Pandya"
        ],
        answer: "Rohit Sharma"
    },

    {
        question: "Which team won the 2023 ODI World Cup?",
        options: [
            "India",
            "Australia",
            "England",
            "New Zealand"
        ],
        answer: "Australia"
    },

    {
        question: "What is the maximum number of runs that can normally be scored from a boundary without running?",
        options: [
            "4",
            "5",
            "6",
            "8"
        ],
        answer: "6"
    }
];


// ========================================
// 🎮 QUIZ GAME VARIABLES
// ========================================

let quizQuestions = [];
let quizCurrentQuestion = 0;
let quizScore = 0;
let quizStreak = 0;
let quizLocked = false;

let quizTimer = null;
let quizTimeLeft = 10;

let fiftyFiftyUsed = false;
let skipUsed = false;


// ========================================
// 🔀 SHUFFLE FUNCTION
// ========================================

function shuffleQuizArray(array) {

    return [...array].sort(() => Math.random() - 0.5);

}


// ========================================
// ▶️ START QUIZ
// ========================================

function showQuiz() {

    quizQuestions = shuffleQuizArray(cricketQuizBank)
        .slice(0, 20);

    quizCurrentQuestion = 0;
    quizScore = 0;
    quizStreak = 0;

    fiftyFiftyUsed = false;
    skipUsed = false;

    quizLocked = false;

    renderQuiz();

}


// ========================================
// 🧠 RENDER QUESTION
// ========================================

function renderQuiz() {

    const gameArea =
        document.getElementById("game-area");

    if (!gameArea) {

        console.error("game-area not found");
        return;

    }

    clearInterval(quizTimer);

    quizLocked = false;

    const quiz =
        quizQuestions[quizCurrentQuestion];

    const shuffledOptions =
        shuffleQuizArray(quiz.options);

    quiz.currentOptions = shuffledOptions;

    let optionsHTML = "";

    shuffledOptions.forEach((option, index) => {

        optionsHTML += `

            <button
                class="quiz-option"
                onclick="checkQuizAnswer(${index})"
                style="
                    display:block;
                    width:100%;
                    padding:13px;
                    margin:10px 0;
                    border:none;
                    border-radius:10px;
                    cursor:pointer;
                    font-size:16px;
                "
            >
                ${option}
            </button>

        `;

    });


    gameArea.innerHTML = `

        <div class="match-card">

            <h2>🧠 Cricket Quiz</h2>

            <p>
                Question
                ${quizCurrentQuestion + 1}
                / 20
            </p>

            <p>
                ⭐ Score: ${quizScore}
            </p>

            <p>
                🔥 Streak: ${quizStreak}
            </p>

            <p>
                ⏱️ Time:
                <strong id="quiz-timer">
                    10
                </strong>s
            </p>

            <h3>
                ${quiz.question}
            </h3>

            <div id="quiz-options">

                ${optionsHTML}

            </div>


            <div style="margin-top:15px;">

                <button
                    id="fifty-button"
                    onclick="useFiftyFifty()"
                    style="
                        padding:10px 15px;
                        margin:5px;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                    "
                >
                    50/50 🎯
                </button>


                <button
                    id="skip-button"
                    onclick="skipQuizQuestion()"
                    style="
                        padding:10px 15px;
                        margin:5px;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                    "
                >
                    Skip ⏭️
                </button>

            </div>


            <p
                id="quiz-result"
                style="
                    margin-top:20px;
                    font-size:17px;
                "
            ></p>


            <button
                id="next-quiz-button"
                onclick="nextQuizQuestion()"
                style="
                    display:none;
                    margin-top:15px;
                    padding:12px 20px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Next Question ➡️
            </button>

        </div>

    `;


    startQuizTimer();

}


// ========================================
// ⏱️ QUIZ TIMER
// ========================================

function startQuizTimer() {

    quizTimeLeft = 10;

    const timerElement =
        document.getElementById("quiz-timer");

    quizTimer = setInterval(() => {

        quizTimeLeft--;

        if (timerElement) {

            timerElement.textContent =
                quizTimeLeft;

        }


        if (quizTimeLeft <= 0) {

            clearInterval(quizTimer);

            if (!quizLocked) {

                quizLocked = true;

                quizStreak = 0;

                const result =
                    document.getElementById("quiz-result");

                result.innerHTML =
                    "⏰ Time's up!";

                disableQuizButtons();

                document.getElementById(
                    "next-quiz-button"
                ).style.display = "inline-block";

            }

        }

    }, 1000);

}


// ========================================
// ✅ CHECK ANSWER
// ========================================

function checkQuizAnswer(selectedIndex) {

    if (quizLocked) return;

    quizLocked = true;

    clearInterval(quizTimer);

    const quiz =
        quizQuestions[quizCurrentQuestion];

    const selectedAnswer =
        quiz.currentOptions[selectedIndex];

    const buttons =
        document.querySelectorAll(".quiz-option");

    buttons.forEach(button => {

        button.disabled = true;

    });


    if (selectedAnswer === quiz.answer) {

        quizScore += 10;

        quizStreak++;

        document.getElementById(
            "quiz-result"
        ).innerHTML =
            "🎉 Correct! +10 points 🔥";

        buttons[selectedIndex].style.backgroundColor =
            "#4caf50";

    } else {

        quizStreak = 0;

        document.getElementById(
            "quiz-result"
        ).innerHTML =
            `❌ Wrong! Correct answer: <strong>${quiz.answer}</strong>`;

        buttons[selectedIndex].style.backgroundColor =
            "#e53935";


        buttons.forEach((button, index) => {

            if (
                quiz.currentOptions[index] ===
                quiz.answer
            ) {

                button.style.backgroundColor =
                    "#4caf50";

            }

        });

    }


    document.getElementById(
        "next-quiz-button"
    ).style.display = "inline-block";

}


// ========================================
// 🎯 50/50
// ========================================

function useFiftyFifty() {

    if (fiftyFiftyUsed || quizLocked) return;

    fiftyFiftyUsed = true;

    const quiz =
        quizQuestions[quizCurrentQuestion];

    const buttons =
        document.querySelectorAll(".quiz-option");

    let wrongButtons = [];

    buttons.forEach((button, index) => {

        if (
            quiz.currentOptions[index] !==
            quiz.answer
        ) {

            wrongButtons.push(button);

        }

    });


    shuffleQuizArray(wrongButtons)
        .slice(0, 2)
        .forEach(button => {

            button.disabled = true;

            button.style.opacity = "0.35";

        });


    const fiftyButton =
        document.getElementById("fifty-button");

    if (fiftyButton) {

        fiftyButton.disabled = true;
        fiftyButton.textContent =
            "50/50 Used";

    }

}


// ========================================
// ⏭️ SKIP QUESTION
// ========================================

function skipQuizQuestion() {

    if (skipUsed || quizLocked) return;

    skipUsed = true;

    clearInterval(quizTimer);

    quizLocked = true;

    quizStreak = 0;

    const result =
        document.getElementById("quiz-result");

    result.innerHTML =
        "⏭️ Question skipped!";

    disableQuizButtons();

    const skipButton =
        document.getElementById("skip-button");

    if (skipButton) {

        skipButton.disabled = true;
        skipButton.textContent =
            "Skip Used";

    }

    document.getElementById(
        "next-quiz-button"
    ).style.display = "inline-block";

}


// ========================================
// 🔒 DISABLE QUIZ BUTTONS
// ========================================

function disableQuizButtons() {

    const buttons =
        document.querySelectorAll(".quiz-option");

    buttons.forEach(button => {

        button.disabled = true;

    });

}


// ========================================
// ➡️ NEXT QUESTION
// ========================================

function nextQuizQuestion() {

    clearInterval(quizTimer);

    quizCurrentQuestion++;

    if (
        quizCurrentQuestion <
        quizQuestions.length
    ) {

        renderQuiz();

    } else {

        showQuizFinalResult();

    }

}


// ========================================
// 🏆 FINAL RESULT
// ========================================

function showQuizFinalResult() {

    clearInterval(quizTimer);

    const gameArea =
        document.getElementById("game-area");

    const totalQuestions =
        quizQuestions.length;

    const percentage =
        Math.round(
            (quizScore / (totalQuestions * 10)) * 100
        );


    const oldBestScore =
        Number(
            localStorage.getItem(
                "worldCricketHubBestQuizScore"
            )
        ) || 0;


    if (quizScore > oldBestScore) {

        localStorage.setItem(
            "worldCricketHubBestQuizScore",
            quizScore
        );

    }


    const bestScore =
        Math.max(
            quizScore,
            oldBestScore
        );


    gameArea.innerHTML = `

        <div class="match-card">

            <h2>🏆 Quiz Completed!</h2>

            <h3>
                Your Score:
                ${quizScore} / ${totalQuestions * 10}
            </h3>

            <h2>
                ${percentage}%
            </h2>

            <p>
                🔥 Final Streak:
                ${quizStreak}
            </p>

            <p>
                🥇 Best Score:
                ${bestScore}
            </p>

            <button
                onclick="showQuiz()"
                style="
                    padding:12px 20px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                    font-size:16px;
                "
            >
                🔄 Play Quiz Again
            </button>

        </div>

    `;

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

// ========================================
// 🏏 LAST OVER CHALLENGE
// ========================================

const lbcConfig = {
    easy:   { target: 8,  wickets: 3 },
    medium: { target: 12, wickets: 2 },
    hard:   { target: 16, wickets: 1 }
};

const lbcOutcomes = {
    easy: {
        defend:  { runs: [[0, 60], [1, 100]], wicket: 0 },
        normal:  { runs: [[0, 30], [1, 55], [2, 75], [4, 90], [6, 100]], wicket: 5 },
        power:   { runs: [[0, 20], [1, 35], [2, 50], [4, 75], [6, 100]], wicket: 15 }
    },
    medium: {
        defend:  { runs: [[0, 55], [1, 100]], wicket: 5 },
        normal:  { runs: [[0, 25], [1, 50], [2, 70], [4, 88], [6, 100]], wicket: 10 },
        power:   { runs: [[0, 20], [1, 35], [2, 50], [4, 73], [6, 100]], wicket: 25 }
    },
    hard: {
        defend:  { runs: [[0, 50], [1, 100]], wicket: 10 },
        normal:  { runs: [[0, 20], [1, 45], [2, 65], [4, 85], [6, 100]], wicket: 18 },
        power:   { runs: [[0, 18], [1, 32], [2, 47], [4, 70], [6, 100]], wicket: 32 }
    }
};

let lbcState = {
    difficulty: null,
    target: 0,
    score: 0,
    ballsLeft: 6,
    wicketsLeft: 0,
    ballHistory: [],
    gameOver: false
};

function lbcGetRandomOutcome(shotType) {
    const diff = lbcState.difficulty;
    const outcome = lbcOutcomes[diff][shotType];
    const roll = Math.random() * 100;
    if (roll < outcome.wicket) return "W";
    for (const [runs, threshold] of outcome.runs) {
        if (roll < threshold) return runs;
    }
    return 0;
}

function lbcGetBestScore() {
    return Number(localStorage.getItem("worldCricketHubLastOverBest")) || 0;
}

function lbcSaveBest(score) {
    const best = lbcGetBestScore();
    if (score > best) {
        localStorage.setItem("worldCricketHubLastOverBest", score);
        return true;
    }
    return false;
}

function lbcSelectDifficulty(diff) {
    const config = lbcConfig[diff];
    lbcState.difficulty = diff;
    lbcState.target = config.target;
    lbcState.score = 0;
    lbcState.ballsLeft = 6;
    lbcState.wicketsLeft = config.wickets;
    lbcState.ballHistory = [];
    lbcState.gameOver = false;

    document.getElementById("lbc-difficulty-select").style.display = "none";
    document.getElementById("lbc-result-area").style.display = "none";
    document.getElementById("lbc-game-area").style.display = "block";

    lbcUpdateScoreboard();
    lbcUpdateProgress();
    document.getElementById("lbc-message").textContent = "Choose your shot for ball 1!";
    document.getElementById("lbc-message").style.color = "#e0e7ff";
    lbcEnableButtons(true);
}

function lbcUpdateScoreboard() {
    document.getElementById("lbc-target").textContent = lbcState.target;
    document.getElementById("lbc-score").textContent = lbcState.score;
    document.getElementById("lbc-needed").textContent = Math.max(0, lbcState.target - lbcState.score);
    document.getElementById("lbc-balls").textContent = lbcState.ballsLeft;
    document.getElementById("lbc-wickets").textContent = lbcState.wicketsLeft;
}

function lbcUpdateProgress() {
    const container = document.getElementById("lbc-over-progress");
    container.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement("div");
        dot.className = "lbc-ball-dot";
        if (i < lbcState.ballHistory.length) {
            const result = lbcState.ballHistory[i];
            dot.classList.add("lbc-dot-done");
            if (result === "W") { dot.classList.add("lbc-dot-wicket"); dot.textContent = "W"; }
            else if (result === 0) { dot.classList.add("lbc-dot-dot"); dot.textContent = "•"; }
            else { dot.classList.add("lbc-dot-" + result); dot.textContent = result; }
        } else if (i === lbcState.ballHistory.length) {
            dot.style.borderColor = "#818cf8";
            dot.style.boxShadow = "0 0 10px rgba(129,140,248,0.4)";
            dot.textContent = (i + 1);
        } else {
            dot.textContent = (i + 1);
        }
        container.appendChild(dot);
    }
}

function lbcEnableButtons(enabled) {
    document.querySelectorAll(".lbc-shot-btn").forEach(function(btn) {
        btn.disabled = !enabled;
    });
}

function lbcPlayShot(shotType) {
    if (lbcState.gameOver) return;

    lbcEnableButtons(false);
    const result = lbcGetRandomOutcome(shotType);
    lbcState.ballHistory.push(result);
    lbcState.ballsLeft--;

    const ballNum = lbcState.ballHistory.length;
    let message = "";

    if (result === "W") {
        lbcState.wicketsLeft--;
        message = "🔴 WICKET! You're out!";
    } else if (result === 0) {
        message = "⬜ Dot ball. No run scored.";
    } else if (result === 4) {
        message = "🟢 FOUR! Great boundary!";
    } else if (result === 6) {
        message = "🟣 SIX! Massive hit!";
    } else {
        message = "🔵 " + result + " run" + (result > 1 ? "s" : "") + " taken.";
    }

    lbcState.score += (result === "W" ? 0 : result);
    lbcUpdateScoreboard();
    lbcUpdateProgress();

    document.getElementById("lbc-message").textContent = message;

    const won = lbcState.score >= lbcState.target;
    const allOut = lbcState.wicketsLeft <= 0;
    const noBallsLeft = lbcState.ballsLeft <= 0;

    if (won) {
        setTimeout(function() { lbcShowResult("win"); }, 800);
        return;
    }
    if (allOut || noBallsLeft) {
        setTimeout(function() {
            if (lbcState.score === lbcState.target) lbcShowResult("tie");
            else lbcShowResult("lose");
        }, 800);
        return;
    }

    setTimeout(function() {
        const nextBall = 7 - lbcState.ballsLeft;
        document.getElementById("lbc-message").textContent =
            "Choose your shot for ball " + nextBall + "!";
        lbcEnableButtons(true);
    }, 700);
}

function lbcShowResult(outcome) {
    lbcState.gameOver = true;
    document.getElementById("lbc-game-area").style.display = "none";
    document.getElementById("lbc-result-area").style.display = "block";

    const isNewBest = lbcSaveBest(lbcState.score);

    const icon = document.getElementById("lbc-result-icon");
    const title = document.getElementById("lbc-result-title");
    const subtitle = document.getElementById("lbc-result-subtitle");
    const card = document.querySelector(".lbc-result-card");

    card.classList.remove("lbc-win-glow", "lbc-lose-shake");

    if (outcome === "win") {
        icon.textContent = "🏆";
        title.textContent = "YOU WIN!";
        subtitle.textContent = "Chased the target with " + lbcState.ballsLeft + " ball" + (lbcState.ballsLeft !== 1 ? "s" : "") + " remaining!";
        card.classList.add("lbc-win-glow");
    } else if (outcome === "tie") {
        icon.textContent = "🤝";
        title.textContent = "IT'S A TIE!";
        subtitle.textContent = "What a match! You matched the target exactly.";
    } else {
        icon.textContent = "😢";
        title.textContent = "YOU LOSE!";
        subtitle.textContent = "Needed " + (lbcState.target - lbcState.score) + " more run" + ((lbcState.target - lbcState.score) !== 1 ? "s" : "") + " to win.";
        card.classList.add("lbc-lose-shake");
    }

    document.getElementById("lbc-final-score").textContent = lbcState.score;
    document.getElementById("lbc-final-target").textContent = lbcState.target;
    document.getElementById("lbc-final-balls").textContent = 6 - lbcState.ballsLeft;

    const bestBanner = document.getElementById("lbc-best-score-banner");
    if (isNewBest) {
        bestBanner.style.display = "block";
        document.getElementById("lbc-best-display").textContent = lbcState.score;
    } else {
        bestBanner.style.display = "none";
    }
}

function lbcPlayAgain() {
    lbcSelectDifficulty(lbcState.difficulty);
}

function lbcNewChallenge() {
    document.getElementById("lbc-game-area").style.display = "none";
    document.getElementById("lbc-result-area").style.display = "none";
    document.getElementById("lbc-difficulty-select").style.display = "grid";
}

// ========================================
// ⏰ CRICKET TIME MACHINE
// ========================================

const ctmMoments = [
    {
        id: 1, year: 1877, era: "early",
        title: "The First Ever Test Match",
        subtitle: "Australia vs England — Melbourne Cricket Ground",
        team1: "Australia", team2: "England",
        venue: "Melbourne Cricket Ground, Australia",
        result: "Australia won by 45 runs",
        matchType: "Test",
        players: "Charles Bannerman (scorer of the first Test century, 165), Dave Gregory (Australia captain), James Lillywhite (England captain)",
        details: "The very first official Test match in cricket history was played from March 15 to March 19, 1877. Australia batted first and scored 244, with Charles Bannerman making 165 — the first-ever Test century. England were bowled out for 196 and 108. Australia won by 45 runs.",
        facts: [
            "Charles Bannerman scored 165, the first Test century ever. He retired hurt during the innings.",
            "The match was not originally planned as a 'Test match' — the term was added later.",
            "Only 4,000 spectators attended Day 1. Admission was free.",
            "Australia's Tom Kendell took 7 wickets in England's second innings."
        ]
    },
    {
        id: 2, year: 1882, era: "early",
        title: "The Birth of The Ashes",
        subtitle: "England vs Australia — The Oval, London",
        team1: "Australia", team2: "England",
        venue: "The Oval, London, England",
        result: "Australia won by 7 runs",
        matchType: "Test",
        players: "Fred Spofforth (Australia), W.G. Grace (England), Alec Hood",
        details: "After Australia defeated England at The Oval, a satirical obituary appeared in The Sporting Times stating that English cricket had died and 'the body will be cremated and the ashes taken to Australia'. Thus, The Ashes were born — cricket's most famous rivalry.",
        facts: [
            "Fred Spofforth took 7/44 in the second innings, refusing to be 'bowled out' despite being ill.",
            "The obituary was written by Reginald Brooks, a journalist at The Sporting Times.",
            "The actual ashes are held in a small urn at the MCC Museum at Lord's.",
            "Australia retained the Ashes for the first time with this victory."
        ]
    },
    {
        id: 3, year: 1930, era: "early",
        title: "Bradman's 334 at Headingley",
        subtitle: "Don Bradman's record-breaking innings",
        team1: "Australia", team2: "England",
        venue: "Headingley, Leeds, England",
        result: "Australia won by an innings and 39 runs",
        matchType: "Test",
        players: "Don Bradman (334), Bill Ponsford, Harold Larwood",
        details: "Don Bradman smashed 334 runs in the first innings, breaking the Test record of 325 held by W.G. Grace. Bradman's innings included 46 fours. He was eventually out for 334, 6 runs short of the then-first-class record of 340.",
        facts: [
            "Bradman scored 309 runs on the first day alone — a single-day record that stood for decades.",
            "He hit 46 fours in his innings, batting for over 6 hours.",
            "Harold Larwood bowled 21 overs for just 42 runs in a tireless effort.",
            "Bradman's Test average at the end of this match was 131.00."
        ]
    },
    {
        id: 4, year: 1948, era: "early",
        title: "The Invincibles Tour",
        subtitle: "Australia's unbeaten tour of England",
        team1: "Australia", team2: "England + Counties",
        venue: "England (Nationwide)",
        result: "Australia unbeaten — 25 matches, 0 losses",
        matchType: "Tour",
        players: "Don Bradman (captain), Keith Miller, Ray Lindwall, Bill Brown, Arthur Morris",
        details: "The 1948 Australian team, led by Don Bradman, toured England and went unbeaten across all 34 matches (5 Tests, 25 tour matches, 4 other). They won 25 matches and drew 9. They remain the only Australian team to complete an unbeaten tour of England.",
        facts: [
            "Bradman scored 2,476 runs on the tour at an average of 89.09.",
            "Keith Miller scored 2,055 runs and took 54 wickets on the tour.",
            "Ray Lindwall was the fastest bowler of his generation, regularly clocking 90 mph+.",
            "Bradman's farewell Test innings at The Oval: he was out for a duck (0), missing by one run the average of 100 he needed."
        ]
    },
    {
        id: 5, year: 1952, era: "golden",
        title: "Hundum's 336* — First Indian Triple Century",
        subtitle: "Datta Khamkaranbhai Phadke's record broken",
        team1: "India", team2: "Pakistan",
        venue: "Holkar Stadium, Indore, India",
        result: "Match drawn",
        matchType: "Test",
        players: "Vijay Hazare (India)",
        details: "Vijay Hazare became the first Indian to score a triple century in first-class cricket with 316 against Holkar in the Ranji Trophy. However, the first triple century in Test cricket by an Indian came much later. This moment marks India's rise as a batting powerhouse.",
        facts: [
            "Hazare scored 316 against Holkar in the Ranji Trophy final.",
            "India gained Test status in 1932 but won their first Test match only in 1952 (vs England at Madras).",
            "Vijay Hazare was the first Indian to score a century in both innings of a Test match.",
            "India's first Test victory came against England at Madras in February 1952."
        ]
    },
    {
        id: 6, year: 1960, era: "golden",
        title: "First Tie in Test Cricket History",
        subtitle: "Australia vs West Indies — Brisbane",
        team1: "Australia", team2: "West Indies",
        venue: "The Gabba, Brisbane, Australia",
        result: "Match TIED — the only tie in Test history for decades",
        matchType: "Test",
        players: "Gary Sobers (West Indies), Bobby Simpson (Australia), Wes Hall, Charlie Griffith",
        details: "In one of the most dramatic finishes in cricket history, the first-ever tied Test match occurred. West Indies needed 6 runs off the last ball — Joe Solomon ran out Ian Meckiff at the striker's end. The scores were level — Australia 232 and 284, West Indies 453 and 260.",
        facts: [
            "This was the first tied Test in the history of cricket — only the second occurred in 1986.",
            "Wes Hall bowled the final over with extreme pace and hostility.",
            "Gary Sobers was the West Indies captain and scored 70 in the second innings.",
            "Joe Solomon's direct hit run-out sealed the historic tie."
        ]
    },
    {
        id: 7, year: 1971, era: "golden",
        title: "Birth of One Day International Cricket",
        subtitle: "First ever ODI — Australia vs England at Melbourne",
        team1: "Australia", team2: "England",
        venue: "Melbourne Cricket Ground, Australia",
        result: "Australia won by 5 wickets",
        matchType: "ODI",
        players: "Gilchrist (Australia, first ODI fifty), Keith Stackpole, John Edrich",
        details: "The first ever One Day International was played on January 5, 1971, as a replacement for a rain-affected Test match. Each team played 8 overs per innings. England scored 65/8 and Australia chased it down with 6 wickets in hand.",
        facts: [
            "The match was only 8 overs per side — the first ever limited-overs international.",
            "England's score of 65/8 is the lowest completed innings in ODI history.",
            "Australia reached the target with 2 overs to spare.",
            "ODIs evolved from this experiment into a 50-over format by 1975."
        ]
    },
    {
        id: 8, year: 1975, era: "golden",
        title: "First Cricket World Cup",
        subtitle: "West Indies crowned champions at Lord's",
        team1: "West Indies", team2: "Australia",
        venue: "Lord's Cricket Ground, London",
        result: "West Indies won by 17 runs",
        matchType: "World Cup",
        players: "Clive Lloyd (captain, 102 in final), Viv Richards, Andy Roberts, Dennis Lillee",
        details: "The first Cricket World Cup was held in England across 15 days. The West Indies, led by Clive Lloyd's magnificent 102 in the final, defeated Australia by 17 runs. Viv Richards was named Player of the Tournament.",
        facts: [
            "Clive Lloyd scored the first-ever World Cup century in the final — 102 off 85 balls.",
            "Viv Richards took the most catches in the tournament (7) and was Player of the Tournament.",
            "The West Indies won all 5 matches they played in the tournament.",
            "Only 8 teams participated — England, Australia, West Indies, India, Pakistan, Sri Lanka, East Africa, and New Zealand."
        ]
    },
    {
        id: 9, year: 1983, era: "modern",
        title: "India Wins First World Cup",
        subtitle: "Kapil Dev lifts the trophy at Lord's",
        team1: "India", team2: "West Indies",
        venue: "Lord's Cricket Ground, London",
        result: "India won by 43 runs",
        matchType: "World Cup",
        players: "Kapil Dev (captain), Mohinder Amarnath (Man of the Match), Yashpal Sharma, Roger Binny",
        details: "India stunned the cricket world by defeating the two-time defending champions West Indies in the final. India scored 183, which looked below par, but the bowling attack led by Madan Lal and Mohinder Amarnath dismissed West Indies for just 140.",
        facts: [
            "India were 17/5 in the group stage against Zimbabwe when Kapil Dev scored 175 not out.",
            "Kapil Dev's 175* against Zimbabwe is considered one of the greatest ODI innings ever.",
            "West Indies had won the 1975 and 1979 World Cups — aiming for a hat-trick.",
            "India's victory sparked a cricket revolution in the country, leading to the IPL era."
        ]
    },
    {
        id: 10, year: 1996, era: "modern",
        title: "Sachin's Desert Storm at Sharjah",
        subtitle: "Tendulkar's iconic 143 against Australia",
        team1: "India", team2: "Australia",
        venue: "Sharjah Cricket Stadium, UAE",
        result: "India won by 6 wickets (chasing 276)",
        matchType: "ODI (Sharjah Cup)",
        players: "Sachin Tendulkar (143*, 134), Shane Warne, Mark Taylor",
        details: "In one of the most iconic ODI innings ever played, Sachin Tendulkar smashed 143 not out against Australia in a day-night match at Sharjah. He hit 9 sixes and 9 fours, chasing down 276. The innings is remembered as 'Desert Storm' due to the sandstorm that interrupted play.",
        facts: [
            "Sachin scored 143 off just 131 balls, including 9 sixes and 9 fours.",
            "The sandstorm interrupted play, and Sachin came back even more aggressive.",
            "This was during the Coca-Cola Cup at Sharjah — one of cricket's most glamorous tournaments.",
            "Sachin's aggressive batting against Shane Warne is still considered one of the greatest batting displays."
        ]
    },
    {
        id: 11, year: 1999, era: "modern",
        title: "Lara's 375 — World Record Broken",
        subtitle: "Brian Lara reclaims the world record",
        team1: "West Indies", team2: "England",
        venue: "Antigua Recreation Ground, Antigua",
        result: "West Indies won by an innings and 176 runs",
        matchType: "Test",
        players: "Brian Lara (375), Courtney Walsh, Curtly Ambrose",
        details: "Brian Lara became the highest individual scorer in Test cricket history with 375 against England in Antigua, surpassing Matthew Hayden's 380. Lara batted for 10 hours and 51 minutes, facing 582 balls. The West Indies won by an innings and 176 runs.",
        facts: [
            "Lara batted for 777 minutes — over 12 hours of batting.",
            "He hit 45 fours and 0 sixes in his record-breaking innings.",
            "Lara would later break his own record with 400* against England in 2004.",
            "Courtney Walsh supported Lara with a 29-run partnership for the 10th wicket."
        ]
    },
    {
        id: 12, year: 2002, era: "modern",
        title: "NatWest Series Final — Kaif & Yuvraj's Miracle",
        subtitle: "India chase 326 at Lord's",
        team1: "India", team2: "England",
        venue: "Lord's Cricket Ground, London",
        result: "India won by 2 wickets (DLS method)",
        matchType: "ODI",
        players: "Mohammad Kaif (87*), Yuvraj Singh (69), Virender Sehwag, Sourav Ganguly (captain)",
        details: "Chasing 326 in the final, India were reduced to 146/5 when Yuvraj Singh and Mohammad Kaif launched an incredible comeback. Kaif's unbeaten 87 and Yuvraj's 69 powered India to a famous 2-wicket victory. Sourav Ganguly famously waved his shirt on the Lord's balcony.",
        facts: [
            "India were 146/5 chasing 326 — a near-impossible situation.",
            "Kaif and Yuvraj added 121 runs for the 6th wicket.",
            "Sourav Ganguly's shirt-waving celebration on the Lord's balcony became iconic.",
            "This victory ended England's dominance in home ODIs."
        ]
    },
    {
        id: 13, year: 2005, era: "modern",
        title: "Ashes 2005 — Greatest Series Ever",
        subtitle: "England reclaim The Ashes after 18 years",
        team1: "England", team2: "Australia",
        venue: "Various venues, England",
        result: "England won 2-1 (with 1 draw and 1 tie)",
        matchType: "Test Series",
        players: "Andrew Flintoff, Kevin Pietersen, Shane Warne, Ricky Ponting, Steve Harmison",
        details: "The 2005 Ashes is widely regarded as the greatest Test series ever played. England won 2-1 to reclaim The Ashes after 18 years. The series featured incredible drama, including the famous tied Test at Edgbaston, Flintoff consoling Brett Lee, and Kevin Pietersen's match-winning 158 at The Oval.",
        facts: [
            "The Edgbaston Test was decided by just 2 runs — the closest Ashes Test ever.",
            "Andrew Flintoff consoled a devastated Brett Lee after the Edgbaston Test — a great sportsmanship moment.",
            "Kevin Pietersen scored 158 at The Oval to clinch the Ashes.",
            "Shane Warne took 40 wickets in the series — one of the greatest bowling performances ever."
        ]
    },
    {
        id: 14, year: 2011, era: "t20",
        title: "India Wins World Cup at Home",
        subtitle: "Dhoni's six seals the dream",
        team1: "India", team2: "Sri Lanka",
        venue: "Wankhede Stadium, Mumbai, India",
        result: "India won by 6 wickets",
        matchType: "World Cup",
        players: "MS Dhoni (91*), Gautam Gambhir (97), Yuvraj Singh, Zaheer Khan",
        details: "India won the 2011 Cricket World Cup at home, defeating Sri Lanka in the final at the Wankhede Stadium in Mumbai. MS Dhoni's unbeaten 91, including the iconic winning six, sealed India's second World Cup triumph. Gautam Gambhir's crucial 97 steadied the innings after a top-order collapse.",
        facts: [
            "MS Dhoni hit a towering six over long-on to win the World Cup — one of cricket's most iconic moments.",
            "Gautam Gambhir's 97 off 122 balls was the backbone of India's chase.",
            "Sri Lanka scored 274/6 with Mahela Jayawardene scoring a brilliant 103 not out.",
            "India became the first team to win a World Cup final at home."
        ]
    },
    {
        id: 15, year: 2023, era: "t20",
        title: "India's Dominant 2023 World Cup Run",
        subtitle: "India's unbeaten streak until the final",
        team1: "India", team2: "Australia",
        venue: "Narendra Modi Stadium, Ahmedabad, India",
        result: "Australia won by 6 wickets",
        matchType: "World Cup",
        players: "Virat Kohli (765 runs in tournament), Rohit Sharma, Travis Head, Mohammed Shami",
        details: "India won 10 consecutive matches in the 2023 ODI World Cup, including a group stage victory over Australia by 6 wickets. Virat Kohli scored 765 runs — the most by any batter in a single World Cup edition. However, Australia won the final by 6 wickets, ending India's dream run.",
        facts: [
            "Virat Kohli scored 765 runs in 11 innings, including 3 centuries and 6 fifties.",
            "Kohli equalled Sachin Tendulkar's record of 49 ODI centuries during the tournament.",
            "India won all 10 matches before the final — an unprecedented run in World Cup history.",
            "Travis Head scored 137 in the final to guide Australia to victory."
        ]
    }
];

let ctmCurrentIndex = -1;
let ctmFiltered = [...ctmMoments];

function ctmInit() {
    ctmRenderTimeline(ctmMoments);
}

function ctmFilterEra(era) {
    document.querySelectorAll(".ctm-era-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    if (era === "all") {
        ctmFiltered = [...ctmMoments];
    } else {
        ctmFiltered = ctmMoments.filter(function(m) { return m.era === era; });
    }

    var searchVal = document.getElementById("ctm-search").value.toLowerCase().trim();
    if (searchVal) {
        ctmFiltered = ctmFiltered.filter(function(m) {
            return m.title.toLowerCase().includes(searchVal) ||
                   m.subtitle.toLowerCase().includes(searchVal) ||
                   m.team1.toLowerCase().includes(searchVal) ||
                   m.team2.toLowerCase().includes(searchVal) ||
                   m.players.toLowerCase().includes(searchVal) ||
                   m.venue.toLowerCase().includes(searchVal);
        });
    }

    ctmRenderTimeline(ctmFiltered);
}

function ctmSearchMoments() {
    var searchVal = document.getElementById("ctm-search").value.toLowerCase().trim();
    var activeEraBtn = document.querySelector(".ctm-era-btn.active");
    var currentEra = "all";
    if (activeEraBtn) {
        var eraText = activeEraBtn.textContent.toLowerCase();
        if (eraText.includes("early")) currentEra = "early";
        else if (eraText.includes("golden")) currentEra = "golden";
        else if (eraText.includes("modern")) currentEra = "modern";
        else if (eraText.includes("t20")) currentEra = "t20";
    }

    if (currentEra === "all") {
        ctmFiltered = [...ctmMoments];
    } else {
        ctmFiltered = ctmMoments.filter(function(m) { return m.era === currentEra; });
    }

    if (searchVal) {
        ctmFiltered = ctmFiltered.filter(function(m) {
            return m.title.toLowerCase().includes(searchVal) ||
                   m.subtitle.toLowerCase().includes(searchVal) ||
                   m.team1.toLowerCase().includes(searchVal) ||
                   m.team2.toLowerCase().includes(searchVal) ||
                   m.players.toLowerCase().includes(searchVal) ||
                   m.venue.toLowerCase().includes(searchVal) ||
                   m.year.toString().includes(searchVal);
        });
    }

    ctmRenderTimeline(ctmFiltered);
}

function ctmRenderTimeline(moments) {
    var container = document.getElementById("ctm-timeline");
    if (!container) return;

    if (moments.length === 0) {
        container.innerHTML = '<div class="ctm-no-results"><i class="fa-solid fa-clock-rotate-left"></i><p>No moments found. Try a different search or era filter.</p></div>';
        return;
    }

    var html = "";
    var lastYear = null;

    moments.forEach(function(moment, index) {
        if (moment.year !== lastYear) {
            html += '<div class="ctm-year-marker"><div class="ctm-year-dot"></div><h3>' + moment.year + '</h3></div>';
            lastYear = moment.year;
        }
        html += '<div class="ctm-moment-card" onclick="ctmShowDetail(' + index + ')">';
        html += '<div class="ctm-moment-title">' + moment.title + '</div>';
        html += '<div class="ctm-moment-subtitle">';
        html += '<span class="ctm-moment-tag"><i class="fa-solid fa-tag"></i> ' + moment.matchType + '</span>';
        html += '<span>' + moment.subtitle + '</span>';
        html += '</div>';
        html += '</div>';
    });

    container.innerHTML = html;
}

function ctmShowDetail(index) {
    ctmCurrentIndex = index;
    var moment = ctmFiltered[index];
    if (!moment) return;

    var detail = document.getElementById("ctm-detail");
    var content = document.getElementById("ctm-detail-content");

    var html = "";
    html += '<div class="ctm-detail-year"><i class="fa-solid fa-calendar"></i> ' + moment.year + ' — ' + moment.matchType + '</div>';
    html += '<h2>' + moment.title + '</h2>';
    html += '<div class="ctm-detail-teams">';
    html += '<div class="ctm-detail-team"><h4>' + moment.team1 + '</h4></div>';
    html += '<div class="ctm-detail-vs">VS</div>';
    html += '<div class="ctm-detail-team"><h4>' + moment.team2 + '</h4></div>';
    html += '</div>';
    html += '<div class="ctm-detail-result"><i class="fa-solid fa-trophy"></i> ' + moment.result + '</div>';
    html += '<div class="ctm-detail-section"><h4><i class="fa-solid fa-location-dot"></i> Venue</h4><p>' + moment.venue + '</p></div>';
    html += '<div class="ctm-detail-section"><h4><i class="fa-solid fa-book-open"></i> Match Summary</h4><p>' + moment.details + '</p></div>';
    html += '<div class="ctm-detail-section"><h4><i class="fa-solid fa-users"></i> Key Players</h4><p>' + moment.players + '</p></div>';
    html += '<div class="ctm-detail-section"><h4><i class="fa-solid fa-lightbulb"></i> Interesting Facts</h4><ul class="ctm-detail-facts">';
    moment.facts.forEach(function(fact) {
        html += '<li>' + fact + '</li>';
    });
    html += '</ul></div>';

    content.innerHTML = html;
    detail.style.display = "block";

    document.getElementById("ctm-prev-btn").disabled = (index <= 0);
    document.getElementById("ctm-next-btn").disabled = (index >= ctmFiltered.length - 1);

    detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ctmCloseDetail() {
    document.getElementById("ctm-detail").style.display = "none";
    ctmCurrentIndex = -1;
}

function ctmNavigate(direction) {
    var newIndex = ctmCurrentIndex + direction;
    if (newIndex >= 0 && newIndex < ctmFiltered.length) {
        ctmShowDetail(newIndex);
    }
}

ctmInit();

// ========================================
// 🏏 PLAYER FACE-OFF
// ========================================

var pfoPlayers = [
    { id:1, name:"Sachin Tendulkar", country:"India", role:"Batter", avatar:"#e53935", initials:"ST", batting:{tests:{m:200,r:15921,avg:53.78,sr:56.08,c:51,f:68},odis:{m:463,r:18426,avg:44.83,sr:86.23,c:49,f:96},t20s:{m:1,r:10,avg:10.00,sr:100.00,c:0,f:0}}, bowling:{tests:{w:48,avg:54.17,eco:3.46},odis:{w:154,avg:44.48,eco:5.10}} },
    { id:2, name:"Virat Kohli", country:"India", role:"Batter", avatar:"#1565c0", initials:"VK", batting:{tests:{m:113,r:8848,avg:49.34,sr:57.28,c:29,f:30},odis:{m:292,r:13848,avg:58.18,sr:93.17,c:50,f:72},t20s:{m:120,r:4008,avg:52.05,sr:137.44,c:1,f:37}}, bowling:{tests:{w:0,avg:0,eco:0},odis:{w:4,avg:166.50,eco:6.30}} },
    { id:3, name:"Ricky Ponting", country:"Australia", role:"Batter", avatar:"#f57c00", initials:"RP", batting:{tests:{m:168,r:13378,avg:51.85,sr:58.72,c:41,f:62},odis:{m:375,r:13704,avg:42.03,sr:80.39,c:30,f:82},t20s:{m:17,r:401,avg:28.64,sr:114.88,c:0,f:2}}, bowling:{tests:{w:5,avg:54.00,eco:2.88},odis:{w:3,avg:108.00,eco:5.45}} },
    { id:4, name:"Brian Lara", country:"West Indies", role:"Batter", avatar:"#2e7d32", initials:"BL", batting:{tests:{m:131,r:11953,avg:52.88,sr:60.49,c:34,f:48},odis:{m:299,r:10405,avg:40.48,sr:80.52,c:19,f:63},t20s:{m:0,r:0,avg:0,sr:0,c:0,f:0}}, bowling:{tests:{w:0,avg:0,eco:0},odis:{w:3,avg:150.00,eco:5.35}} },
    { id:5, name:"MS Dhoni", country:"India", role:"Wicketkeeper-Batter", avatar:"#4527a0", initials:"MD", batting:{tests:{m:90,r:4876,avg:38.09,sr:59.11,c:6,f:33},odis:{m:350,r:10773,avg:50.57,sr:86.55,c:10,f:73},t20s:{m:98,r:1617,avg:37.60,sr:126.13,c:2,f:2}}, bowling:{tests:{w:0,avg:0,eco:0},odis:{w:1,avg:174.00,eco:7.18}} },
    { id:6, name:"Kumar Sangakkara", country:"Sri Lanka", role:"Wicketkeeper-Batter", avatar:"#00838f", initials:"KS", batting:{tests:{m:134,r:12400,avg:57.40,sr:54.19,c:38,f:52},odis:{m:404,r:14234,avg:41.98,sr:78.13,c:25,f:93},t20s:{m:56,r:1382,avg:31.41,sr:119.89,c:0,f:8}}, bowling:{tests:{w:0,avg:0,eco:0},odis:{w:0,avg:0,eco:0}} },
    { id:7, name:"Jacques Kallis", country:"South Africa", role:"All-Rounder", avatar:"#f9a825", initials:"JK", batting:{tests:{m:166,r:13289,avg:55.37,sr:45.73,c:45,f:58},odis:{m:328,r:11579,avg:44.36,sr:72.89,c:17,f:86},t20s:{m:25,r:666,avg:35.05,sr:119.57,c:0,f:3}}, bowling:{tests:{w:292,avg:32.65,eco:2.72},odis:{w:273,avg:31.79,eco:4.84}} },
    { id:8, name:"Shane Warne", country:"Australia", role:"Bowler", avatar:"#c62828", initials:"SW", batting:{tests:{m:145,r:3154,avg:17.32,sr:57.43,c:0,f:12},odis:{m:194,r:1018,avg:13.05,sr:74.36,c:0,f:0},t20s:{m:2,r:8,avg:4.00,sr:53.33,c:0,f:0}}, bowling:{tests:{w:708,avg:25.41,eco:2.65},odis:{w:293,avg:25.73,eco:4.25}} },
    { id:9, name:"Wasim Akram", country:"Pakistan", role:"Bowler", avatar:"#ad1457", initials:"WA", batting:{tests:{m:104,r:2898,avg:22.64,sr:55.86,c:3,f:10},odis:{m:356,r:3717,avg:20.53,sr:83.47,c:0,f:12},t20s:{m:0,r:0,avg:0,sr:0,c:0,f:0}}, bowling:{tests:{w:414,avg:23.62,eco:2.75},odis:{w:502,avg:23.52,eco:3.89}} },
    { id:10, name:"AB de Villiers", country:"South Africa", role:"Wicketkeeper-Batter", avatar:"#0277bd", initials:"AB", batting:{tests:{m:114,r:8765,avg:50.66,sr:54.04,c:22,f:46},odis:{m:228,r:9577,avg:53.50,sr:101.09,c:25,f:53},t20s:{m:78,r:1672,avg:34.83,sr:135.09,c:1,f:10}}, bowling:{tests:{w:2,avg:54.00,eco:3.03},odis:{w:7,avg:62.57,eco:5.82}} },
    { id:11, name:"Rohit Sharma", country:"India", role:"Batter", avatar:"#6a1b9a", initials:"RS", batting:{tests:{m:67,r:4835,avg:40.29,sr:59.56,c:12,f:18},odis:{m:264,r:10709,avg:48.89,sr:90.93,c:31,f:48},t20s:{m:148,r:3974,avg:32.05,sr:139.97,c:5,f:27}}, bowling:{tests:{w:2,avg:112.50,eco:3.00},odis:{w:8,avg:71.50,eco:5.49}} },
    { id:12, name:"Don Bradman", country:"Australia", role:"Batter", avatar:"#ff6f00", initials:"DB", batting:{tests:{m:52,r:6996,avg:99.94,sr:39.71,c:29,f:13},odis:{m:0,r:0,avg:0,sr:0,c:0,f:0},t20s:{m:0,r:0,avg:0,sr:0,c:0,f:0}}, bowling:{tests:{w:2,avg:36.00,eco:1.98},odis:{w:0,avg:0,eco:0}} },
    { id:13, name:"Rahul Dravid", country:"India", role:"Batter", avatar:"#37474f", initials:"RD", batting:{tests:{m:164,r:13288,avg:52.31,sr:42.51,c:36,f:63},odis:{m:344,r:10889,avg:39.07,sr:71.24,c:12,f:83},t20s:{m:1,r:31,avg:31.00,sr:110.71,c:0,f:0}}, bowling:{tests:{w:1,avg:231.00,eco:3.28},odis:{w:4,avg:138.50,eco:5.70}} },
    { id:14, name:"Muttiah Muralitharan", country:"Sri Lanka", role:"Bowler", avatar:"#1b5e20", initials:"MM", batting:{tests:{m:133,r:1261,avg:11.67,sr:53.53,c:0,f:1},odis:{m:350,r:674,avg:6.81,sr:72.64,c:0,f:0},t20s:{m:12,r:31,avg:7.75,sr:65.96,c:0,f:0}}, bowling:{tests:{w:800,avg:22.72,eco:2.47},odis:{w:534,avg:23.08,eco:3.93}} },
    { id:15, name:"Glenn McGrath", country:"Australia", role:"Bowler", avatar:"#4a148c", initials:"GM", batting:{tests:{m:124,r:641,avg:7.49,sr:33.91,c:0,f:0},odis:{m:250,r:310,avg:9.39,sr:62.00,c:0,f:0},t20s:{m:2,r:3,avg:1.50,sr:30.00,c:0,f:0}}, bowling:{tests:{w:563,avg:21.64,eco:2.49},odis:{w:381,avg:22.02,eco:3.88}} }
];

var pfoSelected = { 1: null, 2: null };

function pfoSearchPlayer(slot) {
    var input = document.getElementById("pfo-search-" + slot);
    var dropdown = document.getElementById("pfo-dropdown-" + slot);
    var query = input.value.toLowerCase().trim();
    if (!query) { pfoShowDropdown(slot); return; }
    var filtered = pfoPlayers.filter(function(p) {
        return p.name.toLowerCase().includes(query) || p.country.toLowerCase().includes(query) || p.role.toLowerCase().includes(query);
    });
    pfoRenderDropdown(slot, filtered);
}

function pfoShowDropdown(slot) {
    var dropdown = document.getElementById("pfo-dropdown-" + slot);
    var otherSlot = slot === 1 ? 2 : 1;
    var otherId = pfoSelected[otherSlot] ? pfoSelected[otherSlot].id : null;
    var available = pfoPlayers.filter(function(p) { return p.id !== otherId; });
    pfoRenderDropdown(slot, available);
}

function pfoRenderDropdown(slot, players) {
    var dropdown = document.getElementById("pfo-dropdown-" + slot);
    if (players.length === 0) { dropdown.innerHTML = '<div class="pfo-no-results">No players found</div>'; dropdown.style.display = "block"; return; }
    var html = "";
    players.forEach(function(p) {
        html += '<div class="pfo-dropdown-item" onclick="pfoSelectPlayer(' + slot + ',' + p.id + ')">';
        html += '<div class="pfo-dd-avatar" style="background:' + p.avatar + '">' + p.initials + '</div>';
        html += '<div class="pfo-dd-info"><h4>' + p.name + '</h4><p>' + p.country + ' — ' + p.role + '</p></div>';
        html += '<span class="pfo-dd-tag">' + p.country.substring(0,3).toUpperCase() + '</span>';
        html += '</div>';
    });
    dropdown.innerHTML = html;
    dropdown.style.display = "block";
}

function pfoSelectPlayer(slot, id) {
    var player = pfoPlayers.find(function(p) { return p.id === id; });
    if (!player) return;
    pfoSelected[slot] = player;
    document.getElementById("pfo-search-" + slot).value = "";
    document.getElementById("pfo-dropdown-" + slot).style.display = "none";
    var selected = document.getElementById("pfo-selected-" + slot);
    selected.style.display = "flex";
    selected.innerHTML = '<div class="pfo-sp-avatar" style="background:' + player.avatar + '">' + player.initials + '</div><div class="pfo-sp-info"><h4>' + player.name + '</h4><p>' + player.country + ' — ' + player.role + '</p></div><button class="pfo-sp-remove" onclick="pfoRemovePlayer(' + slot + ')"><i class="fa-solid fa-xmark"></i></button>';
    document.getElementById("pfo-search-" + slot).parentElement.parentElement.style.display = "none";
    document.getElementById("pfo-actions").style.display = "flex";
    document.getElementById("pfo-result").style.display = "none";
}

function pfoRemovePlayer(slot) {
    pfoSelected[slot] = null;
    document.getElementById("pfo-selected-" + slot).style.display = "none";
    document.getElementById("pfo-search-" + slot).parentElement.parentElement.style.display = "flex";
    document.getElementById("pfo-search-" + slot).value = "";
    if (!pfoSelected[1] && !pfoSelected[2]) document.getElementById("pfo-actions").style.display = "none";
    document.getElementById("pfo-result").style.display = "none";
}

function pfoChangePlayers() {
    pfoRemovePlayer(1);
    pfoRemovePlayer(2);
    document.getElementById("pfo-actions").style.display = "none";
}

function pfoReset() {
    pfoChangePlayers();
}

function pfoCompare() {
    if (!pfoSelected[1] || !pfoSelected[2]) return;
    var p1 = pfoSelected[1], p2 = pfoSelected[2];
    var result = document.getElementById("pfo-result");
    var stats = [
        { section:"Test Batting", rows:[
            { label:"Matches", v1:p1.batting.tests.m, v2:p2.batting.tests.m, higher:true },
            { label:"Runs", v1:p1.batting.tests.r, v2:p2.batting.tests.r, higher:true },
            { label:"Average", v1:p1.batting.tests.avg, v2:p2.batting.tests.avg, higher:true },
            { label:"Strike Rate", v1:p1.batting.tests.sr, v2:p2.batting.tests.sr, higher:true },
            { label:"Centuries", v1:p1.batting.tests.c, v2:p2.batting.tests.c, higher:true },
            { label:"Fifties", v1:p1.batting.tests.f, v2:p2.batting.tests.f, higher:true }
        ]},
        { section:"ODI Batting", rows:[
            { label:"Matches", v1:p1.batting.odis.m, v2:p2.batting.odis.m, higher:true },
            { label:"Runs", v1:p1.batting.odis.r, v2:p2.batting.odis.r, higher:true },
            { label:"Average", v1:p1.batting.odis.avg, v2:p2.batting.odis.avg, higher:true },
            { label:"Strike Rate", v1:p1.batting.odis.sr, v2:p2.batting.odis.sr, higher:true },
            { label:"Centuries", v1:p1.batting.odis.c, v2:p2.batting.odis.c, higher:true },
            { label:"Fifties", v1:p1.batting.odis.f, v2:p2.batting.odis.f, higher:true }
        ]},
        { section:"T20I Batting", rows:[
            { label:"Matches", v1:p1.batting.t20s.m, v2:p2.batting.t20s.m, higher:true },
            { label:"Runs", v1:p1.batting.t20s.r, v2:p2.batting.t20s.r, higher:true },
            { label:"Average", v1:p1.batting.t20s.avg, v2:p2.batting.t20s.avg, higher:true },
            { label:"Strike Rate", v1:p1.batting.t20s.sr, v2:p2.batting.t20s.sr, higher:true }
        ]},
        { section:"Test Bowling", rows:[
            { label:"Wickets", v1:p1.bowling.tests.w, v2:p2.bowling.tests.w, higher:true },
            { label:"Average", v1:p1.bowling.tests.avg, v2:p2.bowling.tests.avg, higher:false },
            { label:"Economy", v1:p1.bowling.tests.eco, v2:p2.bowling.tests.eco, higher:false }
        ]},
        { section:"ODI Bowling", rows:[
            { label:"Wickets", v1:p1.bowling.odis.w, v2:p2.bowling.odis.w, higher:true },
            { label:"Average", v1:p1.bowling.odis.avg, v2:p2.bowling.odis.avg, higher:false },
            { label:"Economy", v1:p1.bowling.odis.eco, v2:p2.bowling.odis.eco, higher:false }
        ]}
    ];
    var p1wins=0, p2wins=0, draws=0;
    stats.forEach(function(s){ s.rows.forEach(function(r){
        if(r.v1===0&&r.v2===0){r.winner=0;draws++;}
        else if(r.v1===r.v2){r.winner=0;draws++;}
        else if(r.higher){if(r.v1>r.v2){r.winner=1;p1wins++;}else{r.winner=2;p2wins++;}}
        else{if(r.v1<r.v2&&r.v1>0){r.winner=1;p1wins++;}else if(r.v2<r.v1&&r.v2>0){r.winner=2;p2wins++;}else{r.winner=0;draws++;}}
    });});
    var overall = p1wins > p2wins ? p1.name : p2wins > p1wins ? p2.name : "Draw";
    var html = '<div class="pfo-result-card">';
    html += '<div class="pfo-result-header">';
    html += '<div class="pfo-result-player"><div class="pfo-rp-avatar" style="background:'+p1.avatar+'">'+p1.initials+'</div><h3>'+p1.name+'</h3><p>'+p1.country+' — '+p1.role+'</p></div>';
    html += '<div class="pfo-result-vs">VS</div>';
    html += '<div class="pfo-result-player"><div class="pfo-rp-avatar" style="background:'+p2.avatar+'">'+p2.initials+'</div><h3>'+p2.name+'</h3><p>'+p2.country+' — '+p2.role+'</p></div>';
    html += '</div>';
    html += '<table class="pfo-stat-table"><thead><tr><th>'+p1.name.split(" ").pop()+'</th><th>Stat</th><th>'+p2.name.split(" ").pop()+'</th></tr></thead><tbody>';
    stats.forEach(function(s){
        html += '<tr class="pfo-section-label"><td colspan="3"><i class="fa-solid fa-layer-group"></i> '+s.section+'</td></tr>';
        s.rows.forEach(function(r){
            var cls = r.winner===1?"pfo-winner-row":"";
            var badge1 = r.winner===1?'<span class="pfo-winner-badge"><i class="fa-solid fa-crown"></i></span>':"";
            var badge2 = r.winner===2?'<span class="pfo-winner-badge"><i class="fa-solid fa-crown"></i></span>':"";
            var badgeD = r.winner===0?'<span class="pfo-draw-badge">=</span>':"";
            html += '<tr class="'+cls+'"><td>'+r.v1+(r.label==="Average"||r.label==="Strike Rate"||r.label==="Economy"?"":"")+' '+badge1+'</td><td>'+r.label+'</td><td>'+r.v2+' '+badge2+'</td></tr>';
        });
    });
    html += '</tbody></table>';
    html += '<div class="pfo-overall-result">';
    if(overall==="Draw"){html+='<h3>🤝 It\'s a Draw!</h3><p>Both players are evenly matched across all stats.</p>';}
    else{html+='<h3>🏆 '+overall+' leads the comparison!</h3><p>'+p1wins+' stats won vs '+p2wins+' stats won ('+draws+' draws).</p>';}
    html += '</div></div>';
    result.innerHTML = html;
    result.style.display = "block";
    result.scrollIntoView({behavior:"smooth",block:"start"});
}

document.addEventListener("click", function(e) {
    if (!e.target.closest(".pfo-player-select")) {
        document.getElementById("pfo-dropdown-1").style.display = "none";
        document.getElementById("pfo-dropdown-2").style.display = "none";
    }
});

// ========================================
// 🎓 CRICKET IQ TEST
// ========================================

var iqQuestionBank = {
    easy: [
        { q:"Who is popularly known as King Kohli?", opts:["Rohit Sharma","Virat Kohli","MS Dhoni","Sachin Tendulkar"], ans:1 },
        { q:"Which country won the 2011 Cricket World Cup?", opts:["Australia","Sri Lanka","India","Pakistan"], ans:2 },
        { q:"How many players are there in a cricket team on the field?", opts:["10","11","12","9"], ans:1 },
        { q:"How many overs are bowled in a T20 innings?", opts:["10","50","20","15"], ans:2 },
        { q:"What is a score of zero by a batter called?", opts:["Dot","Maiden","Duck","Golden Duck"], ans:2 },
        { q:"Who captained India to victory in the 1983 World Cup?", opts:["Sourav Ganguly","Kapil Dev","MS Dhoni","Rahul Dravid"], ans:1 },
        { q:"Which format of cricket can last up to five days?", opts:["T20","ODI","Test Cricket","The Hundred"], ans:2 },
        { q:"How many runs are awarded for hitting the ball over the boundary without bouncing?", opts:["4","5","6","8"], ans:2 },
        { q:"What does LBW stand for?", opts:["Leg Bat Wicket","Leg Before Wicket","Left Ball Wicket","Long Boundary Win"], ans:1 },
        { q:"Who is known as the God of Cricket?", opts:["Virat Kohli","Brian Lara","Sachin Tendulkar","Ricky Ponting"], ans:2 }
    ],
    medium: [
        { q:"Which country hosted the 2011 Cricket World Cup?", opts:["India and Sri Lanka","India and Bangladesh","India only","India, Sri Lanka, and Bangladesh"], ans:3 },
        { q:"What is the highest individual score in Test cricket?", opts:["375 by Brian Lara","400* by Brian Lara","365 by Garry Sobers","380 by Matthew Hayden"], ans:1 },
        { q:"Who took the most wickets in Test cricket history?", opts:["Muttiah Muralitharan","Shane Warne","Anil Kumble","James Anderson"], ans:0 },
        { q:"Which team won the first ever Cricket World Cup in 1975?", opts:["India","England","Australia","West Indies"], ans:3 },
        { q:"What is a maiden over?", opts:["An over with six wickets","An over with no runs conceded","An over with a hat-trick","An over with all boundaries"], ans:1 },
        { q:"How many balls are there in a standard over?", opts:["4","8","6","5"], ans:2 },
        { q:"Which IPL team has Virat Kohli represented throughout his IPL career?", opts:["Mumbai Indians","Chennai Super Kings","Royal Challengers Bengaluru","Kolkata Knight Riders"], ans:2 },
        { q:"Who is known as Captain Cool in cricket?", opts:["Rohit Sharma","Rahul Dravid","MS Dhoni","Kapil Dev"], ans:2 },
        { q:"Which trophy is contested between India and Australia in Test cricket?", opts:["The Ashes","Border-Gavaskar Trophy","Champions Trophy","Pataudi Trophy"], ans:1 },
        { q:"How many runs does a batter get for hitting a four?", opts:["2","4","6","3"], ans:1 }
    ],
    hard: [
        { q:"What was Sachin Tendulkar's score on his Test cricket debut?", opts:["15","68","0","36"], ans:2 },
        { q:"Who scored 400 not out in a single Test innings, the highest individual score ever?", opts:["Matthew Hayden","Brian Lara","Virender Sehwag","Sir Garfield Sobers"], ans:1 },
        { q:"Which country won the 1983 Cricket World Cup final against West Indies?", opts:["England","Australia","India","Pakistan"], ans:2 },
        { q:"Who was the first player to take 800 Test wickets?", opts:["Shane Warne","Anil Kumble","Muttiah Muralitharan","James Anderson"], ans:2 },
        { q:"What is the only country to have won all three ICC trophies (World Cup, T20 World Cup, Champions Trophy)?", opts:["India","Australia","England","Sri Lanka"], ans:1 },
        { q:"Who scored the fastest century in ODI cricket off just 36 balls?", opts:["AB de Villiers","Chris Gayle","Shahid Afridi","Corey Anderson"], ans:0 },
        { q:"In which year did India win their first-ever Test match?", opts:["1932","1952","1947","1960"], ans:1 },
        { q:"Who was the first Indian cricketer to score a double century in ODI cricket?", opts:["Virender Sehwag","Sachin Tendulkar","Rohit Sharma","Virat Kohli"], ans:1 },
        { q:"What is the nickname of the Australian cricket team?", opts:["The Blacks","The Kangaroos","The Baggy Greens","The Southern Stars"], ans:2 },
        { q:"Who holds the record for the most catches in Test cricket as a non-wicketkeeper?", opts:["Rahul Dravid","Jacques Kallis","Ricky Ponting","Steve Smith"], ans:0 }
    ]
};

var iqState = { level:null, questions:[], current:0, score:0, answered:false, locked:false };

function iqShuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

function iqStartTest(level) {
    iqState.level = level;
    iqState.questions = iqShuffle(iqQuestionBank[level]).slice(0, 10);
    iqState.current = 0;
    iqState.score = 0;
    iqState.answered = false;
    iqState.locked = false;

    document.getElementById("iq-level-select").style.display = "none";
    document.getElementById("iq-result-area").style.display = "none";
    document.getElementById("iq-test-area").style.display = "block";

    var badge = document.getElementById("iq-level-badge");
    badge.className = "iq-badge iq-badge-" + level;
    badge.textContent = level.charAt(0).toUpperCase() + level.slice(1);

    iqRenderQuestion();
}

function iqRenderQuestion() {
    iqState.answered = false;
    iqState.locked = false;
    var q = iqState.questions[iqState.current];
    var total = iqState.questions.length;

    document.getElementById("iq-progress-text").textContent = "Question " + (iqState.current + 1) + " of " + total;
    document.getElementById("iq-score-display").textContent = "Score: " + iqState.score;
    document.getElementById("iq-progress-fill").style.width = ((iqState.current / total) * 100) + "%";
    document.getElementById("iq-question-text").textContent = q.q;
    document.getElementById("iq-feedback").style.display = "none";
    document.getElementById("iq-next-btn").style.display = "none";

    var letters = ["A","B","C","D"];
    var optHtml = "";
    for (var i = 0; i < q.opts.length; i++) {
        optHtml += '<button class="iq-option" onclick="iqAnswer(' + i + ')" id="iq-opt-' + i + '">';
        optHtml += '<span class="iq-opt-letter">' + letters[i] + '</span>';
        optHtml += '<span>' + q.opts[i] + '</span>';
        optHtml += '</button>';
    }
    document.getElementById("iq-options").innerHTML = optHtml;
}

function iqAnswer(idx) {
    if (iqState.locked) return;
    iqState.locked = true;
    iqState.answered = true;

    var q = iqState.questions[iqState.current];
    var correct = q.ans;
    var feedback = document.getElementById("iq-feedback");
    var btns = document.querySelectorAll(".iq-option");

    btns.forEach(function(b) { b.disabled = true; });

    if (idx === correct) {
        iqState.score++;
        btns[idx].classList.add("iq-option-correct");
        feedback.className = "iq-feedback iq-feedback-correct";
        feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct! Well done!';
    } else {
        btns[idx].classList.add("iq-option-wrong");
        btns[correct].classList.add("iq-option-correct");
        feedback.className = "iq-feedback iq-feedback-wrong";
        feedback.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Wrong! Correct answer: <strong>' + q.opts[correct] + '</strong>';
    }

    for (var i = 0; i < btns.length; i++) {
        if (i !== idx && i !== correct) btns[i].classList.add("iq-option-dim");
    }

    feedback.style.display = "flex";
    document.getElementById("iq-score-display").textContent = "Score: " + iqState.score;

    if (iqState.current < iqState.questions.length - 1) {
        document.getElementById("iq-next-btn").style.display = "inline-flex";
    } else {
        setTimeout(function() { iqShowResult(); }, 800);
    }
}

function iqNextQuestion() {
    iqState.current++;
    iqRenderQuestion();
}

function iqShowResult() {
    document.getElementById("iq-test-area").style.display = "none";
    document.getElementById("iq-result-area").style.display = "block";

    var total = iqState.questions.length;
    var pct = Math.round((iqState.score / total) * 100);
    var icon = document.getElementById("iq-result-icon");
    var title = document.getElementById("iq-result-title");
    var subtitle = document.getElementById("iq-result-subtitle");

    if (pct >= 80) {
        icon.textContent = "🏆";
        title.textContent = "Cricket Genius!";
        subtitle.textContent = "Outstanding! You really know your cricket!";
    } else if (pct >= 60) {
        icon.textContent = "🌟";
        title.textContent = "Great Performance!";
        subtitle.textContent = "Solid knowledge! Keep learning!";
    } else if (pct >= 40) {
        icon.textContent = "📝";
        title.textContent = "Not Bad!";
        subtitle.textContent = "You know some basics. Try again to improve!";
    } else {
        icon.textContent = "📚";
        title.textContent = "Keep Studying!";
        subtitle.textContent = "Cricket has many surprises. Learn and try again!";
    }

    document.getElementById("iq-final-score").textContent = iqState.score + "/" + total;
    document.getElementById("iq-final-correct").textContent = iqState.score;
    document.getElementById("iq-final-pct").textContent = pct + "%";

    var bestKey = "worldCricketHubIQBest_" + iqState.level;
    var oldBest = Number(localStorage.getItem(bestKey)) || 0;
    var isNewBest = iqState.score > oldBest;
    if (isNewBest) localStorage.setItem(bestKey, iqState.score);

    var banner = document.getElementById("iq-best-banner");
    if (isNewBest) {
        banner.style.display = "block";
        document.getElementById("iq-best-val").textContent = iqState.score;
    } else {
        banner.style.display = "none";
    }
}

function iqRestartTest() {
    iqStartTest(iqState.level);
}

function iqChangeLevel() {
    document.getElementById("iq-test-area").style.display = "none";
    document.getElementById("iq-result-area").style.display = "none";
    document.getElementById("iq-level-select").style.display = "grid";
}

// ========================================
// 🗳️ FAN VOTE ARENA
// ========================================

var fvaPolls = [];
var fvaSelectedOptions = {};
var fvaVotedPolls = {};

function fvaGetToken() {
    var token = localStorage.getItem("wch_fan_vote_token");
    if (!token) {
        token = "voter_" + Date.now() + "_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("wch_fan_vote_token", token);
    }
    return token;
}

function fvaGetVotedPolls() {
    try {
        return JSON.parse(localStorage.getItem("wch_fan_voted_polls")) || {};
    } catch(e) { return {}; }
}

function fvaSaveVotedPoll(pollId) {
    var voted = fvaGetVotedPolls();
    voted[pollId] = true;
    localStorage.setItem("wch_fan_voted_polls", JSON.stringify(voted));
}

function fvaPollIconClass(index) {
    return "fva-poll-icon-" + ((index % 5) + 1);
}

var fvaIcons = ["fa-heart","fa-trophy","fa-star","fa-fire","fa-gem"];

async function fvaLoadPolls() {
    var container = document.getElementById("fva-polls-container");
    try {
        var response = await fetch("/api/polls");
        var result = await response.json();
        if (result.success) {
            fvaPolls = result.polls;
            fvaRenderPolls();
        } else {
            container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Failed to load polls.</p>';
        }
    } catch(e) {
        container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Unable to connect to voting server.</p>';
    }
}

function fvaRenderPolls() {
    var container = document.getElementById("fva-polls-container");
    var voted = fvaGetVotedPolls();
    var html = "";

    fvaPolls.forEach(function(poll, pIdx) {
        var hasVoted = voted[poll.id] || false;
        var selected = fvaSelectedOptions[poll.id] || null;
        var iconClass = fvaPollIconClass(pIdx);
        var iconName = fvaIcons[pIdx % fvaIcons.length];

        html += '<div class="fva-poll-card">';
        html += '<div class="fva-poll-icon ' + iconClass + '"><i class="fa-solid ' + iconName + '"></i></div>';
        html += '<div class="fva-poll-question">' + poll.question + '</div>';

        if (hasVoted || poll.totalVotes > 0 && voted[poll.id]) {
            // Show results
            html += fvaRenderResults(poll);
            html += '<div class="fva-voted-tag"><i class="fa-solid fa-check-circle"></i> You voted</div>';
        } else {
            // Show voting options
            html += '<div class="fva-option-list">';
            poll.options.forEach(function(opt) {
                var isSelected = selected === opt.id;
                html += '<button class="fva-option-btn' + (isSelected ? ' selected' : '') + '" onclick="fvaSelectOption(\'' + poll.id + '\',\'' + opt.id + '\')">';
                html += '<span class="fva-radio"></span>';
                html += '<span>' + opt.text + '</span>';
                html += '</button>';
            });
            html += '</div>';
            html += '<button class="fva-vote-btn" id="fva-vote-' + poll.id + '" onclick="fvaSubmitVote(\'' + poll.id + '\')" ' + (!selected ? 'disabled' : '') + '>';
            html += '<i class="fa-solid fa-check-to-slot"></i> Vote Now';
            html += '</button>';
        }

        html += '</div>';
    });

    container.innerHTML = html;
}

function fvaRenderResults(poll) {
    var html = '<div class="fva-results">';
    var colors = ["fva-bar-1","fva-bar-2","fva-bar-3","fva-bar-4"];
    poll.options.forEach(function(opt, idx) {
        html += '<div class="fva-result-row">';
        html += '<div class="fva-result-header">';
        html += '<span class="fva-result-name">' + opt.text + '</span>';
        html += '<span class="fva-result-pct">' + opt.percentage + '%</span>';
        html += '</div>';
        html += '<div class="fva-bar-bg"><div class="fva-bar-fill ' + colors[idx % 4] + '" style="width:' + opt.percentage + '%"></div></div>';
        html += '<div class="fva-result-votes">' + opt.votes + ' vote' + (opt.votes !== 1 ? 's' : '') + '</div>';
        html += '</div>';
    });
    html += '<div class="fva-total-votes"><i class="fa-solid fa-chart-simple"></i> Total votes: ' + poll.totalVotes + '</div>';
    html += '</div>';
    return html;
}

function fvaSelectOption(pollId, optionId) {
    var voted = fvaGetVotedPolls();
    if (voted[pollId]) return;

    fvaSelectedOptions[pollId] = optionId;
    fvaRenderPolls();
}

async function fvaSubmitVote(pollId) {
    var selected = fvaSelectedOptions[pollId];
    if (!selected) return;

    var btn = document.getElementById("fva-vote-" + pollId);
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Voting...'; }

    var token = fvaGetToken();

    try {
        var response = await fetch("/api/polls/" + pollId + "/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ optionId: selected, token: token })
        });
        var result = await response.json();

        if (result.success) {
            fvaSaveVotedPoll(pollId);
            // Update local poll data
            var pollIdx = fvaPolls.findIndex(function(p) { return p.id === pollId; });
            if (pollIdx !== -1) {
                fvaPolls[pollIdx] = result.poll;
            }
            fvaRenderPolls();
        } else if (result.alreadyVoted) {
            fvaSaveVotedPoll(pollId);
            fvaRenderPolls();
        } else {
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i> Vote Now'; }
            alert(result.error || "Failed to submit vote.");
        }
    } catch(e) {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i> Vote Now'; }
        alert("Unable to connect to server. Please try again.");
    }
}

// Load polls on page load
fvaLoadPolls();

// ========================================
// 🔍 MYSTERY CRICKETER
// ========================================

var mcPlayers = [
  {
    name: "Sachin Tendulkar",
    country: "India",
    role: "Right-hand Batsman",
    clues: [
      "I am from <span class='mc-clue-highlight'>India</span>.",
      "I am a <span class='mc-clue-highlight'>right-hand batsman</span> who also bowls part-time.",
      "I hold the record for most runs in Test cricket with <span class='mc-clue-highlight'>15,921 runs</span>.",
      "I scored <span class='mc-clue-highlight'>100 international centuries</span> in my career.",
      "I am the only player to score a double century in ODIs — <span class='mc-clue-highlight'>200*</span>.",
      "I played <span class='mc-clue-highlight'>200 Test matches</span> and 463 ODIs.",
      "I was known as the '<span class='mc-clue-highlight'>Little Master</span>' and played from 1989 to 2013.",
      "I was the <span class='mc-clue-highlight'>first batsman</span> to score a double century in World Cup history (2011)."
    ],
    hint: "I was named after a famous Indian writer — Sachin.",
    info: "India | Batsman | 15,921 Test runs | 100 centuries"
  },
  {
    name: "Virat Kohli",
    country: "India",
    role: "Right-hand Batsman",
    clues: [
      "I am from <span class='mc-clue-highlight'>India</span>.",
      "I am an aggressive <span class='mc-clue-highlight'>right-hand batsman</span> and former captain.",
      "I have scored over <span class='mc-clue-highlight'>70 international centuries</span>.",
      "I hold the record for most runs in <span class='mc-clue-highlight'>T20I cricket</span>.",
      "I was India's <span class='mc-clue-highlight'>Test captain</span> for several years.",
      "I am known for my intense <span class='mc-clue-highlight'>fitness and aggression</span> on the field.",
      "I have over <span class='mc-clue-highlight'>13,000 ODI runs</span> and 50 ODI centuries.",
      "My nickname is '<span class='mc-clue-highlight'>King Kohli</span>'."
    ],
    hint: "My last name sounds like a famous Greek explorer.",
    info: "India | Batsman | 70+ centuries | Former captain"
  },
  {
    name: "Don Bradman",
    country: "Australia",
    role: "Right-hand Batsman",
    clues: [
      "I am from <span class='mc-clue-highlight'>Australia</span>.",
      "I am considered the <span class='mc-clue-highlight'>greatest batsman</span> of all time.",
      "My career batting average was <span class='mc-clue-highlight'>99.94</span> — the highest ever.",
      "I played in the <span class='mc-clue-highlight'>1930s and 1940s</span> era.",
      "I scored <span class='mc-clue-highlight'>29 centuries</span> in just 52 Test innings.",
      "My final Test innings ended with a <span class='mc-clue-highlight'>duck</span>, missing the perfect 100 average.",
      "I was nicknamed '<span class='mc-clue-highlight'>The Don</span>'.",
      "My last Test was in <span class='mc-clue-highlight'>1948</span> during the famous Invincibles tour."
    ],
    hint: "My surname is also a common word for a gentleman.",
    info: "Australia | Batsman | Average 99.94 | 29 Test centuries"
  },
  {
    name: "Brian Lara",
    country: "West Indies",
    role: "Left-hand Batsman",
    clues: [
      "I am from the <span class='mc-clue-highlight'>West Indies</span>.",
      "I am a <span class='mc-clue-highlight'>left-hand batsman</span> known for my elegant stroke play.",
      "I hold the record for the <span class='mc-clue-highlight'>highest individual Test score</span>: 400 not out.",
      "I also hold the record for the <span class='mc-clue-highlight'>highest first-class score</span>: 501 not out.",
      "I was named one of Wisden's <span class='mc-clue-highlight'>Five Cricketers of the Century</span>.",
      "I played for <span class='mc-clue-highlight'>Trinidad and Tobago</span> and West Indies.",
      "My highest ODI score was <span class='mc-clue-highlight'>169</span> against Pakistan.",
      "I was known as '<span class='mc-clue-highlight'>The Prince of Port of Spain</span>'."
    ],
    hint: "My first name is a common English name.",
    info: "West Indies | Left-hand batsman | Highest Test score: 400*"
  },
  {
    name: "Shane Warne",
    country: "Australia",
    role: "Leg-spin Bowler",
    clues: [
      "I am from <span class='mc-clue-highlight'>Australia</span>.",
      "I am widely regarded as the <span class='mc-clue-highlight'>greatest leg-spinner</span> ever.",
      "I took <span class='mc-clue-highlight'>708 Test wickets</span> — second most in history.",
      "My most famous ball was the '<span class='mc-clue-highlight'>Ball of the Century</span>' to Mike Gatting in 1993.",
      "I bowled with a distinctive <span class='mc-clue-highlight'>big loop</span> and sharp turn.",
      "I played for <span class='mc-clue-highlight'>Hampshire</span> in county cricket and Rajasthan Royals in IPL.",
      "My jersey number was <span class='mc-clue-highlight'>23</span> for Australia.",
      "I retired from international cricket in <span class='mc-clue-highlight'>2007</span>."
    ],
    hint: "My surname sounds like a type of warning.",
    info: "Australia | Leg-spinner | 708 Test wickets"
  },
  {
    name: "MS Dhoni",
    country: "India",
    role: "Right-hand Batsman / Wicketkeeper",
    clues: [
      "I am from <span class='mc-clue-highlight'>India</span>.",
      "I am a <span class='mc-clue-highlight'>right-hand batsman</span> and wicketkeeper.",
      "I captained India to win the <span class='mc-clue-highlight'>2007 T20 World Cup</span>.",
      "I also led India to win the <span class='mc-clue-highlight'>2011 ODI World Cup</span> at home.",
      "I am known for my <span class='mc-clue-highlight'>calm demeanor</span> — called '<span class='mc-clue-highlight'>Captain Cool</span>'.",
      "I popularized the <span class='mc-clue-highlight'>helicopter shot</span> in cricket.",
      "I played for <span class='mc-clue-highlight'>Chennai Super Kings</span> in IPL throughout my career.",
      "My jersey number was <span class='mc-clue-highlight'>7</span>."
    ],
    hint: "My initials match a famous military acronym.",
    info: "India | WK-Batsman | Captain | 2011 World Cup winner"
  },
  {
    name: "Wasim Akram",
    country: "Pakistan",
    role: "Left-arm Fast Bowler",
    clues: [
      "I am from <span class='mc-clue-highlight'>Pakistan</span>.",
      "I am a <span class='mc-clue-highlight'>left-arm fast bowler</span> known for swing bowling.",
      "I took <span class='mc-clue-highlight'>414 Test wickets</span> and 502 ODI wickets.",
      "I am known as the '<span class='mc-clue-highlight'>Sultan of Swing</span>'.",
      "I formed a deadly bowling partnership with <span class='mc-clue-highlight'>Waqar Younis</span>.",
      "I could bowl both <span class='mc-clue-highlight'>inswing and outswing</span> at high pace.",
      "I played for <span class='mc-clue-highlight'>Lahore</span> and represented Pakistan in multiple World Cups.",
      "I retired from international cricket in <span class='mc-clue-highlight'>2003</span>."
    ],
    hint: "My first name means 'beautiful' in Arabic.",
    info: "Pakistan | Left-arm fast | 414 Test wickets | Sultan of Swing"
  },
  {
    name: "Kumar Sangakkara",
    country: "Sri Lanka",
    role: "Left-hand Batsman / Wicketkeeper",
    clues: [
      "I am from <span class='mc-clue-highlight'>Sri Lanka</span>.",
      "I am a <span class='mc-clue-highlight'>left-hand batsman</span> and wicketkeeper.",
      "I scored over <span class='mc-clue-highlight'>14,000 Test runs</span> and 14,234 ODI runs.",
      "I have <span class='mc-clue-highlight'>38 Test centuries</span> — among the highest ever.",
      "I was captain of <span class='mc-clue-highlight'>Sri Lanka</span> and also served as ICC Cricket Committee chairman.",
      "I played for <span class='mc-clue-highlight'>Kings XI Punjab</span> and Sunrisers Hyderabad in IPL.",
      "I am a qualified <span class='mc-clue-highlight'>lawyer</span> off the field.",
      "I was inducted into the <span class='mc-clue-highlight'>ICC Hall of Fame</span> in 2021."
    ],
    hint: "My surname starts with 'Sanga' — a common Sri Lankan nickname.",
    info: "Sri Lanka | WK-Batsman | 14,000+ Test runs | ICC Hall of Fame"
  },
  {
    name: "Jacques Kallis",
    country: "South Africa",
    role: "Right-hand Batsman / Medium-fast Bowler",
    clues: [
      "I am from <span class='mc-clue-highlight'>South Africa</span>.",
      "I am considered the greatest <span class='mc-clue-highlight'>all-rounder</span> in cricket history.",
      "I scored over <span class='mc-clue-highlight'>13,000 Test runs</span> and took 292 Test wickets.",
      "I am a <span class='mc-clue-highlight'>right-hand batsman</span> and <span class='mc-clue-highlight'>right-arm medium-fast bowler</span>.",
      "I played <span class='mc-clue-highlight'>166 Tests</span> and 328 ODIs for South Africa.",
      "I scored <span class='mc-clue-highlight'>45 Test centuries</span> — more than many specialist batsmen.",
      "I played for <span class='mc-clue-highlight'>Kolkata Knight Riders</span> in IPL.",
      "I was named <span class='mc-clue-highlight'>Wisden Cricketer of the Year</span> in 2013."
    ],
    hint: "My first name is a common Afrikaans name.",
    info: "South Africa | All-rounder | 13,000+ runs + 292 wickets in Tests"
  },
  {
    name: "Ricky Ponting",
    country: "Australia",
    role: "Right-hand Batsman",
    clues: [
      "I am from <span class='mc-clue-highlight'>Australia</span>.",
      "I am a <span class='mc-clue-highlight'>right-hand batsman</span> and one of the most successful captains.",
      "I captained Australia in <span class='mc-clue-highlight'>two World Cup wins</span> (2003 and 2007).",
      "I scored <span class='mc-clue-highlight'>41 Test centuries</span> and 30 ODI centuries.",
      "I am the <span class='mc-clue-highlight'>second-highest run scorer</span> in Test history with 13,378 runs.",
      "My famous bat brand is the <span class='mc-clue-highlight'>Kookaburra</span>.",
      "I played for <span class='mc-clue-highlight'>Tasmania</span> and Mumbai Indians in IPL.",
      "I was nicknamed '<span class='mc-clue-highlight'>Punter</span>' and retired in 2012."
    ],
    hint: "My surname sounds like a common Australian slang word.",
    info: "Australia | Batsman | 13,378 Test runs | 2-time World Cup winning captain"
  },
  {
    name: "Muttiah Muralitharan",
    country: "Sri Lanka",
    role: "Off-spin Bowler",
    clues: [
      "I am from <span class='mc-clue-highlight'>Sri Lanka</span>.",
      "I am an <span class='mc-clue-highlight'>off-spin bowler</span> with a unique bowling action.",
      "I hold the world record for most Test wickets: <span class='mc-clue-highlight'>800</span>.",
      "I also hold the record for most ODI wickets: <span class='mc-clue-highlight'>534</span>.",
      "I bowled the '<span class='mc-clue-highlight'>doosra</span>' — a ball that turns the other way.",
      "My bowling action was famously <span class='mc-clue-highlight'>reviewed</span> by the ICC.",
      "I took <span class='mc-clue-highlight'>67 five-wicket hauls</span> in Tests — the most ever.",
      "I was known as '<span class='mc-clue-highlight'>Murali</span>' and played for Chennai Super Kings."
    ],
    hint: "My name is very long — people call me by a shorter version.",
    info: "Sri Lanka | Off-spinner | 800 Test wickets | World record holder"
  },
  {
    name: "AB de Villiers",
    country: "South Africa",
    role: "Right-hand Batsman",
    clues: [
      "I am from <span class='mc-clue-highlight'>South Africa</span>.",
      "I am a <span class='mc-clue-highlight'>right-hand batsman</span> known as '<span class='mc-clue-highlight'>Mr. 360</span>'.",
      "I can play shots to <span class='mc-clue-highlight'>all parts of the ground</span>.",
      "I held the record for <span class='mc-clue-highlight'>fastest ODI century</span> (31 balls) against West Indies.",
      "I scored the <span class='mc-clue-highlight'>fastest ODI 50</span> in just 16 balls.",
      "I played for <span class='mc-clue-highlight'>Royal Challengers Bangalore</span> in IPL.",
      "I was a multi-sport athlete — also played <span class='mc-clue-highlight'>rugby, tennis, and golf</span>.",
      "I retired from all cricket in <span class='mc-clue-highlight'>2021</span>."
    ],
    hint: "My first two initials stand for my full first names.",
    info: "South Africa | Batsman | Mr. 360 | Fastest ODI century (31 balls)"
  },
  {
    name: "Sourav Ganguly",
    country: "India",
    role: "Left-hand Batsman",
    clues: [
      "I am from <span class='mc-clue-highlight'>India</span>.",
      "I am a <span class='mc-clue-highlight'>left-hand batsman</span> and former captain.",
      "I was known as '<span class='mc-clue-highlight'>Dada</span>' — meaning elder brother in Bengali.",
      "I scored <span class='mc-clue-highlight'>16 centuries</span> in ODIs and 16 in Tests.",
      "I captained India from <span class='mc-clue-highlight'>2000 to 2005</span>.",
      "I famously waved my shirt at <span class='mc-clue-highlight'>Lord's balcony</span> after scoring a century.",
      "I later became <span class='mc-clue-highlight'>BCCI President</span> from 2019 to 2022.",
      "I played for <span class='mc-clue-highlight'>Kolkata Knight Riders</span> as captain and mentor."
    ],
    hint: "My first name is also a famous Bengali city name shortened.",
    info: "India | Left-hand batsman | Former captain | Former BCCI President"
  },
  {
    name: "Ben Stokes",
    country: "England",
    role: "Left-hand Batsman / Right-arm Fast-medium Bowler",
    clues: [
      "I am from <span class='mc-clue-highlight'>England</span>.",
      "I am a <span class='mc-clue-highlight'>left-hand batsman</span> and right-arm fast-medium bowler.",
      "I played the <span class='mc-clue-highlight'>greatest innings in World Cup 2019 final</span> to win it for England.",
      "I scored an unbeaten <span class='mc-clue-highlight'>84 in the super over</span> and the famous 135* at Headingley.",
      "I was named <span class='mc-clue-highlight'>ICC Player of the Year</span> in 2019.",
      "I am currently England's <span class='mc-clue-highlight'>Test captain</span>.",
      "I play for <span class='mc-clue-highlight'>Rajasthan Royals</span> in IPL.",
      "My full name is <span class='mc-clue-highlight'>Benjamin Andrew Stokes</span>."
    ],
    hint: "My surname is also a common English last name meaning 'dwelling place'.",
    info: "England | All-rounder | 2019 World Cup hero | Test captain"
  },
  {
    name: "Ravichandran Ashwin",
    country: "India",
    role: "Right-arm Off-spin Bowler",
    clues: [
      "I am from <span class='mc-clue-highlight'>India</span>.",
      "I am an <span class='mc-clue-highlight'>off-spin bowler</span> who also bats right-handed.",
      "I have taken over <span class='mc-clue-highlight'>500 Test wickets</span> — most by any active spinner.",
      "I have taken <span class='mc-clue-highlight'>37 five-wicket hauls</span> in Tests.",
      "I am an <span class='mc-clue-highlight'>engineer</span> by education before becoming a cricketer.",
      "I play for <span class='mc-clue-highlight'>Tamil Nadu</span> in domestic cricket.",
      "I have scored <span class='mc-clue-highlight'>5 Test centuries</span> as a bowling all-rounder.",
      "I was named <span class='mc-clue-highlight'>ICC Test Cricketer of the Year</span> in 2016."
    ],
    hint: "My initials match a popular chess opening move abbreviation.",
    info: "India | Off-spinner | 500+ Test wickets | ICC Test Cricketer of the Year 2016"
  }
];

var mcCurrentIndex = 0;
var mcCurrentClue = 0;
var mcTotalScore = 0;
var mcPlayersGuessed = 0;
var mcCorrectGuesses = 0;
var mcUsedHint = false;
var mcCluesUsedThisPlayer = 0;
var mcTotalPlayers = 10;
var mcShuffledPlayers = [];

function mcShuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = a[i]; a[i] = a[j]; a[j] = temp;
  }
  return a;
}

function mcStartNewGame() {
  mcShuffledPlayers = mcShuffleArray(mcPlayers).slice(0, mcTotalPlayers);
  mcCurrentIndex = 0;
  mcTotalScore = 0;
  mcPlayersGuessed = 0;
  mcCorrectGuesses = 0;
  document.getElementById("mc-final-result").style.display = "none";
  document.getElementById("mc-game-container").querySelector(".mc-clue-card").style.display = "";
  document.getElementById("mc-game-container").querySelector(".mc-guess-area").style.display = "";
  document.getElementById("mc-game-container").querySelector(".mc-action-buttons").style.display = "";
  mcLoadPlayer();
}

function mcLoadPlayer() {
  if (mcCurrentIndex >= mcShuffledPlayers.length) {
    mcShowFinalResult();
    return;
  }
  mcCurrentClue = 0;
  mcUsedHint = false;
  mcCluesUsedThisPlayer = 0;
  var player = mcShuffledPlayers[mcCurrentIndex];
  document.getElementById("mc-player-num").textContent = "Player " + (mcCurrentIndex + 1) + " / " + mcShuffledPlayers.length;
  document.getElementById("mc-current-score").textContent = mcTotalScore;
  document.getElementById("mc-clue-number").textContent = "Clue 1 of " + player.clues.length;
  document.getElementById("mc-clue-text").innerHTML = player.clues[0];
  document.getElementById("mc-guess-input").value = "";
  document.getElementById("mc-guess-input").disabled = false;
  document.getElementById("mc-submit-btn").disabled = false;
  document.getElementById("mc-feedback").className = "mc-feedback";
  document.getElementById("mc-feedback").innerHTML = "";
  document.getElementById("mc-answer-reveal").style.display = "none";
  document.getElementById("mc-hint-btn").disabled = false;
  document.getElementById("mc-next-clue-btn").disabled = false;
  document.getElementById("mc-action-buttons").style.display = "flex";
  mcShowChoices();
}

function mcShowChoices() {
  var player = mcShuffledPlayers[mcCurrentIndex];
  var otherNames = mcPlayers.filter(function(p) { return p.name !== player.name; });
  var wrongChoices = mcShuffleArray(otherNames).slice(0, 3);
  var allChoices = mcShuffleArray([player].concat(wrongChoices));
  var html = "";
  allChoices.forEach(function(p) {
    html += '<button class="mc-choice-btn" onclick="mcChoiceGuess(\'' + p.name.replace(/'/g, "\\'") + '\')">' + p.name + '</button>';
  });
  document.getElementById("mc-choice-area").innerHTML = html;
}

function mcChoiceGuess(name) {
  var player = mcShuffledPlayers[mcCurrentIndex];
  var buttons = document.querySelectorAll(".mc-choice-btn");
  buttons.forEach(function(btn) {
    btn.disabled = true;
    if (btn.textContent === name) {
      if (name === player.name) {
        btn.classList.add("mc-correct");
      } else {
        btn.classList.add("mc-wrong");
      }
    }
    if (btn.textContent === player.name) {
      btn.classList.add("mc-correct");
    }
    if (btn.textContent !== player.name && btn.textContent !== name) {
      btn.classList.add("mc-dim");
    }
  });
  if (name === player.name) {
    mcHandleCorrect();
  } else {
    mcHandleWrong();
  }
}

function mcSubmitGuess() {
  var input = document.getElementById("mc-guess-input");
  var guess = input.value.trim();
  if (!guess) return;
  var player = mcShuffledPlayers[mcCurrentIndex];
  var buttons = document.querySelectorAll(".mc-choice-btn");
  buttons.forEach(function(btn) {
    btn.disabled = true;
    if (btn.textContent.toLowerCase() === guess.toLowerCase()) {
      btn.classList.add(btn.textContent.toLowerCase() === player.name.toLowerCase() ? "mc-correct" : "mc-wrong");
    }
    if (btn.textContent === player.name) {
      btn.classList.add("mc-correct");
    }
    if (btn.textContent.toLowerCase() !== player.name.toLowerCase() && btn.textContent.toLowerCase() !== guess.toLowerCase()) {
      btn.classList.add("mc-dim");
    }
  });
  if (guess.toLowerCase() === player.name.toLowerCase()) {
    mcHandleCorrect();
  } else {
    mcHandleWrong();
  }
}

function mcHandleCorrect() {
  var cluesAvailable = mcShuffledPlayers[mcCurrentIndex].clues.length;
  var points = Math.max(10 - (mcCluesUsedThisPlayer * 2) - (mcUsedHint ? 2 : 0), 1);
  mcTotalScore += points;
  mcPlayersGuessed++;
  mcCorrectGuesses++;
  document.getElementById("mc-current-score").textContent = mcTotalScore;
  var fb = document.getElementById("mc-feedback");
  fb.className = "mc-feedback mc-correct";
  fb.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correct! +" + points + " points";
  document.getElementById("mc-guess-input").disabled = true;
  document.getElementById("mc-submit-btn").disabled = true;
  document.getElementById("mc-hint-btn").disabled = true;
  document.getElementById("mc-next-clue-btn").disabled = true;
}

function mcHandleWrong() {
  var player = mcShuffledPlayers[mcCurrentIndex];
  mcCluesUsedThisPlayer++;
  var fb = document.getElementById("mc-feedback");
  fb.className = "mc-feedback mc-wrong";
  fb.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> Wrong! Try again or get next clue.";
  if (mcCluesUsedThisPlayer >= player.clues.length) {
    fb.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> No more clues! The answer was <strong>" + player.name + "</strong>";
    mcPlayersGuessed++;
    document.getElementById("mc-guess-input").disabled = true;
    document.getElementById("mc-submit-btn").disabled = true;
    document.getElementById("mc-hint-btn").disabled = true;
    document.getElementById("mc-next-clue-btn").disabled = true;
    document.getElementById("mc-answer-reveal").style.display = "block";
    document.getElementById("mc-action-buttons").style.display = "none";
    document.getElementById("mc-reveal-name").textContent = player.name;
    document.getElementById("mc-reveal-info").textContent = player.info;
  }
}

function mcShowHint() {
  if (mcUsedHint) return;
  mcUsedHint = true;
  mcTotalScore = Math.max(0, mcTotalScore - 2);
  document.getElementById("mc-current-score").textContent = mcTotalScore;
  var player = mcShuffledPlayers[mcCurrentIndex];
  var fb = document.getElementById("mc-feedback");
  fb.className = "mc-feedback mc-wrong";
  fb.innerHTML = "<i class='fa-solid fa-lightbulb'></i> Hint: " + player.hint + " (-2 pts)";
  document.getElementById("mc-hint-btn").disabled = true;
}

function mcNextClue() {
  var player = mcShuffledPlayers[mcCurrentIndex];
  mcCluesUsedThisPlayer++;
  mcTotalScore = Math.max(0, mcTotalScore - 1);
  document.getElementById("mc-current-score").textContent = mcTotalScore;
  if (mcCurrentClue < player.clues.length - 1) {
    mcCurrentClue++;
    document.getElementById("mc-clue-number").textContent = "Clue " + (mcCurrentClue + 1) + " of " + player.clues.length;
    document.getElementById("mc-clue-text").innerHTML = player.clues[mcCurrentClue];
    document.getElementById("mc-feedback").className = "mc-feedback";
    document.getElementById("mc-feedback").innerHTML = "<i class='fa-solid fa-forward'></i> New clue revealed! (-1 pt)";
  } else {
    var fb = document.getElementById("mc-feedback");
    fb.className = "mc-feedback mc-wrong";
    fb.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> No more clues! The answer was <strong>" + player.name + "</strong>";
    mcPlayersGuessed++;
    document.getElementById("mc-guess-input").disabled = true;
    document.getElementById("mc-submit-btn").disabled = true;
    document.getElementById("mc-hint-btn").disabled = true;
    document.getElementById("mc-next-clue-btn").disabled = true;
    document.getElementById("mc-answer-reveal").style.display = "block";
    document.getElementById("mc-action-buttons").style.display = "none";
    document.getElementById("mc-reveal-name").textContent = player.name;
    document.getElementById("mc-reveal-info").textContent = player.info;
  }
}

function mcSkipPlayer() {
  var player = mcShuffledPlayers[mcCurrentIndex];
  mcPlayersGuessed++;
  document.getElementById("mc-guess-input").disabled = true;
  document.getElementById("mc-submit-btn").disabled = true;
  document.getElementById("mc-hint-btn").disabled = true;
  document.getElementById("mc-next-clue-btn").disabled = true;
  document.getElementById("mc-answer-reveal").style.display = "block";
  document.getElementById("mc-action-buttons").style.display = "none";
  document.getElementById("mc-reveal-name").textContent = player.name;
  document.getElementById("mc-reveal-info").textContent = player.info;
}

function mcNextPlayer() {
  mcCurrentIndex++;
  mcLoadPlayer();
}

function mcShowFinalResult() {
  document.getElementById("mc-game-container").querySelector(".mc-clue-card").style.display = "none";
  document.getElementById("mc-game-container").querySelector(".mc-guess-area").style.display = "none";
  document.getElementById("mc-game-container").querySelector(".mc-action-buttons").style.display = "none";
  document.getElementById("mc-game-container").querySelector(".mc-player-progress").style.display = "none";
  document.getElementById("mc-answer-reveal").style.display = "none";
  var finalDiv = document.getElementById("mc-final-result");
  finalDiv.style.display = "block";
  document.getElementById("mc-final-score").textContent = mcTotalScore;
  var maxPossible = mcShuffledPlayers.length * 10;
  var pct = Math.round((mcTotalScore / maxPossible) * 100);
  var tier = "";
  if (pct >= 90) tier = "Cricket Legend!";
  else if (pct >= 70) tier = "Expert Fan!";
  else if (pct >= 50) tier = "Good Player!";
  else tier = "Keep Learning!";
  document.getElementById("mc-final-title").textContent = tier;
  document.getElementById("mc-final-details").innerHTML =
    "Correct: " + mcCorrectGuesses + " / " + mcShuffledPlayers.length + "<br>" +
    "Accuracy: " + pct + "%<br>" +
    "Max possible score: " + maxPossible;
  mcSaveBestScore(mcTotalScore);
}

function mcSaveBestScore(score) {
  try {
    var best = parseInt(localStorage.getItem("wch_mystery_best")) || 0;
    if (score > best) {
      localStorage.setItem("wch_mystery_best", score);
    }
  } catch(e) {}
}

// Start Mystery Cricketer on page load
mcStartNewGame();

// Start
loadMatches();
loadSchedule();
loadLiveMatches();