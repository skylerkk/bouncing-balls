// setup canvas
const para = document.getElementById('countBall');
const player1Score = document.getElementById('player1Score');
const badScore = document.getElementById('badScore');
const player1Image = document.getElementById('player1Image');
const badImage = document.getElementById('badImage');
let count = 0;
let Score1 = 0;
let Score2 = 0;

let key = { up: false, left: false, right: false, down: false };
let bad = { up: false, left: false, right: false, down: false };

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let xValue = 0;
let yValue = 0;
let badX = 0;
let badY = 0;
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

        this.color = color;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    };

    update() {
        if ((this.x + this.size) >= width) {
            this.x = (width - width + this.size + 1);;
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
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                    balls[j].size = this.size = random(10, 20);
                }
            }
        }
    };
}

    Ball.prototype = Object.create(Shape.prototype);
    Ball.prototype.constructor = Ball;

// Defining EvilCircle()

class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists, color, size, score) {
        super(x, y, 2, 2, exists);

        this.color = "white";
        this.size = 10;
        this.score = 0;
        xValue = x;
        yValue = y;
    }
    draw() {
        /*ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();*/
        ctx.drawImage(player1Image, (this.x - 20), (this.y - 20) );
    }
    checkBounds() {
        if ((this.x + this.size) >= width) {
            xValue = (width - width + this.size + 1);
            this.x = xValue;
        }

        if ((this.x - this.size) <= 0) {
            xValue = (width - this.size + 1);
            this.x = xValue;
        }

        if ((this.y + this.size) >= height) {
            yValue = (height - height + this.size + 1);
            this.y = yValue;
        }

        if ((this.y - this.size) <= 0) {
            yValue = (height - this.size + 1)
            this.y = yValue;
        }
    }
    setControls() {
        var _this = this;
        if (key.left === true) {
            xValue -= this.velX;
        }
        else {
            xValue += this.velX;
        }
        if (key.right === true) {
            xValue += this.velX;
        }
        else {
            xValue -= this.velX;
        }
        if (key.up === true) {
            yValue -= this.velY;
        }
        else {
            yValue += this.velY;
        }
        if (key.down === true) {
            yValue += this.velY;
        }
        else {
            yValue -= this.velY;
        }
        this.x = xValue;
        this.y = yValue;

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
                    Score1++;
                    para.textContent = "Ball count: " + count;
                    player1Score.textContent = "Player 1: " + Score1;
                }
            }
        }
    }
}

class badCircle extends Shape {
    constructor(x, y, velX, velY, exists, color, size, score) {
        super(x, y, 2, 2, exists);

        this.color = "red";
        this.size = 10;
        this.score = 0;
        badX = x;
        badY = y;
    }
    draw() {
       /* ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();*/
        ctx.drawImage(badImage, (this.x - 20), (this.y - 20) );
    }
    checkBounds() {
        if ((this.x + this.size) >= width) {
            badX = (width - width + this.size + 1);
            this.x = badX;
        }

        if ((this.x - this.size) <= 0) {
            badX = (width - this.size + 1);
            this.x = badX;
        }

        if ((this.y + this.size) >= height) {
            badY = (height - height + this.size + 1);
            this.y = badY;
        }

        if ((this.y - this.size) <= 0) {
            badY = (height - this.size + 1)
            this.y = badY;
        }
    }
    setControls() {
        var _this = this;
        if (bad.left === true) {
            badX -= this.velX;
        }
        else {
            badX += this.velX;
        }
        if (bad.right === true) {
            badX += this.velX;
        }
        else {
            badX -= this.velX;
        }
        if (bad.up === true) {
            badY -= this.velY;
        }
        else {
            badY += this.velY;
        }
        if (bad.down === true) {
            badY += this.velY;
        }
        else {
            badY -= this.velY;
        }
        this.x = badX;
        this.y = badY;

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
                    Score2++;
                    para.textContent = "Ball count: " + count;
                    badScore.textContent = "Bad guy: " + Score2;
                }
            }
        }
    }
}
// define array to store balls and populate it

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the adge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
    player1Score.textContent = 'Player 1: ' + Score1;
    badScore.textContent = 'Bad guy: ' + Score2;
}

// define loop that keeps drawing the scene constantly

let evil = new EvilCircle(random(0, width), random(0, height), true, 1);
evil.setControls();
let badGuy = new badCircle(random(0, width), random(0, height), true, 1);
badGuy.setControls();

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

    evil.draw();
    badGuy.draw();
    evil.setControls();
    badGuy.setControls();
    evil.checkBounds();
    badGuy.checkBounds();
    evil.collisionDetect();
    badGuy.collisionDetect();

    requestAnimationFrame(loop);
}

window.onkeydown = function (e) {
    if (e.keyCode == 65) { key.left = true; } //LEFT
    if (e.keyCode == 87) { key.up = true; } //UP
    if (e.keyCode == 68) { key.right = true; } //RIGHT
    if (e.keyCode == 83) { key.down = true; } //DOWN
    if (e.keyCode == 38) { bad.up = true; }
    if (e.keyCode == 37) { bad.left = true;}
    if (e.keyCode == 40) { bad.down = true;}
    if (e.keyCode == 39) { bad.right = true;}

};
window.onkeyup = function (e) {
    if (e.keyCode == 65) { key.left = false; } //LEFT
    if (e.keyCode == 87) { key.up = false; } //UP
    if (e.keyCode == 68) { key.right = false; } //RIGHT
    if (e.keyCode == 83) { key.down = false; } //DOWN
    if (e.keyCode == 38) { bad.up = false; }
    if (e.keyCode == 37) { bad.left = false;}
    if (e.keyCode == 40) { bad.down = false;}
    if (e.keyCode == 39) { bad.right = false;}
};

loop();