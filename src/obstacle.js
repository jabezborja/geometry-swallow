export class Obstacle {
    constructor(game, position) {
        this.game = game;
        this.height = 50;
        this.width = this.generateRandom();
        this.position = position;

        this.hasCollectedPoint = false;
    }

    update() {
        this.draw();

        this.position.x -= this.game.gameSpeed;
    }

    draw() {
        this.game.c.fillStyle = 'black';
        this.game.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    generateRandom() {
        const random = Math.ceil(Math.random() * 500);

        if (random > 100) return this.generateRandom();
        if (random < 20) return this.generateRandom();

        return random;
    }
}