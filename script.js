"use strict";

class Player {
    constructor(name, game) {
        this.name = name;
        this.score = 0;
        game.addPlayer(this);
    }

    addPoints(points, game) {
        this.score += points;
        game.updateScoreboard(this);
    }
}

const game = {
    title: "My Game",
    isRunning: false,
    players: [],
    activePlayerIndex: 0,
    scoreboard: document.getElementById('scoreboard'),

    addPlayer(player) {
        this.players.push(player);
        this.renderPlayer(player);
    },

    renderPlayer(player) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.innerHTML = `<span>${player.name}</span><span>${player.score}</span>`;
        this.scoreboard.appendChild(playerDiv);
    },

    updateScoreboard(player) {
        const playerElements = this.scoreboard.children;
        for (let i = 0; i < playerElements.length; i++) {
            if (playerElements[i].firstChild.textContent === player.name) {
                playerElements[i].lastChild.textContent = player.score;
                break;
            }
        }
    },

    toggleGame() {
        this.isRunning = !this.isRunning;
        document.getElementById('next-player-button').style.display = this.isRunning ? 'inline' : 'none';
        document.getElementById('score-player-button').style.display = this.isRunning ? 'inline' : 'none';
        console.log(this.isRunning ? "Game started!" : "Game stopped!");
    },

    nextPlayer() {
        if (this.players.length > 0) {
            this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
            console.log(`Active Player: ${this.players[this.activePlayerIndex].name}`);
        }
    },

    scorePoints() {
        if (this.players.length > 0) {
            const points = Math.floor(Math.random() * 10) + 1; // Random points between 1 and 10
            const activePlayer = this.players[this.activePlayerIndex];
            activePlayer.addPoints(points, this);
            console.log(`${activePlayer.name} scored ${points} points!`);
        }
    }
};

// Event Listeners
document.getElementById('join-button').addEventListener('click', () => {
    const playerNameInput = document.getElementById('player-name');
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        new Player(playerName, game);
        playerNameInput.value = '';
    } else {
        alert("Please enter a player name.");
    }
});

document.getElementById('toggle-game-button').addEventListener('click', () => {
    game.toggleGame();
    document.getElementById('toggle-game-button').textContent = game.isRunning ? "Stop Game" : "Start Game";
});

document.getElementById('next-player-button').addEventListener('click', () => {
    game.nextPlayer();
});

document.getElementById('score-player-button').addEventListener('click', () => {
    game.scorePoints();
});
