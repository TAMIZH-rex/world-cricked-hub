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

// Start
loadMatches();
loadSchedule();
loadLiveMatches();