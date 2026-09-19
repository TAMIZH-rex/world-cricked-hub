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

// ================================
// SUB-NAVIGATION TABS
// (Explore & Playground panels)
// ================================
document.addEventListener("DOMContentLoaded", function() {
    var allSubNavs = document.querySelectorAll(".explore-sub-nav");
    allSubNavs.forEach(function(nav) {
        var buttons = nav.querySelectorAll(".explore-sub-btn");
        buttons.forEach(function(btn) {
            btn.addEventListener("click", function() {
                var targetId = this.getAttribute("data-target");
                // Deactivate all buttons in this nav
                buttons.forEach(function(b) { b.classList.remove("active"); });
                this.classList.add("active");
                // Find parent section
                var section = nav.parentElement;
                // Hide all panels in this section
                var panels = section.querySelectorAll(".explore-panel");
                panels.forEach(function(p) { p.classList.remove("active"); });
                // Show target panel
                var target = document.getElementById(targetId);
                if (target) target.classList.add("active");
            });
        });
    });
});

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

// ========================================
// PLAYGROUND NAVIGATION
// ========================================
function pgOpenGame(gameId) {
    var landing = document.getElementById("pg-landing");
    var panels = document.querySelectorAll("#playground .explore-panel");
    if (landing) landing.style.display = "none";
    panels.forEach(function(p) { p.style.display = "none"; });
    var gameMap = {
        "30sec": "t30c-container",
        "battle": "fb-container",
        "mission": "cm-container",
        "btxi": "btxi-container",
        "dna": "dna-container",
        "streak": "streak-container",
        "predictions": "pred-container"
    };
    var targetId = gameMap[gameId];
    if (targetId) {
        var el = document.getElementById(targetId);
        if (el) el.style.display = "block";
    } else {
        var future = document.getElementById("play-future");
        if (future) future.style.display = "block";
    }
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
}
function pgBackToLanding() {
    t30cStopTimer();
    predStopCD();
    var landing = document.getElementById("pg-landing");
    var panels = document.querySelectorAll("#playground .explore-panel");
    var games = document.querySelectorAll("#playground .pg-game-container, #t30c-container, #fb-container, #cm-container, #btxi-container, #dna-container, #streak-container, #pred-container");
    if (landing) landing.style.display = "";
    panels.forEach(function(p) { p.style.display = ""; });
    games.forEach(function(g) { g.style.display = "none"; });
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
}

// ========================================
// 30 SECOND CRICKET
// ========================================
var t30cQuestions = [
    { q: "How many players are on a cricket field at a time per team?", o: ["9","10","11","12"], a: 2 },
    { q: "What is a 'golden duck' in cricket?", o: ["Out on the first ball faced","Out on the last ball of innings","Scoring 6 runs","Taking 5 wickets"], a: 0 },
    { q: "Who holds the record for most Test centuries?", o: ["Virat Kohli","Brian Lara","Sachin Tendulkar","Ricky Ponting"], a: 2 },
    { q: "What does LBW stand for?", o: ["Long Ball Wicket","Leg Before Wicket","Late Bat Walk","Low Bounce Win"], a: 1 },
    { q: "Which country won the 2023 ODI World Cup?", o: ["India","Australia","England","South Africa"], a: 1 },
    { q: "What is a 'hat-trick' in cricket?", o: ["3 sixes in a row","3 wickets in 3 consecutive balls","3 centuries in a series","3 catches in one over"], a: 1 },
    { q: "How many overs are in a T20 innings?", o: ["10","20","50","60"], a: 1 },
    { q: "Who is known as the 'Wall' of cricket?", o: ["Sachin Tendulkar","Rahul Dravid","VVS Laxman","Anil Kumble"], a: 1 },
    { q: "What is a ' Yorker' delivery?", o: ["A bouncer","A delivery at the batsman's feet","A googly","A slow ball"], a: 1 },
    { q: "Which team has won the most ODI World Cups?", o: ["India","England","Australia","West Indies"], a: 2 },
    { q: "What is a 'Duckworth-Lewis' method?", o: ["Batting strategy","Rain interruption calculation","Bowling technique","Fielding formation"], a: 1 },
    { q: "Who bowled the 'Ball of the Century' to Mike Gatting?", o: ["Anil Kumble","Shane Warne","Muttiah Muralitharan","Saqlain Mushtaq"], a: 1 },
    { q: "What is the maximum runs a batsman can score off one ball (no extras)?", o: ["4","5","6","7"], a: 2 },
    { q: "Which country hosted the 2023 Cricket World Cup?", o: ["England","Australia","India","New Zealand"], a: 2 },
    { q: "What is a 'nightwatchman' in cricket?", o: ["The wicketkeeper","A lower-order batsman sent in early","The umpire","The coach"], a: 1 },
    { q: "Who has the most wickets in Test cricket history?", o: ["Shane Warne","Anil Kumble","Muttiah Muralitharan","James Anderson"], a: 2 },
    { q: "What does 'DRS' stand for in cricket?", o: ["Decision Review System","Direct Running Score","Dual Reference Strike","Daily Record Stat"], a: 0 },
    { q: "How many runs is a 'super over' target set at?", o: ["The last over's runs","The losing team's total","Random","6 runs"], a: 1 },
    { q: "Who scored the fastest Test double century?", o: ["Virender Sehwag","Brian Lara","Brendon McCullum","Chris Gayle"], a: 0 },
    { q: "What is a 'slip' fielder?", o: ["A fielder near the keeper","A bowler who slips","The umpire","A batsman"], a: 0 },
    { q: "Which IPL team has won the most titles?", o: ["Chennai Super Kings","Mumbai Indians","Kolkata Knight Riders","Rajasthan Royals"], a: 1 },
    { q: "What does 'Maiden over' mean?", o: ["An over with no runs scored","An over with no wickets","An over bowled by a woman","An over with all dots"], a: 0 },
    { q: "Who is the highest run-scorer in ODI cricket?", o: ["Sachin Tendulkar","Virat Kohli","Ricky Ponting","Kumar Sangakkara"], a: 0 },
    { q: "What is a 'bouncer' in cricket?", o: ["A full toss","A short-pitched delivery aimed at the head","A yorker","An off-spin delivery"], a: 1 },
    { q: "Which team won the inaugural T20 World Cup in 2007?", o: ["India","Australia","Pakistan","South Africa"], a: 0 },
    { q: "What is the term for a batsman scoring 50 runs?", o: ["Half-century","Century","Double century","Milestone"], a: 0 },
    { q: "Who is called 'Captain Cool'?", o: ["Ricky Ponting","MS Dhoni","Virat Kohli","Eoin Morgan"], a: 1 },
    { q: "How many balls are in a standard over?", o: ["4","5","6","8"], a: 2 },
    { q: "What is a 'flipper' delivery?", o: ["A topspinner","A back-spinner from a leg-spinner","A fast yorker","A slower ball"], a: 1 },
    { q: "Who has scored the most international centuries?", o: ["Virat Kohli","Sachin Tendulkar","Ricky Ponting","Kumar Sangakkara"], a: 1 },
    { q: "What is 'follow-on' in Test cricket?", o: ["Batting second again","Batting again immediately after being bowled out","A bowling strategy","A fielding position"], a: 1 },
    { q: "Which country is cricket's 'Barmy Army' associated with?", o: ["Australia","India","England","South Africa"], a: 2 },
    { q: "What is a 'chinaman' delivery?", o: ["A straight ball","A left-arm wrist spinner's delivery","A bouncer","A yorker"], a: 1 },
    { q: "Who was the first player to score 10,000 Test runs?", o: ["Sunil Gavaskar","Allan Border","Sachin Tendulkar","Ricky Ponting"], a: 1 },
    { q: "What is a 'sledging' in cricket?", o: ["Batting technique","Verbal intimidation of opponents","Bowling strategy","Fielding drill"], a: 1 }
];
var t30cTimer = null;
var t30cTimeLeft = 30;
var t30cScore = 0;
var t30cAnswered = 0;
var t30cCurrentQ = 0;
var t30cShuffled = [];
var t30cTotalQ = 35;
function t30cShuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}
function t30cStart() {
    t30cStopTimer();
    t30cShuffled = t30cShuffle(t30cQuestions).slice(0, t30cTotalQ);
    t30cCurrentQ = 0;
    t30cScore = 0;
    t30cAnswered = 0;
    t30cTimeLeft = 30;
    document.getElementById("t30c-start").style.display = "none";
    document.getElementById("t30c-result").style.display = "none";
    document.getElementById("t30c-game").style.display = "block";
    document.getElementById("t30c-time").textContent = "30";
    document.getElementById("t30c-time").classList.remove("t30c-urgent");
    document.getElementById("t30c-score").textContent = "0";
    document.getElementById("t30c-qnum").textContent = "1";
    document.getElementById("t30c-progress-fill").style.width = "0%";
    document.getElementById("t30c-feedback").textContent = "";
    t30cShowQuestion();
    t30cTimer = setInterval(function() {
        t30cTimeLeft--;
        document.getElementById("t30c-time").textContent = t30cTimeLeft;
        if (t30cTimeLeft <= 10) document.getElementById("t30c-time").classList.add("t30c-urgent");
        var pct = ((30 - t30cTimeLeft) / 30) * 100;
        document.getElementById("t30c-progress-fill").style.width = pct + "%";
        if (t30cTimeLeft <= 0) t30cEndGame();
    }, 1000);
}
function t30cStopTimer() {
    if (t30cTimer) { clearInterval(t30cTimer); t30cTimer = null; }
}
function t30cShowQuestion() {
    if (t30cCurrentQ >= t30cShuffled.length) { t30cEndGame(); return; }
    var q = t30cShuffled[t30cCurrentQ];
    document.getElementById("t30c-question").textContent = q.q;
    document.getElementById("t30c-qnum").textContent = t30cCurrentQ + 1;
    document.getElementById("t30c-feedback").textContent = "";
    var html = "";
    q.o.forEach(function(opt, i) {
        html += '<button class="t30c-opt" onclick="t30cAnswer(' + i + ')">' + opt + '</button>';
    });
    document.getElementById("t30c-options").innerHTML = html;
}
function t30cAnswer(idx) {
    t30cStopTimer();
    var q = t30cShuffled[t30cCurrentQ];
    var btns = document.querySelectorAll(".t30c-opt");
    btns.forEach(function(b, i) {
        b.disabled = true;
        if (i === q.a) b.classList.add("t30c-correct");
        else if (i === idx && idx !== q.a) b.classList.add("t30c-wrong");
        else b.classList.add("t30c-dim");
    });
    var fb = document.getElementById("t30c-feedback");
    if (idx === q.a) {
        t30cScore++;
        document.getElementById("t30c-score").textContent = t30cScore;
        fb.style.color = "#4ade80";
        fb.textContent = "Correct!";
    } else {
        fb.style.color = "#f87171";
        fb.textContent = "Wrong! Answer: " + q.o[q.a];
    }
    t30cAnswered++;
    t30cCurrentQ++;
    setTimeout(function() {
        if (t30cTimeLeft > 0 && t30cCurrentQ < t30cShuffled.length) {
            t30cShowQuestion();
            t30cTimer = setInterval(function() {
                t30cTimeLeft--;
                document.getElementById("t30c-time").textContent = t30cTimeLeft;
                if (t30cTimeLeft <= 10) document.getElementById("t30c-time").classList.add("t30c-urgent");
                var pct = ((30 - t30cTimeLeft) / 30) * 100;
                document.getElementById("t30c-progress-fill").style.width = pct + "%";
                if (t30cTimeLeft <= 0) t30cEndGame();
            }, 1000);
        } else {
            t30cEndGame();
        }
    }, 800);
}
function t30cEndGame() {
    t30cStopTimer();
    document.getElementById("t30c-game").style.display = "none";
    document.getElementById("t30c-result").style.display = "block";
    document.getElementById("t30c-final-score").textContent = t30cScore;
    document.getElementById("t30c-final-answered").textContent = t30cAnswered;
    var pct = t30cAnswered > 0 ? Math.round((t30cScore / t30cAnswered) * 100) : 0;
    document.getElementById("t30c-final-pct").textContent = pct + "%";
    var icon = document.getElementById("t30c-result-icon");
    var title = document.getElementById("t30c-result-title");
    var sub = document.getElementById("t30c-result-sub");
    if (pct >= 80) { icon.innerHTML = '<i class="fa-solid fa-trophy" style="color:#fbbf24"></i>'; title.textContent = "Outstanding!"; sub.textContent = "You're a cricket genius!"; }
    else if (pct >= 60) { icon.innerHTML = '<i class="fa-solid fa-star" style="color:#818cf8"></i>'; title.textContent = "Great Job!"; sub.textContent = "Strong cricket knowledge!"; }
    else if (pct >= 40) { icon.innerHTML = '<i class="fa-solid fa-thumbs-up" style="color:#4ade80"></i>'; title.textContent = "Good Effort!"; sub.textContent = "Keep learning and improve!"; }
    else { icon.innerHTML = '<i class="fa-solid fa-face-smile" style="color:#f87171"></i>'; title.textContent = "Keep Trying!"; sub.textContent = "Practice makes perfect!"; }
    var best = parseInt(localStorage.getItem("wch_t30c_best")) || 0;
    if (t30cScore > best) {
        localStorage.setItem("wch_t30c_best", t30cScore);
        document.getElementById("t30c-best-banner").style.display = "flex";
        document.getElementById("t30c-best-val").textContent = t30cScore;
    } else {
        document.getElementById("t30c-best-banner").style.display = "none";
    }
}

