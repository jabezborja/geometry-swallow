export class InputHandler {
    constructor(player) {
        this.player = player;
    }

    initializeController() {

        addEventListener('keydown', (e) => {

            const speed = 4;

            switch (e.key) {
                case 'd':
                    this.player.velocity.x = speed;
                    break;
                case 'a':
                    this.player.velocity.x = -speed;
                    break;
                case 'w':
                    this.player.jumped = true;
                    break;
            }
        });

        addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'd':
                    this.player.velocity.x = 0;
                    break;
                case 'a':
                    this.player.velocity.x = 0;
                    break;
                case 'w':
                    this.player.jumped = false;
                    break;
            }
        })
    }
}