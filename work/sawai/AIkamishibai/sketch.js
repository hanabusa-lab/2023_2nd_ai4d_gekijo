let images = [];
let sounds = [];
let currentFrame = 0;

function preload() {
  // 画像と音声のプリロード
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`images/frame${i + 1}.png`);
    sounds[i] = loadSound(`sounds/frame${i + 1}.mp3`);
  }
}

function setup() {
  createCanvas(1600, 900);
}

function draw() {
  background(255);
  image(images[currentFrame], 0, 0);

  if (sounds[currentFrame].isPlaying() == false) {
    sounds[currentFrame].play();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    sounds[currentFrame].stop();
    currentFrame++;
    if (currentFrame > 3) {
      currentFrame = 0;
    }
  }
  if (keyCode === LEFT_ARROW) {
    sounds[currentFrame].stop();
    currentFrame--;
    if (currentFrame < 0) {
      currentFrame = 3;
    }
  }
}