// ========================================
// 🏏 BUILD THE XI
// ========================================

var btxiPlayers = [
    { id: "bt1", name: "Virat Kohli", role: "BAT", country: "IND", rating: 95 },
    { id: "bt2", name: "Rohit Sharma", role: "BAT", country: "IND", rating: 91 },
    { id: "bt3", name: "Joe Root", role: "BAT", country: "ENG", rating: 90 },
    { id: "bt4", name: "Kane Williamson", role: "BAT", country: "NZ", rating: 92 },
    { id: "bt5", name: "Steve Smith", role: "BAT", country: "AUS", rating: 91 },
    { id: "bt6", name: "Babar Azam", role: "BAT", country: "PAK", rating: 90 },
    { id: "bt7", name: "Marnus Labuschagne", role: "BAT", country: "AUS", rating: 88 },
    { id: "bt8", name: "Yashasvi Jaiswal", role: "BAT", country: "IND", rating: 85 },
    { id: "wl1", name: "Jos Buttler", role: "WK", country: "ENG", rating: 88 },
    { id: "wl2", name: "KL Rahul", role: "WK", country: "IND", rating: 87 },
    { id: "wl3", name: "Quinton de Kock", role: "WK", country: "SA", rating: 86 },
    { id: "wl4", name: "Alex Carey", role: "WK", country: "AUS", rating: 82 },
    { id: "ar1", name: "Ben Stokes", role: "AR", country: "ENG", rating: 92 },
    { id: "ar2", name: "Ravindra Jadeja", role: "AR", country: "IND", rating: 89 },
    { id: "ar3", name: "Shakib Al Hasan", role: "AR", country: "BAN", rating: 87 },
    { id: "ar4", name: "Hardik Pandya", role: "AR", country: "IND", rating: 84 },
    { id: "ar5", name: "Rashid Khan", role: "AR", country: "AFG", rating: 88 },
    { id: "bw1", name: "Jasprit Bumrah", role: "BOWL", country: "IND", rating: 94 },
    { id: "bw2", name: "Pat Cummins", role: "BOWL", country: "AUS", rating: 92 },
    { id: "bw3", name: "Trent Boult", role: "BOWL", country: "NZ", rating: 88 },
    { id: "bw4", name: "Shaheen Afridi", role: "BOWL", country: "PAK", rating: 89 },
    { id: "bw5", name: "Mohammed Siraj", role: "BOWL", country: "IND", rating: 85 },
    { id: "bw6", name: "Kagiso Rabada", role: "BOWL", country: "SA", rating: 89 },
    { id: "bw7", name: "Jofra Archer", role: "BOWL", country: "ENG", rating: 87 },
    { id: "bw8", name: "Nathan Lyon", role: "BOWL", country: "AUS", rating: 85 },
    { id: "bw9", name: "R Ashwin", role: "BOWL", country: "IND", rating: 88 },
    { id: "bw10", name: "Mark Wood", role: "BOWL", country: "ENG", rating: 83 }
];

var btxiSelected = [];
var btxiFilterRole = "all";

function btxiRoleClass(role) {
    return "btxi-role-" + role.toLowerCase();
}

function btxiRoleBadge(role) {
    return "btxi-role-badge-" + role.toLowerCase();
}

function btxiFilter(role) {
    btxiFilterRole = role;
    document.querySelectorAll(".btxi-filter-btn").forEach(function(btn) { btn.classList.remove("active"); });
    event.currentTarget.classList.add("active");
    btxiRenderPool();
}

function btxiRenderPool() {
    var list = document.getElementById("btxi-pool-list");
    if (!list) return;
    var filtered = btxiFilterRole === "all" ? btxiPlayers : btxiPlayers.filter(function(p) { return p.role === btxiFilterRole; });
    var html = "";
    filtered.forEach(function(p) {
        var inXi = btxiSelected.indexOf(p.id) !== -1;
        html += '<div class="btxi-player-card' + (inXi ? ' btxi-in-xi' : '') + '" onclick="btxiTogglePlayer(\'' + p.id + '\')">';
        html += '<div class="btxi-player-avatar ' + btxiRoleClass(p.role) + '">' + p.name.charAt(0) + '</div>';
        html += '<div class="btxi-player-info">';
        html += '<div class="btxi-player-name">' + p.name + '</div>';
        html += '<div class="btxi-player-meta"><span class="btxi-player-role ' + btxiRoleBadge(p.role) + '">' + p.role + '</span> ' + p.country + '</div>';
        html += '</div>';
        html += '<div class="btxi-player-rating">' + p.rating + '</div>';
        html += '</div>';
    });
    list.innerHTML = html || '<div class="btxi-empty">No players in this category</div>';
}

function btxiRenderSelected() {
    var list = document.getElementById("btxi-selected-list");
    var countEl = document.getElementById("btxi-count");
    if (!list) return;
    if (countEl) countEl.textContent = btxiSelected.length;

    if (btxiSelected.length === 0) {
        list.innerHTML = '<div class="btxi-empty">Select players from the pool →</div>';
    } else {
        var html = "";
        btxiSelected.forEach(function(pId, idx) {
            var p = btxiPlayers.find(function(pl) { return pl.id === pId; });
            if (!p) return;
            html += '<div class="btxi-sel-card">';
            html += '<div class="btxi-sel-num">' + (idx + 1) + '</div>';
            html += '<div class="btxi-sel-info">';
            html += '<div class="btxi-sel-name">' + p.name + '</div>';
            html += '<div class="btxi-sel-role">' + p.role + ' • ' + p.country + '</div>';
            html += '</div>';
            html += '<button class="btxi-sel-remove" onclick="btxiRemovePlayer(\'' + p.id + '\')"><i class="fa-solid fa-xmark"></i></button>';
            html += '</div>';
        });
        list.innerHTML = html;
    }

    btxiUpdateRequirements();
}

function btxiUpdateRequirements() {
    var counts = { BAT: 0, BOWL: 0, AR: 0, WK: 0 };
    btxiSelected.forEach(function(pId) {
        var p = btxiPlayers.find(function(pl) { return pl.id === pId; });
        if (p) counts[p.role]++;
    });

    var reqBat = document.getElementById("btxi-req-bat");
    var reqBowl = document.getElementById("btxi-req-bowl");
    var reqAr = document.getElementById("btxi-req-ar");
    var reqWk = document.getElementById("btxi-req-wk");
    if (reqBat) { reqBat.querySelector("span").textContent = counts.BAT; reqBat.className = "btxi-req" + (counts.BAT >= 3 ? " btxi-met" : ""); }
    if (reqBowl) { reqBowl.querySelector("span").textContent = counts.BOWL; reqBowl.className = "btxi-req" + (counts.BOWL >= 3 ? " btxi-met" : ""); }
    if (reqAr) { reqAr.querySelector("span").textContent = counts.AR; reqAr.className = "btxi-req" + (counts.AR >= 1 ? " btxi-met" : ""); }
    if (reqWk) { reqWk.querySelector("span").textContent = counts.WK; reqWk.className = "btxi-req" + (counts.WK === 1 ? " btxi-met" : ""); }

    var valid = btxiSelected.length === 11 && counts.BAT >= 3 && counts.BOWL >= 3 && counts.AR >= 1 && counts.WK === 1;
    var btn = document.getElementById("btxi-submit-btn");
    if (btn) btn.disabled = !valid;
}

function btxiTogglePlayer(playerId) {
    var idx = btxiSelected.indexOf(playerId);
    if (idx !== -1) {
        btxiSelected.splice(idx, 1);
    } else {
        if (btxiSelected.length >= 11) {
            alert("You can only select 11 players!");
            return;
        }
        var player = btxiPlayers.find(function(p) { return p.id === playerId; });
        if (player && player.role === "WK") {
            var wkCount = btxiSelected.filter(function(pId) {
                var pl = btxiPlayers.find(function(p) { return p.id === pId; });
                return pl && pl.role === "WK";
            }).length;
            if (wkCount >= 1) {
                alert("You can only select 1 wicketkeeper!");
                return;
            }
        }
        btxiSelected.push(playerId);
    }
    btxiRenderPool();
    btxiRenderSelected();
}

function btxiRemovePlayer(playerId) {
    var idx = btxiSelected.indexOf(playerId);
    if (idx !== -1) btxiSelected.splice(idx, 1);
    btxiRenderPool();
    btxiRenderSelected();
}

function btxiClearAll() {
    btxiSelected = [];
    btxiRenderPool();
    btxiRenderSelected();
}

