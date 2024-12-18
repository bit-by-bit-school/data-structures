import { init, next } from "./barnesHutAlgo.js";

let paused = false;
export function pause() {
  paused = !paused;
  draw();
}

let tree = false;
export function toggleTree() {
  tree = !tree;
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("tree").addEventListener("click", toggleTree);
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 10;

// const input = [
//   { x: 100, y: 0, mass: 1 },
//   { x: -100, y: 0, mass: 1 },
//   { x: 0, y: 100, mass: 3 },
//   { x: 0, y: -100, mass: 4 },
//   { x: -150, y: 150, mass: 5 },
//   { x: 150, y: -150, mass: 6 },
//   { x: 200, y: -200, mass: 7 },
//   { x: 200, y: 0, mass: 8 },
//   { x: 0, y: -200, mass: 9 },
//   { x: 175, y: -175, mass: 10 },
// ];

function generateParticles(numOfParticles, range) {
  const particles = [];
  for (let i = 0; i < numOfParticles; i++) {
    particles.push({
      x: Math.random() * range - range / 2,
      y: Math.random() * range - range / 2,
      mass: 1,
    });
  }
  return particles;
}
const input = generateParticles(3000, 500);

function setup() {
  init(input, 10);
}

ctx.globalCompositeOperation = "screen";

function draw() {
  const [particles, quadTree] = next();

  const quadSide = quadTree.bottomRight.x - quadTree.topLeft.x;
  const scalingFactor = Math.min(canvas.width, canvas.height) / quadSide;

  ctx.setTransform(
    scalingFactor * 0.5,
    0,
    0,
    scalingFactor * 0.5,
    (quadTree.bottomRight.x - quadTree.topLeft.x) * scalingFactor * 0.5,
    (quadTree.bottomRight.y - quadTree.topLeft.y) * scalingFactor * 0.5
  );
  // ctx.fillStyle = "#fff";
  // ctx.strokeStyle = "#f00";
  // ctx.strokeRect(
  //   quadTree.topLeft.x - 200,
  //   quadTree.topLeft.y - 200,
  //   quadTree.bottomRight.x * 4 + 200,
  //   quadTree.bottomRight.y * 4 + 200
  // );
  ctx.clearRect(
    quadTree.topLeft.x - 200,
    quadTree.topLeft.y - 200,
    canvas.width * 2,
    canvas.height * 2
  );
  for (let particle of particles) {
    // console.log(particle);
    drawParticle(particle, quadTree);
  }
  tree && drawTree(quadTree);
  !paused && requestAnimationFrame(draw);
}

function drawParticle(particle, quadTree) {
  console.log(quadTree);
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
}

function drawTree(quadTree) {
  if (!quadTree.topLeft) return;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#0f05";
  ctx.strokeRect(
    quadTree.topLeft.x,
    quadTree.topLeft.y,
    quadTree.bottomRight.x - quadTree.topLeft.x,
    quadTree.bottomRight.y - quadTree.topLeft.y
  );

  Object.values(quadTree.subTrees)
    .filter(Boolean)
    .forEach((tree) => drawTree(tree));
}

setup();
draw();
