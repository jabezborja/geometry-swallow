export class Player {
    constructor({ game, height, width, color, position }) {
        this.game = game;
        this.height = height;
        this.width = width;
        this.color = color;
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        };

        this.jumped = false;
        this.earnPointsDebounce = false;
    }

    draw() {
        this.game.c.fillStyle = this.color;
        this.game.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.checkCollisions();

        this.position.x += this.velocity.x;

        if (this.jumped) {
            if (this.onGround()) this.velocity.y -= 1;
        } else {
            if (!this.onGround()) this.velocity.y += 1;
            else this.velocity.y = 0;
        }

        this.position.y += this.velocity.y;
    }

    onGround() {
        return this.position.y >= this.game.height - this.height;
    }

    checkCollisions() {
        this.game.obstacles.forEach((obstacle) => {
            var diffX = obstacle.position.x - this.position.x;

            // Has collided with an obstacle
            if (diffX <= obstacle.width
                && diffX >= -20
                && this.position.y - this.game.height >= -obstacle.height) {

                this.game.hasLost = true;
                return;
            }
            
            // Has successfully avoided an obstacle
            if (diffX <= obstacle.width && diffX >= -20) {
                if (!this.earnPointsDebounce) {
                    this.earnPointsDebounce = true;
                    setTimeout(() => { this.earnPointsDebounce = false }, 1000);

                    if (!obstacle.hasCollectedPoint) {
                        this.game.earnedPoints += 1;
                        obstacle.hasCollectedPoint = true;
                    }
                }
            }
            
        });
    }
}