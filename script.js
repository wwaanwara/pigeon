let microphone;
let x = 0;
let y = 0;
let birds = [];
let angle = 0

// function preload() {
//   mySound = loadSound("pigeonsound.mp3");
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  microphone = new p5.AudioIn();
  microphone.start();
  // mySound.play();
  for (let i = 0; i < 60; i += 4) {
    let bird = new Bird(5 * i, 10);
    append(birds, bird);
    // if (x >= windowWidth){
    //   continue;
    // }
  }
}

function draw() {
  background("#D0E5F2");
  let micLevel = microphone.getLevel();
  text(micLevel, width / 8, 30);
  birds.forEach(function (bird) {
    bird.display();
    bird.start();
    bird.stop();
  });

  if (micLevel >= 0.1) {
    birds.forEach(function (bird) {
      bird.fly();
    });
  }

  line(0, windowHeight / 2 + 20, windowWidth, windowHeight / 2 + 20);
  strokeWeight(3);
}
function mousePressed() {
  userStartAudio();
  setup();
}

class Bird {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.d = random(2, 4);
    this.s = random(8, 10);
    this.wingHeight = 5;
  }
  display() {
    push();
    translate(this.x, this.y);
    stroke(0);
    noFill()
    // arc x, y, width, height, start degrees, end degrees.
    arc(-25, 0, 50, 7*this.wingHeight, -90, 70);
    arc(25, 0, 50, 7*this.wingHeight, 90, 200);
    pop();
    rect(this.x-4,this.y+4,1,15);
    rect(this.x+4,this.y+4,1,15);
    circle(this.x, this.y-2, 30);
    push()
    rect(this.x+4,this.y-7,1,4);
    rect(this.x-4,this.y-7,1,4);
    triangle(this.x,this.y+4,this.x+3,this.y+4,this.x,this.y+6);
    pop()
  }
  start() {
    this.x += this.d;
    this.y += this.d;
     this.wingHeight = (this.wingHeight + 0.8) % 5;
  }
  stop() {
    if (this.y >= height / 2) {
      this.y = height / 2;
      this.x -= this.d;
      this.wingHeight = 1;
    }
  }
  fly() {
    this.x += this.s;
    this.y -= this.s;
     this.wingHeight = (this.wingHeight + 1) % 5;
  }
}
