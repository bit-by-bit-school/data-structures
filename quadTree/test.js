import { init, next } from "./barnesHutAlgo.js";

// const input = [
//   { x: 100, y: 0, mass: 1 },
//   { x: -100, y: 0, mass: 1 },
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

init(input, 10);

for (let i = 0; i < 1000; i++) {
  next();
}
