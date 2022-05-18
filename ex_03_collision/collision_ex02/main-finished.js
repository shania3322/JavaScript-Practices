// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// TODO: Adding features to bouncing balls demo
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = 'white';
    this.size = 80;

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 's':
          this.y += this.velY;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = this.color; 
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= 0.5 * this.size;
    }

    if ((this.x - this.size) <= 0) {
      this.x += 0.5 * this.size;
    }

    if ((this.y + this.size) >= height) {
      this.y -= 0.5 * this.size;
    }

    if ((this.y - this.size) <= 0) {
      this.y += 0.5 * this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.exists = false;
          ball.color = 'rgba(0,0,0,0)';
          //console.log('hit');
          count-=1;
          ballCount.textContent = `${count}`;
        }
      }
    };
  }
}


const balls = [];
const circle = new EvilCircle(width/2, height/2);
const ballCount = document.querySelector(".count");
var count = 0;
var reqId;
var rested = 10;

while (balls.length < 10) {
  const size = random(10, 20);
  const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size), random(0 + size, height - size),
      random(-7, 7), random(-7, 7), randomRGB(), size);

  balls.push(ball);
  count +=1;
  ballCount.textContent = `${count}`;
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
      if (ball.exists) {
        ball.draw();
      }    
    ball.update();
    ball.collisionDetect();
  }

  circle.draw();
  circle.checkBounds();
  circle.collisionDetect();

  if (rested > 0) {
    reqId = requestAnimationFrame(loop);
  }
  
  if ( count <= 0 ) {
    rested -=1;
  }
}

loop();
reqId = requestAnimationFrame(loop);
cancelAnimationFrame(reqId);