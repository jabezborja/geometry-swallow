import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { InputHandler } from "./inputhandler.js";

var canvas;

const pointsText = document.getElementById('points');
const endgameScreen = document.getElementById('endgame-screen');
const endgameScreenTotalPoints = document.getElementById('total-points');
const playAgain = document.getElementById('play-again');

class Game {
    constructor() {
        this.c = canvas.getContext('2d');
        this.heartbeatId = null;

        const playerHeight = 50;
        const playerWidth = 50;
        this.player = new Player(
            {
                game: this,
                height: playerHeight,
                width: playerWidth,
                color: 'black',
                position: {
                    x: playerWidth,
                    y: canvas.height - playerHeight
                }
            }
        );

        this.width = canvas.width;
        this.height = canvas.height;

        this.earnedPoints = 0;
        this.oldPoints = 0;

        this.gameSpeed = 5;
        this.obstacles = [];
        this.hasLost = false;
    }

    update() {
        // Increase performance, remove used obstacles
        this.obstacles.forEach((obstacle, index) => {
            if (obstacle.position.x < -obstacle.width) this.obstacles.splice(index, 1);
        });

        // Update points
        if (this.earnedPoints != this.oldPoints) {
            pointsText.innerHTML = this.earnedPoints;
            this.oldPoints = this.earnedPoints;
        }

        // Player has lost
        if (this.hasLost) {
            cancelAnimationFrame(this.heartbeatId);
            canvas.style.display = "none";
            endgameScreenTotalPoints.innerHTML = this.earnedPoints;
            endgameScreen.style.removeProperty("display");
        }
    }

    draw() {
        this.update();
        this.player.update();
    }

    spawn() {
        setInterval(() => {
            const obstacle = new Obstacle(this, {
                x: this.width,
                y: this.height - 50
            });
            
            this.obstacles.push(obstacle);
        }, Math.floor(Math.random() * 5000) + 3000)
    }
}

const gameInstance = () => {
    canvas = document.getElementById('main-canvas');

    canvas.width = 1000;
    canvas.height = 600;

    const game = new Game(canvas);
    const controller = new InputHandler(game.player);
    controller.initializeController();

    const heartbeat = () => {
        var heartbeatId = requestAnimationFrame(heartbeat);

        game.c.fillStyle = 'white';
        game.c.fillRect(0, 0, canvas.width, canvas.height);
        game.heartbeatId = heartbeatId;

        game.draw();
        game.obstacles.forEach((obstacle) => {
            obstacle.update();
        })
    };

    heartbeat();
    game.spawn();
};

addEventListener('load', () => {
    gameInstance();
});

playAgain.addEventListener('click', () => {
    canvas.style.removeProperty("display");
    endgameScreen.style.display = "none";
    gameInstance();
});