function btxiSubmit() {
    if (btxiSelected.length !== 11) return;
    var counts = { BAT: 0, BOWL: 0, AR: 0, WK: 0 };
    var totalRating = 0;
    btxiSelected.forEach(function(pId) {
        var p = btxiPlayers.find(function(pl) { return pl.id === pId; });
        if (p) { counts[p.role]++; totalRating += p.rating; }
    });
    if (counts.BAT < 3 || counts.BOWL < 3 || counts.AR < 1 || counts.WK !== 1) {
        alert("Please meet all role requirements before submitting!");
        return;
    }

    var avgRating = Math.round(totalRating / 11);
    document.querySelector(".btxi-layout").style.display = "none";
    document.querySelector(".btxi-role-filter").style.display = "none";
    document.getElementById("btxi-result").style.display = "block";

    var icon = document.getElementById("btxi-result-icon");
    var title = document.getElementById("btxi-result-title");
    var sub = document.getElementById("btxi-result-sub");

    if (avgRating >= 90) { icon.innerHTML = '<i class="fa-solid fa-trophy" style="color:#fbbf24"></i>'; title.textContent = "Legendary XI!"; sub.textContent = "An absolutely world-class squad!"; }
    else if (avgRating >= 87) { icon.innerHTML = '<i class="fa-solid fa-star" style="color:#818cf8"></i>'; title.textContent = "Strong XI!"; sub.textContent = "A well-balanced, competitive team!"; }
    else { icon.innerHTML = '<i class="fa-solid fa-thumbs-up" style="color:#4ade80"></i>'; title.textContent = "Good XI!"; sub.textContent = "A solid team with good balance!"; }

    document.getElementById("btxi-score-bat").textContent = counts.BAT;
    document.getElementById("btxi-score-bowl").textContent = counts.BOWL;
    document.getElementById("btxi-score-ar").textContent = counts.AR;
    document.getElementById("btxi-score-wk").textContent = counts.WK;
    document.getElementById("btxi-score-rating").textContent = avgRating;

    var display = document.getElementById("btxi-xi-display");
    var html = "";
    btxiSelected.forEach(function(pId, idx) {
        var p = btxiPlayers.find(function(pl) { return pl.id === pId; });
        if (!p) return;
        var roleColors = { BAT: "btxi-role-badge-bat", BOWL: "btxi-role-badge-bowl", AR: "btxi-role-badge-ar", WK: "btxi-role-badge-wk" };
        html += '<div class="btxi-xi-row">';
        html += '<div class="btxi-xi-num">' + (idx + 1) + '</div>';
        html += '<div class="btxi-xi-name">' + p.name + '</div>';
        html += '<span class="btxi-xi-role-tag ' + (roleColors[p.role] || '') + '">' + p.role + '</span>';
        html += '</div>';
    });
    display.innerHTML = html;

    // Track mission
    if (typeof cmTrackGamePlay === "function") cmTrackGamePlay();
}

function btxiStartOver() {
    btxiSelected = [];
    document.querySelector(".btxi-layout").style.display = "";
    document.querySelector(".btxi-role-filter").style.display = "";
    document.getElementById("btxi-result").style.display = "none";
    btxiRenderPool();
    btxiRenderSelected();
}

btxiRenderPool();
btxiRenderSelected();

// ========================================
// 🧬 CRICKET DNA
// ========================================

var dnaQuestions = [
    {
        q: "You're watching a match. What do you enjoy most?",
        opts: [
            { text: "A batsman playing aggressive strokes", types: { BAT: 3, STRAT: 0, FAN: 1 } },
            { text: "A bowler taking a wicket with a perfect delivery", types: { BOWL: 3, STRAT: 1, FAN: 0 } },
            { text: "A captain making smart field changes", types: { STRAT: 3, ALL: 1, FAN: 0 } },
            { text: "The atmosphere and crowd cheering", types: { FAN: 3, EXP: 1, ALL: 0 } }
        ]
    },
    {
        q: "Pick a cricket moment that excites you most:",
        opts: [
            { text: "A massive six over the stands", types: { BAT: 3, FAN: 1 } },
            { text: "A hat-trick by a fast bowler", types: { BOWL: 3, FAN: 1 } },
            { text: "A run-out from the deep to save a boundary", types: { ALL: 2, STRAT: 2 } },
            { text: "Exploring stats and records from old matches", types: { EXP: 3, STRAT: 1 } }
        ]
    },
    {
        q: "Your friend asks you to explain cricket. You start with:",
        opts: [
            { text: "The art of batting — footwork, timing, shots", types: { BAT: 3, EXP: 0 } },
            { text: "How different bowlers attack with pace and spin", types: { BOWL: 3, EXP: 0 } },
            { text: "The tactics — field placements, declarations, reviews", types: { STRAT: 3, EXP: 0 } },
            { text: "The history — legendary matches and players", types: { EXP: 3, FAN: 1 } }
        ]
    },
    {
        q: "If you could play one role in a cricket team, it would be:",
        opts: [
            { text: "Opening batsman — setting the tone", types: { BAT: 3 } },
            { text: "Strike bowler — destroying the opposition", types: { BOWL: 3 } },
            { text: "All-rounder — contributing with bat and ball", types: { ALL: 3 } },
            { text: "Captain — leading from the front", types: { STRAT: 3 } }
        ]
    },
    {
        q: "You're building a fantasy cricket team. You优先 pick:",
        opts: [
            { text: "The top run-scorer of the tournament", types: { BAT: 2, EXP: 1 } },
            { text: "The leading wicket-taker", types: { BOWL: 2, EXP: 1 } },
            { text: "A versatile all-rounder", types: { ALL: 3, STRAT: 0 } },
            { text: "The player with the best strike rate", types: { BAT: 1, STRAT: 2 } }
        ]
    },
    {
        q: "Which cricket format do you prefer?",
        opts: [
            { text: "Test cricket — the ultimate challenge", types: { STRAT: 2, EXP: 2 } },
            { text: "ODI — balanced battles", types: { ALL: 2, FAN: 1 } },
            { text: "T20 — pure entertainment and power", types: { BAT: 2, FAN: 2 } },
            { text: "I love them all equally!", types: { FAN: 2, EXP: 1, ALL: 1 } }
        ]
    },
    {
        q: "How do you enjoy cricket content?",
        opts: [
            { text: "Watching live matches with friends", types: { FAN: 3 } },
            { text: "Analyzing scores, stats, and records", types: { EXP: 3, STRAT: 0 } },
            { text: "Playing fantasy cricket and quizzes", types: { ALL: 2, EXP: 1 } },
            { text: "Debating the GOAT with fellow fans", types: { FAN: 2, STRAT: 1 } }
        ]
    },
    {
        q: "Final question — what makes cricket special to you?",
        opts: [
            { text: "The skill and technique of batsmen", types: { BAT: 3 } },
            { text: "The mind games between bowler and batter", types: { BOWL: 2, STRAT: 2 } },
            { text: "The way it brings people together", types: { FAN: 3 } },
            { text: "Its rich history and endless records", types: { EXP: 3 } }
        ]
    }
];

var dnaTypes = {
    BAT: { name: "The Batter", icon: "🏏", color: "#6366f1", desc: "You live for the art of batting. Timing, footwork, and elegant stroke-play define your cricket soul. You appreciate the beauty of a well-timed cover drive and the aggression of a power hitter.", traits: ["Aggressive", "Timing-focused", "Run-machine", "Shot-maker"], compat: "Bowler" },
    BOWL: { name: "The Bowler", icon: "🎯", color: "#ef4444", desc: "You thrive on the thrill of taking wickets. Whether it's pace, spin, or swing, you understand the art of deception and the joy of beating the bat. Every delivery is a battle.", traits: ["Wicket-taker", "Deceptive", "Aggressive", "Precision"], compat: "Batsman" },
    ALL: { name: "The All-Rounder", icon: "⚡", color: "#f97316", desc: "You're the complete package — contributing with both bat and ball. You're versatile, adaptable, and always ready to step up when the team needs you most.", traits: ["Versatile", "Team-player", "Adaptable", "Reliable"], compat: "Captain" },
    STRAT: { name: "The Strategist", icon: "🧠", color: "#8b5cf6", desc: "You see cricket as a chess match. Field placements, bowling changes, declarations — you love the tactical side of the game. A captain's mind in a player's body.", traits: ["Tactical", "Analytical", "Calm", "Leader"], compat: "All-Rounder" },
    EXP: { name: "The Explorer", icon: "🔍", color: "#22c55e", desc: "You're a cricket historian and stat-lover. You dive deep into records, eras, and legendary moments. Cricket's past excites you as much as its present.", traits: ["Curious", "Knowledgeable", "Detail-oriented", "Historian"], compat: "Strategist" },
    FAN: { name: "The Fan", icon: "❤️", color: "#ec4899", desc: "You're the heart and soul of cricket. The atmosphere, the emotions, the shared joy — you love cricket for the way it connects people and creates unforgettable moments.", traits: ["Passionate", "Emotional", "Social", "Loyal"], compat: "Explorer" }
};

var dnaCurrentQ = 0;
var dnaScores = { BAT: 0, BOWL: 0, ALL: 0, STRAT: 0, EXP: 0, FAN: 0 };

function dnaStart() {
    dnaCurrentQ = 0;
    dnaScores = { BAT: 0, BOWL: 0, ALL: 0, STRAT: 0, EXP: 0, FAN: 0 };
    document.getElementById("dna-quiz").style.display = "block";
    document.getElementById("dna-result").style.display = "none";
    dnaRenderQuestion();
}

function dnaRenderQuestion() {
    if (dnaCurrentQ >= dnaQuestions.length) { dnaShowResult(); return; }
    var q = dnaQuestions[dnaCurrentQ];
    document.getElementById("dna-qnum").textContent = dnaCurrentQ + 1;
    document.getElementById("dna-question").textContent = q.q;
    var pct = (dnaCurrentQ / dnaQuestions.length) * 100;
    document.getElementById("dna-progress-fill").style.width = pct + "%";
    var html = "";
    q.opts.forEach(function(opt, i) {
        html += '<button class="dna-opt" onclick="dnaAnswer(' + i + ')">' + opt.text + '</button>';
    });
    document.getElementById("dna-options").innerHTML = html;
}

function dnaAnswer(idx) {
    var q = dnaQuestions[dnaCurrentQ];
    var chosen = q.opts[idx];
    // Add scores
    var types = chosen.types;
    for (var key in types) {
        if (types.hasOwnProperty(key)) dnaScores[key] += types[key];
    }
    dnaCurrentQ++;
    setTimeout(dnaRenderQuestion, 300);
}

function dnaShowResult() {
    document.getElementById("dna-quiz").style.display = "none";
    document.getElementById("dna-result").style.display = "block";
    // Find dominant type
    var maxScore = 0;
    var dominantType = "FAN";
    for (var key in dnaScores) {
        if (dnaScores[key] > maxScore) {
            maxScore = dnaScores[key];
            dominantType = key;
        }
    }
    var type = dnaTypes[dominantType];
    document.getElementById("dna-result-icon").innerHTML = '<span style="font-size:64px">' + type.icon + '</span>';
    document.getElementById("dna-result-title").textContent = "Your Cricket DNA";
    document.getElementById("dna-result-type").textContent = type.name;
    document.getElementById("dna-result-type").style.color = type.color;
    document.getElementById("dna-result-desc").textContent = type.desc;
    // Traits
    var traitsHtml = "";
    type.traits.forEach(function(t) {
        traitsHtml += '<div class="dna-trait">' + t + '</div>';
    });
    document.getElementById("dna-traits").innerHTML = traitsHtml;
    // Compatibility
    document.getElementById("dna-compat").innerHTML = '<div class="dna-compat-label">Best Teammate Compatibility</div><div class="dna-compat-val">🤝 ' + type.compat + '</div>';
    // Track mission
    if (typeof cmTrackGamePlay === "function") cmTrackGamePlay();
    if (typeof cmCompleteMission === "function") cmCompleteMission("cm_quiz");
}

dnaStart();

// ========================================
// 🔥 CRICKET STREAK
// ========================================

var streakQuestions = [
    { q: "Who won the 2023 ODI Cricket World Cup?", o: ["India","Australia","England","South Africa"], a: 1 },
    { q: "How many runs is a 'six' worth in cricket?", o: ["4","5","6","8"], a: 2 },
    { q: "What does LBW stand for?", o: ["Leg Before Wicket","Long Ball Wicket","Late Bat Walk","Low Bounce Win"], a: 0 },
    { q: "Who is known as the 'God of Cricket'?", o: ["Virat Kohli","Sachin Tendulkar","MS Dhoni","Kapil Dev"], a: 1 },
    { q: "How many overs in a T20 innings?", o: ["10","20","50","60"], a: 1 },
    { q: "Which country won the 2011 Cricket World Cup?", o: ["Australia","India","Sri Lanka","Pakistan"], a: 1 },
    { q: "What is a 'hat-trick' in cricket?", o: ["3 sixes in a row","3 wickets in 3 consecutive balls","3 centuries in a series","3 catches in one over"], a: 1 },
    { q: "Who captained India to the 2011 World Cup victory?", o: ["Virat Kohli","Sourav Ganguly","MS Dhoni","Kapil Dev"], a: 2 },
    { q: "What is a 'maiden over'?", o: ["An over with no runs scored","An over with no wickets","An over bowled by a woman","An over with all dots"], a: 0 },
    { q: "Who has scored the most international centuries?", o: ["Virat Kohli","Sachin Tendulkar","Ricky Ponting","Kumar Sangakkara"], a: 1 },
    { q: "Which team has won the most ODI World Cups?", o: ["India","England","Australia","West Indies"], a: 2 },
    { q: "What is a 'bouncer' in cricket?", o: ["A full toss","A short-pitched delivery at the head","A yorker","An off-spin delivery"], a: 1 },
    { q: "Who is called 'Captain Cool'?", o: ["Ricky Ponting","MS Dhoni","Virat Kohli","Eoin Morgan"], a: 1 },
    { q: "How many players per team on a cricket field?", o: ["9","10","11","12"], a: 2 },
    { q: "What does 'DRS' stand for?", o: ["Decision Review System","Direct Running Score","Dual Reference Strike","Daily Record Stat"], a: 0 },
    { q: "Which country won the first T20 World Cup in 2007?", o: ["India","Australia","Pakistan","South Africa"], a: 0 },
    { q: "What is a 'nightwatchman' in cricket?", o: ["The wicketkeeper","A lower-order batsman sent in early","The umpire","The coach"], a: 1 },
    { q: "Who bowled the 'Ball of the Century' to Mike Gatting?", o: ["Anil Kumble","Shane Warne","Muralitharan","Saqlain Mushtaq"], a: 1 },
    { q: "What is a 'slip' fielder?", o: ["A fielder near the keeper","A bowler who slips","The umpire","A batsman"], a: 0 },
    { q: "Which team won the 2023 Ashes?", o: ["England","Australia","Drawn","India"], a: 2 },
    { q: "What is a 'yorker' delivery?", o: ["A bouncer","A full delivery at the batsman's feet","A googly","A slower ball"], a: 1 },
    { q: "Who is the highest run-scorer in ODI cricket?", o: ["Virat Kohli","Sachin Tendulkar","Ricky Ponting","Kumar Sangakkara"], a: 1 },
    { q: "How many balls in a standard over?", o: ["4","5","6","8"], a: 2 },
    { q: "What is a 'duck' in cricket?", o: ["Scoring 6 runs","Getting out for 0 runs","A type of delivery","A fielding position"], a: 1 },
    { q: "Who won the 2019 ODI World Cup?", o: ["New Zealand","England","India","Australia"], a: 1 },
    { q: "What is a 'googly'?", o: ["A fast ball","A leg-break that spins the other way","A bouncer","A full toss"], a: 1 },
    { q: "Which IPL team has won the most titles?", o: ["CSK","MI","KKR","RR"], a: 1 },
    { q: "What is a 'sledging' in cricket?", o: ["Batting technique","Verbal intimidation","Bowling strategy","Fielding drill"], a: 1 },
    { q: "Who is known as 'The Wall' of cricket?", o: ["Sachin Tendulkar","Rahul Dravid","VVS Laxman","Anil Kumble"], a: 1 },
    { q: "What is a 'flipper' delivery?", o: ["A topspinner","A back-spinner from a leg-spinner","A fast yorker","A slower ball"], a: 1 }
];

var streakDailyQs = 5;
var streakCurrentQ = 0;
var streakDailyCorrect = 0;
var streakTodayQuestions = [];

function streakGetKey() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

function streakGetData() {
    try {
        return JSON.parse(localStorage.getItem("wch_streak_data")) || { current: 0, best: 0, completedDates: [] };
    } catch(e) { return { current: 0, best: 0, completedDates: [] }; }
}

function streakSaveData(data) {
    localStorage.setItem("wch_streak_data", JSON.stringify(data));
}

function streakIsCompletedToday() {
    var data = streakGetData();
    return data.completedDates.indexOf(streakGetKey()) !== -1;
}

function streakHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function streakGenerateDaily() {
    var key = streakGetKey();
    var seed = streakHash(key);
    var indices = [];
    for (var i = 0; i < streakQuestions.length; i++) indices.push(i);
    // Fisher-Yates shuffle with seed
    for (var j = indices.length - 1; j > 0; j--) {
        seed = (seed * 16807 + 0) % 2147483647;
        var k = seed % (j + 1);
        var tmp = indices[j]; indices[j] = indices[k]; indices[k] = tmp;
    }
    streakTodayQuestions = indices.slice(0, streakDailyQs).map(function(i) { return streakQuestions[i]; });
}

function streakUpdateStats() {
    var data = streakGetData();
    var curEl = document.getElementById("streak-current");
    var bestEl = document.getElementById("streak-best");
    var totalEl = document.getElementById("streak-total");
    if (curEl) curEl.textContent = data.current;
    if (bestEl) bestEl.textContent = data.best;
    if (totalEl) totalEl.textContent = data.completedDates.length;
}

function streakRenderCalendar() {
    var cal = document.getElementById("streak-calendar");
    if (!cal) return;
    var data = streakGetData();
    var today = new Date();
    var html = "";
    for (var i = 13; i >= 0; i--) {
        var d = new Date(today);
        d.setDate(d.getDate() - i);
        var key = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
        var dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var isToday = i === 0;
        var isDone = data.completedDates.indexOf(key) !== -1;
        var cls = "streak-day";
        if (isToday) cls += " streak-today";
        if (isDone) cls += " streak-done";
        else if (i > 0) cls += " streak-missed";
        html += '<div class="' + cls + '">';
        html += '<div class="streak-day-name">' + dayNames[d.getDay()] + '</div>';
        html += '<div class="streak-day-num">' + d.getDate() + '</div>';
        html += '</div>';
    }
    cal.innerHTML = html;
}

function streakRender() {
    streakUpdateStats();
    streakRenderCalendar();
    var content = document.getElementById("streak-challenge-content");
    if (!content) return;

    if (streakIsCompletedToday()) {
        var data = streakGetData();
        content.innerHTML = '<div class="streak-done-card">' +
            '<div class="streak-done-icon">🔥</div>' +
            '<h2>Today\'s Challenge Complete!</h2>' +
            '<p>Come back tomorrow for a new challenge.</p>' +
            '<div class="streak-done-stats">' +
            '<div class="streak-done-stat"><span class="streak-done-stat-val">' + data.current + '</span><span class="streak-done-stat-label">Current Streak</span></div>' +
            '<div class="streak-done-stat"><span class="streak-done-stat-val">' + data.best + '</span><span class="streak-done-stat-label">Best Streak</span></div>' +
            '</div>' +
            '<div class="streak-done-actions">' +
            '<button onclick="pgBackToLanding()" class="streak-next-btn"><i class="fa-solid fa-arrow-left"></i> Back to Games</button>' +
            '</div></div>';
        return;
    }

    streakGenerateDaily();
    streakCurrentQ = 0;
    streakDailyCorrect = 0;
    streakShowQuestion();
}

function streakShowQuestion() {
    var content = document.getElementById("streak-challenge-content");
    if (!content) return;
    if (streakCurrentQ >= streakTodayQuestions.length) { streakFinishChallenge(); return; }
    var q = streakTodayQuestions[streakCurrentQ];
    var html = '<div class="streak-q-progress"><i class="fa-solid fa-fire"></i> Question ' + (streakCurrentQ+1) + ' of ' + streakDailyQs + ' — Answer all correctly to keep your streak!</div>';
    html += '<div class="streak-q-text">' + q.q + '</div>';
    html += '<div class="streak-q-opts">';
    q.o.forEach(function(opt, i) {
        html += '<button class="streak-q-opt" onclick="streakAnswer(' + i + ')">' + opt + '</button>';
    });
    html += '</div>';
    html += '<div class="streak-feedback" id="streak-feedback"></div>';
    content.innerHTML = html;
}

function streakAnswer(idx) {
    var q = streakTodayQuestions[streakCurrentQ];
    var btns = document.querySelectorAll(".streak-q-opt");
    btns.forEach(function(b, i) {
        b.disabled = true;
        if (i === q.a) b.classList.add("streak-correct");
        else if (i === idx && idx !== q.a) b.classList.add("streak-wrong");
        else b.classList.add("streak-dim");
    });
    var fb = document.getElementById("streak-feedback");
    if (idx === q.a) {
        streakDailyCorrect++;
        fb.style.color = "#4ade80";
        fb.textContent = "Correct! 🔥";
    } else {
        fb.style.color = "#f87171";
        fb.textContent = "Wrong! Answer: " + q.o[q.a];
    }
    streakCurrentQ++;
    // Add next button
    var nextHtml = '<button class="streak-next-btn" onclick="streakShowQuestion()"><i class="fa-solid fa-arrow-right"></i> Next</button>';
    document.getElementById("streak-challenge-content").insertAdjacentHTML("beforeend", nextHtml);
}

function streakFinishChallenge() {
    var content = document.getElementById("streak-challenge-content");
    if (!content) return;
    var allCorrect = streakDailyCorrect === streakDailyQs;
    var data = streakGetData();

    if (allCorrect) {
        data.current++;
        if (data.current > data.best) data.best = data.current;
        var today = streakGetKey();
        if (data.completedDates.indexOf(today) === -1) data.completedDates.push(today);
        streakSaveData(data);
        // Track mission
        if (typeof cmTrackGamePlay === "function") cmTrackGamePlay();
    } else {
        // Wrong answers — break streak
        data.current = 0;
        streakSaveData(data);
    }

    streakUpdateStats();
    streakRenderCalendar();

    var icon = allCorrect ? "🏆" : "😢";
    var title = allCorrect ? "Streak Continues!" : "Streak Broken!";
    var sub = allCorrect ?
        "Perfect! You got all " + streakDailyQs + " correct. Come back tomorrow!" :
        "You got " + streakDailyCorrect + "/" + streakDailyQs + " correct. All 5 are needed to keep the streak.";

    content.innerHTML = '<div class="streak-done-card">' +
        '<div class="streak-done-icon">' + icon + '</div>' +
        '<h2>' + title + '</h2>' +
        '<p>' + sub + '</p>' +
        '<div class="streak-done-stats">' +
        '<div class="streak-done-stat"><span class="streak-done-stat-val">' + data.current + '</span><span class="streak-done-stat-label">Current Streak</span></div>' +
        '<div class="streak-done-stat"><span class="streak-done-stat-val">' + data.best + '</span><span class="streak-done-stat-label">Best Streak</span></div>' +
        '<div class="streak-done-stat"><span class="streak-done-stat-val">' + data.completedDates.length + '</span><span class="streak-done-stat-label">Days Played</span></div>' +
        '</div>' +
        '<div class="streak-done-actions">' +
        '<button onclick="pgBackToLanding()" class="streak-next-btn"><i class="fa-solid fa-arrow-left"></i> Back to Games</button>' +
        '</div></div>';
}

streakRender();

// ========================================
// ⚔️ FAN BATTLE
// Reuses existing /api/polls Supabase endpoints
// ========================================

var fbBattles = [
    {
        id: "fb-ind-vs-aus",
        question: "Who will dominate — India or Australia?",
        sideA: { id: "ind", name: "India", emoji: "🇮🇳" },
        sideB: { id: "aus", name: "Australia", emoji: "🇦🇺" }
    },
    {
        id: "fb-kohli-vs-sachin",
        question: "Greatest batsman of all time?",
        sideA: { id: "kohli", name: "Virat Kohli", emoji: "👑" },
        sideB: { id: "sachin", name: "Sachin Tendulkar", emoji: "🏏" }
    },
    {
        id: "fb-ind-vs-eng",
        question: "Who will win — India or England?",
        sideA: { id: "ind2", name: "India", emoji: "🇮🇳" },
        sideB: { id: "eng", name: "England", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    },
    {
        id: "fb-babar-vs-kohli",
        question: "Best modern-era batsman?",
        sideA: { id: "babar", name: "Babar Azam", emoji: "⭐" },
        sideB: { id: "kohli2", name: "Virat Kohli", emoji: "👑" }
    },
    {
        id: "fb-warne-vs-murali",
        question: "Greatest spinner of all time?",
        sideA: { id: "warne", name: "Shane Warne", emoji: "🧙" },
        sideB: { id: "murali", name: "Muralitharan", emoji: "🌀" }
    },
    {
        id: "fb-dhoni-vs-ponting",
        question: "Greatest captain ever?",
        sideA: { id: "dhoni", name: "MS Dhoni", emoji: "🛡️" },
        sideB: { id: "ponting", name: "Ricky Ponting", emoji: "🇦🇺" }
    }
];

var fbVotedBattles = {};

function fbGetVoted() {
    try { return JSON.parse(localStorage.getItem("wch_fb_voted")) || {}; }
    catch(e) { return {}; }
}

function fbSaveVoted(battleId) {
    var v = fbGetVoted();
    v[battleId] = true;
    localStorage.setItem("wch_fb_voted", JSON.stringify(v));
}

async function fbLoadBattles() {
    var container = document.getElementById("fb-battles-grid");
    if (!container) return;
    try {
        var response = await fetch("/api/polls");
        var result = await response.json();
        if (!result.success) {
            container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Failed to load battles.</p>';
            return;
        }
        var polls = result.polls;
        fbVotedBattles = fbGetVoted();
        var html = "";
        fbBattles.forEach(function(battle) {
            var poll = polls.find(function(p) { return p.id === battle.id; });
            if (!poll) return;
            var hasVoted = fbVotedBattles[battle.id] || false;
            html += '<div class="fb-battle-card" id="fb-card-' + battle.id + '">';
            html += '<div class="fb-battle-q">' + battle.question + '</div>';
            html += '<div class="fb-battle-sides">';
            var aPct = poll.options[0] ? poll.options[0].percentage : 0;
            var bPct = poll.options[1] ? poll.options[1].percentage : 0;
            html += '<div class="fb-side' + (hasVoted ? ' fb-voted' : '') + '" onclick="fbSelectSide(\'' + battle.id + '\',\'' + battle.sideA.id + '\')">';
            html += '<div class="fb-side-emoji">' + battle.sideA.emoji + '</div>';
            html += '<div class="fb-side-name">' + battle.sideA.name + '</div>';
            if (hasVoted) html += '<div style="font-size:20px;font-weight:900;color:#818cf8;margin-top:6px;">' + aPct + '%</div>';
            html += '</div>';
            html += '<div class="fb-vs">VS</div>';
            html += '<div class="fb-side' + (hasVoted ? ' fb-voted' : '') + '" onclick="fbSelectSide(\'' + battle.id + '\',\'' + battle.sideB.id + '\')">';
            html += '<div class="fb-side-emoji">' + battle.sideB.emoji + '</div>';
            html += '<div class="fb-side-name">' + battle.sideB.name + '</div>';
            if (hasVoted) html += '<div style="font-size:20px;font-weight:900;color:#f97316;margin-top:6px;">' + bPct + '%</div>';
            html += '</div>';
            html += '</div>';
            if (hasVoted) {
                html += '<div class="fb-results">';
                poll.options.forEach(function(opt, i) {
                    var barClass = i === 0 ? "fb-bar-a" : "fb-bar-b";
                    html += '<div class="fb-res-row">';
                    html += '<div class="fb-res-head"><span class="fb-res-name">' + opt.text + '</span><span class="fb-res-pct">' + opt.percentage + '%</span></div>';
                    html += '<div class="fb-res-bar-bg"><div class="fb-res-bar-fill ' + barClass + '" style="width:' + opt.percentage + '%"></div></div>';
                    html += '<div class="fb-res-votes">' + opt.votes + ' vote' + (opt.votes !== 1 ? 's' : '') + '</div>';
                    html += '</div>';
                });
                html += '<div class="fb-total"><i class="fa-solid fa-chart-simple"></i> Total: ' + poll.totalVotes + ' votes</div>';
                html += '</div>';
                html += '<div class="fb-voted-tag"><i class="fa-solid fa-check-circle"></i> You voted!</div>';
            } else {
                html += '<div class="fb-vote-label">Pick your side and vote!</div>';
                html += '<button class="fb-battle-btn" id="fb-btn-' + battle.id + '" onclick="fbSubmitVote(\'' + battle.id + '\')" disabled><i class="fa-solid fa-check-to-slot"></i> Vote</button>';
            }
            html += '</div>';
        });
        container.innerHTML = html;
    } catch(e) {
        container.innerHTML = '<p class="loading-spinner"><i class="fa-solid fa-circle-exclamation"></i> Unable to connect to voting server.</p>';
    }
}

var fbSelectedSide = {};

function fbSelectSide(battleId, sideId) {
    if (fbVotedBattles[battleId]) return;
    fbSelectedSide[battleId] = sideId;
    var card = document.getElementById("fb-card-" + battleId);
    if (!card) return;
    var sides = card.querySelectorAll(".fb-side");
    sides.forEach(function(s) { s.classList.remove("fb-selected"); });
    var battle = fbBattles.find(function(b) { return b.id === battleId; });
    if (battle) {
        if (sideId === battle.sideA.id) sides[0].classList.add("fb-selected");
        else sides[1].classList.add("fb-selected");
    }
    var btn = document.getElementById("fb-btn-" + battleId);
    if (btn) btn.disabled = false;
}

async function fbSubmitVote(battleId) {
    var selected = fbSelectedSide[battleId];
    if (!selected) return;
    var btn = document.getElementById("fb-btn-" + battleId);
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Voting...'; }
    var battle = fbBattles.find(function(b) { return b.id === battleId; });
    if (!battle) return;
    try {
        var response = await fetch("/api/polls");
        var result = await response.json();
        if (!result.success) throw new Error("Failed to load polls");
        var poll = result.polls.find(function(p) { return p.id === battleId; });
        if (!poll) throw new Error("Poll not found");
        var option = poll.options.find(function(o) {
            return o.text.toLowerCase().indexOf(selected.toLowerCase()) !== -1 ||
                   o.id.toLowerCase().indexOf(selected.toLowerCase()) !== -1;
        });
        if (!option) {
            var sideIndex = (selected === battle.sideA.id) ? 0 : 1;
            option = poll.options[sideIndex];
        }
        if (!option) throw new Error("Option not found");
        var token = fvaGetToken();
        var voteResponse = await fetch("/api/polls/" + battleId + "/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ optionId: option.id, token: token })
        });
        var voteResult = await voteResponse.json();
        if (voteResult.success || voteResult.alreadyVoted) {
            fbSaveVoted(battleId);
            fbLoadBattles();
            if (typeof cmCompleteMission === "function") cmCompleteMission("cm_battle");
            if (typeof cmTrackVote === "function") cmTrackVote();
        } else {
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i> Vote'; }
            alert(voteResult.error || "Failed to submit vote.");
        }
    } catch(e) {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i> Vote'; }
        alert("Unable to connect to server. Please try again.");
    }
}

fbLoadBattles();

// ========================================
// 🎯 CRICKET MISSION
// ========================================

var cmMissions = [
    { id: "cm_quiz", title: "Quiz Master", desc: "Complete one quiz in Explore", xp: 20, icon: "fa-brain", type: "daily" },
    { id: "cm_puzzle", title: "Puzzle Solver", desc: "Solve one puzzle in Explore", xp: 15, icon: "fa-puzzle-piece", type: "daily" },
    { id: "cm_30sec", title: "Speed Demon", desc: "Play 30 Second Cricket", xp: 25, icon: "fa-stopwatch", type: "daily" },
    { id: "cm_battle", title: "Fan Fighter", desc: "Cast a Fan Battle vote", xp: 10, icon: "fa-shield-halved", type: "daily" },
    { id: "cm_lastover", title: "Last Over Hero", desc: "Play the Last Over Challenge", xp: 20, icon: "fa-fire", type: "daily" },
    { id: "cm_play5games", title: "Playground Pro", desc: "Play any 5 Playground games", xp: 50, icon: "fa-gamepad", type: "weekly" },
    { id: "cm_vote3", title: "Democracy Voice", desc: "Cast 3 Fan Battle votes", xp: 30, icon: "fa-check-to-slot", type: "weekly" },
    { id: "cm_highscore", title: "Score Champion", desc: "Score 8+ in 30 Second Cricket", xp: 40, icon: "fa-trophy", type: "weekly" }
];

function cmGetData() {
    try { return JSON.parse(localStorage.getItem("wch_cm_data")) || { xp: 0, completed: {}, gamesPlayed: 0, votesCast: 0, highScores: [] }; }
    catch(e) { return { xp: 0, completed: {}, gamesPlayed: 0, votesCast: 0, highScores: [] }; }
}

function cmSaveData(data) {
    localStorage.setItem("wch_cm_data", JSON.stringify(data));
}

function cmIsCompleted(missionId) {
    var data = cmGetData();
    return data.completed[missionId] || false;
}

function cmCompleteMission(missionId) {
    var data = cmGetData();
    if (data.completed[missionId]) return;
    var mission = cmMissions.find(function(m) { return m.id === missionId; });
    if (!mission) return;
    data.completed[missionId] = true;
    data.xp += mission.xp;
    cmSaveData(data);
    cmRender();
    cmShowXpNotification(mission.title, mission.xp);
}

function cmShowXpNotification(title, xp) {
    var notif = document.createElement("div");
    notif.style.cssText = "position:fixed;top:80px;right:20px;background:rgba(34,197,94,0.95);color:white;padding:14px 20px;border-radius:12px;font-weight:700;font-size:14px;z-index:9999;box-shadow:0 8px 30px rgba(34,197,94,0.4);font-family:'Inter',sans-serif;display:flex;align-items:center;gap:8px;";
    notif.innerHTML = '<i class="fa-solid fa-star"></i> +' + xp + ' XP — ' + title + '!';
    document.body.appendChild(notif);
    setTimeout(function() { notif.remove(); }, 3000);
}

function cmTrackGamePlay() {
    var data = cmGetData();
    data.gamesPlayed = (data.gamesPlayed || 0) + 1;
    if (data.gamesPlayed >= 5 && !data.completed["cm_play5games"]) {
        data.completed["cm_play5games"] = true;
        data.xp += 50;
        cmShowXpNotification("Playground Pro", 50);
    }
    cmSaveData(data);
}

function cmTrackVote() {
    var data = cmGetData();
    data.votesCast = (data.votesCast || 0) + 1;
    if (data.votesCast >= 3 && !data.completed["cm_vote3"]) {
        data.completed["cm_vote3"] = true;
        data.xp += 30;
        cmShowXpNotification("Democracy Voice", 30);
    }
    cmSaveData(data);
}

function cmTrackHighScore(score) {
    var data = cmGetData();
    if (!data.highScores) data.highScores = [];
    data.highScores.push(score);
    if (score >= 8 && !data.completed["cm_highscore"]) {
        data.completed["cm_highscore"] = true;
        data.xp += 40;
        cmShowXpNotification("Score Champion", 40);
    }
    cmSaveData(data);
}

function cmRender() {
    var data = cmGetData();
    var xpEl = document.getElementById("cm-total-xp");
    if (xpEl) xpEl.textContent = data.xp;

    var dailyMissions = cmMissions.filter(function(m) { return m.type === "daily"; });
    var weeklyMissions = cmMissions.filter(function(m) { return m.type === "weekly"; });

    var dailyDone = dailyMissions.filter(function(m) { return data.completed[m.id]; }).length;
    var weeklyDone = weeklyMissions.filter(function(m) { return data.completed[m.id]; }).length;

    var ddEl = document.getElementById("cm-daily-done");
    var dtEl = document.getElementById("cm-daily-total");
    var wdEl = document.getElementById("cm-weekly-done");
    var wtEl = document.getElementById("cm-weekly-total");
    if (ddEl) ddEl.textContent = dailyDone;
    if (dtEl) dtEl.textContent = dailyMissions.length;
    if (wdEl) wdEl.textContent = weeklyDone;
    if (wtEl) wtEl.textContent = weeklyMissions.length;

    var dailyList = document.getElementById("cm-daily-list");
    if (dailyList) {
        var html = "";
        dailyMissions.forEach(function(m) {
            var done = data.completed[m.id] || false;
            html += '<div class="cm-mission' + (done ? ' cm-completed' : '') + '">';
            html += '<div class="cm-mission-icon"><i class="fa-solid ' + m.icon + '"></i></div>';
            html += '<div class="cm-mission-info">';
            html += '<div class="cm-mission-title">' + m.title + '</div>';
            html += '<div class="cm-mission-desc">' + m.desc + '</div>';
            html += '</div>';
            html += '<div class="cm-mission-xp">' + (done ? '<i class="fa-solid fa-check"></i> Done' : '+' + m.xp + ' XP') + '</div>';
            html += '</div>';
        });
        dailyList.innerHTML = html;
    }

    var weeklyList = document.getElementById("cm-weekly-list");
    if (weeklyList) {
        var html2 = "";
        weeklyMissions.forEach(function(m) {
            var done = data.completed[m.id] || false;
            html2 += '<div class="cm-mission' + (done ? ' cm-completed' : '') + '">';
            html2 += '<div class="cm-mission-icon"><i class="fa-solid ' + m.icon + '"></i></div>';
            html2 += '<div class="cm-mission-info">';
            html2 += '<div class="cm-mission-title">' + m.title + '</div>';
            html2 += '<div class="cm-mission-desc">' + m.desc + '</div>';
            html2 += '</div>';
            html2 += '<div class="cm-mission-xp">' + (done ? '<i class="fa-solid fa-check"></i> Done' : '+' + m.xp + ' XP') + '</div>';
            html2 += '</div>';
        });
        weeklyList.innerHTML = html2;
    }
}

cmRender();

// ========================================
// 🔮 PREDICTIONS
// ========================================

var predMatches = [
    {
        id: "pred-m1",
        teamA: { name: "India", short: "IND", flag: "🇮🇳", players: ["Virat Kohli","Rohit Sharma","Shubman Gill","Jasprit Bumrah","Kuldeep Yadav"] },
        teamB: { name: "Australia", short: "AUS", flag: "🇦🇺", players: ["Steve Smith","Travis Head","Pat Cummins","Mitchell Starc","Glenn Maxwell"] },
        venue: "MCG, Melbourne", type: "ODI",
        lockTime: Date.now() + 2 * 60 * 60 * 1000, result: null
    },
    {
        id: "pred-m2",
        teamA: { name: "England", short: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", players: ["Joe Root","Ben Stokes","Harry Brook","Jofra Archer","Mark Wood"] },
        teamB: { name: "South Africa", short: "SA", flag: "🇿🇦", players: ["Aiden Markram","Kagiso Rabada","David Miller","Quinton de Kock","Anrich Nortje"] },
        venue: "Lord's, London", type: "Test",
        lockTime: Date.now() - 30 * 60 * 1000, result: null
    },
    {
        id: "pred-m3",
        teamA: { name: "Pakistan", short: "PAK", flag: "🇵🇰", players: ["Babar Azam","Shaheen Afridi","Mohammad Rizwan","Fakhar Zaman","Haris Rauf"] },
        teamB: { name: "New Zealand", short: "NZ", flag: "🇳🇿", players: ["Kane Williamson","Trent Boult","Devon Conway","Tim Southee","Glenn Phillips"] },
        venue: "Eden Park, Auckland", type: "T20I",
        lockTime: Date.now() - 24 * 60 * 60 * 1000,
        result: { winner: "NZ", topBatter: "Kane Williamson", topBowler: "Trent Boult", player50Plus: true, scoreRange: "200-249" }
    }
];

var predCats = [
    { id: "winner", title: "Make Your Call", icon: "👀", desc: "Who's winning this one?" },
    { id: "topBatter", title: "Who'll Cook?", icon: "🔥", desc: "Who's smashing it today?" },
    { id: "topBowler", title: "Bowler Mode", icon: "⚡", desc: "Who's taking the most wickets?" },
    { id: "player50Plus", title: "50+ or Nah?", icon: "🎯", desc: "Will someone score a fifty?" },
    { id: "score", title: "Score Guess", icon: "📊", desc: "Predict the winning team's score" }
];

var predScoreRanges = ["Under 150", "150-199", "200-249", "250-299", "300+"];

var predBadgesDef = [
    { id: "first_pred", title: "First Timer", icon: "🎯", desc: "Make your first prediction", check: function(d) { return d.totalPredictions >= 1; } },
    { id: "hat_trick", title: "Hat-Trick Hero", icon: "🎩", desc: "3-day prediction streak", check: function(d) { return d.bestStreak >= 3; } },
    { id: "on_fire", title: "On Fire", icon: "🔥", desc: "5-day prediction streak", check: function(d) { return d.bestStreak >= 5; } },
    { id: "perfect_round", title: "Perfect Round", icon: "🏆", desc: "All 5 correct in one match", check: function(d) { return d.perfectRounds >= 1; } },
    { id: "oracle", title: "Oracle", icon: "🔮", desc: "15 correct predictions", check: function(d) { return d.totalCorrect >= 15; } },
    { id: "big_brain", title: "Big Brain", icon: "🧠", desc: "80%+ accuracy (min 10)", check: function(d) { return d.totalPredictions >= 10 && (d.totalCorrect / d.totalPredictions * 100) >= 80; } },
    { id: "streak_lord", title: "Streak Lord", icon: "👑", desc: "10-day streak", check: function(d) { return d.bestStreak >= 10; } },
    { id: "dedicated", title: "Dedicated Fan", icon: "❤️", desc: "Predict 5 different matches", check: function(d) { return d.totalMatchesPredicted >= 5; } }
];

var predLeaderboardData = [
    { name: "CricketKing99", xp: 1250, streak: 7, accuracy: 82, badge: "👑" },
    { name: "PitchReader", xp: 980, streak: 5, accuracy: 78, badge: "🧠" },
    { name: "SixerQueen", xp: 870, streak: 3, accuracy: 75, badge: "🔥" },
    { name: "BoundaryHunter", xp: 720, streak: 4, accuracy: 71, badge: "⚡" },
    { name: "T20Fanatic", xp: 650, streak: 2, accuracy: 68, badge: "🎯" }
];

var predCurrentMatchId = null;
var predCatIdx = 0;
var predCDTimer = null;

function predGetData() {
    try { return JSON.parse(localStorage.getItem("wch_pred_data")) || predDefData(); }
    catch(e) { return predDefData(); }
}
function predDefData() {
    return { xp:0, totalCorrect:0, totalPredictions:0, totalMatchesPredicted:0, perfectRounds:0, streak:0, bestStreak:0, lastPredDate:null, badges:[], predictions:{} };
}
function predSave(d) { localStorage.setItem("wch_pred_data", JSON.stringify(d)); }

function predMatchStatus(m) {
    if (m.result) return "completed";
    if (Date.now() >= m.lockTime) return "locked";
    return "upcoming";
}
function predFmtCD(ms) {
    if (ms <= 0) return "⏰ Locked";
    var s = Math.floor(ms/1000), h = Math.floor(s/3600); s %= 3600;
    var m = Math.floor(s/60); s %= 60;
    if (h > 0) return h + "h " + m + "m " + s + "s";
    return m + "m " + s + "s";
}

function predRender() {
    predRenderStats();
    predRenderMatchList();
    predRenderLeaderboard();
    predRenderBadges();
    predStartCD();
}

function predRenderStats() {
    var d = predGetData();
    var acc = d.totalPredictions > 0 ? Math.round(d.totalCorrect / d.totalPredictions * 100) : 0;
    var els = { "pred-xp": d.xp, "pred-streak": d.streak, "pred-acc": acc + "%", "pred-badge-count": d.badges.length };
    for (var k in els) { var el = document.getElementById(k); if (el) el.textContent = els[k]; }
}

function predRenderMatchList() {
    var c = document.getElementById("pred-match-list"); if (!c) return;
    var d = predGetData();
    var html = "";
    predMatches.forEach(function(match) {
        var st = predMatchStatus(match);
        var has = d.predictions[match.id] && d.predictions[match.id].submitted;
        html += '<div class="pred-match-card pred-st-' + st + '" onclick="predOpenMatch(\'' + match.id + '\')">';
        html += '<div class="pred-mc-top">';
        html += '<div class="pred-teams-row">';
        html += '<span class="pred-flag">' + match.teamA.flag + '</span><span class="pred-tname">' + match.teamA.short + '</span>';
        html += '<span class="pred-vs">VS</span>';
        html += '<span class="pred-tname">' + match.teamB.short + '</span><span class="pred-flag">' + match.teamB.flag + '</span>';
        html += '</div>';
        html += '<div class="pred-mc-meta">' + match.type + ' • ' + match.venue + '</div>';
        html += '</div><div class="pred-mc-bot">';
        if (st === "upcoming") {
            html += '<span class="pred-tag-open">Predictions Open 🔓</span>';
            html += '<span class="pred-cd-label" id="pred-cd-' + match.id + '">' + predFmtCD(match.lockTime - Date.now()) + '</span>';
        } else if (st === "locked") {
            html += '<span class="pred-tag-locked">🔒 Locked</span>';
            if (has) html += '<span class="pred-wait">Waiting for result...</span>';
        } else {
            html += '<span class="pred-tag-done">✅ Results out!</span>';
            if (has) {
                var sc = predCalcScore(match.id);
                html += '<span class="pred-resscore">' + sc.correct + '/5 correct</span>';
            }
        }
        html += '</div></div>';
    });
    c.innerHTML = html;
}

function predRenderLeaderboard() {
    var c = document.getElementById("pred-leaderboard"); if (!c) return;
    var d = predGetData();
    var acc = d.totalPredictions > 0 ? Math.round(d.totalCorrect / d.totalPredictions * 100) : 0;
    var all = predLeaderboardData.slice();
    all.push({ name: "You", xp: d.xp, streak: d.streak, accuracy: acc, badge: "⭐", isUser: true });
    all.sort(function(a,b) { return b.xp - a.xp; });
    var top5 = all.slice(0, 6);
    var html = "";
    top5.forEach(function(p, i) {
        var medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "#" + (i+1);
        html += '<div class="pred-lb-row' + (p.isUser ? ' pred-lb-you' : '') + '">';
        html += '<span class="pred-lb-rank">' + medal + '</span>';
        html += '<span class="pred-lb-badge">' + p.badge + '</span>';
        html += '<span class="pred-lb-name">' + p.name + '</span>';
        html += '<span class="pred-lb-xp">' + p.xp + ' XP</span>';
        html += '</div>';
    });
    c.innerHTML = html;
}

function predRenderBadges() {
    var c = document.getElementById("pred-badges"); if (!c) return;
    var d = predGetData();
    var html = "";
    predBadgesDef.forEach(function(b) {
        var has = d.badges.indexOf(b.id) !== -1;
        html += '<div class="pred-badge-card' + (has ? ' pred-badge-earned' : ' pred-badge-locked') + '">';
        html += '<div class="pred-badge-icon">' + (has ? b.icon : '🔒') + '</div>';
        html += '<div class="pred-badge-title">' + b.title + '</div>';
        html += '<div class="pred-badge-desc">' + b.desc + '</div>';
        html += '</div>';
    });
    c.innerHTML = html;
}

function predOpenMatch(matchId) {
    var match = predMatches.find(function(m) { return m.id === matchId; });
    if (!match) return;
    var st = predMatchStatus(match);
    if (st === "completed") { predShowResults(matchId); return; }
    predCurrentMatchId = matchId;
    predCatIdx = 0;
    document.getElementById("pred-list-view").style.display = "none";
    document.getElementById("pred-results-view").style.display = "none";
    document.getElementById("pred-panel-view").style.display = "block";
    predRenderPanel(match);
}

function predShowList() {
    predStopCD();
    document.getElementById("pred-list-view").style.display = "";
    document.getElementById("pred-panel-view").style.display = "none";
    document.getElementById("pred-results-view").style.display = "none";
    predCurrentMatchId = null;
    predRender();
    document.getElementById("pred-container").scrollIntoView({ behavior: "smooth" });
}

function predRenderPanel(match) {
    var d = predGetData();
    var st = predMatchStatus(match);
    var has = d.predictions[match.id] && d.predictions[match.id].submitted;
    var locked = st === "locked";
    // Header
    document.getElementById("pred-panel-teams").innerHTML = match.teamA.flag + ' ' + match.teamA.short + ' vs ' + match.teamB.short + ' ' + match.teamB.flag;
    document.getElementById("pred-panel-meta").textContent = match.type + ' • ' + match.venue;
    var cdEl = document.getElementById("pred-panel-cd");
    if (locked) {
        cdEl.innerHTML = '<span class="pred-cd-locked">🔒 Predictions Locked</span>';
    } else if (has) {
        cdEl.innerHTML = '<span class="pred-cd-submitted">✅ Your picks are locked in!</span>';
    } else {
        cdEl.innerHTML = '<span class="pred-cd-time" id="pred-panel-cd-time">' + predFmtCD(match.lockTime - Date.now()) + '</span>';
    }
    // Category tabs
    var tabsHtml = "";
    predCats.forEach(function(cat, i) {
        tabsHtml += '<button class="pred-cat-btn' + (i === predCatIdx ? ' active' : '') + '" onclick="predSetCat(' + i + ')">' + cat.icon + ' ' + cat.title + '</button>';
    });
    document.getElementById("pred-cat-tabs").innerHTML = tabsHtml;
    // Content
    predRenderCatContent(match, predCatIdx);
    // Submit button
    var subBtn = document.getElementById("pred-submit-btn");
    if (locked || has) {
        subBtn.style.display = "none";
    } else {
        subBtn.style.display = "";
        subBtn.disabled = false;
    }
}

function predSetCat(idx) {
    predCatIdx = idx;
    var match = predMatches.find(function(m) { return m.id === predCurrentMatchId; });
    if (!match) return;
    var d = predGetData();
    var st = predMatchStatus(match);
    var locked = st === "locked";
    var has = d.predictions[match.id] && d.predictions[match.id].submitted;
    document.querySelectorAll(".pred-cat-btn").forEach(function(b, i) {
        b.classList.toggle("active", i === idx);
    });
    predRenderCatContent(match, predCatIdx);
}

function predRenderCatContent(match, catIdx) {
    var cat = predCats[catIdx];
    var c = document.getElementById("pred-cat-content");
    if (!c) return;
    var d = predGetData();
    var preds = d.predictions[match.id] || {};
    var st = predMatchStatus(match);
    var locked = st === "locked";
    var submitted = preds.submitted;
    var disabled = locked || submitted;
    var allPlayers = match.teamA.players.concat(match.teamB.players);

    var html = '<div class="pred-cat-header"><span class="pred-cat-title">' + cat.icon + ' ' + cat.title + '</span><span class="pred-cat-desc">' + cat.desc + '</span></div>';

    if (cat.id === "winner") {
        [match.teamA, match.teamB].forEach(function(team) {
            var sel = preds.winner === team.short;
            html += '<button class="pred-opt-btn' + (sel ? ' pred-sel' : '') + '"' + (disabled ? '' : ' onclick="predSelect(\'winner\',\'' + team.short + '\')"') + '>';
            html += '<span class="pred-opt-flag">' + team.flag + '</span>';
            html += '<span class="pred-opt-name">' + team.name + '</span>';
            if (sel) html += ' <i class="fa-solid fa-check"></i>';
            html += '</button>';
        });
    } else if (cat.id === "topBatter") {
        allPlayers.forEach(function(p) {
            var sel = preds.topBatter === p;
            html += '<button class="pred-opt-btn pred-opt-sm' + (sel ? ' pred-sel' : '') + '"' + (disabled ? '' : ' onclick="predSelect(\'topBatter\',\'' + p.replace(/'/g,"\\'") + '\')"') + '>';
            html += p;
            if (sel) html += ' <i class="fa-solid fa-check"></i>';
            html += '</button>';
        });
    } else if (cat.id === "topBowler") {
        allPlayers.forEach(function(p) {
            var sel = preds.topBowler === p;
            html += '<button class="pred-opt-btn pred-opt-sm' + (sel ? ' pred-sel' : '') + '"' + (disabled ? '' : ' onclick="predSelect(\'topBowler\',\'' + p.replace(/'/g,"\\'") + '\')"') + '>';
            html += p;
            if (sel) html += ' <i class="fa-solid fa-check"></i>';
            html += '</button>';
        });
    } else if (cat.id === "player50Plus") {
        var keyBatters = [match.teamA.players[0], match.teamA.players[1], match.teamB.players[0], match.teamB.players[1]];
        keyBatters.forEach(function(p) {
            var val = preds.player50Plus ? preds.player50Plus[p] : null;
            html += '<div class="pred-50-row">';
            html += '<span class="pred-50-name">' + p + '</span>';
            html += '<div class="pred-50-btns">';
            html += '<button class="pred-yn-btn' + (val === true ? ' pred-yn-sel-yes' : '') + '"' + (disabled ? '' : ' onclick="predSelect50(\'' + p.replace(/'/g,"\\'") + '\',true)"') + '>Yes 🔥</button>';
            html += '<button class="pred-yn-btn' + (val === false ? ' pred-yn-sel-no' : '') + '"' + (disabled ? '' : ' onclick="predSelect50(\'' + p.replace(/'/g,"\\'") + '\',false)"') + '>Nah 😭</button>';
            html += '</div></div>';
        });
    } else if (cat.id === "score") {
        predScoreRanges.forEach(function(r) {
            var sel = preds.score === r;
            html += '<button class="pred-opt-btn pred-opt-score' + (sel ? ' pred-sel' : '') + '"' + (disabled ? '' : ' onclick="predSelect(\'score\',\'' + r + '\')"') + '>';
            html += r;
            if (sel) html += ' <i class="fa-solid fa-check"></i>';
            html += '</button>';
        });
    }

    if (disabled && submitted) {
        html += '<div class="pred-locked-msg">✅ Your picks are locked in. Let\'s see if you\'re right! 👀</div>';
    }
    c.innerHTML = html;
}

function predSelect(key, val) {
    if (!predCurrentMatchId) return;
    var d = predGetData();
    if (!d.predictions[predCurrentMatchId]) d.predictions[predCurrentMatchId] = {};
    d.predictions[predCurrentMatchId][key] = val;
    predSave(d);
    var match = predMatches.find(function(m) { return m.id === predCurrentMatchId; });
    if (match) predRenderCatContent(match, predCatIdx);
}

function predSelect50(player, val) {
    if (!predCurrentMatchId) return;
    var d = predGetData();
    if (!d.predictions[predCurrentMatchId]) d.predictions[predCurrentMatchId] = {};
    if (!d.predictions[predCurrentMatchId].player50Plus) d.predictions[predCurrentMatchId].player50Plus = {};
    d.predictions[predCurrentMatchId].player50Plus[player] = val;
    predSave(d);
    var match = predMatches.find(function(m) { return m.id === predCurrentMatchId; });
    if (match) predRenderCatContent(match, predCatIdx);
}

function predSubmitAll() {
    if (!predCurrentMatchId) return;
    var d = predGetData();
    var preds = d.predictions[predCurrentMatchId] || {};
    // Validate all categories
    var missing = [];
    if (!preds.winner) missing.push("Make Your Call");
    if (!preds.topBatter) missing.push("Who'll Cook?");
    if (!preds.topBowler) missing.push("Bowler Mode");
    if (!preds.player50Plus || Object.keys(preds.player50Plus).length < 4) missing.push("50+ or Nah?");
    if (!preds.score) missing.push("Score Guess");

    if (missing.length > 0) {
        alert("Complete all predictions first!\nMissing: " + missing.join(", "));
        return;
    }

    // Mark as submitted
    preds.submitted = true;
    preds.timestamp = Date.now();
    d.predictions[predCurrentMatchId] = preds;
    d.totalPredictions += 5;
    d.totalMatchesPredicted++;
    // Streak
    var today = new Date().toISOString().split("T")[0];
    if (d.lastPredDate) {
        var prev = new Date(d.lastPredDate);
        var now = new Date(today);
        var diff = Math.floor((now - prev) / 86400000);
        if (diff === 1) { d.streak++; }
        else if (diff > 1) { d.streak = 1; }
    } else { d.streak = 1; }
    if (d.streak > d.bestStreak) d.bestStreak = d.streak;
    d.lastPredDate = today;
    predSave(d);

    // Check if result already available
    var match = predMatches.find(function(m) { return m.id === predCurrentMatchId; });
    if (match && match.result) {
        var score = predCalcScore(predCurrentMatchId);
        d.totalCorrect += score.correct;
        if (score.correct === 5) d.perfectRounds++;
        var xp = score.correct * 15 + (score.correct === 5 ? 50 : 0) + (d.streak * 5);
        d.xp += xp;
        predSave(d);
        predCheckBadges();
        predShowConfirm(predCurrentMatchId, score.correct, xp);
    } else {
        predShowConfirm(predCurrentMatchId, null, 0);
    }
}

function predShowConfirm(matchId, correct, xp) {
    var match = predMatches.find(function(m) { return m.id === matchId; });
    var c = document.getElementById("pred-results-view");
    document.getElementById("pred-list-view").style.display = "none";
    document.getElementById("pred-panel-view").style.display = "none";
    c.style.display = "block";
    var html = '<div class="pred-confirm-card">';
    html += '<div class="pred-confirm-icon">🎯</div>';
    html += '<h2 class="pred-confirm-title">Locked in! 🔒</h2>';
    html += '<p class="pred-confirm-sub">' + match.teamA.short + ' vs ' + match.teamB.short + ' — Let\'s see if you\'re right! 👀</p>';
    html += '<div class="pred-confirm-picks">';
    var d = predGetData();
    var preds = d.predictions[matchId] || {};
    html += '<div class="pred-pick-row"><span class="pred-pick-cat">👀 Winner</span><span class="pred-pick-val">' + (preds.winner || '-') + '</span></div>';
    html += '<div class="pred-pick-row"><span class="pred-pick-cat">🔥 Top Batter</span><span class="pred-pick-val">' + (preds.topBatter || '-') + '</span></div>';
    html += '<div class="pred-pick-row"><span class="pred-pick-cat">⚡ Top Bowler</span><span class="pred-pick-val">' + (preds.topBowler || '-') + '</span></div>';
    html += '<div class="pred-pick-row"><span class="pred-pick-cat">📊 Score</span><span class="pred-pick-val">' + (preds.score || '-') + '</span></div>';
    html += '</div>';
    if (correct !== null) {
        html += '<div class="pred-confirm-result">';
        html += '<div class="pred-res-big">' + correct + '/5</div>';
        html += '<div class="pred-res-label">' + (correct === 5 ? 'You called it! 🔥' : correct >= 3 ? 'Not bad! 💪' : 'Oops… not this time 😭') + '</div>';
        html += '<div class="pred-res-xp">+' + xp + ' XP</div>';
        html += '</div>';
    } else {
        html += '<div class="pred-confirm-wait"><div class="pred-res-big">⏳</div><div class="pred-res-label">Results coming after the match...</div></div>';
    }
    html += '<button class="pred-back-btn" onclick="predShowList()"><i class="fa-solid fa-arrow-left"></i> Back to Predictions</button>';
    html += '</div>';
    c.innerHTML = html;
}

function predShowResults(matchId) {
    var match = predMatches.find(function(m) { return m.id === matchId; });
    if (!match || !match.result) return;
    var d = predGetData();
    var preds = d.predictions[matchId];
    var score = predCalcScore(matchId);
    var c = document.getElementById("pred-results-view");
    document.getElementById("pred-list-view").style.display = "none";
    document.getElementById("pred-panel-view").style.display = "none";
    c.style.display = "block";

    var html = '<div class="pred-results-card">';
    html += '<div class="pred-results-header">';
    html += '<div class="pred-results-teams">' + match.teamA.flag + ' ' + match.teamA.short + ' vs ' + match.teamB.short + ' ' + match.teamB.flag + '</div>';
    html += '<div class="pred-results-venue">' + match.type + ' • ' + match.venue + '</div>';
    html += '</div>';

    if (!preds || !preds.submitted) {
        html += '<div class="pred-results-empty"><div class="pred-res-big">😅</div><div class="pred-res-label">You didn\'t predict this one!</div><p class="pred-res-sub">Don\'t miss the next match 🔥</p></div>';
    } else {
        html += '<div class="pred-results-score">';
        html += '<div class="pred-res-big">' + score.correct + '/5</div>';
        html += '<div class="pred-res-label">' + (score.correct === 5 ? 'You called it! 🔥🔥🔥' : score.correct >= 3 ? 'Solid predictions! 💪' : 'Tough luck! 😭') + '</div>';
        html += '</div>';
        html += '<div class="pred-results-breakdown">';
        var cats = [
            { key: "winner", label: "👀 Winner", field: "winner" },
            { key: "topBatter", label: "🔥 Top Batter", field: "topBatter" },
            { key: "topBowler", label: "⚡ Top Bowler", field: "topBowler" },
            { key: "score", label: "📊 Score", field: "scoreRange" }
        ];
        cats.forEach(function(cat) {
            var pred = preds[cat.key] || "-";
            var actual = match.result[cat.field] || "-";
            var isCorrect = pred === actual;
            html += '<div class="pred-result-row ' + (isCorrect ? 'pred-row-correct' : 'pred-row-wrong') + '">';
            html += '<span class="pred-result-label">' + cat.label + '</span>';
            html += '<span class="pred-result-pred">You: ' + pred + '</span>';
            html += '<span class="pred-result-actual">Actual: ' + actual + '</span>';
            html += '<span class="pred-result-icon">' + (isCorrect ? '✅' : '❌') + '</span>';
            html += '</div>';
        });
        // 50+ check
        var keyBatters = [match.teamA.players[0], match.teamA.players[1], match.teamB.players[0], match.teamB.players[1]];
        var any50 = match.result.player50Plus;
        var predAny = false;
        if (preds.player50Plus) {
            keyBatters.forEach(function(p) { if (preds.player50Plus[p] === true) predAny = true; });
        }
        var is50Correct = predAny === any50;
        html += '<div class="pred-result-row ' + (is50Correct ? 'pred-row-correct' : 'pred-row-wrong') + '">';
        html += '<span class="pred-result-label">🎯 50+</span>';
        html += '<span class="pred-result-pred">You: ' + (predAny ? "Yes" : "Nah") + '</span>';
        html += '<span class="pred-result-actual">Actual: ' + (any50 ? "Yes" : "Nah") + '</span>';
        html += '<span class="pred-result-icon">' + (is50Correct ? '✅' : '❌') + '</span>';
        html += '</div>';
        html += '</div>';
    }
    html += '<button class="pred-back-btn" onclick="predShowList()"><i class="fa-solid fa-arrow-left"></i> Back to Predictions</button>';
    html += '</div>';
    c.innerHTML = html;
}

function predCalcScore(matchId) {
    var d = predGetData();
    var preds = d.predictions[matchId];
    var match = predMatches.find(function(m) { return m.id === matchId; });
    var result = match && match.result;
    var correct = 0;
    if (!preds || !result) return { correct: 0 };
    if (preds.winner === result.winner) correct++;
    if (preds.topBatter === result.topBatter) correct++;
    if (preds.topBowler === result.topBowler) correct++;
    if (preds.score === result.scoreRange) correct++;
    var keyBatters = [match.teamA.players[0], match.teamA.players[1], match.teamB.players[0], match.teamB.players[1]];
    var any50 = result.player50Plus;
    var predAny = false;
    if (preds.player50Plus) {
        keyBatters.forEach(function(p) { if (preds.player50Plus[p] === true) predAny = true; });
    }
    if (predAny === any50) correct++;
    return { correct: correct };
}

function predCheckBadges() {
    var d = predGetData();
    var changed = false;
    predBadgesDef.forEach(function(b) {
        if (d.badges.indexOf(b.id) === -1 && b.check(d)) {
            d.badges.push(b.id);
            changed = true;
            predShowBadgeNotif(b);
        }
    });
    if (changed) predSave(d);
}

function predShowBadgeNotif(b) {
    var n = document.createElement("div");
    n.style.cssText = "position:fixed;top:80px;right:20px;background:rgba(168,85,247,0.95);color:white;padding:14px 20px;border-radius:12px;font-weight:700;font-size:14px;z-index:9999;box-shadow:0 8px 30px rgba(168,85,247,0.4);font-family:'Inter',sans-serif;display:flex;align-items:center;gap:8px;";
    n.innerHTML = b.icon + ' Badge Unlocked: ' + b.title + '!';
    document.body.appendChild(n);
    setTimeout(function() { n.remove(); }, 3500);
}

function predStartCD() {
    predStopCD();
    predCDTimer = setInterval(function() {
        predMatches.forEach(function(match) {
            if (predMatchStatus(match) !== "upcoming") return;
            var el = document.getElementById("pred-cd-" + match.id);
            var remaining = match.lockTime - Date.now();
            if (el) el.textContent = predFmtCD(remaining);
            if (remaining <= 0) {
                predRenderMatchList();
                if (predCurrentMatchId === match.id) {
                    var panel = document.getElementById("pred-panel-cd");
                    if (panel) panel.innerHTML = '<span class="pred-cd-locked">🔒 Predictions Locked</span>';
                    var btn = document.getElementById("pred-submit-btn");
                    if (btn) btn.style.display = "none";
                    var d = predGetData();
                    if (d.predictions[match.id] && d.predictions[match.id].submitted) {
                        var cd = document.getElementById("pred-panel-cd");
                        if (cd) cd.innerHTML = '<span class="pred-cd-submitted">✅ Your picks are locked in!</span>';
                    }
                }
            }
        });
        // Auto-check results for locked matches
        predMatches.forEach(function(match) {
            if (predMatchStatus(match) === "locked" && !match.result) {
                // Auto-complete after 5 minutes for demo
                if (Date.now() >= match.lockTime + 5 * 60 * 1000) {
                    var winners = [match.teamA.short, match.teamB.short];
                    var allP = match.teamA.players.concat(match.teamB.players);
                    match.result = {
                        winner: winners[Math.floor(Math.random() * 2)],
                        topBatter: allP[Math.floor(Math.random() * allP.length)],
                        topBowler: allP[Math.floor(Math.random() * allP.length)],
                        player50Plus: Math.random() > 0.4,
                        scoreRange: predScoreRanges[Math.floor(Math.random() * predScoreRanges.length)]
                    };
                    predCalcAndScore(match.id);
                    predRenderMatchList();
                }
            }
        });
    }, 1000);
}
function predStopCD() { if (predCDTimer) { clearInterval(predCDTimer); predCDTimer = null; } }

function predCalcAndScore(matchId) {
    var d = predGetData();
    var preds = d.predictions[matchId];
    if (!preds || !preds.submitted) return;
    var match = predMatches.find(function(m) { return m.id === matchId; });
    if (!match || !match.result) return;
    var score = predCalcScore(matchId);
    d.totalCorrect += score.correct;
    if (score.correct === 5) d.perfectRounds++;
    var xp = score.correct * 15 + (score.correct === 5 ? 50 : 0) + (d.streak * 5);
    d.xp += xp;
    predSave(d);
    predCheckBadges();
}

predRender();

// ========================================
// Hook: 30 Second Cricket end -> mission
// ========================================
var _origT30cEndGame = t30cEndGame;
t30cEndGame = function() {
    _origT30cEndGame();
    if (typeof cmCompleteMission === "function") cmCompleteMission("cm_30sec");
    if (typeof cmTrackGamePlay === "function") cmTrackGamePlay();
    if (typeof cmTrackHighScore === "function") cmTrackHighScore(t30cScore);
};

// Hook: Last Over Challenge end -> mission
var _origLbcShowResult = lbcShowResult;
lbcShowResult = function(outcome) {
    _origLbcShowResult(outcome);
    if (typeof cmCompleteMission === "function") cmCompleteMission("cm_lastover");
    if (typeof cmTrackGamePlay === "function") cmTrackGamePlay();
};

// Start
loadMatches();
loadSchedule();
loadLiveMatches();