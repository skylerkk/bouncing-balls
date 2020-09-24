// setup canvas
const para = document.getElementById('countBall');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
let count = 0;
let Score1 = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random (min, max){
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}



// define Shape constructor
class Shape{
    constructor (x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
};
};

// define Ball constructor
class Ball extends Shape{
    constructor (x, y, velX, velY, exists, color, size) {
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

    update () {
        if ((this.x + this.size) >= width) {
            this.x = (width - width + this.size+ 1);;
        }
    
        if ((this.x - this.size) <= 0) {
            this.x= (width - this.size + 1);
        }
    
        if ((this.y + this.size) >= height) {
            this.y = (height-height + this.size +1);
        }
    
        if ((this.y - this.size) <= 0) {
            this.y = (height- this.size +1);
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
    
                if (distance < this.size + balls[j].size) {
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

class EvilCircle extends Shape{
    constructor (x, y, velX, velY, exists, color, size, score , player) {
    super(x, y, 20, 20, exists);

    this.color = "white";
    this.size = 10;
    this.score = 0;
    this.player = player;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x -= (this.size);
        }
    
        if ((this.x - this.size) <= 0) {
            this.x += (this.size);
        }
    
        if ((this.y + this.size) >= height) {
            this.y -= (this.size);
        }
    
        if ((this.y - this.size) <= 0) {
            this.y += (this.size);
        }
    }
    setControls() {
        var _this = this;
        window.onkeydown = function (e) {
            if (e.key === 'a') {
                _this.x -= _this.velX;
            } else if (e.key === 'd') {
                _this.x += _this.velX;
            } else if (e.key === 'w') {
                _this.y -= _this.velY;
            } else if (e.key === 's') {
                _this.y += _this.velY;
            }
        };
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
}

// define loop that keeps drawing the scene constantly

let evil = new EvilCircle(random(0, width), random(0, height), true, 1);
evil.setControls();

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
    evil.checkBounds();
    evil.collisionDetect();

    requestAnimationFrame(loop);
}

loop();