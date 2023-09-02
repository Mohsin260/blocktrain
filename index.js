// const mobile_nav = document.querySelector(".mobile-navbar-btn");
// const nav_header = document.querySelector(".header")

// const toggleNavbar = () => {
//     nav_header.classList.toggle("active")
// }

// mobile_nav.addEventListener('click', () => toggleNavbar());

let img, colorImg;
let points = [];

function preload() {
  img = loadImage('https://i.ibb.co/d0Pn2mc/NT-symbol-color-2.png');
  colorImg = loadImage('https://i.ibb.co/d0Pn2mc/NT-symbol-color-2.png');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  colorImg.loadPixels();

  let gridSize =5	;

  for (let x = 0; x < img.width; x += gridSize) {
    for (let y = 0; y < img.height; y += gridSize) {
      let index = 4 * (y * img.width + x);
      let alpha = img.pixels[index + 3];
      if (alpha > 0) {
        let colorIndex = 4 * (y * colorImg.width + x);
        let r = colorImg.pixels[colorIndex];
        let g = colorImg.pixels[colorIndex + 1];
        let b = colorImg.pixels[colorIndex + 2];
        let c = color(r, g, b);
        points.push(new Point(x, y, c));
      }
    }
  }
}

function draw() {
  clear();
  for (let p of points) {
    p.update();
    p.display();
  }
}

class Point {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.originalX = x;
    this.originalY = y;
    this.size = 3;
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    let maxDist = 155;

    if (d < maxDist) {
      let force = map(d, 0, maxDist, 2, 0);
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      let targetX = this.originalX + force * cos(angle) * maxDist;
      let targetY = this.originalY + force * sin(angle) * maxDist;

      this.x = lerp(this.x, targetX, 0.1);
      this.y = lerp(this.y, targetY, 0.1);
    } else {
      this.x = lerp(this.x, this.originalX, 0.1);
      this.y = lerp(this.y, this.originalY, 0.1);
    }
  }

  display() {
    fill(red(this.c), green(this.c), blue(this.c), 180); // Adjust the alpha value
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    translate(windowWidth / 2, windowHeight / 2); // Move the origin to the center of the screen
    rotate(radians(-45)); // Rotate 45 degrees
  
    // Adjust the canvas size and position to account for rotation
    const maxLength = Math.sqrt(windowWidth * windowWidth + windowHeight * windowHeight);
    setGradient(-maxLength / 2, -maxLength / 2, maxLength, maxLength, color("#4268fe"), color(0, 0, 0), color("#4219c8"));
  }
  
  function setGradient(x, y, w, h, c1, c2, c3) {
    noFill();
  
    // Top to middle gradient
    for (let i = y; i <= y + h / 2; i++) {
      let inter = map(i, y, y + h / 2, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  
    // Middle to bottom gradient
    for (let i = y + h / 2; i <= y + h; i++) {
      let inter = map(i, y + h / 2, y + h, 0, 1);
      let c = lerpColor(c2, c3, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
      
  }
  