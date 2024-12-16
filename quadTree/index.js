import { init, next } from "./barnesHutAlgo.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

// const input = [
//   { x: 100, y: 0, mass: 1 },
//   { x: -100, y: 0, mass: 1 },
// { x: 0, y: 100, mass: 3 },
// { x: 0, y: -100, mass: 4 },
// { x: -150, y: 150, mass: 5 },
// { x: 150, y: -150, mass: 6 },
// { x: 200, y: -200, mass: 7 },
// { x: 200, y: 0, mass: 8 },
// { x: 0, y: -200, mass: 9 },
// { x: 175, y: -175, mass: 10 },
// ];

function generateParticles(numOfParticles, range) {
  const particles = [];
  for (let i = 0; i < numOfParticles; i++) {
    particles.push({
      x: Math.random() * range,
      y: Math.random() * range,
      mass: 1,
    });
  }
  return particles;
}
const input = generateParticles(100, 100);

function setup() {
  init(input, 10);
}

ctx.globalCompositeOperation = "screen";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of next()) {
    // console.log(particle);
    drawParticle(particle);
  }
  requestAnimationFrame(draw);
}

function drawParticle(particle) {
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.fillRect(
    Number(particle.x) + canvas.width / 2 - 2,
    Number(particle.y) + canvas.height / 2 - 2,
    4,
    4
  );
}

setup();
draw();
