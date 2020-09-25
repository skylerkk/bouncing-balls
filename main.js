// setup canvas
const para = document.getElementById('countBall');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('badScore');
const player1Image = document.getElementById('player1Image');
const player2Image = document.getElementById('badImage');
const alienImage = document.getElementById('alienImage');
const player1Win = document.getElementById('player1Win');
const player2Win = document.getElementById('player2Win');
const tie = document.getElementById('tie');
const player1Solo = document.getElementById('player1Solo');

// Set variables
let count = 0;
let alienWidth = 64;
let alienHeight = 55;
let gameEnd = false;
let players;


//Makes 2 objects that have up, down, right, left and set them to false.
let key = { up: false, left: false, right: false, down: false };
let bad = { up: false, left: false, right: false, down: false };

//creates varibles for the canvas and makes it 2d also sets width and height to the windows size
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// define Shape constructor
class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    };
};

// define Ball constructor
class Ball extends Shape {
    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velY, exists);

        this.color = "ffffff00";
        this.size = size;
    }
    draw() {
        ctx.drawImage(alienImage, (this.x), (this.y), alienWidth, alienHeight);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc((this.x + 32), (this.y + 24), this.size, 0, 2 * Math.PI);
        ctx.fill();
    };

    update() {
        if ((this.x + this.size) >= width) {
            this.x = (width - width + this.size + 1);
        }

        if ((this.x - this.size) <= 0) {
            this.x = (width - this.size + 1);
        }

        if ((this.y + this.size) >= height) {
            this.y = (height - height + this.size + 1);
        }

        if ((this.y - this.size) <= 0) {
            this.y = (height - this.size + 1);
        }
        if (this.velX === 0 || this.velY === 0) {
            this.velX = 1;
            this.velY = 1;
        }
        this.x += this.velX;
        this.y += this.velY;
    };

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size && this.exists) {
                    //balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                    balls[j].size = this.size = random(10, 20);
                }
            }
        }
    };
}


// Defining EvilCircle()

class Player extends Shape {
    constructor(x, y, score, player) {
        super(x, y, 3, 3);
        this.color = "#ffffff00";
        this.size = 25;
        this.score = 0;
        this.exists = true;
        this.player = player;
    }
    draw() {
        if (this.player === 1) {
            ctx.drawImage(player1Image, (this.x - 20), (this.y - 20));
        }
        else {
            ctx.drawImage(player2Image, (this.x - 20), (this.y - 20));
        }
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x + 4, this.y + 6, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x = (width - width + this.size + 1);
        }
        if ((this.x - this.size) <= 0) {
            this.x = (width - this.size + 1);
        }
        if ((this.y + this.size) >= height) {
            this.y = (height - height + this.size + 1);
        }
        if ((this.y - this.size) <= 0) {
            this.y = (height - this.size + 1)
        }
    }
    setControls() {
        if (this.player === 1) {
            var _this = this;
            if (key.left === true) {
                this.x -= this.velX;
            }
            else {
                this.x += this.velX;
            }
            if (key.right === true) {
                this.x += this.velX;
            }
            else {
                this.x -= this.velX;
            }
            if (key.up === true) {
                this.y -= this.velY;
            }
            else {
                this.y += this.velY;
            }
            if (key.down === true) {
                this.y += this.velY;
            }
            else {
                this.y -= this.velY;
            }
        }
        else {
            var _this = this;
            if (bad.left === true) {
                this.x -= this.velX;
            }
            else {
                this.x += this.velX;
            }
            if (bad.right === true) {
                this.x += this.velX;
            }
            else {
                this.x -= this.velX;
            }
            if (bad.up === true) {
                this.y -= this.velY;
            }
            else {
                this.y += this.velY;
            }
            if (bad.down === true) {
                this.y += this.velY;
            }
            else {
                this.y -= this.velY;
            }
        }
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    count--;
                    this.score++;
                    para.textContent = "Ball count: " + count;
                    if (this.player === 1) {
                        player1Score.textContent = "Player " + this.player + ": " + this.score;
                    }
                    if (this.player === 2) {
                        player2Score.textContent = "Player " + this.player + ": " + this.score;
                    }
                }
            }
        }
    }
}

// define array to store balls and populate it

const balls = [];

let player1 = new Player(random(0, width), random(0, height), 0, 1);
player1.setControls();
const player2 = new Player(random(0, width), random(0, height), 0, 2);
player2.setControls();

while (balls.length < 30) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the adge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-5, 5),
        random(-5, 5),
        true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
    player1Score.textContent = 'Player 1: ' + player1.score;
    player2Score.textContent = 'Player 2: ' + player2.score;
}

// define loop that keeps drawing the scene constantly
function getPlayers() {
    players = window.prompt("Greetings Commander! 1 or 2 Players? Default will be 1 Player.", "1");
}

getPlayers();

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);


    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }
    if (players === "2") {
        player2.draw();
        player2.setControls();
        player2.checkBounds();
        player2.collisionDetect();
    }
        player1.draw();
        player1.setControls();
        player1.checkBounds();
        player1.collisionDetect();

    if (count === 0 && gameEnd === false) {
        if (players === "2") {
            if (player1.score > player2.score) {
                player1Win.style.display = "block";
            }
            else if (player2.score > player1.score) {
                player2Win.style.display = "block";
            }
            else {
                tie.style.display = "block";
            }
        }
        else {
            player1Solo.style.display = "block";
        }
        gameEnd = true;
    }
    requestAnimationFrame(loop);

}


window.onkeydown = function (e) {
    if (e.keyCode == 65) { key.left = true; } //LEFT
    if (e.keyCode == 87) { key.up = true; } //UP
    if (e.keyCode == 68) { key.right = true; } //RIGHT
    if (e.keyCode == 83) { key.down = true; } //DOWN
    if (e.keyCode == 38) { bad.up = true; } //UP
    if (e.keyCode == 37) { bad.left = true; } //LEFT
    if (e.keyCode == 40) { bad.down = true; } //DOWN
    if (e.keyCode == 39) { bad.right = true; } //RIGHT

};
window.onkeyup = function (e) {
    if (e.keyCode == 65) { key.left = false; } //LEFT
    if (e.keyCode == 87) { key.up = false; } //UP
    if (e.keyCode == 68) { key.right = false; } //RIGHT
    if (e.keyCode == 83) { key.down = false; } //DOWN
    if (e.keyCode == 38) { bad.up = false; } //UP
    if (e.keyCode == 37) { bad.left = false; } //LEFT
    if (e.keyCode == 40) { bad.down = false; } //DOWN
    if (e.keyCode == 39) { bad.right = false; } //RIGHT
};
loop();