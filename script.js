/**
 * Name: Shreya Jayas
 * Date: 03/06/2025
 * CSC 372-01
 *
 * This JavaScript file implements the logic for the Rock Paper Scissors game.
 */

let wins = 0, losses = 0, ties = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".choice").forEach(choice => {
        choice.addEventListener("click", function () {
            playerChoice(this.id);
        });
    });
    document.getElementById("reset").addEventListener("click", resetGame);
    document.getElementById("play-again").addEventListener("click", playAgain);
});

/**
 * Handles the player's selection and initiates the game logic.
 * Highlights the selected choice and triggers the computer throw.
 * @param {string} choice - The player's selected option (rock, paper, scissors).
 */
function playerChoice(choice) {
    document.querySelectorAll(".choice").forEach(img => img.classList.remove("selected"));
    document.getElementById(choice).classList.add("selected");

    let choices = ["rock", "paper", "scissors"];
    let computerIndex = Math.floor(Math.random() * 3);
    let computerChoice = choices[computerIndex];

    shuffleComputerChoice(() => {
        document.getElementById("computer-choice").src = "images/" + computerChoice + ".png";
        document.getElementById("computer-choice").classList.add("selected-computer");
        determineWinner(choice, computerChoice);
    });
}

/**
 * Animates the computer's choice by shuffling between options before selecting one.
 * @param {function} callback - The function to execute after the shuffle completes.
 */
function shuffleComputerChoice(callback) {
    let choices = ["images/rock.png", "images/paper.png", "images/scissors.png"];
    let index = 0;
    let interval = setInterval(() => {
        document.getElementById("computer-choice").src = choices[index];
        index = (index + 1) % choices.length;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        callback();
    }, 3000);
}

/**
 * Determines the winner of the game and updates the score.
 * @param {string} player - The player's choice.
 * @param {string} computer - The computer's choice.
 */
function determineWinner(player, computer) {
    let result = "";
    if (player === computer) {
        result = "It's a Tie!";
        ties++;
    } else if ((player === "rock" && computer === "scissors") ||
               (player === "paper" && computer === "rock") ||
               (player === "scissors" && computer === "paper")) {
        result = "You Win!";
        wins++;
    } else {
        result = "You Lose!";
        losses++;
    }

    document.getElementById("result").textContent = result;
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;
}

/**
 * Resets the game by clearing the score and restoring the initial state.
 */
function resetGame() {
    wins = 0;
    losses = 0;
    ties = 0;
    document.getElementById("result").textContent = "Waiting...";
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;
    document.getElementById("computer-choice").src = "images/question-mark.png";
    document.querySelectorAll(".choice").forEach(img => img.classList.remove("selected"));
    document.getElementById("computer-choice").classList.remove("selected-computer");
}

/**
 * Allows replaying the game without resetting the score.
 */
function playAgain() {
    document.getElementById("result").textContent = "Waiting...";
    document.getElementById("computer-choice").src = "images/question-mark.png";
    document.querySelectorAll(".choice").forEach(img => img.classList.remove("selected"));
    document.getElementById("computer-choice").classList.remove("selected-computer");
}